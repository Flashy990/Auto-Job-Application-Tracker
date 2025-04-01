import {  useState } from "react"
import { axiosInstance } from "~/libs/axios";
import { handleApiError, type ErrorResponse } from "./handleError";
import toast from "react-hot-toast";

const useGetApplicationsByStatus = () => {
    const [loading, setLoading] = useState(false);

    const getApplicationsByStatus = async (status: string) => {
        setLoading(true);

        try{
            const res = await axiosInstance.get(`/applications/status/${status}`);

            return res.data;
        } catch(error) {
            const {statusCode, message, details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(statusCode, details);
                toast.error('Unexpectd error occurred');
            } else {
                console.log(statusCode, message, details);
                toast.error(`Failed to get your applications with status ${status}`);
            }
        } finally {
            setLoading(false);
        }
    }

    return {loading, getApplicationsByStatus};

}

export default useGetApplicationsByStatus;