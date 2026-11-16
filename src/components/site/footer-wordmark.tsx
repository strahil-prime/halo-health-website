'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useRef } from 'react';

/** The giant, faint wordmark that rises into place as the footer arrives. */
export function FooterWordmark({ children }: { children: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['45%', '0%']);

  return (
    <div ref={ref} aria-hidden="true" className="mt-4 overflow-hidden">
      <motion.p
        style={{ y: reduce ? 0 : y }}
        className="-mb-[0.17em] text-center font-display text-[clamp(4.5rem,19.5vw,18.125rem)] leading-[0.86] tracking-[-0.02em] whitespace-nowrap text-cream/10 italic will-change-transform"
      >
        {children}
      </motion.p>
    </div>
  );
}
