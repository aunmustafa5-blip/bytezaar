'use client';
import styles from '../privacy-policy/policy.module.css';

export default function WarrantyPage() {
    return (
        <div className={styles.policyPage}>
            <div className="container">
                <div className={styles.content}>
                    <h1>Warranty Information</h1>
                    <p className={styles.updated}>Last Updated: March 16, 2026</p>
                    
                    <section>
                        <h2>1. Warranty Coverage</h2>
                        <p>Bytezaar provides a limited manufacturer warranty on all high-performance hardware purchased through our official platform. The standard warranty period is 12 months from the date of purchase.</p>
                    </section>

                    <section>
                        <h2>2. What is Covered</h2>
                        <p>This warranty covers defects in materials and workmanship under normal use. During the warranty period, Bytezaar will repair or replace, at no charge, products or parts of a product that proves defective because of improper material or workmanship.</p>
                    </section>

                    <section>
                        <h2>3. What is Not Covered</h2>
                        <p>The warranty does not cover any problem that is caused by:
                            <ul className={styles.list}>
                                <li>Damage resulting from negligence, improper maintenance, or modification.</li>
                                <li>Damage resulting from natural disasters.</li>
                                <li>Theft or loss of the product.</li>
                                <li>Physical damage caused by misuse.</li>
                            </ul>
                        </p>
                    </section>

                    <section>
                        <h2>4. How to Claim</h2>
                        <p>To obtain warranty service, you must first contact us at support@bytezaar.com to determine the problem and the most appropriate solution for you.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
