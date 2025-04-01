import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useAuth } from "~/context/AuthContext";
import { axiosInstance } from "~/libs/axios";
import type { ErrorResponse } from "./defineError";

const useGetApplications = () => {
    const [loading, setLoading] = useState(false);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const getApplications = async () => {
            setLoading(true);
    
            try {
                const res = await axiosInstance.get("/applications");
    
                setApplications(res.data);
            } catch(error) {
                if(axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<ErrorResponse>;
                    if(axiosError.response?.data) {
                        console.error(axiosError.response.data.error, axiosError.response.data.message);
                        toast.error('Failed to get applications');
                    }
                } else {
                    toast.error('Unexpected error happened');
                }
            } finally {
                setLoading(false);
            }
        }

        getApplications();
    }, []);
    

    return {loading, applications};
}


export default useGetApplications;