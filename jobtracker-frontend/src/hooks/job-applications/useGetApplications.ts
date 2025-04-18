import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useAuth } from "~/context/AuthContext";
import { axiosInstance } from "~/libs/axios";
import { handleApiError } from "../handleError";
import { useNavigate } from "react-router-dom";

const useGetApplications = () => {
    const [loadingGA, setLoadingGA] = useState(false);
    const [applications, setApplications] = useState([]);
    const { authUser, setAuthUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const getApplications = async () => {
            setLoadingGA(true);
    
            try {
                const res = await axiosInstance.get("/applications", {
                    headers: {
                        "Authorization": `Bearer ${authUser?.token}`
                    }
                });
    
                setApplications(res.data);
            } catch(error) {
                const { message, details } = handleApiError(error);
                if(message === 'Unknown error') {
                    console.log(details);
                    toast.error('Unexpectd error occurred');
                } else if(details === 401) {
                    toast.error("Session expired, please login again");
                    localStorage.removeItem("authUser");
                    setAuthUser(null);
                    navigate('/login');
                } else {
                    console.log(message);
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