import { Audiences } from '@/components/home/audiences';
import { CareTeam } from '@/components/home/care-team';
import { ClosingCta } from '@/components/home/closing-cta';
import { Hero } from '@/components/home/hero';
import { Journal } from '@/components/home/journal';
import { Journey } from '@/components/home/journey';
import { Organisations } from '@/components/home/organisations';
import { Pillars } from '@/components/home/pillars';
import { Places } from '@/components/home/places';
import { Programmes } from '@/components/home/programmes';
import { Promises } from '@/components/home/promises';
import { Questions } from '@/components/home/questions';
import { Footer } from '@/components/site/footer';
import { Header } from '@/components/site/header';
import { NoticeBar } from '@/components/site/notice-bar';

export default function HomePage() {
  return (
    <>
      {/* `data-page` marks what goes inert behind the mobile menu. */}
      <div data-page>
        <NoticeBar />
      </div>
      <Header />
      <main id="main" data-page>
        <Hero />
        <Audiences />
        <Pillars />
        <Promises />
        <Journey />
        <Programmes />
        <CareTeam />
        <Places />
        <Organisations />
        <Questions />
        <Journal />
        <ClosingCta />
      </main>
      <div data-page>
        <Footer />
      </div>
    </>
  );
}
