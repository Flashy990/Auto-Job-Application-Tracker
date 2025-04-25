import { createSlice } from "@reduxjs/toolkit";

export interface ApplicationIdState{
    applicationId: {
        value: string
    }
}

export const applicationIdSlice = createSlice({
    name: 'applicationId',
    initialState: {
        value: ''
    },
    reducers: {
        setApplicationId: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setApplicationId} = applicationIdSlice.actions;
export default applicationIdSlice.reducer;