// models/Report.js

import mongoose from "mongoose";
import { REPORT_STATUS, REPORT_REASONS } from "../constants/reportStatus.js";

const reportSchema = new mongoose.Schema(
  {
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    song: { type: mongoose.Schema.Types.ObjectId, ref: "Song", default: null, index: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
    reason: { type: String, enum: REPORT_REASONS, required: true },
    description: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: Object.values(REPORT_STATUS),
      default: REPORT_STATUS.PENDING,
      index: true,
    },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    reviewedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

reportSchema.index({ song: 1, status: 1 });

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;
