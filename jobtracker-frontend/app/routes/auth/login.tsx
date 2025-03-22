import googleLogo from "../../../public/images/Google_Icons.webp";
import linkedinLogo from "../../../public/images/circle-linkedin.webp";

export default function Login() {

    return (
        <div className="flex flex-col items-center gap-6 mt-[15vh]">
            <h1 className="font-allerta-stencil text-[30px]">Login</h1>
            <form action="" className="flex flex-col items-center gap-3">
                <input type="text" placeholder="Email" className="border-2 h-8 placeholder:pl-2"/>
                <input type="text" placeholder="Password" className="border-2 h-8 placeholder:pl-2"/>
                <button type="submit" className="bg-[#FFC457] w-fit py-1 px-4 text-gray-900 rounded-2xl">Sign in</button>
            </form>
            <p>or</p>
            <div className="flex flex-row items-center px-7 gap-5 bg-[#35BEFD] rounded-3xl">
                <img className="h-8 bg-white rounded-4xl" src={googleLogo} alt="google-logo" />
                <p className="text-[23px] text-gray-900">Continue with Google</p>
            </div>
            <div className="flex flex-row items-center pl-7 pr-4 gap-5 bg-[#028BCA] rounded-3xl">
                <img className="h-8" src={linkedinLogo} alt="LinkedIn-logo" />
                <p className="text-[23px] text-gray-900">Continue with LinkedIn</p>
            </div>
            <p>Not a member yet? <u>Create an account</u></p>
        </div>
    );
};