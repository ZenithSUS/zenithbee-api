import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./middleware/logger.js";
import error from "./middleware/error.js";
import mistral from "./routes/mistral.js";
import users from "./routes/users.js";
import products from "./routes/products.js";
import favorites from "./routes/favorite.js";
import orders from "./routes/orders.js";
import reserved from "./routes/reserved.js";
import { fileURLToPath } from "url";
import { notFound } from "./middleware/not-found.js";

dotenv.config();
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

// Routes
app.use("/api/mistral", mistral);
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/orders", orders);
app.use("/api/favorites", favorites);
app.use("/api/reserved", reserved);

app.use(notFound);
app.use(error);

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
