import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";

//admin routers here

const AdminRoutes = () => {
    return (
        <Routes>
            //admin login 
            <Route path="/login" element = {<AdminLogin />}/>

        </Routes>

    )
}

export default AdminRoutes;