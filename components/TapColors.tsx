'use client';

import { useEffect } from 'react';

// Tap a box to cycle it through retro tints (defined per theme in globals.css).
// Everything defaults to plain; a full cycle returns to plain.
const TINTS = 6;

export default function TapColors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || target.closest('a, button')) return;

      // Innermost bordered box wins: fieldset → main frame. The page background is left to the koi.
      const box = (target.closest('fieldset') ?? target.closest('main')) as HTMLElement | null;
      if (!box) return;
      const i = (Number(box.dataset.tint ?? 0) + 1) % TINTS;
      if (i === 0) delete box.dataset.tint;
      else box.dataset.tint = String(i);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
