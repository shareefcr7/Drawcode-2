import { ImageResponse } from 'next/og';

/**
 * Social preview card, generated at build time. Next picks this file up
 * automatically for `og:image` and `twitter:image` on every route that does not
 * define its own — no static asset to keep in sync with the brand.
 *
 * Kept to system fonts and flat colour on purpose: ImageResponse has no access
 * to the site's webfonts or CSS variables, and fetching a font at build time is
 * one more thing that can fail a deploy.
 */
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Drawcode — Premium End-to-End Digital Solutions';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#ffffff',
          backgroundImage:
            'linear-gradient(to right, #f4f4f5 1px, transparent 1px), linear-gradient(to bottom, #f4f4f5 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 16,
              background: '#18181b',
              color: '#ffffff',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            D
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#18181b',
            }}
          >
            DRAWCODE
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#18181b',
            }}
          >
            Building digital systems
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#a1a1aa',
            }}
          >
            that move businesses forward.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, color: '#52525b' }}>
          <span>Web</span>
          <span style={{ color: '#d4d4d8' }}>·</span>
          <span>Mobile</span>
          <span style={{ color: '#d4d4d8' }}>·</span>
          <span>Software</span>
          <span style={{ color: '#d4d4d8' }}>·</span>
          <span>ERP &amp; CRM</span>
          <span style={{ color: '#d4d4d8' }}>·</span>
          <span>Automation</span>
        </div>
      </div>
    ),
    size,
  );
}
