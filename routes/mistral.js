import express from "express";
const router = express.Router();

import { MistralAI, getMistraResponse } from "../controllers/mistral.js";

router.get("/", getMistraResponse);
router.post("/", MistralAI);

export default router;
