import { useState } from "react"
import { axiosInstance } from "~/libs/axios";
import type { JobApplication } from "./useCreateApplication";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import type { ErrorResponse } from "./defineError";

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
            if(axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                console.error(axiosError.response?.data.error, axiosError.response?.data.message);
                toast.error(`Failed to update application(id: ${id})`);
            } else {
                toast.error("Unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    }

    return {loading, updateApplication};
}

export default useUpdateApplication;