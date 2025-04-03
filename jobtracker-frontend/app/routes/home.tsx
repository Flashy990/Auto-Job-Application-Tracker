import { Link } from "react-router";
import type { Route } from "./+types/home";
import { useAuth } from "~/context/AuthContext";
import maleAvatar from '/images/male-avatar.png';
import FadeInSection from "~/components/FadeInSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Auto Job Application Tracker App" },
    { name: "description", content: "This app is for tracking job applications' information" },
  ];
}

const blockcolors = ['bg-gray-400', 'bg-emerald-400', 'bg-yellow-400','bg-blue-400', 'bg-sky-400', 'bg-cyan-400', 'bg-orange-400'];

export default function Home() {
  const {authUser} = useAuth();



  return (
  <div>
    <header className="flex flex-row items-center pt-3 border-b-1 pb-3">
      <h1 style={{WebkitTextStroke: `1px black`, textShadow:`2px 2px 2px gray`}} className="font-akaya-kanadaka text-3xl w-[15vw] md:text-5xl xl:text-6xl pl-4 text-[#BAD8C6]">JAT</h1>
      {/* unsolved: header layout design consistency */}
      <h1 className={`text-2xl w-[70vw] lg:text-3xl xl:text-5xl font-allerta-stencil text-center self-center`}>Job Application Tracker</h1>
      {authUser ?   
        ( <div className="w-[15vw] md:pl-[6vw] flex flex-col items-center self-end cursor-pointer">
            <img src={maleAvatar} alt="avatar" className="h-7 min-w-7 md:h-9 md:min-w-9"/>
            <h1 className="font-akaya-kanadaka text-[11px] lg:text-[14px]">John Doe</h1>
          </div>) :
        (<div className="flex flex-col w-[15vw] px-[4vw] justify-center lg:px-[0.5vw] lg:flex-row gap-1 lg:gap-2 self-end text-[9px] lg:text-[12px] xl:text-[16px]">
            <Link to={'/signup'} className="border-2 px-2 w-max py-1 rounded-xl hover:text-gray-100 hover:bg-gray-900 hover:border-gray-900">Sign up</Link>
            <Link to={'/login'} className=" border-2 px-2 w-max py-1 rounded-xl hover:text-gray-100 hover:bg-gray-900 hover:border-gray-900">Log in</Link>
          </div>) }
    </header>
    <main className="mt-7 flex flex-col gap-10">
      {blockcolors.map((color, index) => {
        return <FadeInSection key={index}><div className={`flex mx-[100px] h-[200px] items-center justify-center ${color}`}>block {index + 1}</div></FadeInSection>
      })}
    </main>
  </div>);
}
