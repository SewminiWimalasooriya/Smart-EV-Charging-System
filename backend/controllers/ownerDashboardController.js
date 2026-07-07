import Slot from "../models/Slot.js";
import Booking from "../models/Booking.js";

export const getDashboardStats = async (req, res) => {
  try {
    const stationId = req.user.apartment;

    // Total slots
    const totalSlots = await Slot.countDocuments({
      station: stationId,
    });

    // Available slots
    const availableSlots = await Slot.countDocuments({
      station: stationId,
      status: "available",
    });

    // Booked slots
    const bookedSlots = await Slot.countDocuments({
      station: stationId,
      status: "booked",
    });

    // Maintenance slots
    const maintenanceSlots = await Slot.countDocuments({
      station: stationId,
      status: "maintenance",
    });

    // Today's bookings
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayBookings = await Booking.countDocuments({
      station: stationId,
      status: "confirmed",
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    res.status(200).json({
      success: true,
      stats: {
        totalSlots,
        availableSlots,
        bookedSlots,
        maintenanceSlots,
        todayBookings,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//recent active user count check
export const getRecentActivities = async (req, res) => {
  try {

    const stationId = req.user.apartment;

    const activities = await Booking.find({
      station: stationId,
    })
      .populate("user", "username")
      .populate("slot", "slotName")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      activities,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

//add chart 


export const getBookingAnalytics = async (req, res) => {
  try {
    const stationId = req.user.apartment;

    const analytics = await Booking.aggregate([
      {
        $match: {
          station: stationId,
          status: "confirmed",
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalBookings: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const chartData = months.map((month, index) => {
      const found = analytics.find(
        (item) => item._id.month === index + 1
      );

      return {
        month,
        bookings: found ? found.totalBookings : 0,
      };
    });

    res.status(200).json({
      success: true,
      chartData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};