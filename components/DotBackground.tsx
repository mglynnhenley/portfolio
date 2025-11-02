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
