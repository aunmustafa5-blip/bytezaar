import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import BackgroundManager from '@/components/BackgroundManager';
import { StoreProvider } from '@/context/StoreContext';

const displayFont = Syne({
    subsets: ['latin'],
    weight: ['700', '800'],
    variable: '--font-display',
    display: 'swap',
});

const bodyFont = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-body',
    display: 'swap',
});

const monoFont = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '500'],
    variable: '--font-mono',
    display: 'swap',
});

export const metadata = {
    title: 'Bytezaar — Premium Tech Accessories',
    icons: {
        icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/bytezaar-logo.png`,
    },
    description: 'Upgrade your tech experience with premium headphones, keyboards, mice, projectors and more. Bytezaar delivers quality that speaks for itself.',
    keywords: 'tech accessories, headphones, keyboards, mouse, projectors, gaming, premium',
};


export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
            <head>
                <script src="https://accounts.google.com/gsi/client" async defer></script>
            </head>
            <body>
                <StoreProvider>
                    <LoadingScreen />
                    <BackgroundManager />
                    <Header />
                    <main style={{ paddingTop: 0 }}>
                        {children}
                    </main>
                    <Footer />
                </StoreProvider>
            </body>
        </html>
    );
}
