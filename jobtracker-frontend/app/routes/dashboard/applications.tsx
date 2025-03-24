import searchLogo from "/images/search.png";
import { fakeApplications, fakeStatuses } from "./fakeApplications";

export default function Applications() {

    return (
        <main className="flex flex-row gap-8">
                <aside className="flex flex-col items-center min-h-[calc(100vh-85px)] px-5 bg-[#BAD8C6]/20">
                    <form className="mt-5 flex flex-row gap-3 items-center" role="search" action="">
                        <label htmlFor="search"></label>
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
                    <button className="font-allerta-stencil text-[20px] w-[162px] border-3 border-black/30 px-3 rounded-[10px] mb-5">
                        Manage your applications
                    </button>
                </aside>
                <div className="flex mt-4 flex-col gap-4 items-center">
                    <div className="flex flex-col text-[16px] gap-3">
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
                        {
                            fakeApplications.map((fakeApplication, index) => {
                                return <div key={index} className="flex flex-row gap-5 h-[50px] text-[15px]">
                                    <div className="flex w-[43px] rounded-[15px] border-3 items-center justify-center">{fakeApplication.id}</div>
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
                            } )
                        }
                    </div>
                    <div className="flex flex-row gap-7 items-center">
                        <h1>Previous</h1>
                        {/* static pagination */}
                        <div className="flex flex-row gap-6 items-center">
                            <p className="border-3 border-[#BAD8C6] px-1.5 rounded-[5px]">1</p>
                            <p className="border-3 border-[#BAD8C6] px-1.5 rounded-[5px]">2</p>
                            <p className="border-3 border-[#BAD8C6] px-1.5 rounded-[5px]">3</p>
                            <p className="border-3 border-[#BAD8C6] px-1.5 rounded-[5px]">4</p>
                            <p className="border-3 border-[#BAD8C6] px-1.5 rounded-[5px]">5</p>
                        </div>
                        <h1>Next</h1>
                    </div>
                </div>
            </main>
    );
}