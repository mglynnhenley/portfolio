'use client';

import { useEffect, useRef } from 'react';

// ASCII koi drifting over the page, after Dao Ho's koi pond (github.com/Dao-Ho/portfolio).
// Each fish is a chain of spine nodes; every frame the character grid around it is
// sampled against the body outline and filled with glyphs. Click the background to
// drop a pellet and the koi come to eat it.

const CW = 8;
const CH = 12;
const NODES = 10;
const FONT = "bold 12px 'Courier New', Courier, monospace";
// Koi swimming under the page box stay faintly visible behind the text.
const DIM_UNDER_PAGE = 0.12;
const MIN_WIDTH = 768;

const BODY_GLYPHS = '.:+*%#@';
const LIGHT = {
  white: '#9a938b',
  red: '#d9431c',
  black: '#1c1a1f',
  fin: '#b5aea6',
  eye: '#000000',
  pellet: '#a8651f',
  ripple: '#0000ee',
};
const DARK: typeof LIGHT = {
  white: '#e4ddd4',
  red: '#ff6a3d',
  black: '#6e6a7c',
  fin: '#8f8a84',
  eye: '#ffffff',
  pellet: '#e0a35c',
  ripple: '#7fa6ff',
};

type Patch = { s: number; v: number; rs: number; rv: number };
type Koi = {
  x: number;
  y: number;
  heading: number;
  turn: number;
  speed: number;
  phase: number;
  length: number;
  small: boolean;
  nodes: { x: number; y: number }[];
  red: Patch[];
  black: Patch[];
};
type Pellet = { x: number; y: number; age: number };
type Ripple = { x: number; y: number; age: number };

const PELLET_LIFE = 14;
const RIPPLE_LIFE = 1.4;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function angleDiff(a: number, b: number) {
  return Math.atan2(Math.sin(b - a), Math.cos(b - a));
}

// A line glyph that follows a screen-space direction, for fin rays and ripple rings.
function lineGlyph(dx: number, dy: number) {
  const d = Math.hypot(dx, dy) || 1;
  if (Math.abs(dy) < 0.38 * d) return '-';
  if (Math.abs(dx) < 0.38 * d) return '|';
  return dx * dy > 0 ? '\\' : '/';
}

// Kohaku-style markings: a red head and two or three red saddles, sometimes black spots.
function markings(): { red: Patch[]; black: Patch[] } {
  const red: Patch[] = [];
  if (Math.random() < 0.75) red.push({ s: 0.1, v: 0, rs: rand(0.05, 0.08), rv: 0.11 });
  const saddles = 2 + Math.floor(Math.random() * 2);
  const span = 0.45 / saddles;
  for (let j = 0; j < saddles; j++) {
    red.push({
      s: 0.25 + span * (j + 0.5) + rand(-0.15, 0.15) * span,
      v: rand(-0.025, 0.025),
      rs: span * rand(0.32, 0.45),
      rv: rand(0.08, 0.13),
    });
  }
  const black: Patch[] = [];
  if (Math.random() < 0.4) {
    const spots = 3 + Math.floor(Math.random() * 3);
    for (let j = 0; j < spots; j++) {
      black.push({ s: rand(0.24, 0.66), v: rand(-0.08, 0.08), rs: 0.025, rv: 0.03 });
    }
  }
  return { red, black };
}

function inPatch(p: Patch, s: number, vn: number) {
  return ((s - p.s) / p.rs) ** 2 + ((vn - p.v) / p.rv) ** 2 < 1;
}

// Body half-width as a fraction of length, from the nose (s = 0) to the tail root (s = 0.8).
function halfWidth(s: number) {
  if (s < 0) return 0;
  if (s < 0.2) return 0.13 * Math.sqrt(s / 0.2);
  if (s < 0.82) return 0.13 * (1 - 0.82 * Math.pow((s - 0.2) / 0.62, 1.3));
  return 0;
}

