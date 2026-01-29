# Technology Stack: Mobile Documentation UX

**Project:** TURFu Landing - Mobile UX Fixes for /content Module
**Researched:** 2026-01-29
**Overall Confidence:** HIGH (Tailwind patterns verified via official docs)

## Executive Summary

This research focuses on fixing mobile responsive issues in the existing /content documentation module. The site already uses Next.js 14 + Tailwind CSS. No new libraries are required. All fixes use native Tailwind utilities following mobile-first patterns established by industry leaders (Docusaurus, GitBook, Tailwind Docs).

## Recommended Approach

### Mobile-First, Not Desktop-First

**Why:** Tailwind is built mobile-first. Unprefixed utilities apply to ALL screen sizes; breakpoint prefixes (`md:`, `lg:`) apply at that size AND ABOVE.

**Current Problem:** The ContentSidebar has fixed `w-72` with no responsive behavior. The layout uses `flex` without mobile breakpoints.

**Pattern to follow:**

```tsx
// WRONG: Desktop-first thinking
<aside className="w-72 hidden md:block">  // Hides on mobile, no alternative

// CORRECT: Mobile-first with drawer pattern
<aside className="fixed inset-y-0 left-0 z-40 w-72 transform -translate-x-full md:translate-x-0 md:static transition-transform">
```

### Breakpoint Strategy

Use Tailwind's default breakpoints. No custom breakpoints needed.

| Breakpoint | Width | Use Case |
|------------|-------|----------|
| (none) | 0px+ | Mobile base styles |
| `md:` | 768px+ | Tablet - show sidebar |
| `lg:` | 1024px+ | Desktop - full layout |

**Rationale:** Docusaurus uses 996px as mobile/desktop cutoff. GitBook uses 768px. Tailwind's `md:` (768px) aligns with GitBook and is the industry standard for documentation sites.

## Patterns for Each Issue

### 1. Sidebar: Mobile Hamburger/Drawer Pattern

**Problem:** ContentSidebar is always 288px wide, no mobile behavior.

**Pattern:** Off-canvas drawer that slides in from left on mobile.

```tsx
// Mobile: Hidden off-screen, slides in when open
// Desktop: Static, always visible
<aside className={`
  fixed inset-y-0 left-0 z-40 w-72
  bg-turfu-darker/95 backdrop-blur-lg
  transform transition-transform duration-300 ease-in-out
  ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  md:translate-x-0 md:static md:bg-transparent md:backdrop-blur-none
`}>
```

**Key classes:**
- `fixed inset-y-0 left-0` - Position off-canvas on mobile
- `-translate-x-full` - Hide off-screen by default
- `translate-x-0` - Slide in when open
- `md:translate-x-0 md:static` - Always visible and in-flow on desktop
- `transition-transform duration-300` - Smooth animation
- `backdrop-blur-lg` - Frosted glass effect on mobile overlay

**Toggle button (hamburger):**

```tsx
<button
  className="md:hidden fixed bottom-4 left-4 z-50 p-3 bg-turfu-accent rounded-full shadow-lg"
  onClick={() => setIsOpen(!isOpen)}
  aria-label="Toggle sidebar"
  aria-expanded={isOpen}
>
  {isOpen ? <X size={24} /> : <Menu size={24} />}
</button>
```

**Overlay (click to close):**

```tsx
{isOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-30 md:hidden"
    onClick={() => setIsOpen(false)}
  />
)}
```

### 2. Horizontal Overflow: Code Blocks and Tables

**Problem:** Content with long lines causes horizontal page scroll on mobile.

**Pattern:** Constrain content width, allow horizontal scroll within containers.

**For code blocks (already correct in MarkdownRenderer):**

```tsx
<pre className="overflow-x-auto">
  {children}
</pre>
```

**For the main content container (add constraint):**

```tsx
// In content layout
<div className="flex-1 min-w-0 overflow-x-hidden">
  {children}
</div>
```

**Key classes:**
- `min-w-0` - Allow flex child to shrink below content size
- `overflow-x-hidden` - Prevent horizontal scroll at page level
- `overflow-x-auto` - Allow scroll within specific containers

**For tables (already correct):**

```tsx
<div className="overflow-x-auto">
  <table className="min-w-full">
```

**Additional safeguard for images:**

```tsx
<img className="max-w-full h-auto" />
```

### 3. Back to Top Button

**Pattern:** Fixed position button, appears after scrolling, smooth scroll behavior.

**Implementation:**

```tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-4 right-4 z-50
        p-3 rounded-full
        bg-turfu-accent text-white
        shadow-lg
        transition-all duration-300
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
}
```

