import Sidebar from "./Sidebar";
// import DashboardNavbar from "./DashboardNavbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-slate-950 text-white">

            
            <Sidebar />

            {/* Right Side */}
            <div className="flex flex-col flex-1 overflow-hidden ">

                
                {/* <DashboardNavbar /> */}

                {/* Pages */}
                <main className="flex-1 overflow-y-auto bg-slate-900 p-4">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default DashboardLayout;