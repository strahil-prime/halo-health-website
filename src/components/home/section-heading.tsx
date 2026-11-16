import { Reveal, SplitWords } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

/** Eyebrow + serif headline + optional lead. Shared by every section. */
export function SectionHeading({
  eyebrow,
  title,
  body,
  id,
  align = 'left',
  className,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  id?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <Reveal y={12}>
        <p
          className={cn(
            'flex items-center gap-3 text-eyebrow text-accent',
            align === 'center' && 'justify-center',
          )}
        >
          <span className="inline-block h-px w-8 bg-accent" />
          {eyebrow}
        </p>
      </Reveal>
      <h2 id={id} className="mt-6 text-display-lg text-balance">
        <SplitWords text={title} stagger={0.04} />
      </h2>
      {body && (
        <Reveal delay={0.2}>
          <p className="mt-6 text-lead text-pretty text-muted-foreground">
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
