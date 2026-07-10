import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import styles from '@/components/Legal.module.css';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Drawcode',
  description:
    'Terms and conditions governing Drawcode projects, including pricing, timelines, third-party costs, intellectual property, and scope.',
};

export default function TermsPage() {
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
              Terms &amp; <span className="gradient-text">Conditions</span>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
              The terms below govern our projects, quotations, and engagements with clients.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className={styles.legalSection}>
          <div className="container">
            <div className={styles.content}>
              <p className={styles.updated}>Last updated: July 2026</p>

              <ul className={styles.list}>
                <li>
                  <strong>Annual Maintenance Charge (AMC)</strong> — 20% of the total project cost, billed annually post-delivery. This includes priority bug fixes, security updates, and call support.
                </li>
                <li>
                  <strong>Priority Bug Fixes</strong> — Limited to previously discussed and approved features. Any new changes, enhancements, or additional features will be considered extra work and charged separately.
                </li>
                <li>
                  <strong>Timeline</strong> — Delivery depends on timely client feedback, approvals, and third-party dependencies. Delays in communication may impact timelines.
                </li>
                <li>
                  <strong>Third-Party Costs</strong> — Any external expenses such as domain, hosting, payment gateways, SMS/WhatsApp credits, shipping APIs, or app store fees are not included in the project cost and will be invoiced separately.
                </li>
                <li>
                  <strong>Timeline Assurance</strong> — The delivery timeline will be followed as closely as possible; however, minor variations may occur due to scope refinements, client feedback loops, or dependencies on third-party systems.
                </li>
                <li>
                  <strong>Quotation Validity</strong> — The quoted pricing and scope are valid for 30 days from the date of issue.
                </li>
                <li>
                  <strong>Multimedia &amp; Creative Services</strong> — High-end photography, videography, and professional editing are outside this project&apos;s scope. These creatives should be provided by the client or services are considered additional works and will be quoted and billed separately.
                </li>
                <li>
                  <strong>Intellectual Property (IP)</strong> — All source code, designs, and technical assets remain the property of the developer until full and final payment is received. After settlement, full ownership is transferred to the client.
                </li>
                <li>
                  <strong>Scope Adherence</strong> — This proposal covers the exact functionalities outlined. Any additional features, integrations, or revisions beyond the agreed scope will be estimated and approved separately before development.
                </li>
                <li>
                  <strong>Taxes</strong> — All costs mentioned exclude applicable taxes (GST/VAT etc.). These will be added as per the prevailing government norms.
                </li>
              </ul>

              <div className={styles.block} style={{ marginTop: '48px' }}>
                <h2 className={styles.blockTitle}>Questions?</h2>
                <p className={styles.contactNote}>
                  For any clarification regarding these terms, contact us at{' '}
                  <a href="mailto:drawcodetechnologies@gmail.com">drawcodetechnologies@gmail.com</a>{' '}
                  or <a href="tel:+918139800591">+91 81398 00591</a>.
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
