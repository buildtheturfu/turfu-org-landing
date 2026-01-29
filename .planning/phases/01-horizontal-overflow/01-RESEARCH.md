# Phase 1: Horizontal Overflow - Research

**Researched:** 2026-01-29
**Domain:** CSS Layout / Mobile Responsive Design
**Confidence:** HIGH

## Summary

This research investigates the existing codebase to identify the exact files and classes that need modification to eliminate horizontal scroll on mobile devices while preserving intentional horizontal scroll for code blocks.

The codebase uses Tailwind CSS with a flex-based layout for the content section. The main content area already has `min-w-0` applied in the layout, which is good practice for flex children. However, several issues were identified: the sidebar has a fixed width (`w-72`) that doesn't hide on mobile, content pages have fixed padding (`p-8`) that doesn't adapt to mobile, and images already have `max-w-full` but might need additional constraints.

**Primary recommendation:** Add responsive sidebar hiding, responsive padding, and ensure `overflow-x-hidden` on the main content wrapper to catch any edge cases.

## Codebase Investigation Findings

### File 1: `src/app/[locale]/content/layout.tsx`

**Current state (line 19-25):**
```tsx
<div className="flex min-h-screen pt-16 bg-turfu-dark">
  <ContentSidebar
    articles={articles}
    categories={categories}
    locale={locale}
  />
  <div className="flex-1 min-w-0">{children}</div>
</div>
```

**Issues identified:**
- The `ContentSidebar` has no mobile hiding - it's always visible with fixed `w-72`
- The main wrapper (`flex min-h-screen pt-16`) lacks `overflow-x-hidden`
- The content child has `min-w-0` (good) but parent doesn't prevent horizontal overflow

**Required changes:**
1. Add `overflow-x-hidden` to the main flex container
2. The sidebar component needs responsive hiding (handled in ContentSidebar.tsx)

### File 2: `src/components/content/ContentSidebar.tsx`

**Current state (line 88):**
```tsx
<aside className="w-72 border-r border-white/10 bg-turfu-darker/50 h-[calc(100vh-64px)] sticky top-16 flex flex-col">
```

**Issues identified:**
- Fixed `w-72` (288px) width with no responsive hiding
- On mobile (< 768px), this takes up significant screen space
- Combined with content area, easily exceeds viewport width

**Required changes:**
1. Add `hidden md:flex` to hide on mobile, show on medium+ screens
2. Change from `flex flex-col` to just adding to the responsive class chain

### File 3: `src/app/[locale]/content/page.tsx`

**Current state (line 60):**
```tsx
<main className="flex-1 p-8 max-w-4xl">
```

**Issues identified:**
- Fixed `p-8` (32px) padding on all sides
- On small mobile (320px wide), 64px total horizontal padding is excessive
- `max-w-4xl` (896px) is fine for limiting desktop width

**Required changes:**
1. Change `p-8` to `p-4 md:p-8` for responsive padding

### File 4: `src/app/[locale]/content/[slug]/page.tsx`

**Current state (line 38-40):**
```tsx
<div className="flex">
  {/* Main content */}
  <article className="flex-1 p-8 max-w-3xl">
```

**Issues identified:**
- Same `p-8` fixed padding issue
- The flex container with TableOfContents might cause issues
- TableOfContents has `hidden xl:block` so it's safe on smaller screens

**Required changes:**
1. Change article's `p-8` to `p-4 md:p-8`

### File 5: `src/components/content/MarkdownRenderer.tsx`

**Current state - Code blocks (line 68-71):**
```tsx
<pre className="bg-turfu-darker border border-white/10 rounded-lg p-4 overflow-x-auto mb-4 text-sm">
  {children}
</pre>
```

**Status:** CORRECT - Already has `overflow-x-auto` for horizontal scrolling

**Current state - Tables (line 96-101):**
```tsx
<div className="overflow-x-auto mb-4">
  <table className="min-w-full border border-white/10 rounded-lg overflow-hidden">
    {children}
  </table>
</div>
```

**Status:** CORRECT - Already wrapped in `overflow-x-auto` container

**Current state - Images (line 121-128):**
```tsx
<img
  src={src}
  alt={alt || ''}
  className="rounded-lg max-w-full h-auto my-4"
/>
```

**Status:** CORRECT - Already has `max-w-full h-auto`

### File 6: `src/components/content/TableOfContents.tsx`

**Current state (line 66):**
```tsx
<aside className="hidden xl:block w-56 flex-shrink-0 h-[calc(100vh-64px)] sticky top-16">
```

**Status:** CORRECT - Already hidden below `xl` breakpoint with `hidden xl:block`

## Architecture Patterns

### CSS Overflow Prevention Pattern

For preventing horizontal scroll at the layout level:

```tsx
// Parent container - prevents overflow escape
<div className="flex min-h-screen overflow-x-hidden">
  {/* Sidebar - hidden on mobile */}
  <aside className="hidden md:flex w-72 flex-col ...">

  {/* Content - flexes to fill, min-w-0 prevents flexbox overflow */}
  <div className="flex-1 min-w-0">
    {/* Responsive padding */}
    <main className="p-4 md:p-8 max-w-4xl">
```

