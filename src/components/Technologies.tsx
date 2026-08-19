'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { Cloud, Workflow, ShoppingBag, Users, Code } from 'lucide-react';
import { FaAws } from 'react-icons/fa';
import styles from './Technologies.module.css';

/**
 * What we deliver, drawn as an architecture diagram: six offerings wired into
 * one delivery core. Geometry lives in a single 1000×620 user space and the
 * cards are placed in the same space as percentages, so every curve keeps
 * meeting its card at any width.
 *
 * Nodes are charcoal rather than per-brand — these are services, not logos. The
 * one exception is AWS, which is a real product mark and keeps its orange.
 */
const NODES = [
  {
    id: 'ecommerce', group: 'Commerce', name: 'E-Commerce Solutions',
    desc: 'High-converting Digital Storefronts',
    color: '#3f3f46', Icon: ShoppingBag, side: 'l' as const, row: 0,
    path: 'M 305 99 C 370 99 380 200 382 290',
    project: 'Luxury Storefront Engine',
    summary:
      'A premium retail storefront rebuilt around checkout speed. We replaced the page stack with a Next.js front end, moved the catalogue behind an edge cache and re-sequenced the checkout so payment starts before the cart finishes revalidating.',
    metrics: [
      { value: '0.8s', label: 'Load speed, from 4.2s' },
      { value: '+24%', label: 'Checkout conversion' },
    ],
    cta: { label: 'View Live Project', href: 'https://www.fetchkids.in/', external: true },
  },
  {
    id: 'erp', group: 'Enterprise', name: 'Custom ERP Systems',
    desc: 'Business & Operations Automation',
    color: '#3f3f46', Icon: Workflow, side: 'l' as const, row: 1,
    path: 'M 305 310 C 340 310 355 310 382 310',
    project: 'Logistics & Resource Automation',
    summary:
      'Vehicles, drivers, trips and maintenance schedules moved out of spreadsheets and into one operational platform, with live GPS, automated service alerts and role-based access for dispatch, finance and management.',
    metrics: [
      { value: '30+ hrs', label: 'Saved every week' },
      { value: 'Real-time', label: 'Fleet & cost reporting' },
    ],
    cta: { label: 'View Live Project', href: '/projects', external: false },
  },
  {
    id: 'saas', group: 'Core Product', name: 'SaaS Platforms',
    desc: 'Multi-tenant & Scalable Cloud Apps',
    color: '#3f3f46', Icon: Cloud, side: 'l' as const, row: 2,
    path: 'M 305 521 C 370 521 380 420 382 330',
    project: 'Custom Ledger Engine',
    summary:
      'A multi-tenant ledger built to financial compliance standards — tenant isolation, an append-only transaction model and a fully typed API surface, delivered inside the client\'s audit window.',
    metrics: [
      { value: '100%', label: 'Type-safe transaction paths' },
      { value: 'Audit', label: 'Compliance requirements met' },
    ],
    cta: { label: 'View Live Project', href: '/projects', external: false },
  },
  {
    id: 'talent', group: 'Talent Sourcing', name: 'Dedicated Tech Teams',
    desc: 'Full-stack Engineers for Hire',
    color: '#3f3f46', Icon: Users, side: 'r' as const, row: 0,
    path: 'M 695 99 C 630 99 620 200 618 290',
    project: 'Embedded Engineering Pods',
    summary:
      'Vetted engineers who join your standups and ship from week one. You keep the roadmap; we carry hiring, ramp-up and cover, matched to the stack you already run.',
    metrics: [
      { value: '1 week', label: 'Typical onboarding' },
      { value: 'Senior', label: 'Full-stack, React & Node' },
    ],
    cta: { label: 'Hire a Team', href: '/contact', external: false },
  },
  {
    id: 'cloud', group: 'Cloud & Infra', name: 'AWS & Cloud Scaling',
    desc: 'High Availability Architecture',
    color: '#FF9900', Icon: FaAws, side: 'r' as const, row: 1,
    path: 'M 695 310 C 660 310 645 310 618 310',
    project: 'Always-On Infrastructure',
    summary:
      'Auto-scaling groups, managed databases and edge caching, with failover and monitoring in place before the traffic arrives — so launches and sale days are a capacity setting, not an incident.',
    metrics: [
      { value: '99.9%', label: 'Service uptime target' },
      { value: 'Auto', label: 'Scaling on demand' },
    ],
    cta: { label: 'Talk to Us', href: '/contact', external: false },
  },
  {
    id: 'apps', group: 'Mobile & Web', name: 'Cross-Platform Engineering',
    desc: 'Next.js, Flutter & React Native',
    color: '#3f3f46', Icon: Code, side: 'r' as const, row: 2,
    path: 'M 695 521 C 630 521 620 420 618 330',
    project: 'One Product, Three Surfaces',
    summary:
      'Web, iOS and Android built on a shared design system, so a change to a component lands everywhere instead of being rebuilt three times.',
    metrics: [
      { value: 'iOS + Android', label: 'From one codebase' },
      { value: 'Shared', label: 'Design system across web' },
    ],
    cta: { label: 'View Live Projects', href: '/projects', external: false },
  },
];

