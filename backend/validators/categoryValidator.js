// validators/categoryValidator.js

import { body, param } from "express-validator";
import { CONTENT_STATUS } from "../constants/contentStatus.js";
import { isValidObjectId } from "./commonValidators.js";

export const categoryIdParamValidator = [
  param("categoryId").custom(isValidObjectId).withMessage("Invalid category ID."),
];

export const createCategoryValidator = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required.")
    .isString()
    .trim()
    .isLength({ min: 1, max: 60 }),
  body("description").optional().isString().trim().isLength({ max: 300 }),
];

export const updateCategoryValidator = [
  ...categoryIdParamValidator,
  body("name").optional().isString().trim().isLength({ min: 1, max: 60 }),
  body("description").optional().isString().trim().isLength({ max: 300 }),
  body("status").optional().isIn(Object.values(CONTENT_STATUS)),
];
