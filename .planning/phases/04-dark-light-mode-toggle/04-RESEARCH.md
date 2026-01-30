# Phase 4: Dark/Light Mode Toggle - Research

**Researched:** 2026-01-30
**Domain:** Next.js App Router theming with Tailwind CSS
**Confidence:** HIGH

## Summary

This research investigates implementing a dark/light mode toggle for a Next.js 14 App Router application using Tailwind CSS. The project already has the foundation in place: `darkMode: 'class'` is configured in `tailwind.config.ts`, and the HTML element currently has a hardcoded `className="dark"`.

The standard approach is to use the **next-themes** library, which handles system preference detection, localStorage persistence, and hydration mismatch prevention out of the box. This is the de facto standard for Next.js dark mode implementations, used by shadcn/ui and recommended across the ecosystem.

Key implementation requirements: (1) wrap the app with ThemeProvider, (2) add `suppressHydrationWarning` to the html element, (3) create a toggle component that delays rendering until mounted to avoid hydration mismatches, and (4) define light mode CSS variables and Tailwind `dark:` utility classes throughout the app.

**Primary recommendation:** Use next-themes with `attribute="class"` and create a toggle component following the mounted-state pattern to avoid hydration errors.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next-themes | ^0.4.x | Theme management (system detection, localStorage, no flash) | De facto standard for Next.js theming; used by shadcn/ui; handles hydration correctly |
| tailwindcss | ^3.4.14 | Dark mode styling via `dark:` variant | Already in project; `darkMode: 'class'` already configured |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | ^0.460.0 | Sun/Moon icons for toggle | Already in project; provides `Sun` and `Moon` icons |
| framer-motion | ^11.0.0 | Toggle animation | Already in project; use for smooth icon transitions |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next-themes | Custom hook + script | More control but must handle localStorage, system preference, hydration, flash prevention manually |
| CSS `dark:` classes | CSS variables only | CSS variables are more flexible but require more setup; `dark:` is simpler for most cases |

**Installation:**
```bash
npm install next-themes
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── ThemeProvider.tsx    # Client component wrapping NextThemesProvider
│   ├── ThemeToggle.tsx      # Toggle button component
│   └── ...
├── app/
│   └── [locale]/
│       └── layout.tsx       # Integrates ThemeProvider, adds suppressHydrationWarning
└── app/
    └── globals.css          # Light mode CSS variables + dark mode overrides
```

