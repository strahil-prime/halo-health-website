import type { CSSProperties, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Magic UI "Shine Border" (MIT). Same adaptation as the platform app.
interface ShineBorderProps extends HTMLAttributes<HTMLDivElement> {
  borderWidth?: number;
  duration?: number;
  shineColor?: string | string[];
}

export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = 'var(--accent)',
  className,
  style,
  ...props
}: ShineBorderProps) {
  const colors = Array.isArray(shineColor) ? shineColor.join(',') : shineColor;
  const mask =
    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)';

  return (
    <div
      aria-hidden="true"
      style={
        {
          '--duration': `${duration}s`,
          backgroundImage: `radial-gradient(transparent, transparent, ${colors}, transparent, transparent)`,
          backgroundSize: '300% 300%',
          mask,
          WebkitMask: mask,
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: borderWidth,
          ...style,
        } as CSSProperties
      }
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] motion-safe:animate-shine',
        className,
      )}
      {...props}
    />
  );
}
