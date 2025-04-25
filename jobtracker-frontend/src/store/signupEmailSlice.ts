import { createSlice } from "@reduxjs/toolkit";

export interface EmailState{
    signupEmail: {
        value: string
    }
}

export const signupEmailSlice = createSlice({
    name: 'signupEmail',
    initialState: {
        value: ''
    },
    reducers: {
        setEmail: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setEmail} = signupEmailSlice.actions;
export default signupEmailSlice.reducer;