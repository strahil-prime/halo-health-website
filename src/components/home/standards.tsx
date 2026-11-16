'use client';

import {
  PenLine,
  ShieldCheck,
  Stethoscope,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ShineBorder } from '@/components/magicui/shine-border';
import { Reveal, SplitWords } from '@/components/motion/reveal';
import { Spotlight } from '@/components/motion/spotlight';
import { standards } from '@/content/home';

const icons: Record<string, LucideIcon> = {
  signature: PenLine,
  shield: ShieldCheck,
  stethoscope: Stethoscope,
  user: UserRound,
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Dark section: the rules we hold ourselves to, and what we leave out. */
export function Standards() {
  return (
    <section
      id="standards"
      aria-labelledby="standards-heading"
      className="theme-ink relative isolate overflow-hidden section-y"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-1/4 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(217_138_91/0.2),transparent)]" />
        <div className="absolute -top-[22rem] left-1/2 halo-ring w-[70rem] -translate-x-1/2 animate-halo-spin opacity-50 [--halo-thickness:1px]" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal y={12}>
            <p className="flex items-center justify-center gap-3 text-eyebrow text-accent">
              <span className="inline-block h-px w-8 bg-accent" />
              {standards.eyebrow}
            </p>
          </Reveal>
          <h2 id="standards-heading" className="mt-6 text-display-xl">
            <SplitWords text={standards.title[0]} className="block" />
            <SplitWords
              text={standards.title[1]}
              delay={0.25}
              className="block"
              wordClassName="text-gradient-warm pr-[0.08em] italic"
            />
          </h2>
          <Reveal delay={0.25}>
            <p className="mt-7 text-lead text-pretty text-muted-foreground">
              {standards.body}
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {standards.cards.map((card, i) => {
            const Icon = icons[card.icon] ?? ShieldCheck;
            return (
              <li key={card.title}>
                <Reveal delay={i * 0.08} className="h-full">
                  <Spotlight className="h-full rounded-3xl border border-border bg-card/70 p-7 backdrop-blur-sm">
                    <span className="grid size-12 place-items-center rounded-full border border-border text-accent transition-transform duration-700 ease-brand group-hover/spot:scale-110 group-hover/spot:-rotate-6">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-10 text-display-md">{card.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {card.body}
                    </p>
                  </Spotlight>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-4">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-7 backdrop-blur-sm sm:p-10 lg:flex lg:items-center lg:gap-16">
            <ShineBorder
              shineColor={['var(--hh-gold)', 'var(--hh-ember)']}
              duration={18}
            />
            <h3 className="shrink-0 text-display-md">
              {standards.wontFindTitle}
            </h3>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-4 lg:mt-0">
              {standards.wontFind.map((item, i) => (
                <li
                  key={item}
                  className="relative text-lg text-muted-foreground"
                >
                  <span className="sr-only">No: </span>
                  {item}
                  <motion.span
                    aria-hidden="true"
                    className="absolute top-1/2 left-0 h-px w-full origin-left bg-ember"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