### Pattern 1: ThemeProvider Wrapper
**What:** A client component that wraps next-themes' ThemeProvider
**When to use:** Always - required for Next.js App Router
**Example:**
```typescript
// Source: https://ui.shadcn.com/docs/dark-mode/next
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### Pattern 2: Mounted-State Toggle Component
**What:** Toggle component that waits for client mount before rendering theme-dependent UI
**When to use:** Always when displaying current theme or toggle icons
**Example:**
```typescript
// Source: https://github.com/pacocoursey/next-themes
'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Return placeholder with same dimensions to avoid layout shift
    return <div className="w-11 h-11" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
}
```

### Pattern 3: CSS Variable-Based Theming
**What:** Define CSS variables for light mode in `:root`, override in `.dark`
**When to use:** For colors that need to work in both modes
**Example:**
```css
/* Source: Tailwind CSS dark mode docs */
@layer base {
  :root {
    --background: 250 250 250;
    --foreground: 10 10 10;
    --muted: 161 161 170;
  }

  .dark {
    --background: 10 10 10;
    --foreground: 250 250 250;
    --muted: 161 161 170;
  }
}
```

### Anti-Patterns to Avoid
- **Rendering theme-dependent UI without mount check:** Causes hydration mismatch errors
- **Reading `theme` directly instead of `resolvedTheme`:** `theme` can be "system" - use `resolvedTheme` for actual light/dark value
- **Forgetting `suppressHydrationWarning` on `<html>`:** Will show React warnings in console
- **Using inline styles for theme colors:** Use Tailwind `dark:` variants or CSS variables instead

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| System preference detection | Custom `matchMedia` listener | next-themes `enableSystem` | Handles SSR, updates on OS change, edge cases |
| localStorage persistence | Custom storage hook | next-themes built-in | Handles missing localStorage, SSR, sync across tabs |
| Flash of wrong theme (FOUC) | Inline `<script>` in head | next-themes script injection | Already optimized, handles all edge cases |
| Hydration mismatch | Custom mounted check | next-themes + mounted pattern | Well-documented, battle-tested approach |
| Theme toggle animation | Custom CSS transitions | Framer Motion AnimatePresence | Already in project, consistent with BackToTop pattern |

**Key insight:** Dark mode appears simple but has many edge cases (SSR, hydration, system preference changes, tab sync, localStorage unavailable). next-themes handles all of these; custom implementations typically miss several.

## Common Pitfalls

### Pitfall 1: Hydration Mismatch
**What goes wrong:** React throws warning "Prop className did not match. Server: "light" Client: "dark""
**Why it happens:** Server cannot know user's theme preference (no access to localStorage/matchMedia), so server-rendered HTML has wrong theme class
**How to avoid:**
1. Add `suppressHydrationWarning` to `<html>` element
2. Use mounted-state pattern in toggle component
3. Do not conditionally render based on theme until mounted
**Warning signs:** Console warnings about hydration, flash of wrong colors

### Pitfall 2: Flash of Unstyled Content (FOUC)
**What goes wrong:** Page briefly shows wrong theme colors before JavaScript runs
**Why it happens:** CSS applies before JavaScript can check localStorage and set correct class
**How to avoid:** next-themes injects a blocking script in `<head>` that sets the class before paint
**Warning signs:** Visible flash when loading page, especially on slow connections

### Pitfall 3: Using `theme` Instead of `resolvedTheme`
**What goes wrong:** Toggle shows "system" as current theme instead of actual light/dark
**Why it happens:** `useTheme().theme` returns the raw value which can be "system", "light", or "dark"
**How to avoid:** Use `resolvedTheme` which always returns "light" or "dark" based on actual resolved preference
**Warning signs:** Incorrect icon shown, confusing three-way toggle when only two-way intended

### Pitfall 4: Layout Shift from Toggle Component
**What goes wrong:** Page content shifts when toggle component mounts
**Why it happens:** Toggle returns `null` before mounted, then renders with dimensions
**How to avoid:** Return a placeholder `<div>` with the same dimensions as the final component
**Warning signs:** Visible content jump when page loads

### Pitfall 5: Forgetting Light Mode Styles
**What goes wrong:** Site looks good in dark mode but broken/invisible in light mode
**Why it happens:** Developers build in dark mode only, don't test light mode
**How to avoid:**
1. Define both light and dark CSS variables
2. Use `dark:` variants consistently
3. Test in both modes during development
**Warning signs:** White text on white background, invisible elements in light mode

### Pitfall 6: Not Respecting prefers-reduced-motion
**What goes wrong:** Toggle animation plays even when user prefers reduced motion
**Why it happens:** Animation implemented without motion preference check
**How to avoid:** Use Tailwind's `motion-reduce:` variant or check `prefers-reduced-motion`
**Warning signs:** Accessibility audit failures

## Code Examples

Verified patterns from official sources:

### ThemeProvider Setup (layout.tsx)
```typescript
// Source: https://ui.shadcn.com/docs/dark-mode/next
import { ThemeProvider } from '@/components/ThemeProvider';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // ... existing locale setup ...

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
            <BackToTop />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### ThemeToggle with Animation (Framer Motion)
```typescript
// Based on: https://dev.to/mrpbennett/creating-a-dark-theme-switch-with-tailwind-framer-motion
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const iconVariants = {
  initial: { opacity: 0, rotate: -90, scale: 0.5 },
  animate: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, rotate: 90, scale: 0.5, transition: { duration: 0.2 } },
};

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-11 h-11 rounded-full" aria-hidden="true" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {isDark ? (
            <Sun size={20} className="text-white" />
          ) : (
            <Moon size={20} className="text-turfu-dark" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
```

