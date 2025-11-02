# Wabi-Sabi Portfolio Design

**Date:** 2025-11-02
**Design Philosophy:** Clean & minimal with subtle Japanese essence (wabi-sabi)

## Overview

Redesign portfolio with interactive flower drawing background, warm earth-tone palette, and generous use of negative space. The design celebrates imperfection and natural beauty while maintaining professionalism for a VC context.

## Design Principles

1. **Ma (Negative Space):** Generous spacing between elements, lots of breathing room
2. **Wabi-sabi:** Embrace imperfection - hand-drawn flowers, organic placement, natural materials
3. **Subtlety:** Japanese inspiration through principles, not explicit elements
4. **Discovery:** Interactive flowers as easter egg for explorers

## Color Palette

**Wabi-sabi Neutral Theme:**
- Background: `#F5F1E8` - Warm beige like handmade paper
- Text: `#2D2D2D` - Deep charcoal (softer than pure black)
- Accent: `#D97757` - Muted terracotta (primary)
- Secondary: `#9B6B4B` - Burnt umber
- Dots: `#E8DFD0` - Very light tan (subtle at rest)
- Dots hover: `#C4B8A0` - Slightly darker tan

**Flower Color Palette (HSL):**
All muted, earthy tones like natural ceramics:
- Terracotta: `15 60% 58%`
- Burnt sienna: `20 50% 50%`
- Clay: `30 45% 55%`
- Rust: `10 55% 52%`
- Warm gray-brown: `25 20% 45%`

No greens, no bright colors - only earth pigment tones.

## Typography

**Font Stack:**
- **Headings:** "Crimson Pro" or "Lora" (serif, elegant)
- **Body:** "Inter" (clean sans-serif, readable)
- **Mono accents:** "JetBrains Mono" (only for // comments)

**Rationale:** Mix of serif (warmth, sophistication) and sans-serif (clarity, modern) creates visual interest while staying minimal.

**Sizing:**
- Body: 0.8rem (keep current compact sizing)
- Name/title: text-2xl (smaller than current)
- Section headers: text-[10px] uppercase tracking-wide
- Maintain current line-height: 1.5

## Interactive Flower Background

**Component:** `DotBackground.tsx` (client-side React component)

### Dot Grid
- Spacing: 60px (creates ma/breathing room)
- Dot size: 2px diameter
- Color: Warm tan, very subtle
- Behavior: Darkens gently on mouse hover
- Coverage: Dynamic height based on content (not fixed 1000000vh)

### Click-to-Draw Interaction
1. User clicks anywhere on page (except links/buttons)
2. System finds 2 nearest dots to click position
3. Draws flower connecting those two dots
4. Flower path animates with stroke-dasharray:
   - Outer petals: 3s draw animation
   - Center: 1.5s draw animation (starts after petals)
5. Random color selected from earth-tone palette
6. Flowers persist and accumulate
7. Max 20-30 flowers to prevent crowding

### SVG Flower Paths
Use exact paths from reference:
```
Path 1 (outer petals): "M194.561 172.066C194.39 165.274..." (long path)
Path 2 (center): "M184.112 189.912C192.6 176.657..." (shorter path)
```

### Styling
- Stroke width: 6px
- Opacity: 0.4-0.5 (subtle, not overwhelming)
- Stroke color: Random from earth palette
- Positioning: Centered between two nearest dots, 120px size
- Optional: Slight blur for depth

## Layout & Structure

### Overall
- Max width: 680px (narrower than current 1024px)
- Horizontal padding: 48px desktop, 24px mobile
- Vertical spacing: 96px between sections (vs current 32px)
- Remove all section borders - let content flow naturally

### Sections
- **Hero:**
  - Name: text-2xl, left-aligned
  - Paris location: Keep prominent with accent color
  - Navigation: Remove or replace with minimal scroll position dots

- **Section Headers:**
  - Style: `// projects`, `// community`, etc.
  - Color: Terracotta accent
  - Size: text-[10px] uppercase tracking-wide
  - Less prominent than current

- **Content:**
  - Keep current compact sizing
  - Project links: Keep → arrow in terracotta
  - All text charcoal on beige background

### Vertical Flow
The design embraces scrolling and discovery. No rigid structure, just natural content flow with generous spacing.

## Technical Implementation

### Component Structure
```
app/
  layout.tsx - Update fonts and color variables
  globals.css - Update color palette
  page.tsx - Wrap content in DotBackground
components/
  DotBackground.tsx - New client component
  [existing components] - Restyle with new colors
```

### Key Changes
1. Create `DotBackground.tsx` with 'use client' directive
2. Update CSS variables in globals.css
3. Replace font imports in layout.tsx
4. Remove grid background, borders from sections
5. Adjust spacing utilities throughout
6. Update link/accent colors to terracotta

### Performance
- Dynamic height based on actual content
- Limit flower count (max 20-30)
- Use `will-change: transform` for animations
- Component is decorative, doesn't block rendering
- Graceful degradation if JS fails

### Accessibility
- Flowers are `aria-hidden` (decorative)
- Text contrast: charcoal on beige meets WCAG AA
- Keyboard navigation unaffected
- Click-to-draw doesn't interfere with interactive elements
- Screen readers ignore background

## Content Strategy

Keep all existing content, just restyle:
- All projects, experience, community info stays
- Only visual presentation changes
- Maintain current information density
- Text remains equally readable

## Implementation Notes

**Priority:** Background and color system first, then typography, then spacing refinements.

**Guiding Question:** Does this feel like natural materials - paper, clay, earth pigments? If it feels digital or plastic, adjust.

**Testing:** Click around extensively to ensure flower drawing feels delightful, not gimmicky. Adjust opacity/colors if needed.
