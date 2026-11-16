import { ArrowRight } from 'lucide-react';
import { AudienceStats } from '@/components/home/audience-stats';
import { FeatureGrid } from '@/components/home/feature-grid';
import { BlurFade } from '@/components/magicui/blur-fade';
import { ShineBorder } from '@/components/magicui/shine-border';
import { Button } from '@/components/ui/button';
import { platformLink } from '@/lib/env';

/**
 * Starter home page. Each section proves one part of the stack works:
 * Motion + Magic UI (hero), shadcn/ui (buttons, cards), GSAP (features),
 * XState + NumberFlow (stats). Replace with real sections as design lands.
 */
export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-24 px-4 py-20 sm:px-6">
      <section className="relative overflow-hidden rounded-2xl border bg-card px-6 py-16 text-center sm:px-12">
        <ShineBorder borderWidth={2} />
        <BlurFade>
          <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Halo Health
          </p>
        </BlurFade>
        <BlurFade delay={0.15}>
          <h1 className="mt-4 font-display text-4xl font-semibold text-balance sm:text-5xl">
            Placeholder headline for the Halo Health marketing site
          </h1>
        </BlurFade>
        <BlurFade delay={0.3}>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Supporting copy goes here. Every call to action links into the
            platform app.
          </p>
        </BlurFade>
        <BlurFade delay={0.45} className="mt-8 flex justify-center gap-3">
          <Button asChild size="lg">
            <a href={platformLink('/')}>
              Get started <ArrowRight />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#features">Learn more</a>
          </Button>
        </BlurFade>
      </section>

      <section id="features" className="scroll-mt-20">
        <h2 className="mb-8 font-display text-3xl font-semibold">Features</h2>
        <FeatureGrid />
      </section>

      <section aria-labelledby="stats-heading">
        <h2
          id="stats-heading"
          className="mb-8 text-center font-display text-3xl font-semibold"
        >
          Who it&apos;s for
        </h2>
        <AudienceStats />
      </section>
    </main>
  );
}
