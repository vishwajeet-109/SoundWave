// routes/genreRoutes.js
// Mount at /api/v1/genres

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { cache } from "../middleware/cacheMiddleware.js";
import { adminLimiter } from "../middleware/rateLimiter.js";
import { CACHE_TTL } from "../config/security.js";
import { ROLES } from "../constants/roles.js";

import {
  createGenreValidator,
  updateGenreValidator,
  genreIdParamValidator,
} from "../validators/genreValidator.js";
import {
  createGenre,
  updateGenre,
  deleteGenre,
  listGenres,
} from "../controllers/genreController.js";

const router = Router();

router.get("/", cache("genres:list", CACHE_TTL.genreListTtlSeconds), listGenres);

router.use(authMiddleware, roleMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN));

router.post("/", adminLimiter, createGenreValidator, validateRequest, createGenre);
router.patch("/:genreId", adminLimiter, updateGenreValidator, validateRequest, updateGenre);
router.delete("/:genreId", adminLimiter, genreIdParamValidator, validateRequest, deleteGenre);

export default router;
