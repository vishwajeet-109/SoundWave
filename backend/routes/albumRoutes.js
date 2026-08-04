// routes/albumRoutes.js
//
// Mount example:
//   import albumRoutes from "./albumRoutes.js";
//   router.use("/albums", albumRoutes);
// Final path example: /api/v1/albums

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { ROLES } from "../constants/roles.js";
import {
  createAlbumValidator,
  updateAlbumValidator,
  albumIdParamValidator,
  albumSongMutationValidator,
  listAlbumsValidator,
} from "../validators/albumValidator.js";
import {
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumById,
  listAlbums,
  addSongToAlbum,
  removeSongFromAlbum,
} from "../controllers/albumController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", listAlbumsValidator, validateRequest, listAlbums);
router.get("/:albumId", albumIdParamValidator, validateRequest, getAlbumById);

router.post(
  "/",
  roleMiddleware(ROLES.ARTIST, ROLES.ADMIN, ROLES.SUPER_ADMIN),
  createAlbumValidator,
  validateRequest,
  createAlbum
);

router.patch(
  "/:albumId",
  roleMiddleware(ROLES.ARTIST, ROLES.ADMIN, ROLES.SUPER_ADMIN),
  updateAlbumValidator,
  validateRequest,
  updateAlbum
);

router.delete(
  "/:albumId",
  roleMiddleware(ROLES.ARTIST, ROLES.ADMIN, ROLES.SUPER_ADMIN),
  albumIdParamValidator,
  validateRequest,
  deleteAlbum
);

router.post(
  "/:albumId/songs",
  roleMiddleware(ROLES.ARTIST, ROLES.ADMIN, ROLES.SUPER_ADMIN),
  albumSongMutationValidator,
  validateRequest,
  addSongToAlbum
);

router.delete(
  "/:albumId/songs",
  roleMiddleware(ROLES.ARTIST, ROLES.ADMIN, ROLES.SUPER_ADMIN),
  albumSongMutationValidator,
  validateRequest,
  removeSongFromAlbum
);

export default router;
