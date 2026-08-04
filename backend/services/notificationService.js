import Notification from "../models/Notification.js";

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
    if (!targetUser) {
      return null;
    }

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
}

export default new NotificationService();