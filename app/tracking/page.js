'use client';
import { useState } from 'react';
import styles from '../privacy-policy/policy.module.css';
import ordersList from '@/lib/orders.json';

export default function TrackingPage() {
    const orders = ordersList.orders || ordersList; // Robust handling
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [result, setResult] = useState(null);
    const [searching, setSearching] = useState(false);

    const handleTrack = () => {
        if (!orderId || !email) return;
        setSearching(true);
        // Simulate network delay
        setTimeout(() => {
            const found = orders.find(o => 
                o.id.toLowerCase() === orderId.toLowerCase() && 
                o.customerEmail.toLowerCase() === email.toLowerCase()
            );
            setResult(found || 'not_found');
            setSearching(false);
        }, 1200);
    };

    return (
        <div className={styles.policyPage}>
            <div className="container">
                <div className={styles.content}>
                    <h1>Track Your Order</h1>
                    <p className={styles.updated}>Enter your details below to see your package status.</p>
                    
                    <div style={{ background: '#1A1A1A', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', marginTop: '2rem', maxWidth: '500px' }}>
                        <div className="form-group">
                            <label className="form-label">Order ID</label>
                            <input 
                                className="form-input" 
                                placeholder="BZ-2026-001" 
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input 
                                className="form-input" 
                                placeholder="you@example.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button 
                            className="btn btn-primary" 
                            style={{ width: '100%' }} 
                            onClick={handleTrack}
                            disabled={searching}
                        >
                            {searching ? 'Fetching Details...' : 'Track Order'}
                        </button>

                        {result === 'not_found' && (
                            <div style={{ marginTop: '1.5rem', color: '#ff6b6b', textAlign: 'center', fontSize: '0.9rem' }}>
                                ✖ No order found with these details.
                            </div>
                        )}

                        {result && result !== 'not_found' && (
                            <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(74,222,128,0.2)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span style={{ color: '#808080' }}>Status:</span>
                                    <span style={{ color: '#4ADE80', fontWeight: '600' }}>{result.status}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span style={{ color: '#808080' }}>Order Date:</span>
                                    <span>{result.date}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#808080' }}>Estimated Delivery:</span>
                                    <span>Within 2-3 business days</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ marginTop: '3rem' }}>
                        <h2>Common Statuses</h2>
                        <ul className={styles.list}>
                            <li><strong>Processing</strong>: We are preparing your high-performance hardware for shipping.</li>
                            <li><strong>Shipped</strong>: Your package has left our fulfillment center and is on its way.</li>
                            <li><strong>Delivered</strong>: The package has been confirmed as delivered to your address.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
