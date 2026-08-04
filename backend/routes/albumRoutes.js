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

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  listAlbumsValidator,
  validateRequest,
  listAlbums
);

router.get(
  "/:albumId",
  albumIdParamValidator,
  validateRequest,
  getAlbumById
);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authMiddleware,
  roleMiddleware(
    ROLES.ARTIST,
    ROLES.ADMIN,
    ROLES.SUPER_ADMIN
  ),
  createAlbumValidator,
  validateRequest,
  createAlbum
);

router.patch(
  "/:albumId",
  authMiddleware,
  roleMiddleware(
    ROLES.ARTIST,
    ROLES.ADMIN,
    ROLES.SUPER_ADMIN
  ),
  updateAlbumValidator,
  validateRequest,
  updateAlbum
);

router.delete(
  "/:albumId",
  authMiddleware,
  roleMiddleware(
    ROLES.ARTIST,
    ROLES.ADMIN,
    ROLES.SUPER_ADMIN
  ),
  albumIdParamValidator,
  validateRequest,
  deleteAlbum
);

router.post(
  "/:albumId/songs",
  authMiddleware,
  roleMiddleware(
    ROLES.ARTIST,
    ROLES.ADMIN,
    ROLES.SUPER_ADMIN
  ),
  albumSongMutationValidator,
  validateRequest,
  addSongToAlbum
);

router.delete(
  "/:albumId/songs",
  authMiddleware,
  roleMiddleware(
    ROLES.ARTIST,
    ROLES.ADMIN,
    ROLES.SUPER_ADMIN
  ),
  albumSongMutationValidator,
  validateRequest,
  removeSongFromAlbum
);

export default router;