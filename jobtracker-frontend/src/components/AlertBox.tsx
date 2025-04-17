import { useEffect, useRef, useState } from 'react'

interface AlertBoxProps {
    leftButton: string;
    rightButton: string;
    dialogue: string;
    clickLeft: () => void;
    clickRight: () => void;
}

const AlertBox = ({ leftButton, rightButton, dialogue, clickLeft, clickRight }: AlertBoxProps) => {
    const boxRef = useRef<HTMLDivElement>(null);
    const [windowSize, setWindowSize] = useState({width: 0, height: 0});
    const [boxWidth, setBoxWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({width: window.innerWidth, height: window.innerHeight});
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        if(boxRef.current) {
            const rect = boxRef.current.getBoundingClientRect();
            setBoxWidth(rect.width);
            boxRef.current.style.top = `${(windowSize.height-rect.height)/2}px`;
            boxRef.current.style.left = `${(windowSize.width-rect.width)/2}px`;
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    },[windowSize]);

  return (
    <div className='fixed z-30 top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
        <div ref={boxRef} className={`fixed border-3 border-secondary rounded-[10px] bg-gray-100 flex flex-col gap-7 py-3 items-center text-center`}>
            <p style={{width: `${boxWidth*7/8}px`}} className={``}>{dialogue}</p>
            <div className='flex flex-row justify-between px-8 gap-16'>
                <button onClick={clickLeft} className='border-2 px-1 rounded-[5px] hover:bg-primary'>{leftButton}</button>
                <button onClick={clickRight} className='border-2 px-1 rounded-[5px] hover:bg-red-300'>{rightButton}</button>
            </div>
        </div>
    </div>
  )
}

export default AlertBox;