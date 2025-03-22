import { Outlet } from "react-router";
import maleAvatar from "/images/male-avatar.png";


export default function DashboardLayout() {
    return (
        <div>
            <header className="flex flex-row items-center mt-3 border-b-1 pb-3">
            <h1 style={{WebkitTextStroke: `1px black`, textShadow:`2px 2px 2px gray`}} className="font-akaya-kanadaka text-6xl ml-4 text-[#BAD8C6]">JAT</h1>
            <h1 className="text-5xl font-allerta-stencil flex-grow text-center self-center pr-[125.64px]">Job Application Tracker</h1>
            <div className="mr-4 flex flex-col items-center">
                <img src={maleAvatar} alt="avatar" className="h-9 min-w-9"/>
                <h1 className="font-akaya-kanadaka text-[14px]">John Doe</h1>
            </div>
            </header>
            <Outlet />
        </div>
        
    );
};