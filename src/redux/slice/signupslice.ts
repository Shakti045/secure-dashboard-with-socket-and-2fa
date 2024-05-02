import { createSlice } from "@reduxjs/toolkit";

export interface signupdata {
     username?:string;
     email?: string;
     password?: string,
     confirmPassword?: string
}

type initstate = {
    data:signupdata
};

const initialState:initstate = {
    data:{}
}

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        setSignupData(state, action) {
            state.data = action.payload;
        }
    }
})

export const { setSignupData } = signupSlice.actions
export default signupSlice.reducer