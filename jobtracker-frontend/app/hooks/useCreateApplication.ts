import axios, { AxiosError } from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { axiosInstance } from "~/libs/axios";
import type { ErrorResponse } from "./defineError";

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
    const [loading, setLoading] = useState(false);
    
    const createApplication = async (jobApplication: JobApplication) => {
        setLoading(true);
        
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
            if(axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                console.error(axiosError.response?.data.error, axiosError.response?.data.message);
                toast.error('Failed to create the new job application');
            } else {
                toast.error('Unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }

    }

    return {loading, createApplication};
}

export default useCreateApplication;