'use client';

import { motion } from 'framer-motion';
import {
  SiNextdotjs, SiNodedotjs, SiReact, SiPostgresql, SiDocker, SiFigma, SiFlutter,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import styles from './Technologies.module.css';

/**
 * The stack as a flat grid — each card breathes on its own offset loop, so the
 * row reads as a slow wave rather than eight things pulsing in lockstep.
 *
 * AWS uses the Font Awesome mark: Simple Icons dropped the AWS logo, so
 * `SiAmazonwebservices` does not exist.
 */
/* official brand colours — the marks are the one place on this page that carries
   hue, and the card borrows it only on hover */
const TECHS = [
  { name: 'Next.js', desc: 'React Application Framework', color: '#000000', Icon: SiNextdotjs },
  { name: 'Node.js', desc: 'Server Runtime Environment', color: '#5FA04E', Icon: SiNodedotjs },
  { name: 'React Native', desc: 'Cross-Platform Mobile', color: '#61DAFB', Icon: SiReact },
  { name: 'PostgreSQL', desc: 'Relational Database', color: '#4169E1', Icon: SiPostgresql },
  { name: 'AWS', desc: 'Cloud Infrastructure & Hosting', color: '#FF9900', Icon: FaAws },
  { name: 'Docker', desc: 'Application Containerization', color: '#2496ED', Icon: SiDocker },
  { name: 'Figma', desc: 'UI/UX Collaborative Design', color: '#F24E1E', Icon: SiFigma },
  { name: 'Flutter', desc: 'Cross-Platform Mobile SDK', color: '#027DFD', Icon: SiFlutter },
];

const GRID = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const CARD = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  } as const,
};

export default function Technologies() {
  return (
    <section className={styles.techSection} id="technologies">
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className="eyebrow">03 — We connect the system</p>
          <h2 className="section-title">Our Modern Tech Stack</h2>
          <p className="section-subtitle">
            We engineer high-performance systems with cutting-edge, industry-standard
            technologies to ensure modularity, efficiency, and long-term scalability.
          </p>
        </div>

        <motion.div
          className={styles.grid}
          variants={GRID}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {TECHS.map((t, i) => (
            <motion.div
              key={t.name}
              className={styles.card}
              style={{ ['--brand' as string]: t.color }}
              variants={CARD}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* the float lives on an inner element so it never fights the
                  entrance/hover transforms on the card itself */}
              <motion.span
                className={styles.floater}
                animate={{ y: [-3, 3] }}
                transition={{
                  duration: 4 + i * 0.2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              >
                <span className={styles.icon}>
                  <t.Icon size={24} color={t.color} aria-hidden="true" />
                </span>
                <span className={styles.meta}>
                  <h3 className={styles.name}>{t.name}</h3>
                  <p className={styles.desc}>{t.desc}</p>
                </span>
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