function spawnKoi(x: number, y: number, small: boolean): Koi {
  const length = small ? rand(75, 105) : rand(150, 210);
  const heading = rand(0, Math.PI * 2);
  const seg = length / (NODES - 1);
  const nodes = Array.from({ length: NODES }, (_, i) => ({
    x: x - Math.cos(heading) * seg * i,
    y: y - Math.sin(heading) * seg * i,
  }));
  return {
    x,
    y,
    heading,
    turn: 0,
    speed: small ? rand(38, 55) : rand(28, 45),
    phase: rand(0, Math.PI * 2),
    length,
    small,
    nodes,
    ...markings(),
  };
}

export default function KoiPond() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let width = 0;
    let height = 0;
    let koi: Koi[] = [];
    const pellets: Pellet[] = [];
    const ripples: Ripple[] = [];
    let page = { left: 0, right: 0, top: 0, bottom: 0 };
    let COLORS = LIGHT;

    const measurePage = () => {
      const main = document.querySelector('main');
      if (main) page = main.getBoundingClientRect();
    };

    // Spawn in the side margins so the first thing you see is a fish, not a faint smudge.
    const spawnPoint = () => {
      measurePage();
      const left = Math.random() < 0.5;
      const lo = left ? 30 : page.right + 30;
      const hi = left ? page.left - 30 : width - 30;
      return { x: hi > lo ? rand(lo, hi) : rand(30, width - 30), y: rand(60, height - 60) };
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (width < MIN_WIDTH) {
        koi = [];
        return;
      }
      // A few full-size koi, plus one or two at about half size.
      const big = Math.max(3, Math.min(5, Math.round((width * height) / 320000)));
      const small = width >= 1200 ? 2 : 1;
      for (const [isSmall, target] of [[false, big], [true, small]] as const) {
        const kind = koi.filter((k) => k.small === isSmall);
        while (kind.length < target) {
          const p = spawnPoint();
          kind.push(spawnKoi(p.x, p.y, isSmall));
        }
        kind.length = target;
        koi = [...koi.filter((k) => k.small !== isSmall), ...kind];
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (koi.length === 0 || target?.closest('main, a, button')) return;
      pellets.push({ x: e.clientX, y: e.clientY, age: 0 });
      ripples.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (pellets.length > 12) pellets.shift();
    };

    const steer = (k: Koi, dt: number) => {
      // Wander.
      k.turn = Math.max(-1, Math.min(1, k.turn + rand(-1, 1) * dt * 2.5));
      let heading = k.heading + k.turn * dt * 0.9;
      let speed = k.speed;

      // Chase the nearest pellet.
      let best: Pellet | null = null;
      let bestD = 380;
      for (const p of pellets) {
        const d = Math.hypot(p.x - k.x, p.y - k.y);
        if (d < bestD) {
          bestD = d;
          best = p;
        }
      }
      if (best) {
        heading += angleDiff(heading, Math.atan2(best.y - k.y, best.x - k.x)) * Math.min(1, dt * 3);
        speed = 85;
        if (bestD < 10) {
          pellets.splice(pellets.indexOf(best), 1);
          ripples.push({ x: best.x, y: best.y, age: 0.5 });
        }
      }

      // Keep a little space from the other koi so they don't merge into one blob.
      // Weaker while feeding, so two koi can still go for the same pellet.
      let sx = 0;
      let sy = 0;
      for (const o of koi) {
        if (o === k) continue;
        const room = (k.length + o.length) * 0.3;
        for (const n of o.nodes) {
          const dx = k.x - n.x;
          const dy = k.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d > 0 && d < room) {
            sx += (dx / d) * (1 - d / room);
            sy += (dy / d) * (1 - d / room);
          }
        }
      }
      if (sx || sy) {
        const push = Math.min(1, Math.hypot(sx, sy)) * (best ? 0.4 : 1);
        heading += angleDiff(heading, Math.atan2(sy, sx)) * Math.min(1, dt * 3 * push);
      }

      // Turn back from the viewport edges.
      const m = 70;
      const ax = (k.x < m ? (m - k.x) / m : 0) - (k.x > width - m ? (k.x - width + m) / m : 0);
      const ay = (k.y < m ? (m - k.y) / m : 0) - (k.y > height - m ? (k.y - height + m) / m : 0);
      if (ax || ay) {
        heading += angleDiff(heading, Math.atan2(ay, ax)) * Math.min(1, dt * 4 * Math.hypot(ax, ay));
      }

      // Prefer the margins: veer off when about to swim under the page, unless chasing food.
      if (!best) {
        const lx = k.x + Math.cos(heading) * k.length;
        const ly = k.y + Math.sin(heading) * k.length;
        const pad = 20;
        const outside = k.x < page.left - pad || k.x > page.right + pad;
        if (
          outside &&
          lx > page.left - pad &&
          lx < page.right + pad &&
          ly > page.top - pad &&
          ly < page.bottom + pad
        ) {
          // Bend toward up or down the margin, angled slightly away from the page.
          const away = k.x < (page.left + page.right) / 2 ? -0.6 : 0.6;
          const along = Math.sin(heading) >= 0 ? 1 : -1;
          heading += angleDiff(heading, Math.atan2(along, away)) * Math.min(1, dt * 2.5);
        }
      }

      k.heading = heading;
      k.phase += dt * (5 + speed / 15);
      const wiggle = Math.sin(k.phase) * 0.35;
      k.x += Math.cos(heading + wiggle) * speed * dt;
      k.y += Math.sin(heading + wiggle) * speed * dt;

      // Follow-the-leader spine.
      const seg = k.length / (NODES - 1);
      k.nodes[0].x = k.x;
      k.nodes[0].y = k.y;
      for (let i = 1; i < NODES; i++) {
        const a = k.nodes[i - 1];
        const b = k.nodes[i];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 1;
        b.x = a.x + (dx / d) * seg;
        b.y = a.y + (dy / d) * seg;
      }
    };

    const glyph = (col: number, row: number, ch: string, color: string, alpha: number) => {
      const cx = col * CW + CW / 2;
      const cy = row * CH + CH / 2;
      const under =
        cx > page.left && cx < page.right && cy > page.top && cy < page.bottom ? DIM_UNDER_PAGE : 1;
      ctx.globalAlpha = alpha * under;
      ctx.fillStyle = color;
      ctx.fillText(ch, cx, cy);
    };

    const drawKoi = (k: Koi) => {
      const L = k.length;
      const reach = L * 0.25;
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const n of k.nodes) {
        minX = Math.min(minX, n.x);
        minY = Math.min(minY, n.y);
        maxX = Math.max(maxX, n.x);
        maxY = Math.max(maxY, n.y);
      }
      const c0 = Math.max(0, Math.floor((minX - reach) / CW));
      const c1 = Math.min(Math.ceil(width / CW), Math.ceil((maxX + reach) / CW));
      const r0 = Math.max(0, Math.floor((minY - reach) / CH));
      const r1 = Math.min(Math.ceil(height / CH), Math.ceil((maxY + reach) / CH));
      const seg = L / (NODES - 1);

      for (let row = r0; row <= r1; row++) {
        for (let col = c0; col <= c1; col++) {
          const px = col * CW + CW / 2;
          const py = row * CH + CH / 2;

          // Nearest point on the spine: s runs nose to tail, v is signed distance across.
          let best = Infinity;
          let s = 0;
          let v = 0;
          let tx = 1;
          let ty = 0;
          for (let i = 0; i < NODES - 1; i++) {
            const a = k.nodes[i];
            const b = k.nodes[i + 1];
            const ex = b.x - a.x;
            const ey = b.y - a.y;
            const len2 = ex * ex + ey * ey || 1;
            const t = Math.max(0, Math.min(1, ((px - a.x) * ex + (py - a.y) * ey) / len2));
            const qx = a.x + ex * t;
            const qy = a.y + ey * t;
            const d = Math.hypot(px - qx, py - qy);
            if (d < best) {
              best = d;
              s = (i + t) * seg / L;
              const len = Math.sqrt(len2);
              tx = ex / len;
              ty = ey / len;
              v = (ex * (py - a.y) - ey * (px - a.x)) / len;
            }
          }
          // Let the tail fan out past the last node.
          if (s >= 0.99) {
            const a = k.nodes[NODES - 1];
            s = 1 + ((px - a.x) * tx + (py - a.y) * ty) / L;
          }

          const vn = v / L;
          const hw = halfWidth(s);
          const across = Math.abs(vn);

          if (across < hw) {
            const depth = 1 - across / hw;
            if (s > 0.05 && s < 0.1 && across > hw * 0.4 && across < hw * 0.85) {
              glyph(col, row, 'o', COLORS.eye, 1);
              continue;
            }
            const color = k.black.some((p) => inPatch(p, s, vn))
              ? COLORS.black
              : k.red.some((p) => inPatch(p, s, vn))
                ? COLORS.red
                : COLORS.white;
            const ch = BODY_GLYPHS[Math.min(BODY_GLYPHS.length - 1, Math.floor(depth * BODY_GLYPHS.length))];
            glyph(col, row, ch, color, 0.95);
            continue;
          }

          // Tail fin: a forked fan behind the body. Rays point back from the tail root.
          if (s > 0.8 && s < 1.12) {
            const spread = (s - 0.8) * 0.75;
            const fork = s > 1.0 ? 0.35 * spread : 0;
            if (across < spread && across >= fork) {
              const ds = s - 0.8;
              const dx = tx * ds - ty * vn;
              const dy = ty * ds + tx * vn;
              glyph(col, row, lineGlyph(dx, dy), COLORS.fin, 0.8);
            }
            continue;
          }

          // Pectoral fins, swept back just behind the head.
          if (s > 0.18 && s < 0.36) {
            const finEdge = halfWidth(s) + 0.14 * (1 - (s - 0.18) / 0.18);
            if (across < finEdge) {
              const ds = s - 0.18;
              const dv = vn - Math.sign(vn) * halfWidth(0.18);
              const dx = tx * ds - ty * dv;
              const dy = ty * ds + tx * dv;
              glyph(col, row, lineGlyph(dx, dy), COLORS.fin, 0.7);
            }
          }
        }
      }
    };

    const drawRipple = (r: Ripple) => {
      const t = r.age / RIPPLE_LIFE;
      const radius = 8 + t * 70;
      const steps = Math.max(12, Math.round((Math.PI * 2 * radius) / CW));
      const seen = new Set<number>();
      for (let i = 0; i < steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const col = Math.floor((r.x + Math.cos(a) * radius) / CW);
        const row = Math.floor((r.y + Math.sin(a) * radius) / CH);
        const key = row * 10000 + col;
        if (seen.has(key)) continue;
        seen.add(key);
        glyph(col, row, lineGlyph(-Math.sin(a), Math.cos(a)), COLORS.ripple, 0.45 * (1 - t));
      }
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      measurePage();
      COLORS = document.documentElement.dataset.theme === 'dark' ? DARK : LIGHT;

      for (const k of koi) steer(k, dt);
      for (const p of pellets) p.age += dt;
      for (const r of ripples) r.age += dt;
      while (pellets.length && pellets[0].age > PELLET_LIFE) pellets.shift();
      for (let i = ripples.length - 1; i >= 0; i--) if (ripples[i].age > RIPPLE_LIFE) ripples.splice(i, 1);

      ctx.clearRect(0, 0, width, height);
      ctx.font = FONT;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const r of ripples) drawRipple(r);
      for (const p of pellets) {
        glyph(Math.floor(p.x / CW), Math.floor(p.y / CH), '*', COLORS.pellet, Math.min(1, (PELLET_LIFE - p.age) / 2));
      }
      for (const k of koi) drawKoi(k);
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('click', onClick);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="koi-pond" aria-hidden="true" />;
}
