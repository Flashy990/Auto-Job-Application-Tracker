import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@context/AuthContext.tsx";
import { User, useUpdateUser } from "~/hooks/user/useUpdateUser";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "~/hooks/user/useGetUser";
import { useUser } from "~/context/UserContext";

export default function SettingProfile() {
    const {authUser} = useAuth();
    const {setUser} = useUser();
    const [userInfo, setUserInfo] = useState<User>({} as User);
    const navigate = useNavigate();
    const {updateUser, loadingUU} = useUpdateUser();
    const {getUser} = useGetUser();


    const genderOptions = ['Female', 'Male', 'Non-binary', 'Others', 'Prefer not to say'];
    const degreeOptions = ["High School Diploma", "Associate's Degree", "Bachelor's Degree", 
        "Master's Degree", "Doctoral Degree", "Certificate/Diploma", "No Formal Education", "Other"];

    // implement a function that get user info

    useEffect(() => {
        if(!authUser) {
            navigate('/login');
        }

        getUser().then((user) => {
            setUserInfo(user);
        })
        
    },[]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const updatedUser = await updateUser(userInfo);
        if(updatedUser) {
            setUser(updatedUser);
        }
    }

    return (
        <div className="md:mt-5">
            <form className="grid grid-cols-1 mx-4 md:mx-0 text-[14px] md:text-[16px]" onSubmit={handleSubmit}>
                <div className="grid gap-4">
                    <div className="flex flex-row gap-2 items-center">
                        <label>
                            First Name: 
                        </label>
                        <input type="text" name="username" value={userInfo.firstName ?? ''} onChange={(e) => {setUserInfo({...userInfo, firstName: e.target.value, avatarUrl:`https://api.dicebear.com/9.x/pixel-art/svg?seed=${e.target.value}`})}} className="border-2 rounded-[10px] px-2"/>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <label>
                            Last Name: 
                        </label>
                        <input type="text" name="username" value={userInfo.lastName ?? ''} onChange={(e) => setUserInfo({...userInfo, lastName:e.target.value})} className="border-2 rounded-[10px] px-2"/>
                    </div>
                    <div className="flex flex-row gap-2 items-start">
                        <label htmlFor="gender">
                            Gender:  
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {genderOptions.map((gender, index) => {
                                return <label className="flex gap-1">
                                    <input type="radio" value={gender} checked={gender === userInfo.gender} onChange={(e) => setUserInfo({...userInfo, gender:e.target.value})} className="accent-primary"/>
                                    {gender}
                                </label>
                            })}
                        </div>
                        
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <label htmlFor="date-of-birth">
                            Date of Birth:
                        </label>
                        <input type="date" value={userInfo.dob?? ''} onChange={(e) => setUserInfo({...userInfo, dob:e.target.value})} className="border-2 rounded-[10px]"/>
                    </div> 
                    <div className='flex flex-row items-center gap-2'>
                        <label htmlFor="education">
                            Education: 
                        </label>
                        <select name="education-degree" id="education-degree" defaultValue={''} className='border-2 rounded-[10px] px-1' value={userInfo.education?? ''} onChange={(e) => setUserInfo({...userInfo, education:e.target.value})}>
                            <option value='' disabled>---Select a degree---</option>
                            {degreeOptions.map((degree, index) => {
                                return <option key={index} value={degree}>{degree}</option>
                            })}
                        </select>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <label htmlFor="industry">
                            Industry:
                        </label>
                        <input type="text" placeholder='Industry' value={userInfo.industry ?? ''} onChange={(e) => setUserInfo({...userInfo, industry:e.target.value})} className='border-2 rounded-[10px] px-2'/>
                    </div>
                    <button type="submit" className="border-2 rounded-[10px] px-2 w-fit">Update</button> 
                </div>
            </form>
        </div>
    );
};