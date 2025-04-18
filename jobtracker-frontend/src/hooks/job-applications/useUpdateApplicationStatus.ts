import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "~/libs/axios";
import { handleApiError } from "../handleError";
import { useAuth } from "~/context/AuthContext";
import { useNavigate } from "react-router-dom";

export interface StatusMap {
    [key: string]: string;
}

const useUpdateApplicationStatus = () => {
    const [loadingUAS, setLoadingUAS] = useState(false);
    const {authUser, setAuthUser} = useAuth();
    const navigate = useNavigate();

    const updateApplicationStatus = async (id: number, status: StatusMap) => {

        setLoadingUAS(true);

        try{
            const res = await axiosInstance.patch(`/${id}/status`, status, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${authUser?.token}`
                }
            })

            if(res.status === 200) {
                toast.success(`Update application(id: ${id}) successfully`);
            }

        } catch(error) {
            const { message, details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(details);
                toast.error('Unexpectd error occurred');
            } else if(details === 401) { 
                toast.error('Session expired, please login again');
                localStorage.removeItem("authUser");
                setAuthUser(null);
                navigate('/login');
            } else {
                console.log(message);
                toast.error(`Failed to update your application(id: ${id})'s status`);
            }
        } finally {
            setLoadingUAS(false);
        }
    }

    return {loadingUAS, updateApplicationStatus};
}

export default useUpdateApplicationStatus;