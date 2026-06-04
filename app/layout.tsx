import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import CustomCursor from '@/components/CustomCursor';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
    title: 'Abdul Rafay Abbasi — Full Stack Developer',
    description: 'Portfolio of Abdul Rafay Abbasi — Premium Creative Agency Aesthetic.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>
                <CustomCursor />
                <PageTransition />
                <LenisProvider>
                    {children}
                </LenisProvider>
            </body>
        </html>
    );
}
