// constants/reportStatus.js

export const REPORT_STATUS = Object.freeze({
  PENDING: "PENDING",
  REVIEWED: "REVIEWED",
  DISMISSED: "DISMISSED",
  ACTIONED: "ACTIONED",
});

export const REPORT_REASONS = Object.freeze([
  "COPYRIGHT_VIOLATION",
  "EXPLICIT_CONTENT_UNTAGGED",
  "HATE_SPEECH",
  "SPAM",
  "MISLEADING_METADATA",
  "OTHER",
]);
