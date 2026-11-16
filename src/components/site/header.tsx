'use client';

import { useMachine } from '@xstate/react';
import { ArrowUpRight } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { nav } from '@/content/home';
import { platformLink } from '@/lib/env';
import { cn } from '@/lib/utils';
import { menuMachine } from '@/machines/menu-machine';

const ease = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [snapshot, send] = useMachine(menuMachine);
  const open = snapshot.matches('open');
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Solid after the first few pixels; tucks away on the way down,
  // returns the moment the visitor scrolls up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 480 && y > previous);
  });

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        send({ type: 'CLOSE' });
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, send]);

  const solid = scrolled && !open;

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ duration: 0.5, ease }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-colors duration-500 sm:px-5 sm:pt-4',
          solid ? 'text-ink' : 'text-bone',
        )}
      >
        <div
          className={cn(
            'mx-auto flex h-16 max-w-[82rem] items-center justify-between gap-6 rounded-full border pr-2.5 pl-5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-brand sm:pl-7',
            solid
              ? 'border-ink/8 bg-bone/80 shadow-[0_12px_40px_-18px_rgb(20_16_13/0.35)] backdrop-blur-xl'
              : 'border-transparent bg-transparent',
          )}
        >
          <a
            href="#top"
            className="-my-2 flex shrink-0 items-center rounded-full"
            onClick={() => send({ type: 'CLOSE' })}
          >
            <Logo className="h-12 sm:h-[3.25rem]" />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm font-medium">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-underline py-2 opacity-85 transition-opacity hover:opacity-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div
              className={cn(
                !solid && 'theme-ink !bg-transparent',
                'hidden sm:block',
              )}
            >
              <Button asChild size="sm" className="pr-3.5">
                <a href={platformLink('/')}>
                  Start your assessment
                  <ArrowUpRight className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
                </a>
              </Button>
            </div>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => send({ type: 'TOGGLE' })}
              className="relative grid size-11 place-items-center rounded-full lg:hidden"
            >
              <span
                className={cn(
                  'absolute h-px w-5 bg-current transition-transform duration-500 ease-brand',
                  open ? 'rotate-45' : '-translate-y-[4px]',
                )}
              />
              <span
                className={cn(
                  'absolute h-px w-5 bg-current transition-transform duration-500 ease-brand',
                  open ? '-rotate-45' : 'translate-y-[4px]',
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="theme-ink fixed inset-0 z-40 flex flex-col overflow-y-auto px-6 pt-28 pb-8 lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.75rem) 2.75rem)' }}
            animate={{
              clipPath: 'circle(150% at calc(100% - 2.75rem) 2.75rem)',
            }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.75rem) 2.75rem)' }}
            transition={{ duration: 0.7, ease }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-40 -bottom-40 halo-ring w-[30rem] animate-halo-spin opacity-60 [--halo-thickness:1.5px]"
            />
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease }}
                    className="border-b"
                  >
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={() => send({ type: 'CLOSE' })}
                      className="flex items-baseline justify-between py-5 font-display text-4xl"
                    >
                      {item.label}
                      <span className="font-sans text-xs text-muted-foreground tabular-nums">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="mt-auto pt-10"
            >
              <Button asChild size="lg" className="w-full">
                <a href={platformLink('/')}>
                  Start your assessment <ArrowUpRight />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
