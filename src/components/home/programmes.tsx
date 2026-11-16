'use client';

import { useMachine } from '@xstate/react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { SectionHeading } from '@/components/home/section-heading';
import { Reveal } from '@/components/motion/reveal';
import { Spotlight } from '@/components/motion/spotlight';
import { Button } from '@/components/ui/button';
import {
  programmeFilters,
  programmes,
  type ProgrammeCategory,
} from '@/content/home';
import { platformLink } from '@/lib/env';
import { cn } from '@/lib/utils';
import { programmeFilterMachine } from '@/machines/programme-filter-machine';

const ease = [0.22, 1, 0.36, 1] as const;

/** Card art: one gradient per category, each with its own halo. */
const art: Record<ProgrammeCategory, string> = {
  assess:
    'bg-[radial-gradient(120%_120%_at_0%_0%,var(--hh-glow),var(--hh-nude)_45%,var(--hh-ember)_120%)]',
  body: 'bg-[radial-gradient(120%_120%_at_100%_0%,var(--hh-gold),var(--hh-ember)_55%,var(--hh-clay)_120%)]',
  mind: 'bg-[radial-gradient(120%_120%_at_50%_110%,var(--hh-nude),var(--hh-nude-deep)_50%,var(--hh-taupe)_140%)]',
  living:
    'bg-[radial-gradient(120%_120%_at_0%_100%,var(--hh-ink-3),var(--hh-ink)_60%)]',
};

const categoryLabel: Record<ProgrammeCategory, string> = {
  assess: 'Assess',
  body: 'Body',
  mind: 'Mind',
  living: 'Longevity living',
};

export function Programmes() {
  const [snapshot, send] = useMachine(programmeFilterMachine);
  const { filter } = snapshot.context;
  const visible = programmes.filter(
    (p) => filter === 'all' || p.category === filter,
  );

  return (
    <section
      id="programmes"
      aria-labelledby="programmes-heading"
      className="bg-muted section-y"
    >
      <div className="container-page">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            id="programmes-heading"
            eyebrow="Programmes"
            title="Programmes that meet you where you are."
            body="Your assessment and your physician point to what matters most for you. These are the programmes your plan can draw on."
          />

          <Reveal
            delay={0.1}
            className="-mx-[var(--page-gutter)] [scrollbar-width:none] overflow-x-auto px-[var(--page-gutter)]"
          >
            <div
              role="group"
              aria-label="Filter programmes"
              className="inline-flex rounded-full bg-background p-1.5"
            >
              {programmeFilters.map((item) => {
                const selected = item.id === filter;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => send({ type: 'FILTER', filter: item.id })}
                    className={cn(
                      'relative min-h-11 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors duration-300',
                      selected
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="programme-filter-pill"
                        className="absolute inset-0 rounded-full bg-primary"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((programme, i) => (
              <motion.li
                key={programme.title}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.55, ease, delay: i * 0.03 }}
              >
                <Spotlight className="h-full rounded-3xl bg-card p-2.5 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgb(20_16_13/0.35)]">
                  <article className="flex h-full flex-col">
                    <div
                      aria-hidden="true"
                      className={cn(
                        'relative h-36 overflow-hidden rounded-2xl sm:h-44',
                        art[programme.category],
                      )}
                    >
                      <div
                        className={cn(
                          'absolute -right-10 -bottom-16 size-52 rounded-full border transition-transform duration-1000 ease-brand group-hover/spot:scale-125',
                          programme.category === 'living'
                            ? 'border-bone/40'
                            : 'border-ink/30',
                        )}
                      />
                      <div
                        className={cn(
                          'absolute -right-2 -bottom-24 size-52 rounded-full border transition-transform duration-1000 ease-brand group-hover/spot:scale-110',
                          programme.category === 'living'
                            ? 'border-bone/20'
                            : 'border-ink/15',
                        )}
                      />
                      <div className="grain absolute inset-0" />
                      <span
                        className={cn(
                          'absolute top-4 left-4 rounded-full px-3 py-2 text-eyebrow backdrop-blur-sm',
                          programme.category === 'living'
                            ? 'bg-bone/12 text-bone'
                            : 'bg-bone/55 text-ink',
                        )}
                      >
                        {categoryLabel[programme.category]}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col px-4 pt-6 pb-4">
                      <h3 className="text-display-md">{programme.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground">
                        {programme.body}
                      </p>
                      <p className="[margin-block-start:1.5rem] mt-auto border-t border-border pt-4 text-sm font-medium text-foreground">
                        {programme.format}
                      </p>
                    </div>
                  </article>
                </Spotlight>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-xl text-muted-foreground">
            Not sure where to begin? You do not have to choose. The assessment
            shows you your starting point.
          </p>
          <Button asChild size="lg">
            <a href={platformLink('/')}>
              Find your starting point <ArrowUpRight />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
