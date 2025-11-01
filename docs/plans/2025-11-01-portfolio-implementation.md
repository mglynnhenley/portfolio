# Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a distinctive Next.js portfolio website with criss-cross grid background, sophisticated typography, and content module architecture.

**Architecture:** Next.js 14 App Router with static export, TypeScript content modules for easy updates, Tailwind CSS with custom dark theme and CSS grid background, all components receiving props from centralized data.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, Google Fonts (Fraunces, Newsreader, JetBrains Mono), Vercel deployment

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json` (will be overwritten)
- Create: `.gitignore`
- Create: `tsconfig.json`

**Step 1: Initialize Next.js with TypeScript**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

Answer prompts:
- Would you like to use ESLint? **Yes**
- Would you like to customize the default import alias? **No**

Expected: Next.js project created with App Router, TypeScript, Tailwind

**Step 2: Install dependencies**

Run:
```bash
npm install
```

Expected: Dependencies installed successfully

**Step 3: Verify setup**

Run:
```bash
npm run dev
```

Expected: Dev server starts on http://localhost:3000

**Step 4: Stop dev server and commit**

Run:
```bash
# Ctrl+C to stop server
git init
git add .
git commit -m "feat: initialize Next.js project with TypeScript and Tailwind"
```

---

## Task 2: Configure Tailwind Theme

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

**Step 1: Configure custom dark theme in Tailwind**

Edit `tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d0d0d',
        foreground: '#f8f8f2',
        'accent-primary': '#ff6188',
        'accent-secondary': '#a9dc76',
        muted: '#939293',
        'grid-line': '#1a1a1a',
      },
      fontFamily: {
        heading: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-newsreader)', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 2: Create grid background in globals.css**

Edit `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-foreground font-body;
    background-image:
      linear-gradient(to right, #1a1a1a 1px, transparent 1px),
      linear-gradient(to bottom, #1a1a1a 1px, transparent 1px);
    background-size: 60px 60px;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}

@layer utilities {
  .animate-delay-150 {
    animation-delay: 150ms;
  }

  .animate-delay-300 {
    animation-delay: 300ms;
  }

  .animate-delay-450 {
    animation-delay: 450ms;
  }

  .animate-delay-600 {
    animation-delay: 600ms;
  }

  .animate-delay-750 {
    animation-delay: 750ms;
  }
}
```

**Step 3: Commit**

Run:
```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: configure custom dark theme with grid background"
```

---

## Task 3: Setup Google Fonts

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Configure Google Fonts in layout**

Edit `app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import { Fraunces, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matilda Glynn-Henley | Investor @ Merantix",
  description: "Pre-seed VC at Merantix Capital investing at the AI Application layer. Previously founded Parlia AI, software engineer, studied CS at Oxford.",
  openGraph: {
    title: "Matilda Glynn-Henley",
    description: "Investor @ Merantix Capital",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Step 2: Commit**

Run:
```bash
git add app/layout.tsx
git commit -m "feat: setup Google Fonts (Fraunces, Newsreader, JetBrains Mono)"
```

---

## Task 4: Create Data Types

**Files:**
- Create: `data/types.ts`

**Step 1: Define TypeScript interfaces**

Create `data/types.ts`:
```typescript
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

export interface Event {
  title: string;
  link?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  bio: string[];
}
```

**Step 2: Commit**

Run:
```bash
git add data/types.ts
git commit -m "feat: define data types for content"
```

---

## Task 5: Create Content Data

**Files:**
- Create: `data/content.ts`

**Step 1: Create content module with all data**

Create `data/content.ts`:
```typescript
import { PersonalInfo, Project, Experience, Event } from './types';

export const personalInfo: PersonalInfo = {
  name: "matilda glynn-henley",
  title: "investor @ merantix",
  email: "matilda @ merantix dot com",
  bio: [
    "I'm a pre-seed VC at Merantix Capital where we invest at the AI Application layer (check it out here). Previously I founded a company using AI to solve the housing crisis and was a software engineer. I studied CS at Oxford.",
    "If you are building something cool my (work) email is matilda @ merantix dot com."
  ]
};

export const currentProjects: Project[] = [
  {
    title: "threecourses.xyz",
    description: "VC backed invite only community of technical women working in startups in London",
    link: "https://threecourses.xyz"
  },
  {
    title: "OnFabric MCP",
    description: "Building agentic generative interface on top of OnFabric MCP"
  },
  {
    title: "highlighting knowledge project",
    description: "personal knowledge graph based on what you read",
    link: "https://github.com"
  },
  {
    title: "blue dot impact course",
    description: "blue dot impact course"
  }
];

