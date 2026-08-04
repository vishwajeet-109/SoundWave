// validators/notificationValidator.js

import { param } from "express-validator";
import { isValidObjectId } from "./commonValidators.js";

export const notificationIdParamValidator = [
  param("notificationId")
    .custom(isValidObjectId)
    .withMessage("Invalid notification ID."),
];
