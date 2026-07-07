import React from 'react';
import { Zap, ArrowRight, Clock } from 'lucide-react';
import styles from './EasyCom.module.css';

export default function EasyCom() {
  return (
    <section className={`dark-section ${styles.easyComSection}`} id="easycom">
      {/* Decorative background glows */}
      <div className={`glow-effect ${styles.glowLeft}`}></div>
      <div className={`glow-effect ${styles.glowRight}`}></div>

      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className="badge">
            <Zap size={14} className={styles.badgeIcon} />
            E-Commerce Solution
          </div>
          <h2 className="section-title">
            <span className="gradient-text">EasyCom</span> Speed Delivery Plans
          </h2>
          <p className="section-subtitle">
            Accelerate your retail venture with our pre-engineered e-commerce engines. Engineered for ultra-fast performance, high conversion rates, and rapid deployment.
          </p>
        </div>

        {/* Plans Grid */}
        <div className={styles.plansContainer}>
          
          {/* Plan 1: Starter */}
          <div className={styles.planCard}>
            <div className={styles.planBadge}>Starter Package</div>
            <h3 className={styles.planTitle}>EasyCom Starter</h3>
            
            <p className={styles.planPrice}>
              <span className={styles.currency}>₹</span>1,999
            </p>
            
            <p className={styles.planDescription}>
              A starter e-commerce solution ideal for small businesses looking to showcase products and generate inquiries via WhatsApp.
            </p>
            
            <div className={styles.deliveryInfo}>
              <Clock size={18} className={styles.deliveryIcon} />
              <span>Delivered in 1 day</span>
            </div>
            
            <a
              href={`https://wa.me/918139800591?text=${encodeURIComponent(
                "Hi, I'm interested in the EasyCom Starter plan (₹1,999). Please share more details."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-accent ${styles.planBtn}`}
            >
              Get Starter Plan <ArrowRight size={18} />
            </a>
          </div>

          {/* Plan 2: Advanced */}
          <div className={`${styles.planCard} ${styles.premiumCard}`}>
            <div className={`${styles.planBadge} ${styles.premiumBadge}`}>
              Full-Scale Retail
            </div>
            <h3 className={styles.planTitle}>EasyCom Advanced</h3>
            
            <p className={styles.planPrice}>
              <span className={styles.currency}>₹</span>8,999
            </p>
            
            <p className={styles.planDescription}>
              A complete e-commerce solution with advanced features including online payments, customer accounts, and order management.
            </p>

            <div className={styles.deliveryInfo}>
              <Zap size={18} className={styles.deliveryIconAccent} />
              <span>Delivered in 3-5 days</span>
            </div>

            <a
              href={`https://wa.me/918139800591?text=${encodeURIComponent(
                "Hi, I'm interested in the EasyCom Advanced plan (₹8,999). Please share more details."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-accent ${styles.planBtn}`}
            >
              Get Advanced Plan <ArrowRight size={18} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
