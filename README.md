# Halo Health website

Public marketing site for Halo Health / CADIEUX.

This repo is **marketing only**. It holds no health data, no accounts and no
forms that collect personal information. Every call to action links into the
platform app ([wanio/halo-health](https://github.com/wanio/halo-health)), which
owns sign-up, the HSA questionnaire and all health data.

## Stack

| Concern    | Library                                                                 |
| ---------- | ----------------------------------------------------------------------- |
| Framework  | [Next.js 15](https://nextjs.org) (App Router) + TypeScript              |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config)           |
| Components | [shadcn/ui](https://ui.shadcn.com) + [Magic UI](https://magicui.design) |
| Animation  | [Motion](https://motion.dev) (Framer Motion), [GSAP](https://gsap.com)  |
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
| `pnpm dev`          | Dev server with Turbopack                   |
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

| Variable                   | Purpose                                        |
| -------------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_PLATFORM_URL` | Base URL of the platform app that CTAs link to |
| `NEXT_PUBLIC_SITE_URL`     | Canonical URL of this site (metadata, OG tags) |

## Project layout

```
src/
  app/                 routes (App Router), layout, globals.css
  components/
    brand/             logo
    site/              header, footer
    home/              homepage sections
    motion/            shared animation primitives (Reveal, SplitWords…)
    ui/                shadcn/ui components (owned code, edit freely)
    magicui/           Magic UI components (owned code, edit freely)
  content/home.ts      all homepage copy
  machines/            XState machines
  lib/                 utils (cn), env + platformLink() + contactLink()
  fonts/               self-hosted fonts (OFL)
  styles/tokens.css    design tokens
```

## Adding components

```bash
pnpm dlx shadcn@latest add dialog                 # shadcn/ui
pnpm dlx shadcn@latest add @magicui/marquee        # Magic UI (registry in components.json)
```

Components land in `src/components/ui` or `src/components/magicui`. Check that
new components use the semantic tokens (`bg-primary`, not hex values).

## Design system

Tokens live in `src/styles/tokens.css` and are mapped into Tailwind in
`src/app/globals.css`. They grew out of the brand style guide (black, white,
NUDE `#E7D7C9`) into a warm, high-contrast palette with "halo" gradients.
Semantic token names match the platform app so the two can later share one
package. See `AGENTS.md` for how to use them.

Two things still need brand assets:

- **Display font.** The style guide specifies The Seasons, which needs a web
  licence. Cormorant Garamond stands in. To switch, add the licensed `.woff2`
  files to `src/fonts` and point `seasons` in `src/app/layout.tsx` at them.
- **Logo.** `public/brand/halo-health-logo.svg` was traced from the style guide
  PDF. Replace it with the original vector file when available.
