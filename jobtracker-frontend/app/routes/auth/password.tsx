import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useEmail } from "~/context/SignupEmailContext";
import { useSignup } from "~/hooks/useSignup";

export default function Password() {
    const {signupEmail} = useEmail();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {loading, signup} = useSignup();
    const navigate = useNavigate();

    useEffect(() => {
        if(!signupEmail) {
            navigate('/signup');
        }
    });

    const validatePassword =  {
        length: password.length >= 6,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special:/[!@#$%^&*? ]/.test(password),
    };
    



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const signedup = await signup(signupEmail, password, confirmPassword);
        if(signedup) navigate('/signup/user-info'); // create the file for this.
    };


    return (
        <div className="flex flex-col items-center gap-5 mt-[15vh]">
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <div className="text-3xl">
                    Create your account
                </div>
                <input type="text" name="email" value={signupEmail} className="flex items-center border-2 h-8 px-2 w-70 rounded-[5px]" disabled/>
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="flex items-center border-2 h-8 px-2 w-70 rounded-[5px]"/>
                <input type="password" name='confirmPassword' placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="flex border-2 h-8 px-2 w-70 rounded-[5px]"/>
                {password && <div>
                    <div>{validatePassword.length ? '✔️' : '❌'} at least 6 characters</div>
                    <div>{validatePassword.upper ? '✔️' : '❌'} one uppercase letter</div>
                    <div>{validatePassword.lower ? '✔️' : '❌'} one lowercase letter</div>
                    <div>{validatePassword.number ? '✔️' : '❌'} one number</div>
                    <div>{validatePassword.special ? '✔️' : '❌'} one special characeter(!@#$%^&*? )</div>
                </div>}
                {password && confirmPassword && <div className={`self-start ${password === confirmPassword ? '' : 'text-red-500'}`}>{password === confirmPassword ? '√ Passwords match' : 'x Passwords do not match'}</div>}
                
                <button type="submit" className="bg-[#FFC457] w-fit px-8 py-1 rounded-2xl cursor-pointer" disabled={loading}>
                    {loading?
                    <svg className="size-6 mx-[23.5px] animate-spin self-center" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                     : 'Continue'}
                </button>
            </form>
            <button className="text-[13px] cursor-pointer" onClick={() => navigate('/signup')}>Go back</button>
        </div>
    );
}