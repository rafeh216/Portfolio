'use client';

import { useEffect, useRef } from 'react';

export default function HeroParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const particles = Array.from({ length: 38 }, () => ({
            x: Math.random(),
            y: Math.random(),
            radius: Math.random() * 1.4 + 0.5,
            speed: (Math.random() * 0.00008 + 0.000025) * (Math.random() > 0.5 ? 1 : -1),
        }));
        let frame = 0;
        let width = 0;
        let height = 0;

        const resize = () => {
            const bounds = canvas.getBoundingClientRect();
            const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
            width = bounds.width;
            height = bounds.height;
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            if (reducedMotion) draw();
        };

        const draw = () => {
            context.clearRect(0, 0, width, height);
            particles.forEach((particle, index) => {
                if (!reducedMotion) {
                    particle.x += particle.speed;
                    if (particle.x > 1.02) particle.x = -0.02;
                    if (particle.x < -0.02) particle.x = 1.02;
                }
                const x = particle.x * width;
                const y = particle.y * height;
                context.beginPath();
                context.arc(x, y, particle.radius, 0, Math.PI * 2);
                context.fillStyle = 'rgba(166, 196, 180, 0.52)';
                context.fill();

                for (let next = index + 1; next < particles.length; next += 1) {
                    const dx = x - particles[next].x * width;
                    const dy = y - particles[next].y * height;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 110) {
                        context.beginPath();
                        context.moveTo(x, y);
                        context.lineTo(particles[next].x * width, particles[next].y * height);
                        context.strokeStyle = `rgba(166, 196, 180, ${(1 - distance / 110) * 0.08})`;
                        context.stroke();
                    }
                }
            });
        };

        const animate = () => {
            draw();
            frame = window.requestAnimationFrame(animate);
        };
        resize();
        if (!reducedMotion) frame = window.requestAnimationFrame(animate);
        window.addEventListener('resize', resize);

        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas className="hero-particles" ref={canvasRef} aria-hidden="true" />;
}
