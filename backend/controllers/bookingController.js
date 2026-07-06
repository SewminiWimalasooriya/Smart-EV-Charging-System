import Booking from "../models/Booking.js";
import Slot from "../models/Slot.js";
import Notification from "../models/Notification.js";

/**
 * =========================
 * CREATE BOOKING
 * =========================
 */
export const createBooking = async (req, res) => {
  try {
    const { slotId } = req.body;

    const userId = req.user._id;

    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found",
      });
    }

    // only available slots
    if (slot.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "Slot not available for booking",
      });
    }

    // prevent duplicate booking
    const existingBooking = await Booking.findOne({
      user: userId,
      slot: slotId,
      status: "confirmed",
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "You already booked this slot",
      });
    }

    // create booking
    const booking = await Booking.create({
      user: userId,
      station: slot.station,
      slot: slot._id,
      status: "confirmed",
    });

    // update slot
    slot.status = "booked";
    await slot.save();

    // notification
    await Notification.create({
      user: userId,
      title: "Booking Confirmed",
      message: `Your booking for ${slot.slotName} is confirmed`,
      type: "booking_success",
    });

    res.status(201).json({
      success: true,
      message: "Booking successful",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * GET MY BOOKINGS
 * =========================
 */
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("slot")
      .populate("station")
      .sort({ createdAt: -1 });

    if (!bookings.length) {
      return res.status(404).json({
        success: false,
        message: "No bookings found",
      });
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * CANCEL BOOKING
 * =========================
 */
export const cancelBooking = async (req, res) => {
  try {
    
    const booking = await Booking.findById(req.params.id);
    

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // only owner can cancel
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking already cancelled",
      });
    }

    // cancel booking
    booking.status = "cancelled";
    await booking.save();

    // free slot
    const slot = await Slot.findById(booking.slot);

    if (slot) {
      slot.status = "available";
      await slot.save();
    }

    // notification (NEW FORMAT)
    await Notification.create({
      user: req.user._id,
      title: "Booking Cancelled",
      message: `Your booking for ${slot?.slotName || "slot"} has been cancelled`,
      type: "booking_cancel",
    });

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};