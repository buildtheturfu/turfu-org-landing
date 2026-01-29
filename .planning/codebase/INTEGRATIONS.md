# External Integrations

**Analysis Date:** 2026-01-29

## APIs & External Services

**Analytics & SEO:**
- No external analytics service detected
- Built-in Next.js SEO metadata in `src/app/layout.tsx`
- Metadata configured with title and description

## Data Storage

**Databases:**
- Supabase (PostgreSQL-based)
  - Connection: Environment variables
  - Client: @supabase/supabase-js 2.93.2
  - Tables:
    - `articles` - Article content, metadata, and publication status
  - Key operations implemented in `src/lib/articles.ts`:
    - Full-text search with `textSearch()` websearch
    - Filtering by locale, publication status, slug
    - CRUD operations for articles (create, read, update, delete)
    - Category and tag aggregation

**File Storage:**
- Local filesystem only
- Markdown content stored in Supabase `articles.content` column
- No external file storage service (S3, etc.)

**Caching:**
- None detected
- Supabase query results not cached client-side
- Next.js default caching behavior for static pages

## Authentication & Identity

**Auth Provider:**
- Custom password-based authentication
  - Implementation in `src/lib/auth.ts`
  - Single admin user with bcrypt-hashed password
  - Password hash stored as base64-encoded string in `ADMIN_PASSWORD_HASH_B64` env variable
  - HTTP-only, secure, SameSite strict cookies
  - Cookie-based session (name: `turfu_admin_auth`)
  - Cookie TTL: 7 days
  - Supabase provides anonymous client access only (no user authentication)

**Protected Endpoints:**
- `/api/admin/login` - POST endpoint for password validation
- `/api/admin/logout` - POST endpoint for session termination
- `/api/admin/articles` - GET/POST with auth check
- `/api/admin/articles/[id]` - PUT/DELETE with auth check
- `/[locale]/admin/*` - Admin dashboard (client-side auth check)

## Monitoring & Observability

**Error Tracking:**
- None detected
- Console logging used for errors in development
- Error logging patterns in `src/lib/articles.ts` and `src/lib/supabase.ts`

**Logs:**
- Console-based error logging only
- No external log aggregation service

## CI/CD & Deployment

**Hosting:**
- Vercel
  - Project configuration in `.vercel/project.json`
  - Auto-deployment from git
  - Environment variables configured in Vercel dashboard

**CI Pipeline:**
- Not detected
- Likely automatic deployment via Vercel on push to main branch

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` - Public key for client
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anonymous client key for read operations
- `SUPABASE_SERVICE_ROLE_KEY` - Admin key for server-side write operations
- `ADMIN_PASSWORD_HASH_B64` - Base64-encoded bcrypt password hash
- `NEXT_PUBLIC_SITE_URL` - Public site URL (https://turfu-org-landing.vercel.app)

**Secrets location:**
- `.env.local` for local development (not committed)
- Vercel environment variables dashboard for production
- Note: Current `.env.local` contains actual credentials (should be removed from repo)

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- None detected

## Internationalization (i18n)

**Language Support:**
- French (fr) - default locale
- English (en)
- Turkish (tr)

**Implementation:**
- next-intl 3.22.0 for message translations
- Message files in `src/messages/`:
  - `src/messages/fr.json`
  - `src/messages/en.json`
  - `src/messages/tr.json`
- Configuration in `src/i18n.ts` with locale validation
- URL-based locale routing via `[locale]` dynamic segment

## Content Management

**Article Format:**
- Markdown with YAML frontmatter
- Frontmatter fields: title, description, category, tags, author
- Content parsing via gray-matter 4.0.3
- Markdown rendering via react-markdown with plugins:
  - GitHub Flavored Markdown (remark-gfm)
  - Heading slugs (rehype-slug)
  - Auto-linking headings (rehype-autolink-headings)
- Reading time calculation via reading-time 1.5.0

---

*Integration audit: 2026-01-29*
