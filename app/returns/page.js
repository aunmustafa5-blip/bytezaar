'use client';
import styles from '../privacy-policy/policy.module.css';

export default function ReturnsPage() {
    return (
        <div className={styles.policyPage}>
            <div className="container">
                <div className={styles.content}>
                    <h1>Returns & Exchanges</h1>
                    <p className={styles.updated}>Last Updated: March 16, 2026</p>
                    
                    <section>
                        <h2>1. Return Policy</h2>
                        <p>We want you to be completely satisfied with your purchase. If you are not happy with your high-performance hardware, you can return it within 30 days of delivery for a full refund or exchange.</p>
                    </section>

                    <section>
                        <h2>2. Eligibility Criteria</h2>
                        <p>To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.</p>
                    </section>

                    <section>
                        <h2>3. Exchange Process</h2>
                        <p>The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item. We offer one-time free exchanges for size or compatibility issues.</p>
                    </section>

                    <section>
                        <h2>4. Refunds</h2>
                        <p>We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
