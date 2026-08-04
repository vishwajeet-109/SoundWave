// routes/likeRoutes.js
//
// Mount example:
//   import likeRoutes from "./likeRoutes.js";
//   router.use("/songs/:songId/like", likeRoutes);
//   router.use("/me/likes", likeMineRoutes) -- see listMyLikesRoutes below
// mergeParams required on the router since :songId comes from the parent mount.

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { songIdParamValidator } from "../validators/engagementValidator.js";
import { likeSong, unlikeSong } from "../controllers/likeController.js";

const router = Router({ mergeParams: true });

router.use(authMiddleware);

router.post("/", songIdParamValidator, validateRequest, likeSong);
router.delete("/", songIdParamValidator, validateRequest, unlikeSong);

export default router;
