'use client';

import { motion } from 'motion/react';
import { Spotlight } from '@/components/motion/spotlight';

const cards = [
  { title: 'Lift', body: 'Cards rise and settle with a spring on hover.' },
  { title: 'Light', body: 'A soft light follows the pointer across the card.' },
  { title: 'Focus', body: 'Keyboard focus gets the same lift as the mouse.' },
] as const;

/** Motion layer demo: hover and focus micro-interactions. */
export function HoverCards() {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {cards.map((card, i) => (
        <motion.li
          key={card.title}
          whileHover={{ y: -8 }}
          whileFocus={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          tabIndex={0}
          className="rounded-3xl"
        >
          <Spotlight className="theme-ink h-full rounded-3xl p-7">
            <p className="text-eyebrow text-muted-foreground tabular-nums">
              0{i + 1}
            </p>
            <h3 className="mt-10 text-display-md">{card.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{card.body}</p>
          </Spotlight>
        </motion.li>
      ))}
    </ul>
  );
}
