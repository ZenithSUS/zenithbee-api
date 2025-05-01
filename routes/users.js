import express from "express";
const router = express.Router();

import { addUser, fetchUsers } from "../controllers/user.js";


router.post("/", addUser);

router.get("/", fetchUsers);
export default router;
