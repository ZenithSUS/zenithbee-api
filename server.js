import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

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

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
