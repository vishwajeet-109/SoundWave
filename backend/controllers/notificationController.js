// controllers/notificationController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import notificationService from "../services/notificationService.js";

export const listMyNotifications = asyncHandler(async (req, res) => {
  const result = await notificationService.listNotifications({
    userId: req.user._id,
    query: req.query,
  });
  res.status(200).json(new ApiResponse(200, result, "Notifications fetched successfully."));
});

export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const notification = await notificationService.markAsRead({
    notificationId: req.params.notificationId,
    userId: req.user._id,
  });
  res.status(200).json(new ApiResponse(200, notification, "Notification marked as read."));
});

export const markAllNotificationsAsRead = asyncHandler(async (req, res) => {
  const result = await notificationService.markAllAsRead(req.user._id);
  res.status(200).json(new ApiResponse(200, result, "All notifications marked as read."));
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const result = await notificationService.deleteNotification({
    notificationId: req.params.notificationId,
    userId: req.user._id,
  });
  res.status(200).json(new ApiResponse(200, result, "Notification deleted successfully."));
});
