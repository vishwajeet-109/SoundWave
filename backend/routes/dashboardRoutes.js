import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import dashboardController from "../controllers/dashboardController.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.get(

    "/user",

    authMiddleware,

    roleMiddleware(ROLES.USER),

    dashboardController.userDashboard

);

router.get(

    "/artist",

    authMiddleware,

    roleMiddleware(ROLES.ARTIST),

    dashboardController.artistDashboard

);

router.get(

    "/admin",

    authMiddleware,

    roleMiddleware(

        ROLES.ADMIN,

        ROLES.SUPER_ADMIN

    ),

    dashboardController.adminDashboard

);

router.get(

    "/super-admin",

    authMiddleware,

    roleMiddleware(

        ROLES.SUPER_ADMIN

    ),

    dashboardController.superAdminDashboard

);

export default router;