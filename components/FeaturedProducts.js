'use client';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';
import { Star, Heart } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import styles from './FeaturedProducts.module.css';

export default function FeaturedProducts() {
    const featured = products.filter(p => p.badge).slice(0, 3);
    const { addToCart, formatPrice } = useStore();

    const getBadgeClass = (badge) => {
        const b = badge.toLowerCase();
        if (b.includes('new')) return styles.badgeNew;
        if (b.includes('sale')) return styles.badgeSale;
        return styles.badgeBestSeller;
    };

    const handleAddToCart = (e, product) => {
        e.preventDefault(); // prevent the absolute link from firing
        addToCart(product, 1);
        // We could add a micro-toast here if desired
    };

    return (
        <section className="section" id="featured" style={{ background: 'transparent', padding: '80px 0' }}>
            <div className="container">
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <h2 className="section-title" style={{ color: '#F7FAFC' }}>Featured Selection</h2>
                    <p className="section-subtitle" style={{ color: '#718096', maxWidth: '600px', margin: '10px auto 0' }}>
                        Curated performance hardware for professionals and enthusiasts.
                    </p>
                </div>
                
                <div className={styles.grid}>
                    {featured.map(product => {
                        const savings = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
                        
                        return (
                            <div key={product.id} className={styles.card}>
                                {/* Image Layer */}
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className={styles.imageLayer}
                                    />
                                    <div className={styles.gradientOverlay} />
                                </div>

                                {/* Top Row: Badges & Wishlist */}
                                <div className={styles.topRow}>
                                    <div>
                                        {product.badge && (
                                            <span className={`${styles.badge} ${getBadgeClass(product.badge)}`}>
                                                {product.badge}
                                            </span>
                                        )}
                                    </div>
                                    <button className={styles.wishlistBtn} aria-label="Add to wishlist" onClick={(e) => e.preventDefault()}>
                                        <Heart size={16} />
                                    </button>
                                </div>

                                {/* Bottom Content: Info & Reveal */}
                                <div className={styles.bottomContent}>
                                    <span className={styles.categoryLabel}>{product.category}</span>
                                    <h3 className={styles.productName}>{product.name}</h3>
                                    
                                    <div className={styles.ratingRow}>
                                        <div style={{ display: 'flex', gap: '2px', color: '#F6AD55' }}>
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <Star
                                                    key={i}
                                                    size={11}
                                                    fill={i < Math.floor(product.rating) ? "#F6AD55" : "none"}
                                                    strokeWidth={i < Math.floor(product.rating) ? 0 : 2}
                                                />
                                            ))}
                                        </div>
                                        <span className={styles.reviewCount}>{product.reviews} reviews</span>
                                    </div>

                                    <div className={styles.priceRow}>
                                        <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
                                        {product.originalPrice && (
                                            <>
                                                <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
                                                <span className={styles.savingsPill}>-{savings}%</span>
                                            </>
                                        )}
                                    </div>

                                    {/* Reveal on Hover */}
                                    <p className={styles.shortSpec}>
                                        {product.description.split('.')[0]}.
                                    </p>

                                    <button className={styles.ctaButton} onClick={(e) => handleAddToCart(e, product)}>
                                        Add to Cart
                                    </button>
                                </div>

                                <Link 
                                    href={`/product/${product.id}`} 
                                    className="abs-link" 
                                    style={{ position: 'absolute', inset: 0, zIndex: 3 }}
                                    aria-label={`View ${product.name}`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

