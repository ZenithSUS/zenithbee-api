import express from "express";
const router = express.Router();

import { addUser } from "../controllers/user.js";

router.post("/", addUser);

export default router;
