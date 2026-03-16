'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

import { useStore } from '@/context/StoreContext';
import usersList from '@/lib/users.json';

export default function LoginPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login } = useStore();

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            // Simulate Google OAuth Popup
            const simulatePopup = () => new Promise(resolve => setTimeout(resolve, 1500));
            await simulatePopup();

            // In our system, "Google Login" checks if the user's email exists in our synced sheet data
            // For demo purposes, we'll use a test google account or the current email if provided
            const testEmail = email || 'customer@gmail.com'; 
            
            const userMatch = usersList.find(u => u.email.toLowerCase() === testEmail.toLowerCase());

            if (userMatch) {
                login(userMatch.email, userMatch.name, userMatch.role);
                router.push(userMatch.role === 'admin' ? '/admin' : '/dashboard');
            } else {
                setError('No account found with this Google profile. Please register first.');
            }
        } catch (err) {
            setError('Google Authentication failed.');
        } finally {
            setLoading(true); // Keep loading state until navigation
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            // Validate credentials against synced users.json (imported statically)
            const userMatch = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());

            if (!userMatch || userMatch.password !== password) {
                setError('Invalid email or password.');
                setLoading(false);
                return;
            }

            // Role check
            if (isAdmin && userMatch.role !== 'admin') {
                setError('Unauthorized access.');
                setLoading(false);
                return;
            }

            login(userMatch.email, userMatch.name, userMatch.role);

            if (userMatch.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Authentication service unavailable.');
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <div className={styles.authLogo}>
                    <h1><span className={styles.dot} /> BYTEZAAR</h1>
                    <p>Welcome back! Sign in to continue</p>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${!isAdmin ? styles.active : ''}`}
                        onClick={() => setIsAdmin(false)}
                    >
                        Customer
                    </button>
                    <button
                        className={`${styles.tab} ${isAdmin ? styles.active : ''}`}
                        onClick={() => setIsAdmin(true)}
                    >
                        Admin
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && <div style={{ color: '#ff4b4b', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-input" 
                            placeholder="you@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-input" 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className={styles.divider}>or continue with</div>

                <div className={styles.socialLogin}>
                    <button className={styles.socialLoginBtn} type="button" onClick={handleGoogleLogin} disabled={loading}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                        {loading ? 'Connecting...' : 'Google Login'}
                    </button>
                </div>

                <div className={styles.authFooter}>
                    Don&apos;t have an account?
                    <Link href="/register">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
