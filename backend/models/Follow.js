import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// One user can follow one artist only once
followSchema.index(
  {
    follower: 1,
    artist: 1,
  },
  {
    unique: true,
  }
);

const Follow = mongoose.model(
  "Follow",
  followSchema
);

export default Follow;