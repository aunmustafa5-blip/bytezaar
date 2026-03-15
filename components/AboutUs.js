import Image from 'next/image';
import Link from 'next/link';
import { Rocket, ShieldCheck, Trophy, MessageSquare } from 'lucide-react';
import styles from './AboutUs.module.css';

export default function AboutUs() {
    return (
        <section className={`section ${styles.about}`} id="about">
            <div className="container">
                <div className={styles.aboutGrid}>
                    <div className={styles.aboutImage}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Whisk_f10ae1b73ba921a85f34ef61cf5405dddr.png`}
                            alt="About Bytezaar"
                            width={500}
                            height={500}
                            style={{ objectFit: 'contain' }}
                        />
                        <div className={styles.aboutImageOverlay} />
                    </div>
                    <div className={styles.aboutContent}>
                        <h2>Crafting the Future of <em>Tech Accessories</em></h2>
                        <p className={styles.aboutDescription}>
                            At Bytezaar, we believe technology should be an experience, not just a tool.
                            We curate and deliver premium tech accessories that combine cutting-edge
                            performance with stunning design. Every product in our collection is handpicked
                            to elevate your digital lifestyle.
                        </p>
                        <div className={styles.aboutFeatures}>
                            <div className={styles.feature}>
                                <div className={styles.featureIcon}>
                                    <Rocket size={20} strokeWidth={1.5} />
                                </div>
                                <div className={styles.featureText}>
                                    <h4>Fast Shipping</h4>
                                    <p>Free delivery in 2-3 days</p>
                                </div>
                            </div>
                            <div className={styles.feature}>
                                <div className={styles.featureIcon}>
                                    <ShieldCheck size={20} strokeWidth={1.5} />
                                </div>
                                <div className={styles.featureText}>
                                    <h4>Secure Payments</h4>
                                    <p>256-bit SSL encryption</p>
                                </div>
                            </div>
                            <div className={styles.feature}>
                                <div className={styles.featureIcon}>
                                    <Trophy size={20} strokeWidth={1.5} />
                                </div>
                                <div className={styles.featureText}>
                                    <h4>Premium Quality</h4>
                                    <p>Certified authentic products</p>
                                </div>
                            </div>
                            <div className={styles.feature}>
                                <div className={styles.featureIcon}>
                                    <MessageSquare size={20} strokeWidth={1.5} />
                                </div>
                                <div className={styles.featureText}>
                                    <h4>24/7 Support</h4>
                                    <p>Always here to help</p>
                                </div>
                            </div>
                        </div>
                        <Link href="/shop" className="btn btn-primary">
                            Explore Our Collection
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
