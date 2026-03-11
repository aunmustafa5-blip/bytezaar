'use client';
import { useEffect } from 'react';

export default function ScrollReveal({ children }) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const elements = document.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));

        // Smooth Scroll Parallax Engine (Lerp)
        let frameId;
        let currentY = 0;
        let targetY = 0;

        const onScroll = () => {
            targetY = window.scrollY;
        };

        const updateScroll = () => {
            currentY += (targetY - currentY) * 0.08;

            if (Math.abs(targetY - currentY) > 0.1) {
                document.documentElement.style.setProperty('--scroll-y', `${currentY}px`);
                document.documentElement.style.setProperty('--scroll-y-raw', `${targetY}px`);
            }
            frameId = requestAnimationFrame(updateScroll);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        frameId = requestAnimationFrame(updateScroll);

        // Initial set
        targetY = window.scrollY;
        currentY = window.scrollY;
        document.documentElement.style.setProperty('--scroll-y', `${currentY}px`);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return children;
}
