import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import NetworkHub from './NetworkHub';
import GridCanvas from './GridCanvas';
import styles from './Hero.module.css';

const CAPABILITIES = [
  'Web',
  'Mobile',
  'Software',
  'UI/UX',
  'ERP & CRM',
  'Automation',
  'Cloud',
  'Growth',
];

export default function Hero() {
  return (
    <section className={`dark-section ${styles.hero}`} id="hero">
      {/* shared grid + beams + pointer light, same component the pricing uses */}
      <GridCanvas />
      <div className={`glow-effect ${styles.glowA}`} />
      <div className={`glow-effect ${styles.glowB}`} />

      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <p className={`eyebrow ${styles.eyebrow}`}>Digital Engineering Studio</p>

            <h1 className={styles.title}>
              <span className={styles.line}>Building digital</span>
              <span className={styles.line}>systems that move</span>
              <span className={styles.line}>
                businesses <span className="gradient-text">forward.</span>
              </span>
            </h1>

            <p className={styles.description}>
              Drawcode designs, builds, connects and automates the software a business
              actually runs on — websites, products, ERP &amp; CRM platforms and the
              workflows between them.
            </p>

            <div className={styles.actions}>
              <Link href="/contact" className="btn btn-accent">
                Start a project <ArrowRight size={18} />
              </Link>
              <Link href="/projects" className="btn btn-secondary">
                View our work
              </Link>
            </div>
          </div>

          <div className={styles.visual}>
            <NetworkHub />
          </div>
        </div>

        {/* Supporting rail — the capability set the ecosystem above is made of */}
        <div className={styles.rail}>
          <ul className={styles.capabilities}>
            {CAPABILITIES.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
