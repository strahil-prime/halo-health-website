import { cn } from '@/lib/utils';

/**
 * Halo Health primary logo, traced from the brand style guide.
 * Rendered as a CSS mask so it takes the current text colour
 * (ink on light, bone on dark = the "negative" version).
 * Size it with a height class; the width follows the aspect ratio.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Halo Health, Lifestyle Medicine Center"
      className={cn(
        'inline-block aspect-[1968/1712] h-14 bg-current [mask:url(/brand/halo-health-logo.svg)_center/contain_no-repeat]',
        className,
      )}
    />
  );
}
