'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;

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
        : {
            whileInView: target,
            viewport: { once: true, margin: '0px 0px -12% 0px' },
          })}
      transition={{ duration: 0.9, delay, ease }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface SplitWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}

/**
 * Headline reveal: each word rises out of a clipped line.
 * Screen readers get the plain sentence.
 */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: SplitWordsProps) {
  const words = text.split(' ');
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        {...(immediate
          ? { animate: 'shown' }
          : {
              whileInView: 'shown',
              viewport: { once: true, margin: '0px 0px -12% 0px' },
            })}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom"
          >
            <motion.span
              className={cn(
                'inline-block will-change-transform',
                wordClassName,
              )}
              variants={{
                hidden: { y: '110%', rotate: 4, opacity: 0 },
                shown: { y: '0%', rotate: 0, opacity: 1 },
              }}
              transition={{ duration: 1, ease }}
            >
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}
