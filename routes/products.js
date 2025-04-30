import express from "express";
const router = express.Router();

import { addProduct, fetchProducts } from "../controllers/product.js";

// Post Routes
router.post("/", addProduct);

// Get Routes
router.get("/", fetchProducts);

export default router;
