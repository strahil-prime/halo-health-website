import { marquee } from '@/content/home';

/** Brand statement on a slow loop. Pauses on hover; static for reduced motion. */
export function Marquee() {
  const run = [...marquee, ...marquee];
  return (
    <section
      aria-label={marquee.join('. ')}
      className="group overflow-hidden bg-gradient-dawn py-8 sm:py-10"
    >
      <div
        aria-hidden="true"
        className="flex w-max group-hover:[animation-play-state:paused] motion-safe:animate-marquee"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {run.map((phrase, i) => (
              <span key={i} className="flex items-center">
                <span
                  className={`px-8 font-display text-4xl whitespace-nowrap text-ink sm:text-6xl ${
                    i % 2 === 1 ? 'italic' : ''
                  }`}
                >
                  {phrase}
                </span>
                <span className="size-3 rounded-full border border-ink/50 sm:size-4" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
