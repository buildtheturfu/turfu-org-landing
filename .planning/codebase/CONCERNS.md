# Codebase Concerns

**Analysis Date:** 2026-01-29

## Security Considerations

**Exposed Supabase Credentials in .env.local:**
- Risk: Supabase anon and service role keys are committed in `.env.local` or at minimum are visible in the codebase
- Files: `/home/ekitcho/dev/turfu-org-landing/.env.local`
- Current mitigation: Keys are in `.env.local` which should be ignored, but the keys themselves are exposed in the file
- Recommendations:
  - Rotate the exposed Supabase keys immediately
  - Add `.env.local` to `.gitignore` permanently
  - Use separate environment variables for development vs production
  - Document that credentials must never be committed
  - Consider using Vercel environment variables for production

**Password Hash Security:**
- Risk: Admin password hash is stored in base64 encoding in environment variable, not truly securing the hash itself
- Files: `/home/ekitcho/dev/turfu-org-landing/src/lib/auth.ts`, `/home/ekitcho/dev/turfu-org-landing/.env.local`
- Current mitigation: Uses bcryptjs for comparison, base64 encoding as workaround for shell interpretation
- Recommendations:
  - Transition to environment variable secrets management (Vercel Secrets, GitHub Secrets)
  - Document the generation process more clearly in code
  - Consider using Next.js built-in secret management if available

**Missing Input Validation:**
- Risk: API endpoints accept JSON without validating structure before processing
- Files:
  - `/home/ekitcho/dev/turfu-org-landing/src/app/api/admin/login/route.ts` line 5: directly destructures `password` without validation
  - `/home/ekitcho/dev/turfu-org-landing/src/app/api/admin/articles/route.ts` line 28: destructures `rawContent`, `locale`, `published` without validation
  - `/home/ekitcho/dev/turfu-org-landing/src/app/api/admin/articles/[id]/route.ts` line 11: same pattern
- Current mitigation: Basic title validation in article creation (line 34 checks `!frontmatter.title`)
- Recommendations:
  - Add schema validation using libraries like Zod or io-ts
  - Validate all user inputs before database operations
  - Validate locale values against allowed locales (fr, en, tr)
  - Add size limits for article content
  - Validate slug format after generation

**Cookie Authentication Single-String Check:**
- Risk: Authentication is just comparing cookie value to string 'authenticated', no cryptographic validation
- Files: `/home/ekitcho/dev/turfu-org-landing/src/lib/auth.ts` line 19, `/home/ekitcho/dev/turfu-org-landing/src/app/api/admin/articles/route.ts` line 6
- Current mitigation: Cookie is httpOnly and secure flag set appropriately in login route
- Recommendations:
  - Consider adding session tokens with expiration tracking
  - Add request signing or CSRF protection
  - Log authentication attempts for security monitoring

## Tech Debt

**Multiple Admin Client Instantiations:**
- Issue: `createAdminClient()` is called 9 times across `/home/ekitcho/dev/turfu-org-landing/src/lib/articles.ts` - once per function
- Files: `/home/ekitcho/dev/turfu-org-landing/src/lib/articles.ts` lines 10, 42, 64, 83, 102, 167, 183, 200, 214
- Impact: Inefficient - creates redundant client instances, increases initialization overhead on every database call
- Fix approach: Export singleton admin client from `supabase.ts` or use connection pooling, cache the client at module level

**Type Safety with `Record<string, any>`:**
- Issue: Loose typing allows unvalidated data to flow through system
- Files:
  - `/home/ekitcho/dev/turfu-org-landing/src/lib/articles.ts` line 135: `frontmatter: Record<string, any>`
  - `/home/ekitcho/dev/turfu-org-landing/src/app/api/admin/articles/[id]/route.ts` line 14: `updates: Record<string, any>`
- Impact: Makes refactoring and maintenance harder, reduces IDE autocomplete, allows invalid data
- Fix approach:
  - Create proper TypeScript interfaces for frontmatter structure
  - Use ParsedFrontmatter interface already defined in types.ts for frontmatter
  - Validate parsed data against interfaces

