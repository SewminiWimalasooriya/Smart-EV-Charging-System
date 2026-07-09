import {
    FiHome,
    FiClipboard,
    FiZap,
    FiSlash,
    FiUsers,
    FiBell,
    FiLogOut
} from "react-icons/fi";

import {
    NavLink,
    useNavigate
} from "react-router-dom";

import {
    useDispatch
} from "react-redux";

import {
    stationLogout
} from "../../auth/StationAUthSlice";



const AdminSidebar = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();




    const menus = [

        {
            title: "Overview",
            icon: <FiHome size={20}/>,
            path: "/admin/admin-dashboard"
        },


        {
            title: "Station Requests",
            icon: <FiClipboard size={20}/>,
            path: "/admin/admin-dashboard/station-requests"
        },


        {
            title: "Active Stations",
            icon: <FiZap size={20}/>,
            path: "/admin/admin-dashboard/active-stations"
        },


        {
            title: "Blocked Stations",
            icon: <FiSlash size={20}/>,
            path: "/admin/admin-dashboard/blocked-stations"
        },


        // {
        //     title: "Users",
        //     icon: <FiUsers size={20}/>,
        //     path: "/admin/dashboard/users"
        // },


        // {
        //     title: "Notifications",
        //     icon: <FiBell size={20}/>,
        //     path: "/admin/dashboard/notifications"
        // }

    ];






    const handleLogout = () => {


        dispatch(
            stationLogout()
        );


        localStorage.removeItem(
            "token"
        );


        localStorage.removeItem(
            "auth"
        );


        navigate("/admin/login");


    };







    return (


        <aside
            className="
                w-72
                min-h-screen
                bg-[#07111F]
                border-r
                border-white/10
                flex
                flex-col
            "
        >



            {/* Logo Section */}


            <div
                className="
                    p-6
                    border-b
                    border-white/10
                    bg-[#0F1B2D]/60
                    backdrop-blur-xl
                "
            >



                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >



                    <div
                        className="
                            w-12
                            h-12
                            rounded-xl
                            bg-cyan-400/20
                            flex
                            items-center
                            justify-center
                            text-cyan-400
                            text-2xl
                            shadow-[0_0_20px_rgba(0,212,255,0.25)]
                        "
                    >

                        <FiZap/>

                    </div>





                    <div>


                        <h1
                            className="
                                text-2xl
                                font-bold
                                text-white
                            "
                        >

                            Volt
                            <span
                                className="
                                    text-cyan-400
                                "
                            >
                                Spot
                            </span>


                        </h1>



                        <p
                            className="
                                text-slate-400
                                text-xs
                                mt-1
                            "
                        >

                            Admin Panel

                        </p>


                    </div>




                </div>



            </div>








            {/* Navigation */}



            <div
                className="
                    flex-1
                    p-5
                "
            >



                <p
                    className="
                        text-xs
                        uppercase
                        tracking-wider
                        text-slate-500
                        mb-4
                    "
                >

                    Management

                </p>







                {
                    menus.map((menu)=>(


                        <NavLink

                            key={menu.title}

                            to={menu.path}

                           end={menu.title === "Overview"}


                            className={({isActive})=>

                                `
                                flex
                                items-center
                                gap-4
                                px-5
                                py-4
                                rounded-xl
                                mb-3
                                transition-all
                                duration-300

                                ${
                                    isActive

                                    ?

                                    "bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 shadow-[0_0_20px_rgba(0,212,255,0.15)]"

                                    :

                                    "text-slate-300 hover:bg-white/5 hover:text-cyan-300"
                                }

                                `
                            }

                        >
                            <div className="text-lg "> {menu.icon} </div>

                            <span className=" font-medium " >{menu.title}</span>

                        </NavLink>


                    ))
                }




            </div>


            {/* Logout */}



            <div
                className="
                    p-5
                    border-t
                    border-white/10
                "
            >



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



                    <FiLogOut/>


                    <span>

                        Logout

                    </span>



                </button>



            </div>




        </aside>


    );

};


export default AdminSidebar;