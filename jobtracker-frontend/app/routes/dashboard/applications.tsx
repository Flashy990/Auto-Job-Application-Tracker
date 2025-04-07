import searchLogo from "/images/search.png";
import crossDelLogo from "/images/cross.png";
import { fakeApplications, fakeStatuses } from "./fakeApplications";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "~/context/AuthContext";
import { useNavigate } from "react-router";
import useGetApplicationsByStatus from "~/hooks/job-applications/useGetApplicationsByStatus";
import { useDispatch } from "react-redux";
import { setApplicationId } from "~/store/applicationIdSlice";

export default function Applications() {
    const [windowWidth, setWindowWidth] = useState(0);
    const [statusClick, setStatusClick] = useState('');
    const [displayApplications, setDisplayApplications] = useState(fakeApplications);
    const [isManaging, setIsManaging] = useState(false);
    const [curPage, setCurPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, getApplicationsByStatus} = useGetApplicationsByStatus();
    const [startRow, setStartRow] = useState(0);
    const [endRow, setEndRow] = useState(0);

    const LG_SCREEN = 1375;
    const APPLICATIONS_PER_PAGE = 9;
    const PAGES_DISPLAY = 5;
    let pages = Math.ceil(displayApplications.length / APPLICATIONS_PER_PAGE);

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

    useEffect(() => {
        if(curPage * 9  < displayApplications.length) {
            setStartRow((curPage - 1) * 9);
            setEndRow(curPage * 9);
        } else {
            setStartRow((curPage - 1) * 9);
            setEndRow(displayApplications.length);
        }
    },[curPage]);

    const clickFilter = async (status: string) => {
        if(statusClick !== status) {
            const filteredApplications = await getApplicationsByStatus(status);
            if(filteredApplications.length !== 0) {
                setDisplayApplications(filteredApplications);
                setStatusClick(status);
            }
        } else {
            setDisplayApplications(fakeApplications);
            setStatusClick('');
        }
    };

    const clickSearch = (e: FormEvent) => {

    }
 
    return (
        <main className="flex flex-col sm:flex-row gap-8">
                <aside className="flex flex-row justify-evenly bg-[#BAD8C6]/50 sticky top-0 z-10 sm:static sm:flex-col items-center sm:justify-between sm:px-5 sm:min-h-[calc(89vh)]">
                    {/* desktop view */}
                    <div className="hidden sm:flex flex-col items-center">
                        <form role='search' className="mt-5 flex flex-row gap-3 items-center">
                            <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="text-[12px] border-2 w-41 rounded-xl h-[26px] pl-2 align-middle placeholder:text-[12px] placeholder:align-middle focus:outline-0 focus:border-secondary" type="search" id="search" placeholder="search for applications" name="application"/>
                            <button type='submit' className="h-5 w-5 cursor-pointer"><img src={searchLogo} alt="search-logo"/></button>
                        </form>
                        <div className="flex flex-col gap-5 flex-grow">
                            <h1 className="text-[16px] font-allerta-stencil mt-5">Search by status filters</h1>
                            <div className="flex flex-col gap-3">
                                {fakeStatuses.map((status, index) => {
                                    return <div key={index} className={`flex flex-row items-center gap-4 w-fit rounded-xl pl-2 bg-gray-100 cursor-pointer hover:bg-secondary ${status.name === statusClick ? 'bg-secondary' : ''}`}>
                                        <p className="text-[12px]">{status.name}</p>
                                        <p className="flex items-center justify-center text-[10px] bg-[#D6D140] rounded-full w-4.5 h-4.5">{status.amount}</p>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:flex flex-col gap-3 items-center mb-5">
                        <button onClick={() => {dispatch(setApplicationId('new'));navigate('/dashboard/edit-application/new');}} className={`font-allerta-stencil w-[130px] rounded-[10px] border-3 border-secondary cursor-pointer ${isManaging ? '' : 'hidden'}`}>Add a new job application</button>
                        <button onClick={() => setIsManaging(!isManaging)} className={`font-allerta-stencil text-[20px] w-[162px] border-3 border-black/30 rounded-[10px] cursor-pointer hover:bg-secondary ${isManaging ? 'bg-secondary' : ''}`}>
                            Manage your applications
                        </button>
                    </div>
                    

                    {/* mobile view */}
                    <button className="text-[12px] my-2 px-1 hover:bg-secondary rounded-2xl sm:hidden">Check Statuses</button>
                    <form role="search" className="flex flex-row gap-2 my-2 items-center sm:hidden">
                        <input className="text-[12px] border-2 w-41 rounded-xl h-[22px] pl-2 placeholder:text-[12px] placeholder:align-middle" type="search" id="search" placeholder="search for applications" name="application"/>
                        <button type='submit' className="h-4 w-4 cursor-pointer"><img src={searchLogo} alt="search-logo"/></button>
                    </form>
                    <button className="text-[12px] hover:bg-secondary rounded-2xl px-1 my-2 sm:hidden">Manage your application</button>
                </aside>
                <div className="flex mt-4 flex-col items-center z-0 justify-between sm:min-h-[calc(89vh)]">
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
                            {displayApplications.slice(startRow, endRow).map((application, index) => {
                                return <div key={index} onClick={() => {if(isManaging) {dispatch(setApplicationId(`${application.id}`));navigate(`/dashboard/edit-application/${application.id}`);}}} 
                                className={`flex flex-row gap-5 h-[50px] text-[15px] ${isManaging ? (index % 2 === 0 ? 'animate-shakeOne' : 'animate-shakeTwo')+' cursor-pointer' : '' } `}>
                                    <div className="flex w-[43px] rounded-[15px] border-3 items-center justify-center">{(curPage - 1) * 9 + index + 1}</div>
                                    <div className="relative flex flex-row items-center gap-9 pl-4 pr-15 rounded-[15px] border-3">
                                        <h1 className="text-[12px] w-[150px]">{application.jobPosition}</h1>
                                        <h1 className="w-[100px]">{application.company}</h1>
                                        <h1 className="w-[135px]">{application.salaryRange}</h1>
                                        <h1 className="w-[110px]">{application.location}</h1>
                                        <h1 className="w-[90px]">{application.status}</h1>
                                        <h1 className="w-[110px]">{application.documents.join(', ')}</h1>
                                        <h1 className="w-[36px]">{application.notes}</h1>
                                        <img src={crossDelLogo} alt="delete-logo" className={`${isManaging? '' : 'hidden'} h-4.5 absolute -top-1.5 -right-1.5`} />
                                    </div>
                                </div>})}
                            </div>)
                    : 
                    (<div className="flex flex-wrap gap-5 z-0">
                        { displayApplications.slice(startRow, endRow).map((application, index) => {
                            return <div key={index} className={`relative w-60 ${isManaging ? (index % 2 === 0 ? 'animate-shakeOnePlus' : 'animate-shakeTwoPlus')+' cursor-pointer' : '' }`}>
                                    <img src={crossDelLogo} alt="delete-logo" className={`h-4.5 absolute z-10 -top-1.5 -right-1.5 ${isManaging ? '' : 'hidden'}`}/>
                                    <div className="flex flex-row font-allerta-stencil text-[17px] absolute -top-3.5 left-2.5 gap-1">
                                        <p className="bg-gray-100 w-fit">{(curPage - 1) * 9 + index + 1}</p>
                                        <p className="bg-gray-100 w-fit">{application.company}</p>
                                        <p className="bg-gray-100 w-fit text-[#BAD8C6]">{application.status}</p>
                                    </div>
                                    <div className="border-3 overflow-y-auto h-50 px-2 rounded-[15px] flex flex-col pt-3">
                                        <p className="border-b-2">{application.jobPosition}</p>
                                        <p className="border-b-2">{application.salaryRange}</p>
                                        <p className="border-b-2">{application.location}</p>
                                        <p className="border-b-2">{application.documents.join(', ')}</p>
                                        <p className="w-56">Overflow content is clipped at the element's 
                                            padding box, and overflow content can be scrolled into view using 
                                            scroll bars. Unlike scroll, user agents display scroll bars only if 
                                            the content is overflowing. If content fits inside the element's padding 
                                            box, it looks the same as with visible but still establishes a new formatting 
                                            context. The element box is a scroll container.</p>
                                    </div>
                                </div>
                           })}   
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