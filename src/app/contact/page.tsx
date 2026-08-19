import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: "Talk to Drawcode about your next build. Custom applications, websites, ERP & CRM platforms and business automation — based in Calicut, Kerala, delivering worldwide.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | Drawcode',
    description: "Talk to Drawcode about your next build. Custom applications, websites, ERP & CRM platforms and business automation — based in Calicut, Kerala, delivering worldwide.",
    url: '/contact',
    type: 'website',
    /* a child openGraph block replaces the parent's, so the shared card has to
       be re-declared here or these pages share with no preview image */
    images: ['/opengraph-image'],
  },
};

import Header from '@/components/Header';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import GridCanvas from '@/components/GridCanvas';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContactPage() {
  return (
    <>
      <ScrollReveal />
      <Header />
      <main>
        {/* Contact Hero Header */}
        <section style={{ paddingTop: '160px', paddingBottom: '60px', backgroundColor: 'var(--bg-navy)', borderBottom: '1px solid var(--glass-border-dark)', position: 'relative', overflow: 'hidden' }}>
          <GridCanvas />
          <div className="glow-effect" style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '40vw', height: '40vw', backgroundColor: 'rgba(255, 255, 255, 0.03)', position: 'absolute', filter: 'blur(100px)', opacity: 0.25, borderRadius: '50%', pointerEvents: 'none' }}></div>
          <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <div className="badge">Contact Us</div>
            <h1 className="section-title" style={{ fontSize: '3rem', maxWidth: '800px', margin: '0 auto 20px auto' }}>
              Let&apos;s Build Your <span className="gradient-text">Next Digital Venture</span>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
              Partner with Drawcode to design, engineer, and deploy high-performance custom applications, websites, and business automations.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-light)' }}>
          <div className="container">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
