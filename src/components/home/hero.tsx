'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { HaloParticles } from '@/components/home/halo-particles';
import { Magnetic } from '@/components/motion/magnetic';
import { Reveal, SplitWords } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { hero } from '@/content/home';
import { platformLink } from '@/lib/env';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The hero. A living "halo" (the ring from the logo) made of light:
 * conic-gradient rings that turn slowly, a breathing glow, drifting dust,
 * pointer parallax (GSAP quickTo) and a scroll-scrubbed exit (ScrollTrigger).
 * To use film instead, drop a <video> into the `data-hero-media` layer.
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Scroll: the halo swells and the copy lifts away.
        gsap.to('[data-halo-scroll]', {
          scale: 1.35,
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to('[data-hero-copy]', {
          yPercent: -18,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: '70% top',
            scrub: true,
          },
        });
      });

      mm.add(
        '(prefers-reduced-motion: no-preference) and (pointer: fine)',
        () => {
          // Pointer: layers drift at different depths.
          const layers = gsap.utils.toArray<HTMLElement>('[data-depth]');
          const movers = layers.map((layer) => ({
            depth: Number(layer.dataset.depth),
            x: gsap.quickTo(layer, 'x', { duration: 1.2, ease: 'power3.out' }),
            y: gsap.quickTo(layer, 'y', { duration: 1.2, ease: 'power3.out' }),
          }));
          const onMove = (event: PointerEvent) => {
            const nx = event.clientX / window.innerWidth - 0.5;
            const ny = event.clientY / window.innerHeight - 0.5;
            for (const m of movers) {
              m.x(nx * m.depth);
              m.y(ny * m.depth);
            }
          };
          window.addEventListener('pointermove', onMove);
          return () => window.removeEventListener('pointermove', onMove);
        },
      );
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="top"
      className="theme-ink relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      {/* ---------- Media layer ---------- */}
      <div
        data-hero-media
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Warm atmosphere */}
        <div
          data-depth="-14"
          className="absolute inset-[-10%] bg-[radial-gradient(48%_42%_at_72%_42%,rgb(217_138_91/0.34),transparent_72%),radial-gradient(40%_36%_at_18%_88%,rgb(236_196_151/0.14),transparent_70%)] max-lg:bg-[radial-gradient(90%_40%_at_60%_26%,rgb(217_138_91/0.34),transparent_72%)]"
        />

        {/* The halo */}
        <div className="absolute top-[30%] left-[62%] w-[clamp(24rem,118vw,34rem)] -translate-x-1/2 -translate-y-1/2 lg:top-[47%] lg:left-[71%] lg:w-[clamp(34rem,52vw,54rem)]">
          <div data-depth="34">
            <div data-halo-scroll>
              <motion.div
                className="relative aspect-square"
                initial={{ opacity: 0, scale: 0.82, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 2.4, ease }}
              >
                {/* Inner light */}
                <div className="absolute inset-[6%] animate-halo-breathe rounded-full bg-[radial-gradient(closest-side,rgb(251_230_204/0.16),rgb(217_138_91/0.07)_55%,transparent)]" />
                {/* Glow */}
                <div className="absolute inset-0 halo-ring animate-halo-spin opacity-80 blur-2xl [--halo-thickness:3.5rem]" />
                <div className="absolute inset-0 halo-ring animate-halo-spin opacity-90 blur-md [--halo-thickness:0.6rem]" />
                {/* Crisp ring */}
                <div className="absolute inset-0 halo-ring animate-halo-spin [--halo-thickness:1.5px]" />
                {/* Outer counter-ring */}
                <div className="absolute inset-[-11%] halo-ring animate-[halo-spin_46s_linear_infinite_reverse] opacity-45 [--halo-thickness:1px]" />
                {/* The two arcs of the logo */}
                <svg
                  viewBox="0 0 200 200"
                  fill="none"
                  className="absolute inset-[-4.5%] size-[109%] text-bone/55"
                >
                  <motion.path
                    d="M 88 3 A 97 97 0 0 1 193 76"
                    stroke="currentColor"
                    strokeWidth="0.35"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.6, delay: 0.5, ease }}
                  />
                  <motion.path
                    d="M 112 197 A 97 97 0 0 1 7 124"
                    stroke="currentColor"
                    strokeWidth="0.35"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.6, delay: 0.8, ease }}
                  />
                </svg>
                <HaloParticles />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Legibility + texture */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-transparent max-lg:bg-gradient-to-t max-lg:via-ink/70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div className="grain absolute inset-0" />
      </div>

      {/* ---------- Copy ---------- */}
      <div
        data-hero-copy
        className="container-page flex flex-1 flex-col justify-end pt-[calc(var(--header-height)+3rem)] pb-10 lg:justify-center lg:pb-0"
      >
        <Reveal immediate delay={0.2} y={12}>
          <p className="flex items-center gap-3 text-eyebrow text-accent">
            <span className="inline-block h-px w-8 bg-accent" />
            {hero.eyebrow}
          </p>
        </Reveal>

        <h1 className="mt-7 max-w-[14ch] text-display-2xl text-balance">
          <span className="sr-only">
            {hero.titleLines
              .flat()
              .map((part) => part.text)
              .join(' ')}
          </span>
          <span aria-hidden="true">
            {hero.titleLines.map((line, lineIndex) => (
              <span key={lineIndex} className="block">
                {line.map((part, partIndex) => (
                  <SplitWords
                    key={part.text}
                    immediate
                    text={part.text}
                    delay={0.35 + lineIndex * 0.28 + partIndex * 0.12}
                    className="block"
                    wordClassName={
                      'em' in part && part.em
                        ? 'text-gradient-warm pr-[0.06em] italic'
                        : undefined
                    }
                  />
                ))}
              </span>
            ))}
          </span>
        </h1>

        <Reveal immediate delay={1.15} className="mt-8 max-w-xl">
          <p className="text-lead text-foreground/80">{hero.body}</p>
        </Reveal>

        <Reveal
          immediate
          delay={1.3}
          className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-4"
        >
          <Magnetic>
            <Button asChild size="lg" className="pr-5">
              <a href={platformLink('/')}>
                {hero.primaryCta}
                <span className="grid size-8 place-items-center rounded-full bg-ink text-bone transition-transform duration-500 group-hover/button:rotate-45">
                  <ArrowUpRight />
                </span>
              </a>
            </Button>
          </Magnetic>
          <Button asChild size="lg" variant="ghost">
            <a href="#how-it-works">
              {hero.secondaryCta}
              <ArrowDown className="transition-transform duration-300 group-hover/button:translate-y-0.5" />
            </a>
          </Button>
        </Reveal>
      </div>

      {/* ---------- Assurances ---------- */}
      <Reveal
        immediate
        delay={1.6}
        y={12}
        className="container-page pb-20 lg:pb-24"
      >
        <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm text-foreground/75">
          {hero.assurances.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="size-4 text-accent" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
