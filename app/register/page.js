'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../login/login.module.css';

import { useStore } from '@/context/StoreContext';
import users from '@/lib/users.json';

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

    const handleGoogleLogin = async (response) => {
        setLoading(true);
        try {
            const { decodeJwt } = await import('@/lib/google-auth');
            const profile = decodeJwt(response.credential);
            if (!profile) throw new Error('Invalid Google Response');

            // Find or Register
            const userMatch = users.find(u => u.email.toLowerCase() === profile.email.toLowerCase());

            if (userMatch) {
                login(userMatch.email, userMatch.name, userMatch.role);
                router.push('/dashboard');
            } else {
                // Register as new user via Google
                const { registerUser } = await import('@/lib/sheets-api');
                const googleUser = {
                    firstName: profile.given_name || 'Google',
                    lastName: profile.family_name || 'User',
                    email: profile.email,
                    role: 'customer',
                    joinDate: new Date().toISOString().split('T')[0]
                };
                
                await registerUser(googleUser);
                login(googleUser.email, `${googleUser.firstName} ${googleUser.lastName}`, 'customer');
                router.push('/dashboard');
            }
        } catch (err) {
            console.error('Google Auth Error:', err);
            setError('Google registration failed.');
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
                document.getElementById("googleBtnReg"),
                { theme: "outline", size: "large", width: "100%", text: "signup_with" }
            );
        }
    }, []);

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
            // 1. Check uniqueness from synced JSON (imported statically)

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
                    <div id="googleBtnReg" style={{ width: '100%' }}></div>
                </div>

                <div className={styles.authFooter}>
                    Already have an account?
                    <Link href="/login">Sign In</Link>
                </div>
            </div>
        </div>
    );
}
