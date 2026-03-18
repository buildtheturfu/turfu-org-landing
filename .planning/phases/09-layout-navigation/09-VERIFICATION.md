---
phase: 09-layout-navigation
verified: 2026-03-18T04:00:00Z
status: gaps_found
score: 7/9 must-haves verified
re_verification: false
gaps:
  - truth: "Mobile hamburger menu opens with all 5 nav links, language switcher, and theme toggle"
    status: partial
    reason: "Navbar is rendered in BOTH layout.tsx AND page.tsx, causing a double navbar on the homepage. page.tsx still has its own import and render of <Navbar />. On the homepage this produces two stacked navbars."
    artifacts:
      - path: "src/app/[locale]/page.tsx"
        issue: "Imports and renders <Navbar /> directly — this was correct before Phase 09 but layout.tsx now also renders Navbar. page.tsx must remove its Navbar import/render."
    missing:
      - "Remove `import Navbar from '@/components/Navbar'` and `<Navbar />` from src/app/[locale]/page.tsx"

  - truth: "Footer displays navigation links to all main sections (Vision, Publications, Ecosystem, Research, Join)"
    status: partial
    reason: "Footer is rendered only in src/app/[locale]/page.tsx (the homepage), not in src/app/[locale]/layout.tsx. All downstream pages created in later phases (vision, publications, ecosystem, research, join) will have no footer unless it is moved to the layout."
    artifacts:
      - path: "src/app/[locale]/layout.tsx"
        issue: "Footer is absent from layout.tsx — it is currently page-local only."
      - path: "src/app/[locale]/page.tsx"
        issue: "Footer rendered here instead of in the shared layout."
    missing:
      - "Move Footer import and render from src/app/[locale]/page.tsx to src/app/[locale]/layout.tsx (inside NextIntlClientProvider, after <main>)"
      - "Remove Footer from src/app/[locale]/page.tsx after moving to layout"

  - truth: "ProseLayout wraps content at 720px max-width with proper centering and padding"
    status: partial
    reason: "ProseLayout exists and is substantively correct but is not used anywhere. NAV-03 is marked Complete in REQUIREMENTS.md, but the requirement text says 'used for long-form content pages' — no such page exists yet. This is a forward-readiness gap rather than a broken component; the component is ready but the requirement's 'used' condition cannot be satisfied until Phase 14+ pages are created."
    artifacts:
      - path: "src/components/layout/ProseLayout.tsx"
        issue: "Exists and is correct but orphaned — no page imports or renders it."
    missing:
      - "No action required now (downstream phases will use it). REQUIREMENTS.md checkmark is premature but the component is ready."

human_verification:
  - test: "Verify homepage renders exactly one navbar, not two stacked navbars"
    expected: "Single sticky header with TURFu logo, 5 nav links, language switcher, and theme toggle"
    why_human: "Double Navbar confirmed by static analysis — visual confirmation needed after fix"
  - test: "Open hamburger menu on mobile viewport (< 768px)"
    expected: "Overlay opens with all 5 nav links, language switcher, and theme toggle; closes on link click"
    why_human: "Interactive touch-target behavior and animation cannot be verified programmatically"
  - test: "Click a nav link (e.g. /fr/vision) and verify active state highlight"
    expected: "Active link shows text-ink and font-medium; inactive links show text-ink-secondary"
    why_human: "Active state detection (pathname.startsWith) requires navigation to verify"
  - test: "Check footer appears on all pages when Footer is moved to layout.tsx"
    expected: "Footer with 4-column grid appears consistently at the bottom of every page"
    why_human: "Cannot verify across future pages programmatically"
---

# Phase 09: Layout & Navigation Verification Report

