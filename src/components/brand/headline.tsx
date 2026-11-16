import { Fragment } from 'react';
import type { Segment } from '@/content/home';
import { cn } from '@/lib/utils';

/** Small tracked label with an optional index: "01 —— How it works". */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-3.5 text-eyebrow text-muted-foreground',
        className,
      )}
    >
      {index ? <span className="tabular-nums">{index}</span> : null}
      <span aria-hidden="true" className="h-px w-11 bg-current opacity-60" />
      {children}
    </p>
  );
}

/** The six-point mark used beside labels (asterisk in the brand's hand). */
export function Asterisk({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className={cn('size-3.5', className)}
    >
      <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
    </svg>
  );
}

/**
 * Renders headline segments inline: `em` in italic, `soft` in the quieter
 * second tone. `lines` puts each segment on its own line from `sm` up.
 */
export function Segments({
  segments,
  lines = false,
}: {
  segments: readonly Segment[];
  lines?: boolean;
}) {
  return (
    <>
      {segments.map((segment, i) => (
        <Fragment key={segment.text}>
          {i > 0 ? lines ? <br className="max-sm:hidden" /> : null : null}
          {i > 0 ? ' ' : null}
          {segment.em ? (
            <em>{segment.text}</em>
          ) : segment.soft ? (
            <span className="text-stone">{segment.text}</span>
          ) : (
            segment.text
          )}
        </Fragment>
      ))}
    </>
  );
}
