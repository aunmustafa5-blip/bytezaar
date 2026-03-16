'use client';
import styles from '../privacy-policy/policy.module.css';

const faqs = [
    {
        q: "What products does Bytezaar offer?",
        a: "Bytezaar specializes in high-performance tech accessories including wireless headphones, mechanical keyboards, gaming mice, portable projectors, and smart workspace gadgets."
    },
    {
        q: "Do you ship across Pakistan?",
        a: "Yes! We provide nationwide delivery across Pakistan, including major cities like Lahore, Karachi, Islamabad, and more remote areas."
    },
    {
        q: "What are your delivery times?",
        a: "Standard delivery typically takes 3-5 business days. Express shipping options (1-2 days) are available for selected metropolitan areas."
    },
    {
        q: "Is Cash on Delivery (COD) available?",
        a: "Absolutely. We offer Cash on Delivery for all orders within Pakistan. You can also pay securely via Credit/Debit card."
    },
    {
        q: "How do I claim my warranty?",
        a: "To claim a warranty, please email support@bytezaar.com with your order ID and a brief description of the issue. Our team will guide you through the process within 24 hours."
    },
    {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy for unused products in their original packaging. Please visit our Returns & Exchanges page for full details."
    },
    {
        q: "How can I contact customer support?",
        a: "You can reach us via the Contact form on our website, email us at contact@bytezaar.com, or send us a message on WhatsApp at +92 326 4642243."
    }
];

export default function FAQPage() {
    return (
        <div className={styles.policyPage}>
            <div className="container">
                <div className={styles.content}>
                    <h1>Frequently Asked Questions</h1>
                    <p className={styles.updated}>Find quick answers to your technical and order-related queries.</p>

                    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{ 
                                padding: '2rem', 
                                background: '#1A1A1A', 
                                borderRadius: '20px',
                                border: '1px solid rgba(255,255,255,0.08)',
                                transition: 'all 0.3s ease'
                            }}>
                                <h3 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '1rem', fontWeight: '600' }}>{faq.q}</h3>
                                <p style={{ color: '#A0A0A0', fontSize: '0.95rem', lineHeight: '1.6' }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '4rem', textAlign: 'center', padding: '3rem', background: 'linear-gradient(135deg, rgba(74,222,128,0.05) 0%, rgba(96,165,250,0.05) 100%)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h2 style={{ marginBottom: '1rem' }}>Still have questions?</h2>
                        <p style={{ color: '#808080', marginBottom: '2rem' }}>Our dedicated support team is ready to help you with anything.</p>
                        <a href="/#contact" className="btn btn-primary">Contact Support</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
