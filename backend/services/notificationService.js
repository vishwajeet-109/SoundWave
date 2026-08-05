import Notification from "../models/Notification.js";
import ApiError from "../utils/ApiError.js"; 

class NotificationService {

  async send({
    userId,
    title,
    message,
    type = "GENERAL",
    data = {},
    sender = null,
    priority = "MEDIUM",
  }) {

    return this.sendNotification({
      user: userId,
      title,
      message,
      type,
      data,
      sender,
      priority,
    });

  }

  async sendNotification({
    user,
    recipient,
    title,
    message,
    type = "GENERAL",
    data = {},
    sender = null,
    priority = "MEDIUM",
  }) {

    const targetUser = user ?? recipient;

    if (!targetUser) return null;

    return Notification.create({

      recipient: targetUser,
      sender,
      title,
      message,
      type,
      priority,
      metadata: data,

    });

  }

  /*
  |--------------------------------------------------------------------------
  | List Notifications
  |--------------------------------------------------------------------------
  */

  async listNotifications({ userId, query }) {

    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(query.limit) || 20, 1), 100);

    const notifications = await Notification.find({

      recipient: userId,

    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return notifications;

  }

  /*
  |--------------------------------------------------------------------------
  | Mark Read
  |--------------------------------------------------------------------------
  */



async markAsRead({
  notificationId,
  userId,
}) {

  const notification = await Notification.findOneAndUpdate(

    {
      _id: notificationId,
      recipient: userId,
    },

    {
      $set: {
        isRead: true,
      },
    },

    {
      new: true,
    }

  );

  if (!notification) {

    throw new ApiError(
      404,
      "Notification not found"
    );

  }

  return notification;

}

  /*
  |--------------------------------------------------------------------------
  | Mark All Read
  |--------------------------------------------------------------------------
  */

  async markAllAsRead(userId) {

    await Notification.updateMany(

      {

        recipient: userId,

      },

      {

        $set: {

          isRead: true,

        },

      }

    );

    return {

      success: true,

    };

  }

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

async deleteNotification({
  notificationId,
  userId,
}) {

  const notification = await Notification.findOneAndDelete({

    _id: notificationId,
    recipient: userId,

  });

  if (!notification) {

    throw new ApiError(
      404,
      "Notification not found"
    );

  }

  return {
    success: true,
  };

}

}

export default new NotificationService();