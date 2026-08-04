import express from "express";

import approvalController from "../controllers/approvalController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { adminLimiter } from "../middleware/rateLimiter.js";

import validateRequest from "../middleware/validateRequest.js";

import {

    rejectSongValidator

} from "../validators/approvalValidator.js";

import {

    ROLES

} from "../constants/roles.js";

const router = express.Router();

router.use(

    authMiddleware,

    roleMiddleware(

        ROLES.ADMIN,

        ROLES.SUPER_ADMIN

    ),
    adminLimiter

);

/*
|--------------------------------------------------------------------------
| Songs
|--------------------------------------------------------------------------
*/

router.get(

    "/pending-songs",

    approvalController.getPendingSongs

);

router.get(

    "/approved-songs",

    approvalController.getApprovedSongs

);

router.get(

    "/rejected-songs",

    approvalController.getRejectedSongs

);

router.get(

    "/blocked-songs",

    approvalController.getBlockedSongs

);
router.get(

    "/dashboard",

    approvalController.getDashboardStats

);

/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
*/

router.patch(

    "/songs/:id/approve",

    approvalController.approveSong

);

router.patch(

    "/songs/:id/reject",

    rejectSongValidator,

    validateRequest,

    approvalController.rejectSong

);

router.patch(

    "/songs/:id/block",

    approvalController.blockSong

);

export default router;