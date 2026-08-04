// routes/notificationRoutes.js
// Mount at /api/v1/me/notifications

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { notificationIdParamValidator } from "../validators/notificationValidator.js";
import {
  listMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", listMyNotifications);
router.patch("/read-all", markAllNotificationsAsRead);
router.patch(
  "/:notificationId/read",
  notificationIdParamValidator,
  validateRequest,
  markNotificationAsRead
);
router.delete(
  "/:notificationId",
  notificationIdParamValidator,
  validateRequest,
  deleteNotification
);

export default router;
