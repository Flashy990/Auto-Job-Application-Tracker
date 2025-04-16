import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "~/context/AuthContext";
import { axiosInstance } from "~/libs/axios";
import { handleApiError, type ErrorResponse } from "../handleError";

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
            const {message, details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(details);
                toast.error('Unexpectd error occurred');
            } else {
                console.log(message, details);
                toast.error('Failed to login');
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
