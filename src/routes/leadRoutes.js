import express from "express";
import { uploadMiddleware, uploadLeads } from "../controllers/leadController.js";
const router = express.Router();

router.post("/upload", uploadMiddleware, uploadLeads);
export default router;
