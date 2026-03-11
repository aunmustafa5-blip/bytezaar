import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import BackgroundManager from '@/components/BackgroundManager';

export const metadata = {
    title: 'Bytezaar — Premium Tech Accessories',
    icons: {
        icon: '/images/bytezaar-logo.png',
    },
    description: 'Upgrade your tech experience with premium headphones, keyboards, mice, projectors and more. Bytezaar delivers quality that speaks for itself.',
    keywords: 'tech accessories, headphones, keyboards, mouse, projectors, gaming, premium',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <LoadingScreen />
                <BackgroundManager />
                <Header />
                <main style={{ paddingTop: 0 }}>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
