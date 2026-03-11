'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Star } from 'lucide-react';
import { products, categories } from '@/lib/data';
import styles from './shop.module.css';

const ITEMS_PER_PAGE = 6;

export default function ShopPage() {
    const [search, setSearch] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [maxPrice, setMaxPrice] = useState(500);
    const [sortBy, setSortBy] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);

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

    const toggleCategory = (cat) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedCategories([]);
        setMaxPrice(500);
        setSortBy('default');
        setCurrentPage(1);
    };

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (search) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category));
        }

        result = result.filter(p => p.price <= maxPrice);

        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        return result;
    }, [search, selectedCategories, maxPrice, sortBy]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className={styles.shopPage}>
            <div className="container">
                <div className={styles.shopHeader}>
                    <h1>Shop All Products</h1>
                    <p>Browse our full collection of premium tech accessories</p>
                </div>

                <div className={styles.shopLayout}>
                    {/* Sidebar */}
                    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
                        <div className={styles.filterSection}>
                            <h3>Search</h3>
                            <div className={styles.searchWrapper}>
                                <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                                />
                            </div>
                        </div>

                        <div className={styles.filterSection}>
                            <h3>Categories</h3>
                            <div className={styles.categoryList}>
                                {categories.map(cat => (
                                    <label key={cat.id} className={styles.categoryOption}>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat.name)}
                                            onChange={() => toggleCategory(cat.name)}
                                        />
                                        {cat.name}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.filterSection}>
                            <h3>Price Range</h3>
                            <div className={styles.priceRange}>
                                <input
                                    type="range"
                                    className={styles.rangeSlider}
                                    min="0"
                                    max="500"
                                    value={maxPrice}
                                    onChange={e => { setMaxPrice(Number(e.target.value)); setCurrentPage(1); }}
                                />
                                <div className={styles.priceLabels}>
                                    <span>$0</span>
                                    <span>${maxPrice}</span>
                                </div>
                            </div>
                        </div>

                        <button className={styles.clearBtn} onClick={clearFilters}>
                            Clear All Filters
                        </button>
                    </aside>

                    {/* Main Content */}
                    <div className={styles.shopMain}>
                        <div className={styles.toolbar}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <button
                                    className={styles.mobileFilterBtn}
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /></svg>
                                    Filters
                                </button>
                                <span className={styles.resultCount}>
                                    Showing <strong>{paginatedProducts.length}</strong> of{' '}
                                    <strong>{filteredProducts.length}</strong> products
                                </span>
                            </div>
                            <select
                                className={styles.sortSelect}
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                            >
                                <option value="default">Sort by: Default</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="newest">Newest First</option>
                                <option value="rating">Top Rated</option>
                            </select>
                        </div>

                        {paginatedProducts.length > 0 ? (
                            <>
                                <div className={styles.productGrid}>
                                    {paginatedProducts.map(product => (
                                        <div
                                            key={product.id}
                                            className="product-card"
                                            onMouseMove={handleMouseMove}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <div className="product-image-wrapper">
                                                {product.badge && (
                                                    <span style={{
                                                        position: 'absolute', top: '12px', left: '12px',
                                                        padding: '4px 12px', background: '#fff', color: '#000',
                                                        borderRadius: '999px', fontSize: '11px', fontWeight: '700',
                                                        letterSpacing: '0.05em', textTransform: 'uppercase', zIndex: 2
                                                    }}>{product.badge}</span>
                                                )}
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
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
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
                                                    <span style={{ fontSize: '12px', color: '#808080' }}>({product.reviews})</span>
                                                </div>
                                                <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    <h3 className="product-name" style={{ cursor: 'pointer' }}>{product.name}</h3>
                                                </Link>
                                                <p style={{ fontSize: '13px', color: '#808080', marginBottom: '12px', lineHeight: '1.5' }}>
                                                    {product.description}
                                                </p>
                                                <p className="product-price">
                                                    ${product.price.toFixed(2)}
                                                    {product.originalPrice && (
                                                        <span style={{ fontSize: '14px', color: '#808080', textDecoration: 'line-through', marginLeft: '8px' }}>
                                                            ${product.originalPrice.toFixed(2)}
                                                        </span>
                                                    )}
                                                </p>
                                                <button className="btn btn-accent" style={{ width: '100%', marginTop: '8px' }}>
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className={styles.pagination}>
                                        <button
                                            className={styles.pageBtn}
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(p => p - 1)}
                                        >
                                            ←
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button
                                                key={i + 1}
                                                className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.active : ''}`}
                                                onClick={() => setCurrentPage(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            className={styles.pageBtn}
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(p => p + 1)}
                                        >
                                            →
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className={styles.noResults}>
                                <h3>No products found</h3>
                                <p>Try adjusting your filters or search terms</p>
                                <button className="btn btn-secondary" onClick={clearFilters} style={{ marginTop: '16px' }}>
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
