import express from "express";
import {createSlot, getOwnerSlots, updateSlot, deleteSlot} from "../controllers/slotController.js";
import {protect} from "../middleware/auth.js";
import { ownerOnly } from "../middleware/roleCheckMiddleware.js";

const router = express.Router();

router.post("/create-slot", protect, ownerOnly, createSlot);
router.get("/get-owner-slots",protect,getOwnerSlots);
router.put("/update-owner-slot/:id",protect,ownerOnly,updateSlot);
router.delete("/delete-slot/:id",protect,ownerOnly, deleteSlot);

export default router;