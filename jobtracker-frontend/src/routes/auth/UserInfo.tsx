import { FormEvent, useEffect, useRef, useState } from 'react';
import blankAvatar from '/images/blank-avatar.png';
import { useNavigate } from 'react-router';
import { User, useUpdateUser } from '~/hooks/user/useUpdateUser';
import { useAuth } from '~/context/AuthContext';
import { useGetUser } from '~/hooks/user/useGetUser';

export default function UserInfo() {
    const {authUser, setAuthUser} = useAuth();
    const [user, setUser] = useState<User>({} as User);
    const {loadingUU, updateUser} = useUpdateUser();
    const {getUser} = useGetUser();
    const [avatar, setAvatar] = useState(blankAvatar);
    const navigate = useNavigate();

    const genderOptions = ['Female', 'Male', 'Non-binary', 'Others', 'Prefer not to say'];
    const degreeOptions = ["High School Diploma", "Associate's Degree", "Bachelor's Degree", 
        "Master's Degree", "Doctoral Degree", "Certificate/Diploma", "No Formal Education", "Other"];

    // implement a function that if it's not a new user(decide based on the user account 
    // created time, less than 30 minutes, or some inputs have been entered), 
    // then navigate to dashboard. 
    // The user info collection can only be done there.

    useEffect(() => {
        if(!authUser) {
            navigate('/');
        }
        if(authUser.firstName || authUser.lastName) {
            navigate('/dashboard/applications');
        }

        getUser().then((user) => {
            setUser(user);
        })
    },[]);


    // unimplemented
    const handleContinueClick = async (e: FormEvent) => {
        e.preventDefault();
        const updatedUser = await updateUser(user);
        if(updatedUser) {
            setUser(updatedUser);
        }
        navigate('/dashboard/applications');
    };

    return (
        <div className='mt-[13vh]'>
            <h1 className='text-center text-3xl font-allerta-stencil'>Create Your Profile</h1>
            <form className='flex flex-col items-center gap-8 mt-7' onSubmit={handleContinueClick}>
                <div>
                    <div className='flex relative w-fit'>
                        <img src={avatar} alt="avatar" className='h-20'/>
                    </div>
                </div>
                <div className='flex flex-col gap-2 items-start'>
                    <div>
                        <label>
                            First Name:
                            <input type="text" placeholder='enter first name' value={user.firstName ?? ''} onChange={(e) => {setUser({...user, firstName:e.target.value, avatarUrl:`https://api.dicebear.com/9.x/pixel-art/svg?seed=${e.target.value}`});setAvatar(`https://api.dicebear.com/9.x/pixel-art/svg?seed=${e.target.value}`)}} className='border-2 rounded-[10px] w-40 ml-2 px-2'/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Last Name:
                            <input type="text" placeholder='enter last name' value={user.lastName ?? ''} onChange={(e) => {setUser({...user, lastName:e.target.value});setAuthUser({...authUser, lastName:e.target.value})}} className='border-2 rounded-[10px] w-40 ml-2 px-2'/>
                        </label>
                    </div>
                    <div className='w-90 flex flex-row gap-2 items-start'>
                        <label>
                            Gender:
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {genderOptions.map((gender, index) => {
                                return <label className="flex gap-1">
                                    <input type="radio" value={gender} checked={gender === user.gender} onChange={(e) => setUser({...user, gender:e.target.value})} className="accent-primary"/>
                                    {gender}
                                </label>
                            })}
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <label htmlFor="birthday">
                            Date of Birth:
                        </label>
                        <input type="date" value={user.dob ?? ''} onChange={(e) => setUser({...user, dob:e.target.value})} className='border-2 rounded-[10px]'/>
                    </div>
                    <div className='flex flex-row items-center'>
                        <label htmlFor="education">
                            Education: 
                        </label>
                        <select name="education-degree" id="education-degree" defaultValue={''} className='ml-2' value={user.education?? ''} onChange={(e) => setUser({...user, education:e.target.value})}>
                            <option value='' disabled>---Select a degree---</option>
                            {degreeOptions.map((degree, index) => {
                                return <option key={index} value={degree}>{degree}</option>
                            })}
                        </select>
                    </div>
                    <div className='flex flex-row items-center'>
                        <label htmlFor="industry">
                            Industry:
                        </label>
                        <input type="text" placeholder='Industry' value={user.industry ?? ''} onChange={(e) => setUser({...user, industry:e.target.value})} className='border-2 rounded-[10px] px-2 ml-2'/>
                    </div>
                </div>
                <button type='submit' className='border-2 bg-[#FFC457] rounded-2xl px-8 cursor-pointer'>Continue</button>
            </form>
            
        </div>
    );
}