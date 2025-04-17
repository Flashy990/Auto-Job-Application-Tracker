import {  useState } from "react"
import { axiosInstance } from "~/libs/axios";
import { handleApiError, type ErrorResponse } from "../handleError";
import toast from "react-hot-toast";

const useGetApplicationsByStatus = () => {
    const [loadingGAS, setLoadingGAS] = useState(false);

    const getApplicationsByStatus = async (status: string) => {
        setLoadingGAS(true);

        try{
            const res = await axiosInstance.get(`/applications/status/${status}`);

            return res.data;
        } catch(error) {
            const {message, details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(details);
                toast.error('Unexpectd error occurred');
            } else {
                console.log(details);
                toast.error(`Failed to get your applications with status ${status}`);
            }
        } finally {
            setLoadingGAS(false);
        }
    }

    return {loadingGAS, getApplicationsByStatus};

}

export default useGetApplicationsByStatus;