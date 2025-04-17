import searchLogo from "/images/search.png";
import crossDelLogo from "/images/cross.png";
import addLogo from '/images/add.png';
import { fakeApplications, fakeStatuses } from "./fakeApplications";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@context/AuthContext";
import { useNavigate } from "react-router";
import useGetApplicationsByStatus from "@hooks/job-applications/useGetApplicationsByStatus";
import { useDispatch } from "react-redux";
import { setApplicationId } from "@store/applicationIdSlice";
import useDeleteApplication from "@hooks/job-applications/useDeleteApplication";
import AlertBox from "@components/AlertBox";

export default function Applications() {
    const [statusClick, setStatusClick] = useState('');
    const [displayApplications, setDisplayApplications] = useState(fakeApplications);
    const [isManaging, setIsManaging] = useState(false);
    const [curPage, setCurPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loadingGAS, getApplicationsByStatus} = useGetApplicationsByStatus();
    const {loadingDA, deleteApplication} = useDeleteApplication();
    const [startRow, setStartRow] = useState(0);
    const [endRow, setEndRow] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeletingId, setIsDeletingId] = useState(-1);
    const [showStatus, setShowStatus] = useState(false);
    const [statusNum, setStatusNum] = useState({Applying: 0, Applied: 0, Interviewing: 0, Offered: 0, Rejected: 0});

    const APPLICATIONS_PER_PAGE = 12;
    const PAGES_DISPLAY = 5;
    let pages = Math.ceil(displayApplications.length / APPLICATIONS_PER_PAGE);

    // useEffect(() => {
    //     if(!authUser) {
    //         navigate('/');
    //     }
    // },[]);

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
        if(curPage * APPLICATIONS_PER_PAGE  < displayApplications.length) {
            setStartRow((curPage - 1) * APPLICATIONS_PER_PAGE);
            setEndRow(curPage * APPLICATIONS_PER_PAGE);
        } else {
            setStartRow((curPage - 1) * APPLICATIONS_PER_PAGE);
            setEndRow(displayApplications.length);
        }
    },[curPage, displayApplications]);

    const clickFilter = async (status: string) => {
        if(statusClick !== status) {
            // *** temporary solution for display ***
            setDisplayApplications(fakeApplications.filter(application => application.status === status));
            setStatusClick(status);
            setCurPage(1);
            // const filteredApplications = await getApplicationsByStatus(status);
            // if(filteredApplications) {
            //     setDisplayApplications(filteredApplications);
            //     setStatusClick(status);
            // }
        } else {
            setCurPage(1);
            setDisplayApplications(fakeApplications);
            setStatusClick('');
        }
    };

    const clickSearch = (e: FormEvent) => {

    }

    const clickDelete = async (id: number) => {
       await deleteApplication(id);
       // *** a temporary solution ***
       const afterDelete = displayApplications.filter(application => application.id !== id);
       setDisplayApplications(afterDelete);
       setIsDeleting(false);
       setIsDeletingId(-1);
    };

    const clickToShowStatus = () => {
        setShowStatus(!showStatus);
    }

 
    return (
        <main className="flex flex-col md:flex-row">
            {isDeleting && <AlertBox leftButton={"Cancel"} rightButton={"Confirm"} dialogue={`Do you want to delete this job application(id: ${isDeletingId})?`} clickLeft={()=>{setIsDeleting(false);setIsDeletingId(-1)}} clickRight={()=> {clickDelete(isDeletingId)}}/>}
             {/* desktop view */}
            <aside className="bg-[#BAD8C6]/50 z-10 hidden md:flex flex-col items-center justify-between px-5 min-h-[calc(100vh-85px)]">
                <div className="flex flex-col items-center">
                    <form role='search' className="mt-5 flex flex-row gap-3 items-center">
                        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="text-[12px] border-2 w-41 rounded-xl h-[26px] pl-2 align-middle placeholder:text-[12px] placeholder:align-middle focus:outline-0 focus:border-secondary" type="search" id="search" placeholder="search for applications" name="application"/>
                        <button type='submit' className="h-5 w-5 cursor-pointer"><img src={searchLogo} alt="search-logo"/></button>
                    </form>
                    <div className="flex flex-col gap-5 flex-grow">
                        <h1 className="text-[16px] font-allerta-stencil mt-5">Search by status filters</h1>
                        <div className="flex flex-col gap-3">
                            {fakeStatuses.map((status, index) => {
                                return <button key={status.name} onClick={() => clickFilter(status.name)} className={`flex flex-row items-center gap-4 w-fit rounded-xl pl-2 bg-gray-100 cursor-pointer hover:bg-secondary ${status.name === statusClick ? 'bg-secondary' : ''}`}>
                                    <p className="text-[12px]">{status.name}</p>
                                    <p className="flex items-center justify-center text-[10px] bg-[#D6D140] rounded-full w-4.5 h-4.5">{status.amount}</p>
                                </button>
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 items-center mb-5">
                    <button onClick={() => {dispatch(setApplicationId('new'));navigate('/dashboard/edit-application/new');}} className={`font-allerta-stencil w-[130px] rounded-[10px] border-3 border-secondary cursor-pointer ${isManaging ? '' : 'hidden'}`}>Add a new job application</button>
                    <button onClick={() => setIsManaging(!isManaging)} className={`font-allerta-stencil text-[20px] w-[162px] border-3 border-black/30 rounded-[10px] cursor-pointer hover:bg-secondary ${isManaging ? 'bg-secondary' : ''}`}>
                        Manage your applications
                    </button>
                </div>
            </aside>
                

                {/* mobile view */}
            <aside className="bg-[#BAD8C6]/50 z-10 text-[12px] flex flex-row w-[100vw] justify-evenly items-center sticky md:hidden">
                 <div className="relative my-2 px-1">
                    <button className={`hover:bg-secondary rounded-2xl ${showStatus? 'bg-secondary' : ''}`} onClick={clickToShowStatus}>Check Statuses</button>
                    <div className={`${showStatus ? '' : 'hidden'} absolute flex flex-col items-start gap-1 py-1 pl-1.5 pr-4 left-0.5 top-6 bg-primary rounded-[10px]`}>
                        {fakeStatuses.map((status, index) => {
                            return <button key={status.name} onClick={() => clickFilter(status.name)} className={`flex flex-row items-center gap-4 w-fit rounded-xl pl-2 cursor-pointer hover:bg-secondary ${status.name === statusClick ? 'bg-secondary' : 'bg-gray-100'}`}>
                                <p>{status.name}</p>
                                <p className="flex items-center justify-center text-[10px] bg-[#D6D140] rounded-full w-4.5 h-4.5">{status.amount}</p>
                            </button>
                        })}
                    </div> 
                </div>
                <form role="search" className="flex flex-row gap-2 my-2 items-center">
                    <input className="border-2 w-41 rounded-xl h-[22px] pl-2 placeholder:align-middle" type="search" id="search" placeholder="search for applications" name="application"/>
                    <button type='submit' className="h-4 w-4 cursor-pointer"><img src={searchLogo} alt="search-logo"/></button>
                </form>
                <div className={`flex flex-row items-center ${isManaging ? 'gap-10' : ''}`}>
                    <button onClick={() => setIsManaging(true)} className={`hover:bg-secondary rounded-2xl px-1 my-2 ${isManaging ? 'hidden' : ''}`}>Manage your application</button>
                    <button onClick={() => {dispatch(setApplicationId('new'));navigate('/dashboard/edit-application/new');}} className={`flex flex-row gap-1 items-center ${isManaging? 'cursor-pointer' : 'hidden'}`}><img src={addLogo} alt="add" className={`h-4`}/>Add new</button>
                    <button onClick={() => setIsManaging(false)} className={`${isManaging ? 'cursor-pointer' : 'hidden'} border-2 px-1 rounded-[10px]`}>Done</button>
                </div>
            </aside>

            {/* desktop view for applications */}
            <div className="hidden md:flex mt-8 mx-4 flex-col items-center z-0 flex-grow justify-between md:min-h-[calc(100vh-85px)]">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 z-0">
                    { displayApplications.slice(startRow, endRow).map((application, index) => {
                        return <div key={application.id} onClick={() => {if(isManaging) {dispatch(setApplicationId(`${application.id}`));navigate(`/dashboard/edit-application/${application.id}`);}}}  
                        className={`relative w-[100%] ${isManaging ? (index % 2 === 0 ? 'animate-shakeOnePlus' : 'animate-shakeTwoPlus')+' cursor-pointer' : '' }`}>
                                <img src={crossDelLogo} alt="delete-logo" onClick={(e) =>{e.stopPropagation();setIsDeleting(true);setIsDeletingId(application.id)}} className={`h-4.5 absolute z-10 -top-1.5 -right-1.5 cursor-pointer ${isManaging ? '' : 'hidden'}`}/>
                                <div className="flex flex-row font-allerta-stencil text-[17px] absolute -top-3.5 left-2.5 gap-1">
                                    <p className="bg-gray-100 w-fit">{(curPage - 1) * APPLICATIONS_PER_PAGE + index + 1}</p>
                                    <p className="bg-gray-100 w-fit">{application.company}</p>
                                    <p className="bg-gray-100 w-fit text-[#BAD8C6]">{application.status}</p>
                                </div>
                                <div className="border-3 overflow-y-auto h-50 px-2 rounded-[15px] flex flex-col pt-3">
                                    <p className="border-b-2">{application.jobPosition}</p>
                                    <p className="border-b-2">{application.salaryRange}</p>
                                    <p className="border-b-2">{application.location}</p>
                                    <p className="border-b-2">{application.documents.join(', ')}</p>
                                    <p className="w-[100%]">Overflow content is clipped at the element's 
                                        padding box, and overflow content can be scrolled into view using 
                                        scroll bars. Unlike scroll, user agents display scroll bars only if 
                                        the content is overflowing. If content fits inside the element's padding 
                                        box, it looks the same as with visible but still establishes a new formatting 
                                        context. The element box is a scroll container.</p>
                                </div>
                            </div>
                        })}   
                </div>
                <div className="flex flex-row gap-7 items-center mb-5 mt-5">
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

            {/* mobile view for applications */}
            <div className="md:hidden mt-8 flex flex-col items-center text-[12px] sm:text-[1rem]">
                <div className="grid grid-cols-2 gap-5 mx-6">
                    {displayApplications.slice(startRow, endRow).map((application, index) => {
                        return <div key={application.id} onClick={() => {if(isManaging) {dispatch(setApplicationId(`${application.id}`));navigate(`/dashboard/edit-application/${application.id}`);}}}  
                        className={`relative w-[100%] ${isManaging ? (index % 2 === 0 ? 'animate-shakeOnePlus' : 'animate-shakeTwoPlus')+' cursor-pointer' : '' }`}>
                                <img src={crossDelLogo} alt="delete-logo" onClick={(e) =>{e.stopPropagation();setIsDeleting(true);setIsDeletingId(application.id)}} className={`h-4.5 absolute z-10 -top-1.5 -right-1.5 cursor-pointer ${isManaging ? '' : 'hidden'}`}/>
                                <div className="flex flex-row font-allerta-stencil text-[15px] sm:text-[17px] absolute -top-2.5 sm:-top-3.5 left-2.5 gap-1">
                                    <p className="bg-gray-100 w-fit">{(curPage - 1) * APPLICATIONS_PER_PAGE + index + 1}</p>
                                    <p className="bg-gray-100 w-fit">{application.company}</p>
                                    <p className="bg-gray-100 w-fit text-[#BAD8C6]">{application.status}</p>
                                </div>
                                <div className="border-3 overflow-y-auto h-40 md:h-50 px-2 rounded-[15px] flex flex-col pt-3">
                                    <p className="border-b-2">{application.jobPosition}</p>
                                    <p className="border-b-2">{application.salaryRange}</p>
                                    <p className="border-b-2">{application.location}</p>
                                    <p className="border-b-2">{application.documents.join(', ')}</p>
                                    <p className="w-[100%]">Overflow content is clipped at the element's 
                                        padding box, and overflow content can be scrolled into view using 
                                        scroll bars. Unlike scroll, user agents display scroll bars only if 
                                        the content is overflowing. If content fits inside the element's padding 
                                        box, it looks the same as with visible but still establishes a new formatting 
                                        context. The element box is a scroll container.</p>
                                </div>
                            </div>
                    })}
                </div>
                <div className="flex flex-row gap-7 items-center mb-5 mt-5">
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