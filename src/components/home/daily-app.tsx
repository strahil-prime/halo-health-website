'use client';

import NumberFlow from '@number-flow/react';
import { useMachine } from '@xstate/react';
import { Check, LifeBuoy } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/home/section-heading';
import { Reveal } from '@/components/motion/reveal';
import { daily } from '@/content/home';
import { cn } from '@/lib/utils';
import { dailyActionsMachine } from '@/machines/daily-actions-machine';

const ease = [0.22, 1, 0.36, 1] as const;
const RING = 2 * Math.PI * 26;

/**
 * App preview. The checklist is live: tick an action and the progress ring,
 * count (NumberFlow) and state (XState) all respond.
 */
export function DailyApp() {
  const [snapshot, send] = useMachine(dailyActionsMachine, {
    input: { done: daily.phone.actions.map((a) => a.done) },
  });
  const { done } = snapshot.context;
  const count = done.filter(Boolean).length;
  const total = done.length;
  const complete = snapshot.matches('complete');

  return (
    <section
      id="daily"
      aria-labelledby="daily-heading"
      className="overflow-hidden bg-background section-y"
    >
      <div className="container-page grid items-center gap-x-16 gap-y-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="daily-heading"
            eyebrow={daily.eyebrow}
            title={daily.title}
            body={daily.body}
          />
          <ul className="mt-10 flex flex-col gap-4">
            {daily.points.map((point, i) => (
              <li key={point}>
                <Reveal
                  delay={0.1 + i * 0.08}
                  className="flex items-center gap-4"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-lg">{point}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal y={48} className="relative mx-auto w-full max-w-[22rem]">
          {/* Halo behind the phone */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[150%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="aspect-square rounded-full bg-gradient-dawn opacity-70 blur-3xl" />
            <div className="absolute inset-[6%] halo-ring animate-halo-spin [--halo-thickness:1.5px]" />
          </div>

          <div className="rounded-[3rem] bg-ink p-2.5 shadow-[0_50px_100px_-40px_rgb(20_16_13/0.6)]">
            <div className="relative overflow-hidden rounded-[2.4rem] bg-bone px-5 pt-12 pb-6">
              <span
                aria-hidden="true"
                className="absolute top-3 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-ink"
              />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {daily.phone.greeting}
                  </p>
                  <p className="font-display text-4xl">{daily.phone.heading}</p>
                </div>
                <div className="relative grid size-16 place-items-center">
                  <svg
                    viewBox="0 0 60 60"
                    className="absolute inset-0 -rotate-90"
                    aria-hidden="true"
                  >
                    <circle
                      cx="30"
                      cy="30"
                      r="26"
                      fill="none"
                      strokeWidth="3"
                      className="stroke-nude"
                    />
                    <motion.circle
                      cx="30"
                      cy="30"
                      r="26"
                      fill="none"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="stroke-clay"
                      strokeDasharray={RING}
                      initial={false}
                      animate={{ strokeDashoffset: RING * (1 - count / total) }}
                      transition={{ duration: 0.8, ease }}
                    />
                  </svg>
                  <p
                    className="text-sm font-semibold tabular-nums"
                    aria-label={`${count} of ${total} actions done`}
                  >
                    <NumberFlow value={count} />/{total}
                  </p>
                </div>
              </div>

              <ul className="mt-6 flex flex-col gap-2.5">
                {daily.phone.actions.map((action, i) => {
                  const checked = done[i] ?? false;
                  return (
                    <li key={action.label}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={checked}
                        onClick={() => send({ type: 'TOGGLE', index: i })}
                        className={cn(
                          'flex min-h-16 w-full items-center gap-3.5 rounded-2xl border px-4 py-3 text-left transition-[background-color,border-color,transform] duration-500 ease-brand active:scale-[0.98]',
                          checked
                            ? 'border-transparent bg-sand'
                            : 'border-border bg-white hover:border-clay/50',
                        )}
                      >
                        <span
                          className={cn(
                            'grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-300',
                            checked
                              ? 'border-clay bg-clay text-bone'
                              : 'border-ink/30',
                          )}
                        >
                          <motion.span
                            initial={false}
                            animate={{
                              scale: checked ? 1 : 0,
                              rotate: checked ? 0 : -45,
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 500,
                              damping: 22,
                            }}
                          >
                            <Check
                              className="size-3.5"
                              strokeWidth={3}
                              aria-hidden="true"
                            />
                          </motion.span>
                        </span>
                        <span className="min-w-0">
                          <span
                            className={cn(
                              'block text-sm font-medium transition-colors duration-300',
                              checked && 'text-muted-foreground line-through',
                            )}
                          >
                            {action.label}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {action.meta}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 flex items-center justify-between">
                <p
                  aria-live="polite"
                  className={cn(
                    'text-xs font-medium transition-colors duration-500',
                    complete ? 'text-clay' : 'text-muted-foreground',
                  )}
                >
                  {complete
                    ? 'All done for today. Well done.'
                    : 'Tap an action to tick it off'}
                </p>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <LifeBuoy className="size-3.5" aria-hidden="true" /> Help
                </span>
              </div>
            </div>
          </div>
          <p className="mt-5 text-center text-xs text-muted-foreground">
            {daily.phone.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
