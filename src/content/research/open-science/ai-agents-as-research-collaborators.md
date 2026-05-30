# AI Agents as Research Collaborators

> Pattern library for transdisciplinary academic research conducted with AI agents in 2026.

---

## Premise

Generative AI agents (Claude, GPT, Gemini, Kimi, etc.) released between 2024 and 2026 are capable of:

- Reading and summarising long academic texts (1M+ token contexts)
- Critiquing mathematical and conceptual arguments
- Generating prose suitable for academic publication after editorial revision
- Searching for and verifying citations
- Pre-built response packages anticipating reviewer demands

They are **not** capable of (in 2026):

- Generating genuinely novel mathematical proofs
- Substituting for domain expertise in a peer review
- Holding consistent intellectual responsibility for a body of work

The pattern documented here treats AI agents as **cognitive collaborators in specific roles**, under a single human author's editorial responsibility.

---

## The five collaborator roles

### 1. The Hostile Reviewer (Peter G role)

**Purpose**: anticipate the most likely R&R demands a real reviewer would make.

**Persona instructions**:
- Adopt the persona of a critical, well-read peer reviewer for the target journal
- Score the paper on a calibrated probability tree (desk reject / reject after review / major revision / minor / accept)
- Rank the most likely revision asks with probability, cost, and chance-of-satisfaction
- Recommend a winning response style (cooperative, "yes and we made it more explicit", not defensive)

**Output format**: a structured memo with the probability tree, a ranked list of likely revisions, and the meta-principles of response strategy. Example: `papers/02-relational-exit-srbs/strategic-documents/SRBS_R&R_SHADOW_PACKAGE_v3_1_2.md` and `papers/01-categorical-sketch-biosystems/reviews/peter-memo.md`.

### 2. The Formal Verifier (Claude Opus role)

**Purpose**: verify internal consistency, typing, definitions, and category-theoretic soundness.

**Persona instructions**:
- Read the formal sections (definitions, propositions, proofs) as if you were a mathematician
- Flag every typing error, undefined symbol, circular definition, or inconsistency
- Distinguish what is rigorously demonstrated from what is asserted

**Output format**: line-by-line annotation of the formal content with verdict (correct / unclear / inconsistent / undefined). Example: `papers/01-categorical-sketch-biosystems/reviews/opus-review.md`.

### 3. The Independent Secondary Reviewer (Gemini / Kimi role)

**Purpose**: cross-check the verdict of the Hostile Reviewer and Formal Verifier with an independent model trained on different data.

**Persona instructions**:
- Read the manuscript without access to other reviewer outputs
- Flag both what previous reviewers may have missed and where they may have over-corrected
- Specifically valuable for catching narrative incoherences and ideological signaling

**Output format**: independent review document. Examples: `papers/01-categorical-sketch-biosystems/reviews/gemini-review.md`, `papers/01-categorical-sketch-biosystems/reviews/kimi-review.md`.

### 4. The Cross-AI Dialogue (GPT × Opus discussions)

**Purpose**: surface disagreements between AI agents on contested points.

**Persona instructions**:
- Have two AI agents read each other's reviews and respond
- Look for cases where one model overrules another — these are signals of points where the human author must adjudicate

**Output format**: dialogue transcript. Example: `papers/01-categorical-sketch-biosystems/reviews/gpt-opus-discussion.md`.

### 5. The Prose Editor

**Purpose**: tighten, clarify, and align language with target-journal conventions.

**Persona instructions**:
- Read each paragraph with the question "what would a tired reviewer skim past?" — rewrite to make the structural argument unskippable
- Match the lexicon of the target journal (e.g., systems-science vocabulary for SRBS, biological-cybernetics vocabulary for BioSystems)

**Output format**: tracked changes in the manuscript. Examples: the v0.4.x manuscript revisions in Paper 1 (visible in `archive-all-versions/`).

---

## What human authors hold

In this pattern, the human author retains exclusive responsibility for:

| Decision | Why it cannot be delegated |
|---|---|
| Final wording of every published sentence | The author's signature attaches to the published text |
| Acceptance / rejection of each AI suggestion | AI agents have no track record to lose; the author does |
| Strategic submission timing and venue choice | Multi-agent reasoning cannot integrate career and field-positioning constraints |
| Response to reviewer comments at R&R | The author must defend the choices in their own voice |
| Disclosure of AI use | Editorial policies (Wiley 2024, Elsevier 2025, ICMJE 2024) require human disclosure |

---

## What this is NOT

- Not "AI-generated content" — every published sentence is reviewed and rewritten by the human author
- Not co-authorship — AI agents have no academic affiliation, no track record, no ability to defend their work at R&R
- Not a shortcut — this methodology is more labour-intensive than classical solo authorship, not less. The compensation is *qualité* and *traceability*, not *vitesse*.

---

## Disclosure language used in this programme

The following AI Use Declaration was included in both Paper 1 (BioSystems, published) and Paper 2 (SRBS, submitted):

> During the preparation of this work, the author used AI-assisted tools (Claude Opus, GPT, Gemini) to support manuscript organization, language editing of selected passages, and clarity checks. After using these tools, the author reviewed, edited, and verified the content of the manuscript, including all argumentation, citations, historical claims, and final wording. The AI tools were used under settings intended to preserve the author's rights over the submitted material and not to grant providers rights to train on the manuscript content. The author takes full responsibility for the content of the article.

This language was reviewed and accepted by the BioSystems editorial board (Elsevier) prior to publication.

---

## Inviting reuse

This pattern is offered to the academic community as a template. Adaptation guidelines:

- **For mathematics-heavy fields**: emphasise the Formal Verifier role; use 2+ independent models
- **For empirical-quantitative fields**: emphasise the Independent Secondary Reviewer with code execution capability
- **For philosophy-history fields**: emphasise the Hostile Reviewer and Cross-AI Dialogue; less reliance on Formal Verifier
- **For interdisciplinary work** (this programme's profile): use all five roles

Always preserve:
1. Single human editorial responsibility
2. Disclosure of AI use in the published manuscript
3. Public availability of the AI-collaboration artifacts (this pack pattern)

---

## See also

- [`adversarial-review-pattern.md`](adversarial-review-pattern.md) — concrete adversarial review template
- [`shadow-package-pattern.md`](shadow-package-pattern.md) — pre-built response package methodology
- [`transdisciplinary-framework.md`](transdisciplinary-framework.md) — TURFU A.R.T. framework
