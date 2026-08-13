'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Driver } from './EcosystemScene';
import styles from './DigitalEcosystem.module.css';

/** three.js ships only in this chunk, and only in the browser */
const EcosystemScene = dynamic(() => import('./EcosystemScene'), { ssr: false });

/**
 * Hero visual host: owns the stage box, the scroll/hover driver the 3D scene
 * reads, and mounts the canvas only once the hero is actually on screen.
 */
export default function DigitalEcosystem() {
  const stage = useRef<HTMLDivElement>(null);
  /* mutable box the scene samples each frame — never triggers a React render */
  const driver = useRef<Driver>({ scroll: 0, hover: 0 });
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  /* Mount the canvas once the hero is in view, then keep it mounted and just
     pause its render loop off-screen — unmounting would drop the WebGL context
     and restart the story from scene 01 every time the user scrolls back up. */
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setActive(e.isIntersecting);
        if (e.isIntersecting) setMounted(true);
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* scroll progress across the hero — the scene uses it to hand off downward */
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const top = el.getBoundingClientRect().top;
        driver.current.scroll = Math.min(Math.max(-top / window.innerHeight, 0), 1);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={stage}
      className={styles.stage}
      aria-hidden="true"
      onPointerEnter={() => {
        driver.current.hover = 1;
      }}
      onPointerLeave={() => {
        driver.current.hover = 0;
      }}
    >
      <div className={styles.wash} />
      {mounted && <EcosystemScene driver={driver} active={active} />}
    </div>
  );
}
