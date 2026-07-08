import { Routes, Route } from "react-router-dom";

import UserDashboardLayout from "../pages/user-dashboard/Layout/UserDashboardLayout";

import Overview from "../pages/user-dashboard/user-pages/overview/Overview";

import MyBookings from "../pages/user-dashboard/user-pages/bookings/MyBookings";
import Notifications from "../pages/user-dashboard/user-pages/notifications/Notifications";
import ProtectedRoute from "./ProtectedRoute";
import SlotBooking from "../pages/user-dashboard/user-pages/findSlot/SlotBooking";


const UserRoutes = () => {

    return (

        <Routes>
            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
                <Route path="/user/:id" element={<UserDashboardLayout />}>
                    <Route index element={<Overview />} />

                    <Route
                        path="slot-booking"
                        element={<SlotBooking />}
                    />

                    <Route
                        path="my-bookings"
                        element={<MyBookings />}
                    />

                    <Route
                        path="notifications"
                        element={<Notifications />}
                    />
                </Route>
            </Route>
        </Routes>

    )
}


export default UserRoutes;