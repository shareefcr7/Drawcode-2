/**
 * MOCKUPS — original Drawcode UI compositions, drawn in DOM + CSS (no images).
 * One per capability: browser window, phone screens, service graph, design system,
 * ERP dashboard, workflow canvas, cloud meters, growth dashboard.
 */
import { Check, ArrowUpRight, Terminal } from 'lucide-react';
import styles from './Mockups.module.css';

export function Preview({ id }: { id: string }) {
  switch (id) {
    /* Live website preview — real chrome, real page, perf badge */
    case 'web':
      return (
        <div className={styles.window}>
          <div className={styles.windowBar}>
            <i className={styles.dotRed} />
            <i className={styles.dotAmber} />
            <i className={styles.dotGreen} />
            <span className={styles.url}>drawcode.in</span>
            <span className={styles.perf}>
              <Check size={9} strokeWidth={3} /> 100 Perf
            </span>
          </div>

          <div className={styles.windowBody}>
            <div className={styles.sitePreview}>
              <div className={styles.siteNav}>
                <span className={styles.siteLogo}>DRAWCODE</span>
                <span className={styles.siteVer}>v2.4</span>
              </div>
              <p className={styles.siteLede}>
                High-performance web applications built for speed &amp; scale.
              </p>
              <div className={styles.siteCtas}>
                <span className={styles.siteBtn}>Launch App</span>
                <span className={styles.siteBtnGhost}>Docs</span>
              </div>
            </div>

            <div className={styles.siteStats}>
              {[
                { k: 'LCP', v: '0.8s' },
                { k: 'CLS', v: '0.00' },
                { k: 'SEO', v: '100' },
              ].map((s) => (
                <span key={s.k} className={styles.siteStat}>
                  <b>{s.v}</b>
                  <em>{s.k}</em>
                </span>
              ))}
            </div>
          </div>
        </div>
      );

    /* API architecture — real code window over the live service graph */
    case 'software':
      return (
        <div className={styles.codeWrap}>
          <div className={styles.editor}>
            <div className={styles.editorBar}>
              <span className={styles.editorFile}>
                <Terminal size={11} strokeWidth={2} />
                core-system.ts
              </span>
              <span className={styles.editorBadge}>REST &amp; GraphQL</span>
            </div>

            <pre className={styles.code}>
              <code>
                <span className={styles.ln}>
                  <b className={styles.kw}>const</b> <b className={styles.fn}>system</b> ={' '}
                  <b className={styles.call}>connectNodes</b>({'{'}
                </span>
                <span className={styles.ln}>
                  {'  '}web: <b className={styles.str}>&apos;Next.js&apos;</b>, app:{' '}
                  <b className={styles.str}>&apos;Flutter&apos;</b>,
                </span>
                <span className={styles.ln}>
                  {'  '}db: <b className={styles.str}>&apos;PostgreSQL&apos;</b>
                </span>
                <span className={styles.ln}>{'}'});</span>
                <span className={`${styles.ln} ${styles.cmt}`}>
                  {'// 200 OK — latency 14 ms'}
                </span>
              </code>
            </pre>
          </div>

          <div className={styles.dag}>
            <svg viewBox="0 0 140 44" className={styles.dagWires} fill="none">
              <path d="M22 22 C46 22, 46 10, 70 10" pathLength={1} />
              <path d="M22 22 C46 22, 46 34, 70 34" pathLength={1} />
              <path d="M96 10 C112 10, 112 22, 122 22" pathLength={1} />
              <path d="M96 34 C112 34, 112 22, 122 22" pathLength={1} />
            </svg>
            <span className={`${styles.dagNode} ${styles.dagIn}`}>API</span>
            <span className={`${styles.dagNode} ${styles.dagS1}`}>Auth</span>
            <span className={`${styles.dagNode} ${styles.dagS3}`}>Orders</span>
            <span className={`${styles.dagNode} ${styles.dagOut}`}>DB</span>
          </div>
        </div>
      );

    /* Mobile app screens — a real balance/activity UI, not grey rows */
    case 'mobile':
      return (
        <div className={styles.screens}>
          <div className={`${styles.phone} ${styles.phoneBack}`}>
            <span className={styles.notch} />
            <div className={styles.phoneScreen}>
              <span className={styles.phoneKicker}>Orders</span>
              {['#4821', '#4820', '#4819'].map((o) => (
                <span key={o} className={styles.phoneRow}>
                  <i>{o}</i>
                  <b>Shipped</b>
                </span>
              ))}
            </div>
          </div>

          <div className={styles.phone}>
            <span className={styles.notch} />
            <div className={styles.phoneScreen}>
              <span className={styles.phoneKicker}>Today</span>
              <span className={styles.phoneBalance}>₹48,290</span>
              <span className={styles.phoneDelta}>
                <ArrowUpRight size={9} strokeWidth={3} /> 38.4%
              </span>

              <div className={styles.phoneSpark}>
                {[38, 60, 44, 78, 66, 94].map((h, i) => (
                  <i key={i} style={{ height: `${h}%`, ['--i' as string]: String(i) }} />
                ))}
              </div>

              <span className={styles.phoneCta}>Send payout</span>

              <div className={styles.phoneTabs}>
                <i className={styles.phoneTabOn} /><i /><i /><i />
              </div>
            </div>
          </div>

          <div className={`${styles.phone} ${styles.phoneBack}`}>
            <span className={styles.notch} />
            <div className={styles.phoneScreen}>
              <span className={styles.phoneKicker}>Sync</span>
              <span className={styles.phoneBadge}>Offline ready</span>
              <span className={styles.phoneRow}><i>Push</i><b>On</b></span>
              <span className={styles.phoneRow}><i>Cache</i><b>2.1 MB</b></span>
            </div>
          </div>
        </div>
      );

    case 'uiux':
      return (
        <div className={styles.system}>
          <div className={styles.swatches}>
            <span style={{ background: 'var(--accent)' }} />
            <span style={{ background: 'var(--accent-2)' }} />
            <span style={{ background: 'var(--accent-3)' }} />
            <span style={{ background: 'var(--ink)' }} />
            <span style={{ background: 'var(--line-strong)' }} />
          </div>
          <span className={styles.specimen}>Aa</span>
          <div className={styles.components}>
            <span className={styles.compPill} />
            <span className={styles.compBox} />
            <span className={styles.compToggle}><i /></span>
          </div>
        </div>
      );

    case 'erp':
      return (
        <div className={styles.dashboard}>
          <div className={styles.side}>
            <i /><i /><i /><i />
          </div>
          <div className={styles.panel}>
            <div className={styles.kpis}>
              <span /><span /><span />
            </div>
            <div className={styles.chartBars}>
              {[42, 66, 50, 82, 60, 94, 70].map((h, i) => (
                <span key={i} style={{ height: `${h}%`, ['--i' as string]: String(i) }} />
              ))}
            </div>
          </div>
        </div>
      );

    /* Sales — deal pipeline, conversion gauge and revenue booked */
    case 'sales':
      return (
        <div className={styles.cloud}>
          <div className={styles.meters}>
            {[
              { label: 'Win rate', pct: 38 },
              { label: 'Follow-up', pct: 72 },
              { label: 'Target', pct: 84 },
            ].map((m, i) => (
              <div key={m.label} className={styles.meter} style={{ ['--i' as string]: String(i) }}>
                <svg viewBox="0 0 40 40" className={styles.gauge}>
                  <circle cx="20" cy="20" r="16" className={styles.gaugeTrack} />
                  <circle
                    cx="20" cy="20" r="16"
                    pathLength={100}
                    className={styles.gaugeFill}
                    style={{ strokeDasharray: `${m.pct} 100` }}
                  />
                </svg>
                <b>{m.pct}%</b>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.regions}>
            {[
              'Enquiry → Quote sent',
              'Quote → Negotiation',
              'Closed won · ₹6.8L',
            ].map((r, i) => (
              <span key={r} className={styles.region} style={{ ['--i' as string]: String(i) }}>
                <i className={styles.regionDot} />
                {r}
              </span>
            ))}
          </div>
        </div>
      );

    /* Growth — a real dashboard: conversion chart, PPC channels, lead funnel */
    case 'growth':
      return (
        <div className={styles.dash}>
          <div className={styles.dashHead}>
            <span className={styles.dashTitle}>Growth overview</span>
            <span className={styles.dashRange}>Last 30 days</span>
          </div>

          <div className={styles.dashChart}>
            <div className={styles.dashKpi}>
              <b>4.8%</b>
              <span className={styles.dashUp}>▲ 1.6%</span>
              <em>Conversion rate</em>
            </div>
            <svg viewBox="0 0 120 52" className={styles.curve} fill="none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="dcFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M2,46 L20,39 L38,41 L56,26 L74,22 L92,14 L118,5 L118,52 L2,52 Z" fill="url(#dcFill)" />
              <polyline
                points="2,46 20,39 38,41 56,26 74,22 92,14 118,5"
                pathLength={1}
                className={styles.curveLine}
              />
              <circle cx="118" cy="5" r="3.2" className={styles.curveDot} />
            </svg>
          </div>

          <div className={styles.dashChannels}>
            {[
              { name: 'SEO', value: '12.4k', share: 46 },
              { name: 'Ads', value: '8.1k', share: 31 },
              { name: 'Social', value: '6.0k', share: 23 },
            ].map((c, i) => (
              <div key={c.name} className={styles.dashChannel} style={{ ['--i' as string]: String(i) }}>
                <span className={styles.dashChannelTop}>
                  <i>{c.name}</i>
                  <b>{c.value}</b>
                </span>
                <span className={styles.dashTrack}>
                  <span className={styles.dashFill} style={{ width: `${c.share}%` }} />
                </span>
              </div>
            ))}
          </div>

          <div className={styles.funnel}>
            {[
              { w: 100, label: 'Visitors', value: '26.5k' },
              { w: 62, label: 'Leads', value: '4.2k' },
              { w: 34, label: 'Deals', value: '1.3k' },
            ].map((s, i) => (
              <div key={s.label} className={styles.funnelRow} style={{ ['--i' as string]: String(i) }}>
                <span className={styles.funnelLabel}>{s.label}</span>
                <span className={styles.funnelTrack}>
                  <span className={styles.funnelBar} style={{ width: `${s.w}%` }} />
                </span>
                <span className={styles.funnelValue}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      );

    default: /* automation */
      return (
        <div className={styles.workflow}>
          <svg viewBox="0 0 120 66" className={styles.wfWires} fill="none">
            <path d="M26 20 H50 V16 H70" pathLength={1} />
            <path d="M26 20 V46 H50 V50 H70" pathLength={1} />
            <path d="M92 16 H100 V33 H108" pathLength={1} />
            <path d="M92 50 H100 V33" pathLength={1} />
          </svg>
          <span className={`${styles.wfNode} ${styles.wfIn}`} />
          <span className={`${styles.wfNode} ${styles.wfA}`} />
          <span className={`${styles.wfNode} ${styles.wfB}`} />
          <span className={`${styles.wfNode} ${styles.wfOut}`} />
        </div>
      );
  }
}
