import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiSearch, FiXCircle, FiCalendar, FiUser, FiZap } from "react-icons/fi";
import API from "../../../../api";


const BookingManagement = () => {
    const { token } = useSelector(
        state => state.stationAuth
    );

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const [bookings, setBookings] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [cancelModal, setCancelModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    // GET BOOKINGS

    const fetchBookings = async () => {

        try {
            const res = await API.get(
                "/slot/getBookedSlotsWithUsers",
                config
            );

            setBookings(res.data.bookings);

        } catch (error) {
            console.log(
                error.response?.data || error.message
            );

            setBookings([]);

        } finally {

            setLoading(false);

        }

    };

    // CANCEL BOOKING


    const cancelBooking = async () => {


        try {


            await API.put(
                `/slot/owner-cancel-booking/${selectedBooking}`,
                {},
                config
            );


            setCancelModal(false);

            setSelectedBooking(null);

            fetchBookings();



        } catch (error) {


            console.log(
                error.response?.data || error.message
            );


        }


    };

    // SEARCH
    const filteredBookings = bookings.filter(item =>

        item.user?.username
            ?.toLowerCase()
            .includes(
                search.toLowerCase()
            )

    );


    useEffect(() => {


        fetchBookings();



    }, []);

    return (


        <div className="min-h-screen bg-slate-950 text-white p-5">


            {/* HEADER */}

            <div className="mb-8">


                <h1 className="text-3xl font-bold">
                    Booking Management
                </h1>


                <p className="text-slate-400 mt-2">
                    Manage EV charging reservations from your station
                </p>


            </div>

            {/* SUMMARY CARDS */}


            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">



                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

                    <div className="flex items-center gap-3">

                        <div className="bg-cyan-500/20 p-3 rounded-xl">

                            <FiCalendar className="text-cyan-400 text-xl" />

                        </div>


                        <div>

                            <p className="text-slate-400">
                                Total Bookings
                            </p>


                            <h2 className="text-2xl font-bold">
                                {bookings.length}
                            </h2>

                        </div>

                    </div>


                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">


                    <div className="flex items-center gap-3">


                        <div className="bg-green-500/20 p-3 rounded-xl">

                            <FiUser className="text-green-400 text-xl" />

                        </div>


                        <div>

                            <p className="text-slate-400">
                                Customers
                            </p>


                            <h2 className="text-2xl font-bold">
                                {
                                    new Set(
                                        bookings.map(
                                            item => item.user?._id
                                        )
                                    ).size
                                }
                            </h2>


                        </div>


                    </div>


                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">


                    <div className="flex items-center gap-3">


                        <div className="bg-yellow-500/20 p-3 rounded-xl">

                            <FiZap className="text-yellow-400 text-xl" />

                        </div>



                        <div>


                            <p className="text-slate-400">
                                Active Slots
                            </p>


                            <h2 className="text-2xl font-bold">
                                {
                                    bookings.filter(
                                        item => item.status === "confirmed"
                                    ).length
                                }
                            </h2>


                        </div>


                    </div>


                </div>



            </div>
            {/* BOOKING TABLE CARD */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">


                {/* SEARCH */}

                <div className="flex items-center gap-3 bg-slate-800 rounded-xl px-4 mb-6">

                    <FiSearch className="text-slate-400" />


                    <input

                        className="bg-transparent outline-none w-full py-3"

                        placeholder="Search customer name..."

                        value={search}

                        onChange={
                            e => setSearch(e.target.value)
                        }

                    />


                </div>
                {
                    loading ?


                        (

                            <div className="text-center py-10 text-slate-400">

                                Loading bookings...

                            </div>

                        )


                        :


                        filteredBookings.length === 0 ?


                            (

                                <div className="text-center py-10 text-slate-400">

                                    No bookings found

                                </div>

                            )


                            :


                            (


                                <div className="overflow-x-auto">


                                    <table className="w-full border-collapse">


                                        <thead>


                                            <tr className="border-b border-slate-700 text-slate-400">


                                                <th className="text-left py-4 px-3">
                                                    Customer
                                                </th>


                                                <th className="text-left px-3">
                                                    Slot
                                                </th>


                                                <th className="text-left px-3">
                                                    Date
                                                </th>


                                                <th className="text-left px-3">
                                                    Time
                                                </th>


                                                <th className="text-left px-3">
                                                    Status
                                                </th>


                                                <th className="text-left px-3">
                                                    Action
                                                </th>


                                            </tr>


                                        </thead>






                                        <tbody>



                                            {

                                                filteredBookings.map(item => (


                                                    <tr

                                                        key={item._id}

                                                        className="border-b border-slate-800 hover:bg-slate-800 transition"

                                                    >



                                                        {/* USER */}

                                                        <td className="py-5 px-3">


                                                            <div className="flex items-center gap-3">


                                                                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">

                                                                    <FiUser className="text-cyan-400" />

                                                                </div>



                                                                <div>


                                                                    <h3 className="font-semibold">

                                                                        {item.user?.username}

                                                                    </h3>



                                                                    <p className="text-sm text-slate-400">

                                                                        {item.user?.email}

                                                                    </p>


                                                                </div>


                                                            </div>



                                                        </td>







                                                        {/* SLOT */}

                                                        <td className="px-3">


                                                            <div>


                                                                <p className="font-semibold">

                                                                    {item.slot?.slotName}

                                                                </p>


                                                                <p className="text-sm text-slate-400">

                                                                    {item.slot?.slotVoltage}

                                                                </p>


                                                            </div>


                                                        </td>






                                                        {/* DATE */}

                                                        <td className="px-3">


                                                            {item.slot?.date}


                                                        </td>






                                                        {/* TIME */}

                                                        <td className="px-3">


                                                            <span className="bg-slate-800 px-3 py-1 rounded-lg">

                                                                {item.slot?.startTime} - {item.slot?.endTime}

                                                            </span>


                                                        </td>






                                                        {/* STATUS */}

                                                        <td className="px-3">


                                                            <span

                                                                className={`
                                        px-3 py-1 rounded-full text-sm font-medium
                                        ${item.status === "confirmed"

                                                                        ?

                                                                        "bg-green-500/20 text-green-400"

                                                                        :

                                                                        item.status === "cancelled"

                                                                            ?

                                                                            "bg-red-500/20 text-red-400"

                                                                            :

                                                                            "bg-yellow-500/20 text-yellow-400"
                                                                    }
                                        `}

                                                            >


                                                                {
                                                                    item.status
                                                                        ?.charAt(0)
                                                                        .toUpperCase()
                                                                    +
                                                                    item.status?.slice(1)
                                                                }


                                                            </span>


                                                        </td>






                                                        {/* ACTION */}


                                                        <td className="px-3">


                                                            {

                                                                item.status === "confirmed"

                                                                &&

                                                                (

                                                                    <button

                                                                        onClick={() => {

                                                                            setSelectedBooking(item._id);

                                                                            setCancelModal(true);

                                                                        }}

                                                                        className="flex items-center gap-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-xl transition"

                                                                    >

                                                                        <FiXCircle />

                                                                        Cancel

                                                                    </button>


                                                                )

                                                            }




                                                        </td>





                                                    </tr>


                                                ))

                                            }



                                        </tbody>


                                    </table>



                                </div>


                            )

                }



            </div>
            {
                cancelModal &&

                (

                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">


                        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm">


                            <h2 className="text-xl font-bold mb-3">

                                Cancel Booking?

                            </h2>


                            <p className="text-slate-400 mb-6">

                                Are you sure you want to cancel this booking?

                            </p>


                            <div className="flex justify-end gap-3">
                                <button

                                    onClick={() => {

                                        setCancelModal(false);
                                        setSelectedBooking(null);
                                    }}

                                    className="px-5 py-2 bg-slate-700 rounded-xl"

                                >

                                    Cancel

                                </button>

                                <button

                                    onClick={cancelBooking}

                                    className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-xl"
                                >

                                    Yes

                                </button>

                            </div>
                        </div>
                    </div>
                )

            }
        </div>


    )


}


export default BookingManagement;