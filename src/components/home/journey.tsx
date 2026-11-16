'use client';

import { useGSAP } from '@gsap/react';
import NumberFlow from '@number-flow/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import { SectionHeading } from '@/components/home/section-heading';
import { journey } from '@/content/home';
import { cn } from '@/lib/utils';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * The six-step journey. A line draws itself down the page as you scroll
 * (ScrollTrigger scrub) and the step in view lights up; on desktop the
 * heading and a large step counter stay pinned alongside.
 */
export function Journey() {
  const scope = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>('[data-step]');
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 62%',
          end: 'bottom 62%',
          onToggle: (self) => self.isActive && setActive(i),
        });
      });

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-progress]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-steps]',
              start: 'top 62%',
              end: 'bottom 62%',
              scrub: 0.4,
            },
          },
        );
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="how-it-works"
      aria-labelledby="journey-heading"
      className="bg-background section-y"
    >
      <div className="container-page grid gap-x-16 gap-y-14 lg:grid-cols-[1fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="journey-heading"
            eyebrow={journey.eyebrow}
            title={journey.title}
            body={journey.body}
          />
          <div
            aria-hidden="true"
            className="mt-14 hidden items-baseline gap-3 font-display text-foreground lg:flex"
          >
            <span className="text-[9rem] leading-[1.25] lining-nums tabular-nums">
              <NumberFlow
                value={active + 1}
                format={{ minimumIntegerDigits: 2 }}
              />
            </span>
            <span className="text-2xl text-muted-foreground">
              / 0{journey.steps.length}
            </span>
          </div>
        </div>

        <ol data-steps className="relative">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-foreground/12"
          />
          <span
            data-progress
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[0.6875rem] w-px origin-top bg-gradient-to-b from-ember to-clay motion-reduce:hidden"
          />
          {journey.steps.map((step, i) => (
            <li
              key={step.title}
              data-step
              className={cn(
                'relative pb-14 pl-14 transition-opacity duration-700 last:pb-0 motion-safe:opacity-40',
                i <= active && 'motion-safe:opacity-100',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-1 left-0 grid size-6 place-items-center rounded-full border bg-background transition-colors duration-500',
                  i <= active ? 'border-clay' : 'border-foreground/25',
                )}
              >
                <span
                  className={cn(
                    'size-2 rounded-full bg-clay transition-transform duration-500',
                    i <= active ? 'scale-100' : 'scale-0',
                  )}
                />
              </span>
              <p className="text-eyebrow text-muted-foreground tabular-nums">
                Step 0{i + 1}
              </p>
              <h3 className="mt-3 text-display-md">{step.title}</h3>
              <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
                {step.body}
              </p>
              <p className="mt-5 inline-flex rounded-full bg-muted px-3.5 py-1.5 text-xs font-medium text-foreground">
                {step.meta}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
