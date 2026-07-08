import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
    FiCalendar,
    FiClock,
    FiMapPin,
    FiZap,
    FiXCircle,
    FiCheckCircle
} from "react-icons/fi";

import toast from "react-hot-toast";

import API from "../../../../api";



const MyBookings = () => {


    const { token } = useSelector(
        (state) => state.stationAuth
    );


    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(false);

    const [cancelLoading, setCancelLoading] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);





    // GET MY BOOKINGS
    

    const fetchBookings = async () => {


        try {


            setLoading(true);


            const response = await API.get(
                "/user/get-my-bookings",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );



            setBookings(
                response.data.bookings
            );



        } catch (error) {


            console.log(error);


            toast.error(
                error.response?.data?.message ||
                "Unable to load bookings"
            );


        } finally {

            setLoading(false);

        }


    };
    
    useEffect(() => {

        fetchBookings();

    }, []);


    const cancelBooking = async (id) => {


        try {


            setCancelLoading(id);



            const response = await API.put(
                `/user/cancel-booking/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );



            if (response.data.success) {


                toast.success(
                    "Booking cancelled successfully"
                );


                fetchBookings();


            }


        } catch (error) {


            console.log(error);


            toast.error(
                error.response?.data?.message ||
                "Cancel failed"
            );


        } finally {


            setCancelLoading(null);


        }


    };

    return (

        <div className="min-h-screen space-y-8 p-4 bg-[#07111F] mt-5">

            {/* HEADER */}



            <div className="
                mb-10
            ">


                <h1 className="
                    text-3xl
                    font-bold
                    text-white
                ">
                    My Bookings
                </h1>


                <p className="
                    text-gray-400
                    mt-2
                ">
                    Manage your EV charging reservations
                </p>


            </div>


            {
                loading && (

                    <div className="
                        flex
                        justify-center
                        items-center
                        h-60
                    ">


                        <div className="
                            h-12
                            w-12
                            rounded-full
                            border-b-2
                            border-green-400
                            animate-spin
                        ">


                        </div>


                    </div>

                )
            }


            {
                !loading && bookings.length === 0 && (


                    <div className="
                        bg-gray-900
                        rounded-2xl
                        border
                        border-cyan-800
                        p-10
                        text-center
                    ">


                        <FiCalendar
                            className="
                                mx-auto
                                text-gray-400
                                text-5xl
                            "
                        />


                        <h2 className="
                            text-xl
                            mt-4
                            font-semibold
                        ">
                            No Bookings Found
                        </h2>


                        <p className="
                            text-gray-400
                            mt-2
                        ">
                            You have not reserved any charging slots yet.
                        </p>


                    </div>


                )
            }


            {/* BOOKING CARDS */}


            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-4
                gap-6
            ">


                {
                    bookings.map((booking) => (


                        <div
                            key={booking._id}
                            className="
                            bg-slate-900
                            border
                            border-blue-900/40
                            rounded-xl
                            p-4
                            hover:border-blue-400
                            transition
                            shadow-md
                        "
                        >

                            {/* TOP */}

                            <div className="
    flex
    justify-between
    items-center
">


    {/* Left side */}
    <div className="
        flex
        gap-3
        items-center
    ">


        <div className="
            bg-cyan-500/20
            p-3
            rounded-xl
        ">

            <FiZap
                className="
                    text-cyan-400
                    text-2xl
                "
            />

        </div>



        <div>

            <h3 className="
                
                font-bold
                text-white
                text-base
            ">
                {booking.slot?.slotName || "Slot unavailable"}
            </h3>


            {
                booking.status === "confirmed"
                ?

                <span className="
                    text-green-400
                    text-sm
                ">
                    Confirmed
                </span>

                :

                <span className="
                    text-red-400
                    text-sm
                ">
                    Cancelled
                </span>
            }


        </div>


    </div>




    {/* Right side status icon */}

    {/* <div>

        {
            booking.status === "confirmed"
            ?

            <FiCheckCircle
                className="
                    text-green-400
                    text-3xl
                "
            />

            :

            <FiXCircle
                className="
                    text-red-400
                    text-3xl
                "
            />
        }

    </div> */}


</div>



                            {/* SLOT DETAILS */}


                            <div className="
                            mt-6
                            bg-gray-800
                            rounded-xl
                            p-4
                            space-y-3
                        ">

                                <div className="
                                flex
                                items-center
                                gap-3
                                text-white
                            ">


                                    <FiZap />


                                    <span>
                                        {booking.slot?.slotVoltage || "-"}
                                    </span>


                                </div>





                                <div className="
                                flex
                                items-center
                                gap-3
                                text-white
                            ">


                                    <FiCalendar />


                                    <span>
                                        {booking.slot?.date || "-"}
                                    </span>


                                </div>





                                <div className="
                                flex
                                items-center
                                gap-3
                                text-white
                            ">


                                    <FiClock />


                                    <span>

                                        {
                                            booking.slot?.startTime || "-"
                                        }

                                        {" - "}

                                        {booking.slot?.endTime || "-"}

                                    </span>


                                </div>



                            </div>


                            {/* CANCEL BUTTON */}


                            {
                                booking.status === "confirmed" ? (

                                    <button

                                        onClick={() => {
                                            setSelectedBooking(booking);
                                            setShowCancelModal(true);
                                        }}

                                        disabled={
                                            cancelLoading === booking._id
                                        }

                                        className="
                mt-5
                w-full
                bg-red-500/20
                text-red-400
                hover:bg-red-500
                hover:text-white
                py-3
                rounded-xl
                font-semibold
                transition
            "
                                    >

                                        {
                                            cancelLoading === booking._id
                                                ?
                                                "Cancelling..."
                                                :
                                                "Cancel Booking"
                                        }

                                    </button>


                                ) : (


                                    <button

                                        disabled

                                        className="
                mt-5
                w-full
                bg-gray-700/50
                text-gray-400
                py-3
                rounded-xl
                font-semibold
                cursor-not-allowed
            "
                                    >

                                        Booking Cancelled

                                    </button>


                                )
                            }



                        </div>


                    ))
                }


            </div>
            {
                showCancelModal && selectedBooking && (

                    <div className="
                        fixed
                        inset-0
                        bg-black/70
                        backdrop-blur-sm
                        flex
                        items-center
                        justify-center
                        z-50
                        px-4
                        
                    ">


                        <div className="
                            bg-slate-950
                            border
                            border-blue-500/30
                            rounded-2xl
                            w-full
                            max-w-md
                            p-6
                            shadow-2xl
                            shadow-red-500/10
                        ">


                            {/* Icon */}

                            <div className="
                                flex
                                justify-center
                                mb-4
                            ">

                                <div className="
                                    bg-red-500/20
                                    p-4
                                    rounded-full
                                ">

                                    <FiXCircle
                                        className="
                                text-red-400
                                text-3xl
                            "
                                    />

                                </div>

                            </div>




                            <h2 className="
                                text-xl
                                font-bold
                                text-white
                                text-center
                            ">
                                Cancel Booking?
                            </h2>



                            <p className="
                                text-gray-400
                                text-center
                                mt-2
                                text-sm
                            ">
                                Are you sure you want to cancel this charging reservation?
                            </p>





                            <div className="
                                bg-slate-900
                                border
                                border-slate-800
                                rounded-xl
                                p-3
                                mt-4
                            ">

                                <p className="
                                    text-white
                                    text-center
                                    mt-1
                                ">
                                    {
                                        selectedBooking.slot?.slotName
                                        ||
                                        "Slot unavailable"
                                    }
                                </p>

                                <p className="
                                    text-blue-400
                                    text-center
                                    mt-1
                                ">
                                    {
                                        selectedBooking.slot?.date
                                        ||
                                        "Slot unavailable"
                                    }
                                </p>
                                <p className="
                                    text-blue-400
                                    text-center
                                    mt-1
                                ">
                                    {
                                        selectedBooking.slot
                                            ?
                                            `${selectedBooking.slot.startTime} - ${selectedBooking.slot.endTime}`
                                            :
                                            "Slot unavailable"
                                    }
                                </p>



                            </div>


                            {/* Buttons */}

                            <div className="
                                flex
                                gap-3
                                mt-6
                            ">


                                <button

                                    onClick={() => {

                                        setShowCancelModal(false);
                                        setSelectedBooking(null);

                                    }}

                                    className="
                                    flex-1
                                    bg-slate-800
                                    hover:bg-slate-700
                                    text-white
                                    py-3
                                    rounded-xl
                                "
                                >
                                    No
                                </button>





                                <button

                                    onClick={() => {

                                        cancelBooking(
                                            selectedBooking._id
                                        );

                                        setShowCancelModal(false);
                                        setSelectedBooking(null);

                                    }}

                                    className="
                                        flex-1
                                        bg-blue-500
                                        hover:bg-blue-600
                                        text-white
                                        font-semibold
                                        py-3
                                        rounded-xl
                                    "
                                >
                                    Yes
                                </button>


                            </div>


                        </div>


                    </div>

                )
            }




        </div>

    );

};


export default MyBookings;