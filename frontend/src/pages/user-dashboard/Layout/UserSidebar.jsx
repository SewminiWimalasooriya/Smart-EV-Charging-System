import { useEffect, useState } from "react";
import {
    FiHome,
    FiMapPin,
    FiCalendar,
    FiBell,
    FiLogOut,
    FiZap
} from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { stationLogout } from "../../auth/StationAUthSlice";
import API from "../../../api";

const UserSidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { apartment, token } = useSelector(
        (state) => state.stationAuth
    );

    const stationId = apartment?._id;

    const [notificationCount, setNotificationCount] = useState(0);

    const menus = [
        {
            title: "Overview",
            icon: <FiHome size={20} />,
            path: `/user-dashboard/user/${stationId}`
        },
        {
            title: "Slot Booking",
            icon: <FiMapPin size={20} />,
            path: `/user-dashboard/user/${stationId}/slot-booking`
        },
        {
            title: "My Bookings",
            icon: <FiCalendar size={20} />,
            path: `/user-dashboard/user/${stationId}/my-bookings`
        },
        {
            title: "Notifications",
            icon: <FiBell size={20} />,
            path: `/user-dashboard/user/${stationId}/notifications`
        }
    ];

    // GET NOTIFICATION COUNT 

    const fetchNotificationCount = async () => {

        try {

            const response = await API.get(
                "/notification",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const notifications =
                response.data.notifications || [];

            const unreadNotifications =
                notifications.filter(
                    (item) => item.isRead === false
                );

            setNotificationCount(
                unreadNotifications.length
            );

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        if (token) {

            fetchNotificationCount();

            const interval = setInterval(() => {

                fetchNotificationCount();

            }, 30000);

            return () => clearInterval(interval);

        }

    }, [token]);

    // ======================================
    // LOGOUT
    // ======================================

    const handleLogout = () => {

        dispatch(stationLogout());

        localStorage.removeItem("token");
        localStorage.removeItem("auth");

        navigate("/login");

    };

    return (

        <aside className="w-72 min-h-screen bg-[#07111F] border-r border-white/10 flex flex-col">

            {/* Logo */}

            <div className="p-6 border-b border-white/10 bg-[#0F1B2D]/60 backdrop-blur-xl">

                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-xl bg-cyan-400/20 flex items-center justify-center text-cyan-400 text-2xl shadow-[0_0_20px_rgba(0,212,255,0.25)]">

                        <FiZap />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold text-white">

                            Volt
                            <span className="text-cyan-400">
                                Spot
                            </span>

                        </h1>

                        <p className="text-slate-400 text-xs mt-1">

                            User Dashboard

                        </p>

                    </div>

                </div>

            </div>

            {/* Navigation */}

            <div className="flex-1 p-5">

                <p className="text-xs uppercase tracking-wider text-slate-500 mb-4">

                    Navigation

                </p>
                                {menus.map((menu) => (

                    <NavLink
                        key={menu.title}
                        to={menu.path}
                        end={menu.title === "Overview"}

                        className={({ isActive }) =>

                            `flex items-center gap-4 px-5 py-4 rounded-xl mb-3 transition-all duration-300

                            ${
                                isActive
                                    ? "bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 shadow-[0_0_20px_rgba(0,212,255,0.15)]"
                                    : "text-slate-300 hover:bg-white/5 hover:text-cyan-300"
                            }`

                        }

                    >


                        {/* Icon */}

                        <div className="text-lg">

                            {menu.icon}

                        </div>





                        {/* Menu title + Notification badge */}

                        <div className="flex items-center justify-between flex-1">


                            <span className="font-medium">

                                {menu.title}

                            </span>





                            {
                                menu.title === "Notifications" &&
                                notificationCount > 0 && (

                                    <span
                                        className="
                                            min-w-[22px]
                                            h-[22px]
                                            px-2
                                            rounded-full
                                            bg-cyan-500
                                            text-white
                                            text-xs
                                            font-bold
                                            flex
                                            items-center
                                            justify-center
                                            shadow-lg
                                        "
                                    >

                                        {
                                            notificationCount > 99
                                                ? "99+"
                                                : notificationCount
                                        }

                                    </span>

                                )
                            }


                        </div>



                    </NavLink>

                ))}


            </div>





            {/* Logout */}

            <div className="p-5 border-t border-white/10">


                <button

                    onClick={handleLogout}

                    className="
                        flex
                        items-center
                        gap-3
                        w-full
                        px-5
                        py-4
                        rounded-xl
                        bg-red-500/10
                        border
                        border-red-400/20
                        text-red-400
                        hover:bg-red-500/20
                        transition-all
                        duration-300
                    "

                >

                    <FiLogOut />

                    <span>

                        Logout

                    </span>


                </button>


            </div>


        </aside>

    );

};


export default UserSidebar;