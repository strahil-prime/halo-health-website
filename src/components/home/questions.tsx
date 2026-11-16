'use client';

import { useMachine } from '@xstate/react';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow, Segments } from '@/components/brand/headline';
import { DisclosurePanel, PlusMinus } from '@/components/home/disclosure';
import { Reveal } from '@/components/motion/reveal';
import { questions } from '@/content/home';
import { contactLink } from '@/lib/env';
import { cn } from '@/lib/utils';
import { accordionMachine } from '@/machines/accordion-machine';

/** Frequently asked questions. One answer open at a time. */
export function Questions() {
  const [snapshot, send] = useMachine(accordionMachine, {
    input: { openId: questions.items[0].id, collapsible: true },
  });
  const openId = snapshot.context.openId;

  return (
    <section
      id="questions"
      aria-labelledby="questions-title"
      className="container-page section-t"
    >
      <div className="flex flex-wrap items-start gap-x-14 gap-y-9">
        <Reveal className="flex flex-[1_1_22.5rem] flex-col gap-5">
          <Eyebrow index="05">{questions.eyebrow}</Eyebrow>
          <h2 id="questions-title" className="text-display-lg">
            <Segments segments={questions.title} />
          </h2>
          <p className="max-w-[22.5rem] text-muted-foreground">
            {questions.body}
          </p>
          <a
            href={contactLink('A question about Halo Health')}
            className="group/link flex items-center gap-2.5 self-start link-rule py-3 text-[0.9375rem] font-medium"
          >
            {questions.contactCta}
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={1.6}
              className="size-[0.9375rem] transition-transform duration-500 ease-brand group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </a>
        </Reveal>

        <Reveal delay={0.1} className="flex-[2.2_1_40rem]">
          <ul className="flex flex-col">
            {questions.items.map((item) => {
              const open = item.id === openId;
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
                      open ? 'bg-muted' : 'bg-transparent',
                    )}
                  >
                    <h3>
                      <button
                        type="button"
                        id={`question-${item.id}`}
                        aria-expanded={open}
                        aria-controls={`answer-${item.id}`}
                        onClick={() => send({ type: 'TOGGLE', id: item.id })}
                        className={cn(
                          'group/row flex w-full items-center gap-5 px-4 text-left transition-[padding] duration-500 ease-brand sm:px-[1.625rem]',
                          open ? 'py-5' : 'py-3',
                        )}
                      >
                        <span
                          className={cn(
                            'flex-1 font-display text-[1.5rem] leading-[1.15] transition-transform duration-500 ease-brand sm:text-[1.75rem]',
                            !open && 'group-hover/row:translate-x-1.5',
                          )}
                        >
                          {item.question}
                        </span>
                        <PlusMinus open={open} />
                      </button>
                    </h3>
                    <DisclosurePanel
                      open={open}
                      id={`answer-${item.id}`}
                      labelledBy={`question-${item.id}`}
                      className="px-4 pb-6 sm:px-[1.625rem]"
                    >
                      <p className="max-w-[40rem] text-umber">{item.answer}</p>
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
