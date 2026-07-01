import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../pages/owner-dashboard/Layout/DashboardLayout"
// import UserDashboard from "../pages/owner-dashboard/UserDashboard";

import AddOwner from "../pages/owner-dashboard/owner-pages/Add-owner";
import SlotsManagement from "../pages/owner-dashboard/owner-pages/SlotsManagement";
import Booking from "../pages/owner-dashboard/owner-pages/Booking"; 
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
                path="add-owner"
                element={<AddOwner />}
            />

            <Route
                path="slots-management"
                element={<SlotsManagement />}
            />

            <Route
                path="booking"
                element={<Booking />}
            />

        </Route>

    </Route>

</Routes>

    )
}

export default OwnerDashboardRoutes;