import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    FiClock,
    FiCalendar,
    FiZap,
    FiCheckCircle,
    FiXCircle
} from "react-icons/fi";
import toast from "react-hot-toast";


import API from "../../../../api";



const SlotBooking = () => {


    const { token, apartment } = useSelector(
        (state) => state.stationAuth
    );


    const [slots, setSlots] = useState([]);

    const [loading, setLoading] = useState(false);

    const [bookingLoading, setBookingLoading] = useState(false);


    const [selectedSlot, setSelectedSlot] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const fetchSlots = async () => {

        try {

            setLoading(true);


            const response = await API.get(
                "/slot/get-owner-slots",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const availableSlots =
                response.data.slots.filter(
                    (slot) =>
                        slot.status === "available"
                );

            setSlots(availableSlots);


        } catch (error) {

            console.log(error);


            toast.error(
                error.response?.data?.message ||
                "Unable to load slots"
            );


        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchSlots();

    }, []);

    const handleBookClick = (slot) => {
        setSelectedSlot(slot);
        setShowModal(true);

    };


    // CREATE BOOKING

    const confirmBooking = async () => {
        try {
            setBookingLoading(true);

            const response = await API.post(
                "/user/create-booking",
                {
                    slotId: selectedSlot._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );



            if (response.data.success) {

                toast.success(
                    "Booking confirmed successfully ."
                );

                setShowModal(false);
                setSelectedSlot(null);
                // refresh slots

                fetchSlots();

            }


        } catch (error) {


            console.log(error);


            toast.error(
                error.response?.data?.message ||
                "Booking failed"
            );


        } finally {

            setBookingLoading(false);

        }

    };




    return (

        <div className="min-h-screen space-y-8 p-4 bg-[#07111F]">


            {/* HEADER */}

            <div className="
                mb-8
                p-4
                flex
                items-center
                justify-between
            ">


                <div>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-white
                    ">
                        Available Charging Slots ⚡
                    </h1>


                    <p className="
                        text-gray-400
                        mt-2
                    ">
                        Select your preferred charging time
                    </p>


                </div>


            </div>





            {/* LOADING */}

            {loading && (

                <div className="
                    flex
                    justify-center
                    items-center
                    h-60
                ">


                    <div className="
                        animate-spin
                        rounded-full
                        h-12
                        w-12
                        border-b-2
                        border-green-400
                    ">


                    </div>


                </div>

            )}



            {/* EMPTY */}

            {!loading && slots.length === 0 && (


                <div className="
                    bg-gray-900
                    rounded-2xl
                    p-10
                    text-center
                    border
                    border-cyan-800
                    
                ">


                    <FiXCircle
                        className="
                            mx-auto
                            text-red-400
                            text-5xl
                        "
                    />


                    <h2 className="
                        text-xl
                        font-semibold
                        mt-4
                        text-white
                    ">
                        No Available Slots
                    </h2>


                    <p className="
                        text-gray-400
                        mt-2
                    ">
                        Currently there are no charging slots available.
                    </p>


                </div>

            )}


            {/* SLOT CARDS */}

            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-4
                gap-6
            ">


                {
                    slots.map((slot) => (


                        <div
                            key={slot._id}
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



                            <div className="
                                flex
                                justify-between
                                items-center
                            ">


                                <div className="
                                    flex
                                    items-center
                                    gap-3
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
                                            text-base
                                            font-semibold
                                            text-white
                                        ">
                                            {slot.slotName}
                                        </h3>


                                        <span className="
                                            text-green-400
                                            text-sm
                                        ">
                                            Available
                                        </span>


                                    </div>


                                </div>



                                <FiCheckCircle
                                    className="
                                        text-cyan-400
                                        text-2xl
                                    "
                                />


                            </div>


                            <div className="
                                mt-6
                                space-y-3
                                text-gray-300
                            ">


                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">


                                    <FiCalendar />

                                    <span>
                                        {slot.date}
                                    </span>


                                </div>



                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">


                                    <FiClock />

                                    <span>
                                        {slot.startTime}
                                        {" - "}
                                        {slot.endTime}
                                    </span>


                                </div>


                            </div>

                            <button

                                onClick={() =>
                                    handleBookClick(slot)
                                }

                                className="
                                    mt-4
                                    w-full
                                    bg-blue-500
                                    hover:bg-blue-800
                                    text-white
                                    font-medium
                                    py-2.5
                                    rounded-lg
                                    transition
                                "
                            >

                                Book Now

                            </button>



                        </div>


                    ))
                }



            </div>
            
                {/* BOOKING CONFIRMATION MODAL */}
            
            {
                showModal && selectedSlot && (

                    <div className="
            fixed
            inset-0
            bg-black/80
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
            px-4
        ">


                        <div className="
                w-full
                max-w-md
                bg-slate-950
                border
                border-blue-500/30
                rounded-2xl
                p-5
                shadow-2xl
                shadow-blue-500/10
            ">


                            {/* Header */}

                            <div className="
                    flex
                    items-center
                    justify-between
                    mb-5
                ">


                                <div className="
                        flex
                        items-center
                        gap-3
                    ">

                                    <div className="
                            bg-blue-500/20
                            p-2.5
                            rounded-xl
                        ">

                                        <FiZap
                                            className="
                                    text-blue-400
                                    text-xl
                                "
                                        />

                                    </div>


                                    <div>

                                        <h2 className="
                                text-lg
                                font-bold
                                text-white
                            ">
                                            Confirm Booking
                                        </h2>


                                        <p className="
                                text-xs
                                text-gray-400
                            ">
                                            Reserve your charging slot
                                        </p>


                                    </div>


                                </div>




                                <button

                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedSlot(null);
                                    }}

                                    className="
                            text-gray-400
                            hover:text-white
                            text-xl
                            transition
                        "
                                >
                                    ✕
                                </button>


                            </div>





                            {/* Booking Details */}

                            <div className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-xl
                    p-4
                    space-y-4
                ">


                                {/* Station */}

                                <div>

                                    <p className="
                            text-xs
                            text-white
                            uppercase
                        ">
                                        Charging Station Name :
                                    </p>


                                    <p className="
                            
                            text-blue-500
                            font-semibold
                            mt-1
                        ">
                                        {apartment?.name ||
                                            "EV Charging Station"}
                                    </p>

                                </div>





                                {/* Slot */}

                                <div className="
                        flex
                        justify-between
                        items-center
                    ">


                                    <div>

                                        <p className="
                                text-xs
                                text-white
                                uppercase
                            ">
                                            Slot Name :
                                        </p>


                                        <p className="
                                text-blue-500
                                font-semibold
                                mt-1
                            ">
                                            {selectedSlot.slotName}
                                        </p>

                                    </div>



                                    <div className="
                            bg-green-500/10
                            border
                            border-green-400/50
                            px-3
                            py-1
                            rounded-full
                            shadow-sm
                            shadow-green-400/20
                        ">

                                        <span className="
                                text-green-400
                                text-xs
                                font-medium
                            ">
                                            Available
                                        </span>


                                    </div>


                                </div>

                                {/* Date & Time */}

                                <div className="
                        grid
                        grid-cols-2
                        gap-3
                    ">


                                    <div className="
                            bg-slate-800
                            rounded-lg
                            p-3
                        ">

                                        <p className="
                                text-xs
                                text-gray-500
                            ">
                                            Date
                                        </p>


                                        <p className="
                                text-white
                                text-sm
                                mt-1
                            ">
                                            {selectedSlot.date}
                                        </p>


                                    </div>





                                    <div className="
                            bg-slate-800
                            rounded-lg
                            p-3
                        ">

                                        <p className="
                                text-xs
                                text-gray-500
                            ">
                                            Time
                                        </p>


                                        <p className="
                                text-white
                                text-sm
                                mt-1
                            ">
                                            {selectedSlot.startTime}
                                            {" - "}
                                            {selectedSlot.endTime}
                                        </p>


                                    </div>


                                </div>



                            </div>






                            {/* Actions */}


                            <div className="
                    flex
                    gap-3
                    mt-5
                ">


                                <button

                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedSlot(null);
                                    }}

                                    className="
                            flex-1
                            bg-slate-800
                            hover:bg-slate-700
                            text-gray-300
                            py-2.5
                            rounded-xl
                            transition
                            font-medium
                        "
                                >
                                    Cancel
                                </button>





                                <button

                                    onClick={confirmBooking}

                                    disabled={bookingLoading}

                                    className="
                            flex-1
                            bg-blue-500/50
                            hover:bg-blue-600
                            disabled:opacity-50
                            text-white
                            py-2.5
                            rounded-xl
                            font-semibold
                            transition
                            shadow-lg
                            shadow-blue-500/20
                        "
                                >

                                    {
                                        bookingLoading
                                            ?
                                            "Booking..."
                                            :
                                            "Confirm "
                                    }


                                </button>


                            </div>


                        </div>


                    </div>

                )
            }



        </div>

    );

};


export default SlotBooking;