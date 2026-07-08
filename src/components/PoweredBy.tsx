import { ExternalLink, Layers, CreditCard, ShoppingCart, Briefcase } from 'lucide-react';
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
                <Layers size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>ERP Systems</h3>
                <p className={styles.cardDescription}>Custom enterprise resource software designed to automate workflows, manage assets, and unify operational data.</p>
              </div>
            </div>

            <div className={styles.synergyCard}>
              <div className={styles.iconWrapper} style={{ color: '#a855f7' }}>
                <CreditCard size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Point of Sale (POS)</h3>
                <p className={styles.cardDescription}>High-performance transaction architectures, secure custom payment gateways, and real-time inventory tools.</p>
              </div>
            </div>

            <div className={styles.synergyCard}>
              <div className={styles.iconWrapper} style={{ color: '#22c55e' }}>
                <ShoppingCart size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>E-Commerce</h3>
                <p className={styles.cardDescription}>Conversion-optimized digital stores featuring custom product engines, fluid checkouts, and premium UX layouts.</p>
              </div>
            </div>

            <div className={styles.synergyCard}>
              <div className={styles.iconWrapper} style={{ color: '#eab308' }}>
                <Briefcase size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Portfolios & Corporate</h3>
                <p className={styles.cardDescription}>Stunning, responsive, and SEO-optimized web experiences crafted to present services and engage audiences.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
