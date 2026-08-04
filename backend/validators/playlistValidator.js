// validators/playlistValidator.js

import { body, param, query } from "express-validator";
import { VISIBILITY } from "../constants/visibility.js";
import { isValidObjectId, paginationRules } from "./commonValidators.js";

export const playlistIdParamValidator = [
  param("playlistId").custom(isValidObjectId).withMessage("Invalid playlist ID."),
];

export const createPlaylistValidator = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Title is required.")
    .isString()
    .trim()
    .isLength({ min: 1, max: 150 }),
  body("description").optional().isString().trim().isLength({ max: 1000 }),
  body("visibility")
    .optional()
    .isIn(Object.values(VISIBILITY))
    .withMessage("Invalid visibility value."),
  body("isCollaborative").optional().isBoolean(),
];

export const updatePlaylistValidator = [
  ...playlistIdParamValidator,
  body("title").optional().isString().trim().isLength({ min: 1, max: 150 }),
  body("description").optional().isString().trim().isLength({ max: 1000 }),
  body("visibility")
    .optional()
    .isIn(Object.values(VISIBILITY))
    .withMessage("Invalid visibility value."),
  body("isCollaborative").optional().isBoolean(),
];

export const playlistSongMutationValidator = [
  ...playlistIdParamValidator,
  body("songId").custom(isValidObjectId).withMessage("Invalid song ID."),
];

export const listPlaylistsValidator = [
  ...paginationRules,
];
