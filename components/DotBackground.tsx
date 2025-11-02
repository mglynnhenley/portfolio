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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY + window.scrollY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  return <div>Placeholder</div>;
};

export default DotBackground;
