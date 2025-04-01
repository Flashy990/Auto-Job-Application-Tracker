import axios, { AxiosError } from "axios";
import { useState } from "react"
import { axiosInstance } from "~/libs/axios";
import type { ErrorResponse } from "./defineError";
import toast from "react-hot-toast";

const useGetApplicationsById = () => {
    const [loading, setLoading] = useState(false);

    const getApplicationsById = async (id: number) => {
        setLoading(true);

        try{
            const res = await axiosInstance.get(`/applications/${id}`);
            
            return res.data;
        } catch(error) {
            if(axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                console.error(axiosError.response?.data.error, axiosError.response?.data.message);
                toast.error(`Failed to get application(id: ${id})`);
            } else {
                toast.error('Unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    }

    return {loading, getApplicationsById};
}

export default useGetApplicationsById;