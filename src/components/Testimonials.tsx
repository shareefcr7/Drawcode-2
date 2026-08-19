'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Star } from 'lucide-react';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    name: 'Hrithik Jayakrishnan',
    role: 'Kochi, India',
    text: 'Drawcode delivered our custom ledger engine in record time. The code quality, type safety, and security standards exceeded our stringent financial compliance requirements.',
    rating: 5,
    avatarInitials: 'HJ',
    angle: -3,
    tapeAngle: -4,
  },
  {
    name: 'Salman Khalid',
    role: 'Qatar',
    text: 'Their web development team is top-tier. Our luxury storefront load speed dropped from 4.2s to 0.8s, leading directly to a 24% increase in our checkouts and conversion rates.',
    rating: 5,
    avatarInitials: 'SK',
    angle: 2,
    tapeAngle: 5,
  },
  {
    name: 'Vishal Rajashekaran',
    role: 'Australia',
    text: 'The business automation tools they designed save our tracking department over 30 hours of manual Excel spreadsheets every week. Absolute game changer for our logistics flow.',
    rating: 5,
    avatarInitials: 'VR',
    angle: -2,
    tapeAngle: -6,
  },
];

/* Variants, not inline objects: framer only propagates a parent's `whileHover`
   to children when both sides use variant *labels*, and that propagation is
   what lets the tape flex when the card — not the tape — is hovered. */
const note = (angle: number, index: number): Variants => ({
  hidden: { opacity: 0, y: -40, rotate: 0 },
  show: {
    opacity: 1,
    y: 0,
    rotate: angle,
    transition: { type: 'spring', stiffness: 260, damping: 20, delay: index * 0.15 },
  },
  hover: {
    rotate: 0,
    scale: 1.05,
    transition: { type: 'spring', stiffness: 300, damping: 22 },
  },
});

const tape = (angle: number): Variants => ({
  hidden: { rotate: angle },
  show: { rotate: angle },
  /* the strip peels a little as the note straightens under the cursor */
  hover: {
    rotate: [angle, angle - 4, angle],
    transition: { duration: 0.5, ease: 'easeOut' },
  },
});

/**
 * Fixed three-card grid — no carousel, no arrows, no pagination. All three
 * testimonials are visible at once; they fade up in sequence on arrival.
 */
export default function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section className={styles.testimonialsSection} id="testimonials">
      {/* same grid canvas the hero and pricing sections sit on */}
      <span className={styles.canvas} aria-hidden="true" />

      <div className="container">
        <div className={styles.sectionHeader}>
          <p className="eyebrow">05 — It runs in production</p>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Read feedback from technology managers and business leaders who scaled
            operations with Drawcode.
          </p>
        </div>
      </div>

      <div className={`container ${styles.board}`}>
        {/* dashed arc threading the three notes together, behind them */}
        <svg
          className={styles.thread}
          viewBox="0 0 1000 260"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path d="M 120 190 C 240 40 380 40 500 130 C 620 220 760 210 880 70" />
        </svg>

        <div className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              className={styles.card}
              variants={note(reduce ? 0 : t.angle, i)}
              initial="hidden"
              whileInView="show"
              whileHover={reduce ? undefined : 'hover'}
              viewport={{ once: true, margin: '-100px' }}
            >
              {/* washi tape holding the note to the board */}
              <motion.span
                className={styles.tape}
                variants={tape(reduce ? 0 : t.tapeAngle)}
                aria-hidden="true"
              />

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
                  <span className={styles.role}>
                    {t.role}
                    <span className={styles.verified}>
                      <i />
                      Verified Partner
                    </span>
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

    </section>
  );
}
