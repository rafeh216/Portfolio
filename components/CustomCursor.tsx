'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (
            !cursor ||
            !window.matchMedia('(pointer: fine)').matches ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) return;

        document.documentElement.classList.add('has-custom-cursor');
        const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3' });
        const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3' });
        const handleMove = (event: MouseEvent) => {
            xTo(event.clientX);
            yTo(event.clientY);
        };
        const handleOver = (event: Event) => {
            if ((event.target as Element).closest('a, button, input, textarea')) cursor.classList.add('hover');
        };
        const handleOut = (event: Event) => {
            if ((event.target as Element).closest('a, button, input, textarea')) cursor.classList.remove('hover');
        };

        cursor.style.opacity = '1';
        window.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseover', handleOver);
        document.addEventListener('mouseout', handleOut);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseover', handleOver);
            document.removeEventListener('mouseout', handleOut);
            document.documentElement.classList.remove('has-custom-cursor');
        };
    }, []);

    return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
