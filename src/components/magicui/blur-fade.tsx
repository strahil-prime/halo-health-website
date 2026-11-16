'use client';

import { AnimatePresence, motion, useInView } from 'motion/react';
import { useRef, type ReactNode } from 'react';

// Magic UI "Blur Fade" (MIT), built on Motion (Framer Motion).
interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  blur?: string;
  inView?: boolean;
}

export function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  offset = 6,
  blur = '6px',
  inView = false,
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const visible = !inView || isInView;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ y: offset, opacity: 0, filter: `blur(${blur})` }}
        animate={
          visible
            ? { y: 0, opacity: 1, filter: 'blur(0px)' }
            : { y: offset, opacity: 0, filter: `blur(${blur})` }
        }
        transition={{ delay: 0.04 + delay, duration, ease: 'easeOut' }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
