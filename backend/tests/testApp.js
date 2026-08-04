// tests/testApp.js
//
// Builds a minimal Express app for integration tests. Only mounts
// the routers a given test needs, rather than depending on the full
// app.js (which wasn't part of any uploaded sprint). Once app.js is
// in scope, integration tests can import the real app instead.

import express from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export const buildTestApp = (routers = {}) => {
  const app = express();
  app.use(express.json());

  Object.entries(routers).forEach(([mountPath, router]) => {
    app.use(mountPath, router);
  });

  // Central error handler mirroring what app.js should have —
  // converts thrown ApiError (and anything else) into the standard
  // SoundWave error response shape.
  app.use((err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal server error.",
      errors: err.errors || [],
    });
  });

  return app;
};

/**
 * Signs a fake access token for a test user — mirrors the shape
 * authMiddleware.js expects (`decoded._id`).
 */
export const signTestToken = (userId) =>
  jwt.sign(
    { id: userId },
    jwtConfig.accessToken.secret,
    {
      expiresIn: "1h",
    }
  );