export const pastProjects: Project[] = [
  {
    title: "START Berlin Female Mentorship",
    description: "connecting 15 founders and VCs to female students"
  },
  {
    title: "public affairs newsletter",
    description: "public affairs newsletter"
  },
  {
    title: "data visualisation",
    description: "data visualisation"
  },
  {
    title: "oxford hack project",
    description: "oxford hack project"
  }
];

export const hackathons: Project[] = [
  {
    title: "project lovable",
    link: "https://github.com"
  },
  {
    title: "ef x eleven labs",
    link: "https://github.com"
  },
  {
    title: "AI Find",
    link: "https://github.com"
  },
  {
    title: "chatbots aren't dead",
    link: "https://github.com"
  }
];

export const experiences: Experience[] = [
  {
    title: "Founding Investor",
    company: "Merantix Capital",
    period: "April 2025 - Present",
    description: "Sourced and closed €6M+ across pre-seed AI startups; built internal AI evaluation tools"
  },
  {
    title: "Founder",
    company: "Parlia AI",
    period: "March 2024 - 2025",
    description: "AI planning policy tool; YC interview stage, secured EXIST funding"
  },
  {
    title: "Software Developer",
    company: "Fine Legal",
    period: "Nov 2023 – April 2024",
    description: "Built customer-facing features (React/TypeScript, Java)"
  },
  {
    title: "Previous Roles",
    company: "Softwire, GCHQ",
    period: "2022 - 2023",
    description: "Softwire (Software Dev Intern), GCHQ (Cyber Security Intern)"
  }
];

export const pastEvents: Event[] = [
  {
    title: "AI Open Source",
    link: "https://lu.ma"
  },
  {
    title: "Modelling Molecules",
    link: "https://lu.ma"
  },
  {
    title: "builders and co",
    link: "https://lu.ma"
  }
];
```

**Step 2: Commit**

Run:
```bash
git add data/content.ts
git commit -m "feat: add content data for portfolio"
```

---

## Task 6: Create Hero Component

**Files:**
- Create: `components/Hero.tsx`

**Step 1: Create Hero component**

Create `components/Hero.tsx`:
```typescript
interface HeroProps {
  name: string;
  title: string;
}

export default function Hero({ name, title }: HeroProps) {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-20 pb-8 animate-fade-in">
      <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">{name}</h1>
      <p className="text-muted text-lg md:text-xl">{title}</p>

      <nav className="flex flex-wrap gap-6 mt-12 font-mono text-sm md:text-base">
        <a
          href="#projects"
          className="underline hover:text-accent-primary transition-colors"
        >
          stuff on the side
        </a>
        <a
          href="#hackathons"
          className="underline hover:text-accent-primary transition-colors"
        >
          hackathons
        </a>
        <a
          href="#events"
          className="underline hover:text-accent-primary transition-colors"
        >
          events i've hosted
        </a>
        <a
          href="#experience"
          className="underline hover:text-accent-primary transition-colors"
        >
          things i've done
        </a>
      </nav>
    </section>
  );
}
```

**Step 2: Commit**

Run:
```bash
git add components/Hero.tsx
git commit -m "feat: create Hero component with navigation"
```

---

## Task 7: Create About Component

**Files:**
- Create: `components/About.tsx`

**Step 1: Create About component**

Create `components/About.tsx`:
```typescript
interface AboutProps {
  bio: string[];
}

