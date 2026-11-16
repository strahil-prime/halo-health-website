'use client';

import NumberFlow from '@number-flow/react';
import { useMachine } from '@xstate/react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { photos } from '@/assets/home';
import { Eyebrow } from '@/components/brand/headline';
import { DisclosurePanel, PlusMinus } from '@/components/home/disclosure';
import { Reveal, RevealLines } from '@/components/motion/reveal';
import { programmes } from '@/content/home';
import { platformLink } from '@/lib/env';
import { cn } from '@/lib/utils';
import { accordionMachine } from '@/machines/accordion-machine';

const ease = [0.22, 1, 0.36, 1] as const;
const items = programmes.items;

/**
 * Programmes: an accordion on the right drives the photograph, the counter
 * and the progress marks on the left.
 */
export function Programmes() {
  const [first] = items;
  const [snapshot, send] = useMachine(accordionMachine, {
    input: { openId: first.id, collapsible: false },
  });
  const current =
    items.find((item) => item.id === snapshot.context.openId) ?? first;
  const index = items.indexOf(current);

  return (
    <section
      id="programmes"
      aria-labelledby="programmes-title"
      className="container-page section-t"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div className="flex flex-[2_1_32.5rem] flex-col gap-5">
          <Eyebrow index="02">{programmes.eyebrow}</Eyebrow>
          <h2 id="programmes-title" className="text-display-xl">
            <RevealLines lines={programmes.titleLines} />
          </h2>
        </div>
        <Reveal delay={0.15} className="max-w-[23.75rem] flex-[1_1_18.75rem]">
          <p className="text-muted-foreground">{programmes.body}</p>
        </Reveal>
      </div>

      <div className="flex flex-wrap items-stretch gap-4">
        <Reveal className="theme-ink relative isolate flex min-h-[27rem] flex-[1_1_27.5rem] flex-col justify-between overflow-hidden rounded-3xl p-5 sm:min-h-[32rem] lg:min-h-[36.25rem] lg:px-7 lg:pt-[1.625rem] lg:pb-6">
          <AnimatePresence initial={false}>
            <motion.div
              key={current.id}
              className="absolute inset-0 -z-20"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease }}
            >
              <Image
                src={photos[current.image]}
                alt={current.imageAlt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[40%_30%]"
              />
            </motion.div>
          </AnimatePresence>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[32%] bg-linear-to-b from-noir/65 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-[48%] bg-linear-to-t from-noir/90 to-transparent"
          />

          <p aria-hidden="true" className="flex items-baseline gap-2.5">
            <span className="-my-4 font-display text-[4.75rem] leading-[1.25] lining-nums tabular-nums">
              <NumberFlow
                value={index + 1}
                format={{ minimumIntegerDigits: 2 }}
              />
            </span>
            <span className="text-[0.8125rem] text-linen tabular-nums">
              / 0{items.length}
            </span>
          </p>

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={current.id}
                  className="font-display text-[1.875rem] leading-[1.1]"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                >
                  {current.title}
                </motion.p>
              </AnimatePresence>
              <p className="pb-1 text-[0.8125rem] text-linen">{current.note}</p>
            </div>
            <div
              role="group"
              aria-label="Choose a programme"
              className="grid grid-cols-7 gap-1.5"
            >
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.title}
                  aria-pressed={i === index}
                  onClick={() => send({ type: 'OPEN', id: item.id })}
                  className="group/mark flex h-11 items-center"
                >
                  <span
                    className={cn(
                      'h-[3px] w-full rounded-full transition-[background-color,height] duration-500 ease-brand group-hover/mark:h-[5px]',
                      i === index
                        ? 'bg-cream'
                        : 'bg-cream/30 group-hover/mark:bg-cream/60',
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex-[1.3_1_32.5rem]">
          <ul className="flex flex-col">
            {items.map((item, i) => {
              const open = i === index;
              return (
                <li
                  key={item.id}
                  className={cn(
                    'border-b transition-[border-color] duration-500 ease-brand',
                    open && 'border-transparent',
                  )}
                >
                  <div
                    className={cn(
                      'rounded-2xl transition-[background-color] duration-500 ease-brand',
                      open ? 'theme-nude' : 'bg-transparent',
                    )}
                  >
                    <h3>
                      <button
                        type="button"
                        id={`programme-${item.id}`}
                        aria-expanded={open}
                        aria-controls={`programme-panel-${item.id}`}
                        onClick={() => send({ type: 'OPEN', id: item.id })}
                        className={cn(
                          'group/row flex w-full items-center gap-4 px-4 text-left transition-[padding] duration-500 ease-brand sm:gap-5 lg:px-7',
                          open ? 'py-4' : 'py-[0.5625rem]',
                        )}
                      >
                        <span className="w-7 text-xs font-medium tracking-[0.12em] text-muted-foreground tabular-nums">
                          0{i + 1}
                        </span>
                        <span
                          className={cn(
                            'flex-1 text-display-sm transition-transform duration-500 ease-brand',
                            !open && 'group-hover/row:translate-x-1.5',
                          )}
                        >
                          {item.title}
                        </span>
                        <PlusMinus open={open} />
                      </button>
                    </h3>
                    <DisclosurePanel
                      open={open}
                      id={`programme-panel-${item.id}`}
                      labelledBy={`programme-${item.id}`}
                      className="flex flex-col gap-4 px-4 pb-6 sm:pl-[3.75rem] lg:pr-7 lg:pl-[4.75rem]"
                    >
                      <p className="max-w-[38.75rem] text-umber">{item.body}</p>
                      <ul className="flex flex-wrap gap-2 text-[0.8125rem]">
                        {item.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border px-3.5 py-[0.4375rem]"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      {i === 0 ? (
                        <a
                          href={platformLink('/')}
                          className="group/link flex items-center gap-2.5 self-start link-rule py-2 text-[0.9375rem] font-medium"
                        >
                          {programmes.assessmentCta}
                          <ArrowUpRight
                            aria-hidden="true"
                            strokeWidth={1.6}
                            className="size-[0.9375rem] transition-transform duration-500 ease-brand group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                          />
                        </a>
                      ) : null}
                    </DisclosurePanel>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
