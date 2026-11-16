'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import type { ReactNode } from 'react';
import type { Segment } from '@/content/home';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: '0px 0px -10% 0px' } as const;

interface RevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  /** Distance to travel in px. */
  y?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
}

/** Fade-and-rise on scroll. The default entrance for blocks of content. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  immediate = false,
  ...props
}: RevealProps) {
  const target = { opacity: 1, y: 0, filter: 'blur(0px)' };
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      {...(immediate
        ? { animate: target }
        : { whileInView: target, viewport: inView })}
      transition={{ duration: 0.9, delay, ease }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface RevealLinesProps {
  /** One segment per line. */
  lines: readonly Segment[];
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}

/**
 * Headline reveal: each line rises out of a clipped row.
 * Put it inside the heading element. Screen readers get the plain sentence.
 */
export function RevealLines({
  lines,
  className,
  delay = 0,
  stagger = 0.11,
  immediate = false,
}: RevealLinesProps) {
  return (
    <span className={cn('block', className)}>
      <span className="sr-only">
        {lines.map((line) => line.text).join(' ')}
      </span>
      <motion.span
        aria-hidden="true"
        className="block"
        initial="hidden"
        {...(immediate
          ? { animate: 'shown' }
          : { whileInView: 'shown', viewport: inView })}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {lines.map((line) => (
          <span
            key={line.text}
            className="-mx-[0.08em] -mb-[0.16em] block overflow-hidden px-[0.08em] pb-[0.16em]"
          >
            <motion.span
              className="block origin-bottom-left will-change-transform"
              variants={{
                hidden: { y: '112%', rotate: 2.5 },
                shown: { y: '0%', rotate: 0 },
              }}
              transition={{ duration: 1.15, ease }}
            >
              {line.em ? (
                <em>{line.text}</em>
              ) : line.soft ? (
                <span className="text-stone">{line.text}</span>
              ) : (
                line.text
              )}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/** A hairline that draws itself from the left when it scrolls into view. */
export function RevealRule({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={cn('block h-px origin-left bg-foreground/20', className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={inView}
      transition={{ duration: 1.2, delay, ease }}
    />
  );
}
