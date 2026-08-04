// validators/engagementValidator.js
// Shared validators for likes, follows, and listening history routes.

import { param, query } from "express-validator";
import { isValidObjectId, paginationRules } from "./commonValidators.js";

export const songIdParamValidator = [
  param("songId").custom(isValidObjectId).withMessage("Invalid song ID."),
];

export const artistIdParamValidator = [
  param("artistId").custom(isValidObjectId).withMessage("Invalid artist ID."),
];

export const paginationQueryValidator = paginationRules;
