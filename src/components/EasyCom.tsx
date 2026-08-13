'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowRight, Check } from 'lucide-react';
import GridCanvas from './GridCanvas';
import styles from './EasyCom.module.css';

const GRID = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const CARD = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } as const,
};

const PLANS = [
  {
    id: 'starter',
    badge: 'Starter Package',
    name: 'EasyCom Starter',
    price: '1,999',
    blurb:
      'A starter e-commerce solution ideal for small businesses looking to showcase products and generate inquiries via WhatsApp.',
    features: [
      'Up to 10 product listings',
      'WhatsApp order enquiries',
      'Mobile-first responsive design',
      'Basic SEO & analytics setup',
    ],
    delivery: 'Delivered in 1 day',
    featured: false,
    whatsapp:
      "Hi, I'm interested in the EasyCom Starter plan (₹1,999). Please share more details.",
  },
  {
    id: 'advanced',
    badge: 'Full-Scale Retail',
    name: 'EasyCom Advanced',
    price: '8,999',
    blurb:
      'A complete e-commerce solution with advanced features including online payments, customer accounts, and order management.',
    features: [
      'Unlimited product listings',
      'Online payments & checkout',
      'Customer accounts & order tracking',
      'Admin dashboard with inventory',
      'Basic SEO & analytics setup',
    ],
    delivery: 'Delivered in 3-5 days',
    featured: true,
    whatsapp:
      "Hi, I'm interested in the EasyCom Advanced plan (₹8,999). Please share more details.",
  },
];

export default function EasyCom() {
  return (
    <section className={styles.easyComSection} id="easycom">
      {/* same canvas component the hero mounts — one grid, one phase */}
      <GridCanvas />

      <div className="container">
        <div className={styles.sectionHeader}>
          <p className="eyebrow">02 — We ship it fast</p>
          <h2 className="section-title">
            <span className="gradient-text">EasyCom</span> Speed Delivery Plans
          </h2>
          <p className="section-subtitle">
            Accelerate your retail venture with our pre-engineered e-commerce engines.
            Engineered for ultra-fast performance, high conversion rates, and rapid deployment.
          </p>
        </div>

        <motion.div
          className={styles.plansContainer}
          variants={GRID}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              className={`${styles.planCard} ${plan.featured ? styles.featured : ''}`}
              variants={CARD}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
            >
              {plan.featured && <span className={styles.recommended}>Recommended</span>}

              <span className={styles.planBadge}>{plan.badge}</span>
              <h3 className={styles.planTitle}>{plan.name}</h3>

              <p className={styles.planPrice}>
                <span className={styles.currency}>₹</span>
                {plan.price}
              </p>

              <p className={styles.planDescription}>{plan.blurb}</p>

              <ul className={styles.features}>
                {plan.features.map((f) => (
                  <li key={f}>
                    <span className={styles.checkDot}>
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <span className={styles.deliveryInfo}>
                {plan.featured ? (
                  <Zap size={14} strokeWidth={2.4} className={styles.boltIcon} aria-hidden="true" />
                ) : (
                  <span className={styles.liveDot} aria-hidden="true">
                    <i />
                  </span>
                )}
                {plan.delivery}
              </span>

              <a
                href={`https://wa.me/918139800591?text=${encodeURIComponent(plan.whatsapp)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.planBtn}
              >
                Get Started Now <ArrowRight size={17} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
