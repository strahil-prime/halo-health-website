'use client';

import { useMachine } from '@xstate/react';
import { useLenis } from 'lenis/react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/brand/logo';
import { PillLink } from '@/components/brand/pill-link';
import { LanguageSwitch } from '@/components/site/notice-bar';
import { cta, nav } from '@/content/home';
import { platformLink } from '@/lib/env';
import { cn } from '@/lib/utils';
import { menuMachine } from '@/machines/menu-machine';

const ease = [0.22, 1, 0.36, 1] as const;

/** Which section is under the header right now, for the nav highlight. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
          else
            setActive((current) =>
              current === entry.target.id ? null : current,
            );
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = nav.map((item) => item.href.slice(1));

/**
 * Site header. It starts inside the hero (transparent, over the photograph)
 * and becomes a floating glass bar once the page scrolls. It tucks away on
 * the way down and returns the moment the visitor scrolls up.
 */
export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [snapshot, send] = useMachine(menuMachine);
  const open = snapshot.matches('open');
  const active = useActiveSection(sectionIds);
  const lenis = useLenis();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 72);
    setHidden(y > 640 && y > previous);
  });

  // While the menu is open: lock the page behind it, keep focus inside,
  // close on Escape.
  useEffect(() => {
    if (!open) return;
    const background = document.querySelectorAll<HTMLElement>('[data-page]');
    background.forEach((el) => el.setAttribute('inert', ''));
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    firstLinkRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        send({ type: 'CLOSE' });
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      background.forEach((el) => el.removeAttribute('inert'));
      document.body.style.overflow = '';
      lenis?.start();
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, send, lenis]);

  // Close the menu if the viewport grows into the desktop layout.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)');
    const onChange = () => desktop.matches && send({ type: 'CLOSE' });
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, [send]);

  const solid = scrolled && !open;
  const highlighted = hovered ?? (active ? `#${active}` : null);

  return (
    <>
      <div className="sticky top-0 z-50 h-0">
        <motion.header
          animate={{ y: hidden && !open ? '-140%' : '0%' }}
          transition={{ duration: 0.6, ease }}
          className="theme-ink absolute inset-x-0 top-0 bg-transparent! inset-x"
        >
          <div
            className={cn(
              'mx-auto flex items-center justify-between gap-4 rounded-full border transition-[max-width,margin,padding,background-color,border-color,box-shadow] duration-700 ease-brand',
              solid
                ? 'mt-2.5 max-w-[78rem] border-cream/15 bg-noir/80 py-1.5 pr-1.5 pl-4 shadow-[0_18px_50px_-22px_rgb(11_13_15/0.7)] backdrop-blur-xl sm:pl-6'
                : 'mt-3.5 max-w-full border-transparent px-3.5 py-0 sm:mt-[1.375rem] lg:px-7',
            )}
          >
            <a
              href="#top"
              aria-label="Halo Health, back to top"
              className="flex shrink-0 items-center rounded-full"
              onClick={() => send({ type: 'CLOSE' })}
            >
              <Logo
                className={cn(
                  'transition-[height] duration-700 ease-brand',
                  solid ? 'h-11' : 'h-14 sm:h-[4.75rem]',
                )}
              />
            </a>

            <nav aria-label="Main" className="max-lg:hidden">
              <ul
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  'flex items-center rounded-full border p-[0.3125rem] text-sm transition-[background-color,border-color] duration-700 ease-brand',
                  solid
                    ? 'border-transparent'
                    : 'border-cream/15 bg-noir/40 backdrop-blur-md',
                )}
              >
                {nav.map((item) => (
                  <li key={item.href} className="relative">
                    {highlighted === item.href ? (
                      <motion.span
                        layoutId="nav-highlight"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-cream/12"
                        transition={{ duration: 0.5, ease }}
                      />
                    ) : null}
                    <a
                      href={item.href}
                      aria-current={
                        active && `#${active}` === item.href
                          ? 'location'
                          : undefined
                      }
                      onMouseEnter={() => setHovered(item.href)}
                      onFocus={() => setHovered(item.href)}
                      onBlur={() => setHovered(null)}
                      className="relative block rounded-full px-3.5 py-2.5 xl:px-[1.125rem]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-3">
              <a
                href={platformLink('/')}
                className="link-underline px-2 py-3 text-sm max-xl:hidden"
              >
                {cta.signIn}
              </a>
              <a
                href={platformLink('/')}
                className="inline-flex min-h-[2.875rem] items-center rounded-full bg-primary px-[1.375rem] text-sm font-medium text-primary-foreground transition-[scale,background-color] duration-500 ease-brand hover:bg-linen active:scale-[0.98] max-sm:hidden"
              >
                {cta.primary}
              </a>
              <button
                ref={toggleRef}
                type="button"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => send({ type: 'TOGGLE' })}
                className={cn(
                  'relative grid size-[2.875rem] place-items-center rounded-full border transition-[background-color,border-color] duration-500 ease-brand lg:hidden',
                  solid
                    ? 'border-cream/20'
                    : 'border-cream/20 bg-noir/40 backdrop-blur-md',
                )}
              >
                <span
                  className={cn(
                    'absolute h-px w-[1.125rem] bg-current transition-transform duration-500 ease-brand',
                    open ? 'rotate-45' : '-translate-y-[3.5px]',
                  )}
                />
                <span
                  className={cn(
                    'absolute h-px w-[1.125rem] bg-current transition-transform duration-500 ease-brand',
                    open ? '-rotate-45' : 'translate-y-[3.5px]',
                  )}
                />
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="theme-ink fixed inset-0 z-40 flex flex-col overflow-y-auto px-6 pt-32 pb-7 lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 3rem)' }}
            exit={{
              clipPath: 'circle(0% at calc(100% - 3rem) 3rem)',
              transition: { duration: 0.55, ease },
            }}
            transition={{ duration: 0.75, ease }}
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.7, delay: 0.18 + i * 0.06, ease }}
                    className="border-b"
                  >
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={() => send({ type: 'CLOSE' })}
                      className="flex items-baseline justify-between gap-4 py-[1.125rem] font-display text-[2.125rem] leading-none"
                    >
                      {item.label}
                      <span className="font-sans text-eyebrow text-muted-foreground tabular-nums">
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
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.7, delay: 0.55, ease }}
              className="mt-auto flex flex-col gap-3 pt-10"
            >
              <PillLink href={platformLink('/')} className="w-full">
                {cta.primary}
              </PillLink>
              <PillLink
                href={platformLink('/')}
                variant="outline"
                className="w-full"
              >
                {cta.signIn}
              </PillLink>
              <LanguageSwitch className="mt-4 justify-center" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
