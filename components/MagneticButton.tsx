'use client';
import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    as?: 'a' | 'button';
    href?: string;
    target?: string;
    rel?: string;
}

export default function MagneticButton({ children, className = '', as = 'button', ...props }: MagneticButtonProps) {
    const ref = useRef<HTMLElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(ref.current, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: 'power2.out',
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (!ref.current) return;
        gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: 'elastic.out(1, 0.3)',
        });
    }, []);

    const Tag = as as any;
    return (
        <Tag
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
        </Tag>
    );
}
