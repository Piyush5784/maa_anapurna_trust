import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory, RateLimiterRedis } from "rate-limiter-flexible";

// Using rate-limiter-flexible for more advanced rate limiting features
// This library supports Redis, MongoDB, MySQL, PostgreSQL, and memory stores

interface RateLimitOptions {
  keyPrefix?: string;
  points: number; // Number of requests
  duration: number; // Duration in seconds
  blockDuration?: number; // Block duration in seconds (defaults to duration)
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

// Memory-based rate limiters (for development/small apps)
const createMemoryRateLimiter = (options: RateLimitOptions) => {
  return new RateLimiterMemory({
    keyPrefix: options.keyPrefix || "rl",
    points: options.points,
    duration: options.duration,
    blockDuration: options.blockDuration || options.duration,
  });
};

// Redis-based rate limiters (for production/distributed apps)
// Uncomment and configure for production use
/*
import Redis from 'ioredis';

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
});

const createRedisRateLimiter = (options: RateLimitOptions) => {
  return new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: options.keyPrefix || 'rl',
    points: options.points,
    duration: options.duration,
    blockDuration: options.blockDuration || options.duration,
  });
};
*/

// Pre-configured rate limiters
export const rateLimiters = {
  api: createMemoryRateLimiter({
    keyPrefix: "api",
    points: 100, // 100 requests
    duration: 900, // per 15 minutes
  }),

  auth: createMemoryRateLimiter({
    keyPrefix: "auth",
    points: 5, // 5 attempts
    duration: 900, // per 15 minutes
    blockDuration: 1800, // block for 30 minutes
  }),

  upload: createMemoryRateLimiter({
    keyPrefix: "upload",
    points: 3, // 3 uploads
    duration: 60, // per minute
  }),

  strict: createMemoryRateLimiter({
    keyPrefix: "strict",
    points: 10, // 10 requests
    duration: 60, // per minute
  }),

  // Burst protection - allows quick bursts but limits sustained load
  burst: createMemoryRateLimiter({
    keyPrefix: "burst",
    points: 20, // 20 requests
    duration: 1, // per second
  }),
};

// Advanced rate limiting middleware
export function createRateLimitMiddleware(
  rateLimiter: RateLimiterMemory | RateLimiterRedis,
  options?: {
    keyGenerator?: (req: NextRequest) => string;
    skipIf?: (req: NextRequest) => boolean;
    onLimitReached?: (req: NextRequest, rateLimiterRes: any) => void;
  }
) {
  return async (req: NextRequest): Promise<NextResponse | null> => {
    try {
      // Skip rate limiting if condition is met
      if (options?.skipIf?.(req)) {
        return null;
      }

      // Generate key for rate limiting
      const key = options?.keyGenerator?.(req) || getDefaultKey(req);

      // Try to consume a point
      const result = await rateLimiter.consume(key);

      // Add rate limit headers to response
      const response = NextResponse.next();
      response.headers.set("X-RateLimit-Limit", rateLimiter.points.toString());
      response.headers.set(
        "X-RateLimit-Remaining",
        result.remainingPoints?.toString() || "0"
      );
      response.headers.set(
        "X-RateLimit-Reset",
        (Date.now() + result.msBeforeNext).toString()
      );

      return null; // Allow request
    } catch (rateLimiterRes: any) {
      // Rate limit exceeded
      options?.onLimitReached?.(req, rateLimiterRes);

      const resetTime = Math.round(rateLimiterRes.msBeforeNext / 1000);

      return new NextResponse(
        JSON.stringify({
          error: "Rate limit exceeded",
          message: "Too many requests, please try again later",
          retryAfter: resetTime,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": rateLimiter.points.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": Math.round(
              (Date.now() + rateLimiterRes.msBeforeNext) / 1000
            ).toString(),
            "Retry-After": resetTime.toString(),
          },
        }
      );
    }
  };
}

// Default key generator
function getDefaultKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0] || realIp || "unknown";

  return `${ip}:${req.nextUrl.pathname}`;
}

// Specialized rate limiters for different use cases
export const apiRateLimit = createRateLimitMiddleware(rateLimiters.api);

export const authRateLimit = createRateLimitMiddleware(rateLimiters.auth, {
  keyGenerator: (req) => {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";
    return `auth:${ip}`;
  },
  onLimitReached: (req, rateLimiterRes) => {
    console.warn(
      `Auth rate limit exceeded for IP: ${req.headers.get("x-forwarded-for")}`
    );
  },
});

export const uploadRateLimit = createRateLimitMiddleware(rateLimiters.upload, {
  skipIf: (req) => {
    // Skip rate limiting for admin users (you'd need to check auth here)
    return false; // For now, don't skip
  },
});

export const strictRateLimit = createRateLimitMiddleware(rateLimiters.strict);

// Progressive rate limiting - gets stricter with more requests
export class ProgressiveRateLimiter {
  private limiters: Array<{ limiter: RateLimiterMemory; threshold: number }>;

  constructor() {
    this.limiters = [
      {
        limiter: createMemoryRateLimiter({
          keyPrefix: "progressive_1",
          points: 100,
          duration: 3600, // 1 hour
        }),
        threshold: 0,
      },
      {
        limiter: createMemoryRateLimiter({
          keyPrefix: "progressive_2",
          points: 50,
          duration: 3600,
        }),
        threshold: 50,
      },
      {
        limiter: createMemoryRateLimiter({
          keyPrefix: "progressive_3",
          points: 10,
          duration: 3600,
        }),
        threshold: 80,
      },
    ];
  }

  async checkLimit(
    key: string
  ): Promise<{ allowed: boolean; remaining: number }> {
    try {
      // Check each limiter in order
      for (const { limiter, threshold } of this.limiters) {
        const result = await limiter.consume(key);

        // Calculate total hits from remaining points
        const totalHits = limiter.points - (result.remainingPoints || 0);

        if (totalHits > threshold) {
          continue; // Move to stricter limiter
        }

        return {
          allowed: true,
          remaining: result.remainingPoints || 0,
        };
      }

      return { allowed: true, remaining: 0 };
    } catch (error) {
      return { allowed: false, remaining: 0 };
    }
  }
}

// Wrapper for API routes
export function withAdvancedRateLimit(
  handler: Function,
  rateLimitMiddleware: (req: NextRequest) => Promise<NextResponse | null>
) {
  return async (req: NextRequest, context?: any) => {
    const rateLimitResult = await rateLimitMiddleware(req);

    if (rateLimitResult) {
      return rateLimitResult; // Rate limit exceeded
    }

    return handler(req, context);
  };
}
