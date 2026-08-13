'use client';

import { useRef, useState } from 'react';
import {
  AnimatePresence, motion, useScroll, useMotionValueEvent, useTransform,
} from 'framer-motion';
import {
  Lightbulb, Layout, Code, Layers, Database, Cpu, TrendingUp,
} from 'lucide-react';
import ProcessVisual from './ProcessVisuals';
import styles from './ScrollStory.module.css';

const SPRING = { type: 'spring', stiffness: 260, damping: 25 } as const;

/** One chapter per ecosystem phase — index matches ECOSYSTEM_PHASES. */
const CHAPTERS = [
  {
    kicker: 'Idea',
    icon: Lightbulb,
    title: 'It starts as a problem worth solving',
    body: 'We map the business, the users and the constraints before a single screen is drawn — so what gets built is the thing that was actually needed.',
  },
  {
    kicker: 'Design',
    icon: Layout,
    title: 'The interface takes shape',
    body: 'Type scale, colour, spacing and components become a design system your product can grow into, not a set of one-off screens.',
  },
  {
    kicker: 'Code',
    icon: Code,
    title: 'Design becomes working software',
    body: 'Next.js, React and React Native on the front, typed APIs and clean data models behind them — engineered to be extended, not rewritten.',
  },
  {
    kicker: 'Product',
    icon: Layers,
    title: 'Services connect into a system',
    body: 'Gateways, databases, auth and roles come online. The website, the app and the admin all speak to the same source of truth.',
  },
  {
    kicker: 'ERP & CRM',
    icon: Database,
    title: 'The business runs on it',
    body: 'Inventory, orders, pipelines and customers move into one operational platform, with real-time numbers instead of scattered spreadsheets.',
  },
  {
    kicker: 'Automation',
    icon: Cpu,
    title: 'The manual work disappears',
    body: 'Workflows, triggers and agents take over the repetitive steps between systems, removing the handoffs where errors used to live.',
  },
  {
    kicker: 'Growth',
    icon: TrendingUp,
    title: 'One ecosystem, compounding',
    body: 'Every piece feeds the next — traffic to product, product to data, data to decisions. That is when a digital system starts paying for itself.',
  },
];

export default function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);

  /* Scroll drives the phase. Only a phase change re-renders — not every frame. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    /* clamped both ends — an out-of-range index would leave the canvas empty */
    const raw = Math.floor(p * CHAPTERS.length);
    const next = Math.max(0, Math.min(CHAPTERS.length - 1, raw));
    setPhase((prev) => (prev === next ? prev : next));
  });

  /* Continuous values stay on the compositor — no React involvement. */
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const visualY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  /* Tabs scroll the page to the middle of that step's band; the scroll listener
     then sets `phase`, so clicking and scrolling can never disagree. */
  const goToStep = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + ((i + 0.5) / CHAPTERS.length) * travel;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="how-we-build"
      className={styles.section}
      style={{ height: `${CHAPTERS.length * 90}vh` }}
      aria-label="How we build"
    >
      <div className={styles.sticky}>
        <div className={`container ${styles.inner}`}>
          {/* ---------- Copy column ---------- */}
          <div className={styles.copy}>
            <p className="eyebrow">How we build</p>

            {/* every chapter is rendered so the copy stays crawlable and
                screen-reader accessible; only the active one is shown */}
            <div className={styles.chapter}>
              {CHAPTERS.map((c, i) => {
                const on = i === phase;
                return (
                  <motion.div
                    key={c.kicker}
                    className={styles.slide}
                    aria-hidden={!on}
                    initial={false}
                    animate={{ opacity: on ? 1 : 0, y: on ? 0 : 16 }}
                    transition={SPRING}
                    style={{ pointerEvents: on ? 'auto' : 'none' }}
                  >
                    <span className={styles.kicker}>
                      <span className={styles.kickerIndex}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {c.kicker}
                    </span>

                    <h2 className={styles.title}>{c.title}</h2>
                    <p className={styles.body}>{c.body}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* progress rail */}
            <div className={styles.rail} aria-hidden="true">
              <motion.span className={styles.railFill} style={{ scaleX: railScale }} />
            </div>

            {/* horizontal tab nav — scroll drives it, and it drives scroll */}
            <ol className={styles.steps}>
              {CHAPTERS.map((c, i) => {
                const Icon = c.icon;
                const on = i === phase;
                return (
                  <li key={c.kicker}>
                    <button
                      type="button"
                      className={`${styles.step} ${on ? styles.stepOn : ''}`}
                      onClick={() => goToStep(i)}
                      aria-current={on ? 'step' : undefined}
                      aria-label={`Step ${i + 1}: ${c.kicker}`}
                    >
                      <Icon size={13} strokeWidth={2.2} aria-hidden="true" />
                      <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                      {c.kicker}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ---------- Canvas — gradient mesh behind one live scene ---------- */}
          <motion.div className={styles.visual} style={{ y: visualY }}>
            <div className={styles.canvas}>
              <span className={styles.mesh} aria-hidden="true" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={phase}
                  className={styles.stage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProcessVisual step={phase} active />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
