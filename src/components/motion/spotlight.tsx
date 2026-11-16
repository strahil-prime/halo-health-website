'use client';

import type { ComponentProps, PointerEvent } from 'react';
import { cn } from '@/lib/utils';

/**
 * A surface with a soft light that follows the pointer.
 * The light is drawn by the ::before layer using --spot-x / --spot-y.
 */
export function Spotlight({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--spot-x',
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      '--spot-y',
      `${event.clientY - rect.top}px`,
    );
  }

  return (
    <div
      onPointerMove={onPointerMove}
      className={cn(
        'group/spot relative isolate overflow-hidden',
        'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100',
        'before:bg-[radial-gradient(22rem_circle_at_var(--spot-x,50%)_var(--spot-y,50%),color-mix(in_oklab,var(--hh-ember)_26%,transparent),transparent_70%)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