### Key Tailwind Classes

| Class | Purpose | When to Use |
|-------|---------|-------------|
| `overflow-x-hidden` | Clips horizontal overflow | Parent containers |
| `overflow-x-auto` | Allows horizontal scroll | Code blocks, tables |
| `min-w-0` | Allows flex child to shrink below content | Flex children with text |
| `max-w-full` | Constrains to parent width | Images |
| `hidden md:flex` | Hide on mobile, show on tablet+ | Sidebars |
| `p-4 md:p-8` | Responsive padding | Content areas |

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive hiding | JS-based show/hide | `hidden md:block` | CSS media queries are simpler, no JS needed |
| Overflow containers | Custom scroll logic | `overflow-x-auto` | Tailwind handles browser differences |
| Image sizing | `width: 100%` inline | `max-w-full h-auto` | Tailwind utility classes are consistent |

## Common Pitfalls

### Pitfall 1: Forgetting `min-w-0` on Flex Children

**What goes wrong:** Flex children with long content (code, URLs) push parent beyond viewport
**Why it happens:** Default flex behavior prevents children from shrinking below their content size
**How to avoid:** Always add `min-w-0` to flex children that contain user content
**Warning signs:** Horizontal scroll appears only on pages with long unbroken strings

### Pitfall 2: Fixed Sidebar Width Without Responsive Hiding

**What goes wrong:** Sidebar + content exceeds mobile viewport (e.g., 288px + 320px > 375px)
**Why it happens:** Desktop-first design doesn't account for mobile viewport
**How to avoid:** Use `hidden md:block` pattern for sidebars
**Warning signs:** Every content page has horizontal scroll on mobile

### Pitfall 3: Fixed Padding on Mobile

**What goes wrong:** 32px + 32px padding on 320px screen leaves only 256px for content
**Why it happens:** Desktop padding values applied universally
**How to avoid:** Use responsive padding `p-4 md:p-8`
**Warning signs:** Content feels cramped on mobile, text wraps excessively

### Pitfall 4: Missing `overflow-x-hidden` on Content Wrapper

**What goes wrong:** Single piece of wide content (code, image) causes entire page to scroll
**Why it happens:** No boundary to contain overflow
**How to avoid:** Add `overflow-x-hidden` at layout level
**Warning signs:** Scrolling right reveals empty space beyond content

## Code Examples

### Layout Container Fix

```tsx
// src/app/[locale]/content/layout.tsx - line 19
<div className="flex min-h-screen pt-16 bg-turfu-dark overflow-x-hidden">
```

### Sidebar Responsive Hiding

```tsx
// src/components/content/ContentSidebar.tsx - line 88
<aside className="hidden md:flex md:flex-col w-72 border-r border-white/10 bg-turfu-darker/50 h-[calc(100vh-64px)] sticky top-16">
```

### Responsive Padding

```tsx
// src/app/[locale]/content/page.tsx - line 60
<main className="flex-1 p-4 md:p-8 max-w-4xl">

// src/app/[locale]/content/[slug]/page.tsx - line 40
<article className="flex-1 p-4 md:p-8 max-w-3xl">
```

## Verification Checklist

After implementation, verify:

1. **No horizontal scrollbar on mobile (375px)**
   - Content list page: `/{locale}/content`
   - Article page: `/{locale}/content/{slug}`

2. **Code blocks scroll horizontally**
   - View an article with long code lines
   - Code block should have its own scrollbar

3. **Images stay within viewport**
   - View an article with images
   - Images should not exceed container width

4. **Sidebar behavior**
   - Mobile: sidebar hidden
   - Tablet/Desktop: sidebar visible

5. **Content readability**
   - Mobile: comfortable padding (16px)
   - Desktop: spacious padding (32px)

## Files to Modify Summary

| File | Change | Priority |
|------|--------|----------|
| `src/app/[locale]/content/layout.tsx` | Add `overflow-x-hidden` to flex container | HIGH |
| `src/components/content/ContentSidebar.tsx` | Add `hidden md:flex md:flex-col` | HIGH |
| `src/app/[locale]/content/page.tsx` | Change `p-8` to `p-4 md:p-8` | MEDIUM |
| `src/app/[locale]/content/[slug]/page.tsx` | Change `p-8` to `p-4 md:p-8` | MEDIUM |
| `src/components/content/MarkdownRenderer.tsx` | No changes needed | N/A |

## Sources

### Primary (HIGH confidence)
- Direct codebase investigation - all files read and analyzed
- Tailwind CSS documentation - responsive design utilities

## Metadata

**Confidence breakdown:**
- File identification: HIGH - Direct code inspection
- Required changes: HIGH - Standard Tailwind patterns
- Pitfalls: HIGH - Common CSS layout issues

**Research date:** 2026-01-29
**Valid until:** No expiration - codebase-specific findings
