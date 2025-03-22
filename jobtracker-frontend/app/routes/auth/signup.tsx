import googleLogo from "../../../public/images/Google_Icons.webp";
import linkedinLogo from "../../../public/images/circle-linkedin.webp";

export default function Signup() {

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
            <form action="" className="flex flex-col items-center gap-5">
                <input type="text" placeholder="Email" className="border-2 h-8 placeholder:pl-2"/>
                <button type="submit" className="bg-[#FFC457] text-gray-900 w-fit px-4 py-1 rounded-2xl">Get Started</button>
            </form>
            <p>Already a memeber? <u>Sign in</u></p>
        </div>
    );
}