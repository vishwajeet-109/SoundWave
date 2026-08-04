import mongoose from "mongoose";

import { SONG_STATUS, SONG_STATUS_LIST, SONG_VISIBILITY, SONG_VISIBILITY_LIST } from "../constants/songStatus.js";

const songSchema = new mongoose.Schema(
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

    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    },

    coverImage: {
      type: String,
      default: "",
    },

    audioFile: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      default: 0,
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

    lyrics: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
      },
    ],

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

    downloadCount: {
      type: Number,
      default: 0,
    },

    shareCount: {
      type: Number,
      default: 0,
    },

    isExplicit: {
      type: Boolean,
      default: false,
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

    // Future Ready Fields

    composer: {
      type: String,
      default: "",
    },

    producer: {
      type: String,
      default: "",
    },

    label: {
      type: String,
      default: "",
    },

    copyright: {
      type: String,
      default: "",
    },

    isrc: {
      type: String,
      default: "",
    },

    bpm: {
      type: Number,
      default: 0,
    },

    musicalKey: {
      type: String,
      default: "",
    },

    mood: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes

songSchema.index(
  {
    title: "text",
    description: "text",
    tags: "text",
  },
  {
    language_override: "mongoLanguage",
  }
);

songSchema.index({
  artist: 1,
});

songSchema.index({
  album: 1,
});

songSchema.index({
  status: 1,
});

songSchema.index({
  genre: 1,
});

songSchema.index({
  category: 1,
});

songSchema.index({
  language: 1,
});

const Song = mongoose.model("Song", songSchema);

export default Song;