import { useState } from "react";


export const ToggleSwitch = ({ initialState=false ,onChange }: { initialState: boolean, onChange: (s: boolean) => void }) => {
    const [isChecked, setIsChecked] = useState(initialState);

    const handleToggle = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        if(onChange) {
            onChange(newState);
        }
    };

  return (
        <button type="button" role="switch" aria-checked={isChecked} onClick={handleToggle} className={` h-5 w-9 rounded-full px-[3px] py-[2px] transition-colors duration-300 ${isChecked ? 'bg-primary' :'bg-gray-300'}`}>
            <span className={`block bg-gray-100 rounded-full h-4 w-4 transition-transform duration-300 ${isChecked ? 'translate-x-3.5' : ''}`}></span>
        </button>
  )
};