export default function About({ bio }: AboutProps) {
  return (
    <section
      id="about"
      className="max-w-4xl mx-auto px-6 py-8 animate-fade-in animate-delay-150"
    >
      <h2 className="font-mono text-accent-secondary mb-6 text-sm md:text-base">
        // a bit about me
      </h2>
      <div className="space-y-4 text-muted leading-relaxed">
        {bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
```

**Step 2: Commit**

Run:
```bash
git add components/About.tsx
git commit -m "feat: create About component"
```

---

## Task 8: Create Projects Component

**Files:**
- Create: `components/Projects.tsx`

**Step 1: Create Projects component**

Create `components/Projects.tsx`:
```typescript
import { Project } from '@/data/types';

interface ProjectsProps {
  current: Project[];
  past: Project[];
}

export default function Projects({ current, past }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="max-w-4xl mx-auto px-6 py-16 border-t border-grid-line animate-fade-in animate-delay-300"
    >
      <h2 className="font-mono text-accent-secondary mb-8 text-sm md:text-base">
        // stuff on the side
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="font-semibold mb-3 text-foreground">current</h3>
          <ul className="space-y-2.5">
            {current.map((project, index) => (
              <li key={index} className="text-muted leading-relaxed">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-accent-primary transition-colors"
                  >
                    {project.title}
                  </a>
                ) : (
                  <span className="font-medium">{project.title}</span>
                )}
                {' — '}
                {project.description}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-foreground">past</h3>
          <ul className="space-y-2.5">
            {past.map((project, index) => (
              <li key={index} className="text-muted leading-relaxed">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-accent-primary transition-colors"
                  >
                    {project.title}
                  </a>
                ) : (
                  <span>{project.title}</span>
                )}
                {project.description && ` — ${project.description}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

Run:
```bash
git add components/Projects.tsx
git commit -m "feat: create Projects component with current/past sections"
```

---

## Task 9: Create Hackathons Component

**Files:**
- Create: `components/Hackathons.tsx`

**Step 1: Create Hackathons component**

Create `components/Hackathons.tsx`:
```typescript
import { Project } from '@/data/types';

interface HackathonsProps {
  hackathons: Project[];
}

export default function Hackathons({ hackathons }: HackathonsProps) {
  return (
    <section
      id="hackathons"
      className="max-w-4xl mx-auto px-6 py-16 border-t border-grid-line animate-fade-in animate-delay-450"
    >
      <h2 className="font-mono text-accent-secondary mb-8 text-sm md:text-base">
        // hackathons
      </h2>
      <ul className="space-y-2.5">
        {hackathons.map((hackathon, index) => (
          <li key={index} className="text-muted leading-relaxed">
            {hackathon.link ? (
              <a
                href={hackathon.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent-primary transition-colors"
              >
                {hackathon.title}
              </a>
            ) : (
              <span>{hackathon.title}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

**Step 2: Commit**

Run:
```bash
git add components/Hackathons.tsx
git commit -m "feat: create Hackathons component"
```

---

## Task 10: Create Experience Component

**Files:**
- Create: `components/Experience.tsx`

**Step 1: Create Experience component**

Create `components/Experience.tsx`:
```typescript
import { Experience } from '@/data/types';

interface ExperienceProps {
  experiences: Experience[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="max-w-4xl mx-auto px-6 py-16 border-t border-grid-line animate-fade-in animate-delay-600"
    >
      <h2 className="font-mono text-accent-secondary mb-8 text-sm md:text-base">
        // work i've done
      </h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="border border-grid-line p-6 hover:border-accent-primary/50 hover:shadow-lg hover:shadow-accent-primary/10 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
              <h3 className="font-semibold text-foreground">
                {exp.title}, {exp.company}
              </h3>
              <span className="text-muted text-sm whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            <p className="text-muted leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Step 2: Commit**

Run:
```bash
git add components/Experience.tsx
git commit -m "feat: create Experience component with hover effects"
```

---

## Task 11: Create Events Component

**Files:**
- Create: `components/Events.tsx`

**Step 1: Create Events component**

Create `components/Events.tsx`:
```typescript
import { Event } from '@/data/types';

interface EventsProps {
  events: Event[];
}

export default function Events({ events }: EventsProps) {
  return (
    <section
      id="events"
      className="max-w-4xl mx-auto px-6 py-16 border-t border-grid-line animate-fade-in animate-delay-750"
    >
      <h2 className="font-mono text-accent-secondary mb-8 text-sm md:text-base">
        // events i've hosted
      </h2>
      <div>
        <h3 className="font-semibold mb-3 text-foreground">past</h3>
        <ul className="space-y-2.5">
          {events.map((event, index) => (
            <li key={index} className="text-muted leading-relaxed">
              {event.link ? (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-accent-primary transition-colors"
                >
                  {event.title}
                </a>
              ) : (
                <span>{event.title}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

Run:
```bash
git add components/Events.tsx
git commit -m "feat: create Events component"
```

---

## Task 12: Create Footer Component

**Files:**
- Create: `components/Footer.tsx`

**Step 1: Create Footer component**

Create `components/Footer.tsx`:
```typescript
export default function Footer() {
  return (
    <footer className="border-t border-grid-line mt-20">
      <div className="max-w-4xl mx-auto px-6 py-8 text-muted text-sm">
        <p>© 2025 matilda glynn-henley. all rights reserved.</p>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

Run:
```bash
git add components/Footer.tsx
git commit -m "feat: create Footer component"
```

---

## Task 13: Compose Main Page

**Files:**
- Modify: `app/page.tsx`

**Step 1: Create main page with all components**

Edit `app/page.tsx`:
```typescript
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Hackathons from '@/components/Hackathons';
import Experience from '@/components/Experience';
import Events from '@/components/Events';
import Footer from '@/components/Footer';
import {
  personalInfo,
  currentProjects,
  pastProjects,
  hackathons,
  experiences,
  pastEvents
} from '@/data/content';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero name={personalInfo.name} title={personalInfo.title} />
      <About bio={personalInfo.bio} />
      <Projects current={currentProjects} past={pastProjects} />
      <Hackathons hackathons={hackathons} />
      <Experience experiences={experiences} />
      <Events events={pastEvents} />
      <Footer />
    </main>
  );
}
```

**Step 2: Commit**

Run:
```bash
git add app/page.tsx
git commit -m "feat: compose main page with all components"
```

---

## Task 14: Add Smooth Scroll

**Files:**
- Modify: `app/globals.css`

**Step 1: Add smooth scroll behavior**

Edit `app/globals.css` and add to the `@layer base` section:
```css
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground font-body;
    background-image:
      linear-gradient(to right, #1a1a1a 1px, transparent 1px),
      linear-gradient(to bottom, #1a1a1a 1px, transparent 1px);
    background-size: 60px 60px;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}
```

**Step 2: Commit**

Run:
```bash
git add app/globals.css
git commit -m "feat: add smooth scroll behavior"
```

---

## Task 15: Configure Static Export for Vercel

**Files:**
- Modify: `next.config.ts`

**Step 1: Configure Next.js for static export**

Edit `next.config.ts`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

**Step 2: Test build**

Run:
```bash
npm run build
```

Expected: Build completes successfully, creates `out/` directory

**Step 3: Commit**

Run:
```bash
git add next.config.ts
git commit -m "feat: configure static export for Vercel deployment"
```

---

## Task 16: Create Vercel Deployment Configuration

**Files:**
- Create: `vercel.json`

**Step 1: Create Vercel configuration**

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out"
}
```

**Step 2: Commit**

Run:
```bash
git add vercel.json
git commit -m "feat: add Vercel deployment configuration"
```

---

## Task 17: Add README

**Files:**
- Create: `README.md`

**Step 1: Create README documentation**

Create `README.md`:
```markdown
# Matilda Glynn-Henley Portfolio

A distinctive Next.js portfolio website with criss-cross grid background and sophisticated typography.

## Features

- Next.js 14 App Router with static export
- TypeScript content modules for easy updates
- Custom dark theme with grid background
- Google Fonts: Fraunces, Newsreader, JetBrains Mono
- Staggered fade-in animations
- Smooth scroll navigation
- Responsive design

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Updating Content

Edit `data/content.ts` to update:
- Personal info (name, title, bio)
- Projects (current/past)
- Experience
- Hackathons
- Events

## Deployment

Deployed on Vercel with automatic deployments from main branch.

```bash
npm run build  # Test production build
```

## Design

See `docs/plans/2025-11-01-portfolio-design.md` for complete design documentation.
```

**Step 2: Commit**

Run:
```bash
git add README.md
git commit -m "docs: add README with setup instructions"
```

---

## Task 18: Final Testing and Verification

**Step 1: Run development server**

Run:
```bash
npm run dev
```

**Step 2: Verify all sections**

Open http://localhost:3000 and check:
- [ ] Hero section displays with name and navigation
- [ ] About section shows bio
- [ ] Projects section shows current/past projects
- [ ] Hackathons section displays
- [ ] Experience cards show with hover effects
- [ ] Events section displays
- [ ] Footer appears
- [ ] Grid background visible
- [ ] Smooth scroll works on navigation clicks
- [ ] Fonts load correctly (Fraunces, Newsreader, JetBrains Mono)
- [ ] Animations stagger on page load
- [ ] Responsive on mobile/tablet/desktop

**Step 3: Test production build**

Run:
```bash
npm run build
npx serve@latest out
```

Verify production build works correctly

**Step 4: Stop servers**

Press Ctrl+C to stop servers

**Step 5: Final commit**

Run:
```bash
git add .
git commit -m "chore: final verification complete"
```

---

## Deployment Instructions

### Deploy to Vercel

1. Push code to GitHub:
```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel auto-detects Next.js settings
6. Click "Deploy"

### Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

---

## Post-Deployment Tasks

After successful deployment:

1. **Test live site**: Verify all functionality works on production URL
2. **SEO check**: Use Google Search Console to submit sitemap
3. **Analytics** (optional): Add Vercel Analytics in project settings
4. **Performance**: Test with Lighthouse (aim for 90+ scores)

---

## Future Enhancements

Ideas for extending the portfolio:

- Add project detail pages (case studies)
- Blog integration with MDX
- Contact form with serverless function
- CMS integration (Sanity/Contentful)
- Dark/light mode toggle
- Enhanced animations on scroll
- Tags/filtering for projects
