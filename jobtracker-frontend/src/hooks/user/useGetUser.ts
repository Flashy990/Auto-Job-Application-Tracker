import { useState } from "react"
import { useAuth } from "~/context/AuthContext";
import { axiosInstance } from "~/libs/axios";
import { handleApiError } from "../handleError";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useGetUser = () => {
    const [loadingGU, setLoadingGU] = useState(false);
    const {authUser, setAuthUser} = useAuth();
    const navigate = useNavigate();

    const getUser = async () => {
        setLoadingGU(true);

        try {
            const res = await axiosInstance.get('/user/profile', {
                headers: {
                    'Authorization': `Bearer ${authUser?.token}`,
                }
            })

            return res.data;
        } catch (error) {
            const { message, details } = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(details);
                toast.error('Unexpectd error occurred');
            } else if(details === 401) {
                toast.error("Session expired, please login again");
                localStorage.removeItem("authUser");
                setAuthUser(null);
                navigate('/login');
            } else if(details === 404) {
                console.error(message);
            } else {
                console.log(message);
                toast.error('Failed to get your user information');
            }
        } finally {
            setLoadingGU(false);
        }

        
    }
    
    return { getUser, loadingGU };
}