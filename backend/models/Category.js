import mongoose from "mongoose";

import { CONTENT_STATUS, CONTENT_STATUS_LIST } from "../constants/contentStatus.js";

const categorySchema = new mongoose.Schema(
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

categorySchema.index({
  name: "text",
  description: "text",
});

const Category = mongoose.model("Category", categorySchema);

export default Category;