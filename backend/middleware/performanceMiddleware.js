// middleware/performanceMiddleware.js
//
// Combines compression + HPP protection with request timing and slow API
// logging so the app can identify performance regressions early.

import compression from "compression";
import hpp from "hpp";
import { compressionOptions, performanceConfig } from "../config/security.js";

export const compressionMiddleware = compression({
  threshold: compressionOptions.threshold,
  level: compressionOptions.level,
  filter: (req, res) => {
    if (compressionOptions.filter && !compressionOptions.filter(req, res)) {
      return false;
    }

    return compression.filter(req, res);
  },
});

export const hppMiddleware = hpp({
  whitelist: ["genre", "category", "status", "limit", "page", "sort"],
});

export const performanceMiddleware = ({ thresholdMs = performanceConfig.slowRequestThresholdMs } = {}) => (req, res, next) => {
  const startTime = process.hrtime.bigint();
  const startMemory = process.memoryUsage().heapUsed;

  res.on("finish", () => {
    const elapsedMs = Number(process.hrtime.bigint() - startTime) / 1_000_000;
    const memoryDeltaMb = (process.memoryUsage().heapUsed - startMemory) / 1024 / 1024;

    if (elapsedMs >= thresholdMs) {
      console.warn(
        `[slow-request] ${req.method} ${req.originalUrl} ${elapsedMs.toFixed(2)}ms memoryDelta=${memoryDeltaMb.toFixed(2)}MB`
      );
    }
  });

  next();
};
