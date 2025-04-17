import { Link } from "react-router";
import type { Route } from "./+types/home";
import { useAuth } from "~/context/AuthContext";
import maleAvatar from '/images/male-avatar.png';
import documentPic from '/images/documents-doodle.png';
import FadeInSection from "~/components/FadeInSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Auto Job Application Tracker App" },
    { name: "description", content: "This app is for tracking job applications' information" },
  ];
}

export default function Home() {
  const {authUser} = useAuth();



  return (
  <div>
    <header className="flex flex-row items-center py-1 border-b-1 h-[65px] sm:h-[85px] justify-between">
      <h1 style={{WebkitTextStroke: `1px black`, textShadow:`2px 2px 2px gray`}} className="font-akaya-kanadaka text-[45px] sm:text-[42px] md:text-[52px] lg:text-6xl pl-4 text-[#BAD8C6]">JAT</h1>
      <h1 className={`hidden sm:block sm:text-[32px] md:text-[42px] lg:text-5xl font-allerta-stencil text-center self-center`}>Job Application Tracker</h1>
      {authUser ?
        ( <div className="flex flex-col items-center self-end cursor-pointer md:pl-19 w-[72px] sm:w-[86.5px] md:w-[161px] lg:w-[174.5px]">
            <img src={maleAvatar} alt="avatar" className="h-7 min-w-7 sm:h-9 sm:min-w-9"/>
            <h1 className="font-akaya-kanadaka text-[12px] sm:text-[14px]">John Doe</h1>
          </div>) :
        (<div className="flex justify-center px-2 flex-row sm:flex-col md:flex-row gap-2 sm:gap-1 md:gap-3 self-end text-[14px] sm:text-[14px] lg:text-[16px]">
            <Link to={'/signup'} className="border-2 px-2 w-max py-1 rounded-xl hover:text-gray-100 hover:bg-gray-900 hover:border-gray-900">Sign up</Link>
            <Link to={'/login'} className=" border-2 px-2 w-max py-1 rounded-xl hover:text-gray-100 hover:bg-gray-900 hover:border-gray-900">Log in</Link>
          </div>) }
    </header>
    <main className="mt-7 flex flex-col gap-10 mx-10 md:mx-25">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="flex flex-col z-10">
          <h1 className="text-[30px] md:text-[38px]">Keep</h1>
          <h1 className="text-[30px] md:text-[38px]">Your Job Applications</h1>
          <h1 className="text-[30px] md:text-[38px]">on Track</h1>
          <h1 className="text-[16px] md:text-[20px]">Efficient, Convenient, and Organized</h1>
        </div>
        <img src={documentPic} alt="document-doodle" className="md:self-end aspect-[calc(547/307)] h-auto w-[50%] " draggable={false}/>
      </div>
      <div className="flex flex-col gap-10 text-[12px] md:text-[16px]">
          <FadeInSection>
            <div className="border-2 rounded-2xl bg-gray-200">
              <h1>Record important details of your job applications</h1>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="border-2 rounded-2xl bg-gray-200">
              <h1>Update the status of every job application</h1>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="border-2 rounded-2xl bg-gray-200">
              <h1>Reflect on your interview performance by adding notes</h1>
            </div>
          </FadeInSection>
      </div>
      
    </main>
  </div>);
}
