# Phase 16: Polish & Deploy - Context

**Gathered:** 2026-03-18
**Status:** Ready for planning
**Source:** Auto-generated from project context (autonomous mode)

<domain>
## Phase Boundary

Make the site production-ready: responsive audit + fixes, dark mode consistency, i18n completion (FR/EN/TR), Lighthouse performance optimization, and legacy cleanup. DNS pointing to turfu.org is NOT done in code — user handles it manually when ready.

</domain>

<decisions>
## Implementation Decisions

### Responsive audit (DEPLOY-01)
- Test all pages at 375px mobile, 768px tablet, 1440px desktop
- Fix any overflow, broken layouts, or unreadable text
- Key pages: home, /vision, /publications, /publications/[slug], /ecosystem, /ecosystem/[slug], /join, /research, /admin

### Dark mode audit (DEPLOY-02)
- Verify all pages in dark mode — no invisible text, no broken accent colors, no mismatched backgrounds
- All new pages from phases 13-15 need dark mode verification
- Fix any issues found

### i18n completion (DEPLOY-03)
- FR: primary locale, should be complete
- EN: translate all pages fully
- TR: can use FR as fallback for now, but all keys must exist
- Verify no missing translation keys cause runtime errors

### Performance (DEPLOY-04)
- Target Lighthouse mobile > 90 on home page and a publication article page
- Optimize: image loading, font loading, bundle size, unused CSS/JS
- Remove any dead code from old article system

### DNS (DEPLOY-05)
- Do NOT point DNS in code — user explicitly said "DNS seulement quand prêt FR/EN/TR"
- Just verify the Vercel deployment works correctly at the preview URL
- Document the DNS step for the user to execute manually

### Legacy cleanup
- Remove old article-related code if any remains (old API routes, types, components)
- Clean up unused imports, dead code
- Verify sitemap.xml and robots.txt are correct

### Claude's Discretion
- Which Lighthouse optimizations to prioritize
- Whether to lazy-load framer-motion animations
- How to handle TR translations (placeholder vs basic translation)

</decisions>

<canonical_refs>
## Canonical References

No external specs — requirements fully captured in decisions above and REQUIREMENTS.md (DEPLOY-01 through DEPLOY-05).

</canonical_refs>

<code_context>
## Existing Code Insights

### Key files to audit
- All page.tsx files in src/app/[locale]/ (home, vision, research, ecosystem, join, publications, admin)
- All section components in src/components/sections/
- All i18n files in src/messages/ (fr.json, en.json, tr.json)
- globals.css for dark mode variables
- tailwind.config.ts for responsive utilities

### Known issues
- TR locale uses FR placeholder text for vision page content
- Some ecosystem product descriptions may lack TR translations
- Old article API routes may still exist alongside publication routes

</code_context>

<specifics>
## Specific Ideas

- DNS turfu.org only when FR/EN/TR all complete and validated (per PROJECT.md constraint)
- Lighthouse > 90 mobile is the bar

</specifics>

<deferred>
## Deferred Ideas

None — this is the final phase of v3.0

</deferred>

---

*Phase: 16-polish-deploy*
*Context gathered: 2026-03-18 (autonomous mode)*
