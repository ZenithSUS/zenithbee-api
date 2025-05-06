import express from "express";
const router = express.Router();

import {
  addUser,
  fetchUsers,
  fetchUser,
  fetchUserAddresses,
  changeUserAddress,
} from "../controllers/user.js";

router.post("/", addUser);

router.get("/", fetchUsers);
router.get("/:id", fetchUser);
router.get("/addresses/:id", fetchUserAddresses);

router.put("/:id", changeUserAddress);
export default router;
