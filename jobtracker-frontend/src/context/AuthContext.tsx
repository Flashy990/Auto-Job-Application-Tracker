import { type ReactNode, createContext, useContext, useEffect, useState } from "react"
import { useGetUser } from "~/hooks/user/useGetUser";

interface AuthContextType {
    authUser: any;
    setAuthUser: (user: any) => void;
}

export const AuthContext = createContext<AuthContextType>({
    authUser: null,
    setAuthUser: () => {},
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const user = localStorage.getItem("authUser");
    const parsedUser = user ? JSON.parse(user) : null;
    const [authUser, setAuthUser] = useState(parsedUser);

    return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
}