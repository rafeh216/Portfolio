import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import CustomCursor from '@/components/CustomCursor';
import PageTransition from '@/components/PageTransition';

const description = 'Abdul Rafay Abbasi is a Full Stack Developer creating thoughtful, reliable web applications with modern frontend and backend technologies.';
const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abdul Rafay Abbasi',
    jobTitle: 'Full Stack Developer',
    email: 'abbasirafay64@gmail.com',
    telephone: '+92 317 050 0728',
    url: 'https://github.com/rafeh216',
    sameAs: [
        'https://github.com/rafeh216',
        'https://www.linkedin.com/in/abdul-rafay-abbasi-b257273aa/',
    ],
};

export const metadata: Metadata = {
    title: 'Abdul Rafay Abbasi | Full Stack Developer',
    description,
    openGraph: {
        title: 'Abdul Rafay Abbasi | Full Stack Developer',
        description,
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Abdul Rafay Abbasi | Full Stack Developer',
        description,
    },
    icons: { icon: '/favicon.svg' },
};

const setInitialTheme = `
try {
    var saved = localStorage.getItem('theme');
    var preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.dataset.theme = saved || preferred;
} catch (_) {
    document.documentElement.dataset.theme = 'dark';
}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>
                <CustomCursor />
                <PageTransition />
                <LenisProvider>{children}</LenisProvider>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
            </body>
        </html>
    );
}
