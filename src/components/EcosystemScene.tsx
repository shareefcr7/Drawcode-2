'use client';

import { useEffect, useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  Edges,
  Environment,
  Lightformer,
  RoundedBox,
} from '@react-three/drei';
import { arc, blockAlive } from './ecosystemTimeline.mjs';

/**
 * DIGITAL ECOSYSTEM — a living system being activated in real time.
 *
 * One 26s cinematic loop, six scenes:
 *   01 core        platform wakes, rings spin up, particles drift in
 *   02 activation  glass container rises off the platform, blocks appear
 *   03 connection  blocks orbit, data lines link them, platform brightens
 *   04 intelligence blocks organise, blue rises, an energy pulse travels up
 *   05 hero        balanced composition holds
 *   06 loop        everything unwinds back to the start — seamlessly
 *
 * Seamlessness rule: every animated value is either `arc()` (up then back to
 * its starting value) or a sine/rotation with an INTEGER number of turns per
 * loop. Nothing else. That guarantees t=1 renders identically to t=0.
 */

const LOOP = 26; // seconds per full cycle
const TAU = Math.PI * 2;

/** Inner modules: websites, apps, software, ERP, CRM, automation, cloud —
 *  expressed as geometry, never as text. Positions are the organised lattice. */
const BLOCKS = [
  { home: [-0.3, 0.3, -0.28], size: 0.31, blue: true },
  { home: [0.02, 0.34, 0.2], size: 0.36, blue: false },
  { home: [0.33, 0.15, -0.1], size: 0.29, blue: true },
  { home: [-0.34, -0.02, 0.17], size: 0.33, blue: false },
  { home: [0.06, 0.01, -0.31], size: 0.27, blue: false },
  { home: [0.34, -0.2, 0.24], size: 0.31, blue: true },
  { home: [-0.21, -0.32, -0.14], size: 0.36, blue: false },
  { home: [0.1, -0.34, 0.03], size: 0.27, blue: true },
  { home: [-0.02, 0.07, 0.35], size: 0.29, blue: false },
] as const;

/** data paths between modules */
const PAIRS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 5],
  [3, 6],
  [4, 8],
  [6, 7],
  [0, 4],
  [5, 7],
];

const CUBE = 1.36; // glass container edge
const HALF = CUBE / 2;

/** the 8 vertices of the container, for the white corner joints */
const CORNERS: [number, number, number][] = [-1, 1].flatMap((x) =>
  [-1, 1].flatMap((y) => [-1, 1].map((z) => [x * HALF, y * HALF, z * HALF] as [number, number, number])),
);

export type Driver = { scroll: number; hover: number };

/* ------------------------------------------------------------------ */

