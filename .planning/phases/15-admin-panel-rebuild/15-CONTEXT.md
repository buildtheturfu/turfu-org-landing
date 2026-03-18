# Phase 15: Admin Panel Rebuild - Context

**Gathered:** 2026-03-18
**Status:** Ready for planning
**Source:** Auto-generated from project context (autonomous mode)

<domain>
## Phase Boundary

Rebuild the admin panel to manage publications (not articles). Replace the current Obsidian-like ArticleEditor with a structured form editor for publications. Keep the existing auth system (cookie-based login/logout) unchanged. The admin panel is for a single admin — no multi-user features needed.

</domain>

<decisions>
## Implementation Decisions

### Publication Dashboard (replaces AdminDashboard)
- List all publications with title, status, discipline, date
- Filter by status: draft / published / archived
- Actions per publication: edit, delete, toggle status
- "New publication" button at top
- Reuse GridLayout or simple table layout — admin doesn't need the public design system
- Keep admin route at /admin (existing auth guard)

### Publication Editor (replaces ArticleEditor)
- Structured form fields: title, abstract, discipline, tags, type, layer, status, featured_image, locale
- MDX body editor with live preview (side-by-side or toggle)
- Use react-hook-form + Zod validation (already in the project from v2)
- Preview renders MDX using the same renderMDX function from lib/mdx.ts
- Save to Supabase publications table via existing /api/admin/publications routes
- Edit mode: load existing publication data into form
- Create mode: blank form

### Auth system
- Keep existing cookie-based auth exactly as-is (ADMIN-04)
- Login page at /admin/login — no changes
- Auth guard in admin/page.tsx — no changes

### Old admin components
- Delete old ArticleEditor.tsx (articles CRUD is v2, publications replace it)
- Delete or keep AdminDashboard.tsx — Claude's discretion (can rework in place)
- Keep ComboboxInput.tsx, TagInput.tsx, SaveIndicator.tsx if useful for the new editor

### Claude's Discretion
- Whether to delete old admin components or rework them
- MDX preview layout (side-by-side vs toggle)
- Table vs card layout for dashboard
- Whether to use existing ComboboxInput for discipline/layer selects
- Auto-save behavior

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing admin code
- `src/components/admin/AdminDashboard.tsx` — Current dashboard (articles-based, to be replaced/reworked)
- `src/components/admin/ArticleEditor.tsx` — Current editor (Obsidian-like, to be replaced)
- `src/components/admin/ComboboxInput.tsx` — Reusable combobox input
- `src/components/admin/TagInput.tsx` — Reusable tag input
- `src/components/admin/SaveIndicator.tsx` — Save status indicator
- `src/app/[locale]/admin/page.tsx` — Admin page with auth guard
- `src/app/[locale]/admin/login/page.tsx` — Login page

### Publications API
- `src/app/api/admin/publications/route.ts` — Publications CRUD API (GET list, POST create)
- `src/app/api/admin/publications/[id]/route.ts` — Single publication API (GET, PUT, DELETE)
- `src/lib/publications.ts` — Publication queries and types

### MDX rendering
- `src/lib/mdx.ts` — renderMDX function for live preview
- `src/components/publications/MDXComponents.tsx` — Custom MDX components

### Requirements
- `.planning/REQUIREMENTS.md` — ADMIN-01 through ADMIN-04 acceptance criteria

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ComboboxInput` — dropdown with search, usable for discipline/layer/type selects
- `TagInput` — tag input with autocomplete, reusable for publication tags
- `SaveIndicator` — save status display
- `renderMDX` from lib/mdx.ts — server-side MDX compilation for live preview
- react-hook-form + Zod already in package.json from v2

### Established Patterns
- Admin auth: cookie-based, getAuthCookieName(), redirect to /admin/login
- API routes: /api/admin/publications for CRUD
- Client components for admin (forms, interactions)

### Integration Points
- Publications table in Supabase (created in Phase 10)
- /api/admin/publications routes (created in Phase 10)
- MDX rendering pipeline (Phase 10)

</code_context>

<specifics>
## Specific Ideas

- PROJECT.md says "Admin panel full rebuild — current Obsidian-like module doesn't match journal direction"
- Single admin user — no multi-user complexity
- Medium/journal style editor, not a markdown-first editor

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 15-admin-panel-rebuild*
*Context gathered: 2026-03-18 (autonomous mode)*
