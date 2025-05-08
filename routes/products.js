import express from "express";
const router = express.Router();

import {
  addProduct,
  fetchPopularProducts,
  fetchProducts,
} from "../controllers/product.js";

// Post Routes
router.post("/", addProduct);

// Get Routes
router.get("/", fetchProducts);
router.get("/popular", fetchPopularProducts);

export default router;
