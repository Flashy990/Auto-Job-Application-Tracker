import { useEffect, useState } from "react";
import { useGetUser } from "~/hooks/user/useGetUser";
import { User } from "~/hooks/user/useUpdateUser";

export default function Profile() {
    const [user, setUser] = useState<User>({} as User);
    const {getUser} = useGetUser();

    useEffect(() => {
        getUser().then((user) => {
            setUser(user);
        })

    },[]);


    return <div className="flex flex-row justify-center mt-[13vh]">
    <div className='grid place-items-center w-fit gap-8 border-2 rounded-[10px] p-4 text-[14px] md:text-[16px]'>
        <h1 className="font-akaya-kanadaka text-4xl md:text-5xl">Your Profile</h1>
        <div>
            <div className='flex relative w-fit rounded-full border-4 border-primary'>
                <img src={user.avatarUrl} alt="avatar" className='h-20 p-2'/>
            </div>
        </div>
        <div className='flex flex-col gap-2 items-start'>
            <div className="flex gap-2">
                <h1>First Name:</h1>
                <p>{user.firstName}</p>
            </div>
            <div className="flex gap-2">
                <h1>Last Name:</h1>
                <p>{user.lastName}</p>
            </div>
            <div className='w-90 flex flex-row gap-2 items-start'>
                <h1>Gender:</h1>
                <p>{user.gender}</p>
            </div>
            <div className='flex flex-row gap-2 items-center'>
                <h1>Date of Birth:</h1>
                <p>{user.dob}</p>
            </div>
            <div className='flex flex-row gap-2 items-center'>
                <h1>Education:</h1> 
                <p>{user.education}</p>
            </div>
            <div className='flex flex-row gap-2 items-center'>
                <h1>Industry:</h1>
                <p>{user.industry}</p>
            </div>
        </div>
    </div>
    </div>
}