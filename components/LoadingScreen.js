'use client';

import { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setIsLoading(false), 800);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    return (
        <div className={`${styles.loadingContainer} ${fadeOut ? styles.fadeOut : ''}`}>
            <video
                src={`${basePath}/loading.mp4`}
                autoPlay
                muted
                loop
                playsInline
                className={styles.loadingVideo}
            />
        </div>
    );
}
