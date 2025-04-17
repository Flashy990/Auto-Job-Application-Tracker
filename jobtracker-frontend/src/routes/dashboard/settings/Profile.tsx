import { useRef, useState } from "react";
import { useAuth } from "@context/AuthContext.tsx";
import blankAvatar from '/images/blank-avatar.png';
import uploadLogo from '/images/avatar-upload.png';

export default function SettingProfile() {
    const {authUser} = useAuth();
    const [avatar, setAvatar] = useState(blankAvatar);
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [degree, setDegree] = useState('');
    const [industry, setIndustry] = useState('');
    const avatarInputRef = useRef<HTMLInputElement>(null);


    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const longMonths = ['January', 'March', 'May', 'July', 'August', 'October', 'December'];
    const genderOptions = ['Female', 'Male', 'Non-binary', 'Others', 'Prefer not to say'];
    const YEAR_GAP = 125;
    const LATEST_YEAR = new Date().getFullYear();
    const degreeOptions = ["High School Diploma", "Associate's Degree", "Bachelor's Degree", 
        "Master's Degree", "Doctoral Degree", "Certificate/Diploma", "No Formal Education", "Other"];

    // implment a function that get user info




    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            const reader = new FileReader();
            reader.addEventListener('load', (e) => setAvatar(e.target?.result as string));
            reader.readAsDataURL(file);
        }
        
    }

    const handleAvatarClick = () => {
        avatarInputRef.current?.click();
    }

    return (
        <div className="mt-5">
            <form className="grid grid-cols-2">
                <div className="grid gap-6">
                    <div className="flex flex-row gap-2 items-center">
                        <label htmlFor="username">
                            Username: 
                        </label>
                        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="border-2 rounded-[10px] px-2"/>
                    </div>
                    <div className="flex flex-row gap-2 items-start">
                            <label htmlFor="gender">
                            Gender:  
                        </label>
                        {/* <OptionsSelector options={genderOptions} onChange={setGender}/> */}
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <label htmlFor="date-of-birth">
                            Date of Birth:
                        </label>
                        <select name="birthMonth" id="birthMonth" value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} className='border-2 rounded-[10px] w-fit px-1'>
                                <option value="" disabled selected>-Month-</option>
                                {monthArray.map((month, index) => {
                                    return <option value={month}>{month}</option>
                                })}
                        </select>
                        <select name="birthDay" id="birthDay" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} className='border-2 rounded-[10px] w-fit px-1'>
                            <option value='' disabled selected>-Day-</option>
                            {longMonths.includes(birthMonth) && Array.from({length: 31}).map((_, index) => {
                                return <option value={index + 1}>{index + 1}</option>
                            })}
                            {!longMonths.includes(birthMonth) && birthMonth !== 'February' && Array.from({length: 30}).map((_, index) => {
                                return <option value={index + 1}>{index + 1}</option>
                            })}
                            {birthMonth === 'February' && Array.from({length:29}).map((_, index) => {
                                return <option value={index + 1}>{index + 1}</option>
                            })}
                        </select>
                        <select name="birthYear" id="birthYear" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} className='border-2 rounded-[10px] w-fit px-1'>
                            <option value="" disabled selected>-Year-</option>
                            {Array.from({length: YEAR_GAP + 1}).map((_, index) => {
                                return <option value={LATEST_YEAR - index}>{LATEST_YEAR - index}</option>
                            })}
                        </select>
                    </div> 
                    <div className='flex flex-row items-center gap-2'>
                        <label htmlFor="education">
                            Education: 
                        </label>
                        <select name="education-degree" id="education-degree" className='border-2 rounded-[10px] px-1'value={degree} onChange={(e) => setDegree(e.target.value)}>
                            <option value='' disabled selected>---Select a degree---</option>
                            {degreeOptions.map((degree, index) => {
                                return <option key={index} value={degree}>{degree}</option>
                            })}
                        </select>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <label htmlFor="industry">
                            Industry:
                        </label>
                        <input type="text" placeholder='Industry' value={industry} onChange={(e) => setIndustry(e.target.value)} className='border-2 rounded-[10px] px-2'/>
                    </div>
                    <button type="submit" className="border-2 rounded-[10px] px-2 w-fit">Update</button> 
                </div>
                <div className="h-fit place-self-center w-max">
                    <div onClick={handleAvatarClick} className='flex relative w-fit cursor-pointer'>
                        <img src={avatar} alt="avatar" className='h-50'/>
                        <img src={uploadLogo} alt="upload-logo" className='bg-gray-100 rounded-[6px] h-7.5 absolute right-0 bottom-0'/>
                    </div>
                    <input ref={avatarInputRef} onChange={handleAvatarChange} type='file' className='hidden'/>
                </div>
            </form>
        </div>
    );
};