import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {

    return (

        <div className="flex h-screen bg-[#07111F] overflow-hidden">

            {/* Sidebar */}

            <AdminSidebar />

            {/* Right Side */}

            <div className="flex-1 flex flex-col overflow-hidden">

               

               

                {/* Main Content */}

                <main
                    className="
                        flex-1
                        overflow-y-auto
                        bg-gradient-to-br
                        from-[#07111F]
                        via-[#0B1726]
                        to-[#07111F]
                        p-6
                    "
                >

                    <Outlet />

                </main>

            </div>

        </div>

    );

};

export default AdminLayout;