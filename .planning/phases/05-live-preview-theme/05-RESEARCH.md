# Phase 5: Live Preview & Theme - Research

**Researched:** 2026-01-31
**Domain:** Real-time markdown preview, React performance optimization, theme system compliance
**Confidence:** HIGH

## Summary

Phase 5 implements live markdown preview and theme compliance for the admin editor. Research confirms the existing architecture already provides most required components: MarkdownRenderer with react-markdown for rendering, next-themes for dark/light mode, and Tailwind with semantic CSS variables for styling. The primary technical challenge is preventing keystroke lag during live preview updates.

The recommended approach uses React 18's `useDeferredValue` hook instead of manual debouncing. This provides adaptive performance that responds to device capability rather than fixed delays. The existing MarkdownRenderer must be wrapped in `React.memo()` to enable this optimization. Theme compliance requires auditing hardcoded colors in ArticleEditor and AdminDashboard components to use existing CSS variables.

The unsaved changes indicator (SAVE-01) requires tracking dirty state and implementing both visual feedback and browser beforeunload warning. Due to Next.js App Router limitations, client-side navigation interception is complex and may be deferred if time-constrained.

**Primary recommendation:** Use `useDeferredValue` for preview updates with memoized MarkdownRenderer, audit all admin components for semantic color variables.

## Standard Stack

The established libraries/tools for this domain:

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-markdown | 10.1.0 | Markdown to HTML rendering | Already used in MarkdownRenderer, proven performance |
| next-themes | 0.4.6 | Dark/light mode management | Already configured, provides useTheme hook |
| React 18 | 18.3.1 | useDeferredValue for preview optimization | Built-in, no dependencies, adapts to device speed |

### Supporting (Already Installed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| remark-gfm | 4.0.1 | GitHub Flavored Markdown | Already configured in MarkdownRenderer |
| rehype-slug | 6.0.0 | Add IDs to headings | Already configured in MarkdownRenderer |
| lucide-react | 0.460.0 | Icons for save indicator | Already used throughout admin panel |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| useDeferredValue | Manual debounce (setTimeout) | Fixed delay doesn't adapt to device speed, requires cleanup |
| useDeferredValue | useTransition | useTransition for imperative updates, useDeferredValue for prop values |
| Built-in beforeunload | next-navigation guards | Complex in App Router, beforeunload simpler for Phase 5 scope |

**Installation:**
```bash
# No new dependencies required - all libraries already installed
```

## Architecture Patterns

### Recommended Component Structure
```
src/components/admin/
├── ArticleEditor.tsx       # Main editor (modify for preview + dirty state)
├── MarkdownPreview.tsx     # NEW: Memoized preview wrapper
├── SaveIndicator.tsx       # NEW: "Saved" / "Unsaved changes" status
└── AdminDashboard.tsx      # Container (theme audit only)
```

### Pattern 1: Deferred Preview with useDeferredValue
**What:** React 18 hook that creates a "lagging" version of a value for expensive renders
**When to use:** Live preview where input must stay responsive while heavy component re-renders
**Example:**
```typescript
// Source: https://react.dev/reference/react/useDeferredValue
import { useDeferredValue, memo } from 'react';
import MarkdownRenderer from '@/components/content/MarkdownRenderer';

// CRITICAL: Wrap in memo() to enable optimization
const MemoizedPreview = memo(function MemoizedPreview({ content }: { content: string }) {
  return <MarkdownRenderer content={content} />;
});

function ArticleEditor() {
  const [rawContent, setRawContent] = useState('');

  // Create deferred version - updates lag behind on slow devices
  const deferredContent = useDeferredValue(rawContent);

  // Visual feedback when preview is stale
  const isStale = rawContent !== deferredContent;

  return (
    <div className="flex">
      <textarea
        value={rawContent}
        onChange={(e) => setRawContent(e.target.value)}
      />
      <div style={{ opacity: isStale ? 0.7 : 1 }}>
        <MemoizedPreview content={deferredContent} />
      </div>
    </div>
  );
}
```

### Pattern 2: Dirty State Tracking
**What:** Track whether content has changed from initial/saved state
**When to use:** Unsaved changes indicator, beforeunload warning
**Example:**
```typescript
// Source: Standard React pattern
function ArticleEditor({ initialContent = '' }: Props) {
  const [rawContent, setRawContent] = useState(initialContent);
  const [savedContent, setSavedContent] = useState(initialContent);

  // Derive dirty state
  const isDirty = rawContent !== savedContent;

  // Update saved content after successful save
  const handleSave = async (data) => {
    await onSave(data);
    setSavedContent(rawContent);
  };

  return (
    <>
      <SaveIndicator isDirty={isDirty} />
      {/* ... */}
    </>
  );
}
```

