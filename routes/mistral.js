import express from "express";
const router = express.Router();

import {
  postMistralResponse,
  getMistralResponse,
} from "../controllers/mistral.js";

router.get("/", getMistralResponse);
router.post("/", postMistralResponse);

export default router;
