'use client';
import { categories } from '@/lib/data';
import Link from 'next/link';
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
        const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * -6; /* slightly less tilt for smaller cards */
        const tiltY = ((e.clientX - centerX) / (rect.width / 2)) * 6;
        card.style.setProperty('--rotate-x', `${tiltX}deg`);
        card.style.setProperty('--rotate-y', `${tiltY}deg`);
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.setProperty('--rotate-x', `0deg`);
        card.style.setProperty('--rotate-y', `0deg`);
    };

    return (
        <section className="section parallax-slow" id="categories">
            <div className="container">
                <h2 className="section-title">Browse Categories</h2>
                <p className="section-subtitle">
                    Find exactly what you need from our curated collections
                </p>
                <div className={styles.grid}>
                    {categories.map(cat => (
                        <Link
                            href="/shop"
                            key={cat.id}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div
                                className={styles.categoryCard}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className={styles.categoryIcon}>{cat.icon}</span>
                                <h3 className={styles.categoryName}>{cat.name}</h3>
                                <p className={styles.categoryCount}>{cat.count} Products</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
