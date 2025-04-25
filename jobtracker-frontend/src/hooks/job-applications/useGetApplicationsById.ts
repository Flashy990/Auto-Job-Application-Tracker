import { useState } from "react"
import { axiosInstance } from "~/libs/axios";
import { handleApiError } from "../handleError";
import toast from "react-hot-toast";
import { useAuth } from "~/context/AuthContext";
import { useNavigate } from "react-router-dom";

const useGetApplicationsById = () => {
    const [loadingGAI, setLoadingGAI] = useState(false);
    const { authUser, setAuthUser } = useAuth();
    const navigate = useNavigate();

    const getApplicationById = async (id: string) => {
        setLoadingGAI(true);

        try{
            const res = await axiosInstance.get(`/applications/${id}`, {
                headers: {
                    "Authorization": `Bearer ${authUser?.token}`
                }
            });
            
            return res.data;
        } catch(error) {
            const {message, details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(details);
                toast.error('Unexpectd error occurred');
            } else if (details === 401) {
                toast.error("Session expired, please login again");
                localStorage.removeItem("authUser");
                setAuthUser(null);
                navigate('/login');
            } else {
                console.log(message);
                toast.error(`Failed to get the application(id: ${id})`);
            }
        } finally {
            setLoadingGAI(false);
        }
    }

    return {loadingGAI, getApplicationById};
}

export default useGetApplicationsById;