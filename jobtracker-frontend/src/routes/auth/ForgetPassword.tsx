import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [time, setTime] = useState(60);
    const [receivingCode, setReceivingCode] = useState(false);
    const [sendTimes, setSendTimes] = useState(0);
    const [verified, setVerified] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const validatePassword =  {
        length: password.length >= 6,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special:/[!@#$%^&*? ]/.test(password),
    };

    const handleGetCode = (e: FormEvent) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!email) {
            toast.error('Please enter your email');
            return;
        }
        if(!emailRegex.test(email)) {
            toast.error('Invalid email');
            return;
        }
        if(sendTimes >= 3) {
            toast.error('You have reached the maximum number of attempts');
            return;
        }
        setReceivingCode(true);
        setSendTimes(prev => prev + 1);
        const interval = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setReceivingCode(false);
                    return 60;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleVerify = (e: FormEvent) => {
        e.preventDefault();
        if(!email || !code) {
            toast.error('Please enter your email and code');
            return;
        }
        // add code verification logic here
        setVerified(true);
    }


    const handleChange = (e: FormEvent) => {

    };
    
    return <div className="flex flex-col items-center mt-[20vh] gap-3">
            <h1>Change your password</h1>
            <form className="flex flex-col gap-3 items-center">
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-2 rounded-[10px] pl-2 w-65"/>
                <div className="flex flex-row gap-2">
                    <input type="text" placeholder="Enter code" value={code} onChange={(e) => setCode(e.target.value)} className="border-2 pl-2 rounded-[10px] w-37"/>
                    <button className={`border-2 rounded-[5px] w-26 text-[14px] ${receivingCode? 'text-gray-800/50 border-gray-800 cursor-not-allowed' : 'cursor-pointer'}`} disabled={receivingCode} onClick={(e) => handleGetCode(e)}>{sendTimes === 0 ? 'Get code' : 'Resend'}{receivingCode ? `(${time}s)` : ''}</button>
                </div>
                {!verified && <button onClick={(e) => handleVerify(e)} className="border-2 rounded-[10px] w-fit px-2">Verify</button>}
                {verified && <div className="flex flex-col gap-3 items-center">
                    <input type="password" name="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} className="flex items-center border-2 px-2 w-65 rounded-[10px]"/>
                    <input type="password" name='confirmPassword' placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="flex border-2 px-2 w-65 rounded-[10px]"/>
                </div>}
                {password && <div>
                    <div>{validatePassword.length ? '✔️' : '❌'} at least 6 characters</div>
                    <div>{validatePassword.upper ? '✔️' : '❌'} one uppercase letter</div>
                    <div>{validatePassword.lower ? '✔️' : '❌'} one lowercase letter</div>
                    <div>{validatePassword.number ? '✔️' : '❌'} one number</div>
                    <div>{validatePassword.special ? '✔️' : '❌'} one special characeter(!@#$%^&*? )</div>
                </div>}
                {password && confirmPassword && <div className={`self-start ${password === confirmPassword ? '' : 'text-red-500'}`}>{password === confirmPassword ? '√ Passwords match' : 'x Passwords do not match'}</div>}
                {verified && <button type="submit" className="border-2 rounded-[10px] px-2">Change</button>}
            </form>
    </div>
}