# Rate Limiting Implementation Guide

This project implements multiple rate limiting strategies using external libraries for robust protection against abuse and overuse.

## Libraries Used

1. **limiter** - Token bucket algorithm implementation
2. **rate-limiter-flexible** - Advanced rate limiting with multiple storage options
3. **Custom middleware** - Integration with Next.js middleware

## Available Rate Limiters

### Basic Rate Limiters (src/lib/rate-limit.ts)

- `apiRateLimiter`: 100 requests per 15 minutes
- `strictApiRateLimiter`: 5 requests per minute
- `authRateLimiter`: 10 requests per 15 minutes
- `uploadRateLimiter`: 3 requests per minute
- `generalRateLimiter`: 1000 requests per 15 minutes

### Advanced Rate Limiters (src/lib/advanced-rate-limit.ts)

- `apiRateLimit`: Memory-based with flexible configuration
- `authRateLimit`: Enhanced auth protection with logging
- `uploadRateLimit`: File upload protection
- `strictRateLimit`: High-security endpoints
- `ProgressiveRateLimiter`: Gets stricter with increased usage

## Implementation Examples

### 1. Basic API Route Protection

```typescript
// src/app/api/example/route.ts
import { withRateLimit, strictApiRateLimiter } from "@/lib/rate-limit";

async function handler(req: NextRequest) {
  // Your API logic here
  return NextResponse.json({ success: true });
}

export const GET = withRateLimit(handler);
export const POST = withRateLimit(handler, strictApiRateLimiter);
```

### 2. Advanced API Route with Custom Rate Limiting

```typescript
// src/app/api/advanced/route.ts
import {
  withAdvancedRateLimit,
  authRateLimit,
} from "@/lib/advanced-rate-limit";

async function handler(req: NextRequest) {
  // Your API logic here
  return NextResponse.json({ success: true });
}

export const POST = withAdvancedRateLimit(handler, authRateLimit);
```

### 3. Middleware Configuration

The middleware automatically applies different rate limits based on route patterns:

- `/api/auth/*` routes: 10 requests per 15 minutes
- `/api/*/delete`, `/api/*/admin`, `/api/*/upload`: 5 requests per minute
- `/api/*` (general): 100 requests per 15 minutes
- `/Manage/*` routes: Admin-only access + rate limiting

### 4. Custom Rate Limiting

```typescript
import {
  createRateLimitMiddleware,
  createMemoryRateLimiter,
} from "@/lib/advanced-rate-limit";

const customLimiter = createMemoryRateLimiter({
  keyPrefix: "custom",
  points: 50,
  duration: 300, // 5 minutes
});

const customRateLimit = createRateLimitMiddleware(customLimiter, {
  keyGenerator: (req) => `user:${getUserId(req)}`, // Per-user limiting
  skipIf: (req) => isAdmin(req), // Skip for admins
  onLimitReached: (req, res) => {
    console.log(`Rate limit exceeded for ${req.url}`);
  },
});
```

## Production Considerations

### Redis Configuration (Recommended for Production)

```typescript
// Uncomment in src/lib/advanced-rate-limit.ts
import Redis from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
});

const productionRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rl",
  points: 100,
  duration: 900,
});
```

### Environment Variables

Add to your `.env`:

```env
# Rate Limiting
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# Rate limiting configuration
RATE_LIMIT_ENABLED=true
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
```

## Rate Limiting Strategies

### 1. Fixed Window

- Simple counter that resets at fixed intervals
- Used in basic implementation

### 2. Sliding Window

- More accurate, considers requests over a rolling time period
- Implemented in advanced-rate-limit.ts

### 3. Token Bucket

- Allows bursts up to bucket capacity
- Refills tokens at steady rate
- Used in limiter library implementation

### 4. Progressive Rate Limiting

- Starts lenient, becomes stricter with abuse
- Implemented in ProgressiveRateLimiter class

## Monitoring and Observability

### Headers Added to Responses

- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: When the rate limit resets (timestamp)
- `Retry-After`: Seconds to wait before retrying (when limited)

### Logging

Rate limit events are logged for monitoring:

```typescript
console.warn(`Rate limit exceeded for IP: ${ip} on ${pathname}`);
```

## Testing Rate Limits

Use tools like:

- `curl` with loops
- `ab` (Apache Bench)
- `wrk` load testing tool
- Jest for unit tests

Example test:

```bash
# Test API rate limiting
for i in {1..10}; do
  curl -w "%{http_code}\n" http://localhost:3000/api/test
done
```

## Best Practices

1. **Different limits for different endpoints**

   - Auth: Stricter limits
   - Public APIs: Moderate limits
   - Admin APIs: Admin-only + rate limits

2. **User-based vs IP-based limiting**

   - Authenticated users: Per-user limits
   - Anonymous users: Per-IP limits

3. **Graceful degradation**

   - Inform users about limits
   - Provide retry-after headers
   - Queue important operations

4. **Monitoring and alerting**

   - Track rate limit hits
   - Alert on unusual patterns
   - Monitor for abuse

5. **Whitelist critical services**
   - Health checks
   - Internal services
   - Admin operations (with separate limits)
