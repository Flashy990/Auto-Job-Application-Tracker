import axios from "axios";
import { T } from "node_modules/react-router/dist/development/fog-of-war-BQyvjjKg.mjs";
import { useState } from "react"
import toast from "react-hot-toast";
import { useAuth } from "~/context/AuthContext";
import { axiosInstance } from "~/libs/axios";

export const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuth();

    const logout = async () => {
        setLoading(true);
        try{
            const res = await axiosInstance.post('/logout/api');
            if(res.data.error) {
                throw new Error(res.data.error);
            }

            setAuthUser(null);
        } catch(error) {
            if(error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    }

    return {loading, logout};
}