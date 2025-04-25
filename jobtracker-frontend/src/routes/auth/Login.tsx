import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import useLogin from "@hooks/auth/useLogin";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const {login, loading} = useLogin();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loggedIn =  await login(email, password);
        if(loggedIn) navigate('/dashboard/applications');
    }

    return (
        <div className="flex flex-col items-center gap-6 mt-[19vh]">
            <h1 className="font-allerta-stencil text-[30px]">Login</h1>
            <form className="flex flex-col items-center gap-3" onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-2 h-8 px-2 rounded-[5px]"/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 h-8 px-2 rounded-[5px]"/>
                <button type="submit" className="bg-[#FFC457] w-fit py-1 px-5 text-gray-900 rounded-2xl cursor-pointer" disabled={loading}>
                    {loading?
                    <svg className="size-6 mx-[14px] animate-spin self-center" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                     : 'Log in'}
                </button>
            </form>
            <p>Not a member yet? <u className="cursor-pointer" onClick={() => navigate('/signup')}>Create an account</u></p>
            <p className="cursor-pointer" onClick={() => navigate("/forget-password")}><u>Forget your password?</u></p>
        </div>
    );
};