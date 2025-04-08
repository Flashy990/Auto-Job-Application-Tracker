import { useState } from "react"
import toast from "react-hot-toast";
import { axiosInstance } from "~/libs/axios";
import { handleApiError, type ErrorResponse } from "../handleError";

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
    
    const createApplication = async (jobApplication: JobApplication) => {
        setLoadingCA(true);
        
        try {
            const res = await axiosInstance.post('/applications', jobApplication, {
                headers: {
                    "Content-Type": 'application/json'
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
            } else {
                console.log(details);
                toast.error('Failed to create the new application');
            }
        } finally {
            setLoadingCA(false);
        }

    }

    return {loadingCA, createApplication};
}

export default useCreateApplication;