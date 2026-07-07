import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../../api";

import {
    FiGrid,
    FiCheckCircle,
    FiZap,
    FiCalendar,
    FiMapPin
} from "react-icons/fi";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";


const Overview = () => {

    const { user, apartment } = useSelector(
        (state) => state.stationAuth
    );

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        totalSlots: 0,
        availableSlots: 0,
        bookedSlots: 0,
        maintenanceSlots: 0,
        todayBookings: 0
    });

    const [activities, setActivities] = useState([]);
    const [chartData, setChartData] = useState([]);


    useEffect(() => {
        fetchDashboardData();
    }, []);



    const fetchDashboardData = async () => {

        try {

            setLoading(true);


            const config = {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem("token")}`
                }
            };

            // stats
            const statsRes = await API.get(
                "/owner/dashboard/stats",
                config
            );

            if (statsRes.data.success) {
                setStats(statsRes.data.stats);
            }

            // recent bookings
            const activityRes = await API.get(
                "/owner/dashboard/activities",
                config
            );

            setActivities(
                activityRes.data.activities || []
            );

            // chart
            const chartRes = await API.get(
                "/owner/dashboard/analytics",
                config
            );

            setChartData(
                chartRes.data.chartData || []
            );


        } catch (error) {

            console.log(
                error.response?.data?.message ||
                error.message
            );

        } finally {

            setLoading(false);

        }

    };



    const cards = [
        {
            title: "Total Slots",
            value: stats.totalSlots,
            icon: <FiGrid />,
            bg: "bg-blue-600"
        },
        {
            title: "Available Slots",
            value: stats.availableSlots,
            icon: <FiCheckCircle />,
            bg: "bg-green-600"
        },
        {
            title: "Booked Slots",
            value: stats.bookedSlots,
            icon: <FiZap />,
            bg: "bg-orange-500"
        },
        {
            title: "Today's Bookings",
            value: stats.todayBookings,
            icon: <FiCalendar />,
            bg: "bg-purple-600"
        }
    ];



    const slotData = [
        {
            name: "Available",
            value: stats.availableSlots,
            color: "#79c54e"
        },
        {
            name: "Booked",
            value: stats.bookedSlots,
            color: "#264e9e"
        },
        {
            name: "Maintenance",
            value: stats.maintenanceSlots,
            color: "#cecc6c"
        }
    ];



    if (loading) {

        return (
            <div className="h-[500px] flex items-center justify-center">
                <h2>
                    Loading Dashboard...
                </h2>
            </div>
        )

    }



    return (

        <div className="space-y-8">

            <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-700 rounded-2xl p-8 border border-cyan-500/30 shadow-xl">

                <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400 rounded-full blur-3xl opacity-20"></div>

                <div className="relative z-10 flex justify-between items-center">

                    <div>
                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-xl bg-cyan-400/20 flex items-center justify-center text-2xl">
                                ⚡
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    Welcome back, {user?.username} 👋
                                </h1>

                                <p className="text-cyan-100 mt-1">
                                    Monitor and manage your EV charging station efficiently
                                </p>
                            </div>

                        </div>


                        <div className="mt-6 flex items-center gap-3">

                            <span className="flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm">
                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                Station Online
                            </span>


                            <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm">
                                ⚡ Smart Charging Enabled
                            </span>

                        </div>

                    </div>


                    {/* <div className="hidden md:flex w-32 h-32 rounded-full bg-cyan-400/10 items-center justify-center border border-cyan-300/30">
                        <div className="
                text-6xl
            ">
                🔋
            </div>
                    </div> */}

                </div>

            </div>



            <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            xl:grid-cols-4 gap-5">


                {
                    cards.map(card => (

                        <div
                            key={card.title}
                            className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-6">

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-gray-400">
                                        {card.title}
                                    </p>

                                    <h2 className="text-3xl font-bold mt-2">
                                        {card.value}
                                    </h2>

                                </div>


                                <div className={`${card.bg} p-4 rounded-xl`}>
                                    {card.icon}
                                </div>


                            </div>

                        </div>

                    ))
                }


            </div>




            <div className="
            grid 
            grid-cols-1 
            lg:grid-cols-3 
            gap-6">


                <div className="
                lg:col-span-2
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-6">


                    <h2 className="text-xl font-semibold mb-5">
                        Monthly Bookings
                    </h2>


                    <div className="h-[200px]">

                        <ResponsiveContainer width="100%" height="100%">

                            <BarChart data={chartData}>

                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />

                                <Bar dataKey="bookings" fill="#6255dc" />

                            </BarChart>


                        </ResponsiveContainer>

                    </div>


                </div>




                <div className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-6">


                    <h2 className="text-xl font-semibold mb-5">
                        Slot Status
                    </h2>


                    <ResponsiveContainer width="100%" height={200}>


                        <PieChart>

                            <Pie
                                data={slotData}
                                dataKey="value"
                                outerRadius={90}
                                label>

                                {
                                    slotData.map((item, index) => (
                                        <Cell key={index} fill={item.color} />
                                    ))
                                }


                            </Pie>

                            <Tooltip />


                        </PieChart>


                    </ResponsiveContainer>


                </div>



            </div>




            <div className="
            grid 
            grid-cols-1 
            lg:grid-cols-3 
            gap-6">


                <div className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-6">


                    <h2 className="text-xl font-semibold">
                        Station Details
                    </h2>


                    <p className="mt-5">
                        {apartment?.name}
                    </p>


                    <p className="flex gap-2 mt-3 text-gray-400">
                        <FiMapPin />
                        {apartment?.address}
                    </p>


                </div>




                <div className="
                lg:col-span-2
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-6">


                    <h2 className="text-xl font-semibold mb-5">
                        Recent Bookings
                    </h2>



                    {
                        activities.length === 0 ?

                            <p className="text-gray-400">
                                No recent bookings
                            </p>

                            :

                            activities.map(item => (

                                <div
                                    key={item._id}
                                    className="
                            border-b
                            border-slate-700
                            py-3">


                                    <span className="text-blue-400">
                                        {item.user?.username}
                                    </span>

                                    {" "} booked {" "}

                                    <span className="text-green-400">
                                        {item.slot?.slotName}
                                    </span>


                                </div>

                            ))

                    }



                </div>


            </div>



        </div>

    )

}


export default Overview;