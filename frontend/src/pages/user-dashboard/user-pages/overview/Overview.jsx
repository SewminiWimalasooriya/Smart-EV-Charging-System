import { useEffect, useState } from "react";
import API from "../../../../api";
import { useSelector } from "react-redux";

import {
    FiCalendar,
    FiCheckCircle,
    FiXCircle,
    FiBell,
    FiZap
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


const STATUS_COLORS = [
    "#63b650",
    "#d34040",
];





const UserOverview = () => {


    const [data, setData] = useState(null);

    const { user } = useSelector(
        state => state.stationAuth
    );

    const token = localStorage.getItem("token");



    useEffect(() => {


        const fetchDashboard = async () => {

            try {

                const res = await API.get(
                    "/user/dashboard/stats",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );


                setData(res.data);
               


            } catch (error) {

                console.log(error);

            }

        };


        fetchDashboard();


    }, []);





    if (!data) {

        return (

            <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">

                Loading Dashboard...

            </div>

        );

    }




    const allMonths = [

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
        "Dec"

    ];




    const monthlyData = allMonths.map((month) => {


        const found = data.monthlyBookings.find(

            item => item.month === month

        );


        return {

            month,

            bookings: found ? found.bookings : 0

        };


    });

    





    return (


        <div className="p-6 lg:p-8 min-h-screen text-white bg-gradient-to-br from-[#020617] via-[#07111F] to-[#0F172A]">


            {/* Header */}

            <div className="mb-8">


                <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">

                    Welcome back {user?.username?.toUpperCase()} , 👋 

                </h1>

                <p className="text-slate-400 mt-2">

                    Your EV charging activity summary

                </p>



                <div className="mt-6 flex items-center gap-3 bg-cyan-400/10 border border-cyan-400/20 rounded-2xl px-5 py-4">

                    <FiZap className="text-cyan-400 text-xl" />

                    <p className="text-cyan-300 text-sm">

                        Your EV journey helps build a cleaner and greener future.

                    </p>

                </div>


            </div>





            {/* Cards */}


            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">


                <Card

                    icon={<FiCalendar />}

                    title="Total Bookings"

                    value={data.cards.totalBookings}

                />



                <Card

                    icon={<FiCheckCircle />}

                    title="Confirmed"

                    value={data.cards.confirmedBookings}

                />



                <Card

                    icon={<FiXCircle />}

                    title="Cancelled"

                    value={data.cards.cancelledBookings}

                />



                <Card

                    icon={<FiBell />}

                    title="Notifications"

                    value={data.notifications.length}

                />


            </div>







            {/* Charts */}



            <div className="grid lg:grid-cols-2 gap-6 mt-8">



                {/* Bar Chart */}



                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl">


                    <h2 className="text-xl font-semibold mb-5">

                        Monthly Bookings

                    </h2>



                    <ResponsiveContainer width="100%" height={300}>


                        <BarChart data={monthlyData}>


                            <XAxis

                                dataKey="month"

                                stroke="#94a3b8"

                            />


                            <YAxis

                                stroke="#94a3b8"

                            />


                            <Tooltip />


                            <Bar

                                dataKey="bookings"

                                fill="#63b650"

                                radius={[8, 8, 0, 0]}

                            />


                        </BarChart>


                    </ResponsiveContainer>


                </div>







                {/* Pie Chart */}



                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl">


                    <h2 className="text-xl font-semibold mb-5">

                        Booking Status

                    </h2>




                    <ResponsiveContainer width="100%" height={300}>


                        <PieChart>


                            <Pie

                                data={data.bookingStatus}

                                dataKey="value"

                                nameKey="name"

                                outerRadius={100}

                            >


                                {
                                    data.bookingStatus.map(

                                        (item, index) => (

                                            <Cell

                                                key={index}

                                                fill={
                                                    STATUS_COLORS[index % STATUS_COLORS.length]
                                                }

                                            />

                                        )

                                    )
                                }


                            </Pie>


                            <Tooltip />


                        </PieChart>


                    </ResponsiveContainer>


                </div>


            </div>









            {/* Latest Session + Carbon */}



            <div className="grid lg:grid-cols-2 gap-6 mt-8">





                {/* Latest Charging Session */}



                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl">


                    <h2 className="text-xl font-semibold mb-5">

                        ⚡ Latest Charging Session

                    </h2>




                    {
                        data.latestBooking ?


                            (

                                <div className="space-y-4 text-slate-300">

                                    <p>

                                        <span className="text-slate-400">

                                            Slot :

                                        </span>

                                        {" "}

                                        {data.latestBooking.slot?.slotName}

                                    </p>




                                    <p>

                                        <span className="text-slate-400">

                                            Status :

                                        </span>


                                        <span className="ml-2 px-3 py-1 rounded-full bg-green-400/10 text-green-400">

                                            {data.latestBooking.status}

                                        </span>


                                    </p>




                                    <p>

                                        <span className="text-slate-400">

                                            Date :

                                        </span>


                                        {" "}

                                        {
                                            new Date(
                                                data.latestBooking.createdAt
                                            ).toLocaleDateString()
                                        }


                                    </p>



                                </div>


                            )

                            :

                            (

                                <p className="text-slate-400">

                                    No charging session found

                                </p>

                            )


                    }



                </div>








                {/* Carbon Saved */}



                <div className="relative overflow-hidden bg-gradient-to-br from-green-400/10 to-cyan-400/10 backdrop-blur-xl p-6 rounded-3xl border border-green-400/20 shadow-xl">



                    <div className="flex items-center gap-4">


                        <div className="w-14 h-14 rounded-2xl bg-green-400/20 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(34,197,94,0.3)]">

                            🌱

                        </div>



                        <div>


                            <h2 className="text-xl font-semibold">

                                Carbon Saved

                            </h2>


                            <p className="text-slate-400 text-sm">

                                Environmental Impact

                            </p>


                        </div>


                    </div>





                    <div className="mt-8">


                        <h1 className="text-3xl font-extrabold text-green-400">

                            24.5 kg

                        </h1>


                        <p className="text-slate-400 mt-2">

                            CO₂ emissions reduced

                        </p>


                    </div>





                    <div className="mt-6 bg-green-400/10 border border-green-400/20 rounded-2xl p-4">


                        <p className="text-green-300 text-sm">

                            🌍 Every EV charge helps create a cleaner future.

                        </p>


                    </div>



                </div>




            </div>




        </div>


    );

};








const Card = ({ icon, title, value }) => (

    <div className="
        group
        bg-white/5
        backdrop-blur-xl
        p-6
        rounded-3xl
        border
        border-white/10
        hover:border-green-400/40
        hover:bg-white/10
        transition-all
        duration-300
        shadow-lg
        flex
        items-center
        gap-5
    ">


        {/* Icon */}

        <div className="
            w-14
            h-14
            rounded-2xl
            bg-green-400/10
            flex
            items-center
            justify-center
            text-green-400
            text-2xl
            shrink-0
            group-hover:scale-110
            transition
        ">

            {icon}

        </div>




        {/* Content */}

        <div>


            <h2 className="
                text-3xl
                font-bold
                text-white
            ">

                {value}

            </h2>



            <p className="
                text-cyan-200
                mt-1
                text-sm
                
            ">

                {title}

            </p>


        </div>



    </div>

)



export default UserOverview;