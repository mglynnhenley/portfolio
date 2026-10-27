'use client';

import { useEffect, useRef } from 'react';

// ASCII koi drifting over the page, after Dao Ho's koi pond (github.com/Dao-Ho/portfolio).
// Each fish is a chain of spine nodes; every frame the character grid around it is
// sampled against the body outline and filled with glyphs. Click the background to
// drop a pellet and the koi come to eat it. "Be a fish" (see FishToggle) adds a blue koi
// you steer with the arrow keys or WASD.
//
// A sea turtle glides through too, after the tiled ASCII turtles in @stackedlol's ocean:
// a patterned shell, paddling flippers, and a soft shadow on the pond floor.

const CW = 8;
const CH = 12;
const NODES = 10;
// Most a koi's spine can bend at one joint, in radians.
const MAX_BEND = 0.32;
const font = (scale = 1) => `bold ${12 * scale}px 'Courier New', Courier, monospace`;
// Koi swimming under the page box stay faintly visible behind the text.
const DIM_UNDER_PAGE = 0.12;
const MIN_WIDTH = 768;

const BODY_GLYPHS = '.:+*%#@';
// Koi are plain coloured glyphs. Turtle cells are tiles of skin colour with a glyph etched on top.
type Skin = { tile: string; ink: string };
const LIGHT = {
  white: '#9a938b',
  red: '#b8360f',
  black: '#1c1a1f',
  eye: '#000000',
  fin: '#b5aea6',
  pellet: '#a8651f',
  ripple: '#0000ee',
  bubble: '#5b8db5',
  // The player's koi: blue, a colour none of the others have.
  playerBody: '#2f6fe0',
  playerPatch: '#173c9c',
  playerSpot: '#0b1a3d',
  shell: { tile: '#a6a062', ink: '#6b6736' },
  scute: { tile: '#807b42', ink: '#4b4822' },
  shellRim: { tile: '#c8c38b', ink: '#8a864f' },
  skin: { tile: '#bfb88e', ink: '#76704c' },
  turtleEye: { tile: '#bfb88e', ink: '#000000' },
  shadow: '#000000',
};
// At night the turtle drops its tiles and, like the koi, is drawn as bare glyphs.
const DARK: typeof LIGHT = {
  white: '#e4ddd4',
  red: '#e8552a',
  black: '#6e6a7c',
  eye: '#ffffff',
  fin: '#8f8a84',
  pellet: '#e0a35c',
  ripple: '#7fa6ff',
  bubble: '#bfe0ff',
  playerBody: '#4d94ff',
  playerPatch: '#b3d3ff',
  playerSpot: '#1d3f8f',
  shell: { tile: '#cfc472', ink: '#cfc472' },
  scute: { tile: '#968c45', ink: '#968c45' },
  shellRim: { tile: '#e6dea6', ink: '#e6dea6' },
  skin: { tile: '#d8cfa3', ink: '#d8cfa3' },
  turtleEye: { tile: '#ffffff', ink: '#ffffff' },
  shadow: '#000000',
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
  player?: boolean;
  nodes: { x: number; y: number }[];
  red: Patch[];
  black: Patch[];
};
type Turtle = {
  x: number;
  y: number;
  heading: number;
  turn: number;
  phase: number;
  size: number;
};
/** A glyph to draw: column, row, character, ink colour, alpha, and the tile behind it if any. */
type Cell = [number, number, string, string, number, string?];

const tiled = (col: number, row: number, ch: string, skin: Skin, alpha: number): Cell => [
  col,
  row,
  ch,
  skin.ink,
  alpha,
  skin.tile,
];
type Pellet = { x: number; y: number; age: number };
type Ripple = { x: number; y: number; age: number };
type Bubble = { x: number; y: number; age: number; life: number; drift: number };

const PELLET_LIFE = 14;
const RIPPLE_LIFE = 1.4;
// Bubbles swell as they rise, then pop.
const BUBBLE_GLYPHS = '.oO';

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

// One per shell plate, etched into its tiles.
const SHELL_GLYPHS = 'S%8tX$';

