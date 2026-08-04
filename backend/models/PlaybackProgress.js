// models/PlaybackProgress.js
//
// Tracks "how far into this song did the user get" so playback can
// resume from the same spot on a different device. Upserted
// periodically by the client (e.g. every ~10s) while playing.

import mongoose from "mongoose";

const playbackProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    song: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
    positionSeconds: { type: Number, default: 0, min: 0 },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

playbackProgressSchema.index({ user: 1, song: 1 }, { unique: true });

const PlaybackProgress =
  mongoose.models.PlaybackProgress ||
  mongoose.model("PlaybackProgress", playbackProgressSchema);

export default PlaybackProgress;
