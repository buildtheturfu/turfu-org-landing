# Phase 2: Mobile Sidebar - Research

**Researched:** 2026-01-29
**Domain:** Mobile Navigation / Off-Canvas Drawer / Body Scroll Locking
**Confidence:** HIGH

## Summary

This research investigates how to implement a mobile sidebar drawer for the `/content` documentation module. The phase requires a hamburger button that reveals the existing `ContentSidebar` as an off-canvas drawer with backdrop overlay and body scroll locking.

The codebase already uses **Framer Motion 11** for animations (verified in `package.json`) and has established patterns for `AnimatePresence` in `Architecture.tsx`. The existing `ContentSidebar.tsx` has `hidden md:flex` classes for responsive hiding, and the project uses lucide-react for icons including `Menu` and `X` (already imported in `Navbar.tsx`).

For body scroll locking, **react-remove-scroll** is the recommended solution (17M+ weekly downloads, React-native integration, iOS Safari support). The CSS-only approach using checkbox hack was rejected because it doesn't support body scroll locking - a core requirement (NAV-04).

**Primary recommendation:** Create a `MobileDrawer` wrapper component using Framer Motion for animations and react-remove-scroll for body scroll locking. The hamburger button should be placed in the content layout header, not the global Navbar.

## Standard Stack

The established libraries/tools for this domain:

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| framer-motion | ^11.0.0 | Drawer slide/fade animations | Already used for site animations, provides AnimatePresence for exit animations |
| lucide-react | ^0.460.0 | Menu/X icons | Already used throughout codebase, includes 24px icons perfect for hamburger |
| Tailwind CSS | ^3.4.14 | Responsive classes, transitions | Primary styling system, `md:` breakpoint for mobile detection |

### Supporting (New Installation Required)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-remove-scroll | ^2.5.7 | Body scroll locking | Wrap drawer content to prevent background scroll on iOS Safari |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-remove-scroll | body-scroll-lock | body-scroll-lock uses imperative API (function calls), less React-idiomatic; 17x fewer downloads |
| react-remove-scroll | CSS `overflow: hidden` on body | Fails on iOS Safari - page still scrolls behind modal |
| Framer Motion | CSS-only checkbox hack | Cannot implement body scroll lock (NAV-04 requirement); no JavaScript control |
| Custom hook | useLockBodyScroll from useHooks | Single implementation, not battle-tested for iOS edge cases |

**Installation:**
```bash
npm install react-remove-scroll
```

## Architecture Patterns

### Recommended Component Structure

The mobile drawer should NOT modify the existing `ContentSidebar.tsx`. Instead, create a wrapper that:
1. Shows hamburger button on mobile
2. Renders `ContentSidebar` inside an animated drawer on mobile
3. Passes through to desktop layout unchanged

```
src/components/content/
├── ContentSidebar.tsx     # UNCHANGED - existing sidebar content
├── MobileSidebarDrawer.tsx # NEW - handles mobile drawer logic
└── MobileSidebarToggle.tsx # NEW - hamburger button component (optional)
```

### Pattern 1: Mobile Drawer with AnimatePresence

**What:** Animated off-canvas drawer that mounts/unmounts with exit animations
**When to use:** Any overlay that needs smooth enter/exit transitions

```tsx
// Source: Established codebase pattern from Architecture.tsx lines 337-376
import { AnimatePresence, motion } from 'framer-motion';
import { RemoveScroll } from 'react-remove-scroll';

// Animation variants
const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.1 } }, // Exits after panel
};

const panelVariants = {
  initial: { x: '-100%' },
  animate: { x: 0, transition: { type: 'tween', duration: 0.3 } },
  exit: { x: '-100%', transition: { type: 'tween', duration: 0.2 } },
};

// Usage
<AnimatePresence>
  {isOpen && (
    <RemoveScroll>
      {/* Backdrop */}
      <motion.div
        {...backdropVariants}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      {/* Panel */}
      <motion.aside
        {...panelVariants}
        className="fixed inset-y-0 left-0 w-72 z-50"
      >
        <ContentSidebar {...props} />
      </motion.aside>
    </RemoveScroll>
  )}
</AnimatePresence>
```

### Pattern 2: Accessible Hamburger Button

**What:** Touch-friendly button with proper ARIA attributes
**When to use:** Any toggle button for navigation drawers

```tsx
// Source: WCAG 2.5.8 target size, ARIA authoring practices
<button
  onClick={() => setIsOpen(true)}
  className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
  aria-label="Open navigation menu"
  aria-expanded={isOpen}
  aria-controls="mobile-sidebar"
>
  <Menu size={24} className="text-white" />
</button>
```

Key requirements:
- **44x44px minimum touch target** (w-11 h-11 = 44px in Tailwind)
- **aria-expanded** toggles with drawer state
- **aria-controls** points to drawer element id
- **aria-label** describes action, not icon

### Pattern 3: Drawer Header with Close Button

**What:** Header inside drawer with close affordance
**When to use:** Any drawer/modal that needs explicit close button

```tsx
// Close button in drawer header
<button
  onClick={onClose}
  className="flex items-center justify-center w-11 h-11 rounded-lg hover:bg-white/10 transition-colors"
  aria-label="Close navigation menu"
>
  <X size={24} className="text-white" />
</button>
```

### Anti-Patterns to Avoid

- **Modifying ContentSidebar.tsx extensively:** The existing component works. Create a wrapper instead of adding drawer logic inside it.
- **Using CSS-only drawer without JS:** Cannot implement body scroll locking (NAV-04).
- **Forgetting z-index layering:** Drawer (z-50) must be above backdrop (z-40), both above content.
- **Hardcoding breakpoint values:** Use Tailwind's `md:` classes which match the existing `hidden md:flex` pattern.
- **Using `useEffect` for focus trapping without cleanup:** Can cause memory leaks; react-remove-scroll handles this.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Body scroll lock | `document.body.style.overflow = 'hidden'` | react-remove-scroll | iOS Safari ignores overflow:hidden; also handles -webkit-overflow-scrolling, scroll position preservation |
| Exit animations | Conditional rendering with CSS transitions | AnimatePresence + motion | CSS transitions can't animate unmounting; AnimatePresence delays unmount until exit animation completes |
| Touch outside close | onClick on backdrop | react-remove-scroll with `<div onClick={close}>` | RemoveScroll already isolates scroll; just add onClick handler |
| Focus management | Manual focus trap | react-remove-scroll `forwardProps` + `removeScrollBar` | Handles edge cases like nested scrollables, iOS rubber-banding |

**Key insight:** iOS Safari body scroll locking is notoriously broken. The "simple" solution of `overflow: hidden` on body fails because iOS treats fixed-position elements specially. react-remove-scroll applies multiple CSS hacks including `position: fixed` with scroll position preservation and `touch-action: none` selectively.

## Common Pitfalls

### Pitfall 1: iOS Safari Body Scroll Leak

**What goes wrong:** Background page scrolls while drawer is open on iOS Safari
**Why it happens:** iOS Safari ignores `overflow: hidden` on body for touch events; also has issues with `-webkit-overflow-scrolling: touch`
**How to avoid:** Use react-remove-scroll which applies `position: fixed` on body with scroll position restoration
**Warning signs:** Testing only on Chrome DevTools mobile simulator (works) but not on real iOS device (fails)

### Pitfall 2: Z-Index Stacking Context

**What goes wrong:** Drawer appears behind navbar or other fixed elements
**Why it happens:** The global `Navbar` component uses `z-50`. Drawer elements need to be in same or higher stacking context.
**How to avoid:**
- Backdrop: `z-40` (below navbar - allows navbar to show above backdrop)
- Drawer panel: `z-50` (same as navbar - drawer slides under navbar)
- Or render drawer inside a portal to body
**Warning signs:** Drawer flickers or is partially hidden when opening

### Pitfall 3: Missing Exit Animation

**What goes wrong:** Drawer disappears instantly instead of sliding out
**Why it happens:** React unmounts component before animation can play
**How to avoid:** Wrap conditional render in `AnimatePresence`, add `exit` variant to motion component
**Warning signs:** `animate` works but drawer just vanishes on close

### Pitfall 4: Touch Target Too Small

**What goes wrong:** Users struggle to tap hamburger button; rage taps
**Why it happens:** Using icon size (24px) as button size instead of adding padding
**How to avoid:** Button wrapper must be 44x44px minimum (`w-11 h-11`), icon can be 24px inside
**Warning signs:** High miss rate when tapping, users tap multiple times

### Pitfall 5: Drawer Doesn't Close on Navigation

**What goes wrong:** User taps article link, navigates to new page, drawer stays open
**Why it happens:** Navigation doesn't trigger drawer close; Next.js client-side navigation doesn't remount layout
**How to avoid:** Pass `onClose` callback to sidebar, call it when link is clicked; OR listen to pathname changes with `usePathname()`
**Warning signs:** After navigating, user still sees drawer over new content (Note: This is deferred to v2 as NAV-06)

### Pitfall 6: Animation Performance on Low-End Devices

**What goes wrong:** Drawer animation is janky/stutters
**Why it happens:** Animating `left` or `width` triggers layout recalculation
**How to avoid:** Animate `transform: translateX()` only - Framer Motion's `x` property does this automatically
**Warning signs:** FPS drops during animation, visible stutter

## Code Examples

Verified patterns from official sources and codebase investigation:

### Mobile Drawer Wrapper Component

```tsx
// src/components/content/MobileSidebarDrawer.tsx
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RemoveScroll } from 'react-remove-scroll';
import { Menu, X } from 'lucide-react';
import ContentSidebar from './ContentSidebar';
import type { ArticleMeta } from '@/lib/types';

interface MobileSidebarDrawerProps {
  articles: ArticleMeta[];
  categories: string[];
  locale: string;
}

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.1 } },
};

const panelVariants = {
  initial: { x: '-100%' },
  animate: { x: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } },
  exit: { x: '-100%', transition: { type: 'tween', duration: 0.2, ease: 'easeIn' } },
};

export default function MobileSidebarDrawer({ articles, categories, locale }: MobileSidebarDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button - mobile only */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-sidebar"
      >
        <Menu size={24} className="text-white" />
      </button>

      {/* Drawer - mobile only */}
      <AnimatePresence>
        {isOpen && (
          <RemoveScroll>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.aside
              id="mobile-sidebar"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-y-0 left-0 w-72 bg-turfu-darker border-r border-white/10 z-50 md:hidden flex flex-col"
            >
              {/* Close button header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span className="text-lg font-semibold text-white">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-11 h-11 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>

              {/* Sidebar content - reuse existing component's inner parts */}
              <div className="flex-1 overflow-y-auto">
                {/* Render sidebar navigation content here */}
                {/* Option 1: Extract inner content from ContentSidebar */}
                {/* Option 2: Render ContentSidebar with modified styles */}
              </div>
            </motion.aside>
          </RemoveScroll>
        )}
      </AnimatePresence>
    </>
  );
}
```

### Integrating with Content Layout

```tsx
// src/app/[locale]/content/layout.tsx - Updated pattern
import MobileSidebarDrawer from '@/components/content/MobileSidebarDrawer';
import ContentSidebar from '@/components/content/ContentSidebar';

export default async function ContentLayout({ children, params: { locale } }: LayoutProps) {
  const articles = await getArticles(locale);
  const categories = await getCategories(locale);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen pt-16 bg-turfu-dark overflow-x-hidden">
        {/* Desktop sidebar - hidden on mobile */}
        <ContentSidebar
          articles={articles}
          categories={categories}
          locale={locale}
        />

        {/* Mobile hamburger + drawer */}
        <div className="md:hidden fixed top-20 left-4 z-30">
          <MobileSidebarDrawer
            articles={articles}
            categories={categories}
            locale={locale}
          />
        </div>

        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </>
  );
}
```

### react-remove-scroll Usage

```tsx
// Source: https://github.com/theKashey/react-remove-scroll
import { RemoveScroll } from 'react-remove-scroll';

// Basic usage - wraps content that should remain scrollable
<RemoveScroll enabled={isOpen}>
  <div className="modal-content">
    {/* This content CAN scroll */}
    {/* Everything outside CANNOT scroll */}
  </div>
</RemoveScroll>

// Key props:
// - enabled: boolean (default true) - toggle without unmounting
// - allowPinchZoom: boolean (default false) - enable zoom gestures
// - removeScrollBar: boolean (default true) - hide scrollbar
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `document.body.style.overflow = 'hidden'` | react-remove-scroll | iOS Safari has always been broken | Reliable iOS support |
| CSS transitions with conditional render | AnimatePresence | Framer Motion 4+ (2021) | Exit animations possible |
| 44px as "nice to have" | 44px WCAG 2.5.5 AAA / 24px 2.5.8 AA | WCAG 2.2 (Oct 2023) | Accessibility requirement |
| z-index guessing | Deliberate stacking context design | Always best practice | Predictable layering |

**Deprecated/outdated:**
- body-scroll-lock v4 beta has issues with `position: fixed` scrolling to top - use react-remove-scroll instead
- Using JS `touchmove` event prevention - unreliable, react-remove-scroll handles it
- Manual `-webkit-overflow-scrolling: touch` management - react-remove-scroll handles it

## iOS Safari Specific Notes

**Critical testing requirement from Phase 1 research:**

The context mentioned: "iOS Safari testing required for Phase 2 - position:fixed and hamburger menus have known issues."

Key iOS Safari behaviors to test:

1. **Position fixed + address bar:** When iOS Safari address bar hides/shows, the viewport height changes. Fixed elements should not jump.
2. **Rubber-band scrolling:** iOS allows "overscroll" at top/bottom. react-remove-scroll handles this with `overscroll-behavior` and touch event prevention.
3. **Pinch-to-zoom:** If drawer disables zoom, users may be frustrated. Consider `allowPinchZoom={true}` prop.
4. **Momentum scrolling:** `-webkit-overflow-scrolling: touch` inside the drawer for smooth scrolling.

**Testing matrix:**
- iOS Safari (iPhone)
- iOS Safari (iPad)
- Chrome mobile (Android)
- Chrome DevTools mobile simulator (baseline, not sufficient alone)

## Open Questions

Things that couldn't be fully resolved:

1. **Hamburger button placement**
   - What we know: Navbar already has a hamburger for main site navigation on mobile
   - What's unclear: Should content sidebar use same button (confusing - two different menus) or a separate button?
   - Recommendation: Add a separate hamburger in the content area header (below Navbar), clearly labeled "Documentation" or with doc icon

2. **Close on navigation (v2 feature)**
   - What we know: NAV-06 "Close drawer on navigation" is deferred to v2
   - What's unclear: Should we prepare the architecture for this now?
   - Recommendation: Pass `onClose` callback to sidebar links now, but don't implement the behavior yet

3. **Swipe to close (v2 feature)**
   - What we know: NAV-05 "Swipe gesture to close drawer" is deferred to v2
   - What's unclear: Does react-remove-scroll interfere with swipe detection?
   - Recommendation: Don't implement now; Framer Motion has drag gestures that can be added later

## Sources

### Primary (HIGH confidence)
- Project codebase investigation - `ContentSidebar.tsx`, `Navbar.tsx`, `Architecture.tsx`, `package.json`
- [react-remove-scroll GitHub](https://github.com/theKashey/react-remove-scroll) - API, iOS handling
- [freeCodeCamp Framer Motion Sidebar Tutorial](https://www.freecodecamp.org/news/create-a-fully-animated-sidebar/) - AnimatePresence patterns

### Secondary (MEDIUM confidence)
- [WCAG 2.5.8 Target Size](https://www.wcag.com/developers/2-5-8-target-size-minimum-level-aa/) - 24px AA minimum, 44px AAA
- [WCAG 2.5.5 Target Size Enhanced](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html) - 44x44px requirement
- [npm trends comparison](https://npmtrends.com/body-scroll-lock-vs-react-remove-scroll-vs-scroll-lock) - react-remove-scroll popularity
- [ARIA hamburger menu patterns](https://www.accede-web.com/en/guidelines/rich-interface-components/burger-menu/) - aria-expanded, aria-controls

### Tertiary (LOW confidence)
- [iOS Safari scroll lock article](https://stripearmy.medium.com/i-fixed-a-decade-long-ios-safari-problem-0d85f76caec0) - background on iOS issues, needs real device testing to verify

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - framer-motion already in use, react-remove-scroll is well-documented market leader
- Architecture: HIGH - Patterns verified from existing codebase (Architecture.tsx AnimatePresence usage)
- Pitfalls: HIGH for common issues, MEDIUM for iOS Safari (needs real device testing)
- Accessibility: HIGH - WCAG standards are well-documented

**Research date:** 2026-01-29
**Valid until:** 60 days (libraries are stable, patterns are established)
