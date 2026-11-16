'use client';

import NumberFlow from '@number-flow/react';
import { useInView } from 'motion/react';
import { Fragment, useRef } from 'react';
import { Reveal, RevealRule } from '@/components/motion/reveal';
import { promises } from '@/content/home';

/** Four design promises, counted in when they scroll into view. */
export function Promises() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });

  return (
    <section aria-label="What we promise" className="container-page pt-14">
      <ul
        ref={ref}
        className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {promises.map((promise, i) => (
          <li key={promise.title}>
            <RevealRule delay={i * 0.1} />
            <Reveal delay={i * 0.1} className="flex flex-col gap-2.5 pt-3 pr-6">
              {/* leading-[1.25] gives NumberFlow's digit mask room for the serif. */}
              <p className="-mb-2 font-display text-[4.5rem] leading-[1.25] tracking-[-0.02em] lg:text-[5.25rem]">
                <span className="sr-only">
                  {promise.parts
                    .map((part) => part.value)
                    .join(` ${promise.joiner ?? ''} `)}
                </span>
                <span aria-hidden="true" className="lining-nums tabular-nums">
                  {promise.parts.map((part, j) => (
                    <Fragment key={j}>
                      {j > 0 ? <em> {promise.joiner} </em> : null}
                      <NumberFlow
                        value={inView ? part.value : part.from}
                        transformTiming={{
                          duration: 1400,
                          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                        spinTiming={{
                          duration: 1400,
                          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      />
                    </Fragment>
                  ))}
                </span>
              </p>
              <h3 className="text-[0.9375rem] font-semibold">
                {promise.title}
              </h3>
              <p className="text-sm leading-[1.55] text-muted-foreground">
                {promise.body}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
