import { createSlice } from "@reduxjs/toolkit";


const storedData = localStorage.getItem(
    "adminAuth"
);


const authData = storedData
    ? JSON.parse(storedData)
    : null;



const initialState = {


    user: authData?.user || null,

    token: authData?.token || null,

    isAuthenticated: !!authData,


};





const adminAuthSlice = createSlice({

    name:"adminAuth",


    initialState,


    reducers:{


        adminLoginSuccess:(state,action)=>{


            state.user =
                action.payload.user;


            state.token =
                action.payload.token;


            state.isAuthenticated = true;



            localStorage.setItem(

                "adminAuth",

                JSON.stringify({

                    user:action.payload.user,

                    token:action.payload.token

                })

            );


        },




        adminLogout:(state)=>{


            state.user=null;

            state.token=null;

            state.isAuthenticated=false;


            localStorage.removeItem(
                "adminAuth"
            );


        }



    }


});




export const {
    adminLoginSuccess,
    adminLogout

}=adminAuthSlice.actions;



export default adminAuthSlice.reducer;