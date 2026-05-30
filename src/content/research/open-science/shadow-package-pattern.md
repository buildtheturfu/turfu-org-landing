# Shadow Package Pattern

> Pre-build the response to reviewer comments BEFORE the reviewer comments arrive. Deploy in days, not weeks, when the real R&R lands.

---

## The pattern in one paragraph

After submission to a peer-reviewed venue, the manuscript enters a 60-90 day waiting period. Most authors do nothing during this time. **The shadow package pattern uses this period to build a pre-emptive R&R response**, anticipating the most likely reviewer demands based on the adversarial review (see `adversarial-review-pattern.md`). When real reviewer reports arrive, the author deploys a subset of pre-built modules within days, with response-letter text already drafted.

---

## Why this works

Three observations from academic publishing:

1. **Most R&R asks are predictable.** A competent adversarial reviewer (human or AI) can anticipate ~70-80% of the asks a real reviewer will make. The unpredictable 20-30% are novel objections, but the predictable part can be pre-built.

2. **R&R turnaround time signals engagement.** A response submitted in 2 weeks signals "the author cared and worked hard." A response submitted in 8 weeks signals "the author scrambled." Editors and reviewers notice.

3. **Cold authoring is sharper than hot authoring.** Writing R&R responses three months after submission is mentally fresh and strategic. Writing them three weeks after submission (when adversarial review is still fresh) is contextually sharp and structurally tight.

---

## Concrete protocol

### Step 0 — Adversarial review has been conducted (see `adversarial-review-pattern.md`)

The shadow package presumes the adversarial review identified the most likely revision asks ranked by probability.

### Step 1 — Module identification

For each adversarial-predicted ask with probability ≥ 60%, build a "module" in the shadow package. Each module addresses ONE revision ask.

Example modules from `papers/02-relational-exit-srbs/strategic-documents/SRBS_R&R_SHADOW_PACKAGE_v3_1_2.md`:

| Module | Predicted ask | Probability |
|---|---|---:|
| A | "structural realization" → "candidate" outside biology | 80-90% |
| B | Worked Reichsfluchtsteuer mapping in framework primitives | 65-80% |
| C | Normative neutrality + 4-completion parity | 70-85% |
| D | Empirical status as "hypothesis-generating, not confirmatory" | 85-95% |
| E | Boundary conditions of in situ exit | 80-90% |
| F | "Diagnostic, not theorematic" moved earlier in paper | 90% |

### Step 2 — Module structure

Each module contains:

1. **Predicted reviewer concern** (in adversarial reviewer's voice — "the reviewer will say X")
2. **Strategy** (what to concede, what to defend)
3. **Patches** (file:line + verbatim before/after for each manuscript edit)
4. **Response letter snippet** (paste-ready text for the cover letter portion of the R&R)
5. **Cost / risk / chance-of-satisfaction** estimates

### Step 3 — Deployment scenarios

A "scenarios" section maps reviewer profiles to which modules to deploy:

| Reviewer profile | Modules deployed | Note |
|---|---|---|
| Constructive systems-friendly | A + B + C + D + F | 5 modules, ~2 weeks of R&R work |
| Hostile formalist | A + B (1 case only) + F | Bound the formal claims |
| Ideological objector | C in priority, with A + D | Cover letter must emphasise 4-completion parity |
| Empiricist | D in priority, + B | Re-frame cases as plausibility probes |
| Methodological systems-friendly | F + E | Minor modules suffice |

### Step 4 — Generic response letter skeleton

The package includes a paste-ready response letter template:

```
Date: [date of R&R submission]
Re: SRES-XX-XXXX — [manuscript title]

Dear Editor,

We thank the editor and the reviewers for the careful and constructive
engagement with our manuscript. The reviewers' comments have led to
substantive improvements that we believe strengthen the paper without
altering its core thesis. We respond to each comment below, with revisions
indicated by section and line number against the resubmitted manuscript.

== Reviewer 1 ==

R1.1 [reviewer's comment paraphrased]
[Response — copy from Module X]
[Specific revision location: "Revised in §4 opening (line 71); see Module A patches."]

[etc.]

We are grateful to the reviewers for their work and to the editor for the
opportunity to revise.

Sincerely,
[Author]
```

### Step 5 — On reviewer reports receipt

When the real R&R lands:
1. Match each reviewer ask to a pre-built module
2. For unmatched asks, draft new module quickly (typically 1-3 unmatched per round)
3. Deploy matched modules verbatim or with minor adjustment
4. Compose cover letter from skeleton + module snippets
5. Submit within 2-3 weeks

---

## Why most authors do NOT do this

1. **Sunk-cost optimism**: after submission, the author wants to disengage from the manuscript ("I'm done, let me wait")
2. **Adversarial review not done**: without a structured prediction of likely asks, there is no input to the shadow package
3. **Cultural inertia**: "you respond to what the reviewer actually says, not what you predict"

The third point has merit. The shadow package pattern is NOT about pre-committing to changes that haven't been asked. It's about **having drafts ready** so deployment is fast IF the prediction matches.

---

## What if the prediction misses?

The unpredicted 20-30% of asks are handled by classical R&R drafting in real-time. The pre-built 70-80% accelerates the response delivery, which gives the author bandwidth to focus on the unpredicted novel asks.

In the worst case (none of the predicted asks come up, all asks are novel), the shadow package is wasted labour ~10-20 hours. In the best case (most predicted asks come up), the deployment time drops from 6-8 weeks to 2-3 weeks.

Expected value clearly positive given the asymmetry.

---

## Example: SRBS Shadow Package v3.1.2

The full pre-built shadow package for Paper 2 (relational exit, SRBS submission 2026-05-29) is available at:

`papers/02-relational-exit-srbs/strategic-documents/SRBS_R&R_SHADOW_PACKAGE_v3_1_2.md`

It contains 7 modules (A-G), 5 deployment scenarios, a generic response letter skeleton, and an estimated post-R&R acceptance probability conversion.

The shadow package was built on 2026-05-30 (day after submission) based on the Peter G hostile-reviewer audit. Real reviewer reports are expected ~60-90 days later. The post-deployment outcome will be recorded on `turfu.org/recherche/relational-exit/srbs-journey` once known.

---

## See also

- [`adversarial-review-pattern.md`](adversarial-review-pattern.md) — input to the shadow package
- [`ai-agents-as-research-collaborators.md`](ai-agents-as-research-collaborators.md) — broader methodology
