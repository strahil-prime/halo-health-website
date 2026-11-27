'use client';

import { useRef, useState } from 'react';
import { Eyebrow } from '@/components/brand/headline';
import { PillLink } from '@/components/brand/pill-link';
import { Reveal, RevealLines } from '@/components/motion/reveal';
import { cta, journey } from '@/content/home';
import { platformLink } from '@/lib/env';
import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/**
 * Where each step sits on the arc, in the SVG's 1360 x 340 space.
 * The arc is `M0 60 Q680 460 1360 60`, so x is linear in t: a node at
 * t = 0.125 is drawn when the line is 12.5% complete.
 */
const nodes = [
  { t: 0.125, x: 170, y: 147.5 },
  { t: 0.375, x: 510, y: 247.5 },
  { t: 0.625, x: 850, y: 247.5 },
  { t: 0.875, x: 1190, y: 147.5 },
] as const;

/** How it works: four steps strung along a halo arc that draws on scroll. */
export function Journey() {
  const scope = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      // Desktop: the arc, its nodes and the steps are scrubbed by the scroll.
      media.add(
        '(min-width: 64rem) and (prefers-reduced-motion: no-preference)',
        () => {
          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: scope.current,
              start: 'top 70%',
              end: 'top 8%',
              scrub: 0.8,
            },
          });
          timeline
            .fromTo(
              '[data-arc]',
              { strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 1 },
              0,
            )
            .fromTo(
              '[data-arc-soft]',
              { opacity: 0 },
              { opacity: 1, duration: 0.6 },
              0,
            );
          nodes.forEach((node, i) => {
            timeline
              .fromTo(
                `[data-node="${i}"]`,
                { scale: 0, opacity: 0, transformOrigin: '50% 50%' },
                { scale: 1, opacity: 1, duration: 0.1, ease: 'back.out(2.4)' },
                node.t - 0.05,
              )
              .fromTo(
                `[data-drop="${i}"]`,
                { opacity: 0 },
                { opacity: 1, duration: 0.12 },
                node.t,
              )
              .fromTo(
                `[data-step="${i}"]`,
                { opacity: 0, y: 28 },
                { opacity: 1, y: 0, duration: 0.16, ease: 'power2.out' },
                node.t,
              );
          });
        },
      );

      // Phones and tablets: each step rises as it comes into view.
      media.add(
        '(max-width: 63.999rem) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.utils.toArray<HTMLElement>('[data-step]').forEach((step) => {
            gsap.from(step, {
              opacity: 0,
              y: 28,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: step, start: 'top 88%' },
            });
          });
        },
      );
    },
    { scope },
  );

  return (
    <section
      id="how-it-works"
      aria-labelledby="journey-title"
      className="inset-x section-t"
    >
      <div
        ref={scope}
        className="theme-ink relative overflow-hidden rounded-3xl band-x py-14 lg:pt-[4.25rem] lg:pb-16"
      >
        <div className="mx-auto max-w-[85rem]">
          <div className="grid">
            <svg
              aria-hidden="true"
              viewBox="0 0 1360 340"
              fill="none"
              className="col-start-1 row-start-1 block w-full max-lg:hidden"
            >
              <path
                data-arc-soft
                d="M-40 104 Q680 524 1400 104"
                className="stroke-cream/15"
              />
              <path
                data-arc
                d="M0 60 Q680 460 1360 60"
                pathLength={1}
                strokeDasharray={1}
                className="stroke-cream/55"
              />
              {nodes.map((node, i) => (
                <g key={node.x}>
                  <path
                    data-drop={i}
                    d={`M${node.x} ${node.y + 22}V340`}
                    strokeDasharray="2 7"
                    className="stroke-cream/30"
                  />
                  <g data-node={i}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={14}
                      className="origin-center stroke-cream/40 [transform-box:fill-box] motion-safe:animate-node-pulse"
                      style={{ animationDelay: `${i * 0.7}s` }}
                    />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={14}
                      className={cn(
                        'origin-center transition-[scale,stroke,fill] duration-500 ease-brand [transform-box:fill-box]',
                        active === i
                          ? 'scale-[1.6] fill-cream/10 stroke-cream'
                          : 'fill-noir stroke-cream/40',
                      )}
                    />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={5}
                      className="fill-cream"
                    />
                  </g>
                </g>
              ))}
            </svg>
            <div className="col-start-1 row-start-1 flex flex-col gap-5 self-start lg:items-center lg:justify-self-center lg:text-center">
              <Eyebrow index="01">{journey.eyebrow}</Eyebrow>
              <h2 id="journey-title" className="text-display-xl">
                <RevealLines lines={journey.titleLines} />
              </h2>
            </div>
          </div>

          <ol className="mt-10 grid max-lg:ml-1.5 max-lg:border-l lg:mt-5 lg:grid-cols-4">
            {journey.steps.map((step, i) => (
              <li
                key={step.title}
                data-step={i}
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive(null)}
                className="relative flex flex-col gap-2.5 max-lg:pb-9 max-lg:pl-8 max-lg:last:pb-0 lg:items-center lg:px-7 lg:text-center"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-1 -left-[5.5px] size-2.5 rounded-full bg-cream ring-4 ring-noir lg:hidden"
                />
                <span className="text-eyebrow tracking-[0.22em] text-muted-foreground tabular-nums">
                  0{i + 1}
                </span>
                <h3 className="font-display text-[2.25rem] leading-[1.05]">
                  {step.title}
                </h3>
                <p className="max-w-[26rem] text-sm leading-[1.6] text-muted-foreground lg:max-w-[16.25rem]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <Reveal className="mt-11 flex lg:mt-12 lg:justify-center">
            <PillLink href={platformLink('/')} className="max-sm:w-full">
              {cta.primary}
            </PillLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
