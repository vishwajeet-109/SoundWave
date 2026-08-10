// backend/models/Artist.js
import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Ek user ki sirf ek hi artist profile hogi
    },
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