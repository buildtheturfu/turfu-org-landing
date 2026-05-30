# Adversarial Review Pattern

> Concrete template for conducting multi-agent adversarial review of an academic manuscript before submission.

---

## The pattern in one paragraph

Before submitting to a peer-reviewed venue, subject the manuscript to **N adversarial reviews** by AI agents acting in distinct roles. Compare verdicts. Resolve disagreements through human adjudication. Integrate the strongest agreed-upon criticisms into the manuscript. Document the entire process publicly. When real reviewer reports arrive, the manuscript has already weathered the criticism a real reviewer would make — the response is largely pre-built.

---

## Why "adversarial" matters

A single AI agent reviewing its own collaborator's manuscript confirms biases. Multiple AI agents from different model families, each instructed to take a critical-reviewer stance, produce **structured disagreement**. That disagreement is where the real epistemic work happens.

The pattern depends on:
- Using at least 2 distinct model families (Claude, GPT, Gemini, Kimi — not just multiple Claudes)
- Explicit hostile-reviewer prompting (the model is told "find what is weak", not "summarise")
- Independent reviews (each agent does not see other agent outputs before forming its own verdict)

---

## Concrete protocol

### Step 0 — Manuscript is in stable v3 condition

The pattern is applied to a manuscript the human author already considers submission-grade. The adversarial pass is a *pre-flight check*, not a draft-improvement loop.

### Step 1 — Hostile reviewer pass (Peter G role)

A first AI agent is given the manuscript with the following prompt template:

```
You are an experienced peer reviewer for [target journal]. The author has
asked you to review this manuscript in hostile-reviewer mode before submission.

Your task:
1. Score the most likely outcome at submission to [journal] on a calibrated
   probability tree: desk reject / reject after review / major revision /
   minor / direct accept. Justify each probability with one sentence.
2. List the 5-10 most likely revision asks a real reviewer would make, ranked
   by probability. For each, estimate: probability of being asked, cost to
   fix, chance of satisfying a reviewer if implemented.
3. Recommend the winning response style.

Do not be polite. Do not summarise. Find what is weak.
```

Output: a structured memo. Examples in this pack:
- `papers/01-categorical-sketch-biosystems/reviews/peter-memo.md`
- `papers/02-relational-exit-srbs/strategic-documents/SRBS_R&R_SHADOW_PACKAGE_v3_1_2.md` (sections 0-1)

### Step 2 — Formal verifier pass (Opus role)

A second AI agent (preferably a different model family) verifies formal content:

```
You are a mathematician / formal verifier. Read [manuscript] and verify:
1. Every definition: is the type explicit, are the variables introduced?
2. Every proposition: is the proof complete, are there silent assumptions?
3. Every diagram or equation: is the notation consistent across sections?
4. Every cross-reference (Def. X, Prop. Y): does the target exist?

Output a line-by-line annotation with verdict per item: correct / unclear / wrong / undefined.
```

Output: line-by-line annotation. Example: `papers/01-categorical-sketch-biosystems/reviews/opus-review.md`.

### Step 3 — Independent secondary review (Gemini / Kimi role)

A third agent reads the manuscript fresh, without access to the outputs of Steps 1 and 2:

```
You are a peer reviewer for [target journal]. Read this manuscript and provide
a structured review covering:
1. Main contribution as you see it (one paragraph)
2. Three strongest aspects of the paper
3. Three biggest concerns (specific, not generic)
4. Recommendation (accept / minor / major / reject)
5. What the author should clarify if R&R'd
```

Output: independent review. Examples: `papers/01-categorical-sketch-biosystems/reviews/{gemini,kimi}-review.md`.

### Step 4 — Cross-AI dialogue (when reviewers disagree)

If Steps 1-3 disagree on a specific point (e.g., "is the cardinality argument valid?"), set up a dialogue:

```
Agent A says: [quote]
Agent B says: [quote]
Both, please respond to each other's point. Do not concede unless you find
the other's argument decisive.
```

Output: dialogue transcript. Example: `papers/01-categorical-sketch-biosystems/reviews/gpt-opus-discussion.md`.

### Step 5 — Human adjudication

The human author reads all reviews and:
- Identifies the points where ALL agents agree → these become "must-fix" before submission
- Identifies the points where MOST agree → "consider fixing"
- Identifies the points where ONE agent objects alone → adjudicate manually; the lone objection is often the most interesting catch OR a hallucination
- Documents the adjudication decisions

### Step 6 — Integration

The manuscript is revised. The next version (e.g., v3.1.1) is the result of the adversarial pass.

### Step 7 — Shadow package (optional but recommended)

The points where adversarial reviewers predicted real-reviewer asks but the manuscript chose NOT to pre-emptively change → these become the **shadow R&R package** (see `shadow-package-pattern.md`).

---

## Tooling

Each agent invocation can be done via:
- **Direct chat** in Claude.ai / ChatGPT / Gemini / Kimi consoles
- **API calls** for repeatable invocations (Anthropic, OpenAI, Google, Moonshot)
- **Multi-model orchestration** via tools like LangChain, OpenRouter, or the Claude Agent SDK

For this programme, most adversarial reviews were conducted interactively via console (Claude.ai, ChatGPT, Gemini) with the human author copy-pasting the manuscript into each model's context window.

---

## Cost discipline

Multi-agent adversarial review costs $0 to ~$50 in API fees depending on manuscript length and number of iterations. The pattern is **labour-time-bounded**, not cost-bounded.

Typical labour cost for one full adversarial pass:
- Step 1 (hostile reviewer): 30-60 min author time + 15 min model invocation
- Step 2 (formal verifier): 30-60 min author time + 15 min model invocation
- Step 3 (independent reviewers, x2): 30 min author time + 30 min model invocation
- Step 4 (dialogue, optional): 15-30 min
- Step 5 (adjudication): 1-3 hours (the longest phase)
- Step 6 (integration): 2-4 hours

Total: 5-10 hours per adversarial pass. Two to three passes per manuscript before submission.

---

## See also

- [`ai-agents-as-research-collaborators.md`](ai-agents-as-research-collaborators.md) — broader pattern context
- [`shadow-package-pattern.md`](shadow-package-pattern.md) — what to do with the predicted-but-not-pre-emptively-fixed asks
