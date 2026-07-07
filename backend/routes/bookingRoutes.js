import {protect} from "../middleware/auth.js";
import { ownerOnly, userOnly } from "../middleware/roleCheckMiddleware.js";
import express from "express";
import {createBooking, getMyBookings, cancelBooking  } from "../controllers/bookingController.js";
import { verifyStationAccess} from "../middleware/verifyStationAccess.js"

const router = express.Router();

router.post("/create-booking",protect,userOnly,  verifyStationAccess, createBooking);
router.get("/get-my-bookings",protect,userOnly, verifyStationAccess,getMyBookings);
router.put("/cancel-booking/:id",protect,userOnly,verifyStationAccess,cancelBooking);

export default router;