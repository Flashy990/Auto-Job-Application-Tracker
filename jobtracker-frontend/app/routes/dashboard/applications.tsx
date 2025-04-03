import searchLogo from "/images/search.png";
import { fakeApplications, fakeStatuses } from "./fakeApplications";
import { useEffect, useState } from "react";
import { useAuth } from "~/context/AuthContext";
import { useNavigate } from "react-router";

export default function Applications() {
    const [windowWidth, setWindowWidth] = useState(0);
    const [statusClick, setStatusClick] = useState(true);
    const [isManaging, setIsManaging] = useState(false);
    const [curPage, setCurPage] = useState(1);
    const {authUser} = useAuth();
    const navigate = useNavigate();

    const LG_SCREEN = 1375;
    const APPLICATIONS_PER_PAGE = 9;
    const PAGES_DISPLAY = 5;
    let pages = Math.ceil(fakeApplications.length / APPLICATIONS_PER_PAGE);

    // useEffect(() => {
    //     if(!authUser) {
    //         navigate('/');
    //     }
    // },[authUser]);

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    },[]);

    const clickPrev = () => {
        if(curPage > 1) {
            setCurPage(prev => prev - 1);
        }
    }

    const clickNext = () => {
        if(curPage < pages) {
            setCurPage(prev => prev + 1);
        }
    }

    const clickPage = (pageNum: number) => {
        setCurPage(pageNum);
    }
 
    return (
        <main className="flex flex-col sm:flex-row gap-8">
                <aside className="flex flex-row justify-evenly bg-[#BAD8C6]/50 sticky top-0 z-10 sm:static sm:flex-col items-center sm:justify-between sm:px-5">
                    {/* desktop view */}
                    <div className="hidden sm:flex flex-col items-center min-h-[calc(100vh-140px)]">
                        <form role='search' className="mt-5 flex flex-row gap-3 items-center">
                            <input className="text-[12px] border-2 w-41 rounded-xl h-[26px] pl-2 align-middle placeholder:text-[12px] placeholder:align-middle" type="search" id="search" placeholder="search for applications" name="application"/>
                            <button type='submit' className="h-5 w-5 cursor-pointer"><img src={searchLogo} alt="search-logo"/></button>
                        </form>
                        <div className="flex flex-col gap-5 flex-grow">
                            <h1 className="text-[16px] font-allerta-stencil mt-5">Search by status filters</h1>
                            <div className="flex flex-col gap-3">
                                {fakeStatuses.map((status, index) => {
                                    return <div key={index} className="flex flex-row items-center gap-4 w-fit rounded-xl pl-2 bg-gray-100">
                                        <p className="text-[12px]">{status.name}</p>
                                        <p className="flex items-center justify-center text-[10px] bg-[#D6D140] rounded-full w-4.5 h-4.5">{status.amount}</p>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsManaging(!isManaging)} className={`hidden sm:inline font-allerta-stencil text-[20px] w-[162px] border-3 border-black/30 px-3 rounded-[10px] mb-5 cursor-pointer hover:bg-secondary ${isManaging ? 'bg-secondary' : ''}`}>
                        Manage your applications
                    </button>

                    {/* mobile view */}
                    <button className="text-[12px] my-2 px-1 hover:bg-secondary rounded-2xl sm:hidden">Check Statuses</button>
                    <form role="search" className="flex flex-row gap-2 my-2 items-center sm:hidden">
                        <input className="text-[12px] border-2 w-41 rounded-xl h-[22px] pl-2 placeholder:text-[12px] placeholder:align-middle" type="search" id="search" placeholder="search for applications" name="application"/>
                        <button type='submit' className="h-4 w-4 cursor-pointer"><img src={searchLogo} alt="search-logo"/></button>
                    </form>
                    <button className="text-[12px] hover:bg-secondary rounded-2xl px-1 my-2 sm:hidden">Manage your application</button>
                </aside>
                <div className="flex mt-4 flex-col gap-5 items-center z-0 justify-between">
                    {windowWidth >= LG_SCREEN ? 
                       (<div className="flex flex-col text-[16px] gap-3">
                            <div className="flex flex-row gap-5 font-allerta-stencil h-[58px]">
                                <div className="flex bg-[#BAD8C6] w-[43px] rounded-[15px] border-3 items-center justify-center">No.</div>
                                <div className="flex flex-row items-center gap-16 pl-4 pr-10 bg-[#BAD8C6] rounded-[15px] border-3">
                                    <h1 className="pr-6">Job Position</h1>
                                    <h1>Company</h1>
                                    <h1>Salary Range</h1>
                                    <h1>Location</h1>
                                    <h1 className="pl-3">Status</h1>
                                    <h1 className="pl-3">Documents</h1>
                                    <h1>Notes</h1>
                                </div>
                            </div>
                        {curPage * 9  < fakeApplications.length ? (
                            fakeApplications.slice((curPage - 1) * 9, curPage * 9).map((fakeApplication, index) => {
                                return <div key={index} onClick={() => {if(isManaging) navigate(`/dashboard/edit-application/${fakeApplication.id}`)}} className={`flex flex-row gap-5 h-[50px] text-[15px] ${isManaging ? (index % 2 === 0 ? 'animate-shakeOne' : 'animate-shakeTwo')+' cursor-pointer' : '' } `}>
                                    <div className="flex w-[43px] rounded-[15px] border-3 items-center justify-center">{(curPage - 1) * 9 + index + 1}</div>
                                    <div className="flex flex-row items-center gap-9 pl-4 pr-15 rounded-[15px] border-3">
                                        <h1 className="text-[12px] w-[150px]">{fakeApplication.jobPosition}</h1>
                                        <h1 className="w-[100px]">{fakeApplication.company}</h1>
                                        <h1 className="w-[135px]">{fakeApplication.salaryRange}</h1>
                                        <h1 className="w-[110px]">{fakeApplication.location}</h1>
                                        <h1 className="w-[90px]">{fakeApplication.status}</h1>
                                        <h1 className="w-[110px]">{fakeApplication.documents.join(', ')}</h1>
                                        <h1 className="w-[36px]">{fakeApplication.notes}</h1>
                                    </div>
                                </div>
                            }
                        ) ) : (fakeApplications.slice((curPage - 1) * 9, fakeApplications.length).map((fakeApplication, index) => {
                            return <div key={index} className={`flex flex-row gap-5 h-[50px] text-[15px] ${isManaging ? (index % 2 === 0 ? 'animate-shakeOne' : 'animate-shakeTwo')+' cursor-pointer' : '' }`}>
                                <div className="flex w-[43px] rounded-[15px] border-3 items-center justify-center">{(curPage - 1) * 9 + index + 1}</div>
                                <div className="flex flex-row items-center gap-9 pl-4 pr-15 rounded-[15px] border-3">
                                    <h1 className="text-[12px] w-[150px]">{fakeApplication.jobPosition}</h1>
                                    <h1 className="w-[100px]">{fakeApplication.company}</h1>
                                    <h1 className="w-[135px]">{fakeApplication.salaryRange}</h1>
                                    <h1 className="w-[110px]">{fakeApplication.location}</h1>
                                    <h1 className="w-[90px]">{fakeApplication.status}</h1>
                                    <h1 className="w-[110px]">{fakeApplication.documents.join(', ')}</h1>
                                    <h1 className="w-[36px]">{fakeApplication.notes}</h1>
                                </div>
                            </div>
                        }))}
                        </div>)
                    : 
                    (<div className="flex flex-wrap gap-5 z-0">
                    { curPage * 9  < fakeApplications.length ? (
                        fakeApplications.slice((curPage - 1) * 9, curPage * 9).map((fakeApplication, index) => {
                            return <div key={index} className={`relative w-60 ${isManaging ? (index % 2 === 0 ? 'animate-shakeOnePlus' : 'animate-shakeTwoPlus')+' cursor-pointer' : '' }`}>
                                    <div className="flex flex-row font-allerta-stencil text-[18px] absolute -top-3.5 left-2.5 gap-2">
                                        <p className="bg-gray-100 w-fit">{(curPage - 1) * 9 + index + 1}</p>
                                        <p className="bg-gray-100 w-fit">{fakeApplication.company}</p>
                                        <p className="bg-gray-100 w-fit text-[#BAD8C6]">{fakeApplication.status}</p>
                                    </div>
                                    <div className="border-3 overflow-y-auto h-50 px-2 rounded-[15px] flex flex-col pt-3">
                                        <p className="border-b-2">{fakeApplication.jobPosition}</p>
                                        <p className="border-b-2">{fakeApplication.salaryRange}</p>
                                        <p className="border-b-2">{fakeApplication.location}</p>
                                        <p className="border-b-2">{fakeApplication.documents.join(', ')}</p>
                                        <p className="w-56">Overflow content is clipped at the element's 
                                            padding box, and overflow content can be scrolled into view using 
                                            scroll bars. Unlike scroll, user agents display scroll bars only if 
                                            the content is overflowing. If content fits inside the element's padding 
                                            box, it looks the same as with visible but still establishes a new formatting 
                                            context. The element box is a scroll container.</p>
                                    </div>
                                </div>
                           })
                    ) :
                    (fakeApplications.slice((curPage - 1) * 9, fakeApplications.length).map((fakeApplication, index) => {
                        return <div key={index} className={`relative w-60 ${isManaging ? (index % 2 === 0 ? 'animate-shakeOnePlus' : 'animate-shakeTwoPlus')+' cursor-pointer' : '' }`}>
                                <div className="flex flex-row font-allerta-stencil text-[18px] absolute -top-3.5 left-2 gap-3">
                                    <p className="bg-gray-100 w-fit">{(curPage - 1) * 9 + index + 1}</p>
                                    <p className="bg-gray-100 w-fit">{fakeApplication.company}</p>
                                    <p className="bg-gray-100 w-fit text-[#BAD8C6]">{fakeApplication.status}</p>
                                </div>
                                <div className="border-3 overflow-y-auto h-50 px-2 rounded-[15px] flex flex-col pt-3">
                                    <p className="border-b-2">{fakeApplication.jobPosition}</p>
                                    <p className="border-b-2">{fakeApplication.salaryRange}</p>
                                    <p className="border-b-2">{fakeApplication.location}</p>
                                    <p className="border-b-2">{fakeApplication.documents.join(', ')}</p>
                                    <p className="w-56">Overflow content is clipped at the element's 
                                        padding box, and overflow content can be scrolled into view using 
                                        scroll bars. Unlike scroll, user agents display scroll bars only if 
                                        the content is overflowing. If content fits inside the element's padding 
                                        box, it looks the same as with visible but still establishes a new formatting 
                                        context. The element box is a scroll container.</p>
                                </div>
                            </div>
                       }))}   
                    </div>)}
                    <div className="flex flex-row gap-7 items-center mb-5">
                        <button onClick={clickPrev} className="cursor-pointer">Previous</button>
                        {/* implementing pagination ... */}
                        <div className="flex flex-row gap-6 items-center text-center ">
                            {pages - curPage + 1 < PAGES_DISPLAY ? (
                                Array.from({length: pages - curPage + 1}).map((_, index) => {
                                    return <button className={`border-3 border-[#BAD8C6] rounded-[5px] w-6 h-7 cursor-pointer`} onClick={() => clickPage(curPage + index)}>{curPage + index}</button>
                                })
                            ) : (Array.from({length: 5}).map((_,index) => {
                                return <button className={`border-3 border-[#BAD8C6] rounded-[5px] w-6 h-7 cursor-pointer`} onClick={() => clickPage(curPage + index)}>{curPage + index}</button>
                            }))}
                        </div>
                        <button onClick={clickNext} className="cursor-pointer">Next</button>
                    </div>
                </div>
            </main>
    );
}