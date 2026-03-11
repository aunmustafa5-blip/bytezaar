'use client';

import { usePathname } from 'next/navigation';
import KeyboardCanvas from './KeyboardCanvas';
import AltCanvas from './AltCanvas';

export default function BackgroundManager() {
    const pathname = usePathname();

    if (pathname === '/') {
        return <KeyboardCanvas />;
    }

    return <AltCanvas />;
}
