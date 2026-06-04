'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    children: string;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    className?: string;
    delay?: number;
    splitBy?: 'words' | 'chars';
}

export default function TextReveal({ children, as: Tag = 'h2', className = '', delay = 0, splitBy = 'words' }: TextRevealProps) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        const text = el.textContent || '';
        
        let items: string[];
        if (splitBy === 'chars') {
            items = text.split('');
        } else {
            items = text.split(' ');
        }
        
        el.innerHTML = items.map(item => 
            `<span class="text-reveal-word" style="display:inline-block;overflow:hidden;"><span class="text-reveal-inner" style="display:inline-block;transform:translateY(120%);">${item === ' ' ? '&nbsp;' : item}</span></span>`
        ).join(splitBy === 'chars' ? '' : '&nbsp;');

        const inners = el.querySelectorAll('.text-reveal-inner');
        
        gsap.to(inners, {
            y: 0,
            duration: 1,
            stagger: 0.04,
            ease: 'power3.out',
            delay,
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === el) t.kill();
            });
        };
    }, [children, delay, splitBy]);

    return <Tag ref={ref as any} className={className}>{children}</Tag>;
}
