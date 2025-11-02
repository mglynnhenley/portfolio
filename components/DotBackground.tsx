'use client';

import { useEffect, useState, useMemo } from 'react';

interface Flower {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  id: string;
  color: string;
}

// Earth tone palette (terracotta, burnt sienna, clay, rust, warm gray-brown)
const EARTH_TONE_COLORS = [
  '15 60% 58%',  // Terracotta
  '20 50% 50%',  // Burnt sienna
  '30 45% 55%',  // Clay
  '10 55% 52%',  // Rust
  '25 20% 45%',  // Warm gray-brown
];

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

  // Generate all dot positions (memoized to avoid recalculation)
  const allDots = useMemo(() =>
    Array.from({ length: dotsY }).flatMap((_, y) =>
      Array.from({ length: dotsX }).map((_, x) => ({
        x: x * spacing + spacing / 2,
        y: y * spacing + spacing / 2,
      }))
    ),
    [dotsX, dotsY, spacing]
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

      // Performance optimization: spatial filtering before distance calculation
      const FILTER_RADIUS = 300; // Only check dots within 300px

      // Step 1: Filter dots using Manhattan distance (faster than Euclidean)
      const nearbyDots = allDots.filter((dot) => {
        const dx = Math.abs(clickX - dot.x);
        const dy = Math.abs(clickY - dot.y);
        return dx + dy <= FILTER_RADIUS * 1.5; // Manhattan distance approximation
      });

      // Step 2: Calculate Euclidean distance only for nearby dots
      const distances = nearbyDots.map((dot) => ({
        dot,
        distance: Math.sqrt(
          Math.pow(clickX - dot.x, 2) + Math.pow(clickY - dot.y, 2)
        ),
      }));

      distances.sort((a, b) => a.distance - b.distance);
      const nearestTwo = distances.slice(0, 2);

      if (nearestTwo.length === 2) {
        // Get a different color from the last one
        let colorIndex = Math.floor(Math.random() * EARTH_TONE_COLORS.length);
        while (colorIndex === lastColorIndex && EARTH_TONE_COLORS.length > 1) {
          colorIndex = Math.floor(Math.random() * EARTH_TONE_COLORS.length);
        }
        setLastColorIndex(colorIndex);

        const newFlower: Flower = {
          x1: nearestTwo[0].dot.x,
          y1: nearestTwo[0].dot.y,
          x2: nearestTwo[1].dot.x,
          y2: nearestTwo[1].dot.y,
          id: `flower-${Date.now()}-${Math.random()}`,
          color: EARTH_TONE_COLORS[colorIndex],
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

  const getOpacity = (dotX: number, dotY: number) => {
    const dx = Math.abs(mousePosition.x - dotX);
    const dy = Math.abs(mousePosition.y - dotY);

    // Quick rejection using Manhattan distance (cheaper than Euclidean)
    if (dx + dy > 300) return 0.1; // ~200px radius in Euclidean space

    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 200) {
      return 0.3 - (distance / 200) * 0.2;
    }
    return 0.1;
  };

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
};

export default DotBackground;
