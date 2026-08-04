import mongoose from "mongoose";

import { SONG_STATUS, SONG_STATUS_LIST, SONG_VISIBILITY, SONG_VISIBILITY_LIST } from "../constants/songStatus.js";

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    genre: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "Hindi",
    },

    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],

    totalSongs: {
      type: Number,
      default: 0,
    },

    totalDuration: {
      type: Number,
      default: 0,
    },

    releaseDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: SONG_STATUS_LIST,
      default: SONG_STATUS.PENDING,
    },

    visibility: {
      type: String,
      enum: SONG_VISIBILITY_LIST,
      default: SONG_VISIBILITY.PUBLIC,
    },

    playCount: {
      type: Number,
      default: 0,
    },

    likeCount: {
      type: Number,
      default: 0,
    },

    followerCount: {
      type: Number,
      default: 0,
    },

    shareCount: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    rejectedReason: {
      type: String,
      default: "",
    },

    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

albumSchema.index({
  title: "text",
  description: "text",
});

albumSchema.index({
  artist: 1,
});

albumSchema.index({
  status: 1,
});

albumSchema.index({
  genre: 1,
});

albumSchema.index({
  category: 1,
});

albumSchema.index({
  language: 1,
});

const Album = mongoose.model("Album", albumSchema);

export default Album;