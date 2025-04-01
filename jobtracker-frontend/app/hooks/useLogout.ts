import axios, { AxiosError } from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useAuth } from "~/context/AuthContext";
import { axiosInstance } from "~/libs/axios";
import type { ErrorResponse } from "./defineError";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuth();

    const logout = async () => {
        setLoading(true);
        try{
            const res = await axiosInstance.post('/logout/api');
            
            setAuthUser(null);
        } catch(error) {
            if(axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                console.error(axiosError.response?.data.error, axiosError.response?.data.message);
                toast.error('Failed to log out');
            } else {
                toast.error('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    }

    return {loading, logout};
}

export default useLogout;