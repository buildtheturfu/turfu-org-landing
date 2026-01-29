# Architecture Patterns: Responsive Documentation Layouts

**Domain:** Documentation site responsive layout for Next.js/Tailwind
**Researched:** 2026-01-29
**Confidence:** HIGH (verified with official Tailwind docs, Flowbite, shadcn/ui patterns)

## Executive Summary

Modern documentation sites use a **three-column layout** (sidebar | content | TOC) on desktop that gracefully degrades on mobile. The key architectural pattern is:

1. **Desktop (lg+):** All three columns visible, sidebar and TOC are sticky
2. **Tablet (md):** Sidebar visible, TOC hidden
3. **Mobile (<md):** All sidebars hidden, accessible via off-canvas drawer triggered by hamburger

Your current implementation has **two critical issues**:
- `ContentSidebar` has no mobile responsive behavior (fixed `w-72`)
- Layout lacks mobile toggle state management for the documentation sidebar

---

## Current Codebase Analysis

### What Exists

```
Layout Structure:
Navbar (z-50, fixed, has hamburger menu)
└── Content Layout
    ├── ContentSidebar (w-72, sticky, NO mobile handling)
    └── Main Content (flex-1)
        └── Article Page
            ├── Article Content (flex-1, max-w-3xl)
            └── TableOfContents (hidden xl:block, w-56)
```

### Current Issues Identified

| Component | Issue | Impact |
|-----------|-------|--------|
| `ContentSidebar` | Fixed `w-72` with no responsive classes | Squashes content on mobile, causes overflow |
| `ContentSidebar` | No mobile toggle state | Sidebar always visible, takes 288px |
| Content Layout | `flex` container with no `min-w-0` on children | Can cause horizontal overflow |
| Article page | `max-w-3xl` without `w-full` | May not fill available space correctly |

---

## Recommended Architecture

### Component Boundaries

| Component | Responsibility | Mobile Behavior |
|-----------|---------------|-----------------|
| `Navbar` | Site-wide navigation, language switch | Existing hamburger works for nav links |
| `ContentLayout` | Wrapper managing sidebar state | Provides sidebar toggle context |
| `ContentSidebar` | Article navigation, search, categories | Off-canvas drawer on mobile |
| `MobileSidebarToggle` | Button to open sidebar on mobile | Visible only on mobile (<md) |
| `SidebarBackdrop` | Overlay when mobile sidebar open | Prevents interaction with content |
| `TableOfContents` | In-page navigation | Hidden on smaller screens (existing) |
| `ArticleContent` | Main content area | Full width on mobile |

### Layout Structure (Recommended)

```
<ContentLayout>                      {/* Manages sidebar state via useState or Context */}
  <Navbar />                         {/* z-50, fixed top */}

  <div className="flex min-h-screen pt-16">
    {/* Mobile sidebar toggle - visible only on mobile */}
    <MobileSidebarToggle />          {/* md:hidden, fixed, z-40 */}

    {/* Backdrop when sidebar open */}
    {sidebarOpen && <SidebarBackdrop />}  {/* fixed, inset-0, z-30 */}

    {/* Sidebar */}
    <ContentSidebar
      isOpen={sidebarOpen}           {/* Controls mobile visibility */}
      onClose={() => setSidebarOpen(false)}
    />                               {/* Desktop: static, Mobile: fixed overlay */}

    {/* Main content */}
    <main className="flex-1 min-w-0">
      {children}
    </main>
  </div>
</ContentLayout>
```

---

## Patterns to Follow

### Pattern 1: Mobile-First Responsive Sidebar

**What:** Sidebar hidden by default on mobile, shown via translate transform
**When:** Any documentation layout with sidebar navigation
**Confidence:** HIGH (verified with Tailwind official docs, Flowbite)

```tsx
// ContentSidebar.tsx
export default function ContentSidebar({
  isOpen,
  onClose,
  articles,
  categories,
  locale
}: ContentSidebarProps) {
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed md:sticky
        top-16
        left-0
        z-40 md:z-0
        w-72
        h-[calc(100vh-64px)]
        bg-turfu-darker/95 md:bg-turfu-darker/50
        border-r border-white/10
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Existing sidebar content */}
      </aside>
    </>
  );
}
```

**Key classes explained:**
- `fixed md:sticky` - Overlay on mobile, sticky on desktop
- `-translate-x-full md:translate-x-0` - Hidden left on mobile, visible on desktop
- `transition-transform duration-300` - Smooth slide animation
- `z-40` - Above content, below navbar (z-50)

