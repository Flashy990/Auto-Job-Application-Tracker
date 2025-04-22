import backLogo from "/images/arrow.png";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import { useSelector } from "react-redux";
import type { ApplicationIdState } from "@store/applicationIdSlice";
import useGetApplicationsById from "@hooks/job-applications/useGetApplicationsById";
import { useNavigate } from "react-router";
import AlertBox from "@components/AlertBox";
import useDeleteApplication from "@hooks/job-applications/useDeleteApplication";
import type { JobApplication } from "@hooks/job-applications/useCreateApplication";
import useCreateApplication, { ApplicationStatus } from "@hooks/job-applications/useCreateApplication";
import useUpdateApplication from "@hooks/job-applications/useUpdateApplication";


const statusOptions = [
    { value: ApplicationStatus.APPLIED , label: 'Applied'}, 
    { value: ApplicationStatus.INTERVIEWING, label: 'Interviewing'}, 
    { value: ApplicationStatus.ACCEPTED, label: 'Accepted'}, 
    { value: ApplicationStatus.REJECTED, label: 'Rejected'}
];

export default function ApplicationEdit() {
    const [application, setApplication] = useState<JobApplication>({} as JobApplication);
    const applicationId = useSelector((state: ApplicationIdState) => state.applicationId.value);
    const {loadingCA, createApplication} = useCreateApplication();
    const {loadingGAI, getApplicationById} = useGetApplicationsById();
    const {loadingUA, updateApplication} = useUpdateApplication();
    const {loadingDA, deleteApplication} = useDeleteApplication();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchApplication = async () => {
            if(applicationId !== 'new') {
                const application = await getApplicationById(applicationId);
                if(application) {
                    setApplication(application);
                }
            }
        }
        
        if(!applicationId) {
            navigate('/dashboard/applications');
        } else {
            fetchApplication(); 
        }
    },[applicationId]);

    const clickDelete = async () => {
        await deleteApplication(parseInt(applicationId));
        setIsDeleting(false);
        navigate('/dashboard/applications');
    }

    const clickSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(applicationId === 'new') {
            await createApplication(application);
            navigate('/dashboard/applications');
        } else {
            await updateApplication(parseInt(applicationId),application);
            navigate('/dashboard/applications');
        }
    }



    return (
        <main className="flex flex-row gap-8">
            {isDeleting && <AlertBox leftButton="Cancel" rightButton="Confirm" dialogue={`Do you want to delete this job application?(id: ${applicationId})`} clickLeft={() => setIsDeleting(false)} clickRight={() => clickDelete()}/>}
            <aside className="flex flex-col items-center min-h-[calc(100vh-85px)] px-5 bg-[#BAD8C6]/20">
                <h1 className="text-[32px] w-[208px] mt-8 flex-grow">
                    {applicationId === 'new' ? 
                    "You're adding a new application . . ." : 
                    "Your're editing an application . . ."}
                </h1>
                <button onClick={() => navigate("/dashboard/applications")} className="flex flex-row gap-2 items-center border-3 rounded-[10px] px-2 border-black/30 mb-5 cursor-pointer"><img className="h-3" src={backLogo} alt="arrow" />Back</button>
            </aside>
            <Suspense fallback={<div className="text-2xl">Loading your job application</div>}>
                <div className="mt-4">
                    <form role='form' action="" className="flex flex-col gap-6" onSubmit={clickSubmit}>
                        <div className="flex flex-col gap-3">
                            <div>
                                <label htmlFor="company">Company: </label>
                                <input type="text" value={application.companyName ?? ''} onChange={(e) => setApplication({...application, companyName: e.target.value})} id="company" className="border-3 rounded-[10px] px-1"/>
                            </div>
                            <div>
                                <label htmlFor="job-position">Position: </label>
                                <input type="text" value={application.position ?? ''} onChange={(e) => setApplication({...application, position: e.target.value})} id="job-position" className="border-3 rounded-[10px] px-1"/>
                            </div>
                            <div>
                                <label htmlFor="job-description">Job Description: </label>
                                <textarea value={application.jobDescription ?? ''} onChange={(e) => setApplication({...application, jobDescription: e.target.value})} className="border-3 block rounded-[10px] w-90 h-20 px-1"/>
                            </div>
                            <div>
                                <label htmlFor="application-url">Application URL: </label>
                                <input type="text" value={application.applicationUrl ?? ''} onChange={(e) => setApplication({...application, applicationUrl: e.target.value})} className="border-3 rounded-[10px] px-1"/>
                            </div>
                            <div className="flex flex-row gap-3">
                                <label htmlFor="status">Status: </label>
                                {statusOptions.map((option, index) => {
                                    return <label>
                                        <input type="radio" className="accent-primary" value={option.value} checked={application.status === option.value} onChange={(e) => setApplication({...application, status: e.target.value as ApplicationStatus})}/>
                                        {option.label}
                                    </label>
                                })}
                            </div>
                            <div>
                                <label htmlFor="application-date">Application Date: </label>
                                <input type='date' value={application.applicationDate ?? ''} onChange={(e) => setApplication({...application, applicationDate: e.target.value})} className="border-3 rounded-[10px] px-1"/>
                            </div>
                            <div>
                                <label htmlFor="location">Location: </label>
                                <input type="text" value={application.location ?? ''} onChange={(e) => setApplication({...application, location:e.target.value})} id="location" className="border-3 rounded-[10px] px-1"/>
                            </div>
                            <div>
                                <label htmlFor="salary">Salary: </label>
                                <input type='number' value={application.salary ?? ''} onChange={(e) => setApplication({...application, salary:parseInt(e.target.value)})} id="salary" className="border-3 rounded-[10px] px-1"/>
                            </div>
                            <div>
                                <label htmlFor="contact-name">Contact Name: </label>
                                <input type="text" value={application.contactName ?? ''} onChange={(e) => setApplication({...application, contactName:e.target.value})} className="border-3 rounded-[10px] px-1"/>
                            </div>
                            <div>
                                <label htmlFor="contact-email">Contact Email: </label>
                                <input type="text" value={application.contactEmail ?? ''} onChange={(e) => setApplication({...application, contactEmail:e.target.value})} className="border-3 rounded-[10px] px-1"/>
                            </div>
                        </div>
                        <div className="flex flex-row gap-5">
                            <button type="submit" className="flex border-3 w-fit px-2 rounded-[10px] cursor-pointer" disabled={loadingCA || loadingDA || loadingGAI || loadingUA}>{applicationId !== 'new' ? 'Save' : 'Submit'}</button>
                            {applicationId !== 'new' && <button type='button' onClick={() => setIsDeleting(true)} className="flex border-3 w-fit px-2 rounded-[10px] cursor-pointer" disabled={loadingCA || loadingDA || loadingGAI || loadingUA}>Delete</button>}
                        </div>
                    </form>
                </div>
            </Suspense>
        </main>
    );
};