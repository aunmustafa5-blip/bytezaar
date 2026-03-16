'use client';
import styles from '../privacy-policy/policy.module.css';

export default function ShippingPage() {
    return (
        <div className={styles.policyPage}>
            <div className="container">
                <div className={styles.content}>
                    <h1>Shipping & Delivery</h1>
                    <p className={styles.updated}>We ensure your tech gear reaches you safely and swiftly.</p>

                    <section>
                        <h2>1. Delivery Locations</h2>
                        <p>Bytezaar delivers to all major cities and towns across Pakistan. Whether you&apos;re in a metropolitan hub like Karachi or a more remote area, we work with the best logistics partners to reach your doorstep.</p>
                    </section>

                    <section>
                        <h2>2. Shipping Methods & Costs</h2>
                        <p>We offer flexible shipping options to suit your needs:</p>
                        <ul className={styles.list}>
                            <li><strong>Standard Shipping</strong>: 3-5 business days. Flat rate of Rs. 250.</li>
                            <li><strong>Express Shipping</strong>: 1-2 business days (Available in Lahore, Karachi, Islamabad). Flat rate of Rs. 500.</li>
                            <li><strong>Free Shipping</strong>: For all orders exceeding Rs. 10,000.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Processing Time</h2>
                        <p>Orders placed before 2:00 PM PKT are processed and dispatched on the same business day. Orders placed after this time or on weekends/holidays will be processed on the next business day.</p>
                    </section>

                    <section>
                        <h2>4. Package Inspection</h2>
                        <p>We take great care in packing your delicate tech accessories. Please inspect the package upon arrival. If you notice any external damage or tampering, do not accept the delivery and contact our support immediately.</p>
                    </section>

                    <section>
                        <h2>5. International Shipping</h2>
                        <p>Currently, Bytezaar only ships within Pakistan. We are working on expanding our reach to international tech enthusiasts soon!</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
