// routes/historyRoutes.js
// Mount at /api/v1/me/history

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { paginationQueryValidator } from "../validators/engagementValidator.js";
import { getMyHistory, clearMyHistory } from "../controllers/historyController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", paginationQueryValidator, validateRequest, getMyHistory);
router.delete("/", clearMyHistory);

export default router;
