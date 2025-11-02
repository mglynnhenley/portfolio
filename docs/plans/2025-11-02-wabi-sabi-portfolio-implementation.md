# Wabi-Sabi Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform portfolio into wabi-sabi aesthetic with interactive flower drawing background, warm earth tones, and generous negative space.

**Architecture:** React client component for interactive background, CSS-based color system overhaul, typography updates via Next.js font system, layout spacing adjustments throughout existing components.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Google Fonts (Crimson Pro, Inter, JetBrains Mono)

**Design Reference:** `docs/plans/2025-11-02-wabi-sabi-portfolio-design.md`

---

## Task 1: Create Interactive Flower Background Component

**Files:**
- Create: `components/DotBackground.tsx`

**Step 1: Create the component file with TypeScript setup**

Create `components/DotBackground.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';

interface Flower {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  id: string;
  color: string;
}

const DotBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [lastColorIndex, setLastColorIndex] = useState(-1);
  const [contentHeight, setContentHeight] = useState(0);

  // Create a grid of dots
  const spacing = 60; // pixels between dots (ma - breathing room)

  useEffect(() => {
    // Measure actual content height
    const updateHeight = () => {
      setContentHeight(document.documentElement.scrollHeight);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const dotsX = typeof window !== 'undefined' ? Math.ceil(window.innerWidth / spacing) : 0;
  const dotsY = Math.ceil(contentHeight / spacing);

  // Generate all dot positions
  const allDots = Array.from({ length: dotsY }).flatMap((_, y) =>
    Array.from({ length: dotsX }).map((_, x) => ({
      x: x * spacing + spacing / 2,
      y: y * spacing + spacing / 2,
    }))
  );

  return <div>Placeholder</div>;
};

export default DotBackground;
```

**Step 2: Commit initial component structure**

```bash
git add components/DotBackground.tsx
git commit -m "feat: add DotBackground component structure

- Client component with TypeScript interfaces
- Dynamic height calculation
- Dot grid generation setup"
```

---

## Task 2: Implement Mouse Tracking and Click Handling

**Files:**
- Modify: `components/DotBackground.tsx`

**Step 1: Add mouse tracking effect**

In `DotBackground.tsx`, add after the `allDots` definition:

```tsx
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY + window.scrollY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
```

**Step 2: Add click-to-draw flower handler**

Add after the mouse move effect:

```tsx
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't draw flowers if clicking on interactive elements
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        return;
      }

      const clickX = e.clientX;
      const clickY = e.clientY + window.scrollY;

      // Find nearest two dots
      const distances = allDots.map((dot) => ({
        dot,
        distance: Math.sqrt(
          Math.pow(clickX - dot.x, 2) + Math.pow(clickY - dot.y, 2)
        ),
      }));

      distances.sort((a, b) => a.distance - b.distance);
      const nearestTwo = distances.slice(0, 2);

      if (nearestTwo.length === 2) {
        // Earth tone palette (terracotta, burnt sienna, clay, rust, warm gray-brown)
        const colors = [
          '15 60% 58%',  // Terracotta
          '20 50% 50%',  // Burnt sienna
          '30 45% 55%',  // Clay
          '10 55% 52%',  // Rust
          '25 20% 45%',  // Warm gray-brown
        ];

        // Get a different color from the last one
        let colorIndex = Math.floor(Math.random() * colors.length);
        while (colorIndex === lastColorIndex && colors.length > 1) {
          colorIndex = Math.floor(Math.random() * colors.length);
        }
        setLastColorIndex(colorIndex);

        const newFlower: Flower = {
          x1: nearestTwo[0].dot.x,
          y1: nearestTwo[0].dot.y,
          x2: nearestTwo[1].dot.x,
          y2: nearestTwo[1].dot.y,
          id: `flower-${Date.now()}-${Math.random()}`,
          color: colors[colorIndex],
        };

        // Limit to 30 flowers max
        setFlowers((prev) => {
          const updated = [...prev, newFlower];
          return updated.slice(-30);
        });
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [allDots, lastColorIndex]);
```

**Step 3: Commit click handling**

