import { ExternalLink, ShieldCheck, Zap, Cloud, Cpu } from 'lucide-react';
import styles from './PoweredBy.module.css';

export default function PoweredBy() {
  return (
    <section className={styles.poweredSection}>
      <div className="container">
        <div className={styles.poweredGrid}>
          <div className={styles.infoCol}>
            <div className="badge">Corporate Backing</div>
            <h2 className="section-title">Powered by <span className="gradient-text">Shahi Solutions</span></h2>
            <p className={styles.description}>
              Drawcode is backed by Shahi Solutions, a leading technology consulting and software enterprise. This strategic partnership enables us to combine specialized product engineering with global-scale delivery, cloud security, and enterprise infrastructure expertise.
            </p>
            <p className={styles.subtext}>
              Together, we provide end-to-end digital solutions—from initial concept and high-fidelity design to scalable deployments and 24/7 technical operations.
            </p>
            <a 
              href="https://www.shahisolutions.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`btn btn-secondary ${styles.partnerBtn}`}
            >
              Visit Shahi Solutions <ExternalLink size={16} style={{ marginLeft: '8px' }} />
            </a>
          </div>

          <div className={styles.gridCol}>
            <div className={styles.synergyCard}>
              <div className={styles.iconWrapper} style={{ color: '#38bdf8' }}>
                <Cloud size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Enterprise Cloud</h3>
                <p className={styles.cardDescription}>Backed by robust, secure, and auto-scaling multi-cloud architectures built for high-demand environments.</p>
              </div>
            </div>

            <div className={styles.synergyCard}>
              <div className={styles.iconWrapper} style={{ color: '#a855f7' }}>
                <Cpu size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>AI & Automation</h3>
                <p className={styles.cardDescription}>Integrating next-generation AI pipelines, workflows, and automation scripts to optimize team efficiency.</p>
              </div>
            </div>

            <div className={styles.synergyCard}>
              <div className={styles.iconWrapper} style={{ color: '#22c55e' }}>
                <ShieldCheck size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Rigorous Security</h3>
                <p className={styles.cardDescription}>Enforcing high-standard data encryption, security audits, and strict compliance layers on all builds.</p>
              </div>
            </div>

            <div className={styles.synergyCard}>
              <div className={styles.iconWrapper} style={{ color: '#eab308' }}>
                <Zap size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Agile & Efficient</h3>
                <p className={styles.cardDescription}>Fast, sprint-based cycles delivering features continuously without sacrificing quality or performance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
