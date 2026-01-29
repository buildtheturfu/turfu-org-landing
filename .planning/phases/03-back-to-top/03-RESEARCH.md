# Phase 3: Back to Top - Research

**Researched:** 2026-01-29
**Domain:** React scroll-triggered UI, accessibility, Framer Motion animations
**Confidence:** HIGH

## Summary

This phase implements a floating back-to-top button that appears after scrolling down and smooth-scrolls users to page top. The implementation leverages the existing tech stack (Framer Motion, lucide-react, Tailwind CSS) and follows established patterns from Phase 2's MobileSidebarDrawer.

The standard approach combines:
1. React `useState` + `useEffect` for scroll position tracking
2. Framer Motion `AnimatePresence` + `motion.button` for fade-in/out animations
3. Native `window.scrollTo({ behavior: 'smooth' })` for smooth scrolling
4. Proper ARIA attributes for screen reader accessibility

The project already has `prefers-reduced-motion` handling in `globals.css`, so the smooth scroll will automatically degrade to instant scroll for users who prefer reduced motion.

**Primary recommendation:** Create a `BackToTop.tsx` client component using the existing Framer Motion patterns, placed in the `[locale]/layout.tsx` to appear site-wide.

## Standard Stack

The established libraries/tools for this domain:

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| framer-motion | ^11.0.0 | Enter/exit animations | Already used for MobileSidebarDrawer; AnimatePresence handles mount/unmount |
| lucide-react | ^0.460.0 | Icon (ArrowUp or ChevronUp) | Already used throughout project; consistent icon system |
| react | ^18.3.1 | useState, useEffect hooks | Standard scroll detection pattern |

### Supporting (Already Configured)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| tailwindcss | ^3.4.14 | Styling, positioning, responsive | All styling via existing design tokens |

### No Additional Dependencies Required

The existing stack fully supports this feature. No new packages needed.

## Architecture Patterns

### Recommended Component Location
```
src/
├── components/
│   └── BackToTop.tsx         # New client component
└── app/
    └── [locale]/
        └── layout.tsx        # Import and render BackToTop here
```

### Pattern 1: Scroll Position Hook with useEffect
**What:** Track window.scrollY to show/hide button based on threshold
**When to use:** When you need to react to scroll position changes
**Example:**
```typescript
// Source: Community pattern, verified with React docs
'use client';

import { useState, useEffect } from 'react';

const SCROLL_THRESHOLD = 400; // ~4 viewport heights for typical mobile

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    // Check initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ... render logic
}
```

### Pattern 2: AnimatePresence for Enter/Exit
**What:** Framer Motion pattern for animating components on mount/unmount
**When to use:** When a component conditionally renders and needs smooth enter/exit
**Example:**
```typescript
// Source: Existing MobileSidebarDrawer.tsx pattern
import { AnimatePresence, motion } from 'framer-motion';

const buttonVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

// Inside component render:
<AnimatePresence>
  {isVisible && (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      // ... props
    />
  )}
</AnimatePresence>
```

### Pattern 3: Smooth Scroll to Top
**What:** Use native scrollTo API with smooth behavior
**When to use:** When scrolling to a specific position
**Example:**
```typescript
// Source: MDN Window.scrollTo()
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Falls back to 'auto' with prefers-reduced-motion
  });
};
```

### Z-Index Layering (Established Pattern)
Based on existing codebase:
| Element | z-index | Notes |
|---------|---------|-------|
| Navbar | z-50 | Fixed header, highest |
| Mobile drawer panel | z-50 | Same as navbar |
| Mobile drawer backdrop | z-40 | Behind drawer panel |
| Content sidebar button | z-30 | Below overlays |
| **Back-to-top button** | **z-30** | Below navbar, above content |

### Anti-Patterns to Avoid
- **Throttling/debouncing scroll handler:** For simple visibility toggle, throttling adds complexity without meaningful perf gain. The `{ passive: true }` option is sufficient.
- **Using IntersectionObserver for scroll position:** IO is for element visibility, not scroll position. Use `window.scrollY` directly.
- **Custom smooth scroll implementation:** The native `scrollTo` with `behavior: 'smooth'` has excellent browser support and respects `prefers-reduced-motion`.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Enter/exit animations | CSS animations with JS toggle | Framer Motion AnimatePresence | Handles cleanup, interruption, exit animations properly |
| Scroll position detection | Complex throttled listeners | Simple useEffect + passive listener | Browser optimization with passive:true is sufficient |
| Smooth scrolling | Custom animation loop | `window.scrollTo({ behavior: 'smooth' })` | Native, respects reduced-motion, no dependencies |
| Icon rendering | SVG inline | lucide-react | Consistent sizing, accessible, tree-shakeable |

**Key insight:** This is a solved problem. The complexity is in accessibility and animation polish, not the core functionality.

## Common Pitfalls

### Pitfall 1: Forgetting aria-label on icon-only button
**What goes wrong:** Screen readers announce nothing meaningful ("button" only)
**Why it happens:** Visual users see the icon, but assistive tech can't interpret SVG
**How to avoid:** Always add `aria-label="Back to top"` or similar descriptive label
**Warning signs:** Testing without screen reader; no aria-* attributes in code review

### Pitfall 2: Button covers content on mobile
**What goes wrong:** Button obscures important UI elements or text
**Why it happens:** Fixed positioning without considering safe areas
**How to avoid:** Position with adequate margin from edges (16-20px); test on various screen sizes
**Warning signs:** User complaints about covered content; difficult to click nearby elements

### Pitfall 3: Memory leak from scroll listener
**What goes wrong:** Event listener persists after component unmounts
**Why it happens:** Missing cleanup function in useEffect
**How to avoid:** Always return cleanup function: `return () => window.removeEventListener('scroll', handler)`
**Warning signs:** Console warnings about state updates on unmounted components

### Pitfall 4: Button visible on page load at top
**What goes wrong:** Button briefly flashes or appears when already at page top
**Why it happens:** Initial state not checked before first scroll event
**How to avoid:** Call scroll handler once immediately in useEffect to set correct initial state
**Warning signs:** Button visible when page loads scrolled to top

### Pitfall 5: Z-index conflicts with other fixed elements
**What goes wrong:** Button appears above/below elements unexpectedly
**Why it happens:** Inconsistent z-index strategy across components
**How to avoid:** Use established z-index layering (z-30 for this button, below navbar's z-50)
**Warning signs:** Visual overlap issues; button disappearing behind or covering modals

### Pitfall 6: Not respecting reduced motion preference
**What goes wrong:** Users with vestibular disorders experience discomfort
**Why it happens:** Hardcoded animation timing without checking preferences
**How to avoid:** Project already handles this in globals.css; Framer Motion also respects the media query
**Warning signs:** Animations playing despite system reduced-motion setting

## Code Examples

Verified patterns from official sources and existing codebase:

### Complete BackToTop Component
```typescript
// Source: Synthesis of existing codebase patterns + MDN + accessibility best practices
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const SCROLL_THRESHOLD = 400;

const buttonVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15, ease: 'easeIn' } },
};

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    // Set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-turfu-accent hover:bg-turfu-accent/90 text-white shadow-lg shadow-turfu-accent/25 transition-colors focus:outline-none focus:ring-2 focus:ring-turfu-accent focus:ring-offset-2 focus:ring-offset-turfu-dark"
          aria-label="Back to top"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
```

### Integration in Layout
```typescript
// In src/app/[locale]/layout.tsx
import BackToTop from '@/components/BackToTop';

export default async function LocaleLayout({ children, params }) {
  // ... existing code ...

  return (
    <html lang={locale} className="dark">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### Accessibility Attributes Reference
```typescript
// Source: W3C ARIA Button Pattern + accessibility best practices
<button
  aria-label="Back to top"           // Required: accessible name for screen readers
  // No aria-pressed needed (not a toggle button)
  // No aria-disabled needed (always available)
>
  <ArrowUp aria-hidden="true" />     // Hide decorative icon from screen readers
</button>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| jQuery scroll detection | React useEffect + useState | React adoption (~2018) | Cleaner lifecycle management |
| CSS scroll-behavior polyfill | Native `behavior: 'smooth'` | Full browser support 2020 | No polyfill needed |
| Manual reduced-motion checks | CSS media query + browser native | Native support standardized | Automatic handling |
| IntersectionObserver for position | Direct window.scrollY check | Always was simpler | IO is for element visibility |

**Deprecated/outdated:**
- `scroll-behavior` polyfills: No longer needed, native support is universal
- jQuery plugins for scroll effects: Use native APIs or Framer Motion
- Manual animation timing adjustments for reduced motion: CSS handles this globally

## Open Questions

No significant open questions. This is a well-established pattern with clear implementation path.

1. **Icon choice: ArrowUp vs ChevronUp**
   - What we know: Both are available in lucide-react, both are commonly used
   - What's unclear: Slight UX preference difference
   - Recommendation: Use ArrowUp - more universally recognized as "go up" action; ChevronUp often indicates "expand" in the codebase

## Sources

### Primary (HIGH confidence)
- MDN Window.scrollTo() - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo - API, browser support
- W3C ARIA Button Pattern - https://www.w3.org/WAI/ARIA/apg/patterns/button/ - Accessibility requirements
- Existing codebase MobileSidebarDrawer.tsx - Framer Motion patterns, z-index layering
- Existing codebase globals.css - prefers-reduced-motion handling

### Secondary (MEDIUM confidence)
- Lucide Icons documentation - https://lucide.dev/icons/arrow-up - Icon availability confirmed
- React documentation - useState, useEffect patterns
- Framer Motion AnimatePresence - https://motion.dev/docs - Animation patterns (verified against existing codebase usage)

### Tertiary (LOW confidence)
- Community scroll hook patterns - https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj - Implementation patterns (verified against React docs)
- Accessibility articles - https://ashleemboyer.com/blog/accessible-smooth-scroll-to-top-buttons-with-little-code/ - Best practices (verified against W3C)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and used in project
- Architecture: HIGH - Following established patterns from Phase 2
- Pitfalls: HIGH - Well-documented accessibility and React patterns
- Code examples: HIGH - Synthesized from existing codebase + official docs

**Research date:** 2026-01-29
**Valid until:** 60 days (stable pattern, no fast-moving dependencies)
