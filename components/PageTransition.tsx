'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PageTransition() {
    const curtainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!curtainRef.current) return;
        
        gsap.to(curtainRef.current, {
            scaleY: 0,
            duration: 1.5,
            ease: 'power4.inOut',
            delay: 0.2
        });
    }, []);

    return <div ref={curtainRef} className="page-curtain"></div>;
}
