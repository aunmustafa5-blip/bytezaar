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

    return (
        <div className={`${styles.loadingContainer} ${fadeOut ? styles.fadeOut : ''}`}>
            <video
                src="/loading.mp4"
                autoPlay
                muted
                loop
                playsInline
                className={styles.loadingVideo}
            />
        </div>
    );
}
