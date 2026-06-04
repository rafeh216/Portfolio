import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import CustomCursor from '@/components/CustomCursor';
import PageTransition from '@/components/PageTransition';
import GoToTop from '@/components/GoToTop';

export const metadata: Metadata = {
    title: 'Abdul Rafay',
    description: 'Portfolio of Abdul Rafay Abbasi — Premium Creative Agency Aesthetic.',
    icons: {
        icon: '/images/AR logo.jpeg',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/images/AR logo.jpeg" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>
                <CustomCursor />
                <PageTransition />
                <LenisProvider>
                    {children}
                </LenisProvider>
                <GoToTop />
            </body>
        </html>
    );
}
