import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    verified: {
      type: Boolean,
      default: false,
    },

    monthlyListeners: {
      type: Number,
      default: 0,
    },

    genres: [
      {
        type: String,
      },
    ],

    followers: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Artist", artistSchema);