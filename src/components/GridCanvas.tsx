'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './GridCanvas.module.css';

/**
 * Shared section background: the 72px engineering grid, scanning light beams,
 * and a pointer-tracked highlight.
 *
 * One component so every section that uses it shares the same track size and
 * the same horizontal phase (`background-position: 50% 0`), which is what keeps
 * the vertical lines continuous from one section into the next.
 *
 * Each beam element spans the full canvas and paints its glow as a fixed-size
 * background, so animating y between ±100% sweeps the whole section while the
 * glow itself stays 144px long. Sizing the element to the glow instead would
 * make 100% resolve against 144px and the beam would never cross anything.
 *
 * Timings are fixed constants, never random: a random value would differ
 * between the server and client render and trip hydration.
 */
const BEAMS = [
  { cls: styles.h1, axis: 'x', from: '-100%', to: '100%', duration: 7, delay: 0 },
  { cls: styles.h2, axis: 'x', from: '-100%', to: '100%', duration: 12, delay: 2.5 },
  /* vertical scans alternate direction so the tracks read as a two-way data
     stream rather than a single sweep */
  { cls: styles.v1, axis: 'y', from: '100%', to: '-100%', duration: 8, delay: 0 },
  { cls: styles.v2, axis: 'y', from: '-100%', to: '100%', duration: 11, delay: 2 },
  { cls: styles.v3, axis: 'y', from: '100%', to: '-100%', duration: 14, delay: 4.5 },
] as const;

export default function GridCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* The light follows the pointer anywhere in the host section. CSS vars only —
     one rAF in flight, and React never re-renders on pointer move. */
  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = canvas.getBoundingClientRect();
        canvas.style.setProperty('--mx', `${e.clientX - r.left}px`);
        canvas.style.setProperty('--my', `${e.clientY - r.top}px`);
        canvas.style.setProperty('--lit', '1');
      });
    };
    const onLeave = () => canvas.style.setProperty('--lit', '0');

    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={styles.canvas} aria-hidden="true">
      <span className={styles.grid} />
      <span className={styles.spot} />

      {BEAMS.map((b, i) => (
        <motion.span
          key={i}
          className={`${styles.beam} ${b.cls}`}
          initial={b.axis === 'x' ? { x: b.from } : { y: b.from }}
          animate={reduce ? undefined : b.axis === 'x' ? { x: b.to } : { y: b.to }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: b.delay,
          }}
        />
      ))}
    </div>
  );
}
