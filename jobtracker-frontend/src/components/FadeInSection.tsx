import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

export default function FadeInSection({children}: {children: ReactNode}) {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    const belowViewport = (el: HTMLDivElement) => {
        const rect = el.getBoundingClientRect();
        
        return rect.top > window.innerHeight;
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                setIsVisible(entry.isIntersecting);
            })
        }, {threshold: 0.1});

        if(domRef.current && !belowViewport(domRef.current)) {
            setIsVisible(true);
            return;
        }

        if(domRef.current && belowViewport(domRef.current)) {
            observer.observe(domRef.current);
        }

        return ()=> {
            if(domRef.current && belowViewport(domRef.current)) {
                observer.unobserve(domRef.current);
            }
        }
    },[]);


    return <div ref={domRef} 
    style={{
        opacity: isVisible ? 1 : 0, 
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'}}>
        {children}
    </div>

};