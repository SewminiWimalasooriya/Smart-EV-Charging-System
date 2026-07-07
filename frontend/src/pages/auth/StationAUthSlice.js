import { createSlice } from "@reduxjs/toolkit";

// Get auth data from localStorage
const storedData = localStorage.getItem("stationAuth");
const authData = storedData ? JSON.parse(storedData) : null;

const initialState = {
    loading: false,
    error: false,
    errorMessage: "",

    user: authData?.user || null,
    token: authData?.token || null,
    role: authData?.user?.role || null,
    apartment: authData?.user?.apartment || null,

    isAuthenticated: !!authData,
    mustChangePassword: authData?.mustChangePassword || false,
};

const stationAuthSlice = createSlice({
    name: "stationAuth",
    initialState,

    reducers: {
        // LOGIN START
        stationLoginStart: (state) => {
            state.loading = true;
            state.error = false;
            state.errorMessage = "";
        },

        // LOGIN SUCCESS
        stationLoginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.user.role;
            state.apartment = action.payload.user.apartment;
            state.mustChangePassword =
                action.payload.mustChangePassword || false;

            state.isAuthenticated = true;

            // Save to localStorage
            localStorage.setItem(
                "stationAuth",
                JSON.stringify({
                    user: action.payload.user,
                    token: action.payload.token,
                    mustChangePassword:
                        action.payload.mustChangePassword || false,
                })
            );
        },

        // LOGIN FAILURE
        stationLoginFailure: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload;
        },

        // LOGOUT
        stationLogout: (state) => {
            state.loading = false;
            state.error = false;
            state.errorMessage = "";

            state.user = null;
            state.token = null;
            state.role = null;
            state.apartment = null;
            state.mustChangePassword = false;
            state.isAuthenticated = false;

            // Remove localStorage
            localStorage.removeItem("stationAuth");
        },
    },
});

export const {
    stationLoginStart,
    stationLoginSuccess,
    stationLoginFailure,
    stationLogout,
} = stationAuthSlice.actions;

export default stationAuthSlice.reducer;