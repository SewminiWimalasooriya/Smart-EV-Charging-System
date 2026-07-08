import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../pages/owner-dashboard/Layout/DashboardLayout"
// import UserDashboard from "../pages/owner-dashboard/UserDashboard";


import SlotManagement from "../pages/owner-dashboard/owner-pages/slots/SlotManagement";
import BookingManagement from "../pages/owner-dashboard/owner-pages/booking/BookingManagement";
import Overview from "../pages/owner-dashboard/owner-pages/Overview";
import ProtectedRoute from "./ProtectedRoute";

const OwnerDashboardRoutes = () => {
    return (
        <Routes>

            <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>

                <Route
                    path="/owner/:id"
                    element={<DashboardLayout />}
                >

                    <Route index element={<Overview />} />



                    <Route
                        path="slots-management"
                        element={<SlotManagement />}
                    />

                    <Route
                        path="booking"
                        element={<BookingManagement />}
                    />

                </Route>

            </Route>

        </Routes>

    )
}

export default OwnerDashboardRoutes;