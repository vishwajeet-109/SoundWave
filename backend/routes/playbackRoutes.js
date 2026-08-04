// routes/playbackRoutes.js
// Mount at /api/stream (progress endpoints)
// Mount at /api/me/continue-listening

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import {
  songIdParamValidator,
  updateProgressValidator,
} from "../validators/playbackValidator.js";

import {
  updateProgress,
  getProgress,
  getContinueListening,
} from "../controllers/playbackController.js";

// Progress Router
const progressRouter = Router();

progressRouter.use(authMiddleware);

progressRouter.get(
  "/:songId/progress",
  songIdParamValidator,
  validateRequest,
  getProgress
);

progressRouter.patch(
  "/:songId/progress",
  updateProgressValidator,
  validateRequest,
  updateProgress
);

// Continue Listening Router
const continueListeningRouter = Router();

continueListeningRouter.get(
  "/",
  authMiddleware,
  getContinueListening
);

// Default export for app.js compatibility
export default {
  progressRouter,
  continueListeningRouter,
};

// Optional named exports
export {
  progressRouter,
  continueListeningRouter,
};