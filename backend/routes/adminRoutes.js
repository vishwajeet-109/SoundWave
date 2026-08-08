import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";
import { registerValidator } from "../validators/authValidator.js";
import validateRequest from "../middleware/validateRequest.js";
import adminController from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin Dashboard",
    });
  }
);

// Create Artist Profile
router.post(
  "/artists",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  registerValidator,
  validateRequest,
  adminController.createArtistByAdmin
);

// Get All Artists List
router.get(
  "/artists",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  adminController.getAllArtists
);

// Delete Artist Account
router.delete(
  "/artists/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  adminController.deleteArtist
);
export default router;