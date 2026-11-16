'use client';

import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;

/** Plus that folds into a minus, in a circle. Follows `group/row` hover. */
export function PlusMinus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative grid size-11 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,rotate] duration-500 ease-brand',
        open
          ? 'rotate-180 border-foreground bg-foreground text-background'
          : 'border-foreground/30 group-hover/row:border-foreground group-hover/row:bg-foreground group-hover/row:text-background',
      )}
    >
      <span className="absolute h-px w-3.5 bg-current" />
      <span
        className={cn(
          'absolute h-3.5 w-px bg-current transition-transform duration-500 ease-brand',
          open && 'scale-y-0',
        )}
      />
    </span>
  );
}

/** The collapsing region of an accordion item. Animates to its own height. */
export function DisclosurePanel({
  open,
  id,
  labelledBy,
  children,
  className,
}: {
  open: boolean;
  id: string;
  labelledBy: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          id={id}
          role="region"
          aria-labelledby={labelledBy}
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: 'auto',
            opacity: 1,
            transition: {
              height: { duration: 0.6, ease },
              opacity: { duration: 0.6, delay: 0.12, ease },
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: { duration: 0.5, ease },
              opacity: { duration: 0.2 },
            },
          }}
        >
          <div className={className}>{children}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
