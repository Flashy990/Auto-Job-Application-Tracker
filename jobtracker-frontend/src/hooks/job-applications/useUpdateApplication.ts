import { useState } from "react"
import { axiosInstance } from "~/libs/axios";
import type { JobApplication } from "./useCreateApplication";
import toast from "react-hot-toast";
import { handleApiError } from "../handleError";
import { useAuth } from "~/context/AuthContext";
import { useNavigate } from "react-router-dom";

const useUpdateApplication = () => {
    const [loadingUA, setLoadingUA] = useState(false);
    const {authUser, setAuthUser} = useAuth();
    const navigate = useNavigate();

    const updateApplication = async (id: number, jobApplication: JobApplication) => {
        setLoadingUA(true);

        try{
            const res = await axiosInstance.put(`/applications/${id}`, jobApplication, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${authUser?.token}`
                }
            });

            if(res.status === 200) {
                toast.success(`Update application(id: ${id}) successfully`);
            }

        } catch(error) {
            const {message, details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(details);
                toast.error('Unexpectd error occurred');
            } else if (details === 401) {
                toast.error('Session expired, please login again');
                localStorage.removeItem('authUser');
                setAuthUser(null);
                navigate('/login');
            } else {
                console.log(message);
                toast.error(`Failed to update your application(id: ${id})`);
            }
        } finally {
            setLoadingUA(false);
        }
    }

    return {loadingUA, updateApplication};
}

export default useUpdateApplication;