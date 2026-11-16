import { Eyebrow, Segments } from '@/components/brand/headline';
import { ArrowBadge, PillLink } from '@/components/brand/pill-link';
import { Reveal } from '@/components/motion/reveal';
import { cta, organisations } from '@/content/home';
import { contactLink } from '@/lib/env';
import { cn } from '@/lib/utils';

const numerals = ['I', 'II', 'III'] as const;

/** For employers, insurers and medical groups, on the brand nude. */
export function Organisations() {
  return (
    <section
      id="organisations"
      aria-labelledby="organisations-title"
      className="inset-x section-t"
    >
      <div className="theme-nude rounded-3xl band-x py-10 lg:py-12">
        <div className="mx-auto flex max-w-[85rem] flex-wrap items-stretch gap-x-14 gap-y-10">
          <Reveal className="flex flex-[1_1_22.5rem] flex-col justify-between gap-8">
            <div className="flex flex-col gap-5">
              <Eyebrow index="04">{organisations.eyebrow}</Eyebrow>
              <h2 id="organisations-title" className="text-display-lg">
                <Segments segments={organisations.title} />
              </h2>
              <p className="max-w-[25rem] text-muted-foreground">
                {organisations.body}
              </p>
            </div>
            <PillLink
              href={contactLink('Halo Health for organisations')}
              className="self-start max-sm:w-full"
            >
              {cta.team}
            </PillLink>
          </Reveal>

          <ul className="grid flex-[2.2_1_40rem] gap-4 sm:grid-cols-3">
            {organisations.cards.map((card, i) => {
              const featured = i === organisations.cards.length - 1;
              return (
                <li key={card.title}>
                  <Reveal delay={0.1 + i * 0.08} className="h-full">
                    <a
                      href={contactLink(`Halo Health for ${card.title}`)}
                      className={cn(
                        'group/arrow flex h-full min-h-[13rem] flex-col justify-between gap-10 rounded-2xl border px-[1.625rem] pt-[1.625rem] pb-6 transition-[background-color,color,border-color,translate] duration-500 ease-brand hover:-translate-y-1 sm:min-h-[18.125rem]',
                        featured
                          ? 'theme-ink border-transparent'
                          : 'hover:border-ink hover:bg-ink hover:text-cream',
                      )}
                    >
                      <span className="flex items-center justify-between">
                        <span className="text-eyebrow opacity-70">
                          {numerals[i]}
                        </span>
                        <ArrowBadge
                          tone={featured ? 'solid' : 'line'}
                          className={
                            featured
                              ? undefined
                              : 'group-hover/arrow:border-cream group-hover/arrow:bg-cream group-hover/arrow:text-ink'
                          }
                        />
                      </span>
                      <span className="flex flex-col gap-2.5">
                        <span className="font-display text-[2.125rem] leading-[1.05]">
                          {card.title}
                        </span>
                        <span className="text-sm leading-[1.55] opacity-75">
                          {card.body}
                        </span>
                      </span>
                    </a>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
