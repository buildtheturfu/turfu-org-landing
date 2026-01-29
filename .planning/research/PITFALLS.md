# Mobile Documentation UX Pitfalls

**Domain:** Mobile-responsive documentation sites
**Researched:** 2026-01-29
**Confidence:** HIGH (verified with Tailwind docs, MDN, W3C sources)

---

## Critical Pitfalls

Mistakes that cause broken layouts, unusable navigation, or major UX failures.

---

### Pitfall 1: Using `100vw` for Full-Width Elements

**What goes wrong:** Horizontal scrollbar appears on pages with vertical scrollbars. Users can scroll horizontally by a few pixels, which feels broken.

**Why it happens:** The `100vw` unit includes the scrollbar width in its calculation. On systems with classic (always-visible) scrollbars, `100vw` is wider than the actual visible viewport, causing horizontal overflow.

**Consequences:**
- Horizontal scroll on every page with vertical content
- Particularly visible on Windows (classic scrollbars) and macOS with "Always show scrollbars" enabled
- Breaks the professional feel of the documentation

**Detection:**
- Test on Windows or enable "Always show scrollbars" in macOS
- Look for any element using `w-screen` (Tailwind) or `width: 100vw`
- Check if page has subtle horizontal scroll (a few pixels)

**Prevention (Tailwind-specific):**
```html
<!-- BAD: Will overflow on systems with visible scrollbars -->
<div class="w-screen">...</div>

<!-- GOOD: Uses parent width, not viewport -->
<div class="w-full">...</div>

<!-- GOOD: For full-bleed within container, use negative margins -->
<div class="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">...</div>
```

**Modern fix (Chrome 145+):** Add `scrollbar-gutter: stable` to `html` element. This reserves space for the scrollbar and makes `100vw` scrollbar-aware. However, browser support is still limited in 2026.

