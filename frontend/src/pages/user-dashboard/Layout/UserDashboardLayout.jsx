import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";


const UserDashboardLayout = () => {


    const { user } = useSelector(
        (state)=>state.stationAuth
    );


    return (

        <div className="flex h-screen overflow-hidden bg-[#07111F]">


            <UserSidebar />


             <main className="flex-1 overflow-y-auto">

                <Outlet />

            </main>



        </div>

    )

}


export default UserDashboardLayout;