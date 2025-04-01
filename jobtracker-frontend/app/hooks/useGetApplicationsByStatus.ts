import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react"
import { axiosInstance } from "~/libs/axios";
import type { ErrorResponse } from "./defineError";
import toast from "react-hot-toast";

const useGetApplicationsByStatus = () => {
    const [loading, setLoading] = useState(false);

    const getApplicationsByStatus = async (status: string) => {
        setLoading(true);

        try{
            const res = await axiosInstance.get(`/applications/status/${status}`);

            return res.data;
        } catch(error) {
            if(axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;

                console.error(axiosError.response?.data.error, axiosError.response?.data.message);
                toast.error(`Failed to get applications with status '${status}'`);
            } else {
                toast.error('Unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    }

    return {loading, getApplicationsByStatus};

}

export default useGetApplicationsByStatus;