// services/categoryService.js

import Category from "../models/Category.js";
import { invalidate } from "../middleware/cacheMiddleware.js";
import ApiError from "../utils/ApiError.js";
import generateSlug from "../utils/slugGenerator.js";
import { CONTENT_STATUS } from "../constants/contentStatus.js";

const createCategory = async ({ name, description }) => {
  const existing = await Category.findOne({ name: new RegExp(`^${name}$`, "i") });
  if (existing) throw new ApiError(409, "A category with this name already exists.");

  const category = await Category.create({ name, slug: generateSlug(name), description });
  invalidate("categories:list");
  return category;
};

const updateCategory = async ({ categoryId, body }) => {
  const category = await Category.findById(categoryId);
  if (!category) throw new ApiError(404, "Category not found.");

  if (body.name !== undefined) category.name = body.name;
  if (body.description !== undefined) category.description = body.description;
  if (body.status !== undefined) category.status = body.status;

  await category.save();
  invalidate("categories:list");
  return category;
};

const deleteCategory = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) throw new ApiError(404, "Category not found.");
  await category.deleteOne();
  invalidate("categories:list");
  return { categoryId };
};

const listCategories = async ({ activeOnly = true } = {}) => {
  const filter = activeOnly ? { status: CONTENT_STATUS.ACTIVE } : {};
  return Category.find(filter).sort({ name: 1 }).lean();
};

export default { createCategory, updateCategory, deleteCategory, listCategories };
