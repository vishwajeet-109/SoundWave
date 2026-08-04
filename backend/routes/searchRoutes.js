// routes/searchRoutes.js
//
// Mount example:
//   import searchRoutes from "./searchRoutes.js";
//   router.use("/search", searchRoutes);
// Final path: GET /api/v1/search?q=&type=

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { searchLimiter } from "../middleware/rateLimiter.js";
import { searchValidator } from "../validators/searchValidator.js";
import { search } from "../controllers/searchController.js";

const router = Router();

router.get("/", searchLimiter, authMiddleware, searchValidator, validateRequest, search);

export default router;
