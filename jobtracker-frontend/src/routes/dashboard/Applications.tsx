import searchLogo from "/images/search.png";
import crossDelLogo from "/images/cross.png";
import addLogo from '/images/add.png';
import { Suspense, useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@context/AuthContext";
import { useNavigate } from "react-router";
import useGetApplicationsByStatus from "@hooks/job-applications/useGetApplicationsByStatus";
import { useDispatch } from "react-redux";
import { setApplicationId } from "@store/applicationIdSlice";
import useDeleteApplication from "@hooks/job-applications/useDeleteApplication";
import AlertBox from "@components/AlertBox";
import useSearchApplications from "~/hooks/job-applications/useSearchApplications";
import { useGetStats } from "~/hooks/job-applications/useGetStats";
import useGetApplications from "~/hooks/job-applications/useGetApplications";
import { ApplicationStatus, JobApplication } from "~/hooks/job-applications/useCreateApplication";
import toast from "react-hot-toast";

export default function Applications() {
    const [statusClick, setStatusClick] = useState('');
    const [displayApplications, setDisplayApplications] = useState<JobApplication[]>([]);
    const [totalApplications, setTotalApplications] = useState<JobApplication[]>([]);
    const [isManaging, setIsManaging] = useState(false);
    const [curPage, setCurPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loadingGA, getApplications} = useGetApplications();
    const {loadingGAS, getApplicationsByStatus} = useGetApplicationsByStatus();
    const {loadingDA, deleteApplication} = useDeleteApplication();
    const {loadingSA, searchApplications} = useSearchApplications();
    const { getStats } = useGetStats();
    const [startRow, setStartRow] = useState(0);
    const [endRow, setEndRow] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeletingId, setIsDeletingId] = useState(-1);
    const [showStatus, setShowStatus] = useState(false);
    const [totalNum, setTotalNum] = useState(0);
    const [statusNum, setStatusNum] = useState({Applied: 0, Interviewing: 0, Accepted: 0, Rejected: 0});
    const [mousePos, setMousePos] = useState({x: 0, y: 0});
    const [isHovering, setIsHovering] = useState(false);

    const APPLICATIONS_PER_PAGE = 12;
    const PAGES_DISPLAY = 5;
    let pages = Math.ceil(displayApplications.length / APPLICATIONS_PER_PAGE);

    useEffect(() => {
        if(!authUser) {
            navigate('/');
        }

        getStats().then((data) => {
            setTotalNum(data.totalApplications);
            setStatusNum({
                Applied: data.totalApplied,
                Interviewing: data.totalInterviews,
                Accepted: data.totalOffers,
                Rejected: data.totalRejections
            });
        })

        getApplications().then((applications) => {
            if(applications) {
                setTotalApplications(applications);
                setDisplayApplications(applications);
            }
            
        })    

    },[]);

     

    useEffect(() => {
        const handleMouseMove = (e: globalThis.MouseEvent) => {
            setMousePos({x: e.clientX, y: e.clientY});
        }
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
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
            const filtered = await getApplicationsByStatus(status.toUpperCase());
            setDisplayApplications(filtered);
            setStatusClick(status);
            setCurPage(1);
            setSearchValue('');
        } else {
            setCurPage(1);
            setDisplayApplications(totalApplications);
            setStatusClick('');
        }
    };

    const clickSearch = async (e: FormEvent) => {
        e.preventDefault();
        if(searchValue !== '') {
            const searchedApplications = await searchApplications(searchValue);
            if(searchedApplications) {
                setDisplayApplications(searchedApplications);
                setCurPage(1);
                setStatusClick('');
            }
        } else {
            toast.error('Cannot search with empty input');
        }
    }

    useEffect(() => {
        if(searchValue === '' && statusClick === '') {
            setDisplayApplications(totalApplications);
        }
    },[searchValue]);

    const clickDelete = async (id: number) => {
       await deleteApplication(id);
       const afterDelete = await getApplications();
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
            {isHovering && isManaging && <div style={{left: `${mousePos.x + 15}px`, top:`${mousePos.y}px`}} className="absolute text-[12px] md:text-[14px] bg-primary z-10 px-1 rounded-[5px]">Click box to edit</div>}
             {/* desktop view */}
            <aside className="bg-[#BAD8C6]/50 z-10 hidden md:flex flex-col items-center justify-between px-5 min-h-[calc(100vh-85px)]">
                <div className="flex flex-col items-center">
                    <form role='search' className="mt-5 flex flex-row gap-3 items-center" onSubmit={clickSearch}>
                        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="text-[12px] border-2 w-41 rounded-xl h-[26px] pl-2 align-middle placeholder:text-[12px] placeholder:align-middle focus:outline-secondary" type="search" id="search" placeholder="search for applications" name="application"/>
                        <button type='submit' className="h-5 w-5 cursor-pointer" disabled={loadingSA}><img src={searchLogo} alt="search-logo"/></button>
                    </form>
                    <div className="flex flex-col gap-1 flex-grow mt-5">
                        <h1 className="text-[16px] font-allerta-stencil">Search by status filters</h1>
                        <h1>Total: {totalNum}</h1>
                        <div className="flex flex-col gap-3">
                            {Object.entries(statusNum).map(([key, value]) => {
                                return <button key={key} onClick={() => clickFilter(key)} className={`flex flex-row items-center gap-4 w-fit rounded-xl pl-2 bg-gray-100 cursor-pointer hover:bg-secondary ${key === statusClick ? 'bg-secondary' : ''}`}>
                                    <p className="text-[12px]">{key}</p>
                                    <p className="flex items-center justify-center text-[10px] bg-[#D6D140] rounded-full w-4.5 h-4.5">{value}</p>
                                </button>
                            })}
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col gap-3 items-center mb-5 ${totalApplications.length === 0 ? 'hidden' : ''}`}>
                    <button onClick={() => {dispatch(setApplicationId('new'));navigate('/dashboard/edit-application/new');}} className={`font-allerta-stencil w-[130px] rounded-[10px] border-3 border-secondary cursor-pointer ${isManaging ? '' : 'hidden'}`}>Add a new job application</button>
                    <button onClick={() => {setIsManaging(!isManaging)}} className={`font-allerta-stencil text-[20px] w-[162px] border-3 border-black/30 rounded-[10px] cursor-pointer hover:bg-secondary ${isManaging ? 'bg-secondary' : ''}`}>
                        Manage your applications
                    </button>
                </div>
            </aside>
                

                {/* mobile view */}
            <aside className="bg-[#BAD8C6]/50 z-10 text-[12px] flex flex-row w-[100vw] justify-evenly items-center sticky md:hidden">
                 <div className="relative my-2 px-1">
                    <button className={`hover:bg-secondary rounded-2xl ${showStatus? 'bg-secondary' : ''}`} onClick={clickToShowStatus}>Check Statuses</button>
                    <div className={`${showStatus ? '' : 'hidden'} absolute flex flex-col items-start gap-1 py-1 pl-1.5 pr-4 left-0.5 top-6 bg-primary rounded-[10px]`}>
                        <h1>Total: {totalNum}</h1>
                        {Object.entries(statusNum).map(([key, value]) => {
                            return <button key={key} onClick={() => clickFilter(key)} className={`flex flex-row items-center gap-4 w-fit rounded-xl pl-2 cursor-pointer hover:bg-secondary ${key === statusClick ? 'bg-secondary' : 'bg-gray-100'}`}>
                                <p>{key}</p>
                                <p className="flex items-center justify-center text-[10px] bg-[#D6D140] rounded-full w-4.5 h-4.5">{value}</p>
                            </button>
                        })}
                    </div> 
                </div>
                <form role="search" className="flex flex-row gap-2 my-2 items-center" onSubmit={clickSearch}>
                    <input className="border-2 w-41 rounded-xl h-[22px] pl-2 placeholder:align-middle" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="search" id="search" placeholder="search for applications" name="application"/>
                    <button type='submit' className="h-4 w-4 cursor-pointer"><img src={searchLogo} alt="search-logo"/></button>
                </form>
                <div className={`flex flex-row items-center ${isManaging ? 'gap-10' : ''} ${totalApplications.length === 0 ? 'hidden' : ''}`}>
                    <button onClick={() => setIsManaging(true)} className={`hover:bg-secondary rounded-2xl px-1 my-2 ${isManaging ? 'hidden' : ''}`}>Manage your application</button>
                    <button onClick={() => {dispatch(setApplicationId('new'));navigate('/dashboard/edit-application/new');}} className={`flex flex-row gap-1 items-center ${isManaging? 'cursor-pointer' : 'hidden'}`}><img src={addLogo} alt="add" className={`h-4`}/>Add new</button>
                    <button onClick={() => setIsManaging(false)} className={`${isManaging ? 'cursor-pointer' : 'hidden'} border-2 px-1 rounded-[10px]`}>Done</button>
                </div>
            </aside>

            {/* applications */}

            {totalApplications.length === 0 && 
            <div className="mt-[30vh] font-allerta-stencil flex flex-col gap-3 flex-grow items-center">
                <h1 className="text-2xl md:text-3xl">Add your first job application now!</h1>
                <button onClick={() => {dispatch(setApplicationId('new'));navigate('/dashboard/edit-application/new');}} className="border-2 rounded-[10px] px-2 hover:bg-primary cursor-pointer text-[14px] md:text-[16px]">Click to add</button>
            </div>}

            {totalApplications.length !== 0 && 
            <Suspense fallback={<div className="text-2xl text-primary mt-8">Loading your job applications...</div>}>
            <div className="text-[12px] sm:text-[1rem] flex mt-8 mx-4 flex-col items-center z-0 flex-grow justify-between min-h-[calc(100vh-65px-38px-32px)] sm:min-h-[calc(100vh-85px-38px-32px)] md:min-h-[calc(100vh-85px-32px)]">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 z-0">
                    { displayApplications.slice(startRow, endRow).map((application, index) => {
                        return <div key={application.id} onClick={() => {if(isManaging) {dispatch(setApplicationId(`${application.id}`));navigate(`/dashboard/edit-application/${application.id}`);}}}  
                        className={`relative w-[100%] ${isManaging ? (index % 2 === 0 ? 'animate-shakeOnePlus' : 'animate-shakeTwoPlus')+' cursor-pointer' : '' }`}>
                                <img src={crossDelLogo} alt="delete-logo" onClick={(e) =>{e.stopPropagation();setIsDeleting(true);setIsDeletingId(application.id)}} className={`h-4.5 absolute z-10 -top-1.5 -right-1.5 cursor-pointer ${isManaging ? '' : 'hidden'}`}/>
                                <div className="flex flex-row font-allerta-stencil text-[15px] sm:text-[17px] absolute -top-2.5 sm:-top-3.5 left-2.5 gap-4">
                                    <p className="bg-gray-100 w-fit">{(curPage - 1) * APPLICATIONS_PER_PAGE + index + 1}</p>
                                    <p className="bg-gray-100 w-fit text-[#BAD8C6]">{application.status}</p>
                                </div>
                                <div className="border-3 overflow-y-auto h-50 px-2 rounded-[15px] flex flex-col pt-3" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                                    <p className="border-y-2 w-fit rounded-[5px]">{application.companyName}</p>
                                    <p className="border-b-2">{application.position}</p>
                                    <p className="border-b-2">{application.location}</p>
                                    <p className="border-b-2">${application.salary}</p>
                                    <p className="border-b-2">{application.applicationUrl}</p>
                                    <p className="border-b-2">Applied Date: {application.applicationDate}</p>
                                    <p className="border-b-2">Contact: {application.contactName}<br/>{application.contactEmail}</p>
                                    <p className="w-[100%]">{application.jobDescription}</p>
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
            </Suspense>}
        </main>
    );
}