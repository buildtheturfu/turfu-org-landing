# Phase 15: Admin Panel Rebuild - Research

**Researched:** 2026-03-18
**Domain:** Admin CRUD UI, MDX live preview, react-hook-form structured forms
**Confidence:** HIGH

## Summary

Phase 15 replaces the v2 articles-based admin panel with a publications-focused admin panel. The existing codebase provides a strong foundation: API routes for publications CRUD already exist (`/api/admin/publications`), a Zod schema validates publication data, and reusable input components (`ComboboxInput`, `TagInput`, `SaveIndicator`) are ready. The old `AdminDashboard` manages articles via a table layout and renders `ArticleEditor` inline -- the new dashboard will follow the same pattern but for publications with status filtering (draft/published/archived).

The main technical challenge is MDX live preview. The existing `renderMDX` function uses `compileMDX` from `next-mdx-remote/rsc` which is server-only (RSC). For client-side live preview, we must call an API endpoint that runs `renderMDX` server-side and returns the rendered HTML. This is the recommended approach -- it reuses the exact same rendering pipeline as production, ensuring WYSIWYG fidelity.

**Primary recommendation:** Build a new `PublicationDashboard` and `PublicationEditor` as client components. Use react-hook-form + Zod for structured fields. Implement MDX preview via a `/api/admin/preview` API route that calls `renderMDX` server-side and returns HTML, debounced on the client.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Publication Dashboard replaces AdminDashboard -- list all publications with title, status, discipline, date
- Filter by status: draft / published / archived
- Actions per publication: edit, delete, toggle status
- "New publication" button at top
- Keep admin route at /admin (existing auth guard)
- Publication Editor replaces ArticleEditor -- structured form fields (title, abstract, discipline, tags, type, layer, status, featured_image, locale)
- MDX body editor with live preview (side-by-side or toggle)
- Use react-hook-form + Zod validation (already in project)
- Preview renders MDX using same renderMDX function from lib/mdx.ts
- Save to Supabase publications table via existing /api/admin/publications routes
- Edit mode: load existing publication data into form
- Create mode: blank form
- Keep existing cookie-based auth exactly as-is (ADMIN-04)
- Login page at /admin/login -- no changes
- Auth guard in admin/page.tsx -- no changes
- Delete old ArticleEditor.tsx

### Claude's Discretion
- Whether to delete old admin components or rework them
- MDX preview layout (side-by-side vs toggle)
- Table vs card layout for dashboard
- Whether to use existing ComboboxInput for discipline/layer selects
- Auto-save behavior

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ADMIN-01 | Publication editor with structured form fields (title, abstract, discipline, tags, type, status, featured_image) | Existing `publicationSchema` Zod schema covers all fields. react-hook-form + @hookform/resolvers already in package.json. ComboboxInput and TagInput components reusable for discipline/type/tags. |
| ADMIN-02 | MDX body editor with live preview | Use API route `/api/admin/preview` calling `renderMDX` server-side. Client debounces input and fetches rendered HTML. Textarea for MDX input (not WYSIWYG -- explicitly out of scope). |
| ADMIN-03 | Publication list/management (create, edit, delete, draft/published toggle) | Existing API routes: GET/POST on `/api/admin/publications`, GET/PUT/DELETE on `/api/admin/publications/[id]`. `getAdminPublications()` returns all statuses. |
| ADMIN-04 | Existing auth system preserved and working | Auth is cookie-based (`turfu_admin_auth`). Admin page checks cookie server-side and redirects. API routes check `isAuthenticated()`. No changes needed. |
</phase_requirements>

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-hook-form | ^7.71.1 | Form state management | Already in package.json, used in ArticleEditor |
| @hookform/resolvers | ^5.2.2 | Zod resolver for RHF | Already in package.json |
| zod | ^3.25.76 | Schema validation | Already in package.json, publicationSchema exists |
| next-mdx-remote | ^6.0.0 | MDX compilation (server-side preview) | Already in package.json, used in renderMDX |
| lucide-react | ^0.460.0 | Icons | Already in package.json, used across admin |

### Supporting (already installed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-markdown | ^10.1.0 | Fallback markdown preview | Not needed -- use API-based MDX preview instead for full fidelity |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| API-based MDX preview | react-markdown client-side | react-markdown cannot render custom MDX components (QuoteBlock, InfoBox, etc.) -- loses fidelity |
| Plain textarea for MDX | CodeMirror/Monaco editor | Out of scope per REQUIREMENTS.md ("Full WYSIWYG/block editor anti-feature") |

**Installation:** No new packages needed. Everything is already installed.

## Architecture Patterns

### Recommended Component Structure
```
src/components/admin/
  PublicationDashboard.tsx   # NEW - replaces AdminDashboard for publications
  PublicationEditor.tsx      # NEW - structured form + MDX body editor
  MDXPreview.tsx             # NEW - client component that fetches/renders preview HTML
  ComboboxInput.tsx          # KEEP - reuse for discipline, type selects
  TagInput.tsx               # KEEP - reuse for tags
  SaveIndicator.tsx          # KEEP - reuse for save status
  ArticleEditor.tsx          # DELETE
  AdminDashboard.tsx         # DELETE (replaced by PublicationDashboard)

src/app/api/admin/
  preview/route.ts           # NEW - MDX preview endpoint
```

