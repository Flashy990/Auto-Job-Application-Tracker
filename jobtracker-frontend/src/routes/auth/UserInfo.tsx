import { useRef, useState } from 'react';
import blankAvatar from '/images/blank-avatar.png';
import uploadLogo from '/images/avatar-upload.png';
import { useNavigate } from 'react-router';

export default function UserInfo() {
    const [avatar, setAvatar] = useState(blankAvatar);
    const [gender, setGender] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [degree, setDegree] = useState('');
    const [industry, setIndustry] = useState('');
    const navigate = useNavigate();
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const longMonths = ['January', 'March', 'May', 'July', 'August', 'October', 'December'];
    const YEAR_GAP = 125;
    const LATEST_YEAR = new Date().getFullYear();
    const genderOptions = ['Female', 'Male', 'Non-binary', 'Others', 'Prefer not to say'];
    const degreeOptions = ["High School Diploma", "Associate's Degree", "Bachelor's Degree", 
        "Master's Degree", "Doctoral Degree", "Certificate/Diploma", "No Formal Education", "Other"];

    // implement a function that if it's not a new user(decide based on the user account 
    // created time, less than 30 minutes, or some inputs have been entered), 
    // then navigate to dashboard. 
    // The user info collection can only be done there.

    

    

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

    // unimplemented
    const handleContinueClick = () => {

    };

    return (
        <div className='mt-[13vh]'>
            <h1 className='text-center text-3xl font-allerta-stencil'>Create Your Profile</h1>
            <form className='flex flex-col items-center gap-8 mt-7'>
                <div>
                    <div onClick={handleAvatarClick} className='flex relative w-fit cursor-pointer'>
                        <img src={avatar} alt="avatar" className='h-20'/>
                        <img src={uploadLogo} alt="upload-logo" className='bg-gray-100 rounded-[6px] h-5 absolute right-0 bottom-0'/>
                    </div>
                    <input ref={avatarInputRef} onChange={handleAvatarChange} type='file' className='hidden'/>
                </div>
                <div className='flex flex-col gap-2 items-start'>
                    <div>
                        <label htmlFor="username">
                            Username:
                            <input type="text" placeholder='enter username' className='border-2 rounded-[10px] w-40 ml-2 px-2'/>
                        </label>
                    </div>
                    <div className='w-90 flex flex-row gap-2 items-start'>
                        <label htmlFor="gender">
                            Gender:
                        </label>
                        {/* <OptionsSelector options={genderOptions} onChange={setGender}/> */}
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <label htmlFor="birthday">
                            Date of Birth:
                        </label>
                        <select name="birthMonth" id="birthMonth" value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} className='border-2 rounded-[10px] w-fit'>
                            <option value="" disabled selected>-Month-</option>
                            {monthArray.map((month, index) => {
                                return <option value={month}>{month}</option>
                            })}
                        </select>
                        <select name="birthDay" id="birthDay" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} className='border-2 rounded-[10px] w-fit'>
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
                        <select name="birthYear" id="birthYear" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} className='border-2 rounded-[10px] w-fit'>
                            <option value="" disabled selected>-Year-</option>
                            {Array.from({length: YEAR_GAP + 1}).map((_, index) => {
                                return <option value={LATEST_YEAR - index}>{LATEST_YEAR - index}</option>
                            })}
                        </select>
                    </div>
                    <div className='flex flex-row items-center'>
                        <label htmlFor="education">
                            Education: 
                        </label>
                        <select name="education-degree" id="education-degree" className='ml-2'value={degree} onChange={(e) => setDegree(e.target.value)}>
                            <option value='' disabled selected>---Select a degree---</option>
                            {degreeOptions.map((degree, index) => {
                                return <option key={index} value={degree}>{degree}</option>
                            })}
                        </select>
                    </div>
                    <div className='flex flex-row items-center'>
                        <label htmlFor="industry">
                            Industry:
                        </label>
                        <input type="text" placeholder='Industry' value={industry} onChange={(e) => setIndustry(e.target.value)} className='border-2 rounded-[10px] px-2 ml-2'/>
                    </div>
                </div>
                <button type='submit' className='border-2 bg-[#FFC457] rounded-2xl px-8 cursor-pointer'>Continue</button>
            </form>
            
        </div>
    );
}