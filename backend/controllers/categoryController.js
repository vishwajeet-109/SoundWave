// controllers/categoryController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import categoryService from "../services/categoryService.js";

export const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json(new ApiResponse(201,"Category created successfully.", category));
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory({
    categoryId: req.params.categoryId,
    body: req.body,
  });
  res.status(200).json(new ApiResponse(200, "Category updated successfully.",category));
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const result = await categoryService.deleteCategory(req.params.categoryId);
  res.status(200).json(new ApiResponse(200, "Category deleted successfully.", result));
});

export const listCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.listCategories({ activeOnly: req.query.all !== "true" });
  res.status(200).json(new ApiResponse(200, "Categories fetched successfully.", categories));
});
