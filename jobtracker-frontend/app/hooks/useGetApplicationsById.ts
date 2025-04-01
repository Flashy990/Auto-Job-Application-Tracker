import { useState } from "react"
import { axiosInstance } from "~/libs/axios";
import { handleApiError, type ErrorResponse } from "./handleError";
import toast from "react-hot-toast";

const useGetApplicationsById = () => {
    const [loading, setLoading] = useState(false);

    const getApplicationsById = async (id: number) => {
        setLoading(true);

        try{
            const res = await axiosInstance.get(`/applications/${id}`);
            
            return res.data;
        } catch(error) {
            const {statusCode, message, details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(statusCode, details);
                toast.error('Unexpectd error occurred');
            } else {
                console.log(statusCode, message, details);
                toast.error(`Failed to get the application(id: ${id})`);
            }
        } finally {
            setLoading(false);
        }
    }

    return {loading, getApplicationsById};
}

export default useGetApplicationsById;