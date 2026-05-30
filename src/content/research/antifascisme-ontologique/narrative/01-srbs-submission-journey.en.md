# B1 — SRBS Submission Journey

*Tracking page for the B1 version (systemic mask for Systems Research and Behavioral Science) — academic bifurcation and pre-submission iterations.*

---

## Current State

The page renders the most recent version of the B1 paper (status, date, abstract, PDF/DOCX downloads) from the metadata of the `antifascisme-ontologique` paper (`data/papers/antifascisme-ontologique.json :: versions`). The component filters versions whose label starts with `B1` and sorts them chronologically.

---

## Academic bifurcation

Section describing the B1 bifurcation point — when the monolithic "ontological antifascism" paper was refactored into three parallel versions:

- **A** — militant French foundation paper (original NLEX)
- **B1** — systemic mask for SRBS (Systems Research and Behavioral Science)
- **B2** — philosophical mask (future target)

For the B1 version specifically, the bifurcation work consisted in:

- Transforming the title to "*Relational Exit as a Structural Condition of Viability in Multi-Level Cooperative Systems*"
- Removing the term "ontological antifascism" entirely from the title and body
- Replacing libertarian vocabulary (NAP, property, secession) with neutral equivalents ("protected space", "boundary integrity", "non-aggression" as *design principles*)
- Reducing crypto-native references (Moloch DAO, Steem → Hive) to a sober mention in the discussion
- Shifting the framing from "what makes totalitarianism possible?" to "what structural conditions must a cooperative system satisfy in order to remain viable?"

The summary of the bifurcation point and the associated feedback (Peter G, Ek, Claude Opus 4, and several Claude Code adversarial reviewers) is rendered from the JSON metadata.

---

## Pre-submission iterations

The full timeline of B1 iterations (vB1 → B1 v2 → B1 v3 → B1 v3.1 …) is rendered from the `versions` field of the source JSON. For each iteration, the page exposes:

- Version, date, status
- Summary of changes
- Detailed changelog (type, what, why)
- Feedback received during the iteration (source, kind, summary)
- Downloads (PDF, DOCX submission-ready)

The most recent iteration is marked LATEST and its changelog is open by default.

---

## PDF embed

The page includes an inline PDF viewer pointing to the most recent submission-ready version of the manuscript. The embedded PDF is always synchronised with the latest upload in `/public/papers/`.

---

*This page is primarily data-driven: the narrative is rendered dynamically from `data/papers/antifascisme-ontologique.json`. For the full iteration content — each named feedback, each changelog entry, each download — refer to that source. The page's role is to present chronologically and legibly the paper's evolution from bifurcation to submission-ready.*
