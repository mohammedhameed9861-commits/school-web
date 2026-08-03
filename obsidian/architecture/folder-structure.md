---
tags: [architecture, stable]
updated: 2026-08-03
---

# Folder Structure

Where everything lives and what belongs where. The repo has two top-level concerns:
the **app** (`src/`) and this **vault** (`obsidian/`).

## Repo root

```
next16-claude-starter/
├── src/                     ← application code (see below)
├── messages/                ← next-intl message catalogs — ar.json, en.json
├── public/                  ← static assets (see "public/" section below)
├── obsidian/                ← this Obsidian vault — ALL project documentation
├── .claude/settings.json    ← Claude Code hooks — automate the vault workflow
├── app config files         ← next.config.ts, tsconfig, eslint, postcss
├── README.md                ← project README → points into the vault
├── AGENTS.md                ← agent guide — breaking-change warning, hard rules, vault pointer
├── CLAUDE.md                ← Claude Code entry → @AGENTS.md
└── .cursorrules             ← Cursor entry → @AGENTS.md
```

All documentation lives in the vault. The root `AGENTS.md` / `CLAUDE.md` /
`.cursorrules` are thin shims that carry the hard rules and point into it —
see [[ai-agent-guide]]. `.claude/settings.json` holds hooks that enforce the
documentation workflow automatically — also see [[ai-agent-guide]].

## `src/` — application code

```
src/
├── env.ts                  # zod-validated env (public + server-only split)
├── middleware.ts → proxy.ts # Next 16 renamed this file; next-intl locale routing lives here
│
├── i18n/                   # next-intl config — routing.ts, navigation.ts, request.ts
│
├── app/
│   ├── [locale]/           # Locale-scoped routes — app/[locale]/<route>/page.tsx
│   │   ├── layout.tsx      # Root layout (html/body, provider tree) — locale-aware
│   │   ├── page.tsx        # Home route → delegates to a view
│   │   ├── <route>/page.tsx # One folder per page (about, academics, admissions, …)
│   │   ├── loading.tsx / error.tsx / not-found.tsx
│   │
│   ├── api/<resource>/route.ts  # API endpoints — see [[api-architecture]]
│   ├── robots.ts           # → /robots.txt
│   ├── sitemap.ts          # → /sitemap.xml — every route × every locale
│   ├── globals.css         # Tailwind v4 config + design tokens
│   └── favicon.ico
│
├── views/                  # Page-level components — one per route
│   ├── home.tsx            # HomeView, composes views/home/*.tsx sections
│   ├── home/, about/, academics/, student-life/, admissions/, gallery/, contact/
│   │                       # per-page section components, one file per section
│   └── about.tsx, academics.tsx, …  # the view assembling each page's sections
│
├── layouts/                # Reusable layout wrappers
│   └── scroll-layout.tsx   # Lenis smooth-scroll wrapper
│
├── components/
│   ├── ui/                 # Design-system primitives: SectionHeading, PageHero,
│   │                       # MediaPlaceholder, NumberedCardGrid, MediaCardGrid,
│   │                       # CaptionedMediaGrid, ArticleCard
│   ├── forms/               # Lead-gen forms shared across pages: RegistrationForm
│   │                       # (home + admissions), ContactForm (contact)
│   ├── layout/              # Site chrome: SiteHeader, SiteFooter, WhatsAppButton,
│   │                       # LanguageSwitch
│   ├── common/             # Shared infrastructure (Cookie, grid, ReducedMotion,
│   │                       # Skeletons, analytics/AnalyticsScripts)
│   └── animation/springs/  # ⚠️ Animation engine — #do-not-modify
│
├── hooks/                  # Custom hooks, grouped by domain
│   ├── animation/          # ⚠️ Animation hooks — #do-not-modify
│   ├── smooth-scroll/      # useScroll Zustand store
│   └── use-window-size.ts
│
├── lib/                    # Third-party client init / global config
│   ├── animation/ticker.ts # Shared app-wide requestAnimationFrame loop
│   ├── api/                # API route-handler helpers (handle, ApiError)
│   ├── api-client.ts       # Typed same-origin /api fetch wrapper (client)
│   ├── site.ts             # Site-wide SEO config (single source of truth)
│   └── springs/config.ts   # Global animation config
│
├── utils/                  # Pure utility functions (no side effects)
│   ├── animation/coords.ts
│   ├── seo/generate-page-metadata.ts · seo/structured-data.ts · seo/locale-alternates.ts
│   ├── is-bot.ts · lvh.ts · math.ts · scroll-to.ts
│
├── types/                  # Shared TypeScript types
│   └── springs.ts
│
└── style/                  # Extra CSS layers imported into globals.css
    └── index.css
```

## `public/` — static assets

```
public/
├── favicon.ico, *-icon-*.png, manifest.json, browserconfig.xml, open-graph.png
│                            # site-level meta / PWA / SEO assets — stay at the root
└── assets/                  # site content assets (images, video, …)
    └── <section>/           # one folder per section that uses them
```

> [!important] Asset convention
> Content assets used **on the site** (images, videos, …) live under
> `public/assets/`, and **each section gets its own folder** — e.g.
> `public/assets/hero/`, `public/assets/footer/`. Reference them by absolute
> path (`/assets/hero/bg.webp`). Meta/PWA/SEO assets (favicons, icons,
> `manifest.json`, `open-graph.png`) stay at the `public/` root.

## Placement rules — where do I put a new file?

| I am adding… | It goes in… |
|--------------|-------------|
| A route | `app/<route>/page.tsx` — 3 lines, delegates to a view |
| An API endpoint | `app/api/<resource>/route.ts` — see [[api-architecture]] |
| A page's UI | `views/<page-name>.tsx` — see [[new-page]] |
| A reusable design primitive | `components/ui/` |
| A lead-gen / data-collecting form | `components/forms/` — reused across pages (e.g. `RegistrationForm` on Home + Admissions) |
| Site chrome (header/footer/nav) | `components/layout/` |
| Shared infra (provider-dependent) | `components/common/` |
| A feature-specific component | next to the feature, **not** in `components/` |
| A custom hook | `hooks/<domain>/` |
| A pure helper | `utils/<domain>/` |
| A shared type | `types/` |
| Page copy / content | `messages/{locale}.json`, read via `useTranslations`/`getTranslations` — **not** `src/data/mocks/` on this project, since real content is bilingual by definition. `t.raw()` reads structured arrays (cards, stats, FAQ items). |
| A third-party client init | `lib/` |
| A site content asset (image, video) | `public/assets/<section>/` — one folder per section |
| A favicon / icon / OG / manifest asset | `public/` root |

## Do-not-modify zones

`components/animation/springs/` and `hooks/animation/` are the animation engine.
Treat them as a vendored library — consume them, never edit them. See [[animation-system]].

## Related

[[system-overview]] · [[component-conventions]] · [[routing]]
