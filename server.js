import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./middleware/logger.js";
import error from "./middleware/error.js";
import { fileURLToPath } from "url";
import { notFound } from "./middleware/not-found.js";

dotenv.config();
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
  })
);
app.use(logger);
app.use(error);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
