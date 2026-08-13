'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Globe, Code, Smartphone, Palette, Database, ShoppingCart, Workflow, LifeBuoy,
  ArrowRight,
} from 'lucide-react';
import styles from './Services.module.css';

const SERVICES = [
  {
    Icon: Globe,
    title: 'Website Design',
    body: 'Ultra-fast, responsive websites built with Next.js, React, and modern SEO architectures to maximize organic reach.',
  },
  {
    Icon: Code,
    title: 'Custom Software Development',
    body: 'Tailored backend ecosystems, APIs, and cloud infrastructure engineered for complex business workloads.',
  },
  {
    Icon: Smartphone,
    title: 'Mobile Application Development',
    body: 'High-performance cross-platform iOS and Android applications utilizing React Native and Flutter.',
  },
  {
    Icon: Palette,
    title: 'UI/UX Design',
    body: 'Visually stunning, accessible, and user-centric wireframes and layouts that boost engagement and brand trust.',
  },
  {
    Icon: Database,
    title: 'ERP & CRM Solutions',
    body: 'Streamlined operational management software to track real-time analytics, inventory, pipelines, and sales.',
  },
  {
    Icon: ShoppingCart,
    title: 'E-commerce Solutions',
    body: 'Conversion-focused storefronts with payments, order management, and inventory wired into one system.',
  },
  {
    Icon: Workflow,
    title: 'Automation Systems',
    body: 'Robust workflow architectures and AI agents that eliminate manual, error-prone task bottlenecks.',
  },
  {
    Icon: LifeBuoy,
    title: 'Maintenance & Tech Support',
    body: 'Ongoing monitoring, updates, and hands-on engineering support that keeps everything running in production.',
  },
];

/* parent only schedules — children carry the fade + rise */
const GRID = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const CARD = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } as const,
};

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className="eyebrow">01 — Build &amp; transform</p>
          <h2 className="section-title">End-to-End Digital Services</h2>
          <p className="section-subtitle">
            From the first wireframe to the systems that run the business — designed,
            engineered, and maintained by one team.
          </p>
        </div>

        <motion.div
          className={styles.grid}
          variants={GRID}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {SERVICES.map((s) => (
            <motion.article
              key={s.title}
              className={styles.card}
              variants={CARD}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <span className={styles.icon}>
                <s.Icon size={20} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>

              <Link href="/contact" className={styles.explore}>
                Explore
                <ArrowRight size={15} strokeWidth={2.2} className={styles.arrow} />
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
