import { useRef, useState } from 'react';
import blankAvatar from '/images/blank-avatar.png';
import uploadLogo from '/images/avatar-upload.png';
import OptionsSelector from '~/components/OptionsSelector';

export default function UserInfo() {
    const [avatar, setAvatar] = useState(blankAvatar);
    const [gender, setGender] = useState('');
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const genderOptions = ['Female', 'Male', 'Non-binary', 'Others', 'Prefer not to say'];

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            const reader = new FileReader();
            reader.addEventListener('load', (e) => setAvatar(e.target?.result));
            reader.readAsDataURL(file);
        }
        
    }

    const handleAvatarClick = () => {
        avatarInputRef.current?.click();
    }

    return (
        <div className='mt-[16vh]'>
            <form className='flex flex-col items-center gap-5'>
                <div>
                    <div onClick={handleAvatarClick} className='flex relative w-fit cursor-pointer'>
                        <img src={avatar} alt="avatar" className='h-20'/>
                        <img src={uploadLogo} alt="upload-logo" className='bg-gray-100 rounded-[6px] h-5 absolute right-0 bottom-0'/>
                    </div>
                    <input ref={avatarInputRef} onChange={handleAvatarChange} type='file' className='hidden'/>
                </div>
                <div className='flex flex-col gap-2'>
                    <div>
                        <label htmlFor="username">
                            Username:
                            <input type="text" placeholder='enter username' className='border-2 rounded-[10px] w-40 ml-2 pl-2'/>
                        </label>
                    </div>
                    <div className='w-90 flex flex-row gap-2 items-start'>
                        <label htmlFor="gender">
                            Gender:
                        </label>
                        <OptionsSelector options={genderOptions} onChange={setGender}/>
                    </div>
                    <div>
                        <label htmlFor="birthday">
                            Date of Birth:
                            <input type="date" className='ml-2'/>
                        </label>
                    </div>
                </div>
                <button type='submit' className='border-2 bg-[#FFC457] rounded-2xl px-8'>Continue</button>
            </form>
            
        </div>
    );
}