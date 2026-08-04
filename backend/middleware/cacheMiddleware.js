// middleware/cacheMiddleware.js
//
// REQUIRED TECHNOLOGIES (CLAUDE.md) doesn't list Redis, so this is a
// dependency-free in-memory cache for cheap, rarely-changing public
// GET endpoints (genres, categories, trending, etc). Good enough for
// a single Node process; if SoundWave scales to multiple instances,
// swap the Map below for Redis without changing the middleware's API
// (cache/invalidate) — see Sprint delivery notes.

const store = new Map(); // key -> { data, expiresAt }

const isExpired = (entry) => !entry || entry.expiresAt < Date.now();

/**
 * Wraps a GET route: serves a cached response body if present and
 * fresh, otherwise lets the request through and caches whatever
 * ApiResponse the controller sends.
 *
 * Usage: router.get("/", cache("genres:list", 300), listGenres);
 */
export const cache = (keyOrFn, ttlSeconds = 60) => (req, res, next) => {
  const key = typeof keyOrFn === "function" ? keyOrFn(req) : keyOrFn;
  const entry = store.get(key);

  if (!isExpired(entry)) {
    return res.status(200).json(entry.data);
  }

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode < 400) {
      store.set(key, { data: body, expiresAt: Date.now() + ttlSeconds * 1000 });
    }
    return originalJson(body);
  };

  next();
};

/**
 * Call after a mutation so stale cached reads don't linger — e.g.
 * after creating/updating/deleting a genre, invalidate("genres:list").
 * Accepts an exact key or a prefix (matches keys starting with it).
 */
export const invalidate = (keyOrPrefix) => {
  if (store.has(keyOrPrefix)) {
    store.delete(keyOrPrefix);
    return;
  }
  for (const key of store.keys()) {
    if (key.startsWith(keyOrPrefix)) store.delete(key);
  }
};

export const clearCache = () => store.clear();
