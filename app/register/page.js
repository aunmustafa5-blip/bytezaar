'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../login/login.module.css';

import { useStore } from '@/context/StoreContext';

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useStore();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = () => {
        alert('Google Login is currently in developmental mode. Please use the form to register for now.');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        setLoading(true);
        
        try {
            // 1. Check uniqueness from synced JSON
            const usersResp = await fetch('/lib/users.json');
            const users = await usersResp.json();
            
            if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
                setError('An account with this email already exists.');
                setLoading(false);
                return;
            }

            // 2. Register via Sheets API
            const name = `${firstName} ${lastName}`;
            const { registerUser } = await import('@/lib/sheets-api');
            
            await registerUser({
                firstName,
                lastName,
                email,
                password, // Note: In production, hash this!
                role: 'customer',
                joinDate: new Date().toISOString().split('T')[0]
            });

            // 3. Auto-login and redirect
            login(email, name, 'customer');
            router.push('/dashboard');
        } catch (err) {
            console.error('Registration error:', err);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <div className={styles.authLogo}>
                    <h1><span className={styles.dot} /> BYTEZAAR</h1>
                    <p>Create your account to get started</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && <div style={{ color: '#ff4b4b', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                            <label className="form-label">First Name</label>
                            <input 
                                type="text" 
                                className="form-input" 
                                placeholder="John" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input 
                                type="text" 
                                className="form-input" 
                                placeholder="Doe" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required 
                            />
                        </div>
                    </div>
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
                            placeholder="Minimum 8 characters" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input 
                            type="password" 
                            className="form-input" 
                            placeholder="Re-enter password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className={styles.divider}>or sign up with</div>

                <div className={styles.socialLogin}>
                    <button className={styles.socialLoginBtn} type="button" onClick={handleGoogleLogin}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                        Continue with Google
                    </button>
                </div>

                <div className={styles.authFooter}>
                    Already have an account?
                    <Link href="/login">Sign In</Link>
                </div>
            </div>
        </div>
    );
}
