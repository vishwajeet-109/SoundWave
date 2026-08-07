import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ROLES } from "../constants/roles.js";
import { USER_STATUS } from "../constants/status.js";

class AdminController {
  // 1. Admin creates or upgrades a user to an Artist
  createArtistByAdmin = asyncHandler(async (req, res) => {
    const { name, email, password, bio, genre } = req.body;

    if (!email || !password || !name) {
      throw new ApiError(400, "Name, email, and password are required");
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail });

    if (user) {
      user.role = ROLES.ARTIST || "artist";
      user.status = USER_STATUS.ACTIVE || "active";
      if (bio) user.bio = bio;
      if (genre) user.genre = genre;
      await user.save();
      
      user.password = undefined;
      return res.status(200).json(
        new ApiResponse(200, "User upgraded to Artist successfully", user)
      );
    }

    const newArtist = await User.create({
      name,
      email: normalizedEmail,
      password,
      role: ROLES.ARTIST || "artist",
      status: USER_STATUS.ACTIVE || "active",
      emailVerified: true,
      bio: bio || "",
      genre: genre || ""
    });

    newArtist.password = undefined;

    res.status(201).json(
      new ApiResponse(201, "Artist account created successfully", newArtist)
    );
  });

  // 2. Get All Artists List for Admin Panel
  getAllArtists = asyncHandler(async (req, res) => {
    const artists = await User.find({ role: ROLES.ARTIST || "artist" }).select("-password");
    
    res.status(200).json(
      new ApiResponse(200, "Artists fetched successfully", artists)
    );
  });

  // 3. Delete or Remove Artist Account
  deleteArtist = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const artist = await User.findById(id);

    if (!artist) {
      throw new ApiError(404, "Artist not found");
    }

    await User.findByIdAndDelete(id);

    res.status(200).json(
      new ApiResponse(200, "Artist deleted successfully", { id })
    );
  });
}

export default new AdminController();