import { Fragment } from 'react';
import { Reveal } from '@/components/motion/reveal';
import { audiences } from '@/content/home';
import { cn } from '@/lib/utils';

/** Who the service is designed for, as a quiet typographic strip. */
export function Audiences() {
  return (
    <div className="container-page">
      <Reveal
        y={16}
        className="grid grid-cols-2 items-center gap-x-10 gap-y-3 border-b py-7 md:grid-cols-4 lg:flex lg:justify-between"
      >
        <p className="col-span-full text-eyebrow text-muted-foreground max-lg:mb-1.5">
          {audiences.eyebrow}
        </p>
        {audiences.items.map((item, i) => (
          <Fragment key={item}>
            {i > 0 ? (
              <span
                aria-hidden="true"
                className="size-[5px] rounded-full bg-accent max-lg:hidden"
              />
            ) : null}
            <p
              className={cn(
                'font-display text-2xl leading-[1.1] md:text-[1.625rem]',
                i % 2 === 1 && 'italic',
              )}
            >
              {item}
            </p>
          </Fragment>
        ))}
      </Reveal>
    </div>
  );
}
