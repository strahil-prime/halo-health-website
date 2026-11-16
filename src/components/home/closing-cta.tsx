import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from '@/components/motion/magnetic';
import { Reveal, SplitWords } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { closing } from '@/content/home';
import { contactLink, platformLink } from '@/lib/env';

export function ClosingCta() {
  return (
    <section
      aria-labelledby="closing-heading"
      className="bg-background px-3 pb-3 sm:px-5 sm:pb-5"
    >
      <div className="theme-ink relative isolate overflow-hidden rounded-[2.5rem] px-6 py-28 text-center sm:py-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute top-full left-1/2 w-[min(120vw,64rem)] -translate-x-1/2 -translate-y-[30%] sm:-translate-y-[36%]">
            <div className="aspect-square animate-halo-breathe rounded-full bg-[radial-gradient(closest-side,rgb(217_138_91/0.4),rgb(236_196_151/0.12)_60%,transparent)]" />
            <div className="absolute inset-[8%] halo-ring animate-halo-spin opacity-80 blur-xl [--halo-thickness:2rem]" />
            <div className="absolute inset-[8%] halo-ring animate-halo-spin [--halo-thickness:1.5px]" />
          </div>
          <div className="grain absolute inset-0" />
        </div>

        <h2 id="closing-heading" className="mx-auto max-w-4xl text-display-xl">
          <SplitWords text={closing.title[0]} className="block" />
          <SplitWords
            text={closing.title[1]}
            delay={0.25}
            className="block"
            wordClassName="text-gradient-warm pr-[0.08em] italic"
          />
        </h2>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-7 max-w-xl text-lead text-pretty text-muted-foreground">
            {closing.body}
          </p>
        </Reveal>
        <Reveal
          delay={0.4}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic>
            <Button asChild size="lg" className="pr-5">
              <a href={platformLink('/')}>
                {closing.primaryCta}
                <span className="grid size-8 place-items-center rounded-full bg-ink text-bone transition-transform duration-500 group-hover/button:rotate-45">
                  <ArrowUpRight />
                </span>
              </a>
            </Button>
          </Magnetic>
          <Button asChild size="lg" variant="outline">
            <a href={contactLink('Halo Health enquiry')}>
              {closing.secondaryCta}
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