/* the hub is clickable too, so it needs an entry the dialog can read */
const CORE = {
  id: 'core',
  group: 'Delivery Engine',
  name: 'Drawcode Delivery Engine',
  desc: 'SaaS • ERP • E-Commerce • Talent Sourcing',
  color: '#3f3f46',
  project: 'One Team, End to End',
  summary:
    'Design, engineering, infrastructure and staffing under one roof — so the product, the systems behind it and the people running it all come from the same place, with one team accountable for the result.',
  metrics: [
    { value: '150+', label: 'Projects delivered' },
    { value: '24/7', label: 'Post-launch support' },
  ],
  cta: { label: 'Start a Project', href: '/contact', external: false },
} as const;

const ROW_CLASS = [styles.row0, styles.row1, styles.row2];

const cell = (side: 'l' | 'r', row: number, reduce: boolean): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, x: side === 'l' ? -40 : 40, scale: 0.96 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: reduce
      ? { duration: 0.3 }
      : { type: 'spring', stiffness: 140, damping: 20, delay: row * 0.1 },
  },
});

/* the ripple only exists while the card is hovered — the parent's `hover`
   label reaches it because both sides use variant labels, not inline objects */
const ripple: Variants = {
  hidden: { opacity: 0, scale: 1 },
  show: { opacity: 0, scale: 1 },
  hover: {
    opacity: [0.6, 0],
    scale: [1, 1.3],
    transition: { duration: 1.1, repeat: Infinity, ease: 'easeOut' },
  },
};

