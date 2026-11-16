import Image from 'next/image';
import { photos } from '@/assets/home';
import { Segments } from '@/components/brand/headline';
import { PillLink } from '@/components/brand/pill-link';
import { Parallax } from '@/components/motion/parallax';
import { Reveal } from '@/components/motion/reveal';
import { Spotlight } from '@/components/motion/spotlight';
import { places } from '@/content/home';
import { platformLink } from '@/lib/env';
import { cn } from '@/lib/utils';

/** Where care happens: in person at a partner clinic, every day in the app. */
export function Places() {
  return (
    <section
      aria-label="Where care happens"
      className="container-page section-t"
    >
      <ul className="grid gap-4 lg:grid-cols-2">
        {places.map((place, i) => (
          <li key={place.id}>
            <Reveal delay={i * 0.1}>
              <Spotlight className="theme-ink flex min-h-[30rem] flex-col justify-between rounded-3xl p-5 sm:px-6 sm:pt-[1.375rem] sm:pb-7 lg:min-h-[31.25rem]">
                <Parallax amount={5} className="-z-20">
                  <Image
                    src={photos[place.id]}
                    alt={place.imageAlt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className={cn(
                      'object-cover transition-transform duration-[1600ms] ease-brand group-hover/spot:scale-[1.05]',
                      place.id === 'clinic'
                        ? 'object-[50%_30%]'
                        : 'object-[50%_12%]',
                    )}
                  />
                </Parallax>
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 -z-10 h-[72%] bg-linear-to-t from-noir/90 from-22% to-transparent"
                />
                <p className="self-start rounded-full glass-ink px-4 py-2 text-[0.8125rem]">
                  {place.label}
                </p>
                <div className="flex flex-wrap items-end justify-between gap-6 sm:px-2">
                  <div className="flex flex-col gap-4">
                    <h3 className="font-display text-[2.375rem] leading-[1.02] tracking-[-0.01em] sm:text-[2.75rem]">
                      <Segments segments={place.title} />
                    </h3>
                    <ul className="flex flex-col gap-2 text-sm text-linen">
                      {place.points.map((point) => (
                        <li key={point} className="flex items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className="h-px w-3.5 shrink-0 bg-current"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <PillLink
                    href={platformLink('/')}
                    size="md"
                    className="max-sm:w-full"
                  >
                    {place.cta}
                  </PillLink>
                </div>
              </Spotlight>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
