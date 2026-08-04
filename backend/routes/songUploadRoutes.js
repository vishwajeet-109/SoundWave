// routes/artist/songUploadRoutes.js
//
// Mount example:
//   import songUploadRoutes from "./artist/songUploadRoutes.js";
//   router.use("/artist/songs", songUploadRoutes);
// Final path example: /api/v1/artist/songs/upload

import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/roleMiddleware.js";
import validateRequest from "../../middleware/validateRequest.js";
import upload from "../../middleware/uploadMiddleware.js";
import { ROLES } from "../../constants/roles.js";
import {
  uploadSongValidator,
  songIdParamValidator,
} from "../../validators/songUploadValidator.js";
import {
  uploadSong,
  submitSongForReview,
  getMySongs,
  deleteMySong,
} from "../../controllers/songUploadController.js";

const router = Router();

router.use(authMiddleware, roleMiddleware(ROLES.ARTIST, ROLES.ADMIN, ROLES.SUPER_ADMIN));

router.get("/", getMySongs);

router.post(
  "/upload",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "audioFile", maxCount: 1 },
  ]),
  uploadSongValidator,
  validateRequest,
  uploadSong
);

router.patch(
  "/:songId/submit",
  songIdParamValidator,
  validateRequest,
  submitSongForReview
);

router.delete("/:songId", songIdParamValidator, validateRequest, deleteMySong);

export default router;
