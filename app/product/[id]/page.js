import { products, categories, reviews } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ChevronLeft, Minus, Plus } from 'lucide-react';
import styles from './Product.module.css';

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id.toString(),
    }));
}

export default async function ProductPage({ params }) {
    const { id } = await params;
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Product not found</h1>
                <Link href="/shop" className="btn btn-primary">Return to Shop</Link>
            </div>
        );
    }

    const matchedReviews = reviews.filter(r => r.product === product.name);
    const recommended = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

    return (
        <main className={styles.productPage}>
            <div className="container">
                <Link href="/shop" className={styles.backLink}>
                    <ChevronLeft size={20} /> Back to Shop
                </Link>

                <div className={styles.productLayout}>
                    {/* Image Gallery Mock */}
                    <div className={styles.imageGallery}>
                        <div className={styles.mainImage}>
                            {product.badge && <span className={styles.badge}>{product.badge}</span>}
                            <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain', padding: '2rem' }} />
                        </div>
                        <div className={styles.thumbnails}>
                            <div className={styles.thumbActive}>
                                <Image src={product.image} alt="Thumbnail 1" fill style={{ objectFit: 'contain' }} />
                            </div>
                            <div className={styles.thumb}>
                                <Image src={product.image} alt="Thumbnail 2" fill style={{ objectFit: 'contain', filter: 'brightness(0.7)' }} />
                            </div>
                            <div className={styles.thumb}>
                                <Image src={product.image} alt="Thumbnail 3" fill style={{ objectFit: 'contain', filter: 'brightness(0.7)' }} />
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className={styles.productDetails}>
                        <p className={styles.category}>{product.category}</p>
                        <h1 className={styles.title}>{product.name}</h1>

                        <div className={styles.ratingRow}>
                            <div className="stars">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i}>
                                        <Star size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(product.rating) ? 0 : 2} color="#FFD700" />
                                    </span>
                                ))}
                            </div>
                            <span className={styles.ratingText}>{product.rating} ({product.reviews} reviews)</span>
                        </div>

                        <div className={styles.priceRow}>
                            <span className={styles.price}>${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                                <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
                            )}
                        </div>

                        <p className={styles.description}>{product.description}</p>
                        <p className={styles.extendedDesc}>
                            Experience unparalleled quality with the {product.name}. Designed for premium performance and
                            crafted from high-grade materials, this product integrates seamlessly into your digital lifestyle.
                            Features pristine aesthetics wrapped in an Apple-inspired Liquid Glass enclosure.
                        </p>

                        <div className={styles.actions}>
                            <div className={styles.quantity}>
                                <button className={styles.qtyBtn}><Minus size={16} /></button>
                                <span>1</span>
                                <button className={styles.qtyBtn}><Plus size={16} /></button>
                            </div>
                            <button className={`btn btn-primary ${styles.addToCartBtn}`}>
                                Add to Cart
                            </button>
                        </div>

                        <div className={styles.shippingInfo}>
                            <p><strong>Free Shipping</strong> on orders over $50</p>
                            <p><strong>30-Day Returns</strong> - No questions asked</p>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className={styles.reviewsSection}>
                    <div className={styles.reviewsHeader}>
                        <h2>Customer Reviews</h2>
                        <button className="btn btn-secondary">Write a Review</button>
                    </div>

                    {matchedReviews.length > 0 ? (
                        <div className={styles.reviewsGrid}>
                            {matchedReviews.map(r => (
                                <div key={r.id} className={styles.reviewCard}>
                                    <div className={styles.reviewTop}>
                                        <div className={styles.avatar}>{r.avatar}</div>
                                        <div>
                                            <p className={styles.reviewerName}>{r.name}</p>
                                            <p className={styles.reviewDate}>{r.date}</p>
                                        </div>
                                    </div>
                                    <div className="stars" style={{ marginBottom: '8px' }}>
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <Star key={i} size={14} fill={i < r.rating ? "currentColor" : "none"} color="#FFD700" strokeWidth={i < r.rating ? 0 : 2} />
                                        ))}
                                    </div>
                                    <p className={styles.reviewText}>{r.text}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.noReviews}>Be the first to review this product!</p>
                    )}
                </div>

                {/* Recommendations */}
                {recommended.length > 0 && (
                    <div className={styles.recommendations}>
                        <h2>You Might Also Like</h2>
                        <div className={styles.recGrid}>
                            {recommended.map(product => (
                                <Link href={`/product/${product.id}`} key={product.id} className={styles.recCard}>
                                    <div className={styles.recImageWrapper}>
                                        <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain' }} />
                                    </div>
                                    <div className={styles.recInfo}>
                                        <p className={styles.recCategory}>{product.category}</p>
                                        <h3 className={styles.recName}>{product.name}</h3>
                                        <p className={styles.recPrice}>${product.price.toFixed(2)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
