# Peter G Memo — Correction of the typing of φ (§3.2/§3.3)

**Peter G · Technical memo — 13 sections · 23 March 2026**

Peter G's complete technical memo for the correction of the typing of the endomorphism in the BioSystems manuscript. 13 sections covering the diagnosis, the alternatives (coproduct vs product), the definitive formula, the proof adjustments, and the final recommendation.

---

## Summary

1. Where the problem lies
2. Why the product is preferable to the coproduct
3. The residual problem of the initial patch (Opus)
4. Recommended corrected endomorphism
5. Paragraph ready to insert (§3.2)
6. Local revisions §3.2
7. Local revisions §3.3(i)
8. Why endogeneity still holds
9. Table 1 update
10. Softening of abstract / conclusion
11. Conceptual alternative: S_org
12. Final recommendation
13. One-sentence formulation

---

## Executive Summary

> The product-based repair is the right direction, but the endomorphism must be defined so that the Rosen composite appears as a **component of φ**, not only in the prose — otherwise the typing is corrected by weakening the model rather than by correctly instantiating the original claim.
>
> — Peter G, one-sentence formulation

---

## 1. Where the problem lies

The manuscript does three things in sequence:

1. It recalls Rosen's maps: `f : A → B`, `Φ : B → Hom(A,B)`, `β : Hom(A,B) → B`
2. It defines in §3.2: `F(φ) = β ∘ Φ ∘ f : S → S`
3. In §3.3(i), it proves endogeneity by treating this composite as `S → S`

**The problem**: `β ∘ Φ ∘ f : A → B`, not `S → S`. The central map used to instantiate Definition 1 is not typed as the structure requires.

---

## 2. Why the product is preferable to the coproduct

The manuscript does not present S as an "either / or" sum of components. It presents the (M,R)-system as a **simultaneously organised whole** comprising substrates, products and repair structure. In **Set**, this is more naturally represented by a tuple-type state space:

```
H := Hom(A,B),  S := A × B × H
```

This gives canonical projections `π_A : S → A`, `π_B : S → B`, `π_H : S → H`.

---

## 3. The residual problem of the initial patch (Opus)

Opus's initial product proposal defines:

```
φ(a,b,h) = (a, f(a), Φ(f(a)))
```

Well-typed as `S → S`, but **β does not appear anywhere in the endomorphism**. If β is absent from φ, the typing is repaired but the interpretation is weakened: φ no longer models the full Rosen cycle (metabolism + repair + closure), only the first two.

> "You have solved the typing problem, but now the map you call self-production no longer contains the closure β that was central to the Rosenian motivation."

---

## 4. Recommended corrected endomorphism

```
φ(a,b,h) := (a, β(Φ(f(a))), Φ(f(a)))
```

**(a) Well-typed**: `f(a) ∈ B`, `Φ(f(a)) ∈ H`, `β(Φ(f(a))) ∈ B` → output in `A × B × H`. So `φ : S → S` is genuine.

**(b) P / Flux distinction**: A-coordinate unchanged: substrates come from ρ (flux), not from internal self-production. Consistent with the separation structural pattern / dynamic flux.

**(c) β in the model**: Recovery property: `π_B ∘ φ = β ∘ Φ ∘ f`. The Rosen composite is literally the B-component.

**(d) Readable for BioSystems**: Simple enough for an interdisciplinary theoretical-biology readership. Avoids the abstract machinery of induced maps on coproducts.

---

## 5. Paragraph ready to insert (§3.2)

*Drafted by Peter G — validated by Opus*