**Manual Frontmatter Parsing in ArticleEditor:**
- Issue: Ad-hoc regex parsing of YAML-like frontmatter in client component
- Files: `/home/ekitcho/dev/turfu-org-landing/src/components/admin/ArticleEditor.tsx` lines 66-87
- Impact: Fragile parsing, doesn't handle edge cases (escaped quotes, complex YAML), likely to break with valid YAML
- Fix approach:
  - Use a YAML parsing library on client-side for preview
  - Move frontmatter parsing to shared utility function
  - Reuse gray-matter parser consistently everywhere

**Large Component Files:**
- Issue: AdminDashboard is 307 lines, Architecture component is 411 lines
- Files:
  - `/home/ekitcho/dev/turfu-org-landing/src/components/admin/AdminDashboard.tsx`
  - `/home/ekitcho/dev/turfu-org-landing/src/components/sections/Architecture.tsx`
- Impact: Hard to test, harder to reason about, difficult to extract reusable logic
- Fix approach:
  - Break AdminDashboard into ArticleList, ArticleListItem, FilterBar sub-components
  - Extract article operations (fetch, delete, edit) into custom hook

**Error Handling with Generic console.error:**
- Issue: Errors logged to console without context or structured logging
- Files:
  - `/home/ekitcho/dev/turfu-org-landing/src/lib/articles.ts` lines 20, 53, 113
  - `/home/ekitcho/dev/turfu-org-landing/src/lib/supabase.ts` line 17
  - `/home/ekitcho/dev/turfu-org-landing/src/lib/auth.ts` line 25
  - `/home/ekitcho/dev/turfu-org-landing/src/app/api/admin/articles/route.ts` lines 17, 56
