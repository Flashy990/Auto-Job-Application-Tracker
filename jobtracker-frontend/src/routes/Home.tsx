import { Link } from "react-router";
import { useAuth } from "@context/AuthContext";
import documentPic from '/images/documents-doodle.png';
import FadeInSection from "@components/FadeInSection";
import { useEffect, useRef, useState } from "react";
import userLogo from '/images/user.png';
import dashboardLogo from '/images/dashboard.png';
import settingLogo from '/images/setting.png';
import signoutLogo from '/images/logout.png';
import { User } from "~/hooks/user/useUpdateUser";
import { useGetUser } from "~/hooks/user/useGetUser";


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

export default function Home() {
    const {authUser} = useAuth();
    const [user, setUser] = useState<User>({} as User);
    const {getUser} = useGetUser();
    const [showNav, setShowNav] = useState(false);
    const [avatarClicked, setAvatarClicked] = useState(false);
    const avatarRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    const clickAvatar = () => {
        setShowNav(!showNav);
        setAvatarClicked(true);
    }

    useEffect(() => {
      if(authUser) {
        getUser().then((user) => {
          setUser(user);
        })
      }
    },[authUser]);

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



  return (
  <div>
    <header ref={headerRef} className="flex flex-row items-center py-1 border-b-1 h-[65px] sm:h-[85px] justify-between">
      <h1 style={{WebkitTextStroke: `1px black`, textShadow:`2px 2px 2px gray`}} className="font-akaya-kanadaka text-[45px] sm:text-[42px] md:text-[52px] lg:text-6xl pl-4 text-[#BAD8C6]">JAT</h1>
      <h1 className={`hidden sm:block sm:text-[32px] md:text-[42px] lg:text-5xl font-allerta-stencil text-center self-center`}>Job Application Tracker</h1>
      {authUser ?
        ( <div onClick={clickAvatar} className="flex flex-col items-center self-end cursor-pointer md:pl-19 w-[72px] sm:w-[86.5px] md:w-[161px] lg:w-[174.5px]">
            <img src={user.avatarUrl} alt="avatar" className="h-7 min-w-7 sm:h-9 sm:min-w-9"/>
            <h1 className="font-akaya-kanadaka text-[12px] sm:text-[14px]">{user.firstName} {user.lastName}</h1>
          </div>) :
        (<div className="flex justify-center px-2 flex-row sm:flex-col md:flex-row gap-2 sm:gap-1 md:gap-3 self-end text-[14px] sm:text-[14px] lg:text-[16px]">
            <Link to={'/signup'} className="border-2 px-2 w-max py-1 rounded-xl hover:text-gray-100 hover:bg-gray-900 hover:border-gray-900">Sign up</Link>
            <Link to={'/login'} className=" border-2 px-2 w-max py-1 rounded-xl hover:text-gray-100 hover:bg-gray-900 hover:border-gray-900">Log in</Link>
          </div>) }
    </header>
    {authUser && <nav ref={navRef} style={{top: `${headerHeight}px`}} className={`absolute w-fit flex flex-col right-0 z-20 bg-[#BAD8C6] 
                rounded-l-[5px] px-2 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 font-allerta-stencil text-[14px] md:text-[16px] ${showNav ? 'animate-slide-in' : 'animate-slide-out'} ${avatarClicked ? '' : 'hidden'} transition-all`}>
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
            </nav>}
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
      <div className="flex flex-col gap-10 text-[12px] md:text-[16px] text-center">
          <FadeInSection>
            <div className="border-2 rounded-2xl bg-primary">
              <h1>Our intelligent dashboard gives you a bird's-eye view of all your applications at once</h1>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="border-2 rounded-2xl bg-primary">
              <h1>Document and categorize application requirements across opportunities to identify skill gaps you might want to address.</h1>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="border-2 rounded-2xl bg-primary">
              <h1>Securely store contact information for all your networking connections and hiring managers</h1>
            </div>
          </FadeInSection>
      </div>
      
    </main>
  </div>);
}
