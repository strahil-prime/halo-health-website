'use client';

import { ArrowUpRight, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { SectionHeading } from '@/components/home/section-heading';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { organisations } from '@/content/home';
import { contactLink } from '@/lib/env';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;

/** B2B: insurers, medical groups, employers. Proper ARIA tabs. */
export function Organisations() {
  const [activeId, setActiveId] = useState<string>(organisations.tabs[0].id);
  const active =
    organisations.tabs.find((tab) => tab.id === activeId) ??
    organisations.tabs[0];

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const delta =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? 1
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? -1
          : 0;
    if (!delta) return;
    event.preventDefault();
    const count = organisations.tabs.length;
    const next = organisations.tabs[(index + delta + count) % count];
    if (!next) return;
    setActiveId(next.id);
    document.getElementById(`org-tab-${next.id}`)?.focus();
  }

  return (
    <section
      id="organisations"
      aria-labelledby="organisations-heading"
      className="bg-muted section-y"
    >
      <div className="container-page">
        <SectionHeading
          id="organisations-heading"
          eyebrow={organisations.eyebrow}
          title={organisations.title}
          body={organisations.body}
        />

        <Reveal className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div
            role="tablist"
            aria-label="Type of organisation"
            aria-orientation="vertical"
            className="flex flex-col"
          >
            {organisations.tabs.map((tab, i) => {
              const selected = tab.id === active.id;
              return (
                <button
                  key={tab.id}
                  id={`org-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="org-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(tab.id)}
                  onKeyDown={(event) => onKeyDown(event, i)}
                  className={cn(
                    'group relative flex items-baseline gap-5 border-t border-foreground/15 py-6 text-left transition-colors duration-500 last:border-b',
                    selected
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="org-tab-line"
                      className="absolute -top-px left-0 h-px w-full bg-clay"
                      transition={{ duration: 0.6, ease }}
                    />
                  )}
                  <span className="text-xs tabular-nums">0{i + 1}</span>
                  <span className="font-display text-4xl transition-transform duration-500 ease-brand group-hover:translate-x-1.5 sm:text-5xl">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="org-panel"
            role="tabpanel"
            aria-labelledby={`org-tab-${active.id}`}
            tabIndex={0}
            className="relative min-h-[26rem] overflow-hidden rounded-3xl bg-card p-7 sm:p-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 -right-40 size-96 rounded-full bg-gradient-dawn opacity-60 blur-3xl"
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease }}
                className="relative"
              >
                <h3 className="max-w-md text-display-md">{active.title}</h3>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                  {active.body}
                </p>
                <ul className="mt-8 flex flex-col gap-3.5">
                  {active.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-secondary">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="mt-10">
                  <a
                    href={contactLink(
                      `Halo Health for ${active.label.toLowerCase()}`,
                    )}
                  >
                    {organisations.cta} <ArrowUpRight />
                  </a>
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