> A typing clarification is required at this point. In Rosen's formulation, the composite β ∘ Φ ∘ f has type A → B, whereas Definition 1 of a P-system requires an endomorphism φ : S → S on the total system object. To make the construction explicit in Set, let H := Hom(A,B) and define the system state object by S := A × B × H. Thus a state (a,b,h) ∈ S records, respectively, the current substrate configuration, the produced components, and the repair/closure capacity. We then define the self-production endomorphism by φ(a,b,h) := (a, β(Φ(f(a))), Φ(f(a))). This map is well-typed as an endomorphism S → S. Its first coordinate is left unchanged because the substrate supply belongs to the flux action ρ, not to the internal self-production cycle. Its B-component recovers the Rosen composite, π_B ∘ φ = β ∘ Φ ∘ f, while its H-component records the corresponding repair state. In this way, the Rosenian productive circularity is represented not as a bare map A → B, but as a well-typed endomorphism on the total system object.

---

## 6. Local revisions §3.2

Revision of the 4 bullets of §3.2:

- **F(S)** — The state object S := A × B × H, representing the substrate configuration, the produced components, and the repair/closure structure.
- **F(∂S)** — Operational closure in the sense of Varela (1979) — the cell membrane, formalised as the subobject of S mediating exchanges with E.
- **F(φ)** — The endomorphism φ(a,b,h) := (a, β(Φ(f(a))), Φ(f(a))), whose B-component recovers the Rosen composite β ∘ Φ ∘ f.
- **F(ρ)** — The metabolic flux. The action ρ : R × S → S represents the assimilation of substrates/resources, mediated by the membrane.

---

## 7. Local revisions §3.3(i)

The endogeneity proof must no longer simply say `φ = β ∘ Φ ∘ f`. It must say that the endomorphism `φ : S → S` is defined as above, and that its B-component recovers the Rosen composite.

> "Any factorisation of φ through E would in particular force the productive circularity encoded by β ∘ Φ ∘ f to be likewise externally mediated."

---

## 8. Why the endogeneity argument still holds

The existing argument is not affected. The central idea of §3.3 remains: two systems can share the same E and the same molecular sets while differing in their **organisational identity** (which metabolism/repair regime is active).

Under the corrected formula, the internal organisation is still carried by the 2nd and 3rd coordinates. The environment supplies resources and conditions, but not the organisational choice of the system. The argument that factorisation through E would require E to encode the organisational information it does not contain remains intact.

---

## 9. Table 1 update

The table must no longer say:

> "Causal closure: β ∘ Φ ∘ f does not factor through E"

Corrected formulation:

> **P-a** — φ endogenous (Def. 2): the induced endomorphism φ : S → S does not factor through E; its B-component recovers the Rosen cycle β ∘ Φ ∘ f.

---

## 10. Softening of abstract / conclusion

If the correction is made properly, the manuscript can probably still say that (M,R)-systems "constitute a model of ThP in Set". But to reduce reviewer friction, more cautious formulations:

- "Rosen's (M,R)-systems **admit a natural model** of ThP in Set."
- "We construct a Set-valued **instantiation** of ThP induced by Rosen's (M,R)-systems."

---

## 11. Conceptual alternative: S_org = B × H

Conceptually cleaner alternative: `S_org := B × H`, with the substrates A handled entirely by the flux ρ. Would better respect the self-production / flux distinction.

**Not recommended** for this version: would require a more substantial revision of §3.2–§3.3. For BioSystems, `S = A × B × H` is the best rigour / continuity balance.

---

## 12. Final recommendation

**Recommended repair**

```
S := A × B × Hom(A,B),  φ(a,b,h) := (a, β(Φ(f(a))), Φ(f(a)))
```

- Typing properly corrected
- More natural than the coproduct
- Self-production / flux separation
- β explicitly in φ
- Endogeneity unchanged
- Readable for BioSystems

**Do not keep** the formula `φ(a,b,h) = (a, f(a), Φ(f(a)))` unless the prose is revised to no longer say that φ represents the full Rosen cycle. Otherwise the typing is fixed by silently dropping β.

---

## 13. One-sentence formulation

> The product-based repair is the right direction, but the endomorphism must be defined so that the Rosen composite appears as a component of φ, not only in the prose; otherwise the typing problem is corrected by weakening the model rather than by correctly instantiating the original claim.
>
> — Peter G
