// routes/reportRoutes.js
// Mount at /api/v1/reports

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { ROLES } from "../constants/roles.js";
import {
  createReportValidator,
  reviewReportValidator,
  listReportsValidator,
} from "../validators/reportValidator.js";
import { createReport, listReports, reviewReport } from "../controllers/reportController.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createReportValidator, validateRequest, createReport);

router.get(
  "/",
  roleMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  listReportsValidator,
  validateRequest,
  listReports
);

router.patch(
  "/:reportId/review",
  roleMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  reviewReportValidator,
  validateRequest,
  reviewReport
);

export default router;
