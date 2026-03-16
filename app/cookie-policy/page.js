'use client';
import styles from '../privacy-policy/policy.module.css';

export default function CookiePolicy() {
    return (
        <div className={styles.policyPage}>
            <div className="container">
                <div className={styles.content}>
                    <h1>Cookie Policy</h1>
                    <p className={styles.updated}>Last Updated: March 16, 2026</p>
                    
                    <section>
                        <h2>1. What Are Cookies?</h2>
                        <p>Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.</p>
                    </section>

                    <section>
                        <h2>2. How Bytezaar Uses Cookies</h2>
                        <p>When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:</p>
                        <ul className={styles.list}>
                            <li><strong>Essential Cookies</strong>: We use cookies to remember information that changes the way the Service behaves or looks, such as a user&apos;s language preference.</li>
                            <li><strong>Account-related Cookies</strong>: We use cookies to authenticate users and prevent fraudulent use of user accounts.</li>
                            <li><strong>Preference Cookies</strong>: We use cookies to store information about your preferences and to personalize the content for you.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Your Choices Regarding Cookies</h2>
                        <p>If you&apos;d like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
