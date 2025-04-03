import axios, { AxiosError } from "axios";


export interface ErrorResponse {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
};

export const handleApiError = (error : unknown) => {
    if(axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;

        if(axiosError.response) {
            return {
                message: axiosError.response.data.message || 'Server error',
                details: axiosError.response.data
            }
        } else if (axiosError.request) {
            return {
                message: 'No response from server',
                details: axiosError.request
            }
        } else {
            return {
                message: "Request configuration error",
                details: axiosError.message
            }
        }
    }

    return {
        message: 'Unknown error',
        details: String(error)
    }
};
