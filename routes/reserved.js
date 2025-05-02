import express from "express";
const router = express.Router();

import {
  addReserved,
  removeReserved,
  fetchReserved,
} from "../controllers/reserved.js";

router.post("/", addReserved);
router.delete("/:id", removeReserved);
router.get("/:id", fetchReserved);

export default router;
