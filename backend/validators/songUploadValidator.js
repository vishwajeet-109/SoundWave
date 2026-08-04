// validators/songUploadValidator.js

import { body, param } from "express-validator";
import { isValidObjectId } from "./commonValidators.js";

export const uploadSongValidator = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Title is required.")
    .isString()
    .trim()
    .isLength({ min: 1, max: 150 })
    .withMessage("Title must be under 150 characters."),
  body("genre")
    .optional()
    .custom(isValidObjectId)
    .withMessage("Invalid genre ID."),
  body("category")
    .optional()
    .custom(isValidObjectId)
    .withMessage("Invalid category ID."),
  body("album")
    .optional()
    .custom(isValidObjectId)
    .withMessage("Invalid album ID."),
  body("language").optional().isString().trim().isLength({ max: 50 }),
  body("description").optional().isString().trim().isLength({ max: 1000 }),
  body("lyrics").optional().isString().trim().isLength({ max: 10000 }),
  body("isExplicit").optional().isBoolean().withMessage("isExplicit must be true or false."),
];

export const songIdParamValidator = [
  param("songId").custom(isValidObjectId).withMessage("Invalid song ID."),
];
