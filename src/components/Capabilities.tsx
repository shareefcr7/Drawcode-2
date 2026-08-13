'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Preview } from './Mockups';
import styles from './Capabilities.module.css';

/**
 * BUILD → TRANSFORM
 * Vertical scroll drives a horizontal filmstrip: each capability is its own scene,
 * sliding in with a clip-path reveal while the copy cross-transitions. Not a carousel —
 * there are no controls, the scroll position *is* the playhead.
 */
const SCENES = [
  {
    id: 'web',
    kicker: 'Website',
    title: 'It starts with the storefront',
    body: 'Ultra-fast, responsive websites built with Next.js, React, and modern SEO architectures to maximize organic reach.',
  },
  {
    id: 'mobile',
    kicker: 'Mobile',
    title: 'The product moves into their pocket',
    body: 'High-performance cross-platform iOS and Android applications utilizing React Native and Flutter.',
  },
  {
    id: 'software',
    kicker: 'Software',
    title: 'The interface expands into a system',
    body: 'Tailored backend ecosystems, APIs, and cloud infrastructure engineered for complex business workloads.',
  },
  {
    id: 'uiux',
    kicker: 'UI / UX',
    title: 'Every surface speaks one language',
    body: 'Visually stunning, accessible, and user-centric wireframes and layouts that boost engagement and brand trust.',
  },
  {
    id: 'erp',
    kicker: 'ERP & CRM',
    title: 'The modules connect',
    body: 'Streamlined operational management software integrations to track real-time analytics, inventory, and sales.',
  },
  {
    id: 'automation',
    kicker: 'Automation',
    title: 'The workflow starts running itself',
    body: 'Robust workflow script architectures and AI agents that eliminate manual error-prone task bottlenecks.',
  },
  {
    id: 'growth',
    kicker: 'Digital Marketing',
    title: 'Demand compounds',
    body: 'Data-driven growth strategies, PPC advertising campaigns, and social marketing to scale your online brand.',
  },
  {
    id: 'sales',
    kicker: 'Sales',
    title: 'Attention converts to revenue',
    body: 'Innovative digital funnels and predictive lead interfaces designed to increase customer conversion rates.',
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Capabilities() {
  const trackRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  /* One scroll pass through the section plays the whole filmstrip. */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  /* The strip translates on the compositor — React never sees a frame of this. */
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(SCENES.length - 1) * 100}%`]);
  const railScale = useTransform(scrollYProgress, [0, 1], [1 / SCENES.length, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.round(p * (SCENES.length - 1));
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <section
      ref={trackRef}
      id="services"
      className={styles.section}
      /* 1.5 viewports per capability — slow enough to read before it moves on */
      style={{ height: `${SCENES.length * 150}vh` }}
      aria-label="Capabilities"
    >
      <div className={styles.viewport}>
        {/* fixed chrome — heading, counter and progress stay put while scenes pass */}
        <div className={`container ${styles.chrome}`}>
          <p className="eyebrow">01 — Build &amp; transform</p>
          <div className={styles.counter}>
            <span className={styles.counterNow}>{String(active + 1).padStart(2, '0')}</span>
            <span className={styles.counterOf}>/ {String(SCENES.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* the filmstrip */}
        <motion.div className={styles.strip} style={{ x }}>
          {SCENES.map((scene, i) => {
            const on = i === active;
            return (
              <article key={scene.id} className={styles.scene} aria-hidden={!on}>
                <div className={`container ${styles.sceneInner}`}>
                  <div className={styles.copy}>
                    <motion.span
                      className={styles.kicker}
                      initial={false}
                      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 18 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    >
                      <i>{String(i + 1).padStart(2, '0')}</i>
                      {scene.kicker}
                    </motion.span>

                    <motion.h2
                      className={styles.title}
                      initial={false}
                      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 24 }}
                      transition={{ duration: 0.7, ease: EASE, delay: on ? 0.06 : 0 }}
                    >
                      {scene.title}
                    </motion.h2>

                    <motion.p
                      className={styles.body}
                      initial={false}
                      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 24 }}
                      transition={{ duration: 0.7, ease: EASE, delay: on ? 0.12 : 0 }}
                    >
                      {scene.body}
                    </motion.p>

                    <motion.span
                      initial={false}
                      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 20 }}
                      transition={{ duration: 0.7, ease: EASE, delay: on ? 0.18 : 0 }}
                    >
                      <Link href="/contact" className={styles.cta}>
                        Start a project <ArrowRight size={16} className={styles.arrow} />
                      </Link>
                    </motion.span>
                  </div>

                  {/* clip-path wipe + scale settle, blur-to-sharp */}
                  <motion.div
                    className={`${styles.visual} ${on ? styles.on : ''}`}
                    initial={false}
                    animate={{
                      /* wipes in from the left edge, matching the new column order */
                      clipPath: on ? 'inset(0% 0% 0% 0% round 22px)' : 'inset(0% 92% 0% 0% round 22px)',
                      scale: on ? 1 : 1.06,
                      filter: on ? 'blur(0px)' : 'blur(6px)',
                      opacity: on ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.85, ease: EASE }}
                  >
                    <div className={styles.frame}>
                      <Preview id={scene.id} />
                    </div>
                  </motion.div>
                </div>
              </article>
            );
          })}
        </motion.div>

        {/* progress */}
        <div className={`container ${styles.railWrap}`}>
          <div className={styles.rail}>
            <motion.span className={styles.railFill} style={{ scaleX: railScale }} />
          </div>
          <ol className={styles.dots} aria-hidden="true">
            {SCENES.map((s, i) => (
              <li key={s.id} className={i === active ? styles.dotOn : undefined}>
                {s.kicker}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
