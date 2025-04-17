import { configureStore } from "@reduxjs/toolkit";
import signupEmailReducer from './signupEmailSlice';
import applicationIdReducer from './applicationIdSlice';

export default configureStore({
    reducer: {
        signupEmail: signupEmailReducer,
        applicationId: applicationIdReducer
    }
});