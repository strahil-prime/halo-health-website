'use client';

import { ReactLenis, type LenisRef } from 'lenis/react';
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const reduceQuery = '(prefers-reduced-motion: reduce)';

function useReducedMotionPreference() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(reduceQuery);
      query.addEventListener('change', onChange);
      return () => query.removeEventListener('change', onChange);
    },
    () => window.matchMedia(reduceQuery).matches,
    () => false,
  );
}

/**
 * Smooth scrolling (Lenis), driven by GSAP's clock so ScrollTrigger and the
 * scroll position never drift apart. Turned off for visitors who reduce
 * motion: they get the browser's native scroll.
 *
 * To pause it (for example behind a modal), call `useLenis()` from
 * `lenis/react` and use `lenis.stop()` / `lenis.start()`.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotionPreference();
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reduce) return;
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(tick);
    };
  }, [reduce]);

  if (reduce) return children;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.1, anchors: true }}
    >
      {children}
    </ReactLenis>
  );
}
