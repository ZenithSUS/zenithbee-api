import express from "express";
const router = express.Router();

import { fetchOrders, addOrder, removeOrder } from "../controllers/orders.js";

router.post("/", addOrder);
router.delete("/:id", removeOrder);
router.get("/:id", fetchOrders);

export default router;
