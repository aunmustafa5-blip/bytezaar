'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/data';
import styles from './Header.module.css';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <>
            <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
                <div className={styles.headerInner}>
                    <Link href="/" className={styles.logo}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/bytezaar-logo.png`}
                            alt="Bytezaar Logo"
                            width={150}
                            height={50}
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </Link>

                    <nav className={styles.nav}>
                        {navLinks.map(link => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className={styles.headerActions}>
                        <Link href="/login" className={styles.loginBtn}>
                            Login
                        </Link>

                        <button className={styles.iconBtn} aria-label="Cart">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                            <span className={styles.cartBadge}>3</span>
                        </button>

                        <Link href="/shop" className={styles.shopBtn}>
                            Shop Now
                        </Link>

                        <button
                            className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Menu"
                        >
                            <span /><span /><span />
                        </button>
                    </div>
                </div>
            </header>

            <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
                {navLinks.map(link => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={styles.mobileNavLink}
                        onClick={() => setMobileOpen(false)}
                    >
                        {link.name}
                    </Link>
                ))}
                <div className={styles.mobileActions}>
                    <Link href="/login" className="btn btn-secondary" onClick={() => setMobileOpen(false)}>
                        Login
                    </Link>
                    <Link href="/shop" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
                        Shop Now
                    </Link>
                </div>
            </div>
        </>
    );
}
