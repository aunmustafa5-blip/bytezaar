'use client';
import { useState, useEffect } from 'react';
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

    const handleGoogleLogin = async (response) => {
        setLoading(true);
        try {
            const { decodeJwt } = await import('@/lib/google-auth');
            const profile = decodeJwt(response.credential);
            
            if (!profile) throw new Error('Invalid Google Response');

            // Find or Register
            const userMatch = usersList.find(u => u.email.toLowerCase() === profile.email.toLowerCase());

            if (userMatch) {
                login(userMatch.email, userMatch.name, userMatch.role);
                router.push(userMatch.role === 'admin' ? '/admin' : '/dashboard');
            } else {
                // Auto-register new Google user
                const { registerUser } = await import('@/lib/sheets-api');
                const newUser = {
                    firstName: profile.given_name || 'Google',
                    lastName: profile.family_name || 'User',
                    email: profile.email,
                    role: 'customer',
                    joinDate: new Date().toISOString().split('T')[0]
                };
                await registerUser(newUser);
                login(newUser.email, `${newUser.firstName} ${newUser.lastName}`, 'customer');
                router.push('/dashboard');
            }
        } catch (err) {
            console.error('Google Auth Error:', err);
            setError('Google sign-in failed.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && window.google) {
            const { GOOGLE_CLIENT_ID } = require('@/lib/google-auth');
            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleGoogleLogin
            });
            window.google.accounts.id.renderButton(
                document.getElementById("googleBtn"),
                { theme: "outline", size: "large", width: "100%", text: "continue_with" }
            );
        }
    }, [usersList]); // Re-render if usersList changes or on load

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
                    <div id="googleBtn" style={{ width: '100%' }}></div>
                </div>

                <div className={styles.authFooter}>
                    Don&apos;t have an account?
                    <Link href="/register">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
