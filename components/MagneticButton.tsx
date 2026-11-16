'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { useRef } from 'react';
import { gsap } from 'gsap';

type MagneticButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode };

export default function MagneticButton({ children, className = '', ...props }: MagneticButtonProps) {
    const ref = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current || window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;
        const bounds = ref.current.getBoundingClientRect();
        const x = event.clientX - bounds.left - bounds.width / 2;
        const y = event.clientY - bounds.top - bounds.height / 2;
        gsap.to(ref.current, { x: x * 0.16, y: y * 0.16, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
        if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.35, ease: 'power2.out' });
    };

    return (
        <a
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
        </a>
    );
}
