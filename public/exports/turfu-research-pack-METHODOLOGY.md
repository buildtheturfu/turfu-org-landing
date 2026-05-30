# Methodology — TURFU Open Science with AI Research Collaborators

> *Exemplary case study of how transdisciplinary research can be conducted openly, with AI agents as cognitive collaborators, with integral traceability of every iteration, every review, every strategic decision — under a single human author's editorial responsibility.*

---

## The thesis

Academic research conducted in 2026 with the assistance of generative AI agents is not "AI-generated content" pretending to be human work. It is **a new mode of cognitive collaboration** in which:

1. The human author retains full editorial and intellectual responsibility,
2. AI agents serve as **adversarial reviewers, formal verification assistants, prose editors, and historical sourcing accelerators**,
3. The full trace of the collaboration is made available, not hidden,
4. The methodology produces results that pass peer review under the same epistemic standards as classical academic work — *and* expose their own production process for inspection.

This pack demonstrates that mode in practice across two academic publications conducted between January and May 2026.

---

## The five pattern primitives

### 1. The integral history pattern

Every version of every manuscript is preserved. The pack `archive-all-versions/` directories contain manuscript revisions from `v0.1` through `v3.1.2` (Paper 2) and `v3` through `v0.4.13` (Paper 1).

**Why this matters**: in classical academic publishing, only the published version survives in the historical record. Intermediate revisions, response letters, and strategic memos are private. Here they are public from the outset. A reader can reconstruct every step of the argument's evolution.

### 2. The adversarial review pattern (multiple AI agents + Peter G)

Before submission to a peer-reviewed venue, every paper is subjected to **adversarial review by multiple AI agents acting in distinct roles**:

| Agent role | Function | Output trace |
|---|---|---|
| **Peter G** | Hostile-reviewer simulation. Anticipates the most likely R&R demands a real reviewer would make. | `B1_ADVERSARIAL_REVIEW.md`, `peter-memo` (Paper 1), Shadow R&R Package |
| **Claude Opus** | Formal verification: typing, definitions, internal consistency, category-theoretic soundness. | `opus-review.md`, `opus-review-b1.md` |
| **GPT (5 / Opus)** | Cross-checking, prose editing, structural critique. Sometimes in discussion with Claude. | `gpt-review.md`, `gpt-opus-discussion.md`, `gpt-synthese.md` |
| **Gemini** | Independent secondary review. | `gemini-review.md` |
| **Kimi** | Independent secondary review (long-context analysis). | `kimi-review.md` |

The adversarial pattern is documented as a reusable template in `methodology/adversarial-review-pattern.md`.

### 3. The shadow package pattern

Before reviewer reports arrive, a **pre-built response package** is constructed based on the adversarial reviews. When real reviewer reports land 60-90 days later, the response is deployed in days, not weeks.

This pattern is exemplified in `papers/02-relational-exit-srbs/strategic-documents/SRBS_R&R_SHADOW_PACKAGE_v3_1_2.md` — 7 pre-built modules covering ~80% of the most-likely revision asks, each with precise patches, response letter snippets, and cost/risk estimates.

Documented in `methodology/shadow-package-pattern.md`.

### 4. The transdisciplinary frame (TURFU A.R.T.)

All research is conducted within the **TURFU A.R.T. framework**: Action / Research / T (where T = Tiers, the included middle in the sense of Lupasco-Nicolescu transdisciplinarity). Knowledge is produced at the traversal of levels of reality (biological, ecological, political, normative), not by reduction.

This is why Paper 1 (BioSystems) and Paper 2 (SRBS) share a common formal core (the *viability sketch* / structural conditions of viability) while addressing different levels of reality — they are coordinated by structural pattern, not by topic.

Documented in `methodology/transdisciplinary-framework.md`.

### 5. The single-author editorial responsibility

All AI collaboration is conducted under the responsibility of a single human author (Christopher Keo, TURFU). The author makes every final decision on:
- which suggested revisions to accept,
- which formulations to preserve,
- which AI suggestions to override.

AI agents are **collaborators, not co-authors**. The published byline (Paper 1, BioSystems) and submitted byline (Paper 2, SRBS) are single-author. The AI Use Declarations in each manuscript disclose the assistance explicitly, in conformity with current editorial policies (Wiley, Elsevier, ICMJE).

---

## Why this is exemplary for Open Science 2026

| Open Science criterion | How this pack satisfies it |
|---|---|
| **Reproducibility** | Every version, every response letter, every cover letter, every figure source — preserved. Anyone can reconstruct the path. |
| **Transparency** | The adversarial reviews and the strategic memos that shaped each revision are exposed. The author's reasoning is not a black box. |
| **AI disclosure** | Manuscripts include AI Use Declarations conforming to Wiley/Elsevier/ICMJE 2025 guidance. This pack adds the *artifacts* of AI collaboration: the full reviews, not just an abstract claim. |
| **Cumulative knowledge** | Paper 2 explicitly extends Paper 1's published formalism. The cross-paper structural continuity is documented in `strategic-documents/B1_LEVERAGE_FROM_BIOSYSTEMS.md`. |
| **Re-publication** | This pack is designed to be re-deployable on `turfu.org` or any other platform without dependency on the NLAW source repo. `DEPLOYMENT_GUIDE.md` lists the patterns. |

---

## Limits and honesty

This methodology is not a universal solution. Three honest limitations:

1. **It requires a competent human author**: AI agents amplify what is already there. They do not produce original mathematical or philosophical insight ex nihilo. The author must hold the editorial line.
2. **It requires multiple AI models, not just one**: a single AI agent risks confirming the author's biases. The adversarial-multi-agent pattern is what produces actual error-finding.
3. **It is bounded by current model capabilities**: in 2026, Claude Opus 4.7 (1M context) and peers are capable of substantial formal critique but not of fully novel mathematical proof. The pattern will mature as model capabilities mature.

---

## See also

- [`methodology/ai-agents-as-research-collaborators.md`](methodology/ai-agents-as-research-collaborators.md) — long-form pattern documentation
- [`methodology/adversarial-review-pattern.md`](methodology/adversarial-review-pattern.md) — the multi-agent review template
- [`methodology/shadow-package-pattern.md`](methodology/shadow-package-pattern.md) — the pre-built R&R response template
- [`methodology/transdisciplinary-framework.md`](methodology/transdisciplinary-framework.md) — TURFU A.R.T. framework
