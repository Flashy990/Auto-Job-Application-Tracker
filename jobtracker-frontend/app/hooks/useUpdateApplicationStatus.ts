import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "~/libs/axios";
import { handleApiError, type ErrorResponse } from "./handleError";

export interface StatusMap {
    [key: string]: string;
}

const useUpdateApplicationStatus = () => {
    const [loading, setLoading] = useState(false);

    const updateApplicationStatus = async (id: number, status: StatusMap) => {

        setLoading(true);

        try{
            const res = await axiosInstance.patch(`/${id}/status`, status, {
                headers: {
                    "Content-Type": 'application/json',
                }
            })

            if(res.status === 200) {
                toast.success(`Update application with id ${id} successfully`);
            }

        } catch(error) {
            const {statusCode, message, details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(statusCode, details);
                toast.error('Unexpectd error occurred');
            } else {
                console.log(statusCode, message, details);
                toast.error(`Failed to update your application(id: ${id})'s status`);
            }
        } finally {
            setLoading(false);
        }
    }

    return {loading, updateApplicationStatus};
}

export default useUpdateApplicationStatus;