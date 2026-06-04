'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ScrollTrigger.refresh();
        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return <div ref={wrapperRef}>{children}</div>;
}
