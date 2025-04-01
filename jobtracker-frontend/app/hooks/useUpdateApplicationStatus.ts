import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "~/libs/axios";
import type { ErrorResponse } from "./defineError";

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
            if(axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                console.error(axiosError.response?.data.error, axiosError.response?.data.message);
                toast.error(`Failed to update application(id:${id})'s status`);
            } else {
                toast.error('Unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    }

    return {loading, updateApplicationStatus};
}

export default useUpdateApplicationStatus;