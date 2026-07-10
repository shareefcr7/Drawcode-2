import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import styles from '@/components/Legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | Drawcode',
  description:
    'How Drawcode collects, uses, and protects your personal information when you use our website and services.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <ScrollReveal />
      <Header />
      <main>
        {/* Hero Header */}
        <section style={{ paddingTop: '160px', paddingBottom: '80px', backgroundColor: 'var(--bg-navy)', borderBottom: '1px solid var(--glass-border-dark)' }}>
          <div className="glow-effect" style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '40vw', height: '40vw', backgroundColor: 'rgba(255, 255, 255, 0.03)', position: 'absolute', filter: 'blur(100px)', opacity: 0.25, borderRadius: '50%', pointerEvents: 'none' }}></div>
          <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <div className="badge">Legal</div>
            <h1 className="section-title" style={{ fontSize: '3rem', maxWidth: '800px', margin: '0 auto 20px auto' }}>
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
              Your privacy matters to us. This policy explains what we collect and how we use it.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className={styles.legalSection}>
          <div className="container">
            <div className={styles.content}>
              <p className={styles.updated}>Last updated: July 2026</p>

              <p className={styles.intro}>
                Drawcode Technologies (&ldquo;Drawcode&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to
                protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard
                your information when you visit our website or engage our services. By using our website or services,
                you consent to the practices described in this policy.
              </p>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>1. Information We Collect</h2>
                <ul className={styles.list}>
                  <li><strong>Information you provide</strong> — such as your name, email address, phone number, company details, and any message content you submit through our contact forms, WhatsApp, or email.</li>
                  <li><strong>Project information</strong> — details, files, and requirements you share with us to scope and deliver a project.</li>
                  <li><strong>Usage data</strong> — such as your IP address, browser type, device information, pages visited, and interaction data collected automatically through cookies and analytics tools.</li>
                </ul>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>2. How We Use Your Information</h2>
                <ul className={styles.list}>
                  <li>To respond to your inquiries and provide quotations, consultations, and support.</li>
                  <li>To design, develop, and deliver the products and services you engage us for.</li>
                  <li>To send project updates, invoices, and service-related communications.</li>
                  <li>To improve our website, services, and user experience.</li>
                  <li>To comply with legal, tax, and regulatory obligations.</li>
                </ul>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>3. Cookies &amp; Analytics</h2>
                <p>
                  Our website may use cookies and similar technologies to understand how visitors use the site and to
                  improve performance. You can control or disable cookies through your browser settings, though some
                  features of the site may not function as intended without them.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>4. Sharing of Information</h2>
                <p>
                  We do not sell or rent your personal information. We may share information with trusted third-party
                  service providers (such as hosting, payment gateways, and communication tools) only to the extent
                  necessary to deliver our services, or where required by law, regulation, or legal process.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>5. Data Security</h2>
                <p>
                  We implement reasonable technical and organizational measures to protect your information against
                  unauthorized access, alteration, disclosure, or destruction. However, no method of transmission or
                  storage is completely secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>6. Data Retention</h2>
                <p>
                  We retain your information only for as long as necessary to fulfil the purposes described in this
                  policy, including legal, accounting, or reporting requirements. Project assets are handled in line
                  with our Terms &amp; Conditions.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>7. Your Rights</h2>
                <p>
                  You may request access to, correction of, or deletion of your personal information, and you may opt
                  out of non-essential communications at any time. To exercise these rights, contact us using the
                  details below.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>8. Third-Party Links</h2>
                <p>
                  Our website may contain links to external sites that are not operated by us. We are not responsible
                  for the privacy practices or content of those third-party websites.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>9. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
                  updated revision date. We encourage you to review it periodically.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>10. Contact Us</h2>
                <p className={styles.contactNote}>
                  If you have any questions about this Privacy Policy, please contact us at{' '}
                  <a href="mailto:drawcodetechnologies@gmail.com">drawcodetechnologies@gmail.com</a>{' '}
                  or <a href="tel:+918139800591">+91 81398 00591</a>.
                  <br />
                  Drawcode Technologies, 2105, F1, T2, Hilite Business Park, Palazhi, Calicut, Kerala - 673016.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
