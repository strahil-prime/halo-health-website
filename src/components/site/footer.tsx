import { Logo } from '@/components/brand/logo';
import { Reveal } from '@/components/motion/reveal';
import { FooterWordmark } from '@/components/site/footer-wordmark';
import { LanguageSwitch } from '@/components/site/notice-bar';
import { cta, footer, notice } from '@/content/home';
import { contactLink, platformLink } from '@/lib/env';

export function Footer() {
  return (
    <footer className="inset-x pt-3 pb-(--inset-gutter)">
      <div className="theme-ink overflow-hidden rounded-3xl band-x pt-12 lg:pt-14">
        <div className="mx-auto flex max-w-[85rem] flex-col gap-12 lg:gap-14">
          <Reveal className="flex flex-wrap justify-between gap-x-10 gap-y-12">
            <div className="flex flex-[1_1_20rem] flex-col items-start gap-5">
              <a href="#top" aria-label="Halo Health, back to top">
                <Logo className="h-[6.5rem]" />
              </a>
              <p className="max-w-[18.75rem] text-sm leading-[1.6] text-muted-foreground">
                {footer.tagline}
              </p>
            </div>

            {footer.columns.map((column) => (
              <nav
                key={column.title}
                aria-label={column.title}
                className="min-w-[9.375rem]"
              >
                <h2 className="text-eyebrow text-muted-foreground">
                  {column.title}
                </h2>
                <ul className="mt-3 flex flex-col text-sm lg:mt-5 lg:gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="flex min-h-11 items-center link-underline max-lg:bg-none lg:inline lg:min-h-0 lg:py-1"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-label="Get started" className="min-w-[11.875rem]">
              <h2 className="text-eyebrow text-muted-foreground">
                Get started
              </h2>
              <ul className="mt-3 flex flex-col text-sm lg:mt-5 lg:gap-3">
                <li>
                  <a
                    href={platformLink('/')}
                    className="flex min-h-11 items-center link-underline max-lg:bg-none lg:inline lg:min-h-0 lg:py-1"
                  >
                    {cta.primary}
                  </a>
                </li>
                <li>
                  <a
                    href={platformLink('/')}
                    className="flex min-h-11 items-center link-underline max-lg:bg-none lg:inline lg:min-h-0 lg:py-1"
                  >
                    {cta.signIn}
                  </a>
                </li>
                <li>
                  <a
                    href={contactLink('Talk to the Halo Health team')}
                    className="flex min-h-11 items-center link-underline max-lg:bg-none lg:inline lg:min-h-0 lg:py-1"
                  >
                    {cta.team}
                  </a>
                </li>
              </ul>
            </nav>
          </Reveal>

          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t pt-5 text-xs text-muted-foreground">
            <p>
              © {new Date().getFullYear()} {footer.rights}
            </p>
            <p>{notice.short}</p>
            <LanguageSwitch className="text-foreground" />
          </div>
        </div>
        <FooterWordmark>{footer.wordmark}</FooterWordmark>
      </div>
    </footer>
  );
}
