// services/genreService.js

import Genre from "../models/Genre.js";
import { invalidate } from "../middleware/cacheMiddleware.js";
import ApiError from "../utils/ApiError.js";
import generateSlug from "../utils/slugGenerator.js";
import { CONTENT_STATUS } from "../constants/contentStatus.js";

const createGenre = async ({ name, description }) => {
  const existing = await Genre.findOne({ name: new RegExp(`^${name}$`, "i") });
  if (existing) throw new ApiError(409, "A genre with this name already exists.");

  const genre = await Genre.create({ name, slug: generateSlug(name), description });
  invalidate("genres:list");
  return genre;
};

const updateGenre = async ({ genreId, body }) => {
  const genre = await Genre.findById(genreId);
  if (!genre) throw new ApiError(404, "Genre not found.");

  if (body.name !== undefined) genre.name = body.name;
  if (body.description !== undefined) genre.description = body.description;
  if (body.status !== undefined) genre.status = body.status;

  await genre.save();
  invalidate("genres:list");
  return genre;
};

const deleteGenre = async (genreId) => {
  const genre = await Genre.findById(genreId);
  if (!genre) throw new ApiError(404, "Genre not found.");
  await genre.deleteOne();
  invalidate("genres:list");
  return { genreId };
};

const listGenres = async ({ activeOnly = true } = {}) => {
  const filter = activeOnly ? { status: CONTENT_STATUS.ACTIVE } : {};
  return Genre.find(filter).sort({ name: 1 }).lean();
};

export default { createGenre, updateGenre, deleteGenre, listGenres };
