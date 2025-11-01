# Portfolio Website Design Document

**Date:** November 1, 2025
**Author:** Matilda Glynn-Henley
**Purpose:** Professional portfolio for job seeking, targeting recruiters and hiring managers

## Overview

A Next.js-based portfolio website with a distinctive dark theme, criss-cross grid background, and sophisticated typography. The site uses a content module architecture for easy updates without touching component code.

## Design Principles

Following the aesthetic guidelines in `.claude/claude.md`:
- **Distinctive typography**: Fraunces, Newsreader, JetBrains Mono (avoiding generic fonts)
- **Bold color accents**: Vibrant pink (#ff6188) and fresh green (#a9dc76) on deep black
- **Atmospheric backgrounds**: Criss-cross grid pattern instead of gradients
- **Orchestrated motion**: Staggered page load animations, high-impact moments
- **Creative layouts**: Asymmetric cards, breaking grid conventions

## Technical Architecture

### Stack
- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS with custom dark theme
- **Fonts**: Google Fonts (Fraunces, Newsreader, JetBrains Mono)
- **Deployment**: Vercel with static export
- **Language**: TypeScript

### Project Structure
```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with dark theme
│   ├── page.tsx            # Home page with all sections
│   └── globals.css         # Tailwind + custom grid background
├── components/
│   ├── Hero.tsx            # Name, title, navigation
│   ├── About.tsx           # Bio section
│   ├── Projects.tsx        # Current/past projects
│   ├── Experience.tsx      # Work history cards
│   ├── Hackathons.tsx      # Hackathon projects
│   └── Events.tsx          # Hosted events
├── data/
│   ├── content.ts          # All content as typed objects
│   └── types.ts            # TypeScript interfaces
└── tailwind.config.ts      # Dark theme configuration
```

## Visual Design

### Color Palette
```typescript
background: '#0d0d0d'           // Deep black
foreground: '#f8f8f2'           // Warm white
accent-primary: '#ff6188'       // Vibrant pink for highlights
accent-secondary: '#a9dc76'     // Fresh green for links/CTAs
muted: '#939293'                // Mid-tone gray
grid-line: '#1a1a1a'            // Subtle grid lines
```

### Typography
- **Headings**: Fraunces (display serif with optical sizing)
- **Body**: Newsreader (elegant serif for readability)
- **Accent/Code**: JetBrains Mono (for `//` prefixes, technical elements)
- **Line height**: 1.7 for body text
- **Hierarchy**: Clear weight differences, optimal line length (65-75 chars)

### Background - Criss-Cross Grid
- Base: Solid deep black (#0d0d0d)
- Grid: Horizontal and vertical lines using CSS linear-gradient
- Line color: #1a1a1a (subtle contrast)
- Grid spacing: 40-60px for technical/blueprint aesthetic
- Performance: CSS-only, no image files

### Motion & Animations
- **Page load**: Staggered reveal for sections (0s, 0.15s, 0.3s animation-delay)
- **Navigation**: Scale + color shift on hover
- **Cards**: Lift effect with pink border glow on hover
- **Scroll**: Smooth scroll with easing for anchor navigation
- All CSS-only animations (no JavaScript libraries)

### Layout Approach
- **Single-page application**: All sections on one scrollable page
- **Asymmetric spacing**: Intentionally breaking grid alignment
- **Varied card widths**: Projects in non-uniform cards
- **Responsive**:
  - Mobile: Single column, simplified grid
  - Tablet: 2-column for projects
  - Desktop: Full asymmetric layout

## Content Architecture

### Data Structure
Content separated into TypeScript modules in `/data`:

```typescript
// data/types.ts
export interface Project {
  title: string;
  description: string;
  link?: string;
  tags?: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

// data/content.ts
export const personalInfo = { ... }
export const currentProjects: Project[] = [ ... ]
export const pastProjects: Project[] = [ ... ]
export const experiences: Experience[] = [ ... ]
export const hackathons: Project[] = [ ... ]
export const events: Event[] = [ ... ]
```

### Sections
1. **Hero**: Name, title ("investor @ merantix"), navigation links
2. **About**: Bio paragraphs, email contact
3. **Projects**: Current/past subsections with varied layouts
4. **Hackathons**: Clean list with links
5. **Experience**: Timeline-style cards with hover effects
6. **Events**: Hosted events list
7. **Footer**: Copyright

## Component Design

### Hero Component
- Large name display (Fraunces font)
- Role/title
- Horizontal navigation (stuff on the side, hackathons, events, experience)
- First element in stagger animation

### About Component
- Section header with `//` prefix (JetBrains Mono)
- Bio paragraphs with generous line-height
- Email with hover effect

### Projects Component
- Subsections: "current" and "past"
- Asymmetric card layout (varied widths)
- External links with hover effects
- Tags/technologies if applicable
- Pink glow on hover

### Experience Component
- Cards with company/role/period
- Description with key achievements
- Hover: scale + border highlight
- Responsive stacking

### Navigation Behavior
- Smooth scroll to sections
- Active section indicator (subtle accent)
- Sticky or shrinking hero on scroll

## Performance Strategy

### Optimizations
- Static export (`output: 'export'`)
- CSS-only animations
- Font subsetting (load only used characters)
- Minimal JavaScript bundle
- Grid background as CSS pattern (not image)
- Target: < 50KB initial bundle, < 1s load time

### SEO
- Meta tags (title, description, Open Graph)
- Structured data for professional profile
- Sitemap generation
- robots.txt

## Deployment

### Vercel Configuration
- Auto-deployment from git push to main
- Preview deployments for branches
- Custom domain setup (if available)
- Built-in analytics (optional)
- Edge network for global performance

### Environment
- Static site (no server-side rendering needed)
- No environment variables required initially
- Can add serverless functions later (contact form)

## Future Extensibility

- Blog integration (MDX support)
- CMS integration for content (Sanity, Contentful)
- Analytics (Vercel Analytics, Plausible)
- Contact form with serverless function
- Project case studies (detailed pages)

## Accessibility

- Semantic HTML (proper heading hierarchy)
- ARIA labels for navigation
- Keyboard navigation support
- Color contrast compliance (pink/green on dark background)
- Focus indicators for interactive elements

## Success Criteria

1. **Visual Impact**: Distinctive design that stands out from generic portfolios
2. **Readability**: Clean typography, comfortable reading experience
3. **Performance**: Fast load times (< 1s), minimal bundle size
4. **Maintainability**: Easy content updates without touching components
5. **Professional**: Attracts recruiters, showcases technical skills
6. **Mobile-friendly**: Excellent experience on all devices
