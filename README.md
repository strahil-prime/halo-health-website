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
    ui/                shadcn/ui components (owned code, edit freely)
    magicui/           Magic UI components (owned code, edit freely)
    home/              sections for the home page
  machines/            XState machines
  lib/                 utils (cn), env + platformLink()
  styles/tokens.css    brand design tokens (placeholders)
```

## Adding components

```bash
pnpm dlx shadcn@latest add dialog                 # shadcn/ui
pnpm dlx shadcn@latest add @magicui/marquee        # Magic UI (registry in components.json)
```

Components land in `src/components/ui` or `src/components/magicui`. Check that
new components use the semantic tokens (`bg-primary`, not hex values).

## Design tokens

Brand values live in `src/styles/tokens.css` and are mapped into Tailwind in
`src/app/globals.css`. The token names match the platform app so they can later
move into one shared package. Today they are placeholders copied from the
platform's current palette.