### Pattern 1: Structured Form with Separate MDX Body
**What:** Instead of the old approach (raw markdown with frontmatter parsing), use discrete form fields for metadata and a separate textarea for MDX body content.
**When to use:** Always -- this is the core change from ArticleEditor to PublicationEditor.
**Example:**
```typescript
// PublicationEditor form structure
const { register, control, handleSubmit, formState } = useForm<PublicationFormData>({
  resolver: zodResolver(publicationSchema),
  defaultValues: {
    title: '',
    abstract: '',
    body: '',
    discipline: '',
    type: undefined,
    layer: undefined,
    tags: [],
    locale: 'fr',
    status: 'draft',
    featured_image: '',
  },
});
```

### Pattern 2: API-Based MDX Preview
**What:** Client component sends MDX source to a server API route, which calls `renderMDX` and returns HTML. Client renders via `dangerouslySetInnerHTML`.
**When to use:** For the live preview panel.
**Example:**
```typescript
// src/app/api/admin/preview/route.ts
import { isAuthenticated } from '@/lib/auth';
import { renderMDX } from '@/lib/mdx';

export async function POST(request: Request) {
  if (!isAuthenticated()) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { source } = await request.json();
  // renderMDX returns a React element -- need to serialize
  // Alternative: use compileMDX directly and serialize to HTML
  // See pitfall below about React element serialization
}
```

### Pattern 3: Dashboard with Status Filtering
**What:** Fetch all publications via `GET /api/admin/publications`, filter client-side by status tab.
**When to use:** Publication dashboard list view.
**Example:**
```typescript
const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
const filtered = publications.filter(p => statusFilter === 'all' || p.status === statusFilter);
```

### Anti-Patterns to Avoid
- **Frontmatter-based editing:** The old ArticleEditor parsed frontmatter from raw content. The new editor uses structured form fields -- never reconstruct frontmatter.
- **Client-side MDX compilation:** `compileMDX` from next-mdx-remote/rsc is server-only. Do not attempt to import it in a client component.
- **Modifying auth system:** ADMIN-04 explicitly requires the auth system stays unchanged. Do not touch `/admin/login`, `lib/auth.ts`, or the auth guard in `admin/page.tsx`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form validation | Custom validation logic | react-hook-form + Zod + publicationSchema | Already exists, handles edge cases |
| Dropdown with search | Custom select component | ComboboxInput (existing) | WAI-ARIA compliant, tested |
| Tag management | Custom tag input | TagInput (existing) | Autocomplete, keyboard nav, accessible |
| Save status indicator | Custom dirty tracking | SaveIndicator (existing) | Already styled, matches design |
| Unsaved changes warning | Custom beforeunload | useBeforeUnload hook (existing) | Already in `src/hooks/` |
| Keyboard save shortcut | Custom key handler | useSaveShortcut hook (existing) | Already in `src/hooks/` |

**Key insight:** The v2 admin built excellent reusable components. The rebuild is mostly about restructuring how data flows (structured fields instead of frontmatter), not rebuilding UI primitives.

## Common Pitfalls

### Pitfall 1: MDX Preview Serialization
**What goes wrong:** `renderMDX` returns a React element (JSX), not an HTML string. You cannot JSON-serialize a React element to send via API.
**Why it happens:** `compileMDX` from next-mdx-remote/rsc returns `{ content: ReactElement }`.
**How to avoid:** Use `renderToStaticMarkup` from `react-dom/server` in the API route to convert the React element to an HTML string, then return it. On the client, render with `dangerouslySetInnerHTML`. Alternatively, create a separate preview compilation that outputs HTML.
**Warning signs:** API route returns empty or `{}` for preview content.

### Pitfall 2: Debouncing Preview Requests
**What goes wrong:** Every keystroke in the MDX body triggers an API call, overwhelming the server.
**Why it happens:** No debounce on the preview fetch.
**How to avoid:** Debounce the preview API call (300-500ms). Use `useDeferredValue` for the body text and trigger preview fetch only when deferred value changes. Show a "loading" or "stale" indicator while preview is updating.
**Warning signs:** Slow typing, excessive network requests in DevTools.

### Pitfall 3: Publication Schema Mismatch Between Form and API
**What goes wrong:** The form sends data that doesn't match what the API/Supabase expects.
**Why it happens:** The existing `publicationSchema` expects `body` (MDX content) but the form might name it differently, or optional fields might send empty strings instead of null.
**How to avoid:** Use the existing `publicationSchema` for form validation. The `createPublication` function already normalizes empty strings to null. Ensure the form's field names match the schema exactly.
**Warning signs:** Supabase insert errors about unexpected column values.

### Pitfall 4: Admin Page Import Change
**What goes wrong:** Forgetting to update `admin/page.tsx` to import `PublicationDashboard` instead of `AdminDashboard`.
**Why it happens:** The admin page server component imports and renders the dashboard.
**How to avoid:** Update the import in `src/app/[locale]/admin/page.tsx` as part of the dashboard task.
**Warning signs:** Old articles-based dashboard still showing after rebuild.