### CSS Variables for Both Modes
```css
/* Source: Tailwind CSS docs + project conventions */
@layer base {
  :root {
    /* Light mode (default when .dark class is absent) */
    --background: 250 250 250;
    --foreground: 10 10 10;
    --muted: 113 113 122;
    --accent: 139 92 246;
    --accent2: 6 182 212;
  }

  .dark {
    /* Dark mode */
    --background: 10 10 10;
    --foreground: 250 250 250;
    --muted: 161 161 170;
    --accent: 139 92 246;
    --accent2: 6 182 212;
  }

  body {
    @apply bg-[rgb(var(--background))] text-[rgb(var(--foreground))] antialiased;
  }
}
```

### Alternative: Dynamic Import to Prevent Hydration Issues
```typescript
// Source: https://alckor.dev/fixing-next-themes-hydration-errors-nextjs-app-router
'use client';

import dynamic from 'next/dynamic';
import { type ThemeProviderProps } from 'next-themes';

const NextThemesProvider = dynamic(
  () => import('next-themes').then((m) => m.ThemeProvider),
  { ssr: false }
);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom localStorage + matchMedia | next-themes library | 2022+ | Eliminates edge case bugs |
| `darkMode: 'media'` in Tailwind | `darkMode: 'class'` with toggle | Always for manual toggle | Allows user preference override |
| CSS class toggle only | next-themes with system detection | 2023+ | Respects OS preference by default |
| Three-way toggle (light/dark/system) | Two-way with system as default | Preference | Simpler UX, system respected automatically |

**Deprecated/outdated:**
- `darkMode: 'media'` for manual toggles (use `'class'` instead)
- Custom blocking `<script>` in head (next-themes handles this)
- `localStorage.getItem` in render (causes hydration issues)

## Open Questions

Things that couldn't be fully resolved:

1. **Light mode color palette**
   - What we know: Current project only has dark mode colors defined
   - What's unclear: What should the light mode background/foreground colors be
   - Recommendation: Use off-white background (#fafafa), dark text (#0a0a0a), keep accent colors same

2. **Toggle button position**
   - What we know: BackToTop is at `bottom-5 right-5 z-30`
   - What's unclear: Where should theme toggle be placed
   - Recommendation: Header/navbar area or adjacent to BackToTop at `bottom-5 right-20 z-30`

3. **Transitions during theme change**
   - What we know: `disableTransitionOnChange` prevents flash but also prevents smooth transitions
   - What's unclear: Whether project wants instant switch or smooth transition
   - Recommendation: Start with `disableTransitionOnChange: true` for stability, can remove later

## Sources

### Primary (HIGH confidence)
- [next-themes GitHub README](https://github.com/pacocoursey/next-themes) - ThemeProvider API, useTheme hook, hydration handling
- [Tailwind CSS Dark Mode Docs](https://tailwindcss.com/docs/dark-mode) - darkMode configuration, dark: variant usage
- [shadcn/ui Dark Mode Next.js](https://ui.shadcn.com/docs/dark-mode/next) - Complete implementation pattern

### Secondary (MEDIUM confidence)
- [alckor.dev Next-themes Fix](https://alckor.dev/fixing-next-themes-hydration-errors-nextjs-app-router) - Dynamic import SSR fix pattern
- [Lucide Icons Sun](https://lucide.dev/icons/sun) - Icon availability confirmation
- [Lucide Icons Moon](https://lucide.dev/icons/moon) - Icon availability confirmation

### Tertiary (LOW confidence)
- [DEV.to Framer Motion Dark Theme Switch](https://dev.to/mrpbennett/creating-a-dark-theme-switch-with-tailwind-framer-motion-4f4h) - Animation pattern reference

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - next-themes is universally recommended, official docs consulted
- Architecture: HIGH - shadcn/ui pattern is well-established, verified with official sources
- Pitfalls: HIGH - Documented in next-themes GitHub issues and multiple verified articles

**Research date:** 2026-01-30
**Valid until:** 2026-03-01 (30 days - stable domain, next-themes API unlikely to change)
