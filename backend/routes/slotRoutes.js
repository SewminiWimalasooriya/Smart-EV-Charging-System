import express from "express";
import {createSlot} from "../controllers/slotController.js";
import {protect} from "../middleware/auth.js";

const router = express.Router();

router.post("/create-slot", protect, createSlot);

export default router;