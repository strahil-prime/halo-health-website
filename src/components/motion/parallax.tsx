'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Fills its (relative, overflow-hidden) parent and drifts slowly against the
 * scroll. Put a `fill` image inside. The layer is a little taller than the
 * frame so the drift never shows an edge; on first view it also settles from
 * a slight zoom.
 */
export function Parallax({
  children,
  className,
  /** Drift, as a percentage of the frame height, each way. */
  amount = 6,
  /** Skip the settle-in zoom (use for above-the-fold images). */
  still = false,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  still?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${amount}%`, `${amount}%`],
  );

  return (
    <div
      ref={ref}
      className={cn('absolute inset-0 overflow-hidden', className)}
    >
      <motion.div
        className="absolute inset-x-0 will-change-transform"
        style={{
          top: `-${amount}%`,
          bottom: `-${amount}%`,
          y: reduce ? 0 : y,
        }}
      >
        <motion.div
          className="absolute inset-0"
          initial={still ? false : { scale: 1.14 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.8, ease }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
