import express from "express";

import songController from "../controllers/songController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import validateRequest from "../middleware/validateRequest.js";

import upload from "../middleware/uploadMiddleware.js";

import {
    createSongValidator,
    updateSongValidator
} from "../validators/songValidator.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
router.get(

    "/",

    songController.getAllSongs

);

router.get(
    "/:id",
    songController.getSongById
);

/*
|--------------------------------------------------------------------------
| Artist Routes
|--------------------------------------------------------------------------
*/
router.post(

    "/",

    authMiddleware,

    roleMiddleware(

        ROLES.ARTIST

    ),

    upload.fields([

        {

            name: "coverImage",

            maxCount: 1

        },

        {

            name: "audioFile",

            maxCount: 1

        }

    ]),

    createSongValidator,

    validateRequest,

    songController.createSong

);

router.get(
    "/my-songs",
    authMiddleware,
    roleMiddleware(
        ROLES.ARTIST
    ),
    songController.getMySongs
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(
        ROLES.ARTIST
    ),
    updateSongValidator,
    validateRequest,
    songController.updateSong
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(
        ROLES.ARTIST
    ),
    songController.deleteSong
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get(
    "/pending/list",
    authMiddleware,
    roleMiddleware(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    songController.getPendingSongs
);

router.patch(
    "/:id/approve",
    authMiddleware,
    roleMiddleware(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    songController.approveSong
);

router.patch(
    "/:id/reject",
    authMiddleware,
    roleMiddleware(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    songController.rejectSong
);

router.patch(
    "/:id/block",
    authMiddleware,
    roleMiddleware(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    songController.blockSong
);

export default router;