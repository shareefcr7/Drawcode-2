'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Globe, Code, Smartphone, Palette, Database, Megaphone, Handshake, Cpu, LifeBuoy,
  Rocket, ChevronDown, ArrowRight,
} from 'lucide-react';
import styles from './Services.module.css';

/**
 * The nine services as a flow rather than a grid: five on the left, four on the
 * right, both sides feeding a launch node in the middle.
 *
 * The connector rail is decorative and lives in its own centre column, so it
 * never has to line up with card heights — each card carries its own coloured
 * dot at the inner edge, which is what actually reads as "wired to the flow".
 */
type Service = {
  n: string;
  title: string;
  desc: string;
  detail: string;
  color: string;
  Icon: typeof Globe;
};

const LEFT: Service[] = [
  {
    n: '01', title: 'Website Development', color: '#F59E0B', Icon: Globe,
    desc: 'Ultra-fast, responsive websites built with Next.js, React, and modern SEO architectures.',
    detail: 'Server-rendered pages, image and font optimisation, structured data and Core Web Vitals budgets — so the site ranks and stays fast as content grows.',
  },
  {
    n: '02', title: 'Custom Software Development', color: '#6366F1', Icon: Code,
    desc: 'Tailored backend ecosystems, APIs, and cloud infrastructure engineered for complex workloads.',
    detail: 'Typed APIs, clean data models and background processing, designed to be extended by the next engineer rather than rewritten.',
  },
  {
    n: '03', title: 'Mobile App Development', color: '#22C55E', Icon: Smartphone,
    desc: 'High-performance cross-platform iOS and Android applications utilizing React Native and Flutter.',
    detail: 'One codebase, two stores: shared business logic with native modules where the product genuinely needs them, plus over-the-air updates.',
  },
  {
    n: '04', title: 'UI/UX Design', color: '#14B8A6', Icon: Palette,
    desc: 'Visually stunning, accessible, and user-centric wireframes and layouts that boost engagement and brand trust.',
    detail: 'Research, flows and a token-based design system in Figma, handed to engineering as components rather than screenshots.',
  },
  {
    n: '05', title: 'ERP & CRM Solutions', color: '#3B82F6', Icon: Database,
    desc: 'Streamlined operational management software to track real-time analytics, inventory, pipelines, and sales.',
    detail: 'Inventory, orders, pipelines and people in one platform, with role-based access and reporting that replaces the spreadsheet chain.',
  },
];

const RIGHT: Service[] = [
  {
    n: '06', title: 'Digital Marketing', color: '#EC4899', Icon: Megaphone,
    desc: 'Data-driven growth strategies, SEO, content, social media, ads, and analytics to boost brand visibility and ROI.',
    detail: 'Search, paid and content working off one measurement setup, so spend is judged on pipeline rather than impressions.',
  },
  {
    n: '07', title: 'Sales Solutions', color: '#C6A87C', Icon: Handshake,
    desc: 'Innovative digital funnels and tools to streamline lead management and accelerate business growth.',
    detail: 'Landing pages, lead capture and CRM routing wired together, so an enquiry reaches the right person the moment it lands.',
  },
  {
    n: '08', title: 'Business Automation', color: '#10B981', Icon: Cpu,
    desc: 'Robust workflow script automation and AI agents that eliminate manual work and increase productivity.',
    detail: 'Workflows, triggers and agents take over the repetitive steps between systems — removing the handoffs where errors used to live.',
  },
  {
    n: '09', title: 'Maintenance & Support', color: '#F97316', Icon: LifeBuoy,
    desc: 'Ongoing monitoring, updates, and hands-on engineering support that keeps everything running in production.',
    detail: 'Uptime monitoring, dependency and security updates, backups and a named engineer who already knows the codebase.',
  },
];

function Card({
  s, side, index, open, onToggle, reduce,
}: {
  s: Service;
  side: 'l' | 'r';
  index: number;
  open: boolean;
  onToggle: () => void;
  reduce: boolean;
}) {
  return (
    <motion.article
      className={`${styles.card} ${side === 'l' ? styles.left : styles.right}`}
      style={{ ['--edge' as string]: s.color }}
      data-open={open ? '' : undefined}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: side === 'l' ? -48 : 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={
        reduce
          ? { duration: 0.3 }
          : { type: 'spring', stiffness: 120, damping: 20, delay: index * 0.08 }
      }
    >
      {/* coloured edge — grows into place as the card lands */}
      <motion.span
        className={styles.edge}
        initial={reduce ? undefined : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 + 0.15 }}
        aria-hidden="true"
      />

      <button type="button" className={styles.head} onClick={onToggle} aria-expanded={open}>
        <motion.span
          className={styles.num}
          initial={reduce ? undefined : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.08 + 0.12 }}
        >
          {s.n}
        </motion.span>

        <span className={styles.icon}>
          <s.Icon size={22} strokeWidth={1.7} aria-hidden="true" />
        </span>

        <span className={styles.body}>
          <h3 className={styles.title}>{s.title}</h3>
          <p className={styles.desc}>{s.desc}</p>
        </span>

        <ChevronDown size={16} className={styles.chevron} aria-hidden="true" />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={styles.detailWrap}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <p className={styles.detail}>{s.detail}</p>
            <Link href="/contact" className={styles.detailLink}>
              Start a project <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <span className={styles.dot} aria-hidden="true" />
    </motion.article>
  );
}

export default function Services() {
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion() ?? false;
  const toggle = (n: string) => setOpen((c) => (c === n ? null : n));

  return (
    <section className={styles.section} id="services">
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className="eyebrow">01 — Build &amp; transform</p>
          <h2 className="section-title">End-to-End Digital Services</h2>
          <p className="section-subtitle">
            We provide full-spectrum digital transformation solutions, helping companies
            scale from concept to global enterprise.
          </p>
        </div>

        <div className={styles.flow}>
          <div className={styles.column}>
            {LEFT.map((s, i) => (
              <Card
                key={s.n}
                s={s}
                side="l"
                index={i}
                open={open === s.n}
                onToggle={() => toggle(s.n)}
                reduce={reduce}
              />
            ))}
          </div>

          {/* ---------- centre rail ---------- */}
          <div className={styles.rail} aria-hidden="true">
            <svg
              className={styles.railLines}
              viewBox="0 0 200 900"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                className={styles.railPath}
                d="M 20 60 C 90 120 90 340 100 430 C 110 520 90 760 20 840"
              />
              <path
                className={styles.railPath}
                d="M 180 90 C 110 150 110 350 100 440 C 90 530 110 780 180 860"
              />
            </svg>

            <span className={styles.hub}>
              <Rocket size={22} strokeWidth={1.8} />
            </span>
          </div>

          <div className={`${styles.column} ${styles.columnRight}`}>
            {RIGHT.map((s, i) => (
              <Card
                key={s.n}
                s={s}
                side="r"
                index={i}
                open={open === s.n}
                onToggle={() => toggle(s.n)}
                reduce={reduce}
              />
            ))}
          </div>
        </div>

        <div className={styles.actionRow}>
          <Link href="/contact" className={styles.explore}>
            Explore All Services <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
