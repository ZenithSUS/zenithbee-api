import express from "express";
const router = express.Router();

import {
  addUser,
  fetchUsers,
  fetchUser,
  changeUserAddress,
} from "../controllers/user.js";

router.post("/", addUser);

router.get("/", fetchUsers);
router.get("/:id", fetchUser);

router.put("/:id", changeUserAddress);
export default router;
