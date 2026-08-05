import mongoose from "mongoose";

import {
  CONTENT_STATUS,
  CONTENT_STATUS_LIST,
} from "../constants/contentStatus.js";
import { VISIBILITY, VISIBILITY_LIST } from "../constants/visibility.js";

const playlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

        slug: {
  type: String,
  unique: true,
  required: true,
  lowercase: true,
  trim: true,
  index: true,
},

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500,
    },

    coverImage: {
      type: String,
      default: "",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],

    visibility: {
      type: String,
      enum: VISIBILITY_LIST,
      default: VISIBILITY.PRIVATE,
    },

    isCollaborative: {
      type: Boolean,
      default: false,
    },

    isLikedPlaylist: {
      type: Boolean,
      default: false,
    },

    isSystemPlaylist: {
      type: Boolean,
      default: false,
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    playCount: {
      type: Number,
      default: 0,
    },

    totalSongs: {
      type: Number,
      default: 0,
    },

    totalDuration: {
      type: Number,
      default: 0,
    },

    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    lastPlayedAt: {
      type: Date,
      default: null,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: CONTENT_STATUS_LIST,
      default: CONTENT_STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
  },
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/
playlistSchema.index({
  title: "text",
  description: "text",
});

playlistSchema.index({
  owner: 1,
});

playlistSchema.index({
  visibility: 1,
});

playlistSchema.index({
  status: 1,
});
playlistSchema.index({
  songs: 1,
});
playlistSchema.index({
  followers: 1,
});

playlistSchema.index({
  followers: -1,
  playCount: -1,
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
