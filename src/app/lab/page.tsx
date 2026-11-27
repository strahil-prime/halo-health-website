import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/brand/logo';
import { PillLink } from '@/components/brand/pill-link';
import { HoverCards } from '@/components/lab/hover-cards';
import { MotionStatus } from '@/components/lab/motion-status';
import { ScrollStory } from '@/components/lab/scroll-story';
import { Magnetic } from '@/components/motion/magnetic';
import { RevealLines, Reveal } from '@/components/motion/reveal';
import { Helix } from '@/components/three/helix';
import { platformLink } from '@/lib/env';

export const metadata: Metadata = {
  title: 'Motion lab',
  robots: { index: false, follow: false },
};

/**
 * Motion lab: one small demo per motion layer, to prove the stack works and
 * to check fallbacks (try it with "Reduce motion" on). Placeholder copy.
 * Not linked from the site.
 */
export default function LabPage() {
  return (
    <main id="main">
      <header className="container-page flex items-center justify-between py-6">
        <Logo className="h-12" />
        <Link
          href="/"
          className="inline-flex min-h-11 items-center link-underline text-sm"
        >
          Homepage (page transition)
        </Link>
      </header>

      {/* Motion: entrances */}
      <section className="container-page pt-16 pb-24" aria-labelledby="lab">
        <p className="text-eyebrow text-muted-foreground">Motion lab</p>
        <h1 id="lab" className="mt-5 text-display-2xl">
          <RevealLines
            immediate
            lines={[
              { text: 'Every motion layer,' },
              { text: 'working together.', em: true },
            ]}
          />
        </h1>
        <Reveal immediate delay={0.4} className="mt-8 max-w-xl">
          <p className="text-lead text-muted-foreground">
            Placeholder content. Scroll down to see each layer: Motion for
            hovers and entrances, GSAP for scroll stories, Lenis for smooth
            scrolling and Three.js for 3D.
          </p>
          <div className="mt-8">
            <MotionStatus />
          </div>
        </Reveal>
      </section>

      {/* Motion: hover and micro-interactions */}
      <section className="container-page pb-24" aria-labelledby="hover-title">
        <p className="text-eyebrow text-muted-foreground">Motion</p>
        <h2 id="hover-title" className="mt-4 mb-10 text-display-xl">
          Hover and <em>micro-interactions</em>
        </h2>
        <HoverCards />
        <div className="mt-10">
          <Magnetic>
            <PillLink href={platformLink('/')}>Magnetic button</PillLink>
          </Magnetic>
        </div>
      </section>

      {/* GSAP: pinned, scrubbed scroll story */}
      <ScrollStory />

      {/* Three.js: lazy 3D with a still fallback */}
      <section
        className="theme-ink mt-24 overflow-hidden inset-x py-24"
        aria-labelledby="three-title"
      >
        <div className="grid items-center gap-10 band-x md:grid-cols-2">
          <div className="container-page md:pr-0">
            <p className="text-eyebrow text-muted-foreground">
              Three.js · React Three Fiber
            </p>
            <h2 id="three-title" className="mt-4 text-display-xl">
              3D that loads <em>only when needed</em>
            </h2>
            <p className="mt-6 max-w-md text-lead text-muted-foreground">
              The 3D code downloads when this section is near. Until then, and
              for reduced motion or low-power phones, you see a still image of
              the same helix.
            </p>
          </div>
          <Helix className="aspect-square w-full" />
        </div>
      </section>

      <footer className="container-page py-16 text-sm text-muted-foreground">
        End of the motion lab.
      </footer>
    </main>
  );
}
