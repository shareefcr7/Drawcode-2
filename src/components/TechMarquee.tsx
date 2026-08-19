'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, Pause, Play } from 'lucide-react';
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiPostgresql, SiDocker, SiFigma, SiFlutter,
  SiTypescript, SiGithub, SiExpress, SiMongodb,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import styles from './TechMarquee.module.css';

/**
 * The stack as two marquee rows running in opposite directions.
 *
 * The rows are plain CSS animations rather than framer motion values: a marquee
 * runs for the life of the page, and `animation-play-state: paused` is one
 * declaration where a JS loop would be a permanent rAF. Pausing — on hover, on
 * click, or from the toggle — is just that property flipping.
 *
 * AWS uses the Font Awesome mark: Simple Icons dropped the AWS logo, so
 * `SiAmazonwebservices` does not exist.
 */
type Tech = {
  id: string;
  name: string;
  desc: string;
  color: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  why: string;
  caps: string[];
};

const ROWS: Tech[][] = [
  [
    {
      id: 'figma', name: 'Figma', desc: 'UI/UX Collaborative Design', color: '#F24E1E', Icon: SiFigma,
      why: 'Where the design system lives, so engineering builds from tokens and components rather than screenshots.',
      caps: ['Design Tokens', 'Auto Layout', 'Prototyping', 'Live Handoff'],
    },
    {
      id: 'github', name: 'GitHub', desc: 'Version Control & Collaboration', color: '#181717', Icon: SiGithub,
      why: 'Reviewable history and safe parallel work, with releases that can be rolled back instead of hot-fixed at midnight.',
      caps: ['Pull Requests', 'Code Review', 'Actions CI', 'Branch Protection'],
    },
    {
      id: 'typescript', name: 'TypeScript', desc: 'Typed JavaScript Superset', color: '#3178C6', Icon: SiTypescript,
      why: 'Types catch the class of bug that reaches production quietly — wrong shape, missing field, renamed property — before a build ever ships.',
      caps: ['Static Typing', 'Strict Mode', 'Shared Contracts', 'Safe Refactors'],
    },
    {
      id: 'react', name: 'React.js', desc: 'Frontend UI Library', color: '#61DAFB', Icon: SiReact,
      why: 'Component-driven interfaces with predictable state and fast, surgical re-renders — the base every front end here is built on.',
      caps: ['React 19', 'Hooks & Context', 'Suspense', 'Server Components'],
    },
    {
      id: 'nextjs', name: 'Next.js', desc: 'React Application Framework', color: '#000000', Icon: SiNextdotjs,
      why: 'Server rendering, routing, caching and image optimisation without the config sprawl — the difference between a fast site and a fast site we can keep fast.',
      caps: ['App Router', 'Server Actions', 'ISR Caching', 'Edge Runtime'],
    },
    {
      id: 'flutter', name: 'Flutter', desc: 'Cross-Platform Mobile SDK', color: '#02569B', Icon: SiFlutter,
      why: 'Build high-performance mobile applications for both iOS and Android from a shared codebase, cutting delivery time without giving up native feel.',
      caps: ['Cross-Platform', 'Hot Reload', 'Rich UI Components', 'High Performance'],
    },
  ],
  [
    {
      id: 'nodejs', name: 'Node.js', desc: 'Server Runtime Environment', color: '#339933', Icon: SiNodedotjs,
      why: 'One language across the stack, with a mature ecosystem for APIs, background jobs and real-time work.',
      caps: ['REST + WebSockets', 'Background Jobs', 'Typed APIs', 'Streaming'],
    },
    {
      id: 'express', name: 'Express.js', desc: 'Backend Web Framework', color: '#000000', Icon: SiExpress,
      why: 'A thin, predictable layer for routing and middleware — small enough to read end to end, which is what keeps an API maintainable years later.',
      caps: ['Routing', 'Middleware', 'REST APIs', 'Auth Layers'],
    },
    {
      id: 'mongodb', name: 'MongoDB', desc: 'NoSQL Document Database', color: '#47A248', Icon: SiMongodb,
      why: 'Flexible document models for catalogues, records and content that keep changing shape as the product does.',
      caps: ['Atlas Hosting', 'Aggregation', 'Flexible Schema', 'Indexing'],
    },
    {
      id: 'postgresql', name: 'PostgreSQL', desc: 'Relational Database System', color: '#4169E1', Icon: SiPostgresql,
      why: 'The system of record: relational integrity for orders, ledgers and anything that has to reconcile at the end of the month.',
      caps: ['ACID Transactions', 'Row-Level Security', 'JSONB', 'Full-Text Search'],
    },
    {
      id: 'docker', name: 'Docker', desc: 'Application Containerization', color: '#2496ED', Icon: SiDocker,
      why: 'Identical environments from a developer laptop through to production, so "works on my machine" stops being a phrase anyone says.',
      caps: ['Reproducible Builds', 'Multi-Stage', 'Compose', 'CI/CD Pipelines'],
    },
    {
      id: 'aws', name: 'AWS', desc: 'Cloud Infrastructure & Hosting', color: '#FF9900', Icon: FaAws,
      why: 'Managed infrastructure that scales with load instead of guesswork, with failover and monitoring in place before the traffic arrives.',
      caps: ['Auto-Scaling', 'S3 & CloudFront', 'Lambda', 'High Availability'],
    },
  ],
];

