'use client';
import styles from './policy.module.css';

export default function PrivacyPolicy() {
    return (
        <div className={styles.policyPage}>
            <div className="container">
                <div className={styles.content}>
                    <h1>Privacy Policy</h1>
                    <p className={styles.updated}>Last Updated: March 16, 2026</p>
                    
                    <section>
                        <h2>1. Introduction</h2>
                        <p>Welcome to Bytezaar. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
                    </section>

                    <section>
                        <h2>2. Data We Collect</h2>
                        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                        <ul className={styles.list}>
                            <li><strong>Identity Data</strong>: includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data</strong>: includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong>Financial Data</strong>: includes payment card details.</li>
                            <li><strong>Transaction Data</strong>: includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. How We Use Your Data</h2>
                        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                        <ul className={styles.list}>
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal obligation.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Data Retention</h2>
                        <p>We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.</p>
                    </section>

                    <section>
                        <h2>5. Your Legal Rights</h2>
                        <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
