import User from "../models/User.js";
import Apartment from "../models/Apartment.js";
import ApartmentRequest from "../models/ApartmentRequest.js";
import Booking from "../models/Booking.js";



export const getAdminOverview = async (req, res) => {

    try {


        // Total registered users
        const totalUsers = await User.countDocuments({
            role: "user"
        });

        // Total stations
        const totalStations = await Apartment.countDocuments();

        // Active stations
        const activeStations = await Apartment.countDocuments({
            status: "approved"
        });

        // Blocked stations
        const blockedStations = await Apartment.countDocuments({
            status: "blocked"
        });

        // Pending requests
        const pendingRequests =
            await ApartmentRequest.countDocuments({
                status: "PENDING"
            });


        // Total bookings

        const totalBookings =
            await Booking.countDocuments();

        // Today bookings

        const today = new Date();

        today.setHours(0,0,0,0);

        const todayBookings =
            await Booking.countDocuments({

                createdAt:{
                    $gte:today
                }

            });


        // Booking status summary

        const confirmedBookings =
            await Booking.countDocuments({

                status:"confirmed"

            });

        const cancelledBookings =
            await Booking.countDocuments({

                status:"cancelled"

            });

        // Recent station requests

        const recentRequests =
            await ApartmentRequest.find()

            .sort({
                createdAt:-1
            })

            .limit(3)

            .select(
                "name ownerName email status createdAt"
            );

        // Recent bookings

        const recentBookings =
            await Booking.find()

            .populate(
                "user",
                "username email"
            )

            .populate(
                "station",
                "name"
            )

            .sort({
                createdAt:-1
            })

            .limit(4);

        res.status(200).json({

            success:true,


            overview:{
                totalUsers,
                totalStations,
                activeStations,
                blockedStations,
                pendingRequests,
                totalBookings,
                todayBookings,
                confirmedBookings,
                cancelledBookings
            },
            recentRequests,
            recentBookings

        });

    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message

        });

    }

};