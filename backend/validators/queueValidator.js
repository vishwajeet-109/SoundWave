// validators/queueValidator.js

import { body } from "express-validator";
import { isValidObjectId } from "./commonValidators.js";

export const setQueueValidator = [
  body("songIds")
    .isArray({ min: 1 })
    .withMessage("songIds must be a non-empty array.")
    .custom((arr) => arr.every(isValidObjectId))
    .withMessage("songIds must all be valid song IDs."),
  body("startIndex").optional().isInt({ min: 0 }),
];

export const addToQueueValidator = [
  body("songId").custom(isValidObjectId).withMessage("Invalid song ID."),
  body("position").optional().isIn(["next", "end"]).withMessage("position must be 'next' or 'end'."),
];

export const removeFromQueueValidator = [
  body("index").isInt({ min: 0 }).withMessage("index must be a non-negative integer."),
];

export const setRepeatModeValidator = [
  body("repeatMode")
    .isIn(["OFF", "ONE", "ALL"])
    .withMessage("repeatMode must be OFF, ONE, or ALL."),
];
