import { createSlice } from "@reduxjs/toolkit";

export const applicationIdSlice = createSlice({
    name: 'applicationId',
    initialState: {
        value: -1
    },
    reducers: {
        setApplicationId: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setApplicationId} = applicationIdSlice.actions;
export default applicationIdSlice.reducer;