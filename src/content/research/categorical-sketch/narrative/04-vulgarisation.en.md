# Category theory, autopoiesis and viability — a reader's guide

*Understanding the concepts behind the categorical sketch ThP — TURFu, March 2026*

---

## Why mathematics?

When we say that an organism is "alive", that an ecosystem is "healthy", or that a society is "viable", we use words that seem clear but are in fact vague. What exactly makes a system alive? What structural property must a system have in order to maintain itself?

Theoretical biology has been working on these questions for decades. Humberto Maturana and Francisco Varela proposed the concept of **autopoiesis** (from the Greek auto = self, poiesis = production): a system is alive if it produces itself through its own operations. Robert Rosen formalised this idea in terms of **efficient causal closure**: in an organism, the cause of each component is another component of the same system.

The problem: these descriptions often remain verbal. They are profound but difficult to verify formally. How can we know whether a given system is "autopoietic" or not? How can we compare the viability of an organism with that of an ecosystem or a society, without falling into mere metaphor?

This is where **category theory** comes in.

---

## Category theory in 5 minutes

Category theory is not just one branch of mathematics among others. It is a **language** — a notational system that allows us to describe structures independently of their specific content.

Its basic concepts are remarkably simple:

**Objects** — the "things" we talk about (a cell, an organism, a State, a network node).

**Morphisms** (arrows) — the "relations" between these things (an inclusion, an interaction, a transformation). A morphism f : A → B says "there exists a structured relation from A to B".

**Composition** — if f : A → B and g : B → C, then g ∘ f : A → C. Relations compose. That is all.

The power of this language is its **abstraction**: the same diagram can describe a cell → tissue relation, a citizen → State, or a node → network. We say nothing about the "nature" of the objects — we describe the **structure** of their relations.

John Baez and Mike Stay showed in 2011 that physics, logic and computer science are three models of the same categorical structure. The sketch ThP (Keo, 2026) applies the same strategy: define an abstract structure of viability, then show that biology, ecology and politics are independent models of it.

---

## Autopoiesis in categorical language

In the sketch ThP, a **P-system** is defined by three elements:

**S** — an object (the system).
**M** — its membrane (its boundary with the environment).
**φ** — its self-production function.

The viability condition is that φ remains **endogenous**: the self-production function does not "factor" through the environment E. In simple terms: the system produces itself, it is not produced by something external.

When φ factors through E — when an external agent takes control of the system's production — the system is said to have become **heteronomous**. It no longer produces itself. It is captured.

This is the formal translation of what Varela called "autonomy" and of what Rosen called "efficient causal closure". The sketch gives these concepts a precise, verifiable mathematical form that is portable from one domain to another.

---

## Admissible and non-admissible morphisms

Not all interactions between systems are equivalent. The sketch distinguishes two types:

An **admissible morphism** is an interaction that preserves the endogeneity of φ. The system interacts with the other, but it continues to produce itself. The interaction may be asymmetric (a small system interacts with a large one), but it does not destroy the participant's autonomy.

A **non-admissible morphism** is an interaction that destroys endogeneity. The system interacts with the other, and in the process loses its capacity to produce itself. It becomes heteronomous — captured, controlled, subjugated.

The distinction is not between "good" and "bad". It is between **viable** and **pathological**. A non-admissible morphism can be distributed (competition and alternatives exist — the system can escape) or monopolistic (no competition, no exit — the system is trapped).

---

## Distributed vs monopolistic predation — the heart of the sketch

This is the most important contribution of the sketch ThP.

**Distributed predation** (Definition 7): a non-admissible interaction, but for which both a competitor (g : A' → B) and an exit morphism (e : B → C) exist. The system is diminished but not trapped. It can change partner or leave. The stress is tolerable — hormetic, Taleb would say.

**Monopolistic predation** (Definition 8): a non-admissible interaction without competitor AND without exit. The system is trapped in a relation that destroys its autonomy, without alternative and without possibility of escape.

The viability thesis: **a P-system is viable if and only if every predation it undergoes is distributed**. Life is not the absence of predation — life is distributed predation.

And pathology is not the existence of the predator — it is the absence of the **third**: the competitor, the alternative, the exit morphism. Ternary structure, not binary. This is Lupasco's included third translated into categorical language.

---

## Multi-level compatibility (Proposition 2)

Real systems are not flat — they are **hierarchical**. Cells in tissues, tissues in organs, individuals in societies, nodes in protocols.

Proposition 2 of ThP extends the viability condition to multi-level systems: a hierarchical system is viable if and only if the **inclusions between levels** are admissible morphisms.

In simple terms: when a subsystem (a cell, a citizen, a node) is included in a system at a higher level (a tissue, a State, a network), this inclusion must preserve the subsystem's endogeneity and maintain the existence of an exit morphism.

When the inclusion ceases to be admissible — when the higher level destroys the autonomy of the lower level and removes its possibility of exit — the system enters a pathological regime.

This is what the literature on the **major transitions in evolution** (Maynard Smith & Szathmáry, 1995) describes in the language of biology: each leap of individuality (from gene to cell, from cell to organism, from organism to group) required the invention of conflict-mediation mechanisms — apoptosis, differentiation, division of labour, internal policing. ThP formalises what these authors describe in a domain-specific way.

---

## The "Rosetta Stone" strategy

The sketch ThP follows the strategy of Baez & Stay (2011): rather than building direct bridges between heterogeneous domains (which would entail ontological commitments: "cells are like citizens"), one defines an **abstract theory** and verifies that each domain instantiates it independently.

If biology satisfies the definitions of the sketch, and politics independently satisfies the same definitions, then the parallel between cancer and totalitarianism is not an analogy — it is the joint satisfaction of the same formal invariant.

The advantage: one can object "cells are not citizens" — but this is irrelevant, because the definitions are **domain-agnostic**. What matters is: does the system satisfy the formal conditions or not?

This is what distinguishes the sketch from a mere interdisciplinary metaphor. The metaphor says "totalitarianism resembles cancer". The sketch says: "here are formal conditions of non-viability; here is a proof that cancer satisfies them; here is an independent proof that totalitarianism satisfies them".

---

## What the sketch does not (yet) say

The sketch is honest about its limits:

**What is proven**: the definitions are well-formed, Rosen's (M,R)-systems are a model of the sketch in the category Set, the distributed/monopolistic distinction is formally established.

**What is instantiated**: biological cancer as a case of monopolistic predation, supported by the empirical literature (Aktipis, Trigos, Michod).

**What is proposed**: the extension to politics and ecology. Supported by robust historical and ecological regularities, but the rigorous construction of a "category of social agents" remains an open project.

**What is programmatic**: the convergence between viability principles and a libertarian grammar of the right to exit. Strong but not closed — requires additional normative assumptions not yet formalised.

This epistemic transparency — knowing exactly what is proven and what is not — is perhaps the most important methodological contribution of the sketch.

---

*This text is an accessible introduction to the ideas developed in the categorical-sketch manuscript (Keo, 2026). For a formal presentation and its methodological limits, refer to the full versions.*
