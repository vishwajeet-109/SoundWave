import mongoose from "mongoose";
import { query } from "express-validator";

export const isValidObjectId = (value) => {
  if (typeof value !== "string" || !value) {
    return false;
  }

  return mongoose.Types.ObjectId.isValid(value);
};

export const paginationRules = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer."),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100."),
];
