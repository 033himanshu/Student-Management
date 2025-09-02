import { Router } from "express";
import { listUploads } from "../controllers/upload.controller.js";

const router = Router();
router.get("/", listUploads);
// router.get("/", (_, res) => res.send("Uploads route live"));

export default router;
