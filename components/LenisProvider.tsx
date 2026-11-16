'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
        });

        // Keep GSAP ScrollTrigger in sync with Lenis scroll
        const updateScrollTrigger = () => ScrollTrigger.update();
        lenis.on('scroll', updateScrollTrigger);

        const updateLenis = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(updateLenis);

        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(updateLenis);
            lenis.off('scroll', updateScrollTrigger);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
