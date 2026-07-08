
import { configureStore } from "@reduxjs/toolkit";
// import apartmentReducer from '../features/apartment/apartmentSlice';
import stationAuthReducer from "../pages/auth/StationAUthSlice";
import adminAuthReducer from "../pages/auth/AdminAuthSlice";

export const store = configureStore({
  reducer: {
    // apartment: apartmentReducer,
    stationAuth: stationAuthReducer,
    adminAuth: adminAuthReducer,
  },
});

