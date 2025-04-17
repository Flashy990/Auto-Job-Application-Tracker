import { useState } from "react"
import { axiosInstance } from "~/libs/axios";
import type { JobApplication } from "./useCreateApplication";
import toast from "react-hot-toast";
import { handleApiError, type ErrorResponse } from "../handleError";

const useUpdateApplication = () => {
    const [loadingUA, setLoadingUA] = useState(false);

    const updateApplication = async (id: number, jobApplication: JobApplication) => {
        setLoadingUA(true);

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
            const {message, details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(details);
                toast.error('Unexpectd error occurred');
            } else {
                console.log(details);
                toast.error(`Failed to update your application(id: ${id})`);
            }
        } finally {
            setLoadingUA(false);
        }
    }

    return {loadingUA, updateApplication};
}

export default useUpdateApplication;