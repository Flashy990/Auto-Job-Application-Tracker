import {  useState } from "react"
import { axiosInstance } from "~/libs/axios";
import { handleApiError } from "../handleError";
import toast from "react-hot-toast";
import { useAuth } from "~/context/AuthContext";
import { useNavigate } from "react-router-dom";

const useGetApplicationsByStatus = () => {
    const [loadingGAS, setLoadingGAS] = useState(false);
    const {authUser, setAuthUser} = useAuth();
    const navigate = useNavigate();

    const getApplicationsByStatus = async (status: string) => {
        setLoadingGAS(true);

        try{
            const res = await axiosInstance.get(`/applications/status/${status}`, {
                headers: {
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            return res.data;
        } catch(error) {
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
                toast.error(`Failed to get your applications with status ${status}`);
            }
        } finally {
            setLoadingGAS(false);
        }
    }

    return {loadingGAS, getApplicationsByStatus};

}

export default useGetApplicationsByStatus;