### Pattern 3: beforeunload Warning
**What:** Browser warning when user tries to close tab with unsaved changes
**When to use:** Protect against accidental data loss
**Example:**
```typescript
// Source: https://claritydev.net/blog/display-warning-for-unsaved-form-data-on-page-exit
import { useEffect } from 'react';

function useBeforeUnload(isDirty: boolean) {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        // Most browsers ignore custom message, show default
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);
}
```

### Pattern 4: Semantic Color Variables (Theme Compliance)
**What:** Use CSS variables instead of hardcoded colors
**When to use:** ALL admin components to respect dark/light mode
**Example:**
```typescript
// BAD - hardcoded colors
<div className="bg-gray-800 text-white">

// GOOD - semantic variables (already defined in globals.css)
<div className="bg-surface text-foreground">
<div className="bg-overlay text-foreground-muted">
<div className="border-border">
```

### Anti-Patterns to Avoid
- **Direct useState binding to preview:** Causes re-render on every keystroke, cursor jumps
- **Manual debounce with fixed ms:** 300ms too slow on fast devices, too fast on slow
- **Creating new content string in render:** Defeats memo optimization, use stable reference
- **Hardcoded hex colors in Tailwind classes:** Breaks theme toggle, use semantic classes

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Preview debouncing | setTimeout wrapper | useDeferredValue | Built-in, adaptive, interruptible |
| Dark/light toggle | Custom theme state | next-themes useTheme | Already integrated, handles hydration |
| Markdown rendering | Custom parser | MarkdownRenderer | Already styled with semantic colors |
| Save indicator icons | Custom SVG | lucide-react (Check, AlertCircle) | Already in bundle |

**Key insight:** React 18's useDeferredValue solves the preview performance problem better than manual debouncing because it adapts to the user's device. Fast device = near-instant updates. Slow device = appropriate lag. No fixed timing to tune.

## Common Pitfalls

### Pitfall 1: Forgetting memo() on Preview Component
**What goes wrong:** useDeferredValue has no effect, every keystroke re-renders preview
**Why it happens:** Without memo, parent re-render forces child re-render regardless of props
**How to avoid:** Always wrap expensive child components in React.memo()
**Warning signs:** Input feels laggy despite using useDeferredValue

### Pitfall 2: Hydration Mismatch with Theme
**What goes wrong:** Console error about server/client mismatch, flash of wrong theme
**Why it happens:** Server doesn't know theme preference, renders default
**How to avoid:** Use mounted check before rendering theme-dependent UI, add suppressHydrationWarning to html
**Warning signs:** "Text content does not match server-rendered HTML" error

### Pitfall 3: beforeunload Not Firing on Client Navigation
**What goes wrong:** User navigates away via Link or router.push without warning
**Why it happens:** beforeunload only fires on browser events (tab close, refresh), not React navigation
**How to avoid:** For Phase 5, focus on browser events; client navigation interception is complex in App Router
**Warning signs:** User loses work when clicking internal links

### Pitfall 4: Creating Objects in Render (Defeats Memo)
**What goes wrong:** Memoized component re-renders despite same content
**Why it happens:** New object reference on each render fails shallow comparison
**How to avoid:** Pass primitives (strings) not objects, or memoize objects with useMemo
**Warning signs:** Preview updates on every keystroke despite useDeferredValue

### Pitfall 5: Inconsistent Color Variables Between Components
**What goes wrong:** Some elements don't change color on theme toggle
**Why it happens:** Mix of hardcoded colors and CSS variables
**How to avoid:** Audit all className for hex codes, replace with semantic classes
**Warning signs:** "Checkerboard" effect where some UI changes theme, some doesn't

## Code Examples

Verified patterns from official sources:

### Live Preview with useDeferredValue
```typescript
// Source: https://react.dev/reference/react/useDeferredValue
// ArticleEditor.tsx - Modified preview section

import { useState, useDeferredValue, memo } from 'react';
import MarkdownRenderer from '@/components/content/MarkdownRenderer';

// Wrap existing MarkdownRenderer in memo
const MemoizedMarkdownRenderer = memo(MarkdownRenderer);

export default function ArticleEditor({
  initialContent = '',
  onSave,
  onCancel,
}: ArticleEditorProps) {
  const [rawContent, setRawContent] = useState(initialContent);
  const [savedContent, setSavedContent] = useState(initialContent);

  // Defer preview updates - adapts to device speed
  const deferredContent = useDeferredValue(rawContent);
  const isPreviewStale = rawContent !== deferredContent;
  const isDirty = rawContent !== savedContent;

  // Extract markdown body (remove frontmatter)
  const markdownBody = deferredContent.replace(/^---[\s\S]*?---\n?/, '');

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Header with save indicator */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <SaveIndicator isDirty={isDirty} />
        {/* ... existing header content */}
      </div>

      {/* Content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div className="flex-1">
          <textarea
            value={rawContent}
            onChange={(e) => setRawContent(e.target.value)}
            className="w-full h-full p-6 bg-transparent text-foreground font-mono"
          />
        </div>

        {/* Preview - uses deferred content */}
        {showPreview && (
          <div
            className="w-1/2 border-l border-border overflow-auto p-6"
            style={{ opacity: isPreviewStale ? 0.7 : 1, transition: 'opacity 0.15s' }}
          >
            <MemoizedMarkdownRenderer content={markdownBody} />
          </div>
        )}
      </div>
    </div>
  );
}
```