function Ecosystem({
  driver,
  reduced,
  low,
}: {
  driver: RefObject<Driver>;
  reduced: boolean;
  low: boolean;
}) {
  const root = useRef<THREE.Group>(null!);
  const glass = useRef<THREE.Group>(null!);
  const glassMesh = useRef<THREE.Mesh>(null!);
  const blocks = useRef<THREE.Mesh[]>([]);
  const ringA = useRef<THREE.Mesh>(null!);
  const ringB = useRef<THREE.Mesh>(null!);
  const halo = useRef<THREE.Mesh>(null!);
  const coreLight = useRef<THREE.PointLight>(null!);
  const dots = useRef<THREE.InstancedMesh>(null!);
  const motes = useRef<THREE.InstancedMesh>(null!);
  const lines = useRef<THREE.LineSegments>(null!);
  const pulse = useRef<THREE.Mesh>(null!);
  const orbit = useRef<THREE.Mesh>(null!);
  const ribbon = useRef<THREE.Mesh>(null!);

  const time = useRef(reduced ? 0.7 : 0); // reduced motion parks on the hero moment
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const a = useMemo(() => new THREE.Vector3(), []);
  const b = useMemo(() => new THREE.Vector3(), []);

  const MOTES = low ? 14 : 30;

  /** soft radial sprite reused by the platform halo and the floating motes */
  const glowTex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d')!;
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(255,255,255,0.95)');
    grd.addColorStop(0.22, 'rgba(147,197,253,0.7)');
    grd.addColorStop(0.55, 'rgba(37,99,235,0.22)');
    grd.addColorStop(1, 'rgba(37,99,235,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);

  const linePos = useMemo(() => new Float32Array(PAIRS.length * 6), []);
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    return g;
  }, [linePos]);

  const jointGeo = useMemo(() => new THREE.SphereGeometry(0.042, 16, 16), []);

  useEffect(
    () => () => {
      glowTex.dispose();
      lineGeo.dispose();
      jointGeo.dispose();
    },
    [glowTex, lineGeo, jointGeo],
  );

  /** motes ride fixed orbits; only their phase advances, so the ring never jumps */
  const moteSeeds = useMemo(
    () =>
      Array.from({ length: MOTES }, (_, i) => ({
        r: 1.25 + ((i * 0.37) % 1) * 0.95,
        y: -0.9 + ((i * 0.61) % 1) * 2.1,
        ph: (i * 0.191) % 1,
        turns: (i % 3) - 1 || 1, // integer turns per loop → seamless
        size: 0.028 + ((i * 0.13) % 1) * 0.038,
      })),
    [MOTES],
  );

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05);
    if (!reduced) time.current = (time.current + d / LOOP) % 1;
    const t = time.current;

    /* ---- scene envelopes (all return to 0 at t=1) ---- */
    const wake = arc(t, 0.02, 0.14, 0.92, 1.0); // 01 platform activation
    const rise = arc(t, 0.1, 0.3, 0.88, 1.0); // 02 container rises
    const link = arc(t, 0.34, 0.5, 0.84, 0.96); // 03 data connection
    const order = arc(t, 0.5, 0.68, 0.8, 0.94); // 04 organised structure
    const heroic = arc(t, 0.6, 0.72, 0.86, 0.96); // 05 hero moment

    const hover = driver.current.hover;
    const glow = 0.16 + 0.84 * wake + 0.3 * link + 0.35 * hover;

    /* ---- root: pointer parallax + scroll handoff ---- */
    const px = reduced ? 0 : state.pointer.x;
    const py = reduced ? 0 : state.pointer.y;
    const s = driver.current.scroll;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, px * 0.3 + s * 0.7, 3, d);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -py * 0.16 + s * 0.12, 3, d);
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, 0.04 - py * 0.12 - s * 0.5, 3, d);
    root.current.position.z = THREE.MathUtils.damp(root.current.position.z, -s * 1.2, 3, d);

    /* ---- 01 platform ---- */
    ringA.current.rotation.z = TAU * t * 2;
    ringB.current.rotation.z = -TAU * t * 3;
    const hm = halo.current.material as THREE.MeshBasicMaterial;
    hm.opacity = 0.18 + 0.62 * glow;
    halo.current.scale.setScalar(0.95 + 0.08 * glow);
    coreLight.current.intensity = 0.6 + 3.4 * glow;

    /* ---- 02 the container rises out of the platform ---- */
    const up = 0.02 + 0.98 * rise;
    glass.current.visible = rise > 0.015;
    glass.current.scale.setScalar(up);
    glass.current.position.y = -1.02 + 1.02 * rise;
    glass.current.rotation.y = TAU * t + 0.3 * Math.sin(TAU * t) * (1 - order * 0.5);

    /* ---- 02/03/04 the modules ---- */
    for (let i = 0; i < BLOCKS.length; i++) {
      const m = blocks.current[i];
      if (!m) continue;
      const cfg = BLOCKS[i];

      // appear staggered, disappear staggered — both inside the loop
      const alive = blockAlive(t, i);
      m.visible = alive > 0.01;
      m.scale.setScalar(cfg.size * alive);

      // scattered → organised lattice; blue modules settle a little higher
      const spread = 1.48 - 0.28 * order;
      const drift = 1 - 0.6 * order; // free movement calms as the system organises
      const n = 1 + (i % 3);
      const ph = i * 0.137;

      m.position.set(
        cfg.home[0] * spread + 0.06 * Math.sin(TAU * (t * n + ph)) * drift,
        cfg.home[1] * spread +
          (cfg.blue ? 0.12 : -0.04) * order +
          0.07 * Math.cos(TAU * (t * (n + 1) + ph)) * drift,
        cfg.home[2] * spread + 0.05 * Math.sin(TAU * (t * (n + 2) + ph * 1.7)) * drift,
      );

      const dir = i % 2 ? 1 : -1;
      m.rotation.set(TAU * t * dir, TAU * t * dir * (i % 3 === 0 ? 2 : 1), 0);
    }

    /* ---- 03 data flowing between the modules ---- */
    const lm = lines.current.material as THREE.LineBasicMaterial;
    lm.opacity = 0.55 * link;
    lines.current.visible = link > 0.01;
    const posAttr = lines.current.geometry.getAttribute('position');
    const pos = posAttr.array as Float32Array;
    for (let p = 0; p < PAIRS.length; p++) {
      const [i, j] = PAIRS[p];
      const mi = blocks.current[i];
      const mj = blocks.current[j];
      if (!mi || !mj) continue;
      a.copy(mi.position);
      b.copy(mj.position);
      pos.set([a.x, a.y, a.z, b.x, b.y, b.z], p * 6);

      // a packet travelling the path — 3 trips per loop keeps it seamless
      const f = (t * 3 + p / PAIRS.length) % 1;
      dummy.position.lerpVectors(a, b, f);
      dummy.scale.setScalar(0.05 * link * Math.sin(Math.PI * f));
      dummy.updateMatrix();
      dots.current.setMatrixAt(p, dummy.matrix);
    }
    posAttr.needsUpdate = true;
    dots.current.instanceMatrix.needsUpdate = true;
    dots.current.visible = link > 0.01;

    /* ---- 04 an energy pulse travels from the platform up through the system ---- */
    const travel = arc(t, 0.5, 0.72, 1, 1.0001); // ramp only; no fall-back needed
    const pv = arc(t, 0.5, 0.55, 0.66, 0.72);
    pulse.current.visible = pv > 0.01;
    pulse.current.position.y = -1.15 + 2.4 * travel;
    pulse.current.scale.setScalar(1 - 0.45 * travel);
    (pulse.current.material as THREE.MeshBasicMaterial).opacity = 0.7 * pv;

    /* ---- 05 orbit + ribbon ---- */
    orbit.current.rotation.z = TAU * t;
    (orbit.current.material as THREE.MeshBasicMaterial).opacity = 0.07 + 0.28 * heroic;
    ribbon.current.rotation.y = -TAU * t;
    (ribbon.current.material as THREE.MeshBasicMaterial).opacity = 0.06 + 0.1 * wake + 0.06 * heroic;

    /* ---- particles ---- */
    const moteIn = arc(t, 0.04, 0.22, 0.9, 1.0);
    for (let i = 0; i < MOTES; i++) {
      const p = moteSeeds[i];
      const ang = TAU * (t * p.turns + p.ph) + s * 1.4;
      dummy.position.set(
        Math.cos(ang) * p.r,
        p.y + 0.14 * Math.sin(TAU * (t * 2 + p.ph)),
        Math.sin(ang) * p.r,
      );
      dummy.rotation.set(ang, ang * 1.5, 0);
      dummy.scale.setScalar(p.size * moteIn);
      dummy.updateMatrix();
      motes.current.setMatrixAt(i, dummy.matrix);
    }
    motes.current.instanceMatrix.needsUpdate = true;

    /* hover lifts the glass a touch — the system reacting to attention */
    if (glassMesh.current) {
      const gm = glassMesh.current.material as THREE.MeshPhysicalMaterial;
      gm.emissiveIntensity = THREE.MathUtils.damp(gm.emissiveIntensity, 0.04 + 0.22 * hover, 4, d);
    }
  });

  return (
    <group ref={root}>
      {/* ---------------- platform ---------------- */}
      <group position={[0, -1.16, 0]}>
        <RoundedBox args={[2.5, 0.14, 2.5]} radius={0.025} smoothness={3} position={[0, -0.16, 0]}>
          <meshPhysicalMaterial color="#ffffff" roughness={0.42} metalness={0} clearcoat={0.4} />
        </RoundedBox>

        <mesh>
          <cylinderGeometry args={[0.84, 0.84, 0.09, 64]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.16} metalness={0.02} clearcoat={1} />
        </mesh>

        {/* glowing core disc */}
        <mesh ref={halo} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.052, 0]}>
          <circleGeometry args={[0.98, 64]} />
          <meshBasicMaterial
            map={glowTex}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>

        <mesh ref={ringA} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <torusGeometry args={[1.02, 0.028, 12, 96]} />
          <meshPhysicalMaterial color="#2563eb" roughness={0.2} metalness={0.1} clearcoat={1} />
        </mesh>

        <mesh ref={ringB} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.09, 0]}>
          <torusGeometry args={[0.92, 0.008, 8, 96]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.75} toneMapped={false} />
        </mesh>

        <pointLight ref={coreLight} position={[0, 0.35, 0]} color="#3b82f6" distance={4} />
      </group>

      {/* translucent ribbon sweeping the platform */}
      <mesh ref={ribbon} position={[0, -0.92, 0]} rotation={[0.1, 0, 0.05]}>
        {/* an arc, not a full band — a closed cylinder reads as a bucket */}
        <cylinderGeometry args={[1.24, 1.24, 0.36, 48, 1, true, 0, 4.3]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* hero orbit */}
      <mesh ref={orbit} rotation={[-Math.PI / 2 + 0.42, 0, 0]} position={[0, 0.05, 0]}>
        <torusGeometry args={[1.72, 0.006, 8, 128]} />
        <meshBasicMaterial color="#2563eb" transparent opacity={0.1} toneMapped={false} />
      </mesh>

      {/* energy pulse */}
      <mesh ref={pulse} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
        <torusGeometry args={[0.72, 0.012, 8, 96]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* floating micro-blocks */}
      <instancedMesh ref={motes} args={[undefined, undefined, MOTES]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color="#3b82f6"
          roughness={0.15}
          metalness={0.1}
          clearcoat={1}
          transparent
          opacity={0.85}
        />
      </instancedMesh>

      {/* ---------------- the system ---------------- */}
      <group ref={glass}>
        {/* stood on a corner, like the reference */}
        <group rotation={[Math.atan(Math.SQRT1_2), 0, Math.PI / 4]}>
          {/* Glass as a thin reflective shell, not `transmission` — against a
              transparent canvas transmission samples empty backbuffer and reads
              muddy grey, and it costs a full extra render pass every frame. */}
          <mesh ref={glassMesh}>
            <boxGeometry args={[CUBE, CUBE, CUBE]} />
            <meshPhysicalMaterial
              color="#ffffff"
              emissive="#2563eb"
              emissiveIntensity={0.04}
              roughness={0.04}
              metalness={0}
              clearcoat={1}
              clearcoatRoughness={0.03}
              reflectivity={0.6}
              envMapIntensity={1.6}
              transparent
              opacity={0.1}
              depthWrite={false}
              /* FrontSide: back faces of a transparent box sort in front of the
                 near ones and the cube reads as a solid wedge */
              side={THREE.FrontSide}
            />
            {/* pure white rods vanish on a white page — soft slate reads as glass trim */}
            <Edges threshold={15} color="#9fb4d4" lineWidth={1.6} />
          </mesh>

          {CORNERS.map((c, i) => (
            <mesh key={i} geometry={jointGeo} position={c}>
              <meshPhysicalMaterial color="#ffffff" roughness={0.15} metalness={0.05} clearcoat={1} />
            </mesh>
          ))}

          {/* modules */}
          {BLOCKS.map((cfg, i) => (
            <RoundedBox
              key={i}
              ref={(el: THREE.Mesh | null) => {
                if (el) blocks.current[i] = el;
              }}
              args={[1, 1, 1]}
              radius={0.07}
              smoothness={3}
              visible={false}
            >
              {cfg.blue ? (
                <meshPhysicalMaterial
                  color="#2563eb"
                  emissive="#1d4ed8"
                  emissiveIntensity={0.18}
                  roughness={0.14}
                  metalness={0.1}
                  clearcoat={1}
                />
              ) : (
                <meshPhysicalMaterial
                  color="#eef1f7"
                  roughness={0.2}
                  metalness={0.04}
                  clearcoat={1}
                  clearcoatRoughness={0.1}
                />
              )}
            </RoundedBox>
          ))}

          {/* data paths + travelling packets */}
          <lineSegments ref={lines} geometry={lineGeo} frustumCulled={false}>
            <lineBasicMaterial
              color="#3b82f6"
              transparent
              opacity={0}
              depthWrite={false}
              toneMapped={false}
            />
          </lineSegments>

          <instancedMesh ref={dots} args={[undefined, undefined, PAIRS.length]} frustumCulled={false}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshBasicMaterial color="#93c5fd" toneMapped={false} />
          </instancedMesh>
        </group>
      </group>

      <ContactShadows
        position={[0, -1.38, 0]}
        opacity={0.32}
        scale={7}
        blur={2.6}
        far={3}
        resolution={low ? 256 : 512}
        color="#0b1220"
      />
    </group>
  );
}

/* ------------------------------------------------------------------ */

export default function EcosystemScene({
  driver,
  active,
}: {
  driver: RefObject<Driver>;
  active: boolean;
}) {
  const reduced = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );
  const low = useMemo(
    () => window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4,
    [],
  );

  return (
    <Canvas
      flat
      dpr={[1, low ? 1.5 : 2]}
      frameloop={reduced || !active ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.5, 7.4], fov: 30 }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#dbeafe" />

      {/* studio env baked once from lightformers — no network fetch */}
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={2.2} position={[0, 5, 2]} scale={[8, 8, 1]} color="#ffffff" />
        <Lightformer intensity={1.1} position={[-5, 1, 1]} scale={[6, 6, 1]} color="#e8f0ff" />
        <Lightformer intensity={0.9} position={[5, 0, -2]} scale={[6, 6, 1]} color="#bfdbfe" />
      </Environment>

      <Ecosystem driver={driver} reduced={reduced} low={low} />
    </Canvas>
  );
}
