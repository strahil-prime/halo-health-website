import { ClosingCta } from '@/components/home/closing-cta';
import { DailyApp } from '@/components/home/daily-app';
import { ExpectStats } from '@/components/home/expect-stats';
import { Hero } from '@/components/home/hero';
import { Journey } from '@/components/home/journey';
import { Marquee } from '@/components/home/marquee';
import { Organisations } from '@/components/home/organisations';
import { Programmes } from '@/components/home/programmes';
import { Standards } from '@/components/home/standards';
import { MotionProvider } from '@/components/motion/motion-provider';
import { Footer } from '@/components/site/footer';
import { Header } from '@/components/site/header';

export default function HomePage() {
  return (
    <MotionProvider>
      <Header />
      <main id="main">
        <Hero />
        <ExpectStats />
        <Marquee />
        <Journey />
        <Programmes />
        <Standards />
        <DailyApp />
        <Organisations />
        <ClosingCta />
      </main>
      <Footer />
    </MotionProvider>
  );
}
