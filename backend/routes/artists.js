import express from "express";

import {
  getArtist,
  getArtists,
} from "../controllers/artistController.js";

const router = express.Router();

router.get("/", getArtists);

router.get("/:id", getArtist);

export default router;