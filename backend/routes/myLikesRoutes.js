// routes/myLikesRoutes.js
// Mount at /api/v1/me/likes

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { listLikedSongs } from "../controllers/likeController.js";

const router = Router();

router.get("/", authMiddleware, listLikedSongs);

export default router;
