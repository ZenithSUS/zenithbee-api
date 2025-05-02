import express from "express";
const router = express.Router();

import {
  addFavorite,
  removeFavorite,
  fetchFavorites,
} from "../controllers/favorite.js";

router.post("/", addFavorite);
router.delete("/:id", removeFavorite);
router.get("/:id", fetchFavorites);

export default router;