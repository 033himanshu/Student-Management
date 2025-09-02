import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import studentsRouter from "./src/routes/students.route.js";
import uploadsRouter from "./src/routes/upload.route.js";

dotenv.config();

const app = express();
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: process.env.ORIGIN?.split(",") || "*" }));
app.use(express.json());



app.get("/", (_, res) => res.send("Student Grade API live"));

app.use("/api/students", studentsRouter);
app.use("/api/uploads", uploadsRouter);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGODB_URI;

mongoose.connect(MONGO).then(() => {
  app.listen(PORT, () => console.log(`API on :${PORT}`));
}).catch(err => {
  console.error("Mongo connection error", err);
  process.exit(1);
});
