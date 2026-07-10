import { ArrowRight, MessageSquareCode } from 'lucide-react';
import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section className={`dark-section ${styles.ctaSection}`} id="cta">
      {/* Glow Effects */}
      <div className={`glow-effect ${styles.glowCenter}`}></div>

      <div className="container">
        <div className={styles.ctaCard}>
          <div className={styles.iconWrapper}>
            <MessageSquareCode size={36} />
          </div>
          <h2 className={styles.ctaTitle}>
            Ready to Accelerate Your <span className="gradient-text">Digital Transformation?</span>
          </h2>
          <p className={styles.ctaDescription}>
            Partner with Drawcode to design, engineer, and deploy high-performance custom applications, websites, and business automations tailored to your scale.
          </p>
          <div className={styles.ctaActions}>
            <a
              href={`https://wa.me/918139800591?text=${encodeURIComponent(
                "Hi Drawcode, I'd like to build my next project. Can we discuss?"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              Let's Build Your Next Project <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
