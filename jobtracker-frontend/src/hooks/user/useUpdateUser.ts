import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";
import { axiosInstance } from "~/libs/axios";
import { handleApiError } from "../handleError";
import toast from "react-hot-toast";

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    password: string;
    avatarUrl: string;
    gender: string;
    dob: string;
    education: string;
    industry: string;
}


export const useUpdateUser = () => {
    const [loadingUU, setLoadingUU] = useState(false);
    const {authUser, setAuthUser} = useAuth();

    const navigate = useNavigate();

    const updateUser = async (user: User) => {
        setLoadingUU(true);

        try {
            const res = await axiosInstance.put('/user/profile', user,{
                headers: {
                    'Authorization': `Bearer ${authUser?.token}`,
                    'Content-Type': 'application/json'
                }
            })

            
            toast.success('Updated successfully');
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
                toast.error('Failed to update your user information');
            }
        } finally {
            setLoadingUU(false);
        }
    }

    return {updateUser, loadingUU};
}