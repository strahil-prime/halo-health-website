import Image from 'next/image';
import { photos } from '@/assets/home';
import { Eyebrow, Segments } from '@/components/brand/headline';
import { Reveal } from '@/components/motion/reveal';
import { journal } from '@/content/home';

/**
 * Journal preview. The journal has not launched, so the cards are not links
 * yet: wrap each article in an anchor when the first pieces are published.
 */
export function Journal() {
  return (
    <section
      id="journal"
      aria-labelledby="journal-title"
      className="container-page section-t"
    >
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div className="flex flex-col gap-5">
          <Eyebrow index="06">{journal.eyebrow}</Eyebrow>
          <h2 id="journal-title" className="text-display-xl">
            <Segments segments={journal.title} />
          </h2>
        </div>
        <p className="flex min-h-[3.125rem] items-center gap-2.5 rounded-full border border-foreground/40 px-6 text-sm font-medium">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-accent"
          />
          {journal.status}
        </p>
      </Reveal>

      <ul className="grid gap-x-4 gap-y-9 md:grid-cols-3">
        {journal.articles.map((article, i) => (
          <li key={article.title}>
            <Reveal delay={i * 0.08}>
              <article className="group/photo flex flex-col gap-[1.125rem]">
                <div className="theme-ink relative aspect-[3/2] overflow-hidden rounded-2xl">
                  <Image
                    src={photos[article.image]}
                    alt={article.imageAlt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-brand group-hover/photo:scale-[1.06]"
                  />
                </div>
                <div className="flex flex-col gap-2.5 px-1.5">
                  <p className="text-eyebrow text-muted-foreground">
                    {article.topic}
                  </p>
                  <h3 className="text-display-sm">{article.title}</h3>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
