import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
    FiBell,
    FiCheckCircle,
    FiXCircle,
    FiClock,
    FiCheck
} from "react-icons/fi";

import toast from "react-hot-toast";

import API from "../../../../api";


const Notifications = () => {


    const { token } = useSelector(
        (state) => state.stationAuth
    );


    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(false);





    // GET USER NOTIFICATIONS

    const fetchNotifications = async () => {

        try {

            setLoading(true);


            const response = await API.get(
                "/notification",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            setNotifications(
                response.data.notifications
            );


        } catch (error) {

            console.log(error);


            toast.error(
                error.response?.data?.message ||
                "Unable to load notifications"
            );


        } finally {

            setLoading(false);

        }

    };






    useEffect(() => {

        if(token){

            fetchNotifications();

        }

    }, [token]);







    // MARK AS READ

    const markNotificationAsRead = async (id) => {


        try {


            const response = await API.put(
                `/notification/${id}/read`,
                {},
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );



            if(response.data.success){


                // Update UI without refresh

                setNotifications((prev)=>

                    prev.map((notification)=>

                        notification._id === id

                        ?

                        {
                            ...notification,
                            isRead:true
                        }

                        :

                        notification

                    )

                );


            }



        } catch(error){


            console.log(error);


            toast.error(
                error.response?.data?.message ||
                "Unable to mark notification as read"
            );


        }


    };








    // DATE FORMAT

    const formatDate = (date) => {

        return new Date(date)
            .toLocaleString(
                "en-US",
                {
                    dateStyle:"medium",
                    timeStyle:"short"
                }
            );

    };









    return (

        <div className="
            min-h-screen
            space-y-8
            p-4
            bg-[#07111F]
            mt-5
        ">



            {/* HEADER */}

            <div className="mb-10">


                <h1 className="
                    text-3xl
                    font-bold
                    text-white
                ">
                    Notifications
                </h1>



                <p className="
                    text-gray-400
                    mt-2
                ">
                    Booking updates and charging system alerts
                </p>


            </div>







            {/* LOADING */}

            {
                loading && (

                    <div className="
                        flex
                        justify-center
                        items-center
                        h-60
                    ">

                        <div className="
                            w-12
                            h-12
                            rounded-full
                            border-b-2
                            border-green-400
                            animate-spin
                        ">

                        </div>

                    </div>

                )
            }









            {/* EMPTY */}

            {
                !loading &&
                notifications.length === 0 && (


                    <div className="
                        bg-slate-900
                        border
                        border-cyan-900/40
                        rounded-2xl
                        p-10
                        text-center
                    ">


                        <FiBell
                            className="
                                mx-auto
                                text-cyan-400
                                text-5xl
                            "
                        />



                        <h2 className="
                            mt-4
                            text-xl
                            font-semibold
                            text-white
                        ">
                            No Notifications
                        </h2>




                        <p className="
                            text-gray-400
                            mt-2
                        ">
                            Your booking updates will appear here.
                        </p>


                    </div>

                )

            }









            {/* LIST */}


            <div className="
                space-y-6
            ">


                {
                    notifications.map((notification)=>(


                        <div

                            key={notification._id}


                            onClick={()=>{


                                if(!notification.isRead){

                                    markNotificationAsRead(
                                        notification._id
                                    );

                                }


                            }}



                            className={`

                                bg-slate-900

                                rounded-xl

                                p-4

                                flex

                                gap-4

                                items-start

                                cursor-pointer

                                transition

                                shadow-md


                                ${
                                    notification.isRead

                                    ?

                                    "border border-slate-800"

                                    :

                                    "border border-blue-500/40 hover:border-blue-400"

                                }


                            `}

                        >







                            {/* ICON */}


                            <div className="
                                p-3
                                rounded-xl
                                bg-cyan-500/10
                                border
                                border-cyan-500/20
                            ">


                                {
                                    notification.type === "booking_success"

                                    ?

                                    <FiCheckCircle
                                        className="
                                            text-green-400
                                            text-2xl
                                        "
                                    />


                                    :

                                    notification.type === "booking_cancel"

                                    ?

                                    <FiXCircle
                                        className="
                                            text-red-400
                                            text-2xl
                                        "
                                    />


                                    :

                                    <FiBell
                                        className="
                                            text-yellow-400
                                            text-2xl
                                        "
                                    />

                                }


                            </div>









                            {/* CONTENT */}


                            <div className="
                                flex-1
                            ">


                                <div className="
                                    flex
                                    justify-between
                                    items-center
                                ">



                                    <h3 className="
                                        text-lg
                                        font-bold
                                        text-white
                                    ">

                                        {notification.title}

                                    </h3>





                                    {
                                        notification.isRead

                                        ?

                                        <FiCheck
                                            className="
                                                text-green-400
                                                text-xl
                                            "
                                        />

                                        :

                                        <span className="
                                            bg-cyan-400
                                            text-slate-900
                                            text-xs
                                            font-semibold
                                            px-2
                                            py-1
                                            rounded-full
                                        ">
                                            New
                                        </span>

                                    }



                                </div>





                                <p className="
                                    text-gray-300
                                    mt-2
                                    leading-relaxed
                                ">

                                    {notification.message}

                                </p>





                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                    text-cyan-500/70
                                    text-sm
                                    mt-3
                                ">


                                    <FiClock/>


                                    {
                                        formatDate(
                                            notification.createdAt
                                        )
                                    }


                                </div>





                            </div>







                        </div>


                    ))
                }


            </div>





        </div>

    );

};


export default Notifications;