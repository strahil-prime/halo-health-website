'use client';

import dynamic from 'next/dynamic';
import { HelixStill } from './helix-still';
import { LazyScene } from './lazy-scene';

// Three.js and React Three Fiber stay out of the page bundle: this chunk is
// downloaded only when the helix is about to scroll into view.
const HelixScene = dynamic(() => import('./helix-scene'), { ssr: false });

/** The CADIEUX helix in 3D, with its still image as the fallback. */
export function Helix({ className }: { className?: string }) {
  return (
    <LazyScene
      scene={HelixScene}
      className={className}
      fallback={<HelixStill className="size-full" />}
    />
  );
}
