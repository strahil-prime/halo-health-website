# Halo Health website

Public marketing site for Halo Health / CADIEUX.

This repo is **marketing only**. It holds no health data, no accounts and no
forms that collect personal information. Every call to action links into the
platform app ([wanio/halo-health](https://github.com/wanio/halo-health)), which
owns sign-up, the HSA questionnaire and all health data.

## Stack

| Concern    | Library                                                                 |
| ---------- | ----------------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) (App Router) + TypeScript              |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config)           |
| Components | [shadcn/ui](https://ui.shadcn.com) + [Magic UI](https://magicui.design) |
| Animation  | [Motion](https://motion.dev) (Framer Motion), [GSAP](https://gsap.com)  |
| Scroll     | [Lenis](https://lenis.darkroom.engineering) smooth scroll               |
| 3D         | [Three.js](https://threejs.org) + React Three Fiber, lazy-loaded        |
| Numbers    | [NumberFlow](https://number-flow.barvian.me)                            |
| UI state   | [XState v5](https://stately.ai/docs/xstate)                             |
| Tooling    | pnpm 10, Node 24, ESLint 9, Prettier 3                                  |

## Getting started

Requires Node 24 (see `.nvmrc`) and Corepack.

```bash
corepack enable          # uses the pnpm version pinned in package.json
pnpm install
cp .env.example .env.local
pnpm dev                 # http://localhost:3000
```

## Scripts

| Script              | What it does                                |
| ------------------- | ------------------------------------------- |
| `pnpm dev`          | Dev server (Turbopack)                      |
| `pnpm build`        | Production build                            |
| `pnpm start`        | Serve the production build                  |
| `pnpm lint`         | ESLint, zero warnings allowed               |
| `pnpm lint:fix`     | ESLint with autofix                         |
| `pnpm typecheck`    | Generate route types, then `tsc --noEmit`   |
| `pnpm format`       | Prettier write (sorts Tailwind classes too) |
| `pnpm format:check` | Prettier check (used in CI)                 |
| `pnpm check`        | format:check + lint + typecheck             |

CI (`.github/workflows/ci.yml`) runs format check, lint, typecheck and build on
every push to `main` and every pull request.

## Environment

See `.env.example`. Only `NEXT_PUBLIC_*` values are used, because nothing on
this site is secret.

| Variable                    | Purpose                                        |
| --------------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_PLATFORM_URL`  | Base URL of the platform app that CTAs link to |
| `NEXT_PUBLIC_SITE_URL`      | Canonical URL of this site (metadata, OG tags) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Address behind the "Talk to our team" links    |

## Project layout

```
src/
  app/                 routes (App Router), layout, globals.css
  components/
    brand/             logo, pill buttons, headline parts
    site/              notice bar, header, footer
    home/              homepage sections
    motion/            shared animation primitives (Reveal, SmoothScroll…)
    three/             lazy WebGL scenes with still fallbacks
    lab/               motion lab demos (/lab)
    ui/                shadcn/ui components (owned code, edit freely)
    magicui/           Magic UI components (owned code, edit freely)
  assets/home/         homepage photography (static imports)
  content/home.ts      all homepage copy
  machines/            XState machines
  lib/                 utils (cn), env + platformLink() + contactLink()
  fonts/               self-hosted fonts (OFL)
  styles/cadieux.css   CADIEUX tokens (copied from the design system)
  styles/tokens.css    marketing tokens on top of them
  hooks/               useMotionBudget (full, lite or reduced motion)
```

## Adding components

```bash
pnpm dlx shadcn@latest add dialog                 # shadcn/ui
pnpm dlx shadcn@latest add @magicui/marquee        # Magic UI (registry in components.json)
```

Components land in `src/components/ui` or `src/components/magicui`. Check that
new components use the semantic tokens (`bg-primary`, not hex values).

## Design system

The CADIEUX tokens (`src/styles/cadieux.css`) are copied from the design
system in `wanio/halo-health` (`packages/tokens`, docs at
https://cadieux-design-system.vercel.app). `src/styles/tokens.css` maps them
to the marketing look, "Cadieux Branding Type 1" Cool revision, and
`src/app/globals.css` maps that into Tailwind. When the tokens change, copy
the new generated `cadieux.css` over this one; once `@halo/tokens` is
published, import it from the package instead. See `AGENTS.md` for how to use
them.

## Motion

Open `/lab` (not linked from the site) for one small demo of each motion
layer: Motion hovers and entrances, a pinned GSAP scroll story, Lenis smooth
scroll and a lazy Three.js helix. Turn on "Reduce motion" in your system
settings to check the fallbacks.

Before the public launch:

- **Search engines.** `src/app/layout.tsx` sets `robots: noindex` for the soft
  launch. Remove it when the site should be found.
- **Photography.** The images in `src/assets/home` are generated stand-ins.
  Replace them with licensed or commissioned photography (same file names).

Two things still need brand assets:

- **Display font.** The style guide specifies The Seasons, which needs a web
  licence. Cormorant Garamond stands in. To switch, add the licensed `.woff2`
  files to `src/fonts` and point `seasons` in `src/app/layout.tsx` at them.
- **Logo.** `public/brand/halo-health-logo.svg` was traced from the style guide
  PDF. Replace it with the original vector file when available.
