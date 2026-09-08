'use client';

import { useEffect } from 'react';

// Classic web-safe pastels — black text stays readable on all of them.
// Everything defaults to white; a full cycle returns to white.
const COLORS = ['#ffffff', '#ffffcc', '#ccffff', '#ffccff', '#ccffcc', '#ffe4cc'];

export default function TapColors() {
  useEffect(() => {
    const tints = new WeakMap<Element, number>();

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || target.closest('a, button')) return;

      // Innermost bordered box wins: fieldset → main frame → page background.
      const box =
        target.closest('fieldset') ?? target.closest('main') ?? document.body;
      const i = ((tints.get(box) ?? 0) + 1) % COLORS.length;
      tints.set(box, i);
      (box as HTMLElement).style.background = COLORS[i];
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
