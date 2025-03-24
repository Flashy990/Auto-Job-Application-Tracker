import { createContext, useContext, useState, type ReactNode } from "react"

interface EmailContextType {
    signupEmail: string;
    setSignupEmail: (email: string) => void;
}


export const EmailContext = createContext<EmailContextType>({
    signupEmail: '',
    setSignupEmail: () => {},
});

export const useEmail = () => {
    return useContext(EmailContext);
}

export const EmailProvider = ({children} : {children: ReactNode}) => {
    const [signupEmail, setSignupEmail] = useState('');

    return <EmailContext.Provider value={{signupEmail, setSignupEmail}}>{children}</EmailContext.Provider>
}