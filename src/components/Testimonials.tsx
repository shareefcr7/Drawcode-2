'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    name: 'Hrithik Jayakrishnan',
    role: 'Kochi, India',
    text: 'Drawcode delivered our custom ledger engine in record time. The code quality, type safety, and security standards exceeded our stringent financial compliance requirements.',
    rating: 5,
    avatarInitials: 'HJ',
  },
  {
    name: 'Salman Khalid',
    role: 'Qatar',
    text: 'Their web development team is top-tier. Our luxury storefront load speed dropped from 4.2s to 0.8s, leading directly to a 24% increase in our checkouts and conversion rates.',
    rating: 5,
    avatarInitials: 'SK',
  },
  {
    name: 'Vishal Rajashekaran',
    role: 'Australia',
    text: 'The business automation tools they designed save our tracking department over 30 hours of manual Excel spreadsheets every week. Absolute game changer for our logistics flow.',
    rating: 5,
    avatarInitials: 'VR',
  },
];

const GRID = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const CARD = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } as const,
};

/**
 * Fixed three-card grid — no carousel, no arrows, no pagination. All three
 * testimonials are visible at once; they fade up in sequence on arrival.
 */
export default function Testimonials() {
  return (
    <section className={styles.testimonialsSection} id="testimonials">
      {/* same grid canvas the hero and pricing sections sit on */}
      <span className={styles.canvas} aria-hidden="true" />

      <div className="container">
        <div className={styles.sectionHeader}>
          <p className="eyebrow">04 — It runs in production</p>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Read feedback from technology managers and business leaders who scaled
            operations with Drawcode.
          </p>
        </div>
      </div>

      <motion.div
        className={`container ${styles.grid}`}
        variants={GRID}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        {TESTIMONIALS.map((t) => (
          <motion.figure
            key={t.name}
            className={styles.card}
            variants={CARD}
            whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
          >
            <div className={styles.ratingRow} aria-label={`${t.rating} out of 5`}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" stroke="currentColor" />
              ))}
            </div>

            <blockquote className={styles.text}>{t.text}</blockquote>

            <figcaption className={styles.profile}>
              <span className={styles.avatar}>{t.avatarInitials}</span>
              <span className={styles.info}>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.role}>{t.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>

    </section>
  );
}
