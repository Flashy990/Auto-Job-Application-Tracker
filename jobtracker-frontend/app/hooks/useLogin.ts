import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "~/context/AuthContext";
import { axiosInstance } from "~/libs/axios";
import type { ErrorResponse } from "./defineError";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuth();


    const login = async (email: string, password: string) => {
        const success = handleInputError(email, password);
        if(!success) return;

        setLoading(true);

        try {
            const res = await axiosInstance.post('/auth/login', {email, password});
    
            setAuthUser(res.data); // change
            toast.success('Logged in successfully');
            return true;

        } catch(error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                console.error(axiosError.response?.data.error, axiosError.response?.data.message);
                toast.error("Failed to login, try later");
            } else {
                toast.error('An unexpected error occurred');
            }
            return false;
        } finally {
            setLoading(false);
        }
    }
    
    return {loading, login};
}

function handleInputError(email:string, password: string) {
    if(!email || !password) {
        toast.error('Please fill in both fields');
        return false;
    }

    return true;
}

export default useLogin;
