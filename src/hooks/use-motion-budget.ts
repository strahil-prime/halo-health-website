'use client';

import { useSyncExternalStore } from 'react';

/**
 * How much motion this visitor's device should get.
 *
 * - `full`   everything, including WebGL scenes.
 * - `lite`   CSS and Motion only: still images instead of WebGL. Used on
 *            low-power devices, with Data Saver on, or without WebGL.
 * - `reduce` the visitor asked the OS to reduce motion: no movement at all,
 *            only fades and colour changes.
 *
 * The server always renders `lite`, so the first paint is the same everywhere
 * and the still image shows until the client decides it can do more.
 */
export type MotionBudget = 'full' | 'lite' | 'reduce';

const reduceQuery = '(prefers-reduced-motion: reduce)';

interface NavigatorHints {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

let webgl: boolean | undefined;

function read(): MotionBudget {
  if (window.matchMedia(reduceQuery).matches) return 'reduce';
  const nav = navigator as Navigator & NavigatorHints;
  const lowPower =
    (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  if (nav.connection?.saveData || lowPower) return 'lite';
  webgl ??= hasWebGL();
  return webgl ? 'full' : 'lite';
}

function subscribe(onChange: () => void) {
  const query = window.matchMedia(reduceQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

export function useMotionBudget(): MotionBudget {
  return useSyncExternalStore(subscribe, read, () => 'lite');
}