**Key classes:**
- `fixed bottom-4 right-4 z-50` - Fixed position, bottom-right corner
- `transition-all duration-300` - Smooth show/hide animation
- `opacity-0 translate-y-4 pointer-events-none` - Hidden state (fade + slide down)
- `opacity-100 translate-y-0` - Visible state

**Alternative: CSS-only approach (simpler but less control):**

```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

Then use anchor link: `<a href="#top">Back to top</a>`

### 4. Content Layout: Responsive Grid

**Current layout issue:** Sidebar and content in flex without mobile breakpoints.

**Pattern:**

```tsx
// Content layout wrapper
<div className="min-h-screen pt-16 bg-turfu-dark">
  {/* Mobile sidebar toggle */}
  <MobileSidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />

  {/* Overlay */}
  {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}

  {/* Sidebar */}
  <ContentSidebar isOpen={isOpen} setIsOpen={setIsOpen} ... />

  {/* Main content */}
  <main className="
    min-w-0
    md:ml-72
    px-4 md:px-8
    py-8
  ">
    {children}
  </main>
</div>
```

**Key insight:** Use `md:ml-72` on main content to make room for sidebar on desktop, rather than wrapping both in flex. This simplifies the mobile/desktop toggle.

## Tailwind Utilities Reference

### Must-Use for This Project

| Utility | Purpose | When |
|---------|---------|------|
| `md:` prefix | Desktop styles | All responsive breakpoints |
| `overflow-x-auto` | Horizontal scroll | Code blocks, tables |
| `overflow-x-hidden` | Prevent page scroll | Main content wrapper |
| `min-w-0` | Allow shrink | Flex children with overflow |
| `fixed` | Fixed positioning | Sidebar, back-to-top |
| `translate-x-full` / `translate-x-0` | Slide animation | Drawer pattern |
| `transition-transform` | Smooth animation | Drawer slide |
| `backdrop-blur-lg` | Frosted glass | Mobile overlay |
| `z-30`, `z-40`, `z-50` | Stacking order | Overlay, sidebar, buttons |
| `inset-0`, `inset-y-0` | Full coverage | Overlays, drawers |

### Touch-Friendly Sizing

Notion and other mobile-first UIs use minimum 44x44px touch targets.

```tsx
// Touch-friendly button
<button className="p-3 min-w-[44px] min-h-[44px]">
```

Or simply use `p-3` (12px padding) on icons of 24px = 48px total.

## Alternatives Considered

| Approach | Recommended | Alternative | Why Not Alternative |
|----------|-------------|-------------|---------------------|
| Sidebar | Off-canvas drawer | Hamburger dropdown | Drawer matches Docusaurus/GitBook UX patterns, better for deep nav |
| Animation | Tailwind transitions | Framer Motion | Overkill for simple slide animation, adds bundle size |
| Back-to-top | React useState + scroll listener | Intersection Observer | useState approach is simpler, scroll listener is well-supported |
| Breakpoints | Tailwind defaults | Custom breakpoints | 768px (md) aligns with industry standard, no benefit to custom |

## No Additional Dependencies Needed

The existing stack handles all requirements:

- **Tailwind CSS** - All responsive utilities, transitions, positioning
- **Lucide React** - Already used for icons (Menu, X, ChevronUp)
- **React** - useState for toggle state, useEffect for scroll listener

**Do not add:**
- Headless UI (unnecessary for simple drawer)
- Framer Motion (Tailwind transitions sufficient)
- Custom CSS (use Tailwind utilities)

## Implementation Priority

1. **Fix horizontal overflow** - Add `min-w-0 overflow-x-hidden` to content wrapper (5 min)
2. **Add mobile sidebar toggle** - Drawer pattern with state (30 min)
3. **Add back-to-top button** - New component (15 min)
4. **Polish transitions** - Ensure smooth animations (10 min)

## Sources

### HIGH Confidence (Official Documentation)
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design) - Breakpoints, mobile-first approach, variants
- [Tailwind CSS Overflow](https://tailwindcss.com/docs/overflow) - overflow-x-auto, overflow-hidden utilities

### MEDIUM Confidence (Industry Patterns)
- [Docusaurus Styling](https://docusaurus.io/docs/styling-layout) - 996px breakpoint, hamburger menu behavior
- [Notionpresso CSS Structure](https://notionpresso.com/en/docs/customization-guide/css-structure-and-styling) - 720px max-width, CSS variables
- [Flowbite Sidebar](https://flowbite.com/docs/components/sidebar/) - Off-canvas drawer pattern
- [daisyUI Drawer](https://daisyui.com/components/drawer/) - lg:drawer-open responsive pattern
- [TW Elements Back to Top](https://tw-elements.com/docs/standard/components/scroll-back-to-top-button/) - Fixed positioning, scroll listener
