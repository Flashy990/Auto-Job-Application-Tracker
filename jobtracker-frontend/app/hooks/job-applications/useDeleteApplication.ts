import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "~/libs/axios";
import { handleApiError } from "../handleError";

const useDeleteApplication  = () => {
    const [loadingDA, setLoadingDA] = useState(false);

    const deleteApplication = async (id: number) => {
        setLoadingDA(true);

        try {
            const res = await axiosInstance.delete(`/applications/${id}`);

            if(res.status === 204) {
                toast.success(`Delete your job application(id: ${id}) successfully.`);
            }
        } catch(error){
            const {message , details} = handleApiError(error);
            if(message === 'Unknown error') {
                console.log(details);
                toast.error('Unexpectd error occurred');
            } else {
                console.log(details);
                toast.error(`Failed to delete your job application(id: ${id})`);
            }
        } finally {
            setLoadingDA(false);
        }
    }

    return {loadingDA, deleteApplication};
};

export default useDeleteApplication;