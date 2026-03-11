import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={`${styles.heroBg} parallax-bg`} />
            <div className={styles.heroContent}>
                <div className={`${styles.heroText} parallax-hero-layer`}>
                    <div className={styles.heroBadge}>
                        <span /> New Collection 2026
                    </div>
                    <h1 className={styles.heroTitle}>
                        Premium Tech<br />
                        Accessories <em>for<br />
                            Everyday</em> Performance
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Headphones, Keyboards, Mouse, Projectors & More
                    </p>
                    <div className={styles.heroCtas}>
                        <Link href="/shop" className="btn btn-primary btn-lg">
                            Shop Now
                        </Link>
                        <Link href="/#categories" className="btn btn-secondary btn-lg">
                            Explore Categories
                        </Link>
                    </div>
                    <div className={styles.heroStats}>
                        <div className={styles.stat}>
                            <h3>500+</h3>
                            <p>Products</p>
                        </div>
                        <div className={styles.stat}>
                            <h3>50K+</h3>
                            <p>Customers</p>
                        </div>
                        <div className={styles.stat}>
                            <h3>4.9 <Star fill="currentColor" strokeWidth={0} size={24} style={{ display: 'inline', verticalAlign: 'middle', marginBottom: '4px' }} /></h3>
                            <p>Rating</p>
                        </div>
                    </div>
                </div>
                <div className={`${styles.heroVisual} parallax-fast`}>
                    <Image
                        src="/images/Whisk_85f4bb9cb254f6c81dd4df4c765b910adr.png"
                        alt="Premium Headphones"
                        width={500}
                        height={500}
                        className={styles.heroProductMain}
                        priority
                    />
                    <div className={`${styles.heroFloating} ${styles.floating1}`}>
                        <Image
                            src="/images/Whisk_a94fbd3fe8ebb5cac69422b57cdadc1bdr.png"
                            alt="Gaming Mouse"
                            width={140}
                            height={140}
                        />
                    </div>
                    <div className={`${styles.heroFloating} ${styles.floating2}`}>
                        <Image
                            src="/images/Whisk_f10ae1b73ba921a85f34ef61cf5405dddr.png"
                            alt="Mechanical Keyboard"
                            width={120}
                            height={120}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
