'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}

export default function ScrollReveal({ 
    children, 
    direction = 'up', 
    delay = 0, 
    duration = 1,
    className = '',
    as: Tag = 'div' 
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;

        const directionMap = {
            up: { y: 60, x: 0 },
            down: { y: -60, x: 0 },
            left: { y: 0, x: -60 },
            right: { y: 0, x: 60 },
        };

        const { x, y } = directionMap[direction];

        gsap.fromTo(el, 
            { opacity: 0, x, y },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration,
                delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === el) t.kill();
            });
        };
    }, [direction, delay, duration]);

    return <div ref={ref} className={className}>{children}</div>;
}