### Save Indicator Component
```typescript
// Source: Standard React pattern
// SaveIndicator.tsx

import { Check, AlertCircle } from 'lucide-react';

interface SaveIndicatorProps {
  isDirty: boolean;
}

export default function SaveIndicator({ isDirty }: SaveIndicatorProps) {
  if (isDirty) {
    return (
      <span className="flex items-center gap-1.5 text-sm text-yellow-500">
        <AlertCircle size={14} />
        Unsaved changes
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5 text-sm text-foreground-muted">
      <Check size={14} />
      Saved
    </span>
  );
}
```

### beforeunload Hook
```typescript
// Source: https://claritydev.net/blog/display-warning-for-unsaved-form-data-on-page-exit
// hooks/useBeforeUnload.ts

import { useEffect } from 'react';

export function useBeforeUnload(isDirty: boolean) {
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        return '';
      }
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);
}
```

### Theme-Compliant Component Audit
```typescript
// BEFORE (ArticleEditor.tsx lines with hardcoded colors to fix)
// Line 122-125:
className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
  published
    ? 'bg-green-500/20 text-green-400 border border-green-500/30'  // ❌ hardcoded
    : 'bg-overlay text-foreground-muted border border-border'      // ✓ semantic
}`}

// AFTER (use semantic with accent colors)
className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
  published
    ? 'bg-green-500/20 text-green-500 dark:text-green-400 border border-green-500/30'
    : 'bg-overlay text-foreground-muted border border-border'
}`}

// Note: green-500/400 are functional colors (success state), acceptable as-is
// Focus audit on non-semantic grays and text colors
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| setTimeout debounce | useDeferredValue | React 18 (2022) | Adaptive performance, no timing tuning |
| redux for dirty state | Derived from useState | React 16+ | Simpler, no extra deps |
| Custom theme context | next-themes | Stable | Handles SSR hydration automatically |

**Deprecated/outdated:**
- **Manual throttle/debounce for rendering:** useDeferredValue handles this automatically
- **useLayoutEffect for theme:** Causes hydration issues, use mounted pattern

## Open Questions

Things that couldn't be fully resolved:

1. **Client-side navigation interception**
   - What we know: beforeunload works for browser events (close tab, refresh)
   - What's unclear: Next.js App Router removed router.events, making Link/router.push interception complex
   - Recommendation: For Phase 5, implement beforeunload only; document as known limitation; client navigation interception could be Phase 5.1 if users report data loss

2. **Preview panel responsiveness on mobile**
   - What we know: Current split-view halves screen width, may be cramped on mobile
   - What's unclear: Whether mobile admin editing is a priority use case
   - Recommendation: Implement desktop-first split view; ensure toggle works correctly; mobile optimization deferred per research scope

## Sources

### Primary (HIGH confidence)
- [React useDeferredValue documentation](https://react.dev/reference/react/useDeferredValue) - Official API, usage patterns, memo requirement
- [React memo documentation](https://react.dev/reference/react/memo) - Component memoization for deferred rendering
- `/src/components/content/MarkdownRenderer.tsx` - Existing renderer (135 lines, reusable)
- `/src/components/admin/ArticleEditor.tsx` - Current editor structure (200 lines)
- `/src/app/globals.css` - CSS variables for semantic colors
- `tailwind.config.ts` - Semantic color class definitions

### Secondary (MEDIUM confidence)
- [next-themes GitHub](https://github.com/pacocoursey/next-themes) - Hydration handling, suppressHydrationWarning
- [ClarityDev beforeunload guide](https://claritydev.net/blog/display-warning-for-unsaved-form-data-on-page-exit) - Browser event pattern
- [remarkjs/react-markdown performance](https://github.com/remarkjs/react-markdown/issues/459) - Debounce recommendations

### Tertiary (LOW confidence, needs validation)
- Next.js App Router navigation interception patterns - Community solutions vary, no official API
- Mobile admin UX - No specific research, desktop-first assumed

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and configured
- Architecture: HIGH - useDeferredValue + memo is documented React 18 pattern
- Pitfalls: HIGH - Verified against React docs and existing codebase

**Research date:** 2026-01-31
**Valid until:** 60 days (stable patterns, no fast-moving dependencies)
