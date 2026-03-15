'use client';
import { categories } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './Categories.module.css';

export default function Categories() {
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Subtle tilt for the bento items
        const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * -4; 
        const tiltY = ((e.clientX - centerX) / (rect.width / 2)) * 4;
        card.style.setProperty('--rotate-x', `${tiltX}deg`);
        card.style.setProperty('--rotate-y', `${tiltY}deg`);
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.setProperty('--rotate-x', `0deg`);
        card.style.setProperty('--rotate-y', `0deg`);
    };

    return (
        <section className="section" id="categories">
            <div className="container">
                <h2 className={`section-title display-font ${styles.title}`}>Shop by Category</h2>
                <div className={styles.grid}>
                    {categories.map((cat, index) => (
                        <Link
                            href="/shop"
                            key={cat.id}
                            className={`${styles.categoryCard} ${index === 0 ? styles.largeCard : ''}`}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    width={index === 0 ? 600 : 300}
                                    height={index === 0 ? 600 : 300}
                                    className={styles.bgImage}
                                    priority={index === 0}
                                />
                                <div className={styles.overlay} />
                            </div>
                            
                            <div className={styles.textContent}>
                                <h3 className={styles.categoryName}>{cat.name}</h3>
                                <p className={styles.categoryCount}>{cat.count} Products</p>
                                <div className={styles.shopLink}>
                                    Shop Collection <ArrowRight size={16} className={styles.arrowIcon} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