### Pattern 2: Mobile Sidebar Toggle Button

**What:** Floating button visible only on mobile to open sidebar
**When:** Documentation pages with sidebar navigation

```tsx
// MobileSidebarToggle.tsx
export default function MobileSidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-4 left-4 z-40
        md:hidden
        p-3 rounded-full
        bg-turfu-accent text-white
        shadow-lg
        hover:bg-turfu-accent/80
        transition-colors
      "
      aria-label="Open navigation"
    >
      <Menu size={24} />
    </button>
  );
}
```

**Alternative:** Use a header bar with hamburger instead of floating button:

```tsx
// Mobile header bar at top of content area
<div className="md:hidden sticky top-16 z-30 bg-turfu-dark border-b border-white/10 px-4 py-3 flex items-center gap-3">
  <button onClick={() => setSidebarOpen(true)} className="text-white">
    <Menu size={20} />
  </button>
  <span className="text-sm text-turfu-muted">Documentation</span>
</div>
```

### Pattern 3: State Management for Sidebar Toggle

**What:** React state at layout level controlling sidebar visibility
**When:** Multi-page documentation with persistent sidebar

```tsx
// content/layout.tsx
'use client';

import { useState, useEffect } from 'react';

export default function ContentLayout({ children, articles, categories, locale }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change (optional)
  const pathname = usePathname();
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen pt-16 bg-turfu-dark">
        <ContentSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          articles={articles}
          categories={categories}
          locale={locale}
        />
        <div className="flex-1 min-w-0">
          {/* Mobile toggle */}
          <div className="md:hidden sticky top-16 z-30 bg-turfu-dark/95 backdrop-blur border-b border-white/10 px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-turfu-muted hover:text-white"
            >
              <Menu size={18} />
              <span className="text-sm">Menu</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
```

### Pattern 4: Preventing Horizontal Overflow

**What:** Constrain content width to prevent mobile horizontal scroll
**When:** Any flexible layout with potentially wide content
**Confidence:** HIGH (verified with Tailwind docs)

```tsx
// Apply to main content wrapper
<main className="flex-1 min-w-0 overflow-x-hidden">
  {children}
</main>

// Apply to article content
<article className="w-full max-w-3xl p-4 md:p-8">
  {/* Content */}
</article>

// For code blocks or tables that might overflow
<div className="overflow-x-auto">
  <pre className="...">...</pre>
</div>
```

**Key classes:**
- `min-w-0` on flex children prevents flex items from exceeding container
- `overflow-x-hidden` on wrapper prevents horizontal scroll
- `overflow-x-auto` on specific wide content allows localized scrolling
- `w-full` ensures content fills available space

### Pattern 5: Three-Column Article Layout

**What:** Content + TOC layout within main area
**When:** Long-form articles with table of contents

```tsx
// [slug]/page.tsx
<div className="flex">
  {/* Main content - takes full width on mobile, constrains on desktop */}
  <article className="flex-1 min-w-0 p-4 md:p-8 max-w-3xl">
    {/* Article content */}
  </article>

  {/* TOC - hidden until xl breakpoint */}
  <TableOfContents content={article.content} locale={locale} />
</div>
```

The existing `TableOfContents` correctly uses `hidden xl:block` - this is the right pattern.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Fixed Width Without Responsive Classes

**What:** Using `w-72` or similar without breakpoint variants
**Why bad:** Causes content squeeze and overflow on mobile
**Instead:** Use `w-72 md:w-72` with mobile handling, or transform-based hide/show

```tsx
// BAD
<aside className="w-72 sticky top-16">

// GOOD
<aside className="
  fixed md:sticky
  w-72
  -translate-x-full md:translate-x-0
  transition-transform
">
```

### Anti-Pattern 2: Missing min-w-0 on Flex Children

**What:** Flex children without `min-w-0` when content can be wide
**Why bad:** Flex items have `min-width: auto` by default, causing overflow
**Instead:** Add `min-w-0` to flex children that contain potentially wide content

```tsx
// BAD
<div className="flex">
  <aside className="w-72">...</aside>
  <main className="flex-1">...</main>  {/* Can overflow */}
</div>

// GOOD
<div className="flex">
  <aside className="w-72 flex-shrink-0">...</aside>
  <main className="flex-1 min-w-0">...</main>
</div>
```

### Anti-Pattern 3: Z-Index Wars

**What:** Arbitrary z-index values without consistent scale
**Why bad:** Elements overlap unpredictably, mobile menu hidden behind content
**Instead:** Use Tailwind's z-index scale consistently

