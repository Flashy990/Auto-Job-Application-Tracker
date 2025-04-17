import { useState } from "react";

export default function Privacy() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validatePassword =  {
        length: password.length >= 6,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special:/[!@#$%^&*? ]/.test(password),
    };

    const handleSubmit = () => {
        
    }

    return <div className="flex flex-row gap-4 mt-3">
        <form className="flex flex-col gap-3">
            <label>Change your password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" className="border-2 rounded-[10px] pl-2"/>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="border-2 rounded-[10px] pl-2" />
            <button type="submit" className="self-start border-2 rounded-[10px] px-2">Change</button>
        </form>
        <div className="flex flex-col gap-2">
            {password && <div>
                        <div>{validatePassword.length ? '✔️' : '❌'} at least 6 characters</div>
                        <div>{validatePassword.upper ? '✔️' : '❌'} one uppercase letter</div>
                        <div>{validatePassword.lower ? '✔️' : '❌'} one lowercase letter</div>
                        <div>{validatePassword.number ? '✔️' : '❌'} one number</div>
                        <div>{validatePassword.special ? '✔️' : '❌'} one special characeter(!@#$%^&*? )</div>
                    </div>}
            {password && confirmPassword && <div className={`self-start ${password === confirmPassword ? '' : 'text-red-500'}`}>{password === confirmPassword ? '√ Passwords match' : 'x Passwords do not match'}</div>}
        </div>
        
    </div>
}