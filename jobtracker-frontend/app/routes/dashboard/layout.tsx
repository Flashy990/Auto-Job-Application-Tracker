import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import maleAvatar from "/images/male-avatar.png";
import userLogo from '/images/user.png';
import dashboardLogo from '/images/dashboard.png';
import settingLogo from '/images/setting.png';
import signoutLogo from '/images/logout.png';


const links = [
    {
        name:'Your profile',
        path:'/dashboard/profile',
        pic: userLogo,
    },
    {
        name:'Your applications',
        path:'/dashboard/applications',
        pic:dashboardLogo,
    },
    {
        name:'Settings',
        path:'/dashboard/settings/profile',
        pic:settingLogo,
    }
];


export default function DashboardLayout() {
    const [showNav, setShowNav] = useState(false);
    const [avatarClicked, setAvatarClicked] = useState(false);
    const avatarRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();

    const clickAvatar = () => {
        setShowNav(!showNav);
        setAvatarClicked(true);
    }



    useEffect(() => {
        const handleClickedOutSide = (e: globalThis.MouseEvent) => {
            if(navRef.current && 
                !navRef.current.contains(e.target as Node) && 
                avatarRef.current && 
                !avatarRef.current.contains(e.target as Node)) {
                setShowNav(false);
            }
        };


        if(showNav) {
            document.addEventListener('mousedown', handleClickedOutSide);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickedOutSide);
        }
    },[showNav]);

    return (
        <>
            <header ref={headerRef} className="flex flex-row items-center mt-3 border-b-1 pb-3">
                <h1 style={{WebkitTextStroke: `1px black`, textShadow:`2px 2px 2px gray`}} className="font-akaya-kanadaka text-3xl sm:text-5xl md:text-6xl ml-4 text-[#BAD8C6] cursor-pointer" onClick={() => navigate('/')}>JAT</h1>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-allerta-stencil flex-grow text-center self-center pr-[125.64px]">Job Application Tracker</h1>
                <div onClick={clickAvatar} ref={avatarRef} className="mr-4 flex flex-col items-center self-end cursor-pointer">
                    <img src={maleAvatar} alt="avatar" className="h-9 min-w-9"/>
                    <h1 className="font-akaya-kanadaka text-[14px]">John Doe</h1>
                </div>
            </header>
            <nav ref={navRef} className={`absolute w-fit flex flex-col right-0 z-100
                top-[${headerRef.current?.getBoundingClientRect().width}] bg-[#BAD8C6] 
                rounded-l-[5px] px-4 py-2 gap-4 font-allerta-stencil ${showNav ? 'animate-slide-in' : 'animate-slide-out'} ${avatarClicked ? '' : 'hidden'} transition-all`}>
                {links.map((link, index) => {
                    return <Link key={index} to={link.path} className='flex flex-row gap-2 items-center cursor-pointer px-2 hover:bg-[#90ab9a] rounded-[10px]'>
                        <img className="h-4" src={link.pic} alt={link.name} />
                        <p>{link.name}</p>
                    </Link>
                })}
                <div className="flex flex-row gap-2 items-center cursor-pointer px-2 hover:bg-[#90ab9a] rounded-[10px]">
                    <img className="h-4" src={signoutLogo} alt="singout-logo" />
                    <p>Sign out</p>
                </div>
            </nav>
            <Outlet />
        </>
        
    );
};