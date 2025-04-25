import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext"
import { handleApiError } from "../handleError";
import toast from "react-hot-toast";
import { axiosInstance } from "~/libs/axios";

export const useGetStats = () => {
    const { authUser, setAuthUser } = useAuth();
    const navigate = useNavigate();

    const getStats = async () => {

        try {
            const res = await axiosInstance.get('/stats', {
                headers: {
                    'Authorization': `Bearer ${authUser?.token}`,
                }
            })

            return res.data;
        } catch (error) {
            const {message, details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(details);
                toast.error('Unexpectd error occurred');
            } else if(details === 401) {
                toast.error('Session expired, please login again');
                localStorage.removeItem('authUser');
                setAuthUser(null);
                navigate('/login');
            } else {
                console.log(message);
                toast.error(`Failed to get your applications' status stats`);
            }
        }
    }

    return { getStats };
}