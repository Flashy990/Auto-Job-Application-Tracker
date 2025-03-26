import { useState } from "react";

interface OptionsSelectorProps {
  options: string[];
  onChange: (value: string) => void;
}

const OptionsSelector = ({ options, onChange }: OptionsSelectorProps) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleClick = (option: string) => {
    setSelectedOption(option);
    if(onChange) {
      onChange(option);
    }
  }
  
  return (
    <div className="flex flex-wrap items-center gap-3">
        {options.map((option, index) => {
            return (
            <div key={index} onClick={() => handleClick(option)} className="flex flex-row items-center gap-1">
                <div className="rounded-full border-2 h-3 w-3">
                    {selectedOption === option ? <div className="bg-primary h-2 w-2 rounded-full"></div> : ''}
                </div>
                {option}
            </div>
            )
        })}
    </div>
  );
};

export default OptionsSelector;