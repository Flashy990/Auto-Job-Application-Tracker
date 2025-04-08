import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useAuth } from "~/context/AuthContext";
import { axiosInstance } from "~/libs/axios";
import { handleApiError } from "../handleError";

const useGetApplications = () => {
    const [loadingGA, setLoadingGA] = useState(false);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const getApplications = async () => {
            setLoadingGA(true);
    
            try {
                const res = await axiosInstance.get("/applications");
    
                setApplications(res.data);
            } catch(error) {
                const { message, details } = handleApiError(error);
                if(message === 'Unknown error') {
                    console.log(details);
                    toast.error('Unexpectd error occurred');
                } else {
                    console.log(details);
                    toast.error('Failed to get your applications');
                }
            } finally {
                setLoadingGA(false);
            }
        }

        getApplications();
    }, []);
    

    return {loadingGA, applications};
}


export default useGetApplications;