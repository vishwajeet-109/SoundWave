// routes/streamRoutes.js
//
// Mount example:
//   import streamRoutes from "./streamRoutes.js";
//   router.use("/stream", streamRoutes);
// Final path: GET /api/v1/stream/:songId

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { streamLimiter } from "../middleware/rateLimiter.js";
import { rateLimits } from "../config/security.js";
import { songIdParamValidator } from "../validators/songUploadValidator.js";
import { streamSong } from "../controllers/streamingController.js";

const router = Router();

router.get(
  "/:songId",
  streamLimiter({
    windowMs: rateLimits.streaming.windowMs,
    limit: rateLimits.streaming.limit,
    message: rateLimits.streaming.message,
  }),
  authMiddleware,
  songIdParamValidator,
  validateRequest,
  streamSong
);

export default router;
