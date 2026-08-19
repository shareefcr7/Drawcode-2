'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, Cloud, ShoppingCart, Code, TrendingUp, Settings, Smartphone,
  type LucideIcon,
} from 'lucide-react';
import styles from './CTA.module.css';

const WHATSAPP = `https://wa.me/918139800591?text=${encodeURIComponent(
  "Hi Drawcode, I'd like to build my next project. Can we discuss?",
)}`;

/**
 * Closing statement — a white glass card holding the Drawcode architecture
 * diagram: two source nodes on the left feed the core, two delivery nodes on
 * the right consume it.
 *
 * Geometry lives in one 1000×380 user-space viewBox and the cards are placed in
 * the same space as percentages, so paths and cards stay locked together at any
 * width. `pathLength={100}` normalises the dash units, which is what lets one
 * dash pattern travel every curve — long or short — at the same visual speed.
 */
const PATHS = [
  { id: 'p1', branch: 'cart', d: 'M 273 178 C 300 150 320 112 340 104' },
  { id: 'p2', branch: 'code', d: 'M 273 202 C 300 230 320 268 340 276' },
  { id: 'p3', branch: 'trunk', d: 'M 277 190 L 452 190' },
  { id: 'p4', branch: 'cart', d: 'M 390 110 C 415 125 430 155 456 172' },
  { id: 'p5', branch: 'code', d: 'M 390 270 C 415 255 430 225 456 208' },
  { id: 'p6', branch: 'chart', d: 'M 544 172 C 570 155 585 125 610 110' },
  { id: 'p7', branch: 'gear', d: 'M 544 208 C 570 225 585 255 610 270' },
  { id: 'p8', branch: 'trunk', d: 'M 548 190 L 723 190' },
  { id: 'p9', branch: 'chart', d: 'M 660 104 C 680 112 700 150 727 178' },
  { id: 'p10', branch: 'gear', d: 'M 660 276 C 680 268 700 230 727 202' },
];

/** the four inline icon pucks that sit on the wiring */
const PUCKS: { id: string; Icon: LucideIcon; pos: string }[] = [
  { id: 'cloud', Icon: Cloud, pos: styles.puckCloud },
  { id: 'cart', Icon: ShoppingCart, pos: styles.puckCart },
  { id: 'code', Icon: Code, pos: styles.puckCode },
  { id: 'chart', Icon: TrendingUp, pos: styles.puckChart },
  { id: 'gear', Icon: Settings, pos: styles.puckGear },
  { id: 'phone', Icon: Smartphone, pos: styles.puckPhone },
];

type Node = {
  id: string;
  branch: string;
  title: string;
  pos: string;
  stats: { value: string; label: string }[];
};

const NODES: Node[] = [
  {
    id: 'system',
    branch: 'cart',
    title: 'drawcode / system',
    pos: styles.nodeTL,
    stats: [
      { value: '350K', label: 'ecommerce' },
      { value: '38%', label: 'Design' },
    ],
  },
  {
    id: 'website',
    branch: 'code',
    title: 'Website',
    pos: styles.nodeBL,
    stats: [
      { value: '325', label: 'Background' },
      { value: '82.2K', label: 'Analytics' },
    ],
  },
  {
    id: 'mobile',
    branch: 'chart',
    title: 'Mobile app',
    pos: styles.nodeTR,
    stats: [
      { value: '5300K', label: 'Analytics' },
      { value: '49', label: 'Analytics' },
    ],
  },
  {
    id: 'automation',
    branch: 'gear',
    title: 'Automation',
    pos: styles.nodeBR,
    stats: [
      { value: '430+', label: 'Background' },
      { value: '+10%', label: 'Website' },
    ],
  },
];

export default function CTA() {
  const [hot, setHot] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <section className={styles.ctaSection} id="cta">
      <div className="container">
        <motion.div
          className={styles.banner}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className={styles.badge}>06 — We help it grow</span>

          {/* ---------- architecture diagram ---------- */}
          <div className={styles.stage}>
            <svg
              className={styles.wires}
              viewBox="0 0 1000 380"
              fill="none"
              aria-hidden="true"
            >
              {PATHS.map((p, i) => (
                <g key={p.id}>
                  <path
                    d={p.d}
                    pathLength={100}
                    className={`${styles.line} ${hot === p.branch ? styles.lineOn : ''}`}
                  />
                  {!reduce && (
                    <motion.path
                      d={p.d}
                      pathLength={100}
                      className={styles.packet}
                      strokeDasharray="4 96"
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.32,
                      }}
                    />
                  )}
                </g>
              ))}
            </svg>

            {/* icon pucks on the wiring */}
            {PUCKS.map(({ id, Icon, pos }) => (
              <span key={id} className={`${styles.puck} ${pos}`}>
                <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
              </span>
            ))}

            {/* floating capability pills */}
            <span className={`${styles.pill} ${styles.pillCloud}`}>Cloud</span>
            <span className={`${styles.pill} ${styles.pillSoftware}`}>Software</span>
            <span className={`${styles.pill} ${styles.pillErp}`}>ERP</span>
            <span className={`${styles.pill} ${styles.pillCrm}`}>CRM</span>

            {/* central hub */}
            <span className={styles.hub}>
              <span className={styles.hubCore}>
                <Image
                  src="/logo-mark.png"
                  alt=""
                  width={301}
                  height={301}
                  aria-hidden="true"
                />
              </span>
              {!reduce && (
                <motion.i
                  className={styles.hubPing}
                  animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <span className={styles.hubDot} aria-hidden="true">
                {!reduce && (
                  <motion.i
                    animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
              </span>
            </span>

            {/* satellite cards */}
            {NODES.map((n, i) => (
              <motion.div
                key={n.id}
                className={`${styles.node} ${n.pos}`}
                onPointerEnter={() => setHot(n.branch)}
                onPointerLeave={() => setHot((h) => (h === n.branch ? null : h))}
                animate={reduce ? undefined : { y: [-3, 3] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: i * 0.4,
                }}
              >
                <span className={styles.nodeTitle}>{n.title}</span>
                <span className={styles.nodeStats}>
                  {n.stats.map((s) => (
                    <span key={s.label + s.value}>
                      <b>{s.value}</b>
                      <em>{s.label}</em>
                    </span>
                  ))}
                </span>
              </motion.div>
            ))}
          </div>

          <p className={styles.description}>
            Partner with Drawcode to design, engineer, and deploy high-performance custom
            applications, websites, and business automations tailored to your scale.
          </p>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            Get Started Today <ArrowRight size={17} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
