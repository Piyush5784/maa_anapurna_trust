import { NextRequest, NextResponse } from "next/server";
import { RateLimiter } from "limiter";

// Using the 'limiter' library for more robust rate limiting
interface RateLimitConfig {
  tokensPerInterval: number;
  interval: string | number;
  fireImmediately?: boolean;
}

interface RateLimitResult {
  allowed: boolean;
  resetTime?: number;
  remaining?: number;
  limit?: number;
}

// Store for different rate limiters per route/IP combination
const rateLimiters = new Map<string, RateLimiter>();

// Clean up old limiters periodically
setInterval(() => {
  // Clear limiters that haven't been used recently
  // This is a simple cleanup, in production you might want more sophisticated logic
  if (rateLimiters.size > 10000) {
    rateLimiters.clear();
  }
}, 15 * 60 * 1000); // Clean every 15 minutes

export class AdvancedRateLimiter {
  private config: RateLimitConfig;
  private keyPrefix: string;

  constructor(config: RateLimitConfig, keyPrefix: string = "default") {
    this.config = config;
    this.keyPrefix = keyPrefix;
  }

  private getClientIdentifier(req: NextRequest): string {
    // Try to get IP from various headers
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const remoteAddr = req.headers.get("remote-addr");

    let ip = "unknown";

    if (forwarded) {
      ip = forwarded.split(",")[0].trim();
    } else if (realIp) {
      ip = realIp;
    } else if (remoteAddr) {
      ip = remoteAddr;
    }

    return ip;
  }

  private getRateLimiter(key: string): RateLimiter {
    if (!rateLimiters.has(key)) {
      const intervalMs =
        typeof this.config.interval === "string"
          ? this.parseInterval(this.config.interval)
          : this.config.interval;

      rateLimiters.set(
        key,
        new RateLimiter({
          tokensPerInterval: this.config.tokensPerInterval,
          interval: intervalMs,
          fireImmediately: this.config.fireImmediately || false,
        })
      );
    }
    return rateLimiters.get(key)!;
  }

  async isAllowed(req: NextRequest): Promise<RateLimitResult> {
    const identifier = this.getClientIdentifier(req);
    const key = `${this.keyPrefix}-${identifier}-${req.nextUrl.pathname}`;

    const limiter = this.getRateLimiter(key);

    try {
      const remainingTokens = await limiter.removeTokens(1);

      if (remainingTokens >= 0) {
        return {
          allowed: true,
          remaining: Math.floor(remainingTokens),
          limit: this.config.tokensPerInterval,
        };
      } else {
        // Calculate reset time based on interval
        const intervalMs =
          typeof this.config.interval === "string"
            ? this.parseInterval(this.config.interval)
            : this.config.interval;

        return {
          allowed: false,
          remaining: 0,
          limit: this.config.tokensPerInterval,
          resetTime: Date.now() + intervalMs,
        };
      }
    } catch (error) {
      console.error("Rate limiting error:", error);
      // Fail open - allow request if rate limiter fails
      return { allowed: true };
    }
  }

  private parseInterval(interval: string): number {
    const units: Record<string, number> = {
      ms: 1,
      sec: 1000,
      min: 60 * 1000,
      hour: 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
    };

    const match = interval.match(/^(\d+)\s*(ms|sec|min|hour|day)$/);
    if (!match) {
      throw new Error(`Invalid interval format: ${interval}`);
    }

    const [, value, unit] = match;
    return parseInt(value) * units[unit];
  }

  async middleware(req: NextRequest): Promise<NextResponse | null> {
    const result = await this.isAllowed(req);

    if (!result.allowed) {
      const resetTimeSeconds = result.resetTime
        ? Math.ceil((result.resetTime - Date.now()) / 1000)
        : 60;

      return new NextResponse(
        JSON.stringify({
          error: "Rate limit exceeded",
          message: "Too many requests, please try again later",
          retryAfter: resetTimeSeconds,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": (
              result.limit || this.config.tokensPerInterval
            ).toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": Math.ceil(
              (result.resetTime || Date.now() + 60000) / 1000
            ).toString(),
            "Retry-After": resetTimeSeconds.toString(),
          },
        }
      );
    }

    return null; // Allow request to continue
  }
}

// Pre-configured rate limiters for different use cases
export const apiRateLimiter = new AdvancedRateLimiter(
  {
    tokensPerInterval: 100,
    interval: "15 min",
  },
  "api"
);

export const strictApiRateLimiter = new AdvancedRateLimiter(
  {
    tokensPerInterval: 5,
    interval: "1 min",
  },
  "strict-api"
);

export const authRateLimiter = new AdvancedRateLimiter(
  {
    tokensPerInterval: 10,
    interval: "15 min",
  },
  "auth"
);

export const uploadRateLimiter = new AdvancedRateLimiter(
  {
    tokensPerInterval: 3,
    interval: "1 min",
  },
  "upload"
);

export const generalRateLimiter = new AdvancedRateLimiter(
  {
    tokensPerInterval: 1000,
    interval: "15 min",
  },
  "general"
);

// Wrapper function for easy API route integration
export function withRateLimit(
  handler: Function,
  limiter: AdvancedRateLimiter = apiRateLimiter
) {
  return async (req: NextRequest, context?: any) => {
    const rateLimitResult = await limiter.middleware(req);

    if (rateLimitResult) {
      return rateLimitResult; // Rate limit exceeded
    }

    // Continue with the original handler
    return handler(req, context);
  };
}

// Alternative: Express-style rate limiter for API routes
export function createExpressStyleRateLimit(options: {
  windowMs: number;
  max: number;
  message?: string;
  standardHeaders?: boolean;
  legacyHeaders?: boolean;
}) {
  const store = new Map<string, { count: number; resetTime: number }>();

  return {
    middleware: async (req: NextRequest) => {
      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0] ||
        req.headers.get("x-real-ip") ||
        "unknown";

      const key = `${ip}-${req.nextUrl.pathname}`;
      const now = Date.now();

      let record = store.get(key);

      if (!record || now > record.resetTime) {
        record = { count: 1, resetTime: now + options.windowMs };
        store.set(key, record);
      } else {
        record.count++;
      }

      const remaining = Math.max(0, options.max - record.count);
      const resetTime = Math.ceil(record.resetTime / 1000);

      if (record.count > options.max) {
        return new NextResponse(
          JSON.stringify({
            error: "Too many requests",
            message: options.message || "Rate limit exceeded",
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              ...(options.standardHeaders && {
                "RateLimit-Limit": options.max.toString(),
                "RateLimit-Remaining": remaining.toString(),
                "RateLimit-Reset": resetTime.toString(),
              }),
              ...(options.legacyHeaders && {
                "X-RateLimit-Limit": options.max.toString(),
                "X-RateLimit-Remaining": remaining.toString(),
                "X-RateLimit-Reset": resetTime.toString(),
              }),
              "Retry-After": Math.ceil(
                (record.resetTime - now) / 1000
              ).toString(),
            },
          }
        );
      }

      return null; // Allow request
    },
  };
}
