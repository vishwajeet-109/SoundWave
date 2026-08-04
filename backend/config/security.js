// config/security.js
//
// Centralized security and performance defaults for the SoundWave API.
// This keeps rate limits, cache TTLs, and request hardening in one place
// so new middleware stays reusable and production-safe.

export const securityConfig = {
  rateLimits: {
    global: {
      windowMs: 60 * 1000,
      limit: 300,
      message: "Too many requests. Please slow down.",
    },
    auth: {
      windowMs: 60 * 1000,
      limit: 5,
      message: "Too many authentication attempts. Please try again in a minute.",
    },
    forgotPassword: {
      windowMs: 60 * 60 * 1000,
      limit: 3,
      message: "Too many password reset requests. Please try again later.",
    },
    search: {
      windowMs: 60 * 1000,
      limit: 100,
      message: "Too many search requests. Please slow down.",
    },
    admin: {
      windowMs: 60 * 1000,
      limit: 60,
      message: "Too many admin requests. Please slow down.",
    },
    streaming: {
      windowMs: 60 * 1000,
      limit: 300,
      message: "Too many streaming requests. Please slow down.",
    },
    upload: {
      windowMs: 60 * 1000,
      limit: 20,
      message: "Too many upload requests. Please slow down.",
    },
  },
  cache: {
    defaultTtlSeconds: 60,
    genreListTtlSeconds: 300,
    categoryListTtlSeconds: 300,
  },
  performance: {
    slowRequestThresholdMs: 1200,
    logMemoryUsage: true,
  },
  helmetOptions: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        mediaSrc: ["'self'", "https://res.cloudinary.com"],
        connectSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
  },
  corsOptions: {
    origin: (origin, callback) => {
      const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  },
  compressionOptions: {
    threshold: 1024,
    level: 6,
    filter: (req, res) => {
      if (req.path.startsWith("/api/stream") || req.path.startsWith("/api/v1/stream")) return false;
      return true;
    },
  },
};

export const rateLimits = securityConfig.rateLimits;
export const cacheConfig = securityConfig.cache;
export const performanceConfig = securityConfig.performance;
export const helmetOptions = securityConfig.helmetOptions;
export const corsOptions = securityConfig.corsOptions;
export const cookieOptions = securityConfig.cookieOptions;
export const compressionOptions = securityConfig.compressionOptions;
export const CACHE_TTL = securityConfig.cache;
