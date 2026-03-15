'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import styles from './cart.module.css';

export default function CartPage() {
    const { cart, cartTotal, updateQuantity, removeFromCart, isLoaded } = useStore();

    if (!isLoaded) return (
        <div className={styles.cartPage}>
            <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
                <p>Loading your bag...</p>
            </div>
        </div>
    );

    return (
        <div className={styles.cartPage}>
            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>Shopping Bag</h1>
                    {cart.length > 0 && (
                        <p className={styles.count}>{cart.length} product{cart.length > 1 ? 's' : ''}</p>
                    )}
                </header>

                {cart.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <ShoppingBag size={48} />
                        </div>
                        <h2>Your bag is empty</h2>
                        <p>Explore our premium tech accessories and find something special.</p>
                        <Link href="/shop" className="btn btn-primary">
                            Browse Shop
                        </Link>
                    </div>
                ) : (
                    <div className={styles.cartLayout}>
                        <div className={styles.cartItems}>
                            {cart.map((item) => (
                                <div key={item.id} className={styles.cartItem}>
                                    <div className={styles.itemImage}>
                                        <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain', padding: '12px' }} />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <div className={styles.itemHeader}>
                                            <div>
                                                <p className={styles.itemCategory}>{item.category}</p>
                                                <h3><Link href={`/product/${item.id}`}>{item.name}</Link></h3>
                                            </div>
                                            <button 
                                                className={styles.removeBtn}
                                                onClick={() => removeFromCart(item.id)}
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className={styles.itemFooter}>
                                            <div className={styles.quantity}>
                                                <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease"><Minus size={14} /></button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase"><Plus size={14} /></button>
                                            </div>
                                            <div className={styles.priceColumn}>
                                                <p className={styles.unitPrice}>${item.price.toFixed(2)} each</p>
                                                <p className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <aside className={styles.summary}>
                            <div className={styles.summaryCard}>
                                <h2>Order Summary</h2>
                                <div className={styles.summaryContent}>
                                    <div className={styles.summaryRow}>
                                        <span>Subtotal</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className={styles.summaryRow}>
                                        <span>Estimated Shipping</span>
                                        <span className={styles.free}>FREE</span>
                                    </div>
                                    <div className={styles.summaryRow}>
                                        <span>Tax</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                    
                                    <div className={styles.divider} />
                                    
                                    <div className={`${styles.summaryRow} ${styles.total}`}>
                                        <span>Total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    
                                    <Link href="/checkout" className={`btn btn-primary ${styles.checkoutBtn}`}>
                                        Checkout Now <ArrowRight size={18} />
                                    </Link>
                                    
                                    <div className={styles.guarantees}>
                                        <p>✓ 30-day money back guarantee</p>
                                        <p>✓ Secured by 256-bit SSL encryption</p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
}
