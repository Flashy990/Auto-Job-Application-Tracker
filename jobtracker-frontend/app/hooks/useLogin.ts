import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "~/context/AuthContext";
import { axiosInstance } from "~/libs/axios";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuth();


    const login = async (email: string, password: string) => {
        const success = handleInputError(email, password);
        if(!success) return;

        setLoading(true);

        try {
            const res = await axiosInstance.post('/login/api', {email, password});
    
            if(res.data.error) {
                throw new Error(res.data.error);
            }
    
            setAuthUser(res.data); // change
            toast.success('Logged in successfully');
            return true;

        } catch(error) {
            if (error instanceof Error) {
                toast.error(error.message);
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
