import { Router } from "express";
import {uploadMiddleware} from "../middlewares/multer.middleware.js"
import {
  uploadStudents, listStudents, updateStudent, deleteStudent
} from "../controllers/student.controller.js";

const router = Router();
// router.get("/", (_, res) => res.send("Students route live"));
router.post("/upload", uploadMiddleware, uploadStudents);
router.get("/", listStudents);
router.patch("/", updateStudent);
router.delete("/", deleteStudent);

export default router;
