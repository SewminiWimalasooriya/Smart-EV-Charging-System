import {
    FiHome,
    FiGrid,
    FiCalendar,
    FiLogOut
} from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { stationLogout } from "../../auth/StationAUthSlice";

const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { apartment } = useSelector(state => state.stationAuth);

    const stationId = apartment?._id;

    const menus = [
        {
            title: "Overview",
            icon: <FiHome size={20}/>,
            path: `/dashboard/owner/${stationId}`
        },
        {
            title: "Slot Management",
            icon: <FiGrid size={20}/>,
            path: `/dashboard/owner/${stationId}/slots-management`
        },
        {
            title: "Bookings",
            icon: <FiCalendar size={20}/>,
            path: `/dashboard/owner/${stationId}/booking`
        }
    ];

    const logout = () => {
        dispatch(stationLogout());
        localStorage.removeItem("token");
        navigate("/");
    };

    return (

        <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">

            <div className="p-6 border-b border-slate-800">

                <h1 className="text-3xl font-bold text-blue-500">
                    ⚡ VoltSpot
                </h1>

                <p className="text-slate-400 text-sm mt-2">
                    EV Station Dashboard
                </p>

            </div>

            <div className="flex-1 p-5">

                {menus.map(menu => (

                    <NavLink

                        key={menu.title}

                        to={menu.path}

                        end={menu.title === "Overview"}

                        className={({isActive}) =>

                            `flex items-center gap-4 px-5 py-4 rounded-xl mb-3 transition-all

                            ${
                                isActive

                                ? "bg-blue-600 text-white shadow-lg"

                                : "hover:bg-slate-800 text-slate-300"

                            }`

                        }

                    >

                        {menu.icon}

                        {menu.title}

                    </NavLink>

                ))}

            </div>

            <div className="p-5 border-t border-slate-800">

                <button

                    onClick={logout}

                    className="flex items-center gap-3 w-full px-5 py-4 rounded-xl bg-red-600 hover:bg-red-700 transition"

                >

                    <FiLogOut/>

                    Logout

                </button>

            </div>

        </aside>

    );

};

export default Sidebar;