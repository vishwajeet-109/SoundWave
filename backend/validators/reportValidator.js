// validators/reportValidator.js

import { body, param, query } from "express-validator";
import { REPORT_REASONS, REPORT_STATUS } from "../constants/reportStatus.js";
import { isValidObjectId, paginationRules } from "./commonValidators.js";

export const reportIdParamValidator = [
  param("reportId").custom(isValidObjectId).withMessage("Invalid report ID."),
];

export const createReportValidator = [
  body("songId").optional().custom(isValidObjectId).withMessage("Invalid song ID."),
  body("artistId").optional().custom(isValidObjectId).withMessage("Invalid artist ID."),
  body("reason")
    .exists({ checkFalsy: true })
    .withMessage("Reason is required.")
    .isIn(REPORT_REASONS)
    .withMessage(`Reason must be one of: ${REPORT_REASONS.join(", ")}`),
  body("description").optional().isString().trim().isLength({ max: 1000 }),
  body().custom((value) => {
    if (!value.songId && !value.artistId) {
      throw new Error("Either songId or artistId is required.");
    }
    return true;
  }),
];

export const reviewReportValidator = [
  ...reportIdParamValidator,
  body("status")
    .exists({ checkFalsy: true })
    .withMessage("Status is required.")
    .isIn([REPORT_STATUS.REVIEWED, REPORT_STATUS.DISMISSED, REPORT_STATUS.ACTIONED])
    .withMessage("Invalid review status."),
  body("note").optional().isString().trim().isLength({ max: 500 }),
];

export const listReportsValidator = [
  ...paginationRules,
  query("status").optional().isIn(Object.values(REPORT_STATUS)),
];
