import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "~/libs/axios";
import { handleApiError } from "../handleError";
import { useAuth } from "~/context/AuthContext";
import { useNavigate } from "react-router-dom";

const useDeleteApplication  = () => {
    const [loadingDA, setLoadingDA] = useState(false);
    const { authUser, setAuthUser } = useAuth();
    const navigate = useNavigate();

    const deleteApplication = async (id: number) => {
        setLoadingDA(true);

        try {
            const res = await axiosInstance.delete(`/applications/${id}`, {
                headers: {
                    "Authorization": `Bearer ${authUser?.token}`
                }
            });

            if(res.status === 204) {
                toast.success(`Delete your job application(id: ${id}) successfully.`);  
            }
            return true;
        } catch(error){
            const {message, details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(details);
                toast.error('Unexpectd error occurred');
            } else if(details == 401) {
                toast.error('Unauthorized. Please login again.');
                localStorage.removeItem('authUser');
                setAuthUser(null);
                navigate('/login');
            } else {
                console.log(message);
                toast.error(`Failed to delete your job application(id: ${id})`);
            }
            return false;
        } finally {
            setLoadingDA(false);
        }
    }

    return {loadingDA, deleteApplication};
};

export default useDeleteApplication;