const ALL = ROWS.flat();

/* row 1 carries cards left -> right, row 2 the other way */
const DIRECTION = [styles.toRight, styles.toLeft];

export default function TechMarquee() {
  const [open, setOpen] = useState<string | null>(null);
  const [held, setHeld] = useState(false);
  const reduce = useReducedMotion() ?? false;
  const active = ALL.find((t) => t.id === open);

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

  /* one flag for every reason the rows might be still */
  const frozen = held || open !== null || reduce;

  return (
    <section className={styles.section} id="technologies">
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className="eyebrow">04 — We connect the system</p>
          <h2 className="section-title">Our Modern Tech Stack</h2>
          <p className="section-subtitle">
            We engineer high-performance systems with cutting-edge, industry-standard
            technologies to ensure modularity, efficiency, and long-term scalability.
          </p>
        </div>
      </div>

      {/* full-bleed on purpose: the rows should run off both edges */}
      <div className={styles.lanes} data-frozen={frozen ? '' : undefined}>
        {ROWS.map((row, laneIndex) => (
          <div key={laneIndex} className={`${styles.lane} ${DIRECTION[laneIndex]}`}>
            <div className={styles.viewport}>
              <div className={styles.track}>
                {/* the list is rendered twice — the animation travels exactly one
                    copy's width, so the seam never shows */}
                {[...row, ...row].map((t, i) => {
                  const clone = i >= row.length;
                  return (
                    <button
                      key={`${t.id}-${i}`}
                      type="button"
                      className={styles.card}
                      style={{ ['--brand' as string]: t.color }}
                      onClick={() => setOpen(t.id)}
                      aria-haspopup="dialog"
                      /* the second copy is decorative — screen readers and the
                         tab order should meet each technology once */
                      aria-hidden={clone ? true : undefined}
                      tabIndex={clone ? -1 : undefined}
                    >
                      <span className={styles.icon}>
                        <t.Icon size={26} color={t.color} />
                      </span>
                      <span className={styles.meta}>
                        <span className={styles.name}>{t.name}</span>
                        <span className={styles.desc}>{t.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* position indicator: the dot tracks the row's own loop */}
            <span className={styles.progress} aria-hidden="true">
              <i className={styles.progressDot} />
            </span>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setHeld((h) => !h)}
          aria-pressed={held}
          aria-label={held ? 'Resume the technology rows' : 'Pause the technology rows'}
        >
          {held ? <Play size={14} /> : <Pause size={14} />}
        </button>
        <span className={styles.hint}>Hover to pause • Click any card to view details</span>
      </div>

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
              className={styles.modal}
              style={{ ['--brand' as string]: active.color }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="tech-name"
            >
              <div className={styles.modalHead}>
                <span className={styles.modalIcon}>
                  <active.Icon size={30} color={active.color} />
                </span>
                <span className={styles.modalTitles}>
                  <h3 id="tech-name" className={styles.modalName}>{active.name}</h3>
                  <span className={styles.modalDesc}>{active.desc}</span>
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

              <div className={styles.modalBody}>
                <div>
                  <h4 className={styles.modalLabel}>Why we use it</h4>
                  <p className={styles.modalText}>{active.why}</p>
                </div>

                <div>
                  <h4 className={styles.modalLabel}>Core capabilities</h4>
                  <span className={styles.caps}>
                    {active.caps.map((c) => (
                      <i key={c}>{c}</i>
                    ))}
                  </span>
                </div>
              </div>

              <span className={styles.status}>
                <i />
                Active in Drawcode production builds
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