### Pitfall 5: Layer Field Type
**What goes wrong:** Layer is a number (0, 1, 2) in the schema but HTML select values are strings.
**Why it happens:** HTML form elements always produce string values.
**How to avoid:** Use `valueAsNumber` in register options, or transform in the Zod schema with `z.coerce.number()`, or convert manually before submission.
**Warning signs:** Zod validation error on layer field.

## Code Examples

### Reusing Existing Components
```typescript
// ComboboxInput for discipline select
<ComboboxInput
  id="discipline"
  label="Discipline"
  value={discipline}
  options={['urbanisme', 'economie', 'technologie', 'philosophie', 'design']}
  onChange={(val) => setValue('discipline', val)}
  placeholder="Select discipline"
/>

// TagInput for tags
<TagInput
  id="tags"
  label="Tags"
  value={tags}
  suggestions={existingTags}
  onChange={(newTags) => setValue('tags', newTags)}
  placeholder="Add tags..."
/>
```

### MDX Preview API Route
```typescript
// src/app/api/admin/preview/route.ts
import { isAuthenticated } from '@/lib/auth';
import { compileMDX } from 'next-mdx-remote/rsc';
import { renderToStaticMarkup } from 'react-dom/server';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { mdxComponents } from '@/components/publications/MDXComponents';

export async function POST(request: Request) {
  if (!isAuthenticated()) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { source } = await request.json();
  if (!source || typeof source !== 'string') {
    return Response.json({ html: '' });
  }

  try {
    const { content } = await compileMDX({
      source,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      },
      components: mdxComponents,
    });
    const html = renderToStaticMarkup(content);
    return Response.json({ html });
  } catch {
    return Response.json({ html: '<p class="text-red-400">MDX syntax error</p>' });
  }
}
```

### Debounced Preview Client Component
```typescript
// MDXPreview.tsx
'use client';
import { useState, useEffect, useDeferredValue } from 'react';

export function MDXPreview({ source }: { source: string }) {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const deferredSource = useDeferredValue(source);

  useEffect(() => {
    if (!deferredSource.trim()) {
      setHtml('');
      return;
    }
    setLoading(true);
    const controller = new AbortController();

    fetch('/api/admin/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: deferredSource }),
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(data => setHtml(data.html))
      .catch(() => {}) // aborted
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [deferredSource]);

  return (
    <div
      className="prose-turfu"
      style={{ opacity: loading ? 0.7 : 1 }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

### Publication Form Data Flow
```typescript
// Save handler
const onSubmit = async (data: PublicationFormData) => {
  const url = editingId
    ? `/api/admin/publications/${editingId}`
    : '/api/admin/publications';
  const method = editingId ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Save failed');
  // Return to dashboard
};
```

## State of the Art

| Old Approach (v2) | Current Approach (v3) | Impact |
|---|---|---|
| Raw markdown with frontmatter parsing | Structured form fields + separate MDX body | No more fragile regex parsing; Zod validates all fields |
| Articles model (published: boolean) | Publications model (status: draft/published/archived) | Three-state lifecycle instead of binary |
| MarkdownRenderer (react-markdown) client preview | API-based MDX preview via compileMDX | Full MDX component support in preview (QuoteBlock, InfoBox, etc.) |
| Single textarea for everything | Metadata fieldset + body textarea | Clear separation of concerns |

## Open Questions

1. **renderToStaticMarkup with RSC components**
   - What we know: `compileMDX` from next-mdx-remote/rsc returns a React element. `renderToStaticMarkup` should serialize it.
   - What's unclear: Whether there are edge cases with RSC-specific elements in `renderToStaticMarkup` context.
   - Recommendation: Test in the preview API route early. If it fails, fallback to using `react-markdown` for preview (loses custom MDX components but still functional).

2. **Side-by-side vs toggle preview**
   - What we know: The old ArticleEditor uses toggle (show/hide). Side-by-side is more common in editors.
   - Recommendation: Use side-by-side on desktop (>1024px), auto-collapse to toggle on narrow viewports. The admin is single-user on desktop, so side-by-side is the better default.

## Sources

### Primary (HIGH confidence)
- Codebase analysis: `src/components/admin/*`, `src/app/api/admin/publications/*`, `src/lib/publications.ts`, `src/lib/mdx.ts`, `src/lib/schemas/publication.ts`, `src/lib/types.ts`
- `package.json` for dependency verification

### Secondary (MEDIUM confidence)
- `renderToStaticMarkup` approach for MDX preview -- standard React pattern but untested with next-mdx-remote RSC output in this codebase

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all dependencies already installed and verified in package.json
- Architecture: HIGH - follows existing codebase patterns, clear path from old to new
- Pitfalls: HIGH - identified from reading existing code and understanding the MDX server/client boundary
- MDX Preview API approach: MEDIUM - renderToStaticMarkup with compileMDX output needs validation

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (stable domain, no fast-moving dependencies)
