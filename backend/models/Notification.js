import mongoose from "mongoose";

import {
  NOTIFICATION_PRIORITY_LIST,
  NOTIFICATION_PRIORITIES,
  NOTIFICATION_TYPE_LIST,
  NOTIFICATION_TYPES,
} from "../constants/auditActions.js";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    type: {
      type: String,
      enum: NOTIFICATION_TYPE_LIST,
      default: NOTIFICATION_TYPES.GENERAL,
      index: true,
    },

    priority: {
      type: String,
      enum: NOTIFICATION_PRIORITY_LIST,
      default: NOTIFICATION_PRIORITIES.MEDIUM,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    actionUrl: {
      type: String,
      default: "",
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

notificationSchema.index({
  recipient: 1,
  isRead: 1,
});



notificationSchema.index({
  createdAt: -1,
});

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;