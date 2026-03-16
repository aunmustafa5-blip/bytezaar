'use client';
import styles from '../privacy-policy/policy.module.css';

export default function TermsOfService() {
    return (
        <div className={styles.policyPage}>
            <div className="container">
                <div className={styles.content}>
                    <h1>Terms of Service</h1>
                    <p className={styles.updated}>Last Updated: March 16, 2026</p>
                    
                    <section>
                        <h2>1. Terms of Use</h2>
                        <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
                    </section>

                    <section>
                        <h2>2. User Account</h2>
                        <p>If you create an account on the website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it.</p>
                    </section>

                    <section>
                        <h2>3. Intellectual Property</h2>
                        <p>The Service and its original content, features and functionality are and will remain the exclusive property of Bytezaar and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Bytezaar.</p>
                    </section>

                    <section>
                        <h2>4. Limitation of Liability</h2>
                        <p>In no event shall Bytezaar, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
                    </section>

                    <section>
                        <h2>5. Governing Law</h2>
                        <p>These Terms shall be governed and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
