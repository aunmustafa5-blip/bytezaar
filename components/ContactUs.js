'use client';
import { useState } from 'react';
import styles from './ContactUs.module.css';

export default function ContactUs() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const { sendMessage } = await import('@/lib/sheets-api');
            const result = await sendMessage(formData);

            if (result.success) {
                setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (err) {
            console.error('Contact error:', err);
            setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={`section ${styles.contact}`} id="contact">
            <div className="container">
                <div className={styles.contactGrid}>
                    <div className={styles.contactInfo}>
                        <div>
                            <h2>Get in <em>Touch</em></h2>
                            <p className={styles.contactDescription}>
                                Have a question or need help? We&apos;d love to hear from you.
                                Our team is always ready to assist.
                            </p>
                        </div>

                        <div className={styles.contactDetails}>
                            <a href="mailto:support@bytezaar.com" className={styles.contactItem} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className={styles.contactItemIcon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                </div>
                                <div className={styles.contactItemText}>
                                    <h4>Email</h4>
                                    <p>support@bytezaar.com</p>
                                </div>
                            </a>
                            <a href="tel:+923264642243" className={styles.contactItem} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className={styles.contactItemIcon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
                                </div>
                                <div className={styles.contactItemText}>
                                    <h4>Phone</h4>
                                    <p>+92 326 4642243</p>
                                </div>
                            </a>
                            <a href="https://maps.google.com/?q=Lahore,Pakistan" target="_blank" rel="noopener noreferrer" className={styles.contactItem} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className={styles.contactItemIcon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>
                                <div className={styles.contactItemText}>
                                    <h4>Location</h4>
                                    <p>Lahore, Pakistan</p>
                                </div>
                            </a>
                        </div>

                        <div className={styles.contactSocials}>
                            <a href="https://www.instagram.com/byt3zaar/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                            </a>
                            <a href="https://www.youtube.com/@starrydustproductions" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="YouTube">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
                            </a>
                            <a href="https://wa.me/923264642243" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="WhatsApp">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-7.6-14.8 8.38 8.38 0 013.8.9L21 3z" /></svg>
                            </a>
                        </div>
                    </div>

                    <div className={styles.contactCard}>
                        <form className={styles.contactForm} onSubmit={handleSubmit}>
                            {status.message && (
                                <div className={`${styles.status} ${styles[status.type]}`} style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    marginBottom: '20px',
                                    fontSize: '0.9rem',
                                    textAlign: 'center',
                                    background: status.type === 'success' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: status.type === 'success' ? '#4ade80' : '#f87171',
                                    border: `1px solid ${status.type === 'success' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                                }}>
                                    {status.message}
                                </div>
                            )}
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="Enter your name" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input 
                                    type="email" 
                                    className="form-input" 
                                    placeholder="you@example.com" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Subject</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="How can we help?" 
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea 
                                    className="form-input" 
                                    rows="4" 
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
