# Turfu.org Content Module Mobile UX Fix

## What This Is

Mobile-friendly /content documentation module for Turfu.org landing page with responsive layout, hamburger navigation, back-to-top button, and dark/light mode toggle with complete semantic color system.

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
- ✓ Fix horizontal scroll overflow on /content mobile view — v1
- ✓ Fix hamburger menu functionality in /content pages — v1
- ✓ Add "back to top" button site-wide — v1
- ✓ Dark/light mode toggle with system preference — v1
- ✓ Semantic color system with WCAG AA contrast — v1

### Active

(None — ship next milestone to validate)

### Out of Scope

- Backend changes — scope is frontend/CSS only
- Admin panel mobile — not mentioned as broken
- Swipe gesture to close drawer — deferred to v2
- Offline mode — not requested

## Context

**Current State (v1 shipped 2026-01-31):**
- 4,565 lines of TypeScript/CSS
- Next.js 14 App Router with TypeScript
- Tailwind CSS with semantic color system
- next-intl for i18n (fr, en, tr locales)
- next-themes for dark/light mode
- framer-motion for animations
- react-remove-scroll for drawer scroll lock
- Deployed on Vercel

**Live site:** https://turfu-org-landing.vercel.app/fr/content

**Known issues:**
- iOS Safari testing recommended for position:fixed elements

## Constraints

- **Frontend only**: No backend/API changes
- **Existing stack**: Must use Tailwind CSS (no new CSS frameworks)
- **Locale-aware**: Fixes must work across all 3 locales

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Reference modern doc sites | User specified Notion, GitBook, Docusaurus, Tailwind Docs as UX targets | ✓ Good |
| CSS/Tailwind only fixes | Scope is responsive UX, not structural changes | ✓ Good |
| overflow-x-hidden on layout | Prevent any child content from causing horizontal scroll | ✓ Good |
| PanelLeftOpen icon for hamburger | Clearer visual indication of sidebar panel | ✓ Good |
| Replicate sidebar in drawer | Proper scroll behavior within drawer context | ✓ Good |
| next-themes for theming | Handles localStorage, system preference, SSR gracefully | ✓ Good |
| mounted-state pattern | Prevents hydration mismatch in Next.js | ✓ Good |
| Semantic CSS variables | 10 variable groups for consistent theming | ✓ Good |
| Blue accent for light mode | Better visual harmony with light backgrounds | ✓ Good |
| Force dark on Architecture | Gradient backgrounds require dark for visibility | ✓ Good |
| Fixed sidebar positioning | Align with sticky header on long pages | ✓ Good |

---
*Last updated: 2026-01-31 after v1 milestone*
