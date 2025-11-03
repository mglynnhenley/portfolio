# Portfolio Redesign: Swiss Modernist Aesthetic

**Date:** 2025-11-03
**Style:** Brutalist Grid / Swiss Modernist
**Approach:** Text-forward, restrained palette, geometric precision

---

## Design Philosophy

Create a professional portfolio with Swiss modernist principles: rational structure, restrained color, generous whitespace, and geometric precision. Avoid generic AI aesthetics through commitment to a specific visual language. The interactive flower element provides organic contrast to the geometric grid - human touch against rational structure.

---

## Color System

### Palette
- **Background:** `#FAF9F6` (off-white, warm cream)
- **Primary Text:** `#1B263B` (deep navy)
- **Accent:** `#FF6B35` (vibrant orange)
- **Grid Dots:** `#1B263B` at 15% opacity

### Application
- **Headings:** Orange (`#FF6B35`)
- **Body text:** Navy (`#1B263B`)
- **Links:** Navy default, orange on hover
- **Flowers:** Navy (`#1B263B`) at 30% opacity
- **Section dividers:** Navy at 10% opacity

**Rationale:** Duotone system (navy + orange) with off-white base. Orange is reserved for hierarchical elements (headings, accents) creating strong scanability. Navy flowers maintain restraint.

---

## Typography

### Fonts
- **Headings:** DM Sans (geometric sans-serif)
  - Bold weight (700)
  - Large scale: 2.5-3rem for name
  - Section headers: 0.75rem uppercase, letter-spacing 0.1em
  - Color: Orange

- **Body:** JetBrains Mono (monospace)
  - Regular weight (400)
  - Size: 0.95rem
  - Line height: 1.7
  - Color: Navy

### Hierarchy
The contrast between geometric sans headings and technical mono body creates a distinctive hybrid: Swiss precision meets developer portfolio.

---

## Grid & Spatial System

### Grid Structure
- **Dot spacing:** 100px (sparse, subtle rhythm)
- **Dot size:** 2px diameter
- **Dot opacity:** 15% default, 25% on hover within 120px radius
- **Dot color:** Navy

### Layout
- **Max width:** 900px
- **Side padding:** 80px desktop
- **Section spacing:** 120px vertical
- **Top margin:** 160px (confident opening)

### Spacing Scale
- Section to content: 32px
- List items: 24px
- Line height (lists): 16px (tighter for density)

**Rationale:** Grid is structural guide, not dominant feature. Sparse dots (100px spacing) create rhythm without competing with typography. Generous whitespace is core to Swiss aesthetic.

---

## Interactive Flowers

### Behavior
- **Trigger:** Click anywhere (excluding links/buttons)
- **Mechanics:** Finds 2 nearest grid dots, draws flower between them
- **Color:** Navy only (`#1B263B`) at 30% opacity
- **Limit:** Unlimited accumulation
- **Positioning:** Absolute (scrolls with page)

### Visual Treatment
- Organic SVG paths (existing flower design)
- Stroke width: 4px
- Draw-in animation: 3s main path, 1.5s center
- No initial flowers (clean slate)

### Discovery
- No hint/tooltip (anti-hand-holding)
- Natural discovery through interaction
- Delight for those who find it, not required

**Rationale:** Organic curves against geometric grid creates Swiss-style tension. Navy-only maintains restraint. Low opacity allows layering without overwhelming content.

---

## Animation & Motion

### Page Load
- Staggered fade-in with delays: 0ms, 200ms, 300ms, 450ms, 600ms
- Simple fade-up (10px translate)
- Understated, not showy

### Interactions
- **Links:** Instant color change (navy → orange), no transitions
- **Grid hover:** 200ms opacity ease
- **Flowers:** Existing stroke-dasharray draw animation

**Rationale:** Motion is minimal and functional. Swiss design values clarity over spectacle. No bounces, springs, or decorative flourishes.

---

## Component Details

### Section Headers
- Format: `// section name` (lowercase with code-like prefix)
- Style: Orange, DM Sans, 0.75rem uppercase, wide letter-spacing
- Technical/editorial hybrid

### Navigation
- Horizontal list, monospace
- Navy default, orange hover
- Functional anchors, no decoration

### Borders
- 1px solid navy at 10% opacity
- Clean breaks, not ornamental

### Exclusions
- No badges, tags, ornaments
- No decorative icons
- Typography and whitespace do the work

---

## Key Principles

1. **Text-forward:** Content dominates, grid supports
2. **Restrained palette:** Navy + orange only, no gradients
3. **Generous whitespace:** Confidence through breathing room
4. **Geometric precision:** Grid-based, rational structure
5. **Organic contrast:** Flowers provide human touch
6. **Minimal motion:** Functional, not decorative
7. **No hand-holding:** Let users discover interactions

---

## Success Criteria

- Looks professional and distinctive (not generic AI slop)
- Clear visual hierarchy through color and scale
- Swiss modernist aesthetic is evident
- Interactive element is delightful but not gimmicky
- Works at all viewport sizes
- Fast, no performance issues with unlimited flowers
