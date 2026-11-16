'use client';

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useRef } from 'react';
import type { Segment } from '@/content/home';
import { cn } from '@/lib/utils';

function Word({
  children,
  progress,
  range,
  className,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={cn('motion-reduce:opacity-100!', className)}
    >
      {children}{' '}
    </motion.span>
  );
}

/**
 * A statement that "reads itself" as you scroll: words go from faint to full
 * strength in order. Put it inside the heading element. With reduced motion
 * the words simply stay at full strength (same markup, so hydration is safe).
 */
export function ScrollWords({
  segments,
  className,
}: {
  segments: readonly Segment[];
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 88%', 'end 55%'],
  });

  const words = segments.flatMap((segment) =>
    segment.text.split(' ').map((word) => ({ word, segment })),
  );
  const sentence = segments.map((segment) => segment.text).join(' ');

  return (
    <span ref={ref} className={cn('block', className)}>
      <span className="sr-only">{sentence}</span>
      <span aria-hidden="true">
        {words.map(({ word, segment }, i) => (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1.5) / words.length]}
            className={cn(segment.em && 'italic', segment.soft && 'text-stone')}
          >
            {word}
          </Word>
        ))}
      </span>
    </span>
  );
}
