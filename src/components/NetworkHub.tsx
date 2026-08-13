'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe, Smartphone, Workflow, TrendingUp, type LucideIcon } from 'lucide-react';
import styles from './NetworkHub.module.css';

/**
 * Hero visual — the Drawcode core with four product surfaces wired to it.
 * The SVG uses a 0–100 square viewBox and the cards are placed in the same
 * percentage space, so every path lands on its card at any size.
 * `pathLength={100}` normalises the dash units, which is what lets one dash
 * pattern travel every curve at the same visual speed.
 *
 * Strictly monochrome: every tone here is zinc, no hue anywhere.
 */
type Node = {
  id: string;
  label: string;
  Icon: LucideIcon;
  value: string;
  caption: string;
  spark?: boolean;
  pos: string;
  path: string;
};

const NODES: Node[] = [
  {
    id: 'web',
    label: 'Website',
    Icon: Globe,
    value: '350K',
    caption: 'Monthly visits',
    pos: styles.tl,
    path: 'M 41 43 C 35 39 31 33 27 27',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    Icon: TrendingUp,
    value: '+38%',
    caption: 'Growth this quarter',
    spark: true,
    pos: styles.tr,
    path: 'M 59 43 C 65 39 69 33 73 27',
  },
  {
    id: 'app',
    label: 'Mobile app',
    Icon: Smartphone,
    value: '5300K',
    caption: 'App sessions',
    pos: styles.bl,
    path: 'M 41 57 C 35 61 31 67 27 73',
  },
  {
    id: 'automation',
    label: 'Automation',
    Icon: Workflow,
    value: '430+',
    caption: 'Workflows live',
    pos: styles.br,
    path: 'M 59 57 C 65 61 69 67 73 73',
  },
];

export default function NetworkHub() {
  const [hot, setHot] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className={styles.stage}>
      <span className={styles.wash} aria-hidden="true" />

      {/* ---------- wiring ---------- */}
      <svg className={styles.wires} viewBox="0 0 100 100" fill="none" aria-hidden="true">
        {NODES.map((n, i) => {
          const on = hot === n.id;
          return (
            <g key={n.id}>
              <path
                d={n.path}
                pathLength={100}
                className={`${styles.line} ${on ? styles.lineOn : ''}`}
              />
              {!reduce && (
                /* a zero-length dash under a round cap draws a dot, so the
                   packet is a travelling particle rather than a moving stripe */
                <motion.path
                  d={n.path}
                  pathLength={100}
                  className={styles.packet}
                  strokeDasharray="0.001 100"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.7,
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* ---------- central hub ---------- */}
      <div className={`${styles.card} ${styles.hub}`}>
        <span className={styles.hubMark}>
          <Image src="/logo-mark.png" alt="" width={301} height={301} aria-hidden="true" />
        </span>
        <span className={styles.hubName}>Drawcode Core</span>
        <span className={styles.status}>
          <span className={styles.dotWrap}>
            {!reduce && (
              <motion.i
                className={styles.ping}
                animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <i className={styles.dot} />
          </span>
          System Online
        </span>
      </div>

      {/* ---------- satellites ---------- */}
      {NODES.map((n, i) => (
        <motion.div
          key={n.id}
          className={`${styles.card} ${styles.node} ${n.pos}`}
          onPointerEnter={() => setHot(n.id)}
          onPointerLeave={() => setHot((h) => (h === n.id ? null : h))}
          animate={reduce ? undefined : { y: [-3, 3] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        >
          <span className={styles.nodeLabel}>{n.label}</span>

          {n.spark && (
            <svg className={styles.spark} viewBox="0 0 60 20" fill="none" aria-hidden="true">
              <polyline
                points="1,17 12,13 22,15 33,8 44,10 59,2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          <span className={styles.metric}>
            <span className={styles.metricIcon}>
              <n.Icon size={14} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className={styles.metricText}>
              <b>{n.value}</b>
              <em>{n.caption}</em>
            </span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}
