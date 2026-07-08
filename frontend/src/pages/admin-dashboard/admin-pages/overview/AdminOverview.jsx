import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
    FiMapPin,
    FiUsers,
    FiClock,
    FiShield,
    FiZap,
    FiCalendar,
    FiActivity,
    FiTrendingUp,
    FiArrowUpRight,
    FiCheckCircle
} from "react-icons/fi";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

import API from "../../../../api";

const AdminOverview = () => {

    const { token } = useSelector(
        state => state.adminAuth
    );

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState(null);

    const getOverview = async () => {

        try {

            const config = {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            };

            const res = await API.get(

                "/admin/dashboard/overview",

                config

            );

            setData(res.data);

        }

        catch (error) {

            console.log(
                error.response?.data || error.message
            );

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        if (token) {

            getOverview();

        }

    }, [token]);

    if (loading) {

        return (

            <div className="
                flex
                justify-center
                items-center
                h-screen
                text-cyan-400
                text-xl
            ">

                Loading Dashboard...

            </div>

        );

    }

    const overview = data?.overview || {};

    const chartData = data?.bookingChart || [];

    const stats = [

        {
            title: "Total Stations",
            value: overview.totalStations || 0,
            icon: <FiMapPin />,
            color: "cyan"
        },

        {
            title: "Active Stations",
            value: overview.activeStations || 0,
            icon: <FiZap />,
            color: "green"
        },

        {
            title: "Pending Requests",
            value: overview.pendingRequests || 0,
            icon: <FiClock />,
            color: "yellow"
        },

        {
            title: "Total Users",
            value: overview.totalUsers || 0,
            icon: <FiUsers />,
            color: "purple"
        },

        {
            title: "Blocked Stations",
            value: overview.blockedStations || 0,
            icon: <FiShield />,
            color: "red"
        },

        {
            title: "Today's Bookings",
            value: overview.todayBookings || 0,
            icon: <FiCalendar />,
            color: "orange"
        }

    ];

    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold text-white">

                        VoltSpot Admin Dashboard ⚡

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Monitor and manage your EV Charging Network

                    </p>

                </div>

                <div className="flex gap-4">

                    <div className="
                        bg-[#0F1B2D]
                        border
                        border-green-400/20
                        rounded-2xl
                        px-5
                        py-3
                        flex
                        items-center
                        gap-3
                    ">

                        <FiActivity className="text-green-400"/>

                        <div>

                            <p className="text-xs text-slate-400">

                                System Status

                            </p>

                            <p className="text-green-400 font-semibold">

                                Online

                            </p>

                        </div>

                    </div>

                    <div className="
                        bg-[#0F1B2D]
                        border
                        border-cyan-400/20
                        rounded-2xl
                        px-5
                        py-3
                    ">

                        <p className="text-xs text-slate-400">

                            Today

                        </p>

                        <h3 className="text-white font-semibold">

                            {new Date().toLocaleDateString()}

                        </h3>

                    </div>

                </div>

            </div>

            {/* Statistics */}

            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
            ">

                {stats.map((item) => (

                    <div
                        key={item.title}
                        className="
                            bg-[#0F1B2D]
                            rounded-3xl
                            border
                            border-white/10
                            p-6
                            hover:border-cyan-400/40
                            transition
                            duration-300
                        "
                    >

                        <div className="flex justify-between">

                            <div>

                                <p className="text-slate-400">

                                    {item.title}

                                </p>

                                <h2 className="text-4xl font-bold text-white mt-4">

                                    {item.value}

                                </h2>

                            </div>

                            <div className="
                                w-14
                                h-14
                                rounded-2xl
                                bg-cyan-400/20
                                flex
                                items-center
                                justify-center
                                text-cyan-400
                                text-2xl
                            ">

                                {item.icon}

                            </div>

                        </div>

                        <div className="mt-6 flex items-center gap-2 text-green-400 text-sm">

                            <FiArrowUpRight/>

                            Live Statistics

                        </div>

                    </div>

                ))}

            </div>
             
            {/* Summary Section */}


            <div className="
                grid
                grid-cols-1
                lg:grid-cols-3
                gap-6
            ">


                {/* Booking Summary */}


                <div className="
                    bg-[#0F1B2D]
                    border
                    border-white/10
                    rounded-3xl
                    p-6
                ">


                    <h2 className="
                        text-xl
                        text-white
                        font-semibold
                        mb-6
                    ">

                        Booking Summary

                    </h2>



                    <div className="space-y-5">


                        <div className="
                            flex
                            justify-between
                            items-center
                        ">

                            <div className="flex items-center gap-3">

                                <FiCheckCircle
                                    className="text-green-400"
                                />

                                <span className="text-slate-300">

                                    Confirmed

                                </span>

                            </div>


                            <span className="
                                text-green-400
                                font-bold
                            ">

                                {overview.confirmedBookings || 0}

                            </span>


                        </div>





                        <div className="
                            flex
                            justify-between
                            items-center
                        ">


                            <div className="flex items-center gap-3">

                                <FiClock
                                    className="text-red-400"
                                />

                                <span className="text-slate-300">

                                    Cancelled

                                </span>

                            </div>


                            <span className="
                                text-red-400
                                font-bold
                            ">

                                {overview.cancelledBookings || 0}

                            </span>


                        </div>



                    </div>


                </div>





                {/* System Health */}


                <div className="
                    bg-[#0F1B2D]
                    border
                    border-white/10
                    rounded-3xl
                    p-6
                ">


                    <h2 className="
                        text-xl
                        text-white
                        font-semibold
                        mb-6
                    ">

                        System Health

                    </h2>



                    <div className="
                        flex
                        items-center
                        justify-between
                    ">


                        <div>

                            <p className="
                                text-slate-400
                            ">

                                Platform Status

                            </p>


                            <h3 className="
                                text-3xl
                                text-green-400
                                font-bold
                                mt-3
                            ">

                                Excellent

                            </h3>


                        </div>



                        <div className="
                            w-20
                            h-20
                            rounded-full
                            bg-green-400/20
                            flex
                            items-center
                            justify-center
                            text-green-400
                            text-4xl
                        ">


                            <FiActivity/>


                        </div>


                    </div>


                </div>






                {/* Quick Info */}


                <div className="
                    bg-[#0F1B2D]
                    border
                    border-white/10
                    rounded-3xl
                    p-6
                ">


                    <h2 className="
                        text-xl
                        text-white
                        font-semibold
                        mb-6
                    ">

                        Quick Info

                    </h2>


                    <div className="space-y-4">


                        <div className="
                            flex
                            justify-between
                        ">

                            <span className="text-slate-400">

                                Total Bookings

                            </span>


                            <span className="text-white font-bold">

                                {overview.totalBookings || 0}

                            </span>


                        </div>




                        <div className="
                            flex
                            justify-between
                        ">

                            <span className="text-slate-400">

                                Users

                            </span>


                            <span className="text-white font-bold">

                                {overview.totalUsers || 0}

                            </span>


                        </div>



                    </div>


                </div>



            </div>
            
            {/* Recent Activity Section */}

            <div className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-6
            ">


                {/* Recent Station Requests */}

                <div className="
                    bg-[#0F1B2D]
                    border
                    border-white/10
                    rounded-3xl
                    p-6
                ">


                    <div className="
                        flex
                        justify-between
                        items-center
                        mb-6
                    ">


                        <h2 className="
                            text-xl
                            text-white
                            font-semibold
                        ">

                            Recent Station Requests

                        </h2>


                        <span className="
                            text-cyan-400
                            text-sm
                        ">

                            View All

                        </span>


                    </div>





                    <div className="space-y-4">


                        {
                            data?.recentRequests?.length > 0 ? (

                                data.recentRequests.map((request)=>(


                                    <div
                                        key={request._id}
                                        className="
                                            bg-[#07111F]
                                            rounded-2xl
                                            p-4
                                            flex
                                            justify-between
                                            items-center
                                            border
                                            border-white/5
                                        "
                                    >


                                        <div>


                                            <h3 className="
                                                text-white
                                                font-medium
                                            ">

                                                {request.name}

                                            </h3>


                                            <p className="
                                                text-slate-400
                                                text-sm
                                                mt-1
                                            ">

                                                {request.ownerName}

                                            </p>


                                            <p className="
                                                text-slate-500
                                                text-xs
                                            ">

                                                {request.email}

                                            </p>


                                        </div>



                                        <span className="
                                            px-3
                                            py-1
                                            rounded-full
                                            text-xs
                                            bg-yellow-400/10
                                            text-yellow-400
                                            border
                                            border-yellow-400/20
                                        ">


                                            {request.status}


                                        </span>



                                    </div>


                                ))


                            ) : (


                                <p className="
                                    text-slate-400
                                ">

                                    No recent requests

                                </p>


                            )
                        }


                    </div>


                </div>









                {/* Recent Bookings */}

                <div className="
                    bg-[#0F1B2D]
                    border
                    border-white/10
                    rounded-3xl
                    p-6
                ">


                    <div className="
                        flex
                        justify-between
                        items-center
                        mb-6
                    ">


                        <h2 className="
                            text-xl
                            text-white
                            font-semibold
                        ">

                            Recent Bookings

                        </h2>


                        <span className="
                            text-cyan-400
                            text-sm
                        ">

                            Live

                        </span>


                    </div>






                    <div className="space-y-4">


                    {

                        data?.recentBookings?.length > 0 ? (


                            data.recentBookings.map((booking)=>(


                                <div
                                    key={booking._id}
                                    className="
                                        bg-[#07111F]
                                        rounded-2xl
                                        p-4
                                        flex
                                        justify-between
                                        items-center
                                    "
                                >


                                    <div>


                                        <h3 className="
                                            text-white
                                            font-medium
                                        ">


                                            {
                                                booking.user?.username ||
                                                "User"
                                            }


                                        </h3>


                                        <p className="
                                            text-slate-400
                                            text-sm
                                        ">


                                            {
                                                booking.station?.name ||
                                                "Station"
                                            }


                                        </p>


                                    </div>



                                    <span className="
                                        text-green-400
                                        text-sm
                                        px-3
                                        py-1
                                        rounded-full
                                        bg-green-400/10
                                    ">


                                        {booking.status}


                                    </span>



                                </div>



                            ))


                        ) : (


                            <p className="
                                text-slate-400
                            ">

                                No bookings yet

                            </p>


                        )

                    }


                    </div>



                </div>



            </div>










        </div>


    );

};


export default AdminOverview;