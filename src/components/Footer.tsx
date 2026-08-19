import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* oversized wordmark, deliberately clipped by the viewport edges */}
      <span className={styles.watermark} aria-hidden="true">DRAWCODE</span>

      <div className="container">
        {/* minimal reveal only — reuses the site-wide observer, no extra JS */}
        <div className={`${styles.footerGrid} animate-on-scroll`}>
          {/* Company Info */}
          <div className={styles.colInfo}>
            <Link href="/" className={styles.logo} aria-label="Drawcode Technologies — home">
              <Image
                src="/logo.png"
                alt="Drawcode Technologies"
                width={1541}
                height={301}
                className={styles.logoImg}
              />
            </Link>
            <p className={styles.description}>
              Accelerating business innovation with custom software, enterprise platforms, and scalable digital solutions.
            </p>
            {/* Only channels that actually resolve. A social icon pointing at
                "#" reads as a broken site, so LinkedIn / X / Facebook / GitHub
                stay out until there are real accounts to link. */}
            <div className={styles.socialsRow}>
              <a
                href="https://www.instagram.com/drawcode_technologies/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Drawcode on Instagram"
                className={styles.socialLink}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://wa.me/918139800591"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Drawcode on WhatsApp"
                className={styles.socialLink}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>
                </svg>
              </a>
              <a
                href="mailto:drawcodetechnologies@gmail.com"
                aria-label="Email Drawcode"
                className={styles.socialLink}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className={styles.colLinks}>
            <h4 className={styles.colTitle}>Services</h4>
            <ul className={styles.linksList}>
              <li><a href="#services">Website Development</a></li>
              <li><a href="#services">Custom Software</a></li>
              <li><a href="#services">Mobile App Dev</a></li>
              <li><a href="#services">UI/UX Layouts</a></li>
              <li><a href="#services">ERP & CRM Systems</a></li>
              <li><a href="#services">Business Automation</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className={styles.colLinks}>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linksList}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/projects">Our Projects</Link></li>
              <li><a href="#easycom">EasyCom Plans</a></li>
              <li><a href="#technologies">Tech Stack</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.colLinks}>
            <h4 className={styles.colTitle}>Contact Us</h4>
            <ul className={styles.contactList}>
              <li>
                <Mail size={16} className={styles.contactIcon} />
                <a href="mailto:drawcodetechnologies@gmail.com">drawcodetechnologies@gmail.com</a>
              </li>
              <li>
                <Phone size={16} className={styles.contactIcon} />
                <a href="tel:+918139800591">+91 81398 00591 (Call / WhatsApp)</a>
              </li>
              <li>
                <MapPin size={16} className={styles.contactIcon} />
                <span>2105, F1, T2, Hilite Business Park, Palazhi, Calicut, Kerala - 673016</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} Drawcode. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
