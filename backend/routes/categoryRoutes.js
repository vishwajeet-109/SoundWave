// routes/categoryRoutes.js
// Mount at /api/v1/categories

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { cache } from "../middleware/cacheMiddleware.js";
import { adminLimiter } from "../middleware/rateLimiter.js";
import { CACHE_TTL } from "../config/security.js";
import { ROLES } from "../constants/roles.js";
import {
  createCategoryValidator,
  updateCategoryValidator,
  categoryIdParamValidator,
} from "../validators/categoryValidator.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategories,
} from "../controllers/categoryController.js";

const router = Router();

router.get("/", cache("categories:list", CACHE_TTL.categoryListTtlSeconds), listCategories);

router.use(authMiddleware, roleMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN));

router.post("/", adminLimiter, createCategoryValidator, validateRequest, createCategory);
router.patch("/:categoryId", adminLimiter, updateCategoryValidator, validateRequest, updateCategory);
router.delete("/:categoryId", adminLimiter, categoryIdParamValidator, validateRequest, deleteCategory);

export default router;
