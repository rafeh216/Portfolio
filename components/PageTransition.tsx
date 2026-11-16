'use client';

import { useEffect, useState } from 'react';

export default function PageTransition() {
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 100 : 680;
        const timer = window.setTimeout(() => setIsDone(true), delay);
        return () => window.clearTimeout(timer);
    }, []);

    return <div className={`preloader ${isDone ? 'is-done' : ''}`} aria-hidden="true"><span>AR</span></div>;
}
