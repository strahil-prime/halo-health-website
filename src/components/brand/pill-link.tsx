import { ArrowUpRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * The arrow in a circle used across the site. On hover of the nearest
 * `group/arrow` ancestor the arrow leaves top-right and a second one
 * arrives from bottom-left.
 */
export function ArrowBadge({
  className,
  tone = 'solid',
}: {
  className?: string;
  /** solid = filled with the primary-foreground colour; line = outlined. */
  tone?: 'solid' | 'line';
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full transition-[background-color,color,border-color,scale] duration-500 ease-brand',
        tone === 'solid'
          ? 'bg-primary-foreground text-primary'
          : 'border border-foreground/40 text-foreground group-hover/arrow:border-foreground group-hover/arrow:bg-foreground group-hover/arrow:text-background',
        className,
      )}
    >
      <ArrowUpRight
        strokeWidth={1.6}
        className="size-4 transition-transform duration-500 ease-brand group-hover/arrow:translate-x-7 group-hover/arrow:-translate-y-7 group-focus-visible/arrow:translate-x-7 group-focus-visible/arrow:-translate-y-7"
      />
      <ArrowUpRight
        strokeWidth={1.6}
        className="absolute size-4 -translate-x-7 translate-y-7 transition-transform duration-500 ease-brand group-hover/arrow:translate-x-0 group-hover/arrow:translate-y-0 group-focus-visible/arrow:translate-x-0 group-focus-visible/arrow:translate-y-0"
      />
    </span>
  );
}

type PillLinkProps = ComponentProps<'a'> & {
  children: ReactNode;
  /** solid = filled pill with arrow badge; outline = quiet secondary. */
  variant?: 'solid' | 'outline';
  size?: 'md' | 'lg';
};

/**
 * Primary call to action: a pill with the arrow badge. Colours are semantic,
 * so it is ink on light sections and cream inside `.theme-ink`.
 */
export function PillLink({
  children,
  variant = 'solid',
  size = 'lg',
  className,
  ...props
}: PillLinkProps) {
  if (variant === 'outline') {
    return (
      <a
        className={cn(
          'inline-flex items-center justify-center rounded-full border border-foreground/45 font-medium transition-[background-color,color,border-color,scale] duration-500 ease-brand hover:border-foreground hover:bg-foreground hover:text-background active:scale-[0.98]',
          size === 'lg'
            ? 'min-h-[3.375rem] px-[1.625rem] text-[0.9375rem]'
            : 'min-h-[3.125rem] px-6 text-sm',
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      className={cn(
        'group/arrow inline-flex items-center justify-between rounded-full bg-primary font-medium text-primary-foreground transition-[scale,box-shadow] duration-500 ease-brand hover:shadow-[0_18px_40px_-18px_rgb(10_9_8/0.55)] active:scale-[0.98]',
        size === 'lg'
          ? 'min-h-[3.375rem] gap-3.5 pr-[0.4375rem] pl-[1.625rem] text-[0.9375rem]'
          : 'min-h-[3.125rem] gap-3.5 pr-1.5 pl-[1.375rem] text-sm',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <ArrowBadge className={size === 'md' ? 'size-[2.375rem]' : undefined} />
    </a>
  );
}
