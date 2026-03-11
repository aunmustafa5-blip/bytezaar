'use client';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';
import { Star } from 'lucide-react';
import styles from './FeaturedProducts.module.css';

export default function FeaturedProducts() {
    const featured = products.filter(p => p.badge).slice(0, 4);

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();

        // Dynamic Glow
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);

        // 3D Tilt
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * -8;
        const tiltY = ((e.clientX - centerX) / (rect.width / 2)) * 8;
        card.style.setProperty('--rotate-x', `${tiltX}deg`);
        card.style.setProperty('--rotate-y', `${tiltY}deg`);
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.setProperty('--rotate-x', `0deg`);
        card.style.setProperty('--rotate-y', `0deg`);
    };

    return (
        <section className="section parallax-slow" id="featured">
            <div className="container">
                <h2 className="section-title">Featured Products</h2>
                <p className="section-subtitle">
                    Discover our handpicked selection of premium tech accessories
                </p>
                <div className={styles.grid}>
                    {featured.map(product => (
                        <div
                            key={product.id}
                            className="product-card"
                            onMouseMove={handleMouseMove}
                        >
                            <div className="product-image-wrapper">
                                {product.badge && (
                                    <span className={styles.badge}>{product.badge}</span>
                                )}
                                <button className={styles.wishlistBtn} aria-label="Add to wishlist">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                                </button>
                                <Link href={`/product/${product.id}`} style={{ display: 'block', height: '100%', cursor: 'pointer' }}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={300}
                                        height={300}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Link>
                            </div>
                            <div className="product-info">
                                <p className="product-category">{product.category}</p>
                                <div className={styles.ratingRow}>
                                    <div className="stars">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <span key={i}>
                                                <Star
                                                    size={14}
                                                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                                    strokeWidth={i < Math.floor(product.rating) ? 0 : 2}
                                                    color="currentColor"
                                                />
                                            </span>
                                        ))}
                                    </div>
                                    <span className={styles.ratingText}>({product.reviews})</span>
                                </div>
                                <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <h3 className="product-name" style={{ cursor: 'pointer' }}>{product.name}</h3>
                                </Link>
                                <p className="product-price">
                                    ${product.price.toFixed(2)}
                                    {product.originalPrice && (
                                        <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
                                    )}
                                </p>
                                <button className={styles.addToCartBtn}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
