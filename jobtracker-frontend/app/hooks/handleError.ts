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
                statusCode: axiosError.response.status,
                message: axiosError.response.data.message || 'Server error',
                details: axiosError.response.data
            }
        } else if (axiosError.request) {
            return {
                statusCode: 0,
                message: 'No response from server',
                details: axiosError.request
            }
        } else {
            return {
                statusCode: 0,
                message: "Request configuration error",
                details: axiosError.message
            }
        }
    }

    return {
        statusCode: 0,
        message: 'Unknown error',
        details: String(error)
    }
};
