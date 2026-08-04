// controllers/genreController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import genreService from "../services/genreService.js";

export const createGenre = asyncHandler(async (req, res) => {
  const genre = await genreService.createGenre(req.body);
  res.status(201).json(new ApiResponse(201, "Genre created successfully.", genre));
});

export const updateGenre = asyncHandler(async (req, res) => {
  const genre = await genreService.updateGenre({ genreId: req.params.genreId, body: req.body });
  res.status(200).json(new ApiResponse(200, genre, "Genre updated successfully."));
});

export const deleteGenre = asyncHandler(async (req, res) => {
  const result = await genreService.deleteGenre(req.params.genreId);
  res.status(200).json(new ApiResponse(200, result, "Genre deleted successfully."));
});

export const listGenres = asyncHandler(async (req, res) => {
  const genres = await genreService.listGenres({
    activeOnly: req.query.all !== "true",
  });

  res.status(200).json(
    new ApiResponse(
      200,
      "Genres fetched successfully.",
      genres
    )
  );
});