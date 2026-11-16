import { ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { footer } from '@/content/home';
import { contactLink, platformLink } from '@/lib/env';

export function Footer() {
  return (
    <footer className="theme-ink relative overflow-hidden">
      <div className="relative container-page pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-28" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {footer.tagline}
            </p>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-eyebrow text-muted-foreground">
                {column.title}
              </h2>
              <ul className="mt-6 flex flex-col gap-3.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="link-underline pb-0.5">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Get started">
            <h2 className="text-eyebrow text-muted-foreground">Get started</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              <li>
                <a
                  href={platformLink('/')}
                  className="inline-flex items-center gap-1.5 link-underline pb-0.5"
                >
                  Start your assessment <ArrowUpRight className="size-4" />
                </a>
              </li>
              <li>
                <a
                  href={contactLink('Halo Health enquiry')}
                  className="inline-flex items-center gap-1.5 link-underline pb-0.5"
                >
                  Talk to our team <ArrowUpRight className="size-4" />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-16 max-w-3xl border-t border-border pt-8 text-sm leading-relaxed text-muted-foreground">
          {footer.emergency}
        </p>

        <div className="mt-10 flex flex-col justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Halo Health. All rights reserved.</p>
          <a href="#top" className="self-start link-underline pb-0.5">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
