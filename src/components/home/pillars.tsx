import Image from 'next/image';
import { photos } from '@/assets/home';
import { Asterisk } from '@/components/brand/headline';
import { Reveal } from '@/components/motion/reveal';
import { ScrollWords } from '@/components/motion/scroll-words';
import { pillars, statement } from '@/content/home';

/** The statement, then the four pillars of lifestyle medicine as photo cards. */
export function Pillars() {
  return (
    <section
      aria-labelledby="pillars-title"
      className="container-page section-t"
    >
      <div className="flex flex-wrap items-start gap-x-10 gap-y-6">
        <p className="flex flex-[1_1_13.75rem] items-center gap-3 text-eyebrow text-muted-foreground lg:pt-3.5">
          <Asterisk className="text-accent" />
          {statement.eyebrow}
        </p>
        <h2 id="pillars-title" className="flex-[4_1_40rem] text-display-xl">
          <ScrollWords segments={statement.title} />
        </h2>
      </div>

      {/* A swipeable row on phones, a grid from tablet up. */}
      <ul className="-mx-(--page-gutter) mt-10 no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-(--page-gutter) sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:mt-14 lg:grid-cols-4">
        {pillars.map((pillar, i) => (
          <li key={pillar.id} className="min-w-[78%] snap-center sm:min-w-0">
            <Reveal delay={(i % 4) * 0.08}>
              <article className="group/photo theme-ink relative isolate flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl p-4">
                <Image
                  src={photos[pillar.id]}
                  alt={pillar.imageAlt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 78vw"
                  className="-z-20 object-cover transition-transform duration-[1600ms] ease-brand group-hover/photo:scale-[1.07]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 -z-10 h-[58%] bg-linear-to-t from-noir/85 to-transparent transition-opacity duration-700 group-hover/photo:opacity-90"
                />
                <p className="flex items-center gap-2.5 self-start rounded-full glass-ink py-1.5 pr-4 pl-1.5 text-[0.8125rem]">
                  <span className="grid size-[1.875rem] place-items-center rounded-full bg-primary text-[0.6875rem] font-semibold text-primary-foreground tabular-nums">
                    0{i + 1}
                  </span>
                  {pillar.area}
                </p>
                <div className="flex flex-col gap-2 px-1.5 pb-1.5 transition-transform duration-700 ease-brand group-hover/photo:-translate-y-1.5">
                  <h3 className="text-display-md">{pillar.title}</h3>
                  <p className="text-sm leading-normal text-linen">
                    {pillar.body}
                  </p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
