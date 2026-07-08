import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import styles from './Projects.module.css';

interface ProjectsProps {
  isFeatured?: boolean;
}

export default function Projects({ isFeatured = false }: ProjectsProps) {
  const projects = [
    {
      title: 'FetchKids',
      category: 'E-Commerce / Product Customization',
      description: "Developed a personalized online shopping platform for children's products featuring real-time product customization, live preview functionality, secure checkout, and a seamless shopping experience. The platform enables customers to personalize products and instantly visualize the final result before purchasing.",
      image: '/project-fetchkids.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Payment Gateway'],
      link: 'https://www.fetchkids.in/',
    },
    {
      title: 'VRS Real Invest',
      category: 'Real Estate Website',
      description: 'Designed and developed a professional real estate website that showcases property investment opportunities, company services, and consultation options with a clean user experience focused on lead generation.',
      image: '/project-vrs.png',
      tags: ['React', 'Responsive Design', 'CMS', 'SEO'],
      link: 'https://www.vrsrealinvest.com.au/',
    },
    {
      title: 'Moodbyteal',
      category: 'Interior Design & Decor Website',
      description: 'Designed and developed an elegant interior design and decor website that showcases curated collections, mood boards, and styling services with a refined, mobile-first experience crafted to inspire and convert visitors into clients.',
      image: '/project-teal-v2.png',
      tags: ['React', 'Interior Design', 'UI/UX', 'Responsive Design'],
      link: 'https://moodbyteal.com/',
    },
    {
      title: 'HEEDY',
      category: 'E-Commerce / Skincare & Beauty',
      description: 'Designed and developed a premium skincare e-commerce store featuring curated skin, lip, and body care collections, science-backed product storytelling, secure checkout, and a refined, mobile-first shopping experience crafted to build trust and drive conversions.',
      image: '/project-heedy-v2.jpg',
      tags: ['React', 'E-Commerce', 'UI/UX', 'Responsive Design'],
      link: 'https://heedy.shop/',
    },
  ];

  return (
    <section className={`dark-section ${styles.projectsSection}`} id="projects">
      {/* Brand Blue Glow Highlight */}
      <div className={`glow-effect ${styles.glowCenter}`}></div>
      
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className="badge">Our Work</div>
          <h2 className="section-title">Few of Our Successful Projects</h2>
          <p className="section-subtitle">
            We build digital solutions that help businesses grow, improve user experience, and achieve measurable results.
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={project.image} 
                  alt={`${project.title} website mockup inside desktop and mobile device frames`} 
                  width={500} 
                  height={320}
                  className={styles.projectImage}
                />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.projectCategory}>{project.category}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                
                <div className={styles.techTags}>
                  {project.tags.map((tag, tIndex) => (
                    <span key={tIndex} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                
                <a href={project.link} target="_blank" className={`btn btn-secondary ${styles.projectBtn}`}>
                  View Project <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

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
