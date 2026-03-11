'use client';
import { useEffect, useRef, useState } from 'react';

const FRAME_START = 1;
const FRAME_END = 300;
const TOTAL_FRAMES = FRAME_END - FRAME_START + 1; // 300

export default function AltCanvas() {
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const currentFrameRef = useRef(0);
    const rafRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawFrame(currentFrameRef.current);
        };

        // Preload all images
        let loadedCount = 0;
        const images = [];
        for (let i = FRAME_START; i <= FRAME_END; i++) {
            const img = new Image();
            const num = String(i).padStart(3, '0');
            img.src = `/bg-frames/ezgif-frame-${num}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) {
                    setLoaded(true);
                    drawFrame(0);
                }
            };
            images.push(img);
        }
        imagesRef.current = images;

        function drawFrame(index) {
            const img = imagesRef.current[index];
            if (!img || !img.complete || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Cover-fit the image
            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;
            const scale = Math.max(cw / iw, ch / ih);
            const dw = iw * scale;
            const dh = ih * scale;
            const dx = (cw - dw) / 2;
            const dy = (ch - dh) / 2;
            ctx.drawImage(img, dx, dy, dw, dh);
        }

        function onScroll() {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollFraction = Math.min(Math.max(scrollTop / docHeight, 0), 1);
                const frameIndex = Math.min(
                    Math.floor(scrollFraction * TOTAL_FRAMES),
                    TOTAL_FRAMES - 1
                );
                if (frameIndex !== currentFrameRef.current) {
                    currentFrameRef.current = frameIndex;
                    drawFrame(frameIndex);
                }
            });
        }

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: loaded ? 0.3 : 0,
                transition: 'opacity 1s ease',
            }}
        />
    );
}
