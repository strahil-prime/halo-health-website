'use client';

import { Check } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';
import { photos } from '@/assets/home';
import { ArrowBadge, PillLink } from '@/components/brand/pill-link';
import { Reveal, RevealLines } from '@/components/motion/reveal';
import { cta, hero } from '@/content/home';
import { platformLink } from '@/lib/env';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // The photograph sinks and, on wide screens, the copy lifts away as the
  // hero leaves. On phones the hero is taller than the screen, so the copy
  // stays put (see the max-lg overrides below).
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const copyOpacity = useTransform(scrollYProgress, [0.25, 0.8], [1, 0]);

  return (
    <section id="top" aria-label="Introduction" className="inset-x">
      <div
        ref={ref}
        className="theme-ink relative isolate flex min-h-[clamp(40rem,calc(100svh-3.5rem),55rem)] flex-col overflow-hidden rounded-3xl"
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 -top-[2%] -bottom-[16%] -z-10"
          style={{ y: reduce ? 0 : imageY }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.6, ease }}
          >
            <Image
              src={photos.hero}
              alt=""
              fill
              priority
              placeholder="blur"
              sizes="100vw"
              className="object-cover object-[92%_22%] sm:object-[80%_30%] lg:object-[72%_30%]"
            />
          </motion.div>
        </motion.div>
        {/* Scrims: left for the headline on wide screens, bottom on phones. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-t from-noir from-28% via-noir/80 via-50% to-noir/10 to-78% lg:bg-linear-to-r lg:from-noir/80 lg:from-0% lg:via-noir/40 lg:via-40% lg:to-transparent lg:to-66%"
        />
        <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

        <motion.div
          style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
          className="flex flex-1 flex-col justify-end gap-8 px-5 pt-[clamp(11rem,64svh-11.75rem,26rem)] pb-7 max-lg:transform-none! max-lg:opacity-100! sm:px-8 sm:pt-72 lg:justify-between lg:px-10 lg:pt-36 lg:pb-8"
        >
          <div className="flex max-w-[47.5rem] flex-col gap-6 lg:gap-7">
            <Reveal immediate delay={0.25} y={16}>
              <p className="flex items-center gap-3.5 text-eyebrow text-linen">
                <span
                  aria-hidden="true"
                  className="h-px w-11 bg-current opacity-60 max-sm:hidden"
                />
                {hero.eyebrow}
              </p>
            </Reveal>
            <h1 className="text-display-2xl">
              <RevealLines
                immediate
                lines={hero.titleLines}
                delay={0.35}
                stagger={0.13}
              />
            </h1>
            <Reveal immediate delay={0.85} y={20}>
              <p className="max-w-[29.5rem] text-lead text-linen">
                {hero.body}
              </p>
            </Reveal>
            <Reveal
              immediate
              delay={1}
              y={20}
              className="flex flex-wrap items-center gap-3 max-sm:flex-col max-sm:items-stretch"
            >
              <PillLink href={platformLink('/')}>{cta.primary}</PillLink>
              <PillLink href="#how-it-works" variant="outline">
                {hero.secondaryCta}
              </PillLink>
            </Reveal>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal immediate delay={1.2} y={16}>
              <ul className="flex flex-wrap gap-x-9 gap-y-3 border-t border-cream/20 pt-5 text-sm text-linen">
                {hero.assurances.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <Check
                      aria-hidden="true"
                      strokeWidth={1.6}
                      className="size-4 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal immediate delay={1.35} y={24} className="max-lg:hidden">
              <a
                href="#programmes"
                className="group/arrow flex w-[21.25rem] items-center gap-[1.125rem] rounded-[1.375rem] glass-ink bg-noir/55 py-[1.125rem] pr-[1.125rem] pl-[1.375rem] transition-[background-color,translate] duration-500 ease-brand hover:-translate-y-1 hover:bg-noir/70"
              >
                <span className="flex flex-1 flex-col gap-1.5">
                  <span className="text-eyebrow text-linen">
                    {hero.firstStep.eyebrow}
                  </span>
                  <span className="font-display text-[1.625rem] leading-[1.1]">
                    {hero.firstStep.title}
                  </span>
                  <span className="text-[0.8125rem] leading-normal text-linen">
                    {hero.firstStep.body}
                  </span>
                </span>
                <ArrowBadge tone="line" className="size-11" />
              </a>
            </Reveal>
          </div>
        </motion.div>
        <span className="sr-only">{hero.imageAlt}</span>
      </div>
    </section>
  );
}
