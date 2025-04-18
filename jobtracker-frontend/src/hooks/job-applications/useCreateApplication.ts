import { useState } from "react"
import toast from "react-hot-toast";
import { axiosInstance } from "~/libs/axios";
import { handleApiError } from "../handleError";
import { useAuth } from "~/context/AuthContext";
import { useNavigate } from "react-router-dom";

export interface JobApplication {
    companyName: string;
    position: string;
    jobDescription: string;
    applicationUrl: string;
    status: string;
    applicationDate: string; // ISO format YYYY-MM-DD
    location: string;
    salary: number;
    contactName: string;
    contactEmail: string;
}

const useCreateApplication = () => {
    const [loadingCA, setLoadingCA] = useState(false);
    const { authUser, setAuthUser } = useAuth();
    const navigate = useNavigate();
    
    const createApplication = async (jobApplication: JobApplication) => {
        setLoadingCA(true);
        
        try {
            const res = await axiosInstance.post('/applications', jobApplication, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${authUser?.accessToken}`,
                }
            });

            if(res.status === 201) {
                toast.success('Successfully created the new job application.');
            }
        } catch(error) {
            const { message, details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(details);
                toast.error('Unexpectd error occurred');
            } else if(details === 401){
                toast.error('Unauthorized. Please login again.');
                localStorage.removeItem('authUser');
                setAuthUser(null);
                navigate('/login');
            } else {
                console.log(message);
                toast.error('Failed to create the new application');
            }
        } finally {
            setLoadingCA(false);
        }

    }

    return {loadingCA, createApplication};
}

export default useCreateApplication;