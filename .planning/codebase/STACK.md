# Technology Stack

**Analysis Date:** 2026-01-29

## Languages

**Primary:**
- TypeScript 5.6.0 - Full codebase including API routes, components, and configuration
- JavaScript - Configuration files (`next.config.js`, `postcss.config.js`)
- JSON - Message files for i18n and configuration

**Secondary:**
- CSS - Styling via Tailwind CSS utilities
- Markdown - Article content format with frontmatter

## Runtime

**Environment:**
- Node.js 20.0.0 (from @types/node)

**Package Manager:**
- npm (present lockfile: `package-lock.json`)

## Frameworks

**Core:**
- Next.js 14.2.15 - Server-side rendering, API routes, App Router
- React 18.3.1 - UI component library

**Internationalization:**
- next-intl 3.22.0 - Multi-language support (fr, en, tr)

**Styling:**
- Tailwind CSS 3.4.14 - Utility-first CSS framework
- PostCSS 8.4.47 - CSS processing with Autoprefixer

**Content & Markdown:**
- react-markdown 10.1.0 - Markdown rendering in React
- gray-matter 4.0.3 - YAML frontmatter parsing
- remark-gfm 4.0.1 - GitHub Flavored Markdown support
- rehype-slug 6.0.0 - Heading slugification
- rehype-autolink-headings 7.1.0 - Auto-linking headings
- reading-time 1.5.0 - Reading time calculation

**Animation:**
- framer-motion 11.0.0 - React animation library

**Icons:**
- lucide-react 0.460.0 - Icon component library

## Key Dependencies

**Critical:**
- @supabase/supabase-js 2.93.2 - Supabase database client and authentication
- bcryptjs 3.0.3 - Password hashing for admin authentication

**Infrastructure:**
- @types/react 18.3.0 - Type definitions for React
- @types/react-dom 18.3.0 - Type definitions for React DOM
- @types/bcryptjs 2.4.6 - Type definitions for bcryptjs
- autoprefixer 10.4.20 - PostCSS plugin for vendor prefixes

## Configuration

**Environment:**
- Configuration via `.env.local` file
- Required environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` - Supabase publishable key
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous client key
  - `SUPABASE_SERVICE_ROLE_KEY` - Supabase admin key (server-side only)
  - `ADMIN_PASSWORD_HASH_B64` - Base64-encoded bcrypt hash for admin password
  - `NEXT_PUBLIC_SITE_URL` - Public site URL

**Build:**
- TypeScript compilation with strict mode enabled (`tsconfig.json`)
- Path alias: `@/*` maps to `./src/*`
- Next.js configuration in `next.config.js` with:
  - next-intl plugin for i18n
  - Image optimization with AVIF and WebP formats
- ESLint configuration extends `next/core-web-vitals`
- Tailwind CSS with custom theme extensions in `tailwind.config.ts`

## Platform Requirements

**Development:**
- Node.js 20.0.0 or compatible
- npm for dependency management
- TypeScript 5.6.0 for type checking

**Production:**
- Vercel (deployment platform)
- Supabase database backend
- Next.js production build

---

*Stack analysis: 2026-01-29*