| Layer | Z-Index | Use |
|-------|---------|-----|
| Backdrop | `z-30` | Modal/sidebar overlay backdrop |
| Sidebar | `z-40` | Off-canvas navigation |
| Navbar | `z-50` | Fixed top navigation |

### Anti-Pattern 4: Duplicate Navigation Structures

**What:** Separate desktop and mobile navigation HTML
**Why bad:** Maintenance burden, accessibility issues
**Instead:** Single structure with responsive classes

```tsx
// BAD: Two separate structures
<nav className="hidden md:flex">...</nav>
<nav className="md:hidden">...</nav>

// GOOD: Single structure, responsive classes
<nav className="transform transition-transform -translate-x-full md:translate-x-0">
  {/* Same content for both */}
</nav>
```

---

## Specific Fixes for Current Issues

### Fix 1: ContentSidebar Responsive Behavior

Current `ContentSidebar.tsx` line 88:
```tsx
// CURRENT (broken)
<aside className="w-72 border-r border-white/10 bg-turfu-darker/50 h-[calc(100vh-64px)] sticky top-16 flex flex-col">
```

Should become:
```tsx
<aside className={`
  fixed md:sticky
  top-16 left-0
  z-40 md:z-0
  w-72
  h-[calc(100vh-64px)]
  bg-turfu-darker/95 md:bg-turfu-darker/50
  border-r border-white/10
  flex flex-col
  transform transition-transform duration-300 ease-in-out
  ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
`}>
```

### Fix 2: Content Layout Mobile Toggle

Current `content/layout.tsx`:
```tsx
// Add state management and mobile toggle
// Convert to client component with 'use client'
// Add sidebarOpen state
// Pass isOpen and onClose to ContentSidebar
// Add mobile toggle button in content area
```

### Fix 3: Main Content Overflow Prevention

Current `content/layout.tsx` line 24:
```tsx
// CURRENT
<div className="flex-1 min-w-0">{children}</div>

// SHOULD ADD overflow handling
<div className="flex-1 min-w-0 overflow-x-hidden">{children}</div>
```

### Fix 4: Article Page Responsive Padding

Current `[slug]/page.tsx` line 40:
```tsx
// CURRENT
<article className="flex-1 p-8 max-w-3xl">

// SHOULD BE (responsive padding)
<article className="flex-1 min-w-0 p-4 md:p-8 max-w-3xl w-full">
```

---

## Responsive Breakpoint Strategy

Use Tailwind's mobile-first approach consistently:

| Breakpoint | Width | Documentation Layout |
|------------|-------|---------------------|
| Default | < 768px | Sidebar hidden (off-canvas), TOC hidden, single column |
| `md` | >= 768px | Sidebar visible (sticky), TOC hidden, two columns |
| `xl` | >= 1280px | Sidebar visible, TOC visible, three columns |

**Key principle:** Unprefixed classes = mobile. Add `md:` and `xl:` for larger screens.

```tsx
// Correct mobile-first thinking
className="
  hidden          // Mobile: hidden
  md:flex         // Tablet+: flex
  xl:flex-col     // Desktop: flex-col
"
```

---

## Implementation Priority

1. **Phase 1: Fix Horizontal Overflow** (Quick win)
   - Add `min-w-0` and `overflow-x-hidden` to content wrapper
   - Add responsive padding to article page

2. **Phase 2: Mobile Sidebar Toggle** (Core fix)
   - Convert layout to client component
   - Add state management for sidebar
   - Update ContentSidebar with responsive classes

3. **Phase 3: Polish**
   - Add backdrop overlay
   - Add close-on-navigation behavior
   - Add body scroll lock when sidebar open

---

## Sources

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design) - Official breakpoint documentation (HIGH confidence)
- [Flowbite Drawer Component](https://flowbite.com/docs/components/drawer/) - Off-canvas pattern reference (HIGH confidence)
- [shadcn/ui Sidebar](https://ui.shadcn.com/docs/components/sidebar) - Modern React sidebar architecture (HIGH confidence)
- [Every Layout: Sidebar](https://every-layout.dev/layouts/sidebar/) - Intrinsic layout patterns (MEDIUM confidence)
- [Tailwind CSS Sidebar - Flowbite](https://flowbite.com/docs/components/sidebar/) - Sidebar component patterns (HIGH confidence)
- [DEV Community: Fixing Responsive Layouts](https://dev.to/rowsanali/how-to-fix-common-issues-with-responsive-layouts-using-tailwind-css-30gi) - Overflow fixes (MEDIUM confidence)