**Phase Goal:** Site has a multi-page navigation structure with layout primitives ready for all downstream pages
**Verified:** 2026-03-18T04:00:00Z
**Status:** gaps_found — 2 active blockers, 1 forward-readiness gap
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Header displays 5-section navigation: Vision, Publications, Ecosystem, Research, Join | VERIFIED | `navKeys = ['vision', 'publications', 'ecosystem', 'research', 'join']` in Navbar.tsx L11 |
| 2 | Language switcher (FR/EN/TR) visible in header on desktop and mobile | VERIFIED | `<LanguageSwitcher />` rendered in both desktop controls (L80) and mobile menu (L115) |
| 3 | Dark mode toggle is in the header, no longer a floating button | VERIFIED | `InlineThemeToggle` component defined and used inline in Navbar; no standalone ThemeToggle in layout.tsx |
| 4 | Mobile hamburger menu opens with all 5 nav links, language switcher, and theme toggle | PARTIAL | Mobile menu structure is correct in Navbar.tsx but page.tsx also renders `<Navbar />` — double navbar on homepage |
| 5 | All nav links point to correct locale-prefixed routes | VERIFIED | `href: \`/${locale}/${key}\`` pattern in Navbar.tsx L45 and Footer.tsx L18-23 |
| 6 | Footer displays navigation links to all main sections | PARTIAL | Footer component is correct but rendered only in page.tsx, not layout.tsx — absent from all subpages |
| 7 | Footer includes inter-sites references (epis.network, OZAM, GitHub) | VERIFIED | `siteLinks` array in Footer.tsx L25-29 with correct hrefs |
| 8 | Footer includes legal text and copyright | VERIFIED | Legal column (L105-121) and bottom bar copyright (L125-129) in Footer.tsx |
| 9 | ProseLayout and GridLayout primitives are ready for downstream pages | VERIFIED | Both exist with correct `max-w-prose` and `max-w-layout` classes; no 'use client' (RSC compatible) |

**Score: 7/9 truths verified**

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/components/Navbar.tsx` | 5-section responsive navbar with locale switch and theme toggle | VERIFIED | 124 lines, fully implemented with InlineThemeToggle, LanguageSwitcher, mobile hamburger |
| `src/app/[locale]/layout.tsx` | Root layout with Navbar in header, ThemeToggle removed from floating position | VERIFIED (partial wiring issue) | Navbar imported and rendered; ThemeToggle absent; but Footer not added here |
| `src/components/Footer.tsx` | Complete footer with nav links, inter-sites, legal | VERIFIED (orphaned from layout) | 133 lines, fully implemented; only wired to page.tsx not layout.tsx |
| `src/components/layout/ProseLayout.tsx` | 720px max-width content wrapper | VERIFIED | `max-w-prose mx-auto px-4 sm:px-6 lg:px-8`; accepts children + className |
| `src/components/layout/GridLayout.tsx` | 1200px max-width content wrapper | VERIFIED | `max-w-layout mx-auto px-4 sm:px-6 lg:px-8`; accepts children + className |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `Navbar.tsx` | `next-intl` | `useTranslations('nav')` | WIRED | L39: `const t = useTranslations('nav')` |
| `Navbar.tsx` | `next-themes` | `useTheme` inside InlineThemeToggle | WIRED | L8: `import { useTheme } from 'next-themes'`; L15: `const { resolvedTheme, setTheme } = useTheme()` |
| `layout.tsx` | `Navbar.tsx` | import and render in layout | WIRED | L8: `import Navbar from '@/components/Navbar'`; L111: `<Navbar />` |
| `Footer.tsx` | `next-intl` | `useTranslations('footer')` | WIRED | L8: `const t = useTranslations('footer')` |
| `layout.tsx` | `Footer.tsx` | import and render in layout | NOT WIRED | Footer absent from layout.tsx — only in page.tsx |
| `ProseLayout.tsx` | tailwind `max-w-prose` | className containing max-w-prose | WIRED | L8: `max-w-prose mx-auto...` |
| `GridLayout.tsx` | tailwind `max-w-layout` | className containing max-w-layout | WIRED | L8: `max-w-layout mx-auto...` |
| `page.tsx` | `Navbar.tsx` | STALE — was pre-phase wiring | COLLISION | page.tsx still imports and renders `<Navbar />` creating double navbar with layout |

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| NAV-01 | 09-01-PLAN.md | Header shows 5-section nav + language switch + dark mode toggle | SATISFIED | Navbar.tsx verified with all controls |
| NAV-02 | 09-02-PLAN.md | Footer rebuilt with complete links, inter-sites references, legal | SATISFIED (with caveat) | Footer.tsx complete but not in layout — only in homepage page.tsx |
| NAV-03 | 09-02-PLAN.md | ProseLayout wrapper (720px max-width) used for long-form content pages | PARTIAL | Component exists and is correct; "used" condition unmet — no consumer page exists yet (downstream phases) |
| NAV-04 | 09-02-PLAN.md | GridLayout wrapper (1200px max-width) used for feed and multi-column pages | PARTIAL | Component exists and is correct; "used" condition unmet — no consumer page exists yet (downstream phases) |

**Note on NAV-03/NAV-04:** REQUIREMENTS.md marks both as Complete with checkboxes. The components are fully ready and correct, but the requirements' own text says "used for..." — no page uses them yet. This is an acceptable forward-readiness state (downstream phases will satisfy the "used" condition), but the checkmarks are technically premature.

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/app/[locale]/page.tsx` | 2, 24 | `import Navbar` + `<Navbar />` | BLOCKER | Double navbar rendered on homepage; layout.tsx also renders Navbar (L111) |
| `src/app/[locale]/page.tsx` | 10, 34 | `import Footer` + `<Footer />` | WARNING | Footer not in shared layout — all future subpages will have no footer |

