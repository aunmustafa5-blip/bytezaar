'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Star, ChevronLeft, Minus, Plus, CheckCircle, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import styles from './Product.module.css';

export default function ProductClient({ product, matchedReviews, recommended }) {
    const { addToCart, formatPrice, user } = useStore();
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, text: '' });

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert('Please login to write a review');
        
        setReviewLoading(true);
        try {
            const { submitReview } = await import('@/lib/sheets-api');
            await submitReview({
                productId: product.id,
                product: product.name,
                name: user.name,
                rating: newReview.rating,
                text: newReview.text,
                date: new Date().toLocaleDateString()
            });
            alert('Review submitted for approval!');
            setShowReviewForm(false);
            setNewReview({ rating: 5, text: '' });
        } catch (err) {
            console.error(err);
            alert('Failed to submit review');
        } finally {
            setReviewLoading(false);
        }
    };

    return (
        <main className={styles.productPage}>
            {/* Success Toast */}
            <div className={`${styles.toast} ${showToast ? styles.show : ''}`}>
                <CheckCircle size={18} />
                <span>Added {quantity} item{quantity > 1 ? 's' : ''} to cart</span>
            </div>

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
                            <span className={styles.price}>{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                                <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
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
                                <button 
                                    className={styles.qtyBtn}
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    <Minus size={16} />
                                </button>
                                <span>{quantity}</span>
                                <button 
                                    className={styles.qtyBtn}
                                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <button 
                                className={`btn btn-primary ${styles.addToCartBtn}`}
                                onClick={handleAddToCart}
                            >
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
                        <button 
                            className="btn btn-secondary"
                            onClick={() => user ? setShowReviewForm(true) : alert('Please login to write a review')}
                        >
                            Write a Review
                        </button>
                    </div>

                    {showReviewForm && (
                        <div className={styles.reviewFormOverlay}>
                            <div className={styles.reviewFormCard}>
                                <button className={styles.closeBtn} onClick={() => setShowReviewForm(false)}><X size={20}/></button>
                                <h3>Write a Review</h3>
                                <form onSubmit={handleReviewSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">Rating</label>
                                        <div className={styles.starInput}>
                                            {[1,2,3,4,5].map(star => (
                                                <Star 
                                                    key={star} 
                                                    size={24} 
                                                    fill={star <= newReview.rating ? "#FFD700" : "none"} 
                                                    color="#FFD700"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setNewReview({...newReview, rating: star})}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Your Review</label>
                                        <textarea 
                                            className="form-input" 
                                            rows="4" 
                                            required 
                                            value={newReview.text}
                                            onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                                            placeholder="What did you like or dislike about this product?"
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={reviewLoading}>
                                        {reviewLoading ? 'Submitting...' : 'Post Review'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

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
                            {recommended.map(item => (
                                <Link href={`/product/${item.id}`} key={item.id} className={styles.recCard}>
                                    <div className={styles.recImageWrapper}>
                                        <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain' }} />
                                    </div>
                                    <div className={styles.recInfo}>
                                        <p className={styles.recCategory}>{item.category}</p>
                                        <h3 className={styles.recName}>{item.name}</h3>
                                        <p className={styles.recPrice}>{formatPrice(item.price)}</p>
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
