import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  getDashboardOverview,
  getTopArtists,
  getMonthlyAnalytics,
} from "../controllers/analyticsController.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

// Authentication + Admin Authorization
router.use(authMiddleware);
router.use(roleMiddleware(ROLES.ADMIN));

// Dashboard Overview
router.get("/overview", getDashboardOverview);

// Top Artists
router.get("/top-artists", getTopArtists);

// Monthly Analytics
router.get("/monthly", getMonthlyAnalytics);

export default router;