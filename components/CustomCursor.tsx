'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        if ('ontouchstart' in window) {
            cursor.style.display = 'none';
            return;
        }

        const xTo = gsap.quickTo(cursor, 'x', { duration: 0.2, ease: 'power3' });
        const yTo = gsap.quickTo(cursor, 'y', { duration: 0.2, ease: 'power3' });

        const handleMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const handleMouseEnter = () => cursor.classList.add('hover');
        const handleMouseLeave = () => cursor.classList.remove('hover');

        window.addEventListener('mousemove', handleMouseMove);

        const attachHoverListeners = () => {
            const clickables = document.querySelectorAll('a, button, .accordion-header, .portfolio-item, .giant-email');
            clickables.forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        const timeoutId = setTimeout(attachHoverListeners, 1000);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('mousemove', handleMouseMove);
            const clickables = document.querySelectorAll('a, button, .accordion-header, .portfolio-item, .giant-email');
            clickables.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return <div ref={cursorRef} className="custom-cursor"></div>;
}
