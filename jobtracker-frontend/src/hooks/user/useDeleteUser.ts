import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";
import { axiosInstance } from "~/libs/axios";
import { handleApiError } from "../handleError";
import toast from "react-hot-toast";

export const useDeleteUser = () => {
    const [loadingDU, setLoadingDU] = useState(false);
    const {authUser, setAuthUser} = useAuth();
    const navigate = useNavigate();

    const deleteUser = async () => {
        setLoadingDU(true);

        try {
            const res = await axiosInstance.delete('/user/profile', {
                headers: {
                    'Authorization': `Bearer ${authUser?.token}`
                }
            })

            if(res.status === 204) {
                toast.error('Delete your account successfully');
                localStorage.removeItem('authUser');
                setAuthUser(null);
                navigate('/');
            }

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
                toast.error('Failed to delete your account');
            }
        } finally {
            setLoadingDU(false);
        }
    }

    return {deleteUser, loadingDU};
}