// models/Queue.js
//
// One queue document per user. Previously (Sprint 3.3) the queue only
// existed as an in-memory socket broadcast — a device joining late or
// reconnecting had nothing to sync against. Persisting it here fixes
// that.

import mongoose from "mongoose";

const queueSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
    currentIndex: { type: Number, default: 0 },
    isShuffled: { type: Boolean, default: false },
    repeatMode: { type: String, enum: ["OFF", "ONE", "ALL"], default: "OFF" },
  },
  { timestamps: true }
);

const Queue = mongoose.models.Queue || mongoose.model("Queue", queueSchema);

export default Queue;
