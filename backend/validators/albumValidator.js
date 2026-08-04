// validators/albumValidator.js

import { body, param, query } from "express-validator";
import { VISIBILITY } from "../constants/visibility.js";
import { isValidObjectId, paginationRules } from "./commonValidators.js";

export const albumIdParamValidator = [
  param("albumId").custom(isValidObjectId).withMessage("Invalid album ID."),
];

export const createAlbumValidator = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Title is required.")
    .isString()
    .trim()
    .isLength({ min: 1, max: 150 }),
  body("description").optional().isString().trim().isLength({ max: 1000 }),
  body("genre").optional().custom(isValidObjectId).withMessage("Invalid genre ID."),
  body("category").optional().custom(isValidObjectId).withMessage("Invalid category ID."),
  body("releaseDate").optional().isISO8601().withMessage("Invalid release date."),
  body("visibility")
    .optional()
    .isIn(Object.values(VISIBILITY))
    .withMessage("Invalid visibility value."),
];

export const updateAlbumValidator = [
  ...albumIdParamValidator,
  body("title").optional().isString().trim().isLength({ min: 1, max: 150 }),
  body("description").optional().isString().trim().isLength({ max: 1000 }),
  body("genre").optional().custom(isValidObjectId).withMessage("Invalid genre ID."),
  body("category").optional().custom(isValidObjectId).withMessage("Invalid category ID."),
  body("releaseDate").optional().isISO8601().withMessage("Invalid release date."),
  body("visibility")
    .optional()
    .isIn(Object.values(VISIBILITY))
    .withMessage("Invalid visibility value."),
];

export const albumSongMutationValidator = [
  ...albumIdParamValidator,
  body("songId").custom(isValidObjectId).withMessage("Invalid song ID."),
];

export const listAlbumsValidator = [
  ...paginationRules,
  query("artist").optional().custom(isValidObjectId).withMessage("Invalid artist ID."),
  query("genre").optional().custom(isValidObjectId).withMessage("Invalid genre ID."),
];
