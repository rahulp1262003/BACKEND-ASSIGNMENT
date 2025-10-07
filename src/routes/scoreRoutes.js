import express from "express";
import { runScoring, getResults } from "../controllers/scoreController.js";
const router = express.Router();

router.post("/", runScoring);
router.get("/results", getResults);

export default router;
