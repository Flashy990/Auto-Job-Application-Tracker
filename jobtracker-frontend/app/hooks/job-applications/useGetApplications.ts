import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useAuth } from "~/context/AuthContext";
import { axiosInstance } from "~/libs/axios";
import { handleApiError } from "../handleError";

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
                const {statusCode, message, details} = handleApiError(error);
                if(message === 'Unknown error') {
                    console.log(statusCode, details);
                    toast.error('Unexpectd error occurred');
                } else {
                    console.log(statusCode, message, details);
                    toast.error('Failed to get your applications');
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