- Impact: Production errors not tracked, makes debugging difficult, no alerting possible
- Fix approach:
  - Implement centralized error logging/reporting (Sentry, LogRocket)
  - Sanitize error messages before sending to client (don't leak database details)
  - Add structured logging with context (userId, timestamp, operation)

**Promise Without Catch in Component:**
- Issue: `fetchArticles()` called in AdminDashboard without explicit error handling path in some flows
- Files: `/home/ekitcho/dev/turfu-org-landing/src/components/admin/AdminDashboard.tsx` line 75 (in handleDelete callback)
- Impact: Silent failures when deletion completes but list refresh fails
- Fix approach: Add explicit error handling around fetchArticles calls

## Test Coverage Gaps

**No Automated Tests:**
- What's not tested: All API routes, utility functions, components
- Files: No test files exist in project
- Risk:
  - Article CRUD operations untested - could silently break
  - Authentication logic untested - could allow unauthorized access
  - Markdown parsing untested - could render dangerous content
  - UI state changes untested - regressions undetected
- Priority: High - authentication and data mutation operations should have tests

**Admin Dashboard Refetch Logic:**
- What's not tested: The article fetching, editing, and deletion flows
- Files: `/home/ekitcho/dev/turfu-org-landing/src/components/admin/AdminDashboard.tsx`
- Risk: Manual refetch after delete could fail silently, showing stale data
- Priority: High - affects data integrity perception

**Markdown Rendering Security:**
- What's not tested: XSS prevention in markdown rendering, dangerous HTML injection
- Files: `/home/ekitcho/dev/turfu-org-landing/src/components/content/MarkdownRenderer.tsx`
- Risk: While react-markdown is safe by default, untested custom rendering could have issues
- Priority: Medium - depends on library security

## Performance Bottlenecks

**Admin Client Creation in Data Layer:**
- Problem: Each article query creates new Supabase client instance
- Files: `/home/ekitcho/dev/turfu-org-landing/src/lib/articles.ts`
- Cause: No client caching, creates 9+ unnecessary client instances per admin action
- Improvement path:
  - Cache client at module level
  - Implement connection pooling if supported by Supabase SDK
  - Measure impact with performance profiling

**No Caching Strategy:**
- Problem: Every page view queries database, no caching layer
- Files: `/home/ekitcho/dev/turfu-org-landing/src/lib/articles.ts` (getArticles, getArticle functions)
- Cause: Direct database queries on every request
- Improvement path:
  - Add Redis or similar cache layer (can use Vercel KV)
  - Cache public article list with appropriate TTL
  - Implement cache invalidation on article updates
  - Use Next.js revalidation for static/ISR articles

**Dynamic Page Generation:**
- Problem: Article detail pages force dynamic rendering with `export const dynamic = 'force-dynamic'`
- Files: `/home/ekitcho/dev/turfu-org-landing/src/app/[locale]/content/[slug]/page.tsx` line 9
- Cause: Makes every request hit database, no static caching
- Improvement path:
  - Use incremental static regeneration (ISR) instead
  - Or use static generation with revalidate period
  - Cache article list separately

## Fragile Areas

**Admin Middleware/Route Protection:**
- Files: `/home/ekitcho/dev/turfu-org-landing/src/app/[locale]/admin/page.tsx`
- Why fragile: Relies on cookie check at page render time, but API routes have separate checks
- Safe modification:
  - Ensure all admin API routes call isAuthenticated() first (currently done)
  - Consider middleware-level protection for entire /admin path
  - Add integration tests for auth flows

**Slug Generation and Uniqueness:**
- Files: `/home/ekitcho/dev/turfu-org-landing/src/lib/articles.ts` lines 145-151
- Why fragile: Slug generation is deterministic but title changes create duplicate detection only in database (line 57 in route.ts checks for 23505 error)
- Safe modification:
  - Document that slug is auto-generated from title
  - Add database constraint for unique (locale, slug) pair
  - Handle slug collision in UI gracefully with suggestion to modify title

**Locale Validation:**
- Files: Locale values passed through URL params, but limited validation
- Why fragile: No validation that locale is one of supported values (fr, en, tr) before querying database
- Safe modification:
  - Add locale validation in middleware or at page level
  - Use TypeScript const for supported locales: `const SUPPORTED_LOCALES = ['fr', 'en', 'tr'] as const`
  - Reject unsupported locales with 404

**Frontmatter Parsing Edge Cases:**
- Files: `/home/ekitcho/dev/turfu-org-landing/src/components/admin/ArticleEditor.tsx` lines 66-87
- Why fragile: Manual string parsing breaks with:
  - Quotes in values (e.g., `title: "It's a title"` - single quote in string)
  - Multiline values
  - Colons in values
  - Arrays with special characters
- Safe modification:
  - Replace with YAML.parse() library
  - Add validation that frontmatter structure matches ParsedFrontmatter interface
  - Show parsing errors to user in editor

## Scaling Limits

**Single Password Admin Authentication:**
- Current capacity: 1 admin user (single password)
- Limit: Cannot support multiple admins with audit trail
- Scaling path:
  - Implement user accounts table with proper authentication
  - Add multi-admin support with role-based access
  - Implement audit logging for content changes
  - Consider OAuth integration (GitHub, Google)

**Database Queries on Every Request:**
- Current capacity: Low traffic only without caching
- Limit: Database will become bottleneck quickly
- Scaling path:
  - Implement caching layer (Redis/Vercel KV)
  - Use ISR for static content
  - Add database query batching where possible
  - Consider read replicas for high traffic

**Client-side Admin Panel File Size:**
- Issue: AdminDashboard is large client component
- Scaling path: Break into smaller components, consider server-side admin panel

## Known Issues

**Article Edit Flow Inefficiency:**
- Symptoms: Editing an article requires fetching all locale articles to find the one being edited
- Files: `/home/ekitcho/dev/turfu-org-landing/src/components/admin/AdminDashboard.tsx` lines 82-86
- Trigger: Click edit on article from dashboard
- Workaround: Works but fetches unnecessary data
- Fix: Create specific API endpoint to fetch single article with content for editing

**Silent Failures in Article Operations:**
- Symptoms: If fetch fails after delete, UI still removes item but database might not have deleted it
- Files: `/home/ekitcho/dev/turfu-org-landing/src/components/admin/AdminDashboard.tsx` line 75
- Trigger: Delete article when fetchArticles fails
- Workaround: Refresh page manually
- Fix: Don't optimistically remove article, wait for fetch confirmation before removing from UI

**Missing 404 Handling for Articles:**
- Symptoms: 404 page shown but could happen for valid slug in wrong locale
- Files: `/home/ekitcho/dev/turfu-org-landing/src/app/[locale]/content/[slug]/page.tsx` line 25
- Trigger: Visit article with slug from different locale
- Workaround: None - design issue
- Fix: Could show "Not found in this language, try another language" with links

---

*Concerns audit: 2026-01-29*
