import axios, { AxiosError } from "axios";


export const handleApiError = (error : unknown) => {
    if(axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        
        return {
            message: axiosError.message,
            details: axiosError.status
        }
    }

    return {
        message: 'Unknown error',
        details: String(error)
    }
};