---

## Human Verification Required

### 1. Double Navbar on Homepage

**Test:** Load homepage (`/fr`) in browser before and after fix
**Expected:** Exactly one sticky header visible; no duplicate nav bar stacked below it
**Why human:** Static analysis confirms double import — visual check needed after fix

### 2. Mobile Hamburger Menu Behavior

**Test:** Resize to mobile viewport (< 768px), tap hamburger icon
**Expected:** Overlay opens with 5 nav links + language switcher + theme toggle; tapping any link closes menu
**Why human:** Interactive touch behavior, overlay animation, close-on-navigate require browser

### 3. Active Link Detection

**Test:** Navigate to `/fr/vision`, then `/fr/publications` — observe nav link styling
**Expected:** Current section link shows distinct style (text-ink + font-medium vs text-ink-secondary)
**Why human:** `pathname.startsWith(href)` detection requires actual browser navigation

### 4. Footer Presence on Subpages (After Fix)

**Test:** Navigate to a subpage route once downstream pages exist (or create a temp `/fr/test` page)
**Expected:** Footer with 4-column grid (brand, nav, ecosystem, legal) appears at page bottom
**Why human:** No downstream pages exist yet; requires future phase creation or manual test page

---

## Gaps Summary

Two active structural issues require immediate fixes:

**Gap 1 — Double Navbar (Blocker):** When Phase 09 added Navbar to `layout.tsx`, the old homepage-level `<Navbar />` in `page.tsx` was not removed. Every visitor to the homepage currently sees two stacked navbars. Fix: remove the Navbar import and render from `src/app/[locale]/page.tsx`.

**Gap 2 — Footer Not in Layout (Warning/Blocker for future phases):** Footer is rendered in `page.tsx` (homepage only) instead of `layout.tsx` (shared across all pages). All downstream pages (vision, publications, ecosystem, research, join) will have no footer. Fix: move Footer import and `<Footer />` render from `page.tsx` into `layout.tsx`, inside `NextIntlClientProvider`, positioned after `<main>`.

**Gap 3 — NAV-03/NAV-04 "used" condition (Forward-readiness gap):** ProseLayout and GridLayout are fully implemented and correct but not yet consumed by any page. REQUIREMENTS.md marks them Complete, but the "used for..." text in the requirements is not yet satisfied. No code fix needed now — downstream phases will satisfy this when they create the pages. This gap is informational only.

---

_Verified: 2026-03-18T04:00:00Z_
_Verifier: Claude (gsd-verifier)_
