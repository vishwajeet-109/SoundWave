// routes/recommendationRoutes.js
// Mount at /api/v1/recommendations (also exposes /trending)

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getRecommendations, getTrending } from "../controllers/recommendationController.js";

const router = Router();

router.get("/", authMiddleware, getRecommendations);
router.get("/trending", authMiddleware, getTrending);

export default router;
