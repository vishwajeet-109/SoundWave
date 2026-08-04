// validators/songApprovalValidator.js

import { param, query, body } from "express-validator";
import { SONG_STATUS } from "../constants/songStatus.js";
import { isValidObjectId, paginationRules } from "./commonValidators.js";

export const songIdParamValidator = [
  param("songId")
    .custom(isValidObjectId)
    .withMessage("Invalid song ID."),
];

export const listSongsByStatusValidator = [
  query("status")
    .optional()
    .isIn(Object.values(SONG_STATUS))
    .withMessage("Invalid status filter."),
  ...paginationRules,
  query("search")
    .optional()
    .isString()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Search query is too long."),
];

export const approveSongValidator = [
  ...songIdParamValidator,
  body("note")
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Note must be under 500 characters."),
];

export const rejectSongValidator = [
  ...songIdParamValidator,
  body("reason")
    .exists({ checkFalsy: true })
    .withMessage("Rejection reason is required.")
    .isString()
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage("Rejection reason must be between 5 and 500 characters."),
];

export const blockSongValidator = [
  ...songIdParamValidator,
  body("reason")
    .exists({ checkFalsy: true })
    .withMessage("Block reason is required.")
    .isString()
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage("Block reason must be between 5 and 500 characters."),
];

export const unblockSongValidator = [...songIdParamValidator];
