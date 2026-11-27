'use client';

import { useLenis } from 'lenis/react';
import { useMotionBudget, type MotionBudget } from '@/hooks/use-motion-budget';

const labels: Record<MotionBudget, string> = {
  full: 'Full motion, 3D on',
  lite: 'Lighter motion, still image instead of 3D',
  reduce: 'Reduced motion (your system setting)',
};

/** Shows which motion level this device gets, to check fallbacks quickly. */
export function MotionStatus() {
  const budget = useMotionBudget();
  const lenis = useLenis();
  const chips = [labels[budget], lenis ? 'Smooth scroll on' : 'Native scroll'];
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Motion on this device">
      {chips.map((chip) => (
        <li
          key={chip}
          className="rounded-full border border-border px-3.5 py-2 text-xs text-muted-foreground"
        >
          {chip}
        </li>
      ))}
    </ul>
  );
}
