import { notice } from '@/content/home';
import { cn } from '@/lib/utils';

/** Language switch. Serbian is planned; until then it is shown, not linked. */
export function LanguageSwitch({ className }: { className?: string }) {
  return (
    <p
      className={cn('flex shrink-0 items-center gap-2 text-eyebrow', className)}
    >
      <span className="sr-only">Language:</span>
      <span aria-current="true">EN</span>
      <span aria-hidden="true" className="opacity-60">
        /
      </span>
      <span className="opacity-60" title="Serbian is coming soon">
        SR<span className="sr-only"> (coming soon)</span>
      </span>
    </p>
  );
}

/** The thin line above the hero: what we are not, and the language switch. */
export function NoticeBar() {
  return (
    <aside
      aria-label="Notice"
      className="container-page flex min-h-11 items-center justify-between gap-4 py-2 text-xs text-muted-foreground"
    >
      <p>
        <span className="md:hidden">{notice.short}</span>
        <span className="max-md:hidden">{notice.long}</span>
      </p>
      <LanguageSwitch className="text-foreground" />
    </aside>
  );
}
