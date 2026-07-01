import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({allowedRoles}) => {
    const {token,role} = useSelector((state) => state.stationAuth);

    if (!token){
         return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;