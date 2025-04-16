import OptionsSelector from "~/components/OptionsSelector";
import backLogo from "/images/arrow.png";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { ApplicationIdState } from "~/store/applicationIdSlice";
import useGetApplicationsById from "~/hooks/job-applications/useGetApplicationsById";
import { useNavigate } from "react-router";
import AlertBox from "~/components/AlertBox";
import useDeleteApplication from "~/hooks/job-applications/useDeleteApplication";

export default function ApplicationEdit() {
    const [status, setStatus] = useState('');
    const [application, setApplication] = useState(null);
    const statusOptions = ['Applying', 'Applied', 'Interviewing', 'Offered', 'Rejected'];
    const applicationId = useSelector((state: ApplicationIdState) => state.applicationId.value);
    const {loadingGAI, getApplicationById} = useGetApplicationsById();
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
        // if(!applicationId) {
        //     navigate('/dashboard/applications');
        // } else {
        //     fetchApplication(); 
        // }
    },[applicationId]);

    const clickDelete = async (id:string) => {
        // await deleteApplication(parseInt(id));
        setIsDeleting(false);
        navigate('/dashboard/applications');
    }

    return (
        <main className="flex flex-row gap-8">
            {isDeleting && <AlertBox leftButton="Cancel" rightButton="Confirm" dialogue={`Do you want to delete this job application?(id: ${applicationId})`} clickLeft={() => setIsDeleting(false)} clickRight={() => clickDelete(applicationId)}/>}
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
                    <form role='form' action="" className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <div>
                                <label htmlFor="company">Company: </label>
                                <input type="text" id="company" className="border-3 rounded-[10px] px-1"/>
                            </div>
                            <div>
                                <label htmlFor="job-position">Position: </label>
                                <input type="text" id="job-position" className="border-3 rounded-[10px] px-1"/>
                            </div>
                            <div>
                                <label htmlFor="job-description">Job Description: </label>
                                <textarea className="border-3 block rounded-[10px] w-90 h-20 px-1"/>
                            </div>
                            <div>
                                <label htmlFor="application-url">Application URL: </label>
                                <input type="text" className="border-3 rounded-[10px] px-1"/>
                            </div>
                            <div>
                                <label htmlFor="status">Status: </label>
                                <OptionsSelector options={statusOptions} onChange={setStatus}/>
                            </div>
                            <div>
                                <label htmlFor="application-date">Application Date: </label>
                                <input type='date' className="border-3 rounded-[10px] px-1"/>
                            </div>
                            <div>
                                <label htmlFor="location">Location: </label>
                                <input type="text" id="location" className="border-3 rounded-[10px] px-1"/>
                            </div>
                            <div>
                                <label htmlFor="salary">Salary: </label>
                                <input type="text" id="salary" className="border-3 rounded-[10px] px-1"/>
                            </div>
                            <div>
                                <label htmlFor="contact-name">Contact Name: </label>
                                <input type="text" className="border-3 rounded-[10px] px-1"/>
                            </div>
                            <div>
                                <label htmlFor="contact-email">Contact Email: </label>
                                <input type="text" className="border-3 rounded-[10px] px-1"/>
                            </div>
                            {/* <div>
                                <label htmlFor="documents">Documents: </label>
                                <div className="mt-3">
                                    <input type='file' id="document-upload" name="document-upload" 
                                        accept=".pdf,.doc,.docx" className="sr-only"/>
                                    <label htmlFor="document-upload" className="border-3 mr-2 rounded-[10px] cursor-pointer">Choose File</label>
                                    <span id="file-chosen">No file chosen</span>
                                </div>
                                <button className="mt-3 cursor-pointer"> + Add Another File</button>
                            </div> */}
                            {/* <div>
                                <label htmlFor="notes">Notes:</label>
                                <textarea id="notes" className="border-3 block w-100 h-50 rounded-[10px]"/>
                            </div> */}
                        </div>
                        <div className="flex flex-row gap-5">
                            <button type="submit" className="flex border-3 w-fit px-2 rounded-[10px] cursor-pointer">{applicationId !== 'new' ? 'Save' : 'Submit'}</button>
                            {applicationId !== 'new' && <button type='button' onClick={() => setIsDeleting(true)} className="flex border-3 w-fit px-2 rounded-[10px] cursor-pointer">Delete</button>}
                        </div>
                    
                    </form>
                </div>
            </Suspense>
        </main>
    );
};