```bash
git add components/DotBackground.tsx
git commit -m "feat: add mouse tracking and click-to-draw flowers

- Track mouse position for dot hover effect
- Find 2 nearest dots on click
- Create flower with random earth tone color
- Limit to 30 flowers max
- Skip clicks on interactive elements"
```

---

## Task 3: Implement Dot Rendering with Hover Effect

**Files:**
- Modify: `components/DotBackground.tsx`

**Step 1: Add opacity calculation function**

Add before the return statement:

```tsx
  const getOpacity = (dotX: number, dotY: number) => {
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - dotX, 2) + Math.pow(mousePosition.y - dotY, 2)
    );

    // Darken dots within 200px of cursor
    if (distance < 200) {
      return 0.3 - (distance / 200) * 0.2; // Fade from 0.3 to 0.1
    }
    return 0.1; // Subtle default
  };
```

**Step 2: Render dots**

Replace the return statement:

```tsx
  return (
    <>
      {/* Dot grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ height: `${contentHeight}px` }}
      >
        {allDots.map((dot, index) => {
          const dotX = dot.x;
          const dotY = dot.y;

          return (
            <div
              key={index}
              className="absolute w-[2px] h-[2px] rounded-full transition-opacity duration-100"
              style={{
                left: `${dotX}px`,
                top: `${dotY}px`,
                backgroundColor: '#E8DFD0', // Warm tan
                opacity: getOpacity(dotX, dotY),
              }}
            />
          );
        })}
      </div>
    </>
  );
```

**Step 3: Verify dots render**

Run: `npm run dev`
Open browser, should see subtle tan dots that darken near cursor.

**Step 4: Commit dot rendering**

```bash
git add components/DotBackground.tsx
git commit -m "feat: render dot grid with hover effect

- 60px spacing creates breathing room (ma)
- Warm tan color (#E8DFD0)
- Dots darken within 200px of cursor
- Smooth transition on opacity change"
```

---

## Task 4: Implement Flower SVG Rendering

**Files:**
- Modify: `components/DotBackground.tsx`
- Create: `app/globals.css` (add keyframes)

**Step 1: Add flower path data function**

Add before the `getOpacity` function:

```tsx
  const getFlowerPaths = (): string[] => {
    return [
      "M194.561 172.066C194.39 165.274 191.224 159.06 190.272 152.428C187.778 135.048 192.416 79 222.867 79C254.454 79 222.191 153.804 214.289 168.224C213.54 169.59 207.105 178.256 207.856 179.751C208.171 180.378 210.766 176.442 210.858 176.335C213.943 172.753 217.663 169.273 221.151 166.089C230.669 157.404 290.522 104.164 304.173 138.828C309.447 152.221 295.309 166.055 285.053 173.346C274.369 180.944 260.012 182.81 248.17 187.862C243.33 189.927 238.546 191.34 233.589 192.984C232.205 193.444 229.299 192.387 229.299 193.838C229.299 194.068 235.556 191.642 242.166 189.996C252.831 187.342 294.948 188.367 309.029 199.539C323.11 210.711 323.11 220.567 314.115 227.815C292.968 244.852 269.869 230.996 249.456 222.869C244.404 220.856 238.952 220.628 234.018 218.172C233.695 218.012 227.584 214.89 227.584 216.038C227.584 216.866 240.093 217.911 246.884 222.869C266.359 237.084 292.99 293.533 271.33 306.97C248.201 321.317 215.721 259.162 213.432 252.325C212.241 248.769 212.86 245.213 212.144 241.652C211.825 240.061 210.858 235.334 210.858 236.956C210.858 258.26 215.82 296.531 200.993 312.519C191.65 322.594 174.602 324.561 169.686 308.25C165.09 293.002 167.371 268.629 173.546 254.032C175.734 248.859 185.593 236.645 185.126 235.249C184.51 233.41 180.535 239.355 180.407 239.518C175.881 245.312 170.736 251.147 164.968 255.74C160.052 259.655 153.949 261.815 148.67 265.132C135.158 273.627 112.486 288.638 99.3499 269.401C87.6893 252.325 132.478 218.151 153.818 213.903C159.742 212.724 167.013 210.473 173.117 211.342C174.953 211.603 174.028 211.554 174.832 212.622C179.251 218.486 149.21 216.764 146.955 216.465C126.118 213.699 78.2339 218.479 80.0503 189.569C82.0596 157.587 140.921 177.18 148.67 179.751C161.297 183.94 171.873 191.59 163.681 186.154C150.126 177.157 90.4948 126.565 123.69 100.059C146.918 81.5127 192.416 164.979 192.416 175.482",
      "M184.112 189.912C192.6 176.657 209.525 178.684 221.315 185.651C240.625 197.063 220.283 235.269 191.033 231.669C164.743 228.432 168.065 185.664 194.061 177.13"
    ];
  };
```

**Step 2: Add flower render function**

Add after `getFlowerPaths`:

```tsx
  const renderFlower = (flower: Flower) => {
    const centerX = (flower.x1 + flower.x2) / 2;
    const centerY = (flower.y1 + flower.y2) / 2;
    const size = 120;
    const paths = getFlowerPaths();

    return (
      <g key={flower.id} transform={`translate(${centerX - size / 2}, ${centerY - size / 2})`}>
        <svg width={size} height={size} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
          {paths.map((pathData, index) => (
            <path
              key={index}
              d={pathData}
              fill="none"
              stroke={`hsl(${flower.color})`}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.45}
              style={{
                strokeDasharray: index === 0 ? '2500' : '500',
                strokeDashoffset: index === 0 ? '2500' : '500',
                animation: `drawPath ${index === 0 ? '3s' : '1.5s'} ease-out ${index === 0 ? '0s' : '3s'} forwards`
              }}
            />
          ))}
        </svg>
      </g>
    );
  };
```

**Step 3: Add SVG overlay to return statement**

Update the return to include flowers:

```tsx
  return (
    <>
      {/* Dot grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ height: `${contentHeight}px` }}
      >
        {allDots.map((dot, index) => {
          const dotX = dot.x;
          const dotY = dot.y;

          return (
            <div
              key={index}
              className="absolute w-[2px] h-[2px] rounded-full transition-opacity duration-100"
              style={{
                left: `${dotX}px`,
                top: `${dotY}px`,
                backgroundColor: '#E8DFD0',
                opacity: getOpacity(dotX, dotY),
              }}
            />
          );
        })}
      </div>

      {/* SVG overlay for flowers */}
      <svg
        className="fixed inset-0 pointer-events-none z-0 w-full"
        style={{ height: `${contentHeight}px` }}
      >
        {flowers.map((flower) => renderFlower(flower))}
      </svg>
    </>
  );
```

**Step 4: Add animation keyframes to globals.css**

Add to `app/globals.css` after existing keyframes:

```css
@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}
```

**Step 5: Test flower drawing**

Run: `npm run dev`
Click around page - should draw flowers connecting nearest dots with animation.

**Step 6: Commit flower rendering**

```bash
git add components/DotBackground.tsx app/globals.css
git commit -m "feat: add flower SVG rendering with animation

- Use exact SVG paths from design
- Outer petals draw over 3s
- Center draws over 1.5s
- Random earth tone colors
- 45% opacity for subtlety
- CSS animation for stroke drawing"
```

---

## Task 5: Update Color System

**Files:**
- Modify: `app/globals.css`

**Step 1: Replace color variables**

In `app/globals.css`, replace the color variables in `@theme inline`:

```css
@theme inline {
  --color-background: #F5F1E8;
  --color-foreground: #2D2D2D;
  --color-accent-primary: #D97757;
  --color-accent-secondary: #9B6B4B;
  --color-muted: #6B5D52;
  --color-grid-line: #E8DFD0;
  --color-grid-line-hover: #C4B8A0;

  --color-background-light: #F5F1E8;
  --color-foreground-light: #2D2D2D;
  --color-accent-primary-light: #D97757;
  --color-accent-secondary-light: #9B6B4B;
  --color-muted-light: #6B5D52;
  --color-grid-line-light: #E8DFD0;
  --color-grid-line-hover-light: #C4B8A0;

  /* Keep existing font variables */
  --font-heading: var(--font-courier-prime);
  --font-body: var(--font-jetbrains-mono);
  --font-mono: var(--font-anonymous-pro);

  --animate-fade-in: fadeIn 0.6s ease-out forwards;
}
```

**Step 2: Remove background gradient, use solid color**

Replace the body styles:

```css
body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-body), monospace;
  font-size: 1rem;
  line-height: 1.6;
}

body.light {
  background-color: var(--color-background-light);
  color: var(--color-foreground-light);
}
```

**Step 3: Test color changes**

Run: `npm run dev`
Should see warm beige background, charcoal text, terracotta accents.

**Step 4: Commit color system**

```bash
git add app/globals.css
git commit -m "feat: update to wabi-sabi earth tone palette

- Warm beige background (#F5F1E8)
- Deep charcoal text (#2D2D2D)
- Muted terracotta accent (#D97757)
- Burnt umber secondary (#9B6B4B)
- Remove gradient backgrounds
- Clean, minimal color system"
```

---

## Task 6: Update Typography

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Replace font imports**

In `app/layout.tsx`, replace the imports and font definitions:

```tsx
import type { Metadata } from "next";
import { Crimson_Pro, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
```

**Step 2: Update HTML className**

Update the return statement:

```tsx
  return (
    <html lang="en" className={`${crimsonPro.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
```

**Step 3: Update CSS font variables**

In `app/globals.css`, update the font variables:

```css
  --font-heading: var(--font-crimson-pro);
  --font-body: var(--font-inter);
  --font-mono: var(--font-jetbrains-mono);
```

**Step 4: Test typography**

Run: `npm run dev`
Headings should be serif (Crimson Pro), body sans-serif (Inter).

**Step 5: Commit typography update**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: update typography to serif/sans mix

- Crimson Pro for headings (serif, elegant)
- Inter for body (sans-serif, readable)
- JetBrains Mono for code accents
- Creates visual interest while staying minimal"
```

---

## Task 7: Integrate Background Component

**Files:**
- Modify: `app/page.tsx`

**Step 1: Import DotBackground**

At top of `app/page.tsx`, add import:

```tsx
import DotBackground from '@/components/DotBackground';
```

**Step 2: Wrap content in background**

Update the return statement:

```tsx
  return (
    <>
      <DotBackground />
      <main className="relative z-10 min-h-screen">
        <ThemeToggle />
        <Hero name={personalInfo.name} title={personalInfo.title} />
        <About bio={personalInfo.bio} />
        <Projects projects={currentProjects} />
        <Community communities={communities} />
        <Hackathons hackathons={hackathons} />
        <Experience experiences={experiences} />
        <Events events={pastEvents} />
        <Footer />
      </main>
    </>
  );
```

**Step 3: Test integration**

Run: `npm run dev`
Should see dots and be able to draw flowers throughout the page.

**Step 4: Commit integration**

```bash
git add app/page.tsx
git commit -m "feat: integrate interactive dot background

- Add DotBackground component to page
- Content positioned relative with z-10
- Background fixed at z-0
- Flowers drawable throughout scroll"
```

---

## Task 8: Update Layout Spacing

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `components/About.tsx`
- Modify: `components/Projects.tsx`
- Modify: `components/Community.tsx`
- Modify: `components/Hackathons.tsx`
- Modify: `components/Experience.tsx`
- Modify: `components/Events.tsx`

**Step 1: Update Hero spacing and sizing**

In `components/Hero.tsx`, update section className and content:

```tsx
export default function Hero({ name, title }: HeroProps) {
  return (
    <section className="max-w-[680px] px-12 pt-16 pb-12 animate-fade-in">
      <p className="text-muted text-xs mb-6 font-mono">
        currently living in{' '}
        <span className="text-accent-primary font-bold">paris</span>
        {' '}at{' '}
        <a
          href="https://joinpluto.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-secondary hover:text-accent-primary transition-colors underline"
        >
          pluto hacker house
        </a>
      </p>

      <h1 className="text-2xl font-bold mb-2 tracking-tight">{name}</h1>
      <p className="text-muted text-base mb-12">{title}</p>

      {/* Remove or keep minimal nav - your choice */}
    </section>
  );
}
```

**Step 2: Update About spacing**

In `components/About.tsx`:

```tsx
    <section
      id="about"
      className="max-w-[680px] px-12 py-12 animate-fade-in animate-delay-150"
    >
      <h2 className="font-mono text-accent-secondary mb-6 text-[10px] uppercase tracking-wide">
        // a bit about me
      </h2>
      <div className="space-y-3 text-muted leading-relaxed">
        {bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
```

**Step 3: Update all section spacing**

For Projects, Community, Hackathons, Experience, Events - update to:
- `max-w-[680px]` (narrower)
- `px-12` (more horizontal padding)
- `py-24` (generous vertical spacing between sections)
- Section headers: `text-[10px] uppercase tracking-wide`
- Remove all `border-t border-grid-line`

Example for Projects:

```tsx
    <section
      id="projects"
      className="max-w-[680px] px-12 py-24 animate-fade-in animate-delay-300"
    >
      <h2 className="font-mono text-accent-secondary mb-6 text-[10px] uppercase tracking-wide">
        // current projects
      </h2>
      {/* rest stays same */}
    </section>
```

**Step 4: Test spacing**

Run: `npm run dev`
Should see much more vertical breathing room, narrower content column.

**Step 5: Commit spacing updates**

```bash
git add components/*.tsx
git commit -m "feat: update layout with generous spacing (ma)

- Narrow content to 680px max width
- Increase horizontal padding to 48px
- Increase vertical spacing to 96px between sections
- Remove all section borders
- Smaller section headers (10px uppercase)
- Embrace negative space"
```

---

## Task 9: Remove Theme Toggle (Optional)

**Files:**
- Modify: `app/page.tsx`
- Delete: `components/ThemeToggle.tsx` (optional)

**Step 1: Remove ThemeToggle from page**

In `app/page.tsx`, remove the import and component:

```tsx
// Remove: import ThemeToggle from '@/components/ThemeToggle';

  return (
    <>
      <DotBackground />
      <main className="relative z-10 min-h-screen">
        {/* Remove: <ThemeToggle /> */}
        <Hero name={personalInfo.name} title={personalInfo.title} />
        {/* rest stays */}
      </main>
    </>
  );
```

**Step 2: Test without toggle**

Run: `npm run dev`
Design should work with single light theme.

**Step 3: Commit theme toggle removal**

```bash
git add app/page.tsx
git commit -m "feat: remove theme toggle for single wabi-sabi theme

- Light theme only (warm beige)
- Simplifies UI
- Consistent aesthetic"
```

---

## Task 10: Visual Refinement and Testing

**Step 1: Test all interactions**

Manual testing checklist:
- [ ] Dots visible and subtle
- [ ] Dots darken on hover smoothly
- [ ] Clicking draws flowers between nearest 2 dots
- [ ] Flowers animate in (outer petals then center)
- [ ] Flower colors vary in earth tones
- [ ] Max 30 flowers enforced
- [ ] Links still clickable (don't draw flowers)
- [ ] Scroll works throughout page
- [ ] Responsive on mobile

**Step 2: Adjust if needed**

Common adjustments:
- Flower opacity: Change opacity in `renderFlower` (currently 0.45)
- Dot spacing: Change `spacing` variable (currently 60)
- Colors: Adjust in color array or CSS variables
- Spacing: Tweak py-24, px-12 values

**Step 3: Final commit**

```bash
git add -A
git commit -m "refine: adjust flower opacity and spacing

[Describe any tweaks made during testing]"
```

---

## Task 11: Deploy to Vercel

**Step 1: Push to main**

```bash
git push origin main
```

**Step 2: Deploy**

```bash
vercel --prod --yes
```

**Step 3: Test production**

Visit deployed URL, verify:
- Flowers draw correctly
- Colors look correct
- Performance is good
- No console errors

**Step 4: Celebrate**

Beautiful wabi-sabi portfolio is live! 🌸

---

## Notes

- If flowers feel too busy: Reduce opacity to 0.3 or limit to 20 max
- If dots too visible: Reduce default opacity from 0.1 to 0.05
- If spacing too tight: Increase py-24 to py-32
- Reference design doc for color values: `docs/plans/2025-11-02-wabi-sabi-portfolio-design.md`

## Principles Applied

- **DRY:** Reusable flower render function, color palette array
- **YAGNI:** No unnecessary features, removed theme toggle
- **TDD Adapted:** Visual testing at each stage
- **Frequent commits:** Each significant change committed
- **Zero context:** All file paths, complete code, exact commands provided
