import Image from 'next/image';
import { photos } from '@/assets/home';
import { Eyebrow } from '@/components/brand/headline';
import { Reveal, RevealLines } from '@/components/motion/reveal';
import { careTeam } from '@/content/home';

/** The roles around each member. Portraits are illustrative. */
export function CareTeam() {
  return (
    <section
      id="care-team"
      aria-labelledby="care-team-title"
      className="container-page section-t"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div className="flex flex-[2_1_32.5rem] flex-col gap-5">
          <Eyebrow index="03">{careTeam.eyebrow}</Eyebrow>
          <h2 id="care-team-title" className="text-display-xl">
            <RevealLines lines={careTeam.titleLines} />
          </h2>
        </div>
        <Reveal delay={0.15} className="max-w-[23.75rem] flex-[1_1_18.75rem]">
          <p className="text-muted-foreground">{careTeam.body}</p>
        </Reveal>
      </div>

      <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-4">
        {careTeam.roles.map((role, i) => (
          <li key={role.title}>
            <Reveal
              delay={(i % 4) * 0.08}
              className="group/photo flex flex-col gap-4"
            >
              <div className="theme-ink relative aspect-[5/6] overflow-hidden rounded-2xl">
                <Image
                  src={photos[role.image]}
                  alt={role.imageAlt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-[1600ms] ease-brand group-hover/photo:scale-[1.06]"
                />
                <p className="absolute top-3 left-3 rounded-full glass-ink px-3.5 py-[0.4375rem] text-xs sm:top-3.5 sm:left-3.5">
                  {role.area}
                </p>
              </div>
              <div className="flex flex-col gap-1.5 px-1 sm:px-1.5">
                <h3 className="text-display-sm">{role.title}</h3>
                <p className="text-sm leading-[1.55] text-muted-foreground">
                  {role.body}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
