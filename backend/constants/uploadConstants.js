// constants/uploadConstants.js

export const AUDIO_MIME_TYPES = Object.freeze([
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/flac",
  "audio/mp4",
  "audio/aac",
]);

export const IMAGE_MIME_TYPES = Object.freeze([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export const UPLOAD_LIMITS = Object.freeze({
  AUDIO_MAX_BYTES: 25 * 1024 * 1024, // 25 MB
  IMAGE_MAX_BYTES: 5 * 1024 * 1024, // 5 MB
});

export const CLOUDINARY_FOLDERS = Object.freeze({
  AUDIO: "soundwave/audio",
  COVERS: "soundwave/covers",
  AVATARS: "soundwave/avatars",
});
