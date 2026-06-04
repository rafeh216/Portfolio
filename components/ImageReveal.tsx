'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImageReveal({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const blockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !blockRef.current) return;
        
        gsap.to(blockRef.current, {
            scaleX: 0,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });
    }, []);

    return (
        <div ref={containerRef} className="reveal-wrapper">
            <div ref={blockRef} className="reveal-block"></div>
            {children}
        </div>
    );
}
