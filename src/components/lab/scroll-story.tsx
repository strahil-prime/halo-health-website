'use client';

import { useRef } from 'react';
import { gsap, motionOK, useGSAP } from '@/lib/gsap';

const panels = [
  'Assess',
  'Understand',
  'Plan',
  'Follow through',
  'Review',
] as const;

/**
 * GSAP layer demo: the section pins and the panels travel sideways as you
 * scroll, with a progress rule. With reduced motion it is a plain row you can
 * swipe or scroll sideways (same markup, GSAP simply does not run).
 */
export function ScrollStory() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(motionOK, () => {
        const viewport = scope.current?.querySelector<HTMLElement>(
          '[data-story-viewport]',
        );
        const track =
          scope.current?.querySelector<HTMLElement>('[data-story-track]');
        if (!viewport || !track) return;
        gsap.set(viewport, { overflow: 'hidden' });
        const distance = () => track.scrollWidth - viewport.clientWidth;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: scope.current,
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(track, { x: () => -distance(), ease: 'none' }, 0)
          .fromTo(
            '[data-story-progress]',
            { scaleX: 0 },
            { scaleX: 1, ease: 'none' },
            0,
          );
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      aria-labelledby="story-title"
      className="flex min-h-svh flex-col justify-center gap-10 py-16"
    >
      <div className="container-page">
        <p className="text-eyebrow text-muted-foreground">
          GSAP + ScrollTrigger
        </p>
        <h2 id="story-title" className="mt-4 text-display-xl">
          A story that <em>moves with</em> the scroll
        </h2>
        <span className="mt-8 block h-px bg-foreground/15">
          <span
            data-story-progress
            className="block h-px origin-left bg-foreground"
          />
        </span>
      </div>
      <div
        data-story-viewport
        className="no-scrollbar overflow-x-auto"
        tabIndex={0}
        aria-label="Steps, scroll sideways"
      >
        <ol data-story-track className="flex w-max gap-4 px-(--page-gutter)">
          {panels.map((panel, i) => (
            <li
              key={panel}
              className="flex aspect-[4/5] w-[78vw] max-w-[26rem] flex-col justify-between rounded-3xl bg-card p-8"
            >
              <span className="text-display-sm text-muted-foreground lining-nums">
                0{i + 1}
              </span>
              <span className="text-display-lg">{panel}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
