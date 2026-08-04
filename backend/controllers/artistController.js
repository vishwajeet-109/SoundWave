import Artist from "../models/Artist.js";
import ApiError from "../utils/ApiError.js";

export const getArtists = async (req, res, next) => {
  try {
    const artists = await Artist.find({
      isActive: true,
    }).sort({
      followers: -1,
    });

    res.json({
      success: true,
      count: artists.length,
      data: artists,
    });
  } catch (err) {
    next(err);
  }
};

export const getArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      throw new ApiError(404, "Artist not found");
    }

    res.json({
      success: true,
      data: artist,
    });
  } catch (err) {
    next(err);
  }
};