'use client';

import NumberFlow from '@number-flow/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { SectionHeading } from '@/components/home/section-heading';
import { Reveal } from '@/components/motion/reveal';
import { expect } from '@/content/home';

/** Four promises, each led by a number that counts into place (NumberFlow). */
export function ExpectStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });

  return (
    <section
      aria-labelledby="expect-heading"
      className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-background section-y"
    >
      <div className="container-page">
        <SectionHeading
          id="expect-heading"
          eyebrow={expect.eyebrow}
          title={expect.title}
        />

        <div
          ref={ref}
          className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4"
        >
          {expect.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <div className="border-t border-foreground/15 pt-6">
                <p className="flex items-baseline font-display text-[5.5rem] leading-[1.25] font-medium text-foreground lining-nums tabular-nums lg:text-[6.5rem]">
                  <NumberFlow
                    value={inView ? item.value : item.from}
                    transformTiming={{
                      duration: 1400,
                      easing: 'cubic-bezier(0.22,1,0.36,1)',
                    }}
                    spinTiming={{
                      duration: 1400,
                      easing: 'cubic-bezier(0.22,1,0.36,1)',
                    }}
                  />
                  {'valueTo' in item && (
                    <>
                      <span className="px-1 text-[0.6em] text-accent">–</span>
                      <NumberFlow
                        value={inView ? item.valueTo : item.from}
                        transformTiming={{
                          duration: 1800,
                          easing: 'cubic-bezier(0.22,1,0.36,1)',
                        }}
                        spinTiming={{
                          duration: 1800,
                          easing: 'cubic-bezier(0.22,1,0.36,1)',
                        }}
                      />
                    </>
                  )}
                </p>
                <p className="mt-3 text-eyebrow text-accent">{item.label}</p>
                <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
