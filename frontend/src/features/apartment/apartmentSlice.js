// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getApprovedApartments } from "../../services/apartmentService";

// //inform redux about the async action
// export const fetchApartments = createAsyncThunk(
//     "apartments/fetchApartments",
//     async ()=>{
//         return await getApprovedApartments();
//     }
// );



// const apartmentSlice = createSlice({
//     name:"apartment",
//     initialState:{
//         apartments:[],
//         loading: false,
//         error: null,
//     },
//     reducers:{},

//     extraReducers:(builder)=>{
//         builder
//         .addCase(fetchApartments.pending,(state)=>{
//             state.loading = true;

//         })
//         .addCase(fetchApartments.fulfilled, (state, action) => {
//         state.loading = false;
//         state.apartments = action.payload;
//       })

//       .addCase(fetchApartments.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//     }
// });
// export default apartmentSlice.reducer;