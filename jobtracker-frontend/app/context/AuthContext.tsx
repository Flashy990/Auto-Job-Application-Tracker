import { type ReactNode, createContext, useContext, useEffect, useState } from "react"
import { axiosInstance } from "~/libs/axios";

interface AuthContextType {
    authUser: any;
    setAuthUser: (user: any) => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    authUser: null,
    setAuthUser: () => {},
    loading: false,
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkLoginStatus();
    },[]);

    const checkLoginStatus = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/auth/unknown'); // url unknown now

            setAuthUser(res.data.userId ?? null);
        } catch (error) {
            setAuthUser(null);
        } finally {
            setLoading(false);
        }
    };

    return <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>{children}</AuthContext.Provider>
}