import { type ReactNode, createContext, useContext, useState } from "react"

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
    const [authUser, setAuthUser] = useState(localStorage.getItem("authUser") || null);

    return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
}