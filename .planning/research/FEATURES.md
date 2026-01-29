# Feature Landscape: Mobile Documentation UX

**Domain:** Mobile documentation site UX
**Researched:** 2026-01-29
**Confidence:** HIGH (verified against official sources and multiple credible references)

## Executive Summary

Modern documentation sites (Notion, GitBook, Docusaurus, Tailwind Docs) share common mobile UX patterns that users now expect. This research maps table stakes features (must-have for usable mobile docs), nice-to-have differentiators, and anti-features to avoid. The three issues identified in PROJECT.md (horizontal overflow, broken hamburger menu, missing back-to-top) are all table stakes violations.

---

## Table Stakes

Features users expect. Missing = documentation feels broken or unusable on mobile.

| Feature | Why Expected | Complexity | User Benefit | Notes |
|---------|--------------|------------|--------------|-------|
| **No horizontal overflow** | Content breaking viewport = unusable | Low | Can read without side-scrolling | Code blocks and images are common culprits |
| **Working hamburger menu** | Standard mobile navigation pattern | Low | Access to navigation on any page | Must toggle open/closed reliably |
| **Responsive content width** | Text readable without zooming | Low | Natural reading on any device | Use `max-width: 100%` not `100vw` |
| **Touch-friendly tap targets** | WCAG 2.5.8 Level AA requirement | Low | Accessible to all users | Minimum 24x24px, ideally 44x44px |
| **Readable typography** | Mobile screens demand larger base | Low | No squinting or pinching | 16px minimum body text |
| **Back-to-top button** | Long-form content standard | Low | Quick navigation on long pages | Appears after 4+ screens of scroll |
| **Sticky/accessible header** | Navigation always reachable | Medium | Never trapped in content | Either sticky or hamburger access |
| **Collapsible sidebar navigation** | Screen real estate is limited | Medium | Focus on content, navigation when needed | Slide-out pattern preferred |
| **Responsive images** | Images must not overflow | Low | No horizontal scroll from images | `max-width: 100%; height: auto;` |
| **Scrollable code blocks** | Code often exceeds viewport | Low | View code without breaking layout | `overflow-x: auto` on `<pre>` |

### Details on Critical Table Stakes

#### 1. No Horizontal Overflow

**What users expect:** Content stays within viewport boundaries. No horizontal scrollbar on the body/page level.

**Common causes:**
- Code blocks with long lines and no `overflow-x: auto`
- Fixed-width elements (images, tables, embeds)
- Using `100vw` instead of `100%` (includes scrollbar width)
- Padding/margins not adjusted for mobile

**Implementation pattern:**
```css
/* Prevent page-level overflow */
body {
  overflow-x: hidden;
}

/* Code blocks scroll internally */
pre {
  max-width: 100%;
  overflow-x: auto;
}

/* Images constrained */
img {
  max-width: 100%;
  height: auto;
}
```

**Confidence:** HIGH (MDN documentation, CSS-Tricks, multiple implementation guides)

#### 2. Working Hamburger Menu

**What users expect:** Tapping the hamburger icon reveals navigation. Tapping again (or outside) closes it. Navigation items are tappable.

**Standard behavior:**
- Icon in top-left or top-right corner (consistent placement)
- Opens slide-out sidebar or dropdown
- Includes all primary navigation items
- Closes when navigating to a new page
- Touch target at least 44x44px

**Docusaurus pattern:**
- Uses 996px breakpoint for mobile/desktop switch
- Hamburger reveals left sidebar with doc navigation
- Separate from table-of-contents (right sidebar on desktop)

**Confidence:** HIGH (Docusaurus documentation, Justinmind, Elementor best practices)

#### 3. Back-to-Top Button

**What users expect:** After scrolling several screens, a button appears to return to top. Common on all major documentation platforms.

**Best practices (per Nielsen Norman Group):**
- Show only for pages longer than 4 screens
- Position: lower-right corner (thumb-friendly zone)
- Delay appearance until user scrolls AND shows intent to scroll up
- Label: "Back to Top" or clear up-arrow icon
- Stay stationary once visible (no movement)
- Size: Large enough for touch (44x44px recommended)
- Never auto-scroll the page

**Confidence:** HIGH (NN/g, Red Hat Design System, California Design System)

---

## Nice to Have (Differentiators)

Features that improve mobile UX but aren't expected as baseline.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Collapsible table of contents** | Quick section jumping on mobile | Medium | Notion and Docusaurus include this |
| **Reading progress indicator** | Shows position in long article | Low | Subtle top bar showing scroll progress |
| **Keyboard shortcut hints** | Power user acceleration | Low | `Cmd+K` for search modal |
| **Search modal (not in header)** | Full-screen search on mobile | Medium | Better than cramped header search |
| **Swipe gestures** | Native-feeling navigation | High | Swipe to open sidebar, swipe between articles |
| **Dark mode toggle accessible** | User preference respect | Low | Must be findable on mobile too |
| **Breadcrumbs** | Location awareness | Low | "Docs > Getting Started > Installation" |
| **Offline support (PWA)** | Reference docs without network | High | GitBook offers this |
| **Copy button on code blocks** | Developer convenience | Low | Standard in Docusaurus, GitBook |
| **Section anchor links** | Share specific sections | Low | Click heading to copy link |

### Notable Differentiators by Platform

**Notion Mobile:**
- Bottom navigation bar (always visible)
- Home, Search, Inbox, Create shortcuts
- Thumb-friendly zone usage

**GitBook:**
- AI-powered search
- Desktop/mobile preview toggle in editor
- Cross-platform responsive design

**Docusaurus:**
- Three-column layout collapses intelligently
- Sidebar + TOC both accessible on mobile (different triggers)
- Algolia search integration

**Tailwind Docs:**
- Command palette search (Cmd+K)
- Exceptional code block styling
- Container queries for component-level responsiveness

---

## Anti-Features

Features to explicitly NOT implement. Common mistakes in mobile documentation.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Hover-only interactions** | Touch devices have no hover | Use tap/click interactions, show tooltips on focus |
| **Tiny tap targets** | Frustrating, accessibility violation | Minimum 24x24px (WCAG), prefer 44x44px |
| **Fixed sidebars on mobile** | Consumes too much screen space | Collapsible hamburger-triggered sidebar |
| **Auto-playing animations** | Distracting, performance hit | User-initiated or reduced motion preference |
| **Desktop-only navigation** | Hiding navigation from mobile users | Full navigation accessible via hamburger |
| **Nested hamburger menus** | Interaction cost too high | Flat navigation or expandable sections |
| **100vw width on elements** | Causes horizontal overflow (scrollbar width) | Use `100%` or `calc(100vw - scrollbar)` |
| **Sticky elements that cover content** | Reduces readable viewport | Small sticky headers, or hide on scroll down |
| **Infinite scroll without pagination** | Loses position, performance issues | Paginated or "load more" pattern |
| **Text in images for docs** | Can't zoom text, not searchable | Use actual text, styled appropriately |
| **Tooltips for critical info** | Not accessible on touch | Show info inline or on tap |
| **Complex gestures** | Not discoverable | Simple tap interactions, optional gestures |
| **Breaking scroll position** | User loses place in content | Preserve scroll on navigation/filter changes |
| **Modal overuse** | Hard to close on mobile | Use inline expansions or dedicated pages |

### Critical Anti-Patterns for /content Module

Based on the identified issues:

1. **Horizontal overflow causing side-scrolling**
   - Likely caused by code blocks, images, or fixed-width containers
   - Fix: Audit all elements for `max-width: 100%` compliance

2. **Non-functional hamburger menu**
   - JavaScript event not firing, or menu state not toggling
   - Fix: Ensure click handler works, verify z-index stacking

3. **Missing back-to-top**
   - Users must manually scroll long articles
   - Fix: Add floating button with scroll detection

---

## Feature Dependencies

```
Horizontal Overflow Fix
    |
    +-- Responsive code blocks (overflow-x: auto)
    +-- Constrained images (max-width: 100%)
    +-- Flexible containers (no fixed widths)

Hamburger Menu Fix
    |
    +-- Click/tap handler working
    +-- Menu state management (open/closed)
    +-- Proper z-index stacking
    +-- Body scroll lock when menu open (optional)

Back-to-Top Button
    |
    +-- Scroll position detection
    +-- Conditional visibility (show after threshold)
    +-- Smooth scroll behavior
    +-- Fixed positioning (lower-right)
```

---

## MVP Recommendation (For This Milestone)

**Must fix (table stakes):**
1. Horizontal overflow - Audit and fix all overflowing elements
2. Hamburger menu - Ensure toggle works and navigation is accessible
3. Back-to-top button - Add with proper positioning and scroll detection

**Do NOT add (out of scope for this fix milestone):**
- Search modal improvements
- Swipe gestures
- Offline support
- Reading progress indicator
- Any new features beyond the three fixes

---

## Implementation Priorities

| Priority | Feature | Rationale |
|----------|---------|-----------|
| P0 | Horizontal overflow fix | Currently breaks usability completely |
| P0 | Hamburger menu fix | Users cannot navigate without this |
| P1 | Back-to-top button | Expected but less critical than navigation |
| P2 | Touch target audit | Accessibility compliance |
| P2 | Code block improvements | Developer experience |

---

## Technical Notes for Implementation

**Stack context:** Next.js 14 + Tailwind CSS

**Tailwind utilities to use:**
- `overflow-x-hidden` on body/container
- `overflow-x-auto` on code blocks
- `max-w-full` on images
- `fixed bottom-4 right-4` for back-to-top
- `z-50` for menu overlay
- `sm:hidden` / `md:block` for responsive visibility

**Breakpoint to consider:**
- Tailwind default: 640px (sm), 768px (md), 1024px (lg)
- Docusaurus uses 996px for mobile/desktop switch
- Consider consistency with existing breakpoints in codebase

---

## Sources

### HIGH Confidence (Official Documentation)
- [NN/g Back-to-Top Guidelines](https://www.nngroup.com/articles/back-to-top/)
- [W3C WCAG 2.5.5 Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [Docusaurus Styling and Layout](https://docusaurus.io/docs/styling-layout)
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN overflow-x](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
- [Notion Help: Workspaces on mobile](https://www.notion.com/help/workspaces-on-mobile)
- [GitBook UI Documentation](https://gitbook.com/docs/resources/gitbook-ui)

### MEDIUM Confidence (Multiple Credible Sources)
- [Justinmind Hamburger Menu Guide](https://www.justinmind.com/ui-design/hamburger-menu)
- [Elementor Hamburger Menu Best Practices](https://elementor.com/blog/hamburger-menus-examples-best-practices/)
- [CSS-Tricks Horizontal Overflow Debugging](https://css-tricks.com/findingfixing-unintended-body-overflow/)
- [Red Hat Design System Back-to-Top](https://ux.redhat.com/elements/back-to-top/guidelines/)
- [California Design System Back-to-Top](https://designsystem.webstandards.ca.gov/components/back-to-top/readme/)
- [Mobile Navigation UX Best Practices 2026](https://www.designstudiouiux.com/blog/mobile-navigation-ux/)

### LOW Confidence (Single Source / Needs Verification)
- Mobile-specific keyboard optimization patterns (multiple sources but implementation varies)

---

*Research complete: 2026-01-29*
*Confidence: HIGH - Multiple authoritative sources verified*
