import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { stationLogout } from "../../auth/StationAUthSlice";

const Sidebar = ()=>{
    const { apartment } = useSelector((state) => state.stationAuth);
    const stationId = apartment?._id; // 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menuItems = [
        { name: "Overview", path: `/dashboard/owner/${stationId}` },
        { name: "Add New Owner", path: `/dashboard/owner/${stationId}/add-owner` },
        { name: "Slots Management", path: `/dashboard/owner/${stationId}/slots-management` },
        { name: "Booking", path: `/dashboard/owner/${stationId}/booking` }
    ];

    const handleLogout = ()=>{
        dispatch(stationLogout());
        localStorage.removeItem("token"); // if you use token
        navigate(`/`,{ replace: true }); // redirect to login

    }

    return(
        <div className="w-64 bg-gray-900/60 border-r border-gray-800 p-5 flex flex-col h-screen">
            <h1 className="text-2xl font-bold mb-10">⚡VoltSpot</h1>

            <div className="space-y-3 flex-1">
                {menuItems.map((item)=>(
                    <NavLink
                       to={item.path}
                       key={item.name}
                       end={item.name === "Overview"}
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-xl transition ${
                                isActive
                                    ? "bg-blue-400 text-black"
                                    : "bg-gray-800 hover:bg-gray-700"
                            }`
                        }
                            >{item.name}</NavLink>
                ))}

            </div>
             <div className="border-t border-gray-700 my-3"></div>
           <button className="flex items-center gap-3 px-4 py-3 mt-5 rounded-xl bg-gray-900 hover:bg-blue-700 transition text-white"
           onClick={handleLogout}>
            <FiLogOut size={18} />
            Logout
           </button>

        </div>
    )
}

export default Sidebar;