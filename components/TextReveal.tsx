'use client';

import { Fragment, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    children: string;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    className?: string;
    delay?: number;
}

export default function TextReveal({ children, as: Tag = 'h2', className = '', delay = 0 }: TextRevealProps) {
    const visualRef = useRef<HTMLSpanElement>(null);
    const words = children.trim().split(/\s+/);

    useEffect(() => {
        const visual = visualRef.current;
        if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const tween = gsap.fromTo(
            visual.querySelectorAll('.text-reveal-inner'),
            { yPercent: 120 },
            {
                yPercent: 0,
                duration: 0.9,
                stagger: 0.08,
                delay,
                ease: 'power3.out',
                scrollTrigger: { trigger: visual, start: 'top 88%', toggleActions: 'play none none none' },
            },
        );
        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, [children, delay]);

    return (
        <Tag className={className} aria-label={children}>
            <span className="text-reveal-visual" ref={visualRef} aria-hidden="true">
                {words.map((word, index) => (
                    <Fragment key={`${word}-${index}`}>
                        <span className="text-reveal-word"><span className="text-reveal-inner">{word}</span></span>
                        {index < words.length - 1 ? ' ' : null}
                    </Fragment>
                ))}
            </span>
        </Tag>
    );
}
