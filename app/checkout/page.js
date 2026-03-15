'use client';
import { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';
import { CheckCircle, CreditCard, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from './checkout.module.css';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart, isLoaded } = useStore();
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'cod'
    const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '' });
    const [cardError, setCardError] = useState('');

    const validateCard = (number) => {
        const cleanNumber = number.replace(/\s+/g, '');
        if (!/^\d{16}$/.test(cleanNumber)) return false;
        
        // Luhn Algorithm
        let sum = 0;
        for (let i = 0; i < cleanNumber.length; i++) {
            let digit = parseInt(cleanNumber[i]);
            if ((cleanNumber.length - i) % 2 === 0) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
        }
        return sum % 10 === 0;
    };

    if (!isLoaded) return (
        <div className={styles.checkoutPage}>
            <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
                <p>Preparing secure checkout...</p>
            </div>
        </div>
    );

    if (cart.length === 0 && step !== 3) {
        return (
            <div className="container" style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Your cart is empty</h2>
                <p style={{ color: '#808080', marginBottom: '2.5rem' }}>Add some products to your bag before checking out.</p>
                <Link href="/shop" className="btn btn-primary">Return to Shop</Link>
            </div>
        );
    }

    const handleNext = (e) => {
        e.preventDefault();
        setStep(step + 1);
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setStep(step - 1);
        window.scrollTo(0, 0);
    };

    const handleComplete = (e) => {
        e.preventDefault();
        
        if (paymentMethod === 'card') {
            if (!validateCard(cardData.number)) {
                setCardError('Please enter a valid 16-digit card number.');
                return;
            }
            setCardError('');
        }

        setIsProcessing(true);
        // Mock processing delay
        setTimeout(() => {
            setIsProcessing(false);
            setStep(3);
            clearCart();
            window.scrollTo(0, 0);
        }, 2000);
    };

    return (
        <div className={styles.checkoutPage}>
            <div className="container">
                {step < 3 && (
                    <div className={styles.steps}>
                        <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
                            <span className={styles.stepNum}>1</span>
                            <span className={styles.stepLabel}>Shipping</span>
                        </div>
                        <div className={`${styles.line} ${step >= 2 ? styles.activeLine : ''}`} />
                        <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
                            <span className={styles.stepNum}>2</span>
                            <span className={styles.stepLabel}>Payment</span>
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <div className={styles.checkoutLayout}>
                        <form className={styles.mainContent} onSubmit={handleNext}>
                            <h1 className={styles.title}>Shipping Information</h1>
                            <div className={styles.formGrid}>
                                <div className="form-group">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-input" placeholder="John" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-input" placeholder="Doe" required />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Email Address</label>
                                    <input type="email" className="form-input" placeholder="john@example.com" required />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Street Address</label>
                                    <input type="text" className="form-input" placeholder="123 Tech Lane" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">City</label>
                                    <input type="text" className="form-input" placeholder="San Francisco" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Postal Code</label>
                                    <input type="text" className="form-input" placeholder="94103" required />
                                </div>
                            </div>
                            <div className={styles.formActions}>
                                <Link href="/cart" className={styles.backLink}>
                                    <ArrowLeft size={16} /> Back to Bag
                                </Link>
                                <button type="submit" className="btn btn-primary">
                                    Continue to Payment
                                </button>
                            </div>
                        </form>
                        <OrderSummary cart={cart} cartTotal={cartTotal} />
                    </div>
                )}

                {step === 2 && (
                    <div className={styles.checkoutLayout}>
                        <div className={styles.mainContent}>
                            <h1 className={styles.title}>Payment Method</h1>
                            
                            <div className={styles.methodSelector}>
                                <div 
                                    className={`${styles.methodOption} ${paymentMethod === 'card' ? styles.active : ''}`}
                                    onClick={() => setPaymentMethod('card')}
                                >
                                    <div className={styles.methodIcon}><CreditCard size={20} /></div>
                                    <span className={styles.methodName}>Credit Card</span>
                                    <span className={styles.methodDesc}>Secure payment via Stripe</span>
                                </div>
                                <div 
                                    className={`${styles.methodOption} ${paymentMethod === 'cod' ? styles.active : ''}`}
                                    onClick={() => setPaymentMethod('cod')}
                                >
                                    <div className={styles.methodIcon}><Truck size={20} /></div>
                                    <span className={styles.methodName}>Cash on Delivery</span>
                                    <span className={styles.methodDesc}>Pay when you receive</span>
                                </div>
                            </div>

                            <form onSubmit={handleComplete}>
                                {paymentMethod === 'card' ? (
                                    <div className={styles.paymentBox}>
                                        <div className={styles.cardHeader}>
                                            <CreditCard size={20} />
                                            <span>Enter Card Information</span>
                                        </div>
                                        <div className={styles.formGrid}>
                                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                                <label className="form-label">Card Number</label>
                                                <input 
                                                    type="text" 
                                                    className={`form-input ${cardError ? styles.invalidInput : ''}`}
                                                    placeholder="1234 5678 1234 5678" 
                                                    value={cardData.number}
                                                    onChange={e => setCardData({...cardData, number: e.target.value})}
                                                    required 
                                                />
                                                {cardError && <span className={styles.errorText}>{cardError}</span>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Expiry Date</label>
                                                <input 
                                                    type="text" 
                                                    className="form-input" 
                                                    placeholder="MM/YY" 
                                                    value={cardData.expiry}
                                                    onChange={e => setCardData({...cardData, expiry: e.target.value})}
                                                    required 
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">CVC</label>
                                                <input 
                                                    type="text" 
                                                    className="form-input" 
                                                    placeholder="123" 
                                                    value={cardData.cvc}
                                                    onChange={e => setCardData({...cardData, cvc: e.target.value})}
                                                    required 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.codBox}>
                                        <div className={styles.codIcon}><Truck size={40} /></div>
                                        <h3>Cash on Delivery</h3>
                                        <p>You will pay for your order in cash at the time of delivery. Please ensure you have the exact amount ready.</p>
                                    </div>
                                )}

                                <div className={styles.securityNote}>
                                    <ShieldCheck size={14} />
                                    <span>{paymentMethod === 'card' ? 'Secure encrypted transaction' : 'Verified delivery service'}</span>
                                </div>

                                <div className={styles.formActions}>
                                    <button type="button" onClick={handleBack} className={styles.backLink}>
                                        <ArrowLeft size={16} /> Back to Shipping
                                    </button>
                                    <button type="submit" className="btn btn-primary" disabled={isProcessing}>
                                        {isProcessing ? 'Processing...' : `Place Order — $${cartTotal.toFixed(2)}`}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <OrderSummary cart={cart} cartTotal={cartTotal} paymentMethod={paymentMethod} />
                    </div>
                )}

                {step === 3 && (
                    <div className={styles.successState}>
                        <div className={styles.successIcon}>
                            <CheckCircle size={64} />
                        </div>
                        <h1>Order Confirmed!</h1>
                        <p>Thank you for your purchase. We&apos;ve sent a confirmation email to your inbox.</p>
                        <div className={styles.orderNumber}>
                            Order #BZR-{Math.floor(Math.random() * 90000) + 10000}
                        </div>
                        {paymentMethod === 'cod' && (
                            <div style={{ marginBottom: '2rem', color: '#808080', fontSize: '0.9rem' }}>
                                Payment Method: <strong>Cash on Delivery</strong>
                            </div>
                        )}
                        <div className={styles.successActions}>
                            <Link href="/shop" className="btn btn-primary">
                                Keep Shopping
                            </Link>
                            <Link href="/dashboard" className="btn btn-secondary">
                                View Dashboard
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function OrderSummary({ cart, cartTotal, paymentMethod }) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.summaryBox}>
                <h3>Order Summary</h3>
                <div className={styles.compactList}>
                    {cart.map(item => (
                        <div key={item.id} className={styles.compactItem}>
                            <div className={styles.compactItemInfo}>
                                <span className={styles.itemName}>{item.name}</span>
                                <span className={styles.itemQty}>Qty: {item.quantity}</span>
                            </div>
                            <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.divider} />
                <div className={styles.summaryTotal}>
                    <span>Total Amount</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                {paymentMethod && (
                    <div style={{ fontSize: '0.75rem', color: '#808080', marginBottom: '1rem', textAlign: 'right' }}>
                        Method: {paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                    </div>
                )}
                <div className={styles.guarantees}>
                    <div className={styles.guarantee}><ShieldCheck size={16} /> 100% Secure</div>
                    {paymentMethod === 'cod' && <div className={styles.guarantee}><Truck size={16} /> Pay on delivery</div>}
                </div>
            </div>
        </aside>
    );
}
