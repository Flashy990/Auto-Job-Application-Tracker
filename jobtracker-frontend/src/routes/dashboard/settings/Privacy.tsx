import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";
import { useUser } from "~/context/UserContext";
import { useDeleteUser } from "~/hooks/user/useDeleteUser";
import { User, useUpdateUser } from "~/hooks/user/useUpdateUser";

export default function Privacy() {
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {user} = useUser();
    const [userInfo, setUserInfo] = useState<User>(user);
    const { loadingUU, updateUser } = useUpdateUser();
    const { deleteUser } = useDeleteUser(); 

    useEffect(() => {
        if(!authUser) {
            navigate('/login');
        }
    },[]);

    const validatePassword =  {
        length: password.length >= 6,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special:/[!@#$%^&*? ]/.test(password),
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!validatePassword.length || !validatePassword.upper || 
            !validatePassword.lower || !validatePassword.number || 
            !validatePassword.special) {
            toast.error('Invalid Password');
        } else if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            await updateUser(userInfo);
        }
    }

    const handleDeleteAccount = async () => {
        await deleteUser();
    }

    return <div className="flex flex-col gap-3 items-center md:items-start">
    <div className="flex flex-col items-center md:items-start md:flex-row gap-4 md:mt-3 text-[14px] md:text-[16px]">
        <form className="flex flex-col gap-3 items-center md:items-start" onSubmit={handleSubmit}>
            <label>Change your password</label>
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value);setUserInfo({...userInfo, password:e.target.value})}} placeholder="Enter new password" className="border-2 rounded-[10px] pl-2"/>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="border-2 rounded-[10px] pl-2" />
            <button type="submit" className="md:self-start border-2 rounded-[10px] px-2">Change</button>
        </form>
        {password && <div className="flex flex-col gap-2">
            <div>
                <div>{validatePassword.length ? '✔️' : '❌'} at least 6 characters</div>
                <div>{validatePassword.upper ? '✔️' : '❌'} one uppercase letter</div>
                <div>{validatePassword.lower ? '✔️' : '❌'} one lowercase letter</div>
                <div>{validatePassword.number ? '✔️' : '❌'} one number</div>
                <div>{validatePassword.special ? '✔️' : '❌'} one special characeter(!@#$%^&*? )</div>
            </div>
            <div className={`self-start ${confirmPassword && password === confirmPassword ? '' : 'text-red-500'}`}>{confirmPassword && password === confirmPassword ? '√ Passwords match' : 'x Passwords do not match'}</div>
        </div>}
        
        
    </div>
    <button onClick={handleDeleteAccount} className="border-2 w-fit px-2 rounded-[5px] hover:bg-secondary cursor-pointer">Delete My Account</button>
    </div>
}