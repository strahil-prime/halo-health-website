# AGENTS.md

Guidance for AI coding agents (Claude Code, Codex, Cursor…) and humans working
in this repo. `CLAUDE.md` points here.

## What this repo is

The public **marketing site** for Halo Health / CADIEUX. Separate from the
platform monorepo `wanio/halo-health` (Expo app: sign-up, HSA questionnaire,
all health data).

Hard rules:

- **No health data, no PII.** No forms that collect personal or health
  information, no auth, no database. Anything like that belongs in the platform.
- **CTAs go to the platform** through `platformLink()` in `src/lib/env.ts`.
  Never hardcode platform URLs.
- **No secrets.** Only `NEXT_PUBLIC_*` env vars. Document any new one in
  `.env.example` and the README.
- Analytics or third-party scripts need explicit approval first (privacy and
  health-adjacent compliance).

## Stack and versions

Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind CSS v4,
shadcn/ui (new-york), Magic UI, Motion (`motion` package, formerly Framer
Motion), GSAP + `@gsap/react`, NumberFlow (`@number-flow/react`), XState v5 +
`@xstate/react`. pnpm 10 (pinned in `packageManager`), Node 24 (`.nvmrc`).

## Commands

```bash
pnpm dev          # local dev
pnpm check        # format:check + lint + typecheck. Run before every commit.
pnpm build        # must pass; CI runs it
pnpm format       # fix formatting
```

## Conventions

**Components**

- Server Components by default. Add `'use client'` only on the smallest leaf
  that needs state, effects or animation. Keep pages as server components that
  compose client islands (see `src/app/page.tsx`).
- `src/components/ui/` = shadcn/ui, `src/components/magicui/` = Magic UI.
  These are owned code: adapt them, but keep the original API.
- Page sections live in `src/components/<page>/`.
- Use `cn()` from `@/lib/utils` to merge classes. Use `cva` for variants.
- Named exports, except Next.js route files (`page.tsx`, `layout.tsx`…).
- Import with the `@/` alias.

**Styling**

- Tailwind utilities only. No CSS modules, no inline hex colours.
- Use semantic tokens (`bg-primary`, `text-muted-foreground`, `border-border`,
  `rounded-lg`). Brand values change only in `src/styles/tokens.css`.
- Token names must stay aligned with the platform app
  (`apps/product/src/styles/global.css` in `wanio/halo-health`).
- Mobile first. Check at 375px wide.

**Animation**

- Pick one tool per element:
  - **Motion** for component-level enter/exit, hover, layout and gesture
    animation. Import from `motion/react`.
  - **GSAP** for scroll-driven and timeline sequences. Always use the
    `useGSAP` hook with a `scope` ref (it cleans up for you). Register
    plugins once at module level.
  - **CSS / Tailwind** (`tw-animate-css`) for simple transitions.
- Respect reduced motion: `motion-safe:` in Tailwind, `gsap.matchMedia()` with
  `(prefers-reduced-motion: no-preference)`, and `useReducedMotion()` in Motion.
- Never animate layout-affecting properties when a transform will do.

**State**

- `useState` for trivial local state.
- XState for anything with more than two states or rules between them
  (multi-step CTAs, quizzes, pricing toggles, modals with flows). Define
  machines in `src/machines/` with `setup({ types })`, consume with
  `useMachine`. See `audience-machine.ts`.

**Numbers**

- Use `<NumberFlow />` for any number that changes in front of the user
  (stats, pricing, counters). Use `tabular-nums`.

**Accessibility**

- WCAG 2.1 AA. Semantic HTML, one `h1` per page, visible focus (global
  `:focus-visible` style), 44px minimum touch targets (`min-h-11`), alt text,
  `aria-pressed` on toggle buttons, sufficient contrast with the tokens.

**Copy**

- All copy on the starter page is placeholder. Do not invent health or
  financial claims; marketing claims need approval.

## Git

- Branch from `main`, open a PR, CI must be green.
- Conventional-ish commit subjects (`feat:`, `fix:`, `chore:`, `docs:`).
