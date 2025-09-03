import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import studentsRouter from "./src/routes/students.route.js";
import uploadsRouter from "./src/routes/upload.route.js";

dotenv.config();

const app = express();
// console.log("Allowed Origins:", process.env.ORIGIN?.split(",") || "*");
// app.options("*", cors());
// const allowedOrigins = process.env.ORIGIN?.split(",") || [];
// console.log("Allowed Origins:", allowedOrigins);
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PATCH", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));
const allowedOrigins = process.env.ORIGIN?.split(",").map(o => o.trim()) || [];
console.log("Allowed Origins:", allowedOrigins);
app.use(cors({
  origin: allowedOrigins, 
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true,
}));



app.use(urlencoded({ extended: true }));
app.use(express.json());

app._router.stack.forEach((r) => {
  if (r.route) {
    console.log("Route:", r.route.path);
  } else if (r.name === "router") {
    console.log("Mounted router:", r.regexp);
  }
});


app.get("/", (_, res) => res.send("Student Grade API live"));

// app.use("/api/students", studentsRouter);
// app.use("/api/uploads", uploadsRouter);

console.log("Mounting students router at /api/students");
app.use("/api/students", studentsRouter);

console.log("Mounting uploads router at /api/uploads");
app.use("/api/uploads", uploadsRouter);


app.use("*", (_, res) => res.status(404).json({ error: "Route not found" }));
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGODB_URI;
mongoose.connect(MONGO).then(() => {
  app.listen(PORT, () => console.log(`API on :${PORT}`));
}).catch(err => {
  console.error("Mongo connection error", err);
  process.exit(1);
});
