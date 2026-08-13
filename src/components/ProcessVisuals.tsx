'use client';

import styles from './ProcessVisuals.module.css';

/**
 * One distinct visual per process step. All seven are always mounted; exactly one
 * carries `.on`, which is what starts its animations — so there is never a scroll
 * position with no visible visual.
 */
export default function ProcessVisual({ step, active }: { step: number; active: boolean }) {
  const cls = `${styles.frame} ${active ? styles.on : ''}`;
  return (
    <div className={cls} aria-hidden={!active}>
      {step === 0 && <Idea />}
      {step === 1 && <Design />}
      {step === 2 && <Code />}
      {step === 3 && <Product />}
      {step === 4 && <Erp />}
      {step === 5 && <Automation />}
      {step === 6 && <Growth />}
    </div>
  );
}

/* ---------- 01 IDEA — problem mapping ---------- */
function Idea() {
  const satellites = [
    { label: 'Users', x: 12, y: 16 },
    { label: 'Business', x: 84, y: 14 },
    { label: 'Constraints', x: 10, y: 78 },
    { label: 'Goals', x: 86, y: 76 },
  ];
  return (
    <div className={styles.scene}>
      <svg className={styles.wires} viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
        {satellites.map((s, i) => (
          <line
            key={s.label}
            x1="50" y1="50" x2={s.x} y2={s.y}
            pathLength={1}
            className={styles.wire}
            style={{ animationDelay: `${240 + i * 140}ms` }}
          />
        ))}
      </svg>

      {satellites.map((s, i) => (
        <span
          key={s.label}
          className={styles.chip}
          style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${200 + i * 130}ms` }}
        >
          {s.label}
        </span>
      ))}

      <div className={styles.coreCard}>
        <span className={styles.coreKicker}>Problem</span>
        <span className={styles.coreLine} style={{ width: '82%' }} />
        <span className={styles.coreLine} style={{ width: '58%' }} />
        <span className={styles.coreTag}>Worth solving</span>
      </div>
    </div>
  );
}

/* ---------- 02 DESIGN — design system assembling ---------- */
function Design() {
  return (
    <div className={styles.panel}>
      <div className={styles.panelBar}>
        <i /><i /><i />
        <span>design system</span>
      </div>

      <div className={styles.dsBody}>
        <div className={styles.typeScale}>
          {[
            { s: '1.9rem', w: 900, n: 'Black' },
            { s: '1.3rem', w: 700, n: 'Bold' },
            { s: '0.95rem', w: 500, n: 'Medium' },
          ].map((r, i) => (
            <span key={r.n} style={{ animationDelay: `${120 + i * 110}ms` }}>
              <b style={{ fontSize: r.s, fontWeight: r.w }}>Aa</b>
              <em>{r.n}</em>
            </span>
          ))}
        </div>

        <div className={styles.tokens}>
          {[
            { c: '#4f46e5', n: 'Indigo 600' },
            { c: '#9333ea', n: 'Purple 600' },
            { c: '#06b6d4', n: 'Cyan 500' },
            { c: '#0f172a', n: 'Slate 900' },
          ].map((t, i) => (
            <span
              key={t.n}
              title={t.n}
              style={{ background: t.c, animationDelay: `${380 + i * 80}ms` }}
            />
          ))}
        </div>

        <div className={styles.ruler}>
          <i /><i /><i /><i /><i /><i /><i /><i />
        </div>

        <div className={styles.components}>
          <span className={styles.cmpBtn} style={{ animationDelay: '760ms' }}>Button</span>
          <span className={styles.cmpInput} style={{ animationDelay: '840ms' }} />
          <span className={styles.cmpToggle} style={{ animationDelay: '920ms' }}><i /></span>
        </div>
      </div>
    </div>
  );
}

/* ---------- 03 CODE — editor typing, request to DB ---------- */
function Code() {
  const lines = [
    [26, 44], [40, 30], [20, 56], [46, 26], [30, 40], [22, 48],
  ];
  return (
    <div className={styles.codeWrap}>
      <div className={styles.panel}>
        <div className={styles.panelBar}>
          <i /><i /><i />
          <span>api/orders.ts</span>
        </div>
        <div className={styles.codeBody}>
          {lines.map(([a, b], i) => (
            <span key={i} className={styles.codeLine} style={{ animationDelay: `${i * 130}ms` }}>
              <i style={{ width: `${a}%` }} />
              <i className={styles.tok} style={{ width: `${b}%` }} />
            </span>
          ))}
        </div>
        <div className={styles.terminal}>
          <span className={styles.okDot} />
          200 OK — 14ms latency
        </div>
      </div>

      <div className={styles.pipe}>
        <span className={styles.pipeNode}>API</span>
        <span className={styles.pipeTrack}>
          <i className={styles.packet} />
        </span>
        <span className={`${styles.pipeNode} ${styles.pipeDb}`}>DB</span>
      </div>
    </div>
  );
}

/* ---------- 04 PRODUCT — the SaaS dashboard the system ships as ---------- */
function Product() {
  return (
    <div className={styles.panel}>
      <div className={styles.panelBar}>
        <i /><i /><i />
        <span>app.drawcode.in</span>
      </div>

      <div className={styles.prodTabs}>
        {['Overview', 'Orders', 'Customers'].map((t, i) => (
          <span key={t} className={i === 0 ? styles.prodTabOn : undefined}>{t}</span>
        ))}
      </div>

      <div className={styles.prodBody}>
        {/* responsive viewports, one product across three surfaces */}
        <div className={styles.viewports}>
          <span className={styles.vpDesktop}>
            <i /><i /><i />
          </span>
          <span className={styles.vpTablet}><i /><i /></span>
          <span className={styles.vpPhone}><i /></span>
        </div>

        <div className={styles.prodStats}>
          {[
            { v: '100%', k: 'SEO' },
            { v: '0.8s', k: 'LCP' },
            { v: '99.9%', k: 'Uptime' },
          ].map((s, i) => (
            <span key={s.k} className={styles.kpi} style={{ animationDelay: `${180 + i * 110}ms` }}>
              <b>{s.v}</b>
              <em>{s.k}</em>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 05 ERP & CRM — operations dashboard ---------- */
function Erp() {
  return (
    <div className={styles.panel}>
      <div className={styles.panelBar}>
        <i /><i /><i />
        <span>operations</span>
      </div>

      <div className={styles.erpBody}>
        <div className={styles.kpis}>
          {[
            { k: 'Inventory', v: '1,284' },
            { k: 'Orders', v: '312' },
            { k: 'Revenue', v: '₹8.4L' },
          ].map((t, i) => (
            <span key={t.k} className={styles.kpi} style={{ animationDelay: `${120 + i * 110}ms` }}>
              <b>{t.v}</b>
              <em>{t.k}</em>
            </span>
          ))}
        </div>

        <div className={styles.pipeline}>
          {['Lead', 'Quote', 'Won'].map((col, i) => (
            <div key={col} className={styles.pipeCol} style={{ animationDelay: `${420 + i * 110}ms` }}>
              <span className={styles.pipeColHead}>{col}</span>
              <span className={styles.pipeCard} />
              {i === 1 && <span className={`${styles.pipeCard} ${styles.pipeCardMove}`} />}
              {i !== 1 && <span className={styles.pipeCard} />}
            </div>
          ))}
        </div>

        <div className={styles.bars}>
          {[38, 54, 46, 70, 62, 88].map((h, i) => (
            <span key={i} style={{ height: `${h}%`, animationDelay: `${700 + i * 70}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 06 AUTOMATION — workflow with a travelling packet ---------- */
function Automation() {
  const steps = ['Trigger · Webhook', 'API Processing', 'Database Sync', 'Success ✓'];
  return (
    <div className={styles.flowWrap}>
      {steps.map((s, i) => (
        <div key={s} className={styles.flowStep} style={{ ['--i' as string]: String(i) }}>
          <span className={styles.flowNode}>
            <i className={styles.flowDot} />
            {s}
          </span>
          {i < steps.length - 1 && (
            <span className={styles.flowLink}>
              <i />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- 07 GROWTH — the marketing engine, as a dashboard ---------- */
function Growth() {
  return (
    <div className={styles.panel}>
      <div className={styles.panelBar}>
        <i /><i /><i />
        <span>growth engine</span>
      </div>

      <div className={styles.erpBody}>
        <div className={styles.kpis}>
          {[
            { v: '+4.8%', k: 'Conversion' },
            { v: '12.4k', k: 'SEO visits' },
            { v: '1.3k', k: 'Leads' },
          ].map((t, i) => (
            <span key={t.k} className={styles.kpi} style={{ animationDelay: `${120 + i * 110}ms` }}>
              <b>{t.v}</b>
              <em>{t.k}</em>
            </span>
          ))}
        </div>

        {/* channel breakdown */}
        <div className={styles.channels}>
          {[
            { n: 'SEO', pct: 46 },
            { n: 'Ads', pct: 31 },
            { n: 'Social', pct: 23 },
          ].map((c, i) => (
            <div key={c.n} className={styles.channel} style={{ ['--i' as string]: String(i) }}>
              <span className={styles.channelTop}>
                <i>{c.n}</i>
                <b>{c.pct}%</b>
              </span>
              <span className={styles.channelTrack}>
                <span className={styles.channelFill} style={{ width: `${c.pct}%` }} />
              </span>
            </div>
          ))}
        </div>

        {/* conversion funnel */}
        <div className={styles.funnel}>
          {[
            { w: 100, l: 'Visitors' },
            { w: 58, l: 'Leads' },
            { w: 31, l: 'Customers' },
          ].map((f, i) => (
            <span
              key={f.l}
              className={styles.funnelRow}
              style={{ ['--i' as string]: String(i) }}
            >
              <i className={styles.funnelBar} style={{ width: `${f.w}%` }} />
              {f.l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
