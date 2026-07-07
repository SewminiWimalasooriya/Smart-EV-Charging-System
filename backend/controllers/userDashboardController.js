import Booking from "../models/Booking.js";
import Notification from "../models/Notification.js";

export const getUserDashboard = async (req, res) => {
    try {

        const userId = req.user._id;

        // Dashboard Cards

        const totalBookings = await Booking.countDocuments({
            user: userId,
        });

        const confirmedBookings = await Booking.countDocuments({
            user: userId,
            status: "confirmed",
        });

        const cancelledBookings = await Booking.countDocuments({
            user: userId,
            status: "cancelled",
        });

       
        
        const latestBooking = await Booking.findOne({
            user: userId,
        })
            .populate("station", "stationName location")
            .populate("slot")
            .sort({ createdAt: -1 });

        
        // Notifications
       
        const notifications = await Notification.find({
            user: userId,
        })
            .sort({ createdAt: -1 })
            .limit(5);

        
        // Monthly Bookings
        

        const monthlyBookings = await Booking.aggregate([
            {
                $match: {
                    user: userId,
                },
            },
            {
                $group: {
                    _id: {
                        month: {
                            $month: "$createdAt",
                        },
                    },
                    bookings: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    "_id.month": 1,
                },
            },
        ]);

        const months = [
            "",
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

        const monthlyChart = monthlyBookings.map((item) => ({
            month: months[item._id.month],
            bookings: item.bookings,
        }));

        // Booking Status Chart

        const bookingStatus = await Booking.aggregate([
            {
                $match: {
                    user: userId,
                },
            },
            {
                $group: {
                    _id: "$status",
                    value: {
                        $sum: 1,
                    },
                },
            },
        ]);

        const statusChart = bookingStatus.map((item) => ({
            name: item._id,
            value: item.value,
        }));

        // Response
    
        res.status(200).json({
            success: true,

            cards: {
                totalBookings,
                confirmedBookings,
                cancelledBookings,
            },

            monthlyBookings: monthlyChart,

            bookingStatus: statusChart,

            latestBooking,

            notifications,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to load dashboard.",
        });

    }
};