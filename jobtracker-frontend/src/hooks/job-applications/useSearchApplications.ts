import { useState } from "react";
import { useAuth } from "~/context/AuthContext";
import { axiosInstance } from "~/libs/axios";
import { handleApiError } from "../handleError";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSearchApplications = () => {
    const [loadingSA, setLoadingSA] = useState(false);
    const {authUser, setAuthUser} = useAuth();
    const navigate = useNavigate();

    const searchApplications = async (query: string) => {
        setLoadingSA(true);

        try{
            const res = await axiosInstance.get(`/applications/search/${query}`, {
                headers: {
                    "Authorization": `Bearer ${authUser?.token}`
                }
            })

            return res.data;
        } catch(error) {
            const {message, details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(details);
                toast.error('Unexpected error occurred');
            } else if (details === 401) {
                toast.error('Session expired, please login again');
                localStorage.removeItem('authUser');
                setAuthUser(null);
                navigate('/login');
            } else {
                console.log(message);
                toast.error(`Failed to search applications with query: ${query}`);
            }
        } finally {
            setLoadingSA(false);
        }
    }

    return {loadingSA, searchApplications};
}

export default useSearchApplications;