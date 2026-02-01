# Phase 7: Form Validation & Polish - Research

**Researched:** 2026-02-01
**Domain:** React Hook Form + Zod validation, keyboard shortcuts, form UX
**Confidence:** HIGH

## Summary

This phase implements form validation and UX polish for the admin article editor using the already-decided stack: react-hook-form + zod (15kB total). The current ArticleEditor uses manual state management with useState hooks and no validation. The goal is to integrate react-hook-form for form state, zod for schema validation, add keyboard shortcuts (Cmd+S), loading spinners, and proper form field grouping.

The key architectural challenge is integrating react-hook-form with the existing custom ComboboxInput and TagInput components, which are controlled components that update frontmatter directly. The Controller wrapper pattern from react-hook-form enables this integration cleanly.

**Primary recommendation:** Use react-hook-form with zod resolver in `mode: 'onBlur'` for field-level validation, Controller wrappers for custom inputs, and a simple useEffect-based keyboard shortcut handler for Cmd+S.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-hook-form | ^7.x | Form state management, validation orchestration | Minimal re-renders, uncontrolled components, 8kB |
| zod | ^3.x | Schema validation with TypeScript inference | Type-safe, composable, 7kB |
| @hookform/resolvers | ^3.x | Bridge between react-hook-form and zod | Official integration |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | (already installed) | Loader2 icon for spinner | Save button loading state |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @hookform/resolvers | Manual validation | More boilerplate, less type safety |
| Loader2 icon | Custom CSS spinner | Extra code, lucide already in project |
| useEffect keyboard hook | react-hotkeys-hook | Extra dependency for single shortcut |

**Installation:**
```bash
npm install react-hook-form zod @hookform/resolvers
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/admin/
│   ├── ArticleEditor.tsx     # Refactor to use react-hook-form
│   ├── ComboboxInput.tsx     # Add Controller-compatible props
│   ├── TagInput.tsx          # Add Controller-compatible props
│   └── SaveIndicator.tsx     # Keep as-is (already works)
├── lib/
│   └── schemas/
│       └── article.ts        # Zod schema for article form
└── hooks/
    ├── useBeforeUnload.ts    # Already exists
    └── useKeyboardShortcut.ts # New: Cmd+S handler
```

### Pattern 1: Zod Schema with Type Inference
**What:** Define validation schema once, infer TypeScript types
**When to use:** Form data that needs validation and type safety
**Example:**
```typescript
// Source: https://github.com/react-hook-form/resolvers
import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  author: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
```

### Pattern 2: Controller for Custom Inputs
**What:** Wrap custom controlled components to work with react-hook-form
**When to use:** ComboboxInput, TagInput - components that don't use native ref patterns
**Example:**
```typescript
// Source: https://react-hook-form.com/docs/usecontroller/controller
import { Controller } from 'react-hook-form';

<Controller
  control={control}
  name="category"
  render={({ field: { onChange, onBlur, value } }) => (
    <ComboboxInput
      id="category"
      label="Category"
      value={value}
      options={categories}
      onChange={onChange}
      onBlur={onBlur}
      placeholder="Select or enter category"
    />
  )}
/>
```

### Pattern 3: onBlur Validation Mode
**What:** Validate fields when user tabs away (blur event)
**When to use:** Inline field validation without interrupting typing
**Example:**
```typescript
// Source: https://react-hook-form.com/docs/useform
const { register, control, handleSubmit, formState: { errors } } = useForm<ArticleFormData>({
  resolver: zodResolver(articleSchema),
  mode: 'onBlur', // Validates on blur
  defaultValues: {
    title: '',
    description: '',
    category: '',
    tags: [],
    content: '',
  },
});
```

### Pattern 4: Inline Error Display
**What:** Show error message immediately below the problematic field
**When to use:** All form fields with validation
**Example:**
```typescript
// Accessible error pattern with ARIA attributes
<div>
  <input
    {...register('title')}
    aria-invalid={!!errors.title}
    aria-describedby={errors.title ? 'title-error' : undefined}
    className={errors.title ? 'border-red-500' : 'border-border'}
  />
  {errors.title && (
    <p id="title-error" role="alert" className="text-red-500 text-sm mt-1">
      {errors.title.message}
    </p>
  )}
</div>
```

### Pattern 5: Keyboard Shortcut Handler
**What:** Listen for Cmd+S (Mac) / Ctrl+S (Windows) to trigger save
**When to use:** Save form action
**Example:**
```typescript
// Simple hook-based approach (no external library needed)
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [handleSubmit, onSubmit]);
```

### Pattern 6: Loading Spinner Button
**What:** Disable button and show spinner during form submission
**When to use:** Save button during async operation
**Example:**
```typescript
// Source: https://lucide.dev/icons/loader
import { Loader2, Save } from 'lucide-react';

<button
  type="submit"
  disabled={isSubmitting}
  className="flex items-center gap-2 px-4 py-2 bg-turfu-accent text-black rounded-lg disabled:opacity-50"
>
  {isSubmitting ? (
    <Loader2 size={16} className="animate-spin" />
  ) : (
    <Save size={16} />
  )}
  {isSubmitting ? 'Saving...' : 'Save'}
</button>
```

### Pattern 7: Form Grouping with Fieldset
**What:** Semantic HTML grouping of related form fields
**When to use:** Separating metadata section from content section
**Example:**
```typescript
// Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
<fieldset className="border-b border-border p-4">
  <legend className="text-sm font-medium text-foreground-muted px-2">
    Metadata
  </legend>
  {/* Category, Tags, Author fields */}
</fieldset>

<fieldset className="flex-1 flex flex-col">
  <legend className="sr-only">Content</legend>
  {/* Title, Content fields */}
</fieldset>
```

### Anti-Patterns to Avoid
- **Using `value` instead of `defaultValue`:** React Hook Form uses uncontrolled components; setting `value` breaks the pattern
- **Double registration:** Never use both `register()` and Controller on same field
- **Forgetting default values:** All fields MUST have defaultValues to prevent dirty state bugs
- **Passing undefined:** Use empty string or null, never undefined for cleared values

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form state management | Manual useState per field | react-hook-form useForm | Re-render optimization, validation integration |
| Schema validation | if/else validation chains | zod schemas | Type inference, composability, error messages |
| Form/schema bridge | Custom resolver logic | @hookform/resolvers | Already handles edge cases, async validation |
| Spinner animation | CSS keyframes | Tailwind animate-spin | Already in Tailwind, consistent timing |

**Key insight:** react-hook-form + zod handle 95% of form complexity. The effort is in proper integration, not reimplementation.

## Common Pitfalls

### Pitfall 1: isSubmitting Requires Promise Return
**What goes wrong:** Loading spinner never shows or always shows
**Why it happens:** react-hook-form sets isSubmitting=true only when onSubmit returns a Promise
**How to avoid:** Always return Promise from submit handler (async function automatically returns Promise)
**Warning signs:** Button never disables during save

```typescript
// WRONG - isSubmitting won't work
const onSubmit = (data) => {
  saveArticle(data);
};

// CORRECT - return the Promise
const onSubmit = async (data) => {
  await saveArticle(data);
};
```

### Pitfall 2: Controller + Controlled Component Double Updates
**What goes wrong:** Field value resets or duplicates
**Why it happens:** Custom component has internal state that conflicts with Controller
**How to avoid:** Remove internal value state from wrapped components when used with Controller, or ensure component is purely controlled
**Warning signs:** Value changes twice, value disappears after typing

### Pitfall 3: Validation Not Triggering on First Blur
**What goes wrong:** Error doesn't show until second blur
**Why it happens:** formState is a Proxy object; need to read errors before they update
**How to avoid:** Always destructure errors from formState: `{ errors } = formState`
**Warning signs:** Errors appear only after typing something then blurring again

### Pitfall 4: onBlur Conflict with Dropdown Blur Delay
**What goes wrong:** Dropdown selection fails because blur fires before click
**Why it happens:** Current ComboboxInput uses 150ms blur delay; Controller's onBlur conflicts
**How to avoid:** Only call Controller's onBlur after dropdown closes, not on input blur
**Warning signs:** Can't select dropdown options

### Pitfall 5: Mismatched Field Names
**What goes wrong:** Validation errors don't display for certain fields
**Why it happens:** Zod schema key doesn't match register/Controller name
**How to avoid:** Use TypeScript - z.infer<typeof schema> catches mismatches at compile time
**Warning signs:** Some fields validate, others silently pass

### Pitfall 6: Lost isDirty State After Navigation
**What goes wrong:** Unsaved changes warning doesn't trigger
**Why it happens:** Next.js App Router doesn't support routeChangeStart; only beforeunload works for external navigation
**How to avoid:** For internal navigation, need custom solution; for tab close, beforeunload works (already implemented)
**Warning signs:** Can navigate away without warning via Next.js links

## Code Examples

Verified patterns from official sources:

### Complete Form Setup with Zod
```typescript
// Source: https://github.com/react-hook-form/resolvers
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  content: z.string().min(1, 'Content is required'),
});

type FormData = z.infer<typeof schema>;

function ArticleForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      category: '',
      tags: [],
      content: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await saveArticle(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title with inline error */}
      <div>
        <input
          {...register('title')}
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <p role="alert" className="text-red-500 text-sm">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Custom component with Controller */}
      <Controller
        control={control}
        name="tags"
        render={({ field }) => (
          <TagInput
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
```

### Accessible Error Message Pattern
```typescript
// Source: https://react-hook-form.com/faqs (accessibility section)
<div className="relative">
  <label htmlFor="title" className="block text-sm font-medium">
    Title
  </label>
  <input
    id="title"
    {...register('title')}
    aria-invalid={errors.title ? 'true' : 'false'}
    aria-describedby={errors.title ? 'title-error' : undefined}
    className={`w-full px-3 py-2 border rounded-lg ${
      errors.title
        ? 'border-red-500 focus:border-red-500'
        : 'border-border focus:border-turfu-accent'
    }`}
  />
  {errors.title && (
    <p
      id="title-error"
      role="alert"
      className="mt-1 text-sm text-red-500"
    >
      {errors.title.message}
    </p>
  )}
</div>
```

### Keyboard Shortcut Hook
```typescript
// Custom hook for single save shortcut (no external dependency needed)
import { useEffect, useCallback } from 'react';

export function useSaveShortcut(onSave: () => void) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Cmd+S on Mac, Ctrl+S on Windows/Linux
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      onSave();
    }
  }, [onSave]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

// Usage in component
useSaveShortcut(() => handleSubmit(onSubmit)());
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual onChange handlers per field | react-hook-form register/Controller | Standard since 2020 | Fewer re-renders, cleaner code |
| Custom validation functions | Zod schemas with type inference | Mainstream since 2022 | Type safety, composability |
| Show all errors on submit | mode: 'onBlur' for inline validation | Always supported | Better UX, immediate feedback |
| Separate TypeScript types | z.infer from schema | Zod v3 (2021) | Single source of truth |

**Deprecated/outdated:**
- `yup` for validation: Still works but zod has better TypeScript inference
- Manual `errors` object construction: Use zodResolver instead
- `shouldUnregister: true` (old default): Now defaults to false, keeps values on unmount

## Open Questions

Things that couldn't be fully resolved:

1. **Internal Navigation Warning (FORM-06)**
   - What we know: beforeunload works for tab close/refresh; already implemented in useBeforeUnload
   - What's unclear: Next.js App Router removed router events, making internal navigation interception difficult
   - Recommendation: FORM-06 is partially satisfied by existing useBeforeUnload. For internal navigation, either: (a) accept limitation, (b) use experimental solutions, or (c) mark as future enhancement

2. **ComboboxInput/TagInput Controller Integration**
   - What we know: Controller passes onChange, onBlur, value; components need to be compatible
   - What's unclear: Current components update frontmatter directly via parent callback
   - Recommendation: Refactor to separate concerns - form manages values, parent syncs to frontmatter

## Sources

### Primary (HIGH confidence)
- [react-hook-form useForm docs](https://react-hook-form.com/docs/useform) - mode, formState, handleSubmit
- [react-hook-form Controller docs](https://react-hook-form.com/docs/usecontroller/controller) - custom input integration
- [react-hook-form FAQs](https://react-hook-form.com/faqs) - common issues, accessibility
- [@hookform/resolvers GitHub](https://github.com/react-hook-form/resolvers) - zod integration pattern
- [Zod documentation](https://zod.dev/) - schema definition, error customization

### Secondary (MEDIUM confidence)
- [MDN fieldset/legend](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset) - semantic form grouping
- [Lucide icons](https://lucide.dev/icons/loader) - Loader2 icon for spinner
- [TetraLogical fieldset/legend guide](https://tetralogical.com/blog/2025/01/31/foundations-fieldset-and-legend/) - accessibility patterns

### Tertiary (LOW confidence)
- [Medium: Next.js unsaved changes](https://medium.com/@jonjamesdesigns/how-to-handle-unsaved-page-changes-with-nextjs-app-router-65b74f1148de) - App Router limitations
- [Dev.to: react-hook-form + zod guide](https://dev.to/marufrahmanlive/react-hook-form-with-zod-complete-guide-for-2026-1em1) - general patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official documentation verified
- Architecture patterns: HIGH - Official examples and API docs
- Pitfalls: MEDIUM - Mix of official FAQs and community reports
- Navigation warning: LOW - Next.js App Router limitation, experimental solutions only

**Research date:** 2026-02-01
**Valid until:** 60 days (stable libraries, minimal API churn expected)
