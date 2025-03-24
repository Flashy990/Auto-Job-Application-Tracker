import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "~/context/AuthContext";
import { axiosInstance } from "~/libs/axios";

export const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuth();

    const signup = async (email: string, password: string, confirmPassword: string) => {
        const success = handleInput(email, password, confirmPassword);
        if(!success) return;

        setLoading(true);
        try{
            const res = await axiosInstance.post('signup/api', {email, password});

            if(res.data.error) {
                throw new Error(res.data.error);
            }

            setAuthUser(res.data); // change
            return true;
        } catch(error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unexpected error occured');
            }
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {loading, signup};
};


function handleInput(email:string, password: string, confirmPassword: string) {
    const passwordRegex = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;

    if(!email || !password || !confirmPassword) {
        toast.error('Please fill in all fields');
        return false;
    }
    if(password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }
    if(password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
    }
    if(!passwordRegex.test(password)) {
        toast.error('Password must at least include one uppercase letter, one lowercase letter, one number, and one special character');
        return false;
    }

    return true;
};