import { useState, type FormEvent } from "react";
import googleLogo from "/images/Google_Icons.webp";
import linkedinLogo from "/images/circle-linkedin.webp";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setEmail, type EmailState } from "~/store/signupEmailSlice";

export default function Signup() {
    const [semail, setSemail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validEmail = validateEmail(semail);
        if(!validEmail) {
            toast.error('Invalid email');
        } else {
            dispatch(setEmail(semail));
            navigate('/signup/password');
        }
    }

    return (
        <div className="flex flex-col items-center gap-5 justify-center mt-[20vh]">
            <h1 className="text-3xl">Do you want to manage your applications more efficiently?</h1>
            <div className="flex flex-row items-center px-7 gap-5 bg-[#35BEFD] rounded-3xl">
                <img className="h-8 bg-white rounded-4xl" src={googleLogo} alt="google-logo" />
                <p className="text-[23px] text-gray-900">Continue with Google</p>
            </div>
            <div className="flex flex-row items-center pl-7 pr-4 gap-5 bg-[#028BCA] rounded-3xl">
                <img className="h-8" src={linkedinLogo} alt="LinkedIn-logo" />
                <p className="text-[23px] text-gray-900">Continue with LinkedIn</p>
            </div>
            <p>or sign up with your email</p>
            <form className="flex flex-col items-center gap-5" onSubmit={handleSumbit}>
                <input type="text" placeholder="Email" value={semail} onChange={(e) => setSemail(e.target.value)} className="border-2 h-8 pl-2 rounded-[5px]"/>
                <button type="submit" className="bg-[#FFC457] text-gray-900 w-fit px-4 py-1 rounded-2xl cursor-pointer">Get Started</button>
            </form>
            <p>Already a memeber? <u className="cursor-pointer" onClick={() => navigate('/login')}>Sign in</u></p>
        </div>
    );
}