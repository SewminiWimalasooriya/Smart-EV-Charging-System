
import { configureStore } from "@reduxjs/toolkit";
// import apartmentReducer from '../features/apartment/apartmentSlice';
import stationAuthReducer from "../pages/auth/StationAUthSlice";

export const store = configureStore({
  reducer: {
    // apartment: apartmentReducer,
    stationAuth: stationAuthReducer,
  },
});

