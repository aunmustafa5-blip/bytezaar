import { reviews } from '@/lib/data';
import { Star } from 'lucide-react';
import styles from './Reviews.module.css';

export default function Reviews() {
    const doubled = [...reviews, ...reviews];

    return (
        <section className="section" id="reviews">
            <div className="container">
                <h2 className="section-title">What Our Customers Say</h2>
                <p className="section-subtitle">
                    Real reviews from real tech enthusiasts
                </p>
            </div>
            <div className={styles.marqueeWrapper}>
                <div className={styles.marqueeTrack}>
                    {doubled.map((review, i) => (
                        <div key={`${review.id}-${i}`} className={styles.reviewCard}>
                            <div className={styles.reviewHeader}>
                                <div className={styles.avatar}>{review.avatar}</div>
                                <div className={styles.reviewerInfo}>
                                    <h4>{review.name}</h4>
                                    <p>{review.product}</p>
                                </div>
                            </div>
                            <div className={styles.reviewStars}>
                                {Array.from({ length: 5 }, (_, j) => (
                                    <span key={j}>
                                        <Star
                                            size={14}
                                            fill={j < review.rating ? "currentColor" : "none"}
                                            strokeWidth={j < review.rating ? 0 : 2}
                                            color="currentColor"
                                        />
                                    </span>
                                ))}
                            </div>
                            <p className={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