**Sources:** [Why 100vw causes horizontal scrollbar](https://dev.to/tepythai/why-100vw-causes-horizontal-scrollbar-4nlm), [Chrome 145 scrollbar-aware vw](https://www.bram.us/2026/01/15/100vw-horizontal-overflow-no-more/)

---

### Pitfall 2: Fixed-Width Sidebar Without Mobile Handling

**What goes wrong:** Sidebar (like `ContentSidebar.tsx` with `w-72`) remains visible on mobile, pushing content off-screen or causing horizontal overflow.

**Why it happens:** Fixed pixel widths (`w-72` = 288px) don't respond to viewport size. On a 375px mobile screen, a 288px sidebar leaves only 87px for content.

**Consequences:**
- Content area too narrow to read
- Horizontal scrollbar to see content
- Or sidebar completely covers content

**Detection:**
- Check for fixed-width sidebars without responsive hiding
- Look for `w-[fixed]` without corresponding `hidden md:block` or similar
- Test on 375px viewport width

**Prevention (Tailwind-specific):**
```html
<!-- BAD: Always shows 288px sidebar -->
<aside class="w-72 border-r ...">

<!-- GOOD: Hidden on mobile, shown on md+ -->
<aside class="hidden md:block w-72 border-r ...">
```

For the mobile sidebar, use a slide-out drawer pattern triggered by hamburger menu (see Pitfall 3).

**Current codebase issue:** `ContentSidebar.tsx` has `w-72` without responsive hiding. Needs `hidden md:flex md:flex-col` or similar.

---

### Pitfall 3: Hamburger Menu Button Exists But Menu Doesn't Slide Out

**What goes wrong:** Hamburger icon is visible on mobile, user taps it, nothing happens (or menu appears but is covered/off-screen).

**Why it happens (common causes):**

1. **Z-index stacking context issues:** Menu has high z-index but parent creates its own stacking context (via `transform`, `opacity`, `will-change`, or having a z-index itself), trapping the menu.

2. **Menu positioned off-screen without animation:** Menu is at `left: -100%` or `translateX(-100%)` but state change doesn't trigger CSS transition.

3. **Click handler not attached or silently failing:** React state updates but component doesn't re-render, or onClick prevented by parent element.

4. **CSS `hidden` class conflicts:** Tailwind's `hidden` (display: none) conflicts with visibility toggling logic.

5. **iOS Safari position:fixed bugs:** On iOS, `position: fixed` elements inside scrollable containers or with certain parent properties don't behave correctly.

**Detection:**
- Tap hamburger on actual mobile device (not just DevTools)
- Check if menu element exists in DOM but has wrong positioning
- Inspect z-index and parent stacking contexts
- Test specifically on iOS Safari

**Prevention (Tailwind-specific):**

```tsx
// State management
const [isOpen, setIsOpen] = useState(false);

// Hamburger button
<button
  onClick={() => setIsOpen(!isOpen)}
  aria-expanded={isOpen}
  aria-label="Toggle menu"
  className="md:hidden p-2"
>
  {isOpen ? <X /> : <Menu />}
</button>

// Mobile sidebar - use fixed positioning at root level
<div
  className={`
    fixed inset-y-0 left-0 z-50 w-72
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    md:hidden
  `}
>
  {/* Sidebar content */}
</div>

// Backdrop overlay
{isOpen && (
  <div
    className="fixed inset-0 z-40 bg-black/50 md:hidden"
    onClick={() => setIsOpen(false)}
  />
)}
```

**Critical:** Put mobile menu/sidebar at the root level of the component tree, not nested inside other positioned/transformed elements.

**iOS Safari fix:** Don't put scrollable content inside position:fixed elements. Instead, when menu opens, add `overflow-hidden` to body and let the menu be part of normal flow with the body scrolling disabled.

**Sources:** [iOS Safari hamburger menu issues](https://medium.com/@jaredt_28429/why-do-hamburger-menus-break-in-ios-safari-e076083bda5c), [Z-index stacking contexts](https://www.joshwcomeau.com/css/stacking-contexts/)

---

### Pitfall 4: Code Blocks Causing Horizontal Page Overflow

**What goes wrong:** Long code examples in documentation overflow their container and cause horizontal scroll on the entire page.

**Why it happens:** `<pre>` and `<code>` elements preserve whitespace and don't wrap by default. Without `overflow-x: auto` on a containing element, long lines push page width.

**Consequences:**
- Entire page scrolls horizontally
- Users must scroll back and forth to read documentation text
- Professional appearance destroyed

**Detection:**
- Look at any documentation page with code blocks on mobile
- Check if scrolling horizontally on code also scrolls the page
- Inspect code blocks for `overflow` properties

**Prevention (Tailwind-specific):**

```html
<!-- Wrapper for code blocks -->
<div class="overflow-x-auto">
  <pre class="...">
    <code>...</code>
  </pre>
</div>

<!-- Or apply directly to pre -->
<pre class="overflow-x-auto max-w-full">
  <code>...</code>
</pre>
```

**For markdown renderers (like `MarkdownRenderer.tsx`):**
```css
/* In globals.css or component styles */
.prose pre {
  @apply overflow-x-auto max-w-full;
}

.prose code {
  @apply break-words;
}
```

**Accessibility requirement:** Add `tabindex="0"` to scrollable code blocks for keyboard navigation:
```html
<pre tabindex="0" class="overflow-x-auto">...</pre>
```

**Sources:** [Accessible responsive code blocks](https://torstenknabe.com/posts/making-accessible-responsive-code-blocks/), [Responsive code block design](https://olivermak.es/2014/10/design-better-responsive-code/)

---

### Pitfall 5: Tables Breaking Mobile Layout

**What goes wrong:** Wide tables in documentation overflow their container, causing horizontal page scroll.

**Why it happens:** Tables have intrinsic sizing based on content. Without constraints, they expand to fit all content, regardless of viewport.

**Consequences:**
- Same as code blocks: horizontal page scroll
- Table content cut off or unreadable
- Data tables especially problematic (many columns)

**Detection:**
- Check any documentation page with tables on mobile
- Look for tables without wrapper elements
- Test with DevTools at 375px width

**Prevention (Tailwind-specific):**

```html
<!-- Wrapper makes table independently scrollable -->
<div class="overflow-x-auto" role="region" aria-label="Data table" tabindex="0">
  <table class="min-w-full">
    ...
  </table>
</div>
```

**For markdown renderers:**
```css
.prose table {
  @apply block overflow-x-auto;
}

/* Or wrap tables in scrollable container */
.table-wrapper {
  @apply overflow-x-auto -mx-4 px-4;
}
```

**Visual hint for scrollability:** Since mobile browsers hide scrollbars, add visual indicator:
```html
<div class="overflow-x-auto bg-gradient-to-r from-transparent via-transparent to-gray-200/50">
  ...
</div>
```

**Sources:** [Responsive tables](https://www.w3schools.com/howto/howto_css_table_responsive.asp), [Under-engineered responsive tables](https://css-tricks.com/under-engineered-responsive-tables/)

---

## Moderate Pitfalls

Mistakes that cause poor UX but don't break functionality.

---

### Pitfall 6: Using `sm:` to Target Mobile Devices

**What goes wrong:** Developer writes `sm:hidden` thinking it hides on small screens. Instead, element is visible on mobile (under 640px) and hidden on sm+ screens.

**Why it happens:** Tailwind's `sm:` prefix means "at 640px and above", not "on small screens". This is counter-intuitive for developers new to Tailwind's mobile-first approach.

**Consequences:**
- Layouts appear correct in desktop DevTools, broken on actual mobile
- Elements meant for mobile appear on desktop
- Elements meant for desktop appear on mobile

**Detection:**
- Search codebase for `sm:` usage and verify intent
- Test at exactly 639px vs 640px width
- Look for comments like "mobile only" near `sm:` classes

**Prevention (Tailwind-specific):**

```html
<!-- WRONG: Thinking this hides on "small screens" -->
<div class="sm:hidden">Mobile content</div>  <!-- Shows on mobile! -->

<!-- RIGHT: Hide on mobile (default), show on 640px+ -->
<div class="hidden sm:block">Desktop content</div>

<!-- RIGHT: Show on mobile, hide on 640px+ -->
<div class="block sm:hidden">Mobile content</div>

<!-- RIGHT: Show only on md screens (768px-1023px) -->
<div class="hidden md:block lg:hidden">Tablet only</div>
```

**Mental model:** Always write mobile styles first (unprefixed), then add breakpoints to enhance for larger screens.

**Sources:** [Tailwind Responsive Design docs](https://tailwindcss.com/docs/responsive-design)

---

### Pitfall 7: Touch Targets Too Small

**What goes wrong:** Links, buttons, and interactive elements are too small to tap accurately on mobile.

**Why it happens:** Designs optimized for mouse precision don't account for finger imprecision (average finger tap area is ~7mm or 44px).

**Consequences:**
- Users tap wrong links in navigation
- Frustration with documentation navigation
- Accessibility failure (WCAG requires minimum target sizes)

**Detection:**
- Measure interactive elements (should be at least 44x44px tap area)
- Check spacing between adjacent links (need ~8px minimum)
- Test on actual mobile devices with finger navigation

**Prevention (Tailwind-specific):**

```html
<!-- BAD: Tiny tap target -->
<a class="text-sm">Small link</a>

<!-- GOOD: Adequate padding for tap target -->
<a class="text-sm py-3 px-4">Link with padding</a>

<!-- GOOD: Minimum height/width utility -->
<a class="min-h-[44px] min-w-[44px] flex items-center">...</a>

<!-- GOOD: For icon buttons -->
<button class="p-3 -m-3">  <!-- Padding for tap, negative margin to not affect layout -->
  <Icon size={16} />
</button>
```

**For sidebar navigation items:**
```html
<a class="flex items-center gap-2 px-3 py-2.5 min-h-[44px]">
  <FileText size={16} />
  <span class="truncate">{title}</span>
</a>
```

**Sources:** [NN/g touch target guidelines](https://www.nngroup.com/articles/touch-target-size/), [WCAG 2.2 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

---

### Pitfall 8: Body Scroll Not Locked When Mobile Menu Open

**What goes wrong:** User opens mobile menu/sidebar, but can still scroll the page content behind it. Page scrolls while trying to navigate menu.

**Why it happens:** Opening an overlay doesn't automatically prevent body scroll. Without explicit lock, touch events bubble through to body.

**Consequences:**
- Confusing UX: content moves behind menu
- User loses place in documentation
- Menu overlay may scroll off-screen

**Detection:**
- Open mobile menu and try scrolling with touch
- Check if page content behind overlay moves
- Verify menu stays fixed in viewport

**Prevention (Tailwind-specific):**

```tsx
// When menu opens, lock body scroll
useEffect(() => {
  if (isMenuOpen) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }

  // Cleanup on unmount
  return () => {
    document.body.classList.remove('overflow-hidden');
  };
}, [isMenuOpen]);
```

**Alternative using Tailwind's arbitrary variants:**
```tsx
// In a layout component
<body className={isMenuOpen ? 'overflow-hidden' : ''}>
```

**For Next.js App Router (can't directly modify body):**
```tsx
// Use a portal for the menu, manage body class via useEffect
import { createPortal } from 'react-dom';

// Or use a library like body-scroll-lock
```

**Overscroll prevention on menu itself:**
```html
<nav class="overflow-y-auto overscroll-contain">
  <!-- Menu items -->
</nav>
```

---

### Pitfall 9: Missing Back-to-Top Button on Long Documentation Pages

**What goes wrong:** Users scroll deep into documentation, have no quick way to return to navigation/top. Must scroll extensively to navigate elsewhere.

**Why it happens:** Developers test on desktop with fast scroll wheels. Mobile users must swipe many times to return to top on long pages.

**Consequences:**
- Frustrating navigation on mobile
- Users abandon documentation rather than navigate
- Accessibility issue for users with motor impairments

**Detection:**
- Visit any documentation page longer than 4 screens
- Try returning to top on mobile device
- Count swipes needed

**Prevention (Tailwind-specific):**

```tsx
const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Move focus to skip link or first focusable element
    document.querySelector('a[href="#main-content"]')?.focus();
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40
                 p-3 rounded-full bg-turfu-accent text-white
                 shadow-lg hover:bg-turfu-accent/90
                 focus:outline-none focus:ring-2 focus:ring-offset-2
                 transition-opacity"
      aria-label="Back to top"
    >
      <ChevronUp size={24} aria-hidden="true" />
    </button>
  );
};
```

**Position:** Lower right corner (convention users expect)

**Accessibility requirements:**
- Descriptive aria-label (not just icon)
- Move focus to top of page after activation
- Keyboard accessible
- Visible focus indicator

**Sources:** [NN/g Back-to-Top guidelines](https://www.nngroup.com/articles/back-to-top/), [Accessible back-to-top buttons](https://ashleemboyer.com/blog/accessible-smooth-scroll-to-top-buttons-with-little-code/)

---

## Minor Pitfalls

Mistakes that cause annoyance but are easily fixable.

---

### Pitfall 10: Sticky/Fixed Header Height Not Accounted For

**What goes wrong:** Anchor links scroll content behind fixed header. Users click "Section 2" in TOC, content scrolls but heading is hidden under header.

**Why it happens:** Browsers scroll anchor target to top of viewport, not accounting for fixed/sticky elements.

**Detection:**
- Click any anchor link with fixed header present
- Check if target heading is visible or hidden
- Verify scroll-padding-top matches header height

**Prevention:**
```css
/* In globals.css - must match fixed header height */
html {
  scroll-padding-top: 80px; /* Height of fixed navbar + some buffer */
}
```

**Or in Tailwind config:**
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      scrollPadding: {
        header: '80px',
      }
    }
  }
}
```

```html
<html class="scroll-pt-20">  <!-- 80px -->
```

**Current codebase:** Already has `scroll-padding-top: 80px` in globals.css - good!

---

### Pitfall 11: Text Content Without Constrained Width on Mobile

**What goes wrong:** Prose content stretches to full viewport width, creating overly long line lengths that are hard to read.

**Why it happens:** No `max-width` applied to text containers. 375px width with 16px padding = 343px lines (acceptable), but tablets in portrait mode can have 600-700px content width.

**Detection:**
- Check line length on tablet/larger mobile devices
- Count characters per line (65-75 ideal)
- Look for missing `max-w-prose` or similar constraints

**Prevention (Tailwind-specific):**
```html
<article class="prose prose-invert max-w-prose mx-auto">
  <!-- Documentation content -->
</article>

<!-- Or for full-width layouts with constrained text -->
<div class="max-w-3xl">
  <article class="prose">...</article>
</div>
```

---

### Pitfall 12: Images Without Max-Width Breaking Layout

**What goes wrong:** Images in documentation content overflow their container on mobile.

**Why it happens:** Images have intrinsic dimensions. Without constraints, a 1200px wide image will be 1200px on mobile.

**Prevention:**
```css
/* Base style for all images in content */
.prose img {
  @apply max-w-full h-auto;
}
```

**Or using Tailwind prose defaults** - Tailwind Typography plugin already handles this, but verify it's applied.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|----------------|------------|
| Mobile sidebar | Pitfalls 2, 3 | Use slide-out drawer pattern, test on iOS Safari |
| Horizontal overflow | Pitfalls 1, 4, 5 | Audit all `w-screen`, `100vw`, code blocks, tables |
| Navigation | Pitfalls 6, 7 | Review all `sm:` usage, verify touch targets |
| Back-to-top | Pitfall 9 | Add component early, position in lower-right |
| Menu open state | Pitfall 8 | Lock body scroll when menu opens |
| Anchor links | Pitfall 10 | Verify scroll-padding-top matches header |

---

## Implementation Checklist

Before marking mobile documentation UX complete:

- [ ] No horizontal scroll on any documentation page
- [ ] Mobile sidebar slides out and closes properly
- [ ] Hamburger menu works on iOS Safari
- [ ] Body scroll locked when mobile menu open
- [ ] Code blocks scroll independently (not page)
- [ ] Tables scroll independently (not page)
- [ ] All touch targets at least 44x44px
- [ ] Back-to-top button present and accessible
- [ ] Anchor links account for fixed header
- [ ] Text line lengths readable on all screen sizes

---

## Sources

**Official Documentation:**
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Tailwind CSS Overflow](https://tailwindcss.com/docs/overflow)
- [MDN Responsive Web Design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)

**UX Research:**
- [NN/g Back-to-Top Guidelines](https://www.nngroup.com/articles/back-to-top/)
- [WCAG 2.2 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

**Technical Deep-Dives:**
- [100vw Horizontal Scrollbar Problem](https://dev.to/tepythai/why-100vw-causes-horizontal-scrollbar-4nlm)
- [Z-Index and Stacking Contexts](https://www.joshwcomeau.com/css/stacking-contexts/)
- [iOS Safari Hamburger Menu Issues](https://medium.com/@jaredt_28429/why-do-hamburger-menus-break-in-ios-safari-e076083bda5c)
- [Accessible Responsive Code Blocks](https://torstenknabe.com/posts/making-accessible-responsive-code-blocks/)
- [Under-Engineered Responsive Tables](https://css-tricks.com/under-engineered-responsive-tables/)

**Community Patterns:**
- [Tailwind Fixed Sidebar Pattern](https://gist.github.com/BjornDCode/5cb836a6b23638d6d02f5cb6ed59a04a)
- [Preventing Body Scroll in Modals](https://dev.to/designly/how-to-disable-body-scroll-when-a-modal-dialog-is-open-in-react-nextjs-693)
