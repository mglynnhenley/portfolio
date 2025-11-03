'use client';

import { useState, useEffect } from 'react';

interface HeroProps {
  name: string;
  title: string;
}

export default function Hero({ name, title }: HeroProps) {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'click to draw';

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100); // 100ms per character for handwriting effect

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-[900px] px-20 pt-40 pb-32 animate-fade-in">
      <span
        className="text-xl opacity-40 mb-3 block"
        style={{
          fontFamily: 'var(--font-caveat)',
        }}
      >
        {displayedText}
      </span>

      <p className="text-foreground text-xs mb-6 font-mono">
        currently living in{' '}
        <span className="text-accent-primary font-bold">paris</span>
        {' '}at{' '}
        <a
          href="https://joinpluto.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-accent-primary"
        >
          pluto hacker house
        </a>
      </p>

      <h1 className="text-5xl font-bold mb-4 text-accent-primary">{name}</h1>
      <p className="text-foreground text-lg mb-8">{title}</p>

      <nav className="flex flex-wrap gap-6 font-mono text-xs">
        <a
          href="#projects"
          className="text-foreground hover:text-accent-primary"
        >
          projects
        </a>
        <a
          href="#community"
          className="text-foreground hover:text-accent-primary"
        >
          community
        </a>
        <a
          href="#hackathons"
          className="text-foreground hover:text-accent-primary"
        >
          hackathons
        </a>
        <a
          href="#events"
          className="text-foreground hover:text-accent-primary"
        >
          events
        </a>
        <a
          href="#experience"
          className="text-foreground hover:text-accent-primary"
        >
          experience
        </a>
      </nav>
    </section>
  );
}
