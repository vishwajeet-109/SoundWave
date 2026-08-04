// middleware/rateLimiter.js
//
// Provides reusable, config-driven rate limits for authentication,
// admin, search, streaming, uploads, and general API access.

import rateLimit from "express-rate-limit";
import { rateLimits } from "../config/security.js";
import ApiError from "../utils/ApiError.js";

const rateLimitHandler = (message) => (req, res, next) => {
  next(new ApiError(429, message));
};

const createLimiter = ({ windowMs, limit, message, ...options } = {}) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    ...options,
    handler: rateLimitHandler(message),
  });

export const globalLimiter = createLimiter({
  ...rateLimits.global,
  message: rateLimits.global.message,
});

export const authLimiter = createLimiter({
  ...rateLimits.auth,
  message: rateLimits.auth.message,
});

export const forgotPasswordLimiter = createLimiter({
  ...rateLimits.forgotPassword,
  message: rateLimits.forgotPassword.message,
});

export const searchLimiter = createLimiter({
  ...rateLimits.search,
  message: rateLimits.search.message,
});

export const adminLimiter = createLimiter({
  ...rateLimits.admin,
  message: rateLimits.admin.message,
});

export const streamLimiter = ({
  windowMs = rateLimits.streaming.windowMs,
  limit = rateLimits.streaming.limit,
  message = rateLimits.streaming.message,
} = {}) =>
  createLimiter({
    windowMs,
    limit,
    message,
  });

export const uploadLimiter = ({
  windowMs = rateLimits.upload.windowMs,
  limit = rateLimits.upload.limit,
  message = rateLimits.upload.message,
} = {}) =>
  createLimiter({
    windowMs,
    limit,
    message,
  });

export const generalApiLimiter = createLimiter({
  ...rateLimits.global,
  message: rateLimits.global.message,
});
