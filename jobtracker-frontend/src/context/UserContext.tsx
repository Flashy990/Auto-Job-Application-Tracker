import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "~/hooks/user/useUpdateUser";
import { useAuth } from "./AuthContext";
import { useGetUser } from "~/hooks/user/useGetUser";

interface UserContextType {
    user: User;
    setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType>({
    user: {} as User,
    setUser: () => {}
});

export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({children} : {children: ReactNode}) => {
    const [user, setUser] = useState<User>({} as User);
    const {authUser, setAuthUser} = useAuth();
    const {getUser} = useGetUser();

    useEffect(() => {
        if(authUser) {
            getUser().then((user) => {
                setUser(user);
                const newAuthUser = {...authUser, avatarUrl: user.avatarUrl};
                localStorage.setItem('authUser', JSON.stringify(newAuthUser));
            })
        }
    },[authUser]);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}