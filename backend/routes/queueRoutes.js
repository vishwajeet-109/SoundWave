// routes/queueRoutes.js
// Mount at /api/v1/me/queue

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import {
  setQueueValidator,
  addToQueueValidator,
  removeFromQueueValidator,
  setRepeatModeValidator,
} from "../validators/queueValidator.js";
import {
  getMyQueue,
  setQueue,
  addToQueue,
  removeFromQueue,
  clearQueue,
  playNext,
  playPrevious,
  setRepeatMode,
  toggleShuffle,
} from "../controllers/queueController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getMyQueue);
router.put("/", setQueueValidator, validateRequest, setQueue);
router.delete("/", clearQueue);

router.post("/songs", addToQueueValidator, validateRequest, addToQueue);
router.delete("/songs", removeFromQueueValidator, validateRequest, removeFromQueue);

router.post("/next", playNext);
router.post("/previous", playPrevious);
router.patch("/repeat", setRepeatModeValidator, validateRequest, setRepeatMode);
router.post("/shuffle", toggleShuffle);

export default router;
