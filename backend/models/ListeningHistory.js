import mongoose from "mongoose";

const listeningHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: true,
    },

    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    playedAt: {
      type: Date,
      default: Date.now,
    },

    progress: {
      type: Number,
      default: 0,
    },

    duration: {
      type: Number,
      default: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    playCount: {
      type: Number,
      default: 1,
    },

    source: {
      type: String,
      enum: [
        "HOME",
        "SEARCH",
        "PLAYLIST",
        "ALBUM",
        "ARTIST",
        "RECOMMENDATION"
      ],
      default: "HOME",
    },
  },
  {
    timestamps: true,
  }
);

listeningHistorySchema.index({
  user: 1,
  playedAt: -1,
});

listeningHistorySchema.index({
  song: 1,
});

const ListeningHistory = mongoose.model(
  "ListeningHistory",
  listeningHistorySchema
);

export default ListeningHistory;