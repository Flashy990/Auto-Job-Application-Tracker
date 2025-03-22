import backLogo from "/images/arrow.png";

export default function ApplicationEdit() {

    return (
        <main className="flex flex-row gap-8">
            <aside className="flex flex-col items-center min-h-[calc(100vh-85px)] px-5 bg-[#BAD8C6]/20">
                <h1 className="text-[32px] w-[208px] mt-8 flex-grow">You're adding a new application .&nbsp;.&nbsp;.</h1>
                <button className="flex flex-row gap-2 items-center border-3 rounded-[10px] px-2 border-black/30 mb-5"><img className="h-3" src={backLogo} alt="arrow" />Back</button>
            </aside>
            <div className="mt-4">
                <form role='form' action="" className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <div>
                            <label htmlFor="job-position">Job Position: </label>
                            <input type="text" id="job-position" className="border-3 rounded-[10px]"/>
                        </div>
                        <div>
                            <label htmlFor="company">Company: </label>
                            <input type="text" id="company" className="border-3 rounded-[10px]"/>
                        </div>
                        <div className="flex flex-row items-center">
                            <label htmlFor="salary-range">Salary Range: </label>
                            <div className="flex flex-row items-center">
                                <p>&nbsp;$&nbsp;</p> <input type="text" id="min-salary" className="border-3 rounded-[10px]"/> <p>&nbsp;- $&nbsp;</p><input type="text" id="max-salary" className="border-3 rounded-[10px]"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="location">Location: </label>
                            <input type="text" id="location" className="border-3 rounded-[10px]"/>
                        </div>
                        <div>
                            <label htmlFor="status">Status: </label>
                            <select id="status" className="border-3 rounded-[10px] cursor-pointer">
                                <option value="Applying">Applying</option>
                                <option value="Applied">Applied</option>
                                <option value="Interviewing">Interviewing</option>
                                <option value="Offered">Offered</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="documents">Documents: </label>
                            <div className="mt-3">
                                <input type='file' id="document-upload" name="document-upload" 
                                    accept=".pdf,.doc,.docx" className="sr-only"/>
                                <label htmlFor="document-upload" className="border-3 mr-2 rounded-[10px] cursor-pointer">Choose File</label>
                                <span id="file-chosen">No file chosen</span>
                            </div>
                            <button className="mt-3 cursor-pointer"> + Add Another File</button>
                        </div>
                        <div>
                            <label htmlFor="notes">Notes:</label>
                            <input type="text" id="notes" className="border-3 block w-100 h-50 rounded-[10px]"/>
                        </div>
                    </div>
                    <button type="submit" className="flex border-3 w-fit px-2 rounded-[10px]">Submit</button>
                </form>
            </div>
        </main>
    );
};