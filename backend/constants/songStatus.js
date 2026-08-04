// constants/songStatus.js

export const SONG_STATUS = Object.freeze({
  DRAFT: "DRAFT",
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  BLOCKED: "BLOCKED",
});

export const SONG_STATUS_LIST = Object.freeze(Object.values(SONG_STATUS));

export const SONG_VISIBILITY = Object.freeze({
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
  UNLISTED: "UNLISTED",
});

export const SONG_VISIBILITY_LIST = Object.freeze(Object.values(SONG_VISIBILITY));

export const VISIBILITY = SONG_VISIBILITY;
export const VISIBILITY_LIST = SONG_VISIBILITY_LIST;

// Allowed transitions for the admin approval workflow.
// Keeping this centralized avoids duplicating workflow logic across services.
export const SONG_STATUS_TRANSITIONS = Object.freeze({
  [SONG_STATUS.PENDING]: [SONG_STATUS.APPROVED, SONG_STATUS.REJECTED, SONG_STATUS.BLOCKED],
  [SONG_STATUS.APPROVED]: [SONG_STATUS.BLOCKED],
  [SONG_STATUS.REJECTED]: [SONG_STATUS.PENDING],
  [SONG_STATUS.BLOCKED]: [SONG_STATUS.PENDING, SONG_STATUS.APPROVED],
  [SONG_STATUS.DRAFT]: [SONG_STATUS.PENDING],
});
