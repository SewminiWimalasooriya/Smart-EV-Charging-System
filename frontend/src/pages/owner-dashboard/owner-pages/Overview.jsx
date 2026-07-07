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


            const statsRes = await API.get(
                "/owner/dashboard/stats",
                config
            );


            if (statsRes.data.success) {
                setStats(statsRes.data.stats);
            }



            const activityRes = await API.get(
                "/owner/dashboard/activities",
                config
            );


            setActivities(
                activityRes.data.activities || []
            );



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

        }
        finally {

            setLoading(false);

        }

    };



    const cards = [
        {
            title: "Total Slots",
            value: stats.totalSlots,
            icon: <FiGrid />,
            style: "bg-cyan-500/20 text-cyan-400"
        },
        {
            title: "Available Slots",
            value: stats.availableSlots,
            icon: <FiCheckCircle />,
            style: "bg-green-500/20 text-green-400"
        },
        {
            title: "Booked Slots",
            value: stats.bookedSlots,
            icon: <FiZap />,
            style: "bg-yellow-500/20 text-yellow-400"
        },
        {
            title: "Today's Bookings",
            value: stats.todayBookings,
            icon: <FiCalendar />,
            style: "bg-purple-500/20 text-purple-400"
        }
    ];


    const slotData = [
        {
            name: "Available",
            value: stats.availableSlots,
            color: "#22C55E"
        },
        {
            name: "Booked",
            value: stats.bookedSlots,
            color: "#00D4FF"
        },
        {
            name: "Maintenance",
            value: stats.maintenanceSlots,
            color: "#F59E0B"
        }
    ];



    if (loading) {

        return (
            <div className=" min-h-[500px] flex justify-center items-center bg-[#07111F] text-white">

                <div className="flex flex-col items-center gap-4 ">

                    <div className="
w-12
h-12
border-4
border-cyan-400
border-t-transparent
rounded-full
animate-spin
"></div>


                    <p className="text-slate-400">
                        Loading EV Dashboard...
                    </p>


                </div>

            </div>
        )

    }
    return (

        <div className="
min-h-screen
space-y-8
bg-[#07111F]
text-white
p-2
">

            <div className="
relative
overflow-hidden
rounded-3xl
p-4
bg-gradient-to-br
from-[#0F1B2D]
via-[#102A43]
to-[#006778]
border
border-cyan-400/20
shadow-[0_0_40px_rgba(0,212,255,0.15)]
">

                <div className="
absolute
w-40
h-40
bg-cyan-400
rounded-full
blur-3xl
opacity-20
top-[-40px]
right-[-40px]
"></div>


                <div className="
relative
z-10
flex
justify-between
items-center
">


                    <div>

                        <div className="
flex
items-center
gap-4
">


                            <div className="
w-14
h-14
rounded-2xl
bg-cyan-400/20
flex
items-center
justify-center
text-3xl
">
                                ⚡
                            </div>


                            <div>

                                <h1 className="
text-3xl
font-bold
text-white
">

                                    Welcome back, {user?.username?.toUpperCase()}

                                </h1>


                                <p className="
text-cyan-100
mt-2
">

                                    Monitor and manage your EV charging station efficiently

                                </p>


                            </div>


                        </div>


                        <div className="
mt-6
flex
gap-3
flex-wrap
">


                            <div className="
flex
items-center
gap-2
bg-green-500/10
border
border-green-400/30
text-green-300
px-5
py-2
rounded-full
text-sm
">

                                <span className="
w-3
h-3
bg-green-400
rounded-full
animate-pulse
"></span>

                                Station Online

                            </div>



                            <div className="
bg-white/10
border
border-white/10
px-5
py-2
rounded-full
text-sm
">

                                ⚡ Smart Charging Enabled

                            </div>


                        </div>


                    </div>


                </div>

            </div>



            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 ">


                {
                    cards.map((card) => (
                        <div
                            key={card.title}
                            className=" bg-[#0F1B2D]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 hover:-translate-y-1 transition-all duration-300">


                            <div className=" flex justify-between items-center ">


                                <div>

                                    <p className=" text-slate-400 text-sm ">

                                        {card.title}

                                    </p>


                                    <h2 className=" text-4xl font-bold mt-3 ">

                                        {card.value}

                                    </h2>


                                </div>



                                <div className={` p-4 rounded-xl text-2xl ${card.style} `}>

                                    {card.icon}

                                </div>


                            </div>


                        </div>
                    ))
                }


            </div>





            <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6 ">


                <div className=" lg:col-span-2 bg-[#0F1B2D]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ">


                    <h2 className=" text-xl font-semibold mb-5 ">

                        Monthly Bookings

                    </h2>


                    <div className="h-[260px]">


                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >


                            <BarChart data={chartData}>


                                <XAxis
                                    dataKey="month"
                                    stroke="#94A3B8"
                                />


                                <YAxis
                                    stroke="#94A3B8"
                                />


                                <Tooltip
                                    contentStyle={{
                                        background: "#0F1B2D",
                                        border: "1px solid #00D4FF",
                                        borderRadius: "12px"
                                    }}
                                />


                                <Bar
                                    dataKey="bookings"
                                    fill="#00D4FF"
                                    radius={[8, 8, 0, 0]}
                                />


                            </BarChart>


                        </ResponsiveContainer>


                    </div>


                </div>





                <div className=" bg-[#0F1B2D]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ">


                    <h2 className=" text-xl font-semibold mb-5 ">

                        Slot Status

                    </h2>



                    <ResponsiveContainer
                        width="100%"
                        height={230}
                    >


                        <PieChart>


                            <Pie
                                data={slotData}
                                dataKey="value"
                                outerRadius={90}
                                label
                            >


                                {
                                    slotData.map((item, index) => (

                                        <Cell
                                            key={index}
                                            fill={item.color}
                                        />

                                    ))
                                }


                            </Pie>


                            <Tooltip />


                        </PieChart>


                    </ResponsiveContainer>


                </div>


            </div>
            <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6 ">


                <div className=" bg-[#0F1B2D]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ">


                    <h2 className=" text-xl font-semibold ">

                        Station Details

                    </h2>


                    <div className=" mt-5 space-y-4 ">


                        <p className=" text-cyan-400 text-lg font-semibold ">

                            {apartment?.name}

                        </p>


                        <p className=" flex items-center gap-3 text-slate-400 ">

                            <FiMapPin
                                className="text-cyan-400"
                            />

                            {apartment?.address}

                        </p>


                        <div className=" flex items-center gap-2 text-green-400 text-sm">

                            <span className="
w-2
h-2
bg-green-400
rounded-full
"></span>

                            Active Charging Station

                        </div>


                    </div>


                </div>





                <div className="
lg:col-span-2
bg-[#0F1B2D]/80
backdrop-blur-xl
border
border-white/10
rounded-2xl
p-6
">


                    <h2 className="
text-xl
font-semibold
mb-5
">

                        Recent Bookings

                    </h2>



                    {
                        activities.length === 0 ?


                            <p className="
text-slate-400
">

                                No recent bookings

                            </p>


                            :


                            <div className="
space-y-3
">

                                {
                                    activities.map((item) => (

                                        <div
                                            key={item._id}
                                            className="
flex
justify-between
items-center
bg-white/5
border
border-white/10
rounded-xl
px-4
py-4
hover:bg-white/10
transition
"
                                        >


                                            <div>


                                                <p className="
text-slate-300
">

                                                    Booking by

                                                    <span className="
text-cyan-400
font-semibold
ml-2
">

                                                        {item.user?.username}

                                                    </span>


                                                </p>


                                            </div>




                                            <div className="
text-right
">


                                                <p className="
text-green-400
font-semibold
">

                                                    {item.slot?.slotName}

                                                </p>


                                                <p className="
text-xs
text-slate-500
">

                                                    Charging Slot

                                                </p>


                                            </div>



                                        </div>

                                    ))

                                }


                            </div>

                    }


                </div>


            </div>


        </div>

    )

}


export default Overview;