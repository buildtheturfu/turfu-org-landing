# Phase 3: Back to Top - Context

**Gathered:** 2026-01-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Floating back-to-top button that appears after scrolling down and smooth-scrolls to page top. Must be accessible for screen readers.

</domain>

<decisions>
## Implementation Decisions

### Scope
- Button appears on **ALL pages of the site**, not just /content documentation
- Must be placed in a global layout (RootLayout or equivalent) rather than /content-specific layout

### Claude's Discretion
- **Icon:** Standard arrow-up icon (ChevronUp or ArrowUp from lucide-react)
- **Position:** Bottom-right corner, standard placement for back-to-top buttons
- **Size:** 44x44px minimum touch target (same as Phase 2 hamburger)
- **Trigger:** Appear after scrolling down ~300-500px (standard threshold)
- **Animation:** Fade in/out with smooth transitions
- **Scroll behavior:** Smooth scroll to top, standard duration
- **Styling:** Match existing site design (turfu-accent, rounded, subtle shadow)

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.

User explicitly delegated all visual/behavioral details to Claude's judgment.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-back-to-top*
*Context gathered: 2026-01-29*
