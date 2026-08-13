/**
 * Pure timeline math for the hero ecosystem animation.
 *
 * The whole story is a function of one normalised clock t ∈ [0,1). For the loop
 * to be seamless, EVERY animated value must equal itself at t=0 and t=1 — so
 * envelopes are built only from `arc()`, and spins only from integer turns.
 *
 * Run `node src/components/ecosystemTimeline.mjs` to verify the seam.
 */

const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);

/** smoothstep ramp 0→1 across [a,b] */
export const seg = (t, a, b) => {
  const x = clamp01((t - a) / (b - a));
  return x * x * (3 - 2 * x);
};

/** rises across [a,b], falls back across [c,d]; equals 0 at t=0 and t=1 */
export const arc = (t, a, b, c, d) => seg(t, a, b) - seg(t, c, d);

/**
 * Visibility of module `i`: fades in staggered during scene 02, back out during
 * scene 06. The fade-out window must CLOSE before t=1 — if it spills past the
 * end, seg() never reaches 1 and the last modules pop at the loop join.
 */
export const blockAlive = (t, i) =>
  seg(t, 0.16 + i * 0.012, 0.3 + i * 0.012) - seg(t, 0.86 + i * 0.008, 0.94 + i * 0.006);

/* ---- self-check ---- */
if (typeof process !== 'undefined' && process.argv?.[1]?.endsWith('ecosystemTimeline.mjs')) {
  const { strict: assert } = await import('node:assert');
  const near = (x, y, what) => assert.ok(Math.abs(x - y) < 1e-9, `${what}: ${x} !== ${y}`);

  // an arc starts and ends at zero
  near(arc(0, 0.1, 0.3, 0.88, 1.0), arc(1, 0.1, 0.3, 0.88, 1.0), 'arc seam');
  near(arc(0, 0.1, 0.3, 0.88, 1.0), 0, 'arc starts at 0');

  // every module returns to exactly its starting visibility
  for (let i = 0; i < 9; i++) near(blockAlive(1, i), blockAlive(0, i), `block ${i} seam`);

  // and each one is actually visible at the hero moment (t=0.7)
  for (let i = 0; i < 9; i++) {
    assert.ok(blockAlive(0.7, i) > 0.9, `block ${i} missing at the hero moment`);
  }

  // the story still advances: platform lit, container risen, links flowing
  assert.ok(arc(0.7, 0.02, 0.14, 0.92, 1.0) > 0.99, 'platform not lit at hero');
  assert.ok(arc(0.7, 0.1, 0.3, 0.88, 1.0) > 0.99, 'container not risen at hero');
  assert.ok(arc(0.45, 0.34, 0.5, 0.84, 0.96) > 0.4, 'no data flow in scene 03');

  console.log('ecosystem timeline: loop is seamless ✓');
}
