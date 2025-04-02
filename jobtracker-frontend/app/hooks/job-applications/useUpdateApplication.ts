import { useState } from "react"
import { axiosInstance } from "~/libs/axios";
import type { JobApplication } from "./useCreateApplication";
import toast from "react-hot-toast";
import { handleApiError, type ErrorResponse } from "../handleError";

const useUpdateApplication = () => {
    const [loading, setLoading] = useState(false);

    const updateApplication = async (id: number, jobApplication: JobApplication) => {
        setLoading(true);

        try{
            const res = await axiosInstance.put(`/applications/${id}`, jobApplication, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            if(res.status === 200) {
                toast.success(`Update application(id: ${id}) successfully`);
            }

        } catch(error) {
            const {statusCode, message, details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(statusCode, details);
                toast.error('Unexpectd error occurred');
            } else {
                console.log(statusCode, message, details);
                toast.error(`Failed to update your application(id: ${id})`);
            }
        } finally {
            setLoading(false);
        }
    }

    return {loading, updateApplication};
}

export default useUpdateApplication;