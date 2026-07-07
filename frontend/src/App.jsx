import {  Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import AllStations from "./pages/home/AllStations";
import AdminRoutes from "./routes/AdminRoutes";
import StationAuthRoutes from "./routes/StationAuthRoutes";
import StationMap from "./pages/home/StationMap";
import OwnerDashboardRoutes from "./routes/OwnerDashboardRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserRoutes from "./routes/UserRoutes";

function App() {
  return (
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/view-stations" element={<AllStations />} />
        <Route path="/stations-map" element={<StationMap />}/>
        <Route path="/admin/*" element={<AdminRoutes />}/>
        <Route path="/auth/*" element={<StationAuthRoutes />}/>
        <Route path="/dashboard/*" element={<OwnerDashboardRoutes />}/>
        <Route path="/user-dashboard/*" element={<UserRoutes/>}/>
        

      </Routes>

   
  );
}

export default App;