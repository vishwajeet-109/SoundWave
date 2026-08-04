// validators/searchValidator.js

import { query } from "express-validator";
import { paginationRules } from "./commonValidators.js";

const SEARCHABLE_TYPES = ["song", "album", "artist", "playlist"];

export const searchValidator = [
  query("q")
    .exists({ checkFalsy: true })
    .withMessage("Search query is required.")
    .isString()
    .trim()
    .isLength({ min: 1, max: 200 }),
  query("type")
    .optional()
    .isIn(SEARCHABLE_TYPES)
    .withMessage(`type must be one of: ${SEARCHABLE_TYPES.join(", ")}`),
  ...paginationRules,
];

export { SEARCHABLE_TYPES };
