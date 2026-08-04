import mongoose from "mongoose";

import { CONTENT_STATUS, CONTENT_STATUS_LIST } from "../constants/contentStatus.js";

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      maxlength: 500,
    },

    image: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "#1DB954",
    },

    songCount: {
      type: Number,
      default: 0,
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
  }
);

genreSchema.index({
  name: "text",
  description: "text",
});

const Genre = mongoose.model("Genre", genreSchema);

export default Genre;