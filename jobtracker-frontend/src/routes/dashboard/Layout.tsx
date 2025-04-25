import { Link, Outlet, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import userLogo from '/images/user.png';
import dashboardLogo from '/images/dashboard.png';
import settingLogo from '/images/setting.png';
import signoutLogo from '/images/logout.png';
import { useAuth } from "~/context/AuthContext";
import { useUser } from "~/context/UserContext";


const links = [
    {
        name:'Your profile',
        path:'/dashboard/user-profile',
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
    const [headerHeight, setHeaderHeight] = useState(0);
    const navigate = useNavigate();
    const {setAuthUser} = useAuth();
    const {user} = useUser();


    const clickAvatar = () => {
        setShowNav(!showNav);
        setAvatarClicked(true);
    }


    useEffect(() => {

        const handleResize = () => {
            if(headerRef.current) {
                const rect = headerRef.current.getBoundingClientRect();
                setHeaderHeight(rect.height);
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }

    }, []);


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


    const handleSignout = () => {
        localStorage.removeItem('authUser');
        setAuthUser(null);
        navigate('/');
    }

    return (
        <>
            <header ref={headerRef} className="flex flex-row items-center py-1 border-b-1 h-[65px] sm:h-[85px] justify-between">
                <h1 style={{WebkitTextStroke: `1px black`, textShadow:`2px 2px 2px gray`}} className="font-akaya-kanadaka text-[45px] sm:text-[42px] md:text-[52px] lg:text-6xl pl-4 text-[#BAD8C6] cursor-pointer" onClick={() => navigate('/')}>JAT</h1>
                <h1 className="hidden sm:block sm:text-[32px] md:text-[42px] lg:text-5xl font-allerta-stencil text-center self-center">Job Application Tracker</h1>
                <div onClick={clickAvatar} ref={avatarRef} className="flex flex-col items-center self-end cursor-pointer md:pl-19 w-[72px] sm:w-[86.5px] md:w-[161px] lg:w-[174.5px]">
                    <img src={user.avatarUrl} alt="avatar" className="h-7 min-w-7 sm:h-9 sm:min-w-9"/>
                    <h1 className="font-akaya-kanadaka text-[12px] sm:text-[14px]">{user.firstName} {user.lastName}</h1>
                </div>
            </header>
            <nav ref={navRef} style={{top: `${headerHeight}px`}} className={`absolute w-fit flex flex-col right-0 z-20 bg-[#BAD8C6] 
                rounded-l-[5px] px-2 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 font-allerta-stencil text-[14px] md:text-[16px] ${showNav ? 'animate-slide-in' : 'animate-slide-out'} ${avatarClicked ? '' : 'hidden'} transition-all`}>
                {links.map((link, index) => {
                    return <Link key={index} to={link.path} className='flex flex-row gap-2 items-center cursor-pointer px-2 hover:bg-[#90ab9a] rounded-[10px]'>
                        <img className="h-4" src={link.pic} alt={link.name} />
                        <p>{link.name}</p>
                    </Link>
                })}
                <button onClick={handleSignout} className="flex flex-row gap-2 items-center cursor-pointer px-2 hover:bg-[#90ab9a] rounded-[10px]">
                    <img className="h-4" src={signoutLogo} alt="singout-logo" />
                    <p>Sign out</p>
                </button>
            </nav>
            <Outlet />
        </>
        
    );
};