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

  const getFlowerPaths = (): string[] => {
    return [
      "M194.561 172.066C194.39 165.274 191.224 159.06 190.272 152.428C187.778 135.048 192.416 79 222.867 79C254.454 79 222.191 153.804 214.289 168.224C213.54 169.59 207.105 178.256 207.856 179.751C208.171 180.378 210.766 176.442 210.858 176.335C213.943 172.753 217.663 169.273 221.151 166.089C230.669 157.404 290.522 104.164 304.173 138.828C309.447 152.221 295.309 166.055 285.053 173.346C274.369 180.944 260.012 182.81 248.17 187.862C243.33 189.927 238.546 191.34 233.589 192.984C232.205 193.444 229.299 192.387 229.299 193.838C229.299 194.068 235.556 191.642 242.166 189.996C252.831 187.342 294.948 188.367 309.029 199.539C323.11 210.711 323.11 220.567 314.115 227.815C292.968 244.852 269.869 230.996 249.456 222.869C244.404 220.856 238.952 220.628 234.018 218.172C233.695 218.012 227.584 214.89 227.584 216.038C227.584 216.866 240.093 217.911 246.884 222.869C266.359 237.084 292.99 293.533 271.33 306.97C248.201 321.317 215.721 259.162 213.432 252.325C212.241 248.769 212.86 245.213 212.144 241.652C211.825 240.061 210.858 235.334 210.858 236.956C210.858 258.26 215.82 296.531 200.993 312.519C191.65 322.594 174.602 324.561 169.686 308.25C165.09 293.002 167.371 268.629 173.546 254.032C175.734 248.859 185.593 236.645 185.126 235.249C184.51 233.41 180.535 239.355 180.407 239.518C175.881 245.312 170.736 251.147 164.968 255.74C160.052 259.655 153.949 261.815 148.67 265.132C135.158 273.627 112.486 288.638 99.3499 269.401C87.6893 252.325 132.478 218.151 153.818 213.903C159.742 212.724 167.013 210.473 173.117 211.342C174.953 211.603 174.028 211.554 174.832 212.622C179.251 218.486 149.21 216.764 146.955 216.465C126.118 213.699 78.2339 218.479 80.0503 189.569C82.0596 157.587 140.921 177.18 148.67 179.751C161.297 183.94 171.873 191.59 163.681 186.154C150.126 177.157 90.4948 126.565 123.69 100.059C146.918 81.5127 192.416 164.979 192.416 175.482",
      "M184.112 189.912C192.6 176.657 209.525 178.684 221.315 185.651C240.625 197.063 220.283 235.269 191.033 231.669C164.743 228.432 168.065 185.664 194.061 177.13"
    ];
  };

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

      {/* SVG overlay for flowers */}
      <svg
        className="fixed inset-0 pointer-events-none z-0 w-full"
        style={{ height: `${contentHeight}px` }}
      >
        {flowers.map((flower) => renderFlower(flower))}
      </svg>
    </>
  );
};

export default DotBackground;
