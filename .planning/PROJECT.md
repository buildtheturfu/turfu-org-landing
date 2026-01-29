# Turfu.org Content Module Mobile UX Fix

## What This Is

Mobile UX fixes for the /content documentation module of Turfu.org landing page. The module currently has layout overflow issues and broken navigation on mobile devices, making it unusable for mobile visitors.

## Core Value

The /content documentation must be as pleasant to use on mobile as on desktop, following modern documentation site UX conventions.

## Requirements

### Validated

- ✓ Multi-locale landing page (fr, en, tr) — existing
- ✓ Content/article listing with filtering — existing
- ✓ Article detail pages with markdown rendering — existing
- ✓ Admin dashboard for article management — existing
- ✓ Authentication system with bcrypt hashing — existing
- ✓ Responsive homepage sections — existing

### Active

- [ ] Fix horizontal scroll overflow on /content mobile view
- [ ] Fix hamburger menu functionality in /content pages
- [ ] Add "back to top" button site-wide

### Out of Scope

- Backend changes — scope is frontend/CSS only
- New features — this is a UX fix milestone
- Homepage changes — focus is /content module
- Admin panel mobile — not mentioned as broken

## Context

**Technical environment:**
- Next.js 14 App Router with TypeScript
- Tailwind CSS for styling
- next-intl for i18n (fr, en, tr locales)
- Deployed on Vercel

**UX references provided:**
- Notion
- GitBook
- Docusaurus
- Tailwind Docs

**Live site:** https://turfu-org-landing.vercel.app/fr/content

**Existing codebase analysis:**
- Content pages: `src/app/[locale]/content/page.tsx` and `src/app/[locale]/content/[slug]/page.tsx`
- Components likely involved: navigation/header, content layout, article list
- Tailwind responsive utilities available (sm:, md:, lg:, xl:)

## Constraints

- **Frontend only**: No backend/API changes
- **Existing stack**: Must use Tailwind CSS (no new CSS frameworks)
- **Locale-aware**: Fixes must work across all 3 locales

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Reference modern doc sites | User specified Notion, GitBook, Docusaurus, Tailwind Docs as UX targets | — Pending |
| CSS/Tailwind only fixes | Scope is responsive UX, not structural changes | — Pending |

---
*Last updated: 2026-01-29 after initialization*
