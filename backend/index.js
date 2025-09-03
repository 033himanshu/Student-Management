import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import studentsRouter from "./src/routes/students.route.js";
import uploadsRouter from "./src/routes/upload.route.js";

dotenv.config();

const app = express();
console.log("Allowed Origins:", process.env.ORIGIN?.split(",") || "*");
// app.options("*", cors());
app.use(cors({
  origin: process.env.ORIGIN?.split(",") || "*",  // allow multiple origins
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}));


app.use(urlencoded({ extended: true }));
app.use(express.json());



app.get("/", (_, res) => res.send("Student Grade API live"));

app.use("/api/students", studentsRouter);
app.use("/api/uploads", uploadsRouter);
app.use('*', (_, res) => res.status(404).json({ error: "Route not found" }));
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGODB_URI;
mongoose.connect(MONGO).then(() => {
  app.listen(PORT, () => console.log(`API on :${PORT}`));
}).catch(err => {
  console.error("Mongo connection error", err);
  process.exit(1);
});
