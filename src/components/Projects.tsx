'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import GridCanvas from './GridCanvas';
import styles from './Projects.module.css';

interface ProjectsProps {
  isFeatured?: boolean;
}

type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
};

const PROJECTS: Project[] = [
  {
    title: 'FetchKids',
    category: 'E-Commerce / Product Customization',
    description: "Developed a personalized online shopping platform for children's products featuring real-time product customization, live preview functionality, secure checkout, and a seamless shopping experience. The platform enables customers to personalize products and instantly visualize the final result before purchasing.",
    image: '/images/projects/fetchkids.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Payment Gateway'],
    link: 'https://www.fetchkids.in/',
  },
  {
    title: 'VRS Real Invest',
    category: 'Real Estate Website',
    description: 'Designed and developed a professional real estate website that showcases property investment opportunities, company services, and consultation options with a clean user experience focused on lead generation.',
    image: '/images/projects/vrs.png',
    tags: ['React', 'Responsive Design', 'CMS', 'SEO'],
    link: 'https://www.vrsrealinvest.com.au/',
  },
  {
    title: 'Moodbyteal',
    category: 'Interior Design & Decor Website',
    description: 'Designed and developed an elegant interior design and decor website that showcases curated collections, mood boards, and styling services with a refined, mobile-first experience crafted to inspire and convert visitors into clients.',
    image: '/images/projects/moodbyteal.png',
    tags: ['React', 'Interior Design', 'UI/UX', 'Responsive Design'],
    link: 'https://moodbyteal.com/',
  },
  {
    title: 'Dinorah',
    category: 'Apparel Manufacturing & Export',
    description: 'Designed and developed a premium boutique-grade garment manufacturing and apparel export website featuring high-end stitching collections, private-label specifications, interactive legacy timelines, and seamless client onboarding channels.',
    image: '/images/projects/dinorah.png',
    tags: ['React', 'Apparel Sourcing', 'Boutique UI', 'Responsive Design'],
    link: 'https://dinorh.com/',
  },
  {
    title: 'Fleet Management',
    category: 'Logistics & Vehicle Tracking System',
    description: 'Built a fleet management solution for tracking vehicles, drivers, trips, and maintenance schedules in real time. Includes live GPS tracking, fuel and expense monitoring, automated maintenance alerts, and analytics to optimize fleet efficiency and reduce operational costs.',
    image: '/images/projects/fleet.png',
    tags: ['React', 'Node.js', 'Real-Time GPS', 'Analytics'],
    link: '#',
  },
  {
    title: 'Auditorium Booking System',
    category: 'Venue Management & Booking Platform',
    description: 'Developed an auditorium booking and management system for scheduling events, managing venues, and handling reservations. Features a real-time dashboard with booking analytics, utilization insights, payment tracking, calendar-based scheduling, and automated status updates for confirmed, pending, and cancelled bookings.',
    image: '/images/projects/auditorium.png',
    tags: ['React', 'Node.js', 'Dashboard', 'Payments'],
    link: '#',
  },
];

const GRID = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const CARD = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } as const,
};

export default function Projects({ isFeatured = false }: ProjectsProps) {
  return (
    <section className={styles.projectsSection} id="projects">
      <GridCanvas />

      <div className="container">
        <div className={styles.sectionHeader}>
          <div className="badge">Our Work</div>
          <h2 className="section-title">Few of Our Successful Projects</h2>
          <p className="section-subtitle">
            We build digital solutions that help businesses grow, improve user experience, and achieve measurable results.
          </p>
        </div>

        <motion.div
          className={styles.grid}
          variants={GRID}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>

        {isFeatured && (
          <div className={styles.actionRow}>
            <Link href="/projects" className={`btn btn-primary ${styles.viewAllBtn}`}>
              View All Projects <ArrowUpRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  /* a missing or broken file must not leave a hole in the grid — the fallback
     fills the same aspect-ratio box, so the row heights never shift */
  const [broken, setBroken] = useState(false);
  const live = project.link !== '#';

  return (
    <motion.article className={styles.card} variants={CARD} whileHover={{ y: -4 }}>
      <div className={styles.thumb}>
        {broken ? (
          <PreviewFallback title={project.title} />
        ) : (
          <Image
            src={project.image}
            alt={`${project.title} — ${project.category} project preview`}
            width={800}
            height={450}
            sizes="(max-width: 860px) 100vw, 50vw"
            className={styles.projectImage}
            onError={() => setBroken(true)}
          />
        )}
      </div>

      <div className={styles.body}>
        <span className={styles.projectCategory}>{project.category}</span>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.description}</p>

        <div className={styles.techTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        {live ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.projectLink}
          >
            View Project <ArrowUpRight size={16} />
          </a>
        ) : (
          <span className={`${styles.projectLink} ${styles.projectLinkOff}`}>
            Private engagement
          </span>
        )}
      </div>
    </motion.article>
  );
}

/** monochrome gradient card with the project's initials — shown when the image 404s */
function PreviewFallback({ title }: { title: string }) {
  const id = useId();
  const initials = title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <svg
      className={styles.fallback}
      viewBox="0 0 320 180"
      role="img"
      aria-label={`${title} preview image unavailable`}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3f3f46" />
          <stop offset="55%" stopColor="#27272a" />
          <stop offset="100%" stopColor="#71717a" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill={`url(#${id})`} />
      <circle cx="278" cy="34" r="52" fill="#fff" opacity="0.07" />
      <circle cx="44" cy="152" r="38" fill="#fff" opacity="0.06" />
      <text
        x="160"
        y="98"
        textAnchor="middle"
        fill="#fff"
        fontSize="46"
        fontWeight="700"
        letterSpacing="2"
      >
        {initials}
      </text>
    </svg>
  );
}
