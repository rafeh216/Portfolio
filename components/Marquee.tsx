'use client';

interface MarqueeProps {
    children: React.ReactNode;
    speed?: number;
    direction?: 'left' | 'right';
    className?: string;
}

export default function Marquee({ children, speed = 30, direction = 'left', className = '' }: MarqueeProps) {
    const animationDirection = direction === 'left' ? 'marquee-left' : 'marquee-right';
    
    return (
        <div className={`marquee-container ${className}`}>
            <div 
                className="marquee-track" 
                style={{ animationDuration: `${speed}s`, animationName: animationDirection }}
            >
                <div className="marquee-content">{children}</div>
                <div className="marquee-content" aria-hidden="true">{children}</div>
            </div>
        </div>
    );
}