export default function Technologies() {
  const [hot, setHot] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion() ?? false;
  const active = open === CORE.id ? CORE : NODES.find((t) => t.id === open);

  /* Escape closes, and the page behind stops scrolling while the dialog is up */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <section className={styles.techSection} id="deliver">
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className="eyebrow">03 — Built and delivered by one team</p>
          <h2 className="section-title">What We Deliver</h2>
          <p className="section-subtitle">
            SaaS platforms, ERP systems and storefronts — plus the engineers to build
            and run them — every offering wired into one delivery engine.
          </p>
        </div>

        <div className={styles.stage} data-hot={hot ? '' : undefined}>
          {/* ---------- wiring ---------- */}
          <svg
            className={styles.wires}
            viewBox="0 0 1000 620"
            fill="none"
            aria-hidden="true"
          >
            {NODES.map((t, i) => {
              const on = hot === t.name;
              return (
                <g key={t.name} style={{ ['--brand' as string]: t.color }}>
                  <path d={t.path} className={`${styles.line} ${on ? styles.lineOn : ''}`} />
                  {!reduce && (
                    <>
                      <motion.path
                        d={t.path}
                        className={`${styles.flow} ${on ? styles.flowOn : ''}`}
                        strokeDasharray="8 8"
                        animate={{ strokeDashoffset: [0, -100] }}
                        transition={{
                          duration: on ? 1.1 : 3,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: i * 0.18,
                        }}
                      />
                      {/* a packet riding the curve into the core. `offsetPath`
                          takes the same user-unit path string, so the circle
                          follows the exact line rather than an approximation */}
                      <motion.circle
                        r="3"
                        cx="0"
                        cy="0"
                        className={styles.packet}
                        style={{ offsetPath: `path("${t.path}")`, offsetRotate: '0deg' }}
                        animate={{ offsetDistance: ['0%', '100%'] }}
                        transition={{
                          duration: on ? 1 : 2.6,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: i * 0.22,
                        }}
                      />
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {/* ---------- core ---------- */}
          <motion.button
            type="button"
            className={styles.core}
            layoutId={`tech-card-${CORE.id}`}
            onClick={() => setOpen(CORE.id)}
            aria-haspopup="dialog"
            aria-label={`${CORE.name}. Open details`}
          >
            {!reduce && (
              <>
                <span className={`${styles.radar} ${styles.radarA}`} aria-hidden="true" />
                <span className={`${styles.radar} ${styles.radarB}`} aria-hidden="true" />
              </>
            )}

            <span className={styles.coreMark}>
              <Image src="/logo-mark.png" alt="" width={301} height={301} aria-hidden="true" />
            </span>
            <span className={styles.coreName}>Drawcode Delivery Engine</span>
            <span className={styles.coreStatus}>
              <span className={styles.liveDot} aria-hidden="true">
                {!reduce && <i />}
              </span>
              {hot ?? 'SaaS • ERP • E-Commerce • Talent Sourcing'}
            </span>
          </motion.button>

          {/* ---------- technology nodes ---------- */}
          {NODES.map((t) => (
            <motion.div
              key={t.name}
              className={`${styles.cell} ${t.side === 'l' ? styles.left : styles.right} ${ROW_CLASS[t.row]}`}
              style={{ ['--brand' as string]: t.color }}
              data-dim={hot && hot !== t.name ? '' : undefined}
              layoutId={`tech-card-${t.id}`}
              variants={cell(t.side, t.row, reduce)}
              initial="hidden"
              whileInView="show"
              whileHover={reduce ? undefined : 'hover'}
              viewport={{ once: true, amount: 0.2 }}
              onPointerEnter={() => setHot(t.name)}
              onPointerLeave={() => setHot((h) => (h === t.name ? null : h))}
            >
              <motion.button
                type="button"
                className={styles.card}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        rotateX: 5,
                        rotateY: t.side === 'l' ? -5 : 5,
                        scale: 1.04,
                        y: -4,
                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                      }
                }
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                onClick={() => setOpen(t.id)}
                aria-haspopup="dialog"
                aria-label={`${t.name} — ${t.desc}. Open details`}
              >
                <span className={styles.icon}>
                  <motion.i className={styles.ripple} variants={ripple} aria-hidden="true" />
                  <t.Icon size={22} color={t.color} aria-hidden="true" />
                </span>
                <span className={styles.meta}>
                  <span className={styles.group}>{t.group}</span>
                  <h3 className={styles.name}>{t.name}</h3>
                  <p className={styles.desc}>{t.desc}</p>
                </span>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* ---------- detail dialog ----------
            the modal carries the same `layoutId` as the card it came from, so
            framer morphs one box into the other instead of cross-fading */}
        <AnimatePresence>
          {active && (
            <div className={styles.overlay}>
              <motion.div
                className={styles.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(null)}
              />

              <motion.div
                layoutId={`tech-card-${active.id}`}
                className={styles.modal}
                style={{ ['--brand' as string]: active.color }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="tech-modal-title"
              >
                <div className={styles.modalHead}>
                  <span className={styles.modalIcon}>
                    {'Icon' in active ? (
                      <active.Icon size={26} color={active.color} aria-hidden="true" />
                    ) : (
                      <Image
                        src="/logo-mark.png"
                        alt=""
                        width={301}
                        height={301}
                        className={styles.modalMark}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  <span className={styles.modalTitles}>
                    <span className={styles.group}>{active.group}</span>
                    <h3 id="tech-modal-title" className={styles.modalName}>{active.name}</h3>
                  </span>
                  <button
                    type="button"
                    className={styles.close}
                    onClick={() => setOpen(null)}
                    aria-label="Close"
                    autoFocus
                  >
                    <X size={17} />
                  </button>
                </div>

                <div className={styles.modalBlock}>
                  <h4 className={styles.modalLabel}>Featured project</h4>
                  <p className={styles.projectName}>{active.project}</p>
                </div>

                <div className={styles.metrics}>
                  {active.metrics.map((m) => (
                    <span key={m.label} className={styles.metric}>
                      <b>{m.value}</b>
                      <em>{m.label}</em>
                    </span>
                  ))}
                </div>

                <div className={styles.modalBlock}>
                  <h4 className={styles.modalLabel}>Case study</h4>
                  <p className={styles.modalText}>{active.summary}</p>
                </div>

                {active.cta.external ? (
                  <a
                    href={active.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cta}
                  >
                    {active.cta.label} <ArrowRight size={16} />
                  </a>
                ) : (
                  <Link href={active.cta.href} className={styles.cta}>
                    {active.cta.label} <ArrowRight size={16} />
                  </Link>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