function inEllipse(x: number, y: number, a: number, b: number) {
  return (x / a) ** 2 + (y / b) ** 2 < 1;
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
    let turtles: Turtle[] = [];
    const pellets: Pellet[] = [];
    const ripples: Ripple[] = [];
    const bubbles: Bubble[] = [];
    // Every so often a koi or turtle lets out a little string of bubbles from its head.
    let nextBubble = rand(2, 5);
    const releaseBubbles = () => {
      const swimmers = [
        ...koi.map((k) => ({ x: k.x, y: k.y })),
        ...turtles.map((t) => ({
          x: t.x + Math.cos(t.heading) * t.size * 0.45,
          y: t.y + Math.sin(t.heading) * t.size * 0.45,
        })),
      ];
      if (swimmers.length === 0) return;
      const from = swimmers[Math.floor(Math.random() * swimmers.length)];
      const count = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        bubbles.push({
          x: from.x + rand(-4, 4),
          y: from.y + rand(-4, 4),
          age: -i * 0.35,
          life: rand(1.6, 2.4),
          drift: rand(0, Math.PI * 2),
        });
      }
    };
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
        turtles = [];
        return;
      }
      // A few full-size koi, plus one or two at about half size.
      const big = Math.max(2, Math.min(4, Math.round((width * height) / 400000)));
      const small = width >= 1200 ? 2 : 1;
      for (const [isSmall, target] of [[false, big], [true, small]] as const) {
        const kind = koi.filter((k) => !k.player && k.small === isSmall);
        while (kind.length < target) {
          const p = spawnPoint();
          kind.push(spawnKoi(p.x, p.y, isSmall));
        }
        kind.length = target;
        koi = [...koi.filter((k) => k.player || k.small !== isSmall), ...kind];
      }
      // One adult turtle and a couple of babies.
      if (turtles.length === 0) {
        const babies = width >= 1200 ? 3 : 2;
        turtles = [rand(150, 175), ...Array.from({ length: babies }, () => rand(72, 88))].map((size) => {
          const p = spawnPoint();
          return { x: p.x, y: p.y, heading: rand(0, Math.PI * 2), turn: 0, phase: rand(0, Math.PI * 2), size };
        });
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (koi.length === 0 || target?.closest('main, a, button')) return;
      pellets.push({ x: e.clientX, y: e.clientY, age: 0 });
      ripples.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (pellets.length > 12) pellets.shift();
    };

    // The player's koi: arrow keys / WASD steer it; with no key held it idles forward.
    const keys = new Set<string>();
    const steerPlayer = (k: Koi, dt: number) => {
      let dx = 0;
      let dy = 0;
      if (keys.has('arrowleft') || keys.has('a')) dx -= 1;
      if (keys.has('arrowright') || keys.has('d')) dx += 1;
      if (keys.has('arrowup') || keys.has('w')) dy -= 1;
      if (keys.has('arrowdown') || keys.has('s')) dy += 1;

      let heading = k.heading;
      let speed = 18;
      if (dx || dy) {
        heading += angleDiff(heading, Math.atan2(dy, dx)) * Math.min(1, dt * 5);
        speed = 110;
      }

      // It eats pellets too.
      for (const p of pellets) {
        if (Math.hypot(p.x - k.x, p.y - k.y) < 14) {
          pellets.splice(pellets.indexOf(p), 1);
          ripples.push({ x: p.x, y: p.y, age: 0.5 });
          break;
        }
      }

      swim(k, heading, speed, dt);
      k.x = Math.max(0, Math.min(width, k.x));
      k.y = Math.max(0, Math.min(height, k.y));
    };

    const setPlayer = (on: boolean) => {
      koi = koi.filter((k) => !k.player);
      if (!on || width < MIN_WIDTH) return;
      // Appear in the margin right beside the toggle (top right of the page box), in view.
      measurePage();
      const x = Math.min(width - 60, page.right + Math.max(60, (width - page.right) / 2));
      koi.push({ ...spawnKoi(x, 140, false), length: 150, player: true });
    };
    const onPlayer = (e: Event) => setPlayer((e as CustomEvent<boolean>).detail);
    const playing = () => koi.some((k) => k.player);
    const onKeyDown = (e: KeyboardEvent) => {
      if (!playing()) return;
      const target = e.target as Element | null;
      if (target?.closest('input, textarea, select, [contenteditable]')) return;
      const key = e.key.toLowerCase();
      if (key === 'escape') {
        window.dispatchEvent(new CustomEvent('koi:player', { detail: false }));
        return;
      }
      if (!['arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'w', 'a', 's', 'd'].includes(key)) return;
      // Arrow keys would otherwise scroll the page.
      if (key.startsWith('arrow')) e.preventDefault();
      keys.add(key);
    };
    const onKeyUp = (e: KeyboardEvent) => keys.delete(e.key.toLowerCase());
    const onBlur = () => keys.clear();

    const steer = (k: Koi, dt: number) => {
      if (k.player) {
        steerPlayer(k, dt);
        return;
      }
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
      for (const t of turtles) {
        const room = t.size * 0.75 + k.length * 0.3;
        const dx = k.x - t.x;
        const dy = k.y - t.y;
        const d = Math.hypot(dx, dy);
        if (d > 0 && d < room) {
          sx += (dx / d) * (1 - d / room) * 2;
          sy += (dy / d) * (1 - d / room) * 2;
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

      swim(k, heading, speed, dt);
    };

    // Move a koi along its heading with a swimming wiggle, and drag the spine after the head.
    const swim = (k: Koi, heading: number, speed: number, dt: number) => {
      k.heading = heading;
      k.phase += dt * (5 + speed / 15);
      const wiggle = Math.sin(k.phase) * 0.35;
      k.x += Math.cos(heading + wiggle) * speed * dt;
      k.y += Math.sin(heading + wiggle) * speed * dt;

      // Follow-the-leader spine. Each joint can only bend so far from the segment ahead of it,
      // so a sharp turn (say, doubling back for a pellet) curves the body instead of folding it.
      const seg = k.length / (NODES - 1);
      k.nodes[0].x = k.x;
      k.nodes[0].y = k.y;
      let ahead = heading + Math.PI;
      for (let i = 1; i < NODES; i++) {
        const a = k.nodes[i - 1];
        const b = k.nodes[i];
        const bend = angleDiff(ahead, Math.atan2(b.y - a.y, b.x - a.x));
        const angle = ahead + Math.max(-MAX_BEND, Math.min(MAX_BEND, bend));
        b.x = a.x + Math.cos(angle) * seg;
        b.y = a.y + Math.sin(angle) * seg;
        ahead = angle;
      }
    };

    // `g` scales the character grid: small koi and baby turtles are drawn on a finer one.
    const underPage = (col: number, row: number, g = 1) => {
      const cx = (col + 0.5) * CW * g;
      const cy = (row + 0.5) * CH * g;
      return cx > page.left && cx < page.right && cy > page.top && cy < page.bottom;
    };

    const glyph = (col: number, row: number, ch: string, color: string, alpha: number, g = 1) => {
      ctx.globalAlpha = alpha * (underPage(col, row, g) ? DIM_UNDER_PAGE : 1);
      ctx.fillStyle = color;
      ctx.fillText(ch, (col + 0.5) * CW * g, (row + 0.5) * CH * g);
    };

    // Each glyph on its tile, the mosaic look (light mode only).
    const drawTiled = (cells: Cell[], g = 1) => {
      for (const [col, row, ch, ink, alpha, tile] of cells) {
        // In dark mode and under the page, no tile: just the glyph in the tile colour.
        if (COLORS === DARK || underPage(col, row, g)) {
          glyph(col, row, ch, tile ?? ink, alpha, g);
          continue;
        }
        if (tile) {
          ctx.globalAlpha = 0.6 * alpha;
          ctx.fillStyle = tile;
          ctx.fillRect(col * CW * g, row * CH * g, CW * g, CH * g);
        }
        glyph(col, row, ch, ink, alpha * 0.8, g);
      }
    };

    // A soft shadow on the pond floor, kept off the page. `lift` (0..1) is how high the
    // creature swims: higher means the shadow falls further down and right, softer and fainter.
    const drawSoftShadow = (lift: number, shape: (ox: number, oy: number) => void) => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, width, height);
      ctx.rect(page.left, page.top, page.right - page.left, page.bottom - page.top);
      ctx.clip('evenodd');
      ctx.filter = `blur(${4 + 8 * lift}px)`;
      ctx.globalAlpha = (COLORS === DARK ? 0.5 : 0.2) * (1 - 0.4 * lift);
      ctx.fillStyle = COLORS.shadow;
      ctx.beginPath();
      shape(14 + 30 * lift, 18 + 38 * lift);
      ctx.fill();
      ctx.restore();
    };

    // A koi's shadow is its body silhouette; bigger koi swim higher.
    const drawKoiShadow = (k: Koi) => {
      const seg = k.length / (NODES - 1);
      drawSoftShadow(Math.max(0, Math.min(1, (k.length - 75) / 135)), (ox, oy) => {
        k.nodes.forEach((n, i) => {
          const r = Math.max(2, halfWidth((i * seg) / k.length) * k.length);
          ctx.moveTo(n.x + ox + r, n.y + oy);
          ctx.arc(n.x + ox, n.y + oy, r, 0, Math.PI * 2);
        });
      });
    };

    const drawKoi = (k: Koi) => {
      const cells: Cell[] = [];
      // Small koi get a finer grid, like the baby turtles, so their outline stays smooth.
      const g = k.small ? 0.6 : 1;
      const cellW = CW * g;
      const cellH = CH * g;
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
      const c0 = Math.max(0, Math.floor((minX - reach) / cellW));
      const c1 = Math.min(Math.ceil(width / cellW), Math.ceil((maxX + reach) / cellW));
      const r0 = Math.max(0, Math.floor((minY - reach) / cellH));
      const r1 = Math.min(Math.ceil(height / cellH), Math.ceil((maxY + reach) / cellH));
      const seg = L / (NODES - 1);

      for (let row = r0; row <= r1; row++) {
        for (let col = c0; col <= c1; col++) {
          const px = (col + 0.5) * cellW;
          const py = (row + 0.5) * cellH;

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
              cells.push([col, row, 'o', COLORS.eye, 1]);
              continue;
            }
            const color = k.black.some((p) => inPatch(p, s, vn))
              ? k.player
                ? COLORS.playerSpot
                : COLORS.black
              : k.red.some((p) => inPatch(p, s, vn))
                ? k.player
                  ? COLORS.playerPatch
                  : COLORS.red
                : k.player
                  ? COLORS.playerBody
                  : COLORS.white;
            const ch = BODY_GLYPHS[Math.min(BODY_GLYPHS.length - 1, Math.floor(depth * BODY_GLYPHS.length))];
            cells.push([col, row, ch, color, 0.95]);
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
              cells.push([col, row, lineGlyph(dx, dy), COLORS.fin, 0.8]);
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
              cells.push([col, row, lineGlyph(dx, dy), COLORS.fin, 0.7]);
            }
          }
        }
      }

      drawKoiShadow(k);
      ctx.font = font(g);
      drawTiled(cells, g);
      ctx.font = font();
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

    const moveTurtle = (t: Turtle, dt: number) => {
      t.turn = Math.max(-1, Math.min(1, t.turn + rand(-1, 1) * dt * 1.5));
      let heading = t.heading + t.turn * dt * 0.35;

      // Give the koi a wide berth, and turn back from the screen edges.
      let ax = 0;
      let ay = 0;
      for (const k of koi) {
        const room = t.size * 0.6 + k.length * 0.5;
        const dx = t.x - k.x;
        const dy = t.y - k.y;
        const d = Math.hypot(dx, dy);
        if (d > 0 && d < room) {
          ax += (dx / d) * (1 - d / room);
          ay += (dy / d) * (1 - d / room);
        }
      }
      for (const o of turtles) {
        if (o === t) continue;
        const room = (t.size + o.size) * 0.55;
        const dx = t.x - o.x;
        const dy = t.y - o.y;
        const d = Math.hypot(dx, dy);
        if (d > 0 && d < room) {
          ax += (dx / d) * (1 - d / room);
          ay += (dy / d) * (1 - d / room);
        }
      }
      const m = t.size * 0.8;
      ax += (t.x < m ? (m - t.x) / m : 0) - (t.x > width - m ? (t.x - width + m) / m : 0);
      ay += (t.y < m ? (m - t.y) / m : 0) - (t.y > height - m ? (t.y - height + m) / m : 0);
      if (ax || ay) {
        heading += angleDiff(heading, Math.atan2(ay, ax)) * Math.min(1, dt * 2 * Math.min(1, Math.hypot(ax, ay)));
      }

      // Stay in the margins: bend up or down the margin when about to glide under the page.
      const lx = t.x + Math.cos(heading) * t.size;
      const pad = 20;
      const outside = t.x < page.left - pad || t.x > page.right + pad;
      if (outside && lx > page.left - pad && lx < page.right + pad) {
        const away = t.x < (page.left + page.right) / 2 ? -0.6 : 0.6;
        const along = Math.sin(heading) >= 0 ? 1 : -1;
        heading += angleDiff(heading, Math.atan2(along, away)) * Math.min(1, dt * 1.5);
      }

      t.heading = heading;
      // One slow stroke every few seconds; it surges on the power stroke and glides after.
      t.phase += dt * 1.9;
      const speed = 14 + 16 * Math.max(0, Math.sin(t.phase));
      t.x += Math.cos(heading) * speed * dt;
      t.y += Math.sin(heading) * speed * dt;
    };

    const drawTurtle = (t: Turtle) => {
      const S = t.size;
      const cos = Math.cos(t.heading);
      const sin = Math.sin(t.heading);
      const stroke = Math.sin(t.phase);
      // Flipper angles from straight ahead toward the side (radians): the front pair sweeps
      // back on the power stroke, the rear pair trails and flicks a little.
      const front = 2.1 - stroke * 0.55;
      const rear = 2.6 - stroke * 0.2;
      const cells: Cell[] = [];
      // Babies are too small for the normal grid (they come out jagged), so draw them on a finer one.
      const g = S < 120 ? 0.6 : 1;
      const cellW = CW * g;
      const cellH = CH * g;

      const reach = S * 0.75;
      const c0 = Math.floor((t.x - reach) / cellW);
      const c1 = Math.ceil((t.x + reach) / cellW);
      const r0 = Math.floor((t.y - reach) / cellH);
      const r1 = Math.ceil((t.y + reach) / cellH);
      for (let row = r0; row <= r1; row++) {
        for (let col = c0; col <= c1; col++) {
          const px = (col + 0.5) * cellW - t.x;
          const py = (row + 0.5) * cellH - t.y;
          // Turtle frame: f forward along the heading, u across (positive to its right).
          const f = px * cos + py * sin;
          const u = -px * sin + py * cos;

          const shellE = (f / (S * 0.36)) ** 2 + (u / (S * 0.28)) ** 2;
          if (shellE < 1) {
            // Scutes: a central row of plates flanked by two side rows, outlined darker.
            const band = Math.abs(u) < S * 0.09 ? 0 : 1;
            const along = (f + S * 0.36) / (S * (band ? 0.18 : 0.144));
            const seam = Math.abs(along - Math.round(along)) < 0.09 || Math.abs(Math.abs(u) - S * 0.09) < S * 0.012;
            if (shellE > 0.8) cells.push(tiled(col, row, ':', COLORS.shellRim, 1));
            else if (seam) cells.push(tiled(col, row, '#', COLORS.scute, 1));
            else {
              // Each plate gets its own glyph, so the shell reads as a mosaic of scutes.
              const plate = Math.floor(along) * 3 + (band ? (u > 0 ? 1 : 2) : 0);
              cells.push(tiled(col, row, SHELL_GLYPHS[plate % SHELL_GLYPHS.length], COLORS.shell, 1));
            }
            continue;
          }

          // Head, with an eye on each side.
          const hf = f - S * 0.43;
          if (inEllipse(hf, u, S * 0.1, S * 0.075)) {
            const eye = hf > 0 && Math.abs(Math.abs(u) - S * 0.04) < S * 0.02;
            cells.push(tiled(col, row, eye ? 'o' : '@', eye ? COLORS.turtleEye : COLORS.skin, 1));
            continue;
          }
          // Neck.
          if (f > S * 0.3 && f < S * 0.4 && Math.abs(u) < S * 0.05) {
            cells.push(tiled(col, row, '%', COLORS.skin, 1));
            continue;
          }

          // Flippers: long front pair, short rear pair, mirrored across the spine.
          const side = u >= 0 ? 1 : -1;
          const au = Math.abs(u);
          const flipper = (rootF: number, rootU: number, angle: number, len: number, wid: number) => {
            const dx = f - rootF;
            const dy = au - rootU;
            const ca = Math.cos(angle);
            const sa = Math.sin(angle);
            const along2 = dx * ca + dy * sa;
            const across2 = -dx * sa + dy * ca;
            return along2 > 0 && inEllipse(along2 - len / 2, across2, len / 2, wid);
          };
          if (flipper(S * 0.2, S * 0.2, front, S * 0.42, S * 0.07)) {
            cells.push(tiled(col, row, side > 0 ? '\\' : '/', COLORS.skin, 0.95));
            continue;
          }
          if (flipper(-S * 0.26, S * 0.15, rear, S * 0.2, S * 0.055)) {
            cells.push(tiled(col, row, '%', COLORS.skin, 0.9));
            continue;
          }
          // Little tail.
          if (f < -S * 0.34 && f > -S * 0.44 && au < S * 0.03 * (1 + (f + S * 0.34) / (S * 0.1))) {
            cells.push(tiled(col, row, '.', COLORS.skin, 0.85));
          }
        }
      }

      // The adult swims higher than the babies.
      drawSoftShadow(Math.max(0, Math.min(1, (S - 70) / 105)), (ox, oy) => {
        for (const [col, row] of cells) ctx.rect(col * cellW + ox, row * cellH + oy, cellW, cellH);
      });
      ctx.font = font(g);
      drawTiled(cells, g);
      ctx.font = font();
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      measurePage();
      COLORS = document.documentElement.dataset.theme === 'dark' ? DARK : LIGHT;

      for (const k of koi) steer(k, dt);
      for (const t of turtles) moveTurtle(t, dt);
      for (const p of pellets) p.age += dt;
      for (const r of ripples) r.age += dt;
      nextBubble -= dt;
      if (nextBubble <= 0) {
        releaseBubbles();
        nextBubble = rand(2.5, 6);
      }
      for (const b of bubbles) {
        b.age += dt;
        if (b.age > 0) {
          b.y -= 10 * dt;
          b.x += Math.sin(b.age * 3 + b.drift) * 6 * dt;
        }
      }
      for (let i = bubbles.length - 1; i >= 0; i--) if (bubbles[i].age > bubbles[i].life) bubbles.splice(i, 1);
      while (pellets.length && pellets[0].age > PELLET_LIFE) pellets.shift();
      for (let i = ripples.length - 1; i >= 0; i--) if (ripples[i].age > RIPPLE_LIFE) ripples.splice(i, 1);

      ctx.clearRect(0, 0, width, height);
      ctx.font = font();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const r of ripples) drawRipple(r);
      for (const p of pellets) {
        glyph(Math.floor(p.x / CW), Math.floor(p.y / CH), '*', COLORS.pellet, Math.min(1, (PELLET_LIFE - p.age) / 2));
      }
      for (const t of turtles) drawTurtle(t);
      for (const k of koi) drawKoi(k);
      // Bubbles sit on top: they're on their way to the surface.
      for (const b of bubbles) {
        if (b.age < 0) continue;
        const t = b.age / b.life;
        const col = Math.floor(b.x / CW);
        const row = Math.floor(b.y / CH);
        if (underPage(col, row)) continue;
        // The last moment is the pop.
        const size = Math.min(BUBBLE_GLYPHS.length - 1, Math.floor((t / 0.9) * BUBBLE_GLYPHS.length));
        const ch = t > 0.9 ? '*' : BUBBLE_GLYPHS[size];
        glyph(col, row, ch, COLORS.bubble, t > 0.9 ? 0.5 : 0.85);
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('click', onClick);
    window.addEventListener('koi:player', onPlayer);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('click', onClick);
      window.removeEventListener('koi:player', onPlayer);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return <canvas ref={canvasRef} className="koi-pond" aria-hidden="true" />;
}
