type RateLimitBucket = {
  count: number;
  resetAt: number; // Unix timestamp ms
};

/**
 * Simple LRU cache backed by a Map.
 * Map insertion order is preserved — oldest entries are at the front.
 * get() moves a key to the end (most-recently-used).
 * Capacity is enforced on set() by evicting the front entry.
 */
class LRUCache {
  private readonly capacity: number;
  private readonly cache = new Map<string, RateLimitBucket>();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: string): RateLimitBucket | undefined {
    const value = this.cache.get(key);
    if (value === undefined) return undefined;
    // Re-insert to mark as most-recently-used
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key: string, value: RateLimitBucket): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict least-recently-used (first entry)
      this.cache.delete(this.cache.keys().next().value as string);
    }
    this.cache.set(key, value);
  }
}

// Module-level singleton — lives for the lifetime of the Node.js process.
// Supports up to 10,000 unique (scope, key) pairs before LRU eviction.
const rateLimitCache = new LRUCache(10_000);

/**
 * Checks and increments the rate-limit counter for a given scope + key.
 *
 * Synchronous and O(1) — no database round-trips.
 * Not shared across multiple server processes/instances; use a distributed
 * store (Redis) if horizontal scaling with shared limits is required.
 */
export function consumeRateLimit(
  scope: string,
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterSeconds: number } {
  const cacheKey = `${scope}:${key}`;
  const now = Date.now();

  const bucket = rateLimitCache.get(cacheKey);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitCache.set(cacheKey, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    const retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  rateLimitCache.set(cacheKey, { count: bucket.count + 1, resetAt: bucket.resetAt });
  return { allowed: true, retryAfterSeconds: 0 };
}
