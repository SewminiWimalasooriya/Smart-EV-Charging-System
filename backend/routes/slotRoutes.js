import express from "express";
import {createSlot, getOwnerSlots, updateSlot, deleteSlot, getBookedSlotsWithUsers, ownerCancelBooking} from "../controllers/slotController.js";
import {verifyStationOwner}from "../middleware/verifyStationOwner.js";
import {protect} from "../middleware/auth.js";
import { ownerOnly } from "../middleware/roleCheckMiddleware.js";

const router = express.Router();

router.post("/create-slot", protect, ownerOnly,verifyStationOwner, createSlot);
router.get("/get-owner-slots",protect,getOwnerSlots);
router.put("/update-owner-slot/:id",protect,ownerOnly,verifyStationOwner,updateSlot);
router.delete("/delete-slot/:id",protect,ownerOnly,verifyStationOwner, deleteSlot);
router.get("/getBookedSlotsWithUsers",protect,ownerOnly,verifyStationOwner,getBookedSlotsWithUsers);
router.put("/owner-cancel-booking/:bookingId",protect,ownerOnly,verifyStationOwner,ownerCancelBooking)

export default router;