export default function Password() {

    return (
        <div className="flex flex-col items-center gap-5 mt-[15vh]">
            <form action="" className="flex flex-col items-center gap-4">
                <div className="text-3xl">
                    Create your account
                </div>
                <input type="text" name="email" className="flex items-center border-2 h-8 px-2 w-70 rounded-[5px]" value={"xxx@mail.com"} disabled/>
                <input type="password" name="password"  className="flex items-center border-2 h-8 px-2 w-70 rounded-[5px]"/>
                <button type="submit" className="bg-[#FFC457] w-fit px-8 py-1 rounded-2xl cursor-pointer">Continue</button>
            </form>
            <button className="text-[13px] cursor-pointer">Go back</button>
        </div>
    );
}