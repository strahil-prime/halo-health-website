import Image from 'next/image';
import { photos } from '@/assets/home';
import { PillLink } from '@/components/brand/pill-link';
import { Magnetic } from '@/components/motion/magnetic';
import { Parallax } from '@/components/motion/parallax';
import { Reveal, RevealLines } from '@/components/motion/reveal';
import { closing, cta } from '@/content/home';
import { contactLink, platformLink } from '@/lib/env';

/** The last invitation, over the dawn photograph. */
export function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="inset-x section-t">
      <div className="theme-ink relative isolate flex min-h-[32rem] flex-col justify-end overflow-hidden rounded-3xl px-5 py-8 sm:px-8 lg:min-h-[31.25rem] lg:px-10 lg:py-14">
        <Parallax amount={8} className="-z-20">
          <Image
            src={photos.closing}
            alt={closing.imageAlt}
            fill
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-[78%_38%] lg:object-[50%_38%]"
          />
        </Parallax>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-t from-noir/85 from-10% to-transparent to-80% lg:bg-linear-to-r lg:from-noir/75 lg:from-0% lg:via-noir/30 lg:via-48% lg:to-transparent lg:to-72%"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-linear-to-t from-noir/70 to-transparent max-lg:hidden"
        />
        <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

        <div className="flex max-w-[58rem] flex-col gap-6">
          <Reveal y={16}>
            <p className="flex items-center gap-3.5 text-eyebrow text-linen">
              <span
                aria-hidden="true"
                className="h-px w-11 bg-current opacity-60"
              />
              {closing.eyebrow}
            </p>
          </Reveal>
          <h2
            id="closing-title"
            className="font-display text-[clamp(2.5rem,1.2rem+5vw,4.75rem)] leading-none tracking-[-0.02em] text-balance"
          >
            <RevealLines lines={closing.title} />
          </h2>
          <Reveal delay={0.25}>
            <p className="max-w-[28.75rem] text-lead text-linen">
              {closing.body}
            </p>
          </Reveal>
          <Reveal
            delay={0.35}
            className="flex flex-wrap items-center gap-3 max-sm:flex-col max-sm:items-stretch"
          >
            <Magnetic strength={0.18} className="max-sm:block!">
              <PillLink href={platformLink('/')} className="max-sm:w-full">
                {cta.primary}
              </PillLink>
            </Magnetic>
            <PillLink
              href={contactLink('Talk to the Halo Health team')}
              variant="outline"
            >
              {cta.team}
            </PillLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
