# Project Research Summary

**Project:** TURFu Landing - Mobile UX Fixes for /content Module
**Domain:** Mobile-responsive documentation site
**Researched:** 2026-01-29
**Confidence:** HIGH

## Executive Summary

This project fixes three critical mobile UX issues in an existing Next.js 14 + Tailwind CSS documentation module: horizontal overflow causing page-wide scrolling, a broken hamburger menu preventing navigation access, and a missing back-to-top button on long documentation pages. All three issues are table stakes violations that modern documentation users expect to work flawlessly.

The recommended approach uses pure Tailwind utilities with a mobile-first responsive strategy. No additional libraries are needed. The core pattern is an off-canvas drawer sidebar (hidden by default on mobile, slides in on toggle) combined with overflow containment for code blocks and proper content width constraints. This follows industry-standard patterns used by Docusaurus, GitBook, and Tailwind's own documentation.

The key risk is iOS Safari-specific behavior with fixed positioning and z-index stacking contexts that can cause the hamburger menu to fail silently. Mitigation requires testing on actual iOS devices, using fixed positioning at root level (not nested), and implementing body scroll locking when the mobile menu is open. Implementation complexity is low, with fixes deliverable in under 2 hours total.

## Key Findings

### Recommended Stack

The existing stack already handles all requirements. No new dependencies should be added.

**Core technologies:**
- **Tailwind CSS** - All responsive utilities, transitions, and positioning patterns needed for mobile-first layouts
- **Lucide React** - Already in use for icons (Menu, X, ChevronUp) needed for navigation components
- **React hooks (useState, useEffect)** - State management for sidebar toggle and scroll detection

**Critical version requirement:** None - current versions sufficient.

**Do not add:** Headless UI (unnecessary for simple drawer), Framer Motion (Tailwind transitions sufficient), custom CSS (use Tailwind utilities).

### Expected Features

Research identified three feature types: table stakes (must-have for usable mobile docs), nice-to-have differentiators, and anti-features to avoid.

**Must have (table stakes):**
- No horizontal overflow - content stays within viewport boundaries
- Working hamburger menu - reliable toggle for navigation access
- Responsive content width - text readable without zooming
- Touch-friendly tap targets - minimum 44x44px (WCAG 2.5.8 Level AA)
- Back-to-top button - appears after 4+ screens of scroll
- Collapsible sidebar navigation - screen real estate optimization
- Scrollable code blocks - `overflow-x: auto` prevents layout breaking
- Responsive images - `max-width: 100%; height: auto;`

**Should have (competitive):**
- Reading progress indicator - shows position in long articles
- Copy button on code blocks - developer convenience (Docusaurus standard)
- Section anchor links - share specific sections

**Defer (v2+):**
- Search modal improvements
- Swipe gestures for navigation
- Offline support (PWA)
- Collapsible table of contents on mobile

### Architecture Approach

Modern documentation sites use a three-column layout (sidebar | content | TOC) on desktop that degrades gracefully on mobile. The pattern: desktop shows all columns with sticky positioning; tablet shows sidebar only; mobile hides all sidebars behind off-canvas drawers triggered by hamburger menu.

**Major components:**
1. **ContentLayout** - Wrapper managing sidebar state via React useState, provides context for toggle button and backdrop
2. **ContentSidebar** - Article navigation rendered as off-canvas drawer on mobile (fixed, translateX), static sidebar on desktop (sticky)
3. **MobileSidebarToggle** - Floating button or header bar button visible only on mobile (<md breakpoint)
4. **SidebarBackdrop** - Fixed overlay when sidebar open, closes menu on tap, prevents interaction with content
5. **BackToTop** - Fixed position button in lower-right, appears after 400px scroll, smooth scroll behavior
6. **ArticleContent** - Main content area with constrained width (max-w-3xl), full width on mobile with responsive padding

**Key patterns:**
- Mobile-first responsive sidebar: `fixed md:sticky` with `transform -translate-x-full md:translate-x-0`
- Overflow prevention: `min-w-0` on flex children, `overflow-x-hidden` on wrapper, `overflow-x-auto` on code blocks
- Z-index layering: backdrop z-30, sidebar z-40, navbar z-50
- Body scroll lock: `overflow-hidden` on body when mobile menu open

### Critical Pitfalls

1. **Using `100vw` for full-width elements** - Causes horizontal scrollbar on systems with visible scrollbars. The viewport width unit includes scrollbar width. Fix: Use `w-full` (100%) instead of `w-screen` (100vw).

2. **Fixed-width sidebar without mobile handling** - Current `ContentSidebar` has `w-72` (288px) with no responsive classes. On 375px mobile, leaves only 87px for content. Fix: Use `fixed md:sticky` with transform-based hide/show pattern.

3. **Hamburger menu exists but doesn't slide out** - Common causes: z-index stacking context issues (parent creates stacking context trapping menu), iOS Safari position:fixed bugs, click handler not attached. Fix: Put mobile menu at root level, not nested inside positioned/transformed elements. Test on actual iOS Safari.

4. **Code blocks causing horizontal page overflow** - `<pre>` elements preserve whitespace and don't wrap. Without `overflow-x: auto` on container, long lines push entire page width. Fix: Wrap code blocks in `overflow-x-auto` container or apply directly to `<pre>`.

5. **Touch targets too small** - Links and buttons below 44x44px cause tap frustration and WCAG failures. Fix: Use `p-3` padding (48px total with 24px icon) or explicit `min-h-[44px] min-w-[44px]`.

## Implications for Roadmap

Based on research, suggested phase structure prioritizes quick wins and dependency order:

### Phase 1: Fix Horizontal Overflow
**Rationale:** Quick win that immediately improves usability. Takes 10-15 minutes. No complex state management required. Must be fixed before other changes to establish correct baseline.

**Delivers:** All content stays within viewport boundaries on mobile devices.

**Addresses features:**
- No horizontal overflow (table stakes)
- Responsive content width (table stakes)
- Scrollable code blocks (table stakes)
- Responsive images (table stakes)

**Implementation:**
- Add `min-w-0 overflow-x-hidden` to main content wrapper in `content/layout.tsx`
- Add responsive padding `p-4 md:p-8` to article page
- Verify `MarkdownRenderer.tsx` code blocks have `overflow-x-auto` (already present)
- Add `max-w-full h-auto` to images if not using Tailwind Typography defaults

**Avoids pitfalls:**
- Pitfall 1 (100vw usage)
- Pitfall 4 (code block overflow)
- Pitfall 12 (image overflow)

**Research needed:** No - standard Tailwind utility patterns.

### Phase 2: Mobile Sidebar Toggle
**Rationale:** Core functionality fix. Enables navigation access on mobile. Requires state management and component coordination. Depends on overflow fix being in place to ensure drawer doesn't cause additional scroll issues.

**Delivers:** Working hamburger menu that reveals sidebar navigation on mobile.

**Addresses features:**
- Working hamburger menu (table stakes)
- Collapsible sidebar navigation (table stakes)
- Touch-friendly tap targets (table stakes)

**Implementation:**
- Convert `content/layout.tsx` to client component ('use client')
- Add useState for sidebar open/closed state
- Update `ContentSidebar` with `isOpen` and `onClose` props
- Apply responsive classes: `fixed md:sticky`, `transform -translate-x-full md:translate-x-0`
- Add mobile toggle button (floating or header bar) with 44x44px touch target
- Add backdrop overlay with `fixed inset-0 bg-black/50 z-30 md:hidden`
- Implement body scroll lock with useEffect
- Add close-on-navigation behavior

**Avoids pitfalls:**
- Pitfall 2 (fixed sidebar without mobile handling)
- Pitfall 3 (menu doesn't slide out)
- Pitfall 6 (misusing sm: prefix)
- Pitfall 7 (small touch targets)
- Pitfall 8 (body scroll not locked)

**Research needed:** No - well-documented pattern from Flowbite, shadcn/ui, Tailwind docs.

**Critical test:** Must verify on iOS Safari with actual device, not just DevTools.

### Phase 3: Back-to-Top Button
**Rationale:** Expected feature, easy to implement after layout is stable. Independent component, no dependencies on other phases. Improves long-page navigation significantly.

**Delivers:** Floating button in lower-right that appears after scrolling 400px, returns user to top with smooth scroll.

**Addresses features:**
- Back-to-top button (table stakes)
- Touch-friendly tap target (44x44px)

**Implementation:**
- Create `BackToTop.tsx` component with useState for visibility
- Add useEffect with scroll listener (passive: true for performance)
- Show when `window.scrollY > 400`
- Position `fixed bottom-4 right-4 z-50`
- Size `p-3` (48px with 24px icon) for touch target
- Smooth scroll via `window.scrollTo({ top: 0, behavior: 'smooth' })`
- Include in main layout or individual article pages

**Avoids pitfalls:**
- Pitfall 9 (missing back-to-top on long pages)

**Research needed:** No - standard pattern documented by Nielsen Norman Group, Red Hat Design System.

### Phase Ordering Rationale

- **Overflow first** - Establishes correct baseline, prevents new issues when adding drawer
- **Sidebar second** - Core navigation functionality, more complex than back-to-top
- **Back-to-top last** - Independent feature, no dependencies, can be added/tested separately

This order follows dependency chain (overflow -> sidebar -> enhancement) and prioritizes impact (unusable navigation > convenience feature). Each phase is independently testable and deployable.

### Research Flags

**Phases with standard patterns (skip research-phase):**
- **Phase 1** - Pure Tailwind utilities, well-documented in official docs
- **Phase 2** - Off-canvas drawer is standard pattern with multiple implementation guides (Flowbite, shadcn/ui)
- **Phase 3** - Back-to-top button has established UX guidelines from NN/g

**All phases use verified patterns. No deeper research needed during planning.**

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Official Tailwind CSS documentation, existing stack sufficient |
| Features | HIGH | Multiple authoritative sources (NN/g, W3C WCAG, Docusaurus, GitBook) |
| Architecture | HIGH | Verified with Tailwind docs, Flowbite, shadcn/ui patterns |
| Pitfalls | HIGH | Official docs (MDN, Tailwind), established UX research (NN/g) |

**Overall confidence:** HIGH

All findings verified against official documentation and multiple credible sources. Patterns are industry-standard with proven implementations in major documentation platforms.

### Gaps to Address

**iOS Safari testing:** Research identified iOS-specific issues with position:fixed and hamburger menus. Must test Phase 2 implementation on actual iOS Safari (iPhone 12+), not just DevTools or desktop Safari. If issues arise, fallback pattern is to use absolute positioning with body scroll lock instead of fixed positioning.

**Accessibility validation:** While research covered WCAG 2.5.8 target size requirements and screen reader best practices, final implementation should be tested with:
- Keyboard-only navigation (Tab through all interactive elements)
- Screen reader (VoiceOver on iOS, TalkBack on Android)
- Focus indicators visible on all interactive elements

These are validation tasks during implementation, not gaps in research.

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design) - Breakpoints, mobile-first approach, responsive variants
- [Tailwind CSS Overflow](https://tailwindcss.com/docs/overflow) - overflow-x-auto, overflow-hidden utilities
- [W3C WCAG 2.5.8 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) - 24x24px minimum, 44x44px recommended
- [NN/g Back-to-Top Guidelines](https://www.nngroup.com/articles/back-to-top/) - Position, timing, accessibility
- [Flowbite Drawer Component](https://flowbite.com/docs/components/drawer/) - Off-canvas pattern
- [Docusaurus Styling and Layout](https://docusaurus.io/docs/styling-layout) - Documentation site patterns

### Secondary (MEDIUM confidence)
- [shadcn/ui Sidebar](https://ui.shadcn.com/docs/components/sidebar) - Modern React sidebar architecture
- [Red Hat Design System Back-to-Top](https://ux.redhat.com/elements/back-to-top/guidelines/) - UX guidelines
- [CSS-Tricks Horizontal Overflow Debugging](https://css-tricks.com/findingfixing-unintended-body-overflow/) - Debugging strategies
- [iOS Safari Hamburger Menu Issues](https://medium.com/@jaredt_28429/why-do-hamburger-menus-break-in-ios-safari-e076083bda5c) - iOS-specific pitfalls
- [Z-Index and Stacking Contexts](https://www.joshwcomeau.com/css/stacking-contexts/) - Technical deep-dive

### Tertiary (LOW confidence)
- None - all research verified with multiple authoritative sources

---
*Research completed: 2026-01-29*
*Ready for roadmap: yes*
