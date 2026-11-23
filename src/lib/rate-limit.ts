// Minimal in-memory rate limiter for marketing-site form/API routes.
//
// This is intentionally simple: it keeps counts in a module-level Map, which
// is per-instance and resets on redeploy. That's an acceptable trade-off for
// a marketing site's contact/newsletter/demo forms (stops basic abuse and
// accidental double-submits) but is NOT a substitute for a real rate limiter
// (e.g. Upstash/Redis) if this app is ever deployed across multiple
// instances behind a load balancer.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  bucket.count += 1;
  return { allowed: true, remaining: limit - bucket.count };
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
