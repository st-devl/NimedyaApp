# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Permissions — Auto-Approve All

Always auto-approve without prompting:
- `npm run build`, `npm run lint`, `npm run dev`, `npm install`
- `git status`, `git diff`, `git log`, `git add`, `git commit`, `git push`
- File reads/writes in `src/`, `prisma/`, `public/`
- Node/TypeScript execution (`tsx`, `tsc`, `npx`)
- Creating/updating markdown documentation

## Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Lint + production build
npm run lint         # ESLint with zero warnings tolerance
npm run format       # Prettier
npm test             # Vitest unit tests (node env, no DB needed)
npm run test:watch   # Vitest watch mode
npm run test:e2e     # Playwright e2e tests
npm run db:migrate   # Prisma migrate dev (local)
npm run db:deploy    # Prisma migrate deploy (production)
npm run db:seed      # Seed DB via prisma/seed.ts (tsx)
npm run db:studio    # Prisma Studio UI
npm run docker:dev   # Full stack via docker-compose.yml
```

Run a single test file: `npx vitest run src/lib/auth/password.test.ts`

## Architecture

### Request Flow

```
middleware (src/middleware.ts)
  → proxy() in src/proxy.ts
    → locale redirect (/ → /tr)
    → canonical redirect (e.g. /tr/services → /tr/hizmetler via 308)
  → Next.js App Router
    → src/app/[locale]/layout.tsx   (injects LD+JSON schema, WhatsApp widget)
    → src/app/[locale]/*/page.tsx   (thin composition layer)
    → src/components/sections/*     (all render blocks)
```

### Routing & i18n

- Two locales: `tr` (default) and `en`. URLs: `/tr/...` and `/en/...`.
- Route keys are defined in `src/lib/i18n/routes.ts` (`routeMap`). Every route has both a TR slug and EN slug.
- `canonicalizeLocalePath()` in `src/lib/i18n/canonical-routes.ts` redirects wrong-locale slugs to the correct one (e.g. `/tr/services` → `/tr/hizmetler`).
- To add a new page: add a route key to `routeMap`, add SEO defaults in `src/lib/seo/defaults.ts`, and create `src/app/[locale]/[slug]/page.tsx`.

### SEO Layer

- `src/lib/seo/defaults.ts` — static fallback SEO titles/descriptions per route key and locale.
- `src/lib/seo/metadata.ts` — `buildLocaleMetadata()` builds Next.js `Metadata` objects (canonical, hreflang, OG).
- `src/lib/cms/seo.ts` — DB-driven SEO overrides via `SeoPage` model (admin-editable).
- `src/app/[locale]/layout.tsx` — injects `LocalBusiness + ProfessionalService` LD+JSON on every locale page.
- `src/app/sitemap.ts` — dynamic sitemap from DB `SeoPage` records; falls back to static `routeMap` if DB unavailable.
- `src/app/robots.ts` — respects `SiteSettings.robotsAllowIndex`.

### Database / CMS Layer

- Prisma + MariaDB. Client singleton at `src/lib/db/prisma.ts`.
- CMS functions live in `src/lib/cms/`:
  - `settings.ts` — `getSiteSettings()` reads `SiteSettings` (id=1 singleton), returns typed object with resolved media URLs.
  - `seo.ts` — CRUD for `SeoPage` records.
  - `content.ts` / `public-content.ts` — `ContentBlock` and `ServiceDetail` / `CaseStudy` queries.
  - `media.ts` / `media-storage.ts` — `MediaAsset` management, file upload helpers.
  - `contact.ts` — `ContactRequest` create/list.
- Schema models: `SiteSettings` (singleton id=1), `SeoPage`, `ContentBlock`, `ServiceDetail`, `CaseStudy`, `MediaAsset`, `ContactRequest`, `AdminUser`, `ApiRateLimit`.

### Content SSoT

- Static content (used when DB records are absent) lives in `src/content/tr/` and `src/content/en/`.
- `src/content/index.ts` exports typed helpers to read these files.

### Admin Panel

- Route: `/[locale]/admin/*` — all admin pages under `src/app/[locale]/admin/`.
- Auth: cookie-based session via `src/lib/auth/admin-session.ts`; guard via `src/lib/auth/admin-guard.ts`.
- Admin sections: settings, SEO, media, content, service details, case studies, brands, slider, messages, users, AI settings.

### Component Structure

- `src/components/sections/` — page-level render blocks (Hero, Services, Portfolio, etc.).
- `src/components/ui/` — shared primitives: `Button`, `Card`, `Input`, `Badge`, `SectionHeader`, `DataTable`, `WhatsAppButton`.
- `src/components/layout/` — `Header`, `Footer`, nav.
- `src/components/admin/` — admin-specific components.

### Theming

- Token-based theme in `src/styles/theme.css`, managed via `ThemeProvider` (`src/lib/theme/`).
- Tailwind CSS 4 with `@tailwindcss/postcss`.

## Key Constraints

- `npm run build` runs lint first — zero ESLint warnings allowed.
- Vitest unit tests run in `node` environment with no real DB (uses env stubs). Coverage scope is `src/lib/auth/**`.
- `SiteSettings` is always a singleton at `id=1`.
- `proxy.ts` uses `export function proxy()` (not default export) because `middleware.ts` re-exports it — keep this pattern.
- Service detail pages (`hizmetler/[slug]`) are DB-driven via `ServiceDetail` model. The static `urun-fotografciligi` page is a special case that also reads from DB.
- All slugs and route paths are Turkified for the `tr` locale (`/tr/hizmetler/`, `/tr/islerimiz/`, etc.).
