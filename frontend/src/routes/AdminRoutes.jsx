import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../pages/admin-dashboard/Layout/AdminLayout";
import AdminOverview from "../pages/admin-dashboard/admin-pages/overview/AdminOverview"
import StationRequests from "../pages/admin-dashboard/admin-pages/stationRequests/StationRequests"
import ActiveStations from "../pages/admin-dashboard/admin-pages/stations/ActiveStations"
import BlockedStations from "../pages/admin-dashboard/admin-pages/stations/BlockedStations"
//admin routers here

const AdminRoutes = () => {
    return (
        <Routes>
            //admin login 
            <Route path="/login" element = {<AdminLogin />}/>

            {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} />}> */}

            <Route path="/admin-dashboard" element={<AdminLayout />}>
                    <Route index element={<AdminOverview />} />

                    <Route
                        path="station-requests"
                        element={<StationRequests />}
                    />

                    <Route
                        path="active-stations"
                        element={<ActiveStations />}
                    />

                    <Route
                        path="blocked-stations"
                        element={<BlockedStations />}
                    />
                </Route>

            {/* </Route> */}

        </Routes>

    )
}

export default AdminRoutes;