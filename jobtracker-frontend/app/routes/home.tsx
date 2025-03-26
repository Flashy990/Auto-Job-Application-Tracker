import { Link } from "react-router";
import type { Route } from "./+types/home";
import { useAuth } from "~/context/AuthContext";
import maleAvatar from '/images/male-avatar.png';
import { useEmail } from "~/context/SignupEmailContext";
import { ToggleSwitch } from "~/components/ToggleSwitch";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Auto Job Application Tracker App" },
    { name: "description", content: "This app is for tracking job applications' information" },
  ];
}

export default function Home() {
  const {signupEmail, setSignupEmail} = useEmail();
  const {authUser} = useAuth();

  if(signupEmail) {
    setSignupEmail('');
  }

  return (
  <div>
    <header className="flex flex-row items-center mt-3 border-b-1 pb-3">
      <h1 style={{WebkitTextStroke: `1px black`, textShadow:`2px 2px 2px gray`}} className="font-akaya-kanadaka text-3xl md:text-5xl lg:text-6xl ml-4 text-[#BAD8C6]">JAT</h1>
      {/* unsolved: header layout design consistency */}
      <h1 className={`text-xl md:text-4xl lg:text-5xl font-allerta-stencil flex-grow text-center self-center ${authUser ? 'pr-[125.64px]' : ''}`}>Job Application Tracker</h1>
      {authUser ?   
        ( <div className="mr-4 flex flex-col items-center self-end">
            <img src={maleAvatar} alt="avatar" className="h-9 min-w-9"/>
            <h1 className="font-akaya-kanadaka text-[14px]">John Doe</h1>
          </div>) :
        (<div className="flex flex-col md:flex-row gap-1 md:gap-6 self-end mr-1 md:mr-4 text-[10px] md:text-[13px] lg:text-[16px]">
            <Link to={'/signup'} className="border-2 px-2 py-1 rounded-xl hover:text-gray-100 hover:bg-gray-900 hover:border-gray-900">Sign up</Link>
            <Link to={'/login'} className=" border-2 px-3 py-1 rounded-xl hover:text-gray-100 hover:bg-gray-900 hover:border-gray-900">Log in</Link>
          </div>) }
    </header>
  </div>);
}
