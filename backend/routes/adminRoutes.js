import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import express from "express";
import adminController from "../controllers/adminController.js";
// Aapke project ke middleware (verifyJWT, verifyAdmin etc.) yahan import honge

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("ADMIN", "SUPER_ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin Dashboard",
    });
  }
);
// Create Artist Profile
router.post("/artists/create", adminController.createArtistByAdmin);

// Get All Artists List
router.get("/artists", adminController.getAllArtists);

// Delete Artist Account
router.delete("/artists/:id", adminController.deleteArtist);
export default router;