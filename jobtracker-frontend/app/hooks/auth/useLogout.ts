import { useState } from "react"
import toast from "react-hot-toast";
import { useAuth } from "~/context/AuthContext";
import { axiosInstance } from "~/libs/axios";
import { handleApiError, type ErrorResponse } from "../handleError";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuth();

    const logout = async () => {
        setLoading(true);
        try{
            const res = await axiosInstance.post('/logout/api');
            
            setAuthUser(null);
        } catch(error) {
            const {statusCode, message, details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(statusCode, details);
                toast.error('Unexpectd error occurred');
            } else {
                console.log(statusCode, message, details);
                toast.error('Failed to logout');
            }
        } finally {
            setLoading(false);
        }
    }

    return {loading, logout};
}

export default useLogout;