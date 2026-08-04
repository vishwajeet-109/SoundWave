// validators/playbackValidator.js

import { param, body } from "express-validator";
import { isValidObjectId } from "./commonValidators.js";

export const songIdParamValidator = [
  param("songId").custom(isValidObjectId).withMessage("Invalid song ID."),
];

export const updateProgressValidator = [
  ...songIdParamValidator,
  body("positionSeconds")
    .isFloat({ min: 0 })
    .withMessage("positionSeconds must be a non-negative number."),
  body("completed").optional().isBoolean(),
];
