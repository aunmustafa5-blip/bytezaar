'use client';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container-wide">
                <div className={styles.footerGrid}>
                    <div className={styles.footerBrand}>
                        <div className={styles.footerLogo}>
                            <span className={styles.logoDot} />
                            BYTEZAAR
                        </div>
                        <p className={styles.footerTagline}>
                            Upgrade your tech experience with premium accessories. Quality that speaks for itself.
                        </p>
                        <div className={styles.footerSocials}>
                            <a href="https://www.instagram.com/byt3zaar/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                            </a>
                            <a href="https://www.youtube.com/@starrydustproductions" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="YouTube">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
                            </a>
                            <a href="https://wa.me/923264642243" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-7.6-14.8 8.38 8.38 0 013.8.9L21 3z" /></svg>
                            </a>
                        </div>
                    </div>

                    <div className={styles.footerColumn}>
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/shop">Shop</Link></li>
                            <li><Link href="/#categories">Categories</Link></li>
                            <li><Link href="/#about">About Us</Link></li>
                            <li><Link href="/#contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerColumn}>
                        <h4>Customer Support</h4>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Shipping Info</a></li>
                            <li><a href="#">Returns & Exchanges</a></li>
                            <li><a href="#">Track Your Order</a></li>
                            <li><a href="#">Warranty</a></li>
                        </ul>
                    </div>

                    <div className={styles.newsletter}>
                        <h4>Newsletter</h4>
                        <p>Stay updated with our latest products and exclusive deals.</p>
                        <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={styles.newsletterInput}
                            />
                            <button type="submit" className={styles.newsletterBtn}>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>&copy; 2026 Bytezaar. All rights reserved.</p>
                    <div className={styles.footerBottomLinks}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
