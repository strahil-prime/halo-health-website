'use client';

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react';
import { useMotionBudget } from '@/hooks/use-motion-budget';
import { cn } from '@/lib/utils';

/** What a scene component receives. See `helix-scene.tsx`. */
export interface SceneProps {
  /** False while off screen: stop rendering frames. */
  running: boolean;
  /** Call once the first frame is ready (R3F: `<Canvas onCreated>`). */
  onReady: () => void;
}

/**
 * A WebGL scene that costs nothing until it is needed.
 *
 * - The still image (`fallback`) renders on the server and stays for anyone
 *   who reduces motion, has a low-power device or Data Saver, or no WebGL.
 * - Otherwise the scene's code starts loading when the section is within one
 *   screen of the viewport, fades in over the still once ready, and pauses
 *   whenever it scrolls out of view.
 *
 * Pass a scene made with `next/dynamic(..., { ssr: false })` so Three.js
 * lands in its own chunk; see `helix.tsx`.
 */
export function LazyScene({
  scene: Scene,
  fallback,
  className,
}: {
  scene: ComponentType<SceneProps>;
  fallback: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const budget = useMotionBudget();
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const enabled = budget === 'full';

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const nearby = new IntersectionObserver(
      ([entry]) => entry?.isIntersecting && setNear(true),
      { rootMargin: '100% 0px' },
    );
    const onScreen = new IntersectionObserver(([entry]) =>
      setVisible(Boolean(entry?.isIntersecting)),
    );
    nearby.observe(el);
    onScreen.observe(el);
    return () => {
      nearby.disconnect();
      onScreen.disconnect();
    };
  }, [enabled]);

  const live = enabled && near;

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-700 ease-brand',
          live && ready && 'opacity-0',
        )}
      >
        {fallback}
      </div>
      {live ? (
        <div
          className={cn(
            'absolute inset-0 opacity-0 transition-opacity duration-1000 ease-brand',
            ready && 'opacity-100',
          )}
        >
          <Scene running={visible} onReady={() => setReady(true)} />
        </div>
      ) : null}
    </div>
  );
}
