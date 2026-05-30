# Shadow Package SRBS R&R — B1 v3.1.2

**Manuscrit** : "Relational Exit as a Structural Condition of Viability in Multi-Level Cooperative Systems"
**Soumis** : 2026-05-29 (Wiley UUID `e1903d9e-3037-4974-980e-c06eab660067`)
**Source** : Audit Peter G pré-review (2026-05-30) — anticipation des révisions probables
**Statut** : modules prêts à déployer dès réception des reviewer reports (~ +60-90 j attendus)

---

## 0. Probability tree — Peter G calibré

| Issue SRBS | Prob | Lecture stratégique |
|---|---:|---|
| Desk reject | 15-25 % | si éditeur juge le politique trop spéculatif pour SRBS |
| Reject après review | 25-35 % | si reviewer hostile sur transposition biologie→politique |
| **Major revision (scénario principal)** | **35-50 %** | au moins un reviewer systems-friendly |
| Minor / direct accept | 5-10 % | peu probable vu l'ambition |

**Taux de conversion conditionnels** :
- Major revision constructive → acceptation finale : **55-70 %**
- Major revision hostile mais détaillée : **35-50 %**
- Reviewer idéologique : **20-35 %** (sauf si AE + autre reviewer compensent)

**Estimation pré-review d'acceptation finale** : **25-35 %**.

---

## 1. Méta-principes de réponse (Peter G)

1. **Style coopératif obligatoire** : "We thank the reviewer for identifying an important ambiguity. We have revised..." → JAMAIS "no, you didn't understand, it's already in the text."
2. **Accepter partiellement sans abandonner le cœur** : adoucir le vocabulaire, garder la structure formelle.
3. **Cover letter de R&R** : reformuler les concessions comme renforcements, pas reculs.
4. **Ne pas déployer plus de modules que demandés** : chaque correction supplémentaire = risque de régression locale.

---

## Module A — Adoucissement terminologique : "structural realization" → "candidate"

### Prédiction reviewer (~80-90 % de probabilité de demande)

> "If the social category is not yet constructed, why call the political/ecological cases 'realizations' and not 'illustrations'? The biological case has a direct (M,R)-systems formalization; the others do not."

### Stratégie

Adoucir hors biologie. Garder "instantiated biologically" pour cancer (le plus solide formellement), passer politique + écologie en "candidate structural realizations" ou "domain-level readings".

### Patches précis (file:line dans B1_SRBS_v3_1_2_BLIND.docx ↔ .md)

**A.1 — Abstract (ligne 11)**
- **Avant** : "Cancer, political totalitarianism, and ecological invasion on captive habitat are presented as three independent structural realizations of the same pattern at different levels of reality."
- **Après** : "Cancer, political totalitarianism, and ecological invasion on captive habitat are presented as one biological instantiation and two candidate structural realizations of the same diagnostic pattern at different levels of reality."

**A.2 — §1.4 méthodologie (ligne 31)**
- **Avant** : "**Proposed for the political and ecological levels:** totalitarianism and ecological invasion as independent structural realizations of the same pattern."
- **Après** : "**Proposed for the political and ecological levels:** totalitarianism and ecological invasion as candidate structural realizations of the same diagnostic pattern, pending construction of rigorous domain-specific categories."

**A.3 — §4 ouverture (ligne 71)**
- **Avant** : "We present three paradigmatic cases as independent *structural realizations* of the same pattern—not as analogies between heterogeneous empirical objects..."
- **Après** : "We present three paradigmatic cases — one biological instantiation (cancer, formally grounded via Rosen's (M,R)-systems in the companion paper) and two candidate structural realizations (totalitarianism, ecological invasion) — of the same diagnostic pattern, not as analogies between heterogeneous empirical objects..."

**A.4 — §4.4 (ligne 99)**
- **Avant** : "These three cases are not loose analogies. They are three independent structural realizations of a shared pattern..."
- **Après** : "These three cases are not loose analogies. They are one biological instantiation and two candidate structural realizations of a shared pattern..."

**A.5 — §6.2 (ligne 187)**
- **Avant** : "Finally, the paper's three structural realizations differ in their current level of formal rigour."
- **Après** : "Finally, the paper's three cases differ markedly in their current level of formal rigour — which is why we distinguish the biological instantiation from the two candidate structural realizations."

**A.6 — §7 Conclusion (ligne 203)**
- **Avant** : "(3) Cancer, totalitarianism, and ecological invasion are three independent structural realizations of this pattern under their own domain-specific primitives."
- **Après** : "(3) Cancer offers a biological instantiation of this pattern, with totalitarianism and ecological invasion as candidate structural realizations under their respective domain-specific primitives, pending future formalization."

**A.7 — §7 Conclusion (ligne 205)**
- **Avant** : "But the core is real, the structural realizations are coherent, and the direction is clear."
- **Après** : "But the core is real, the biological instantiation is direct, the candidate realizations are coherent, and the direction is clear."

### Response letter (snippet R&R)

> We thank Reviewer [N] for identifying an important asymmetry in our terminology. The biological case (cancer) is formally grounded via Rosen's (M,R)-systems in the companion paper, whereas the political and ecological cases are not yet supported by an explicit functor between domain-specific categories. We have therefore revised the terminology throughout: "instantiated biologically" is retained for cancer, while "candidate structural realizations" is used for the political and ecological cases. This preserves the structural argument while marking the asymmetry of formal grounding the reviewer rightly emphasizes (see revised abstract, §1.4, §4 opening, §4.4, §6.2, §7).

### Coût / risque

- **Coût édition** : faible (7 micro-patches)
- **Danger** : moyen — la cohérence avec §2.1 (definitional vs empirical claim) doit être préservée
- **Chance de satisfaire** : 80-90 %

---

## Module B — Mapping travaillé Reichsfluchtsteuer (S, ∂S, φ, f, e)

### Prédiction reviewer (~70-80 % de probabilité)

> "The Reichsfluchtsteuer paragraph is excellent historical sourcing, but where exactly are S, ∂S, φ, f, e? The framework's primitives are stated abstractly but never instantiated on a social case."

### Stratégie

UN seul mapping détaillé (Reichsfluchtsteuer = le mieux sourcé). Les autres cas restent en "analogous domain readings" non formalisées. Ne PAS faire les trois cas — surformalisation = nouvelle prise pour l'attaque "where is the category of social agents?"

### Patch précis — encadré à insérer après §4.2 (ligne 87, juste après le paragraphe Reichsfluchtsteuer)

**Nouveau bloc à insérer (~400 mots)** :

```markdown
**A worked social mapping: the Reichsfluchtsteuer in the framework's primitives.**
To make the structural reading concrete, we map the formal primitives onto
the Reichsfluchtsteuer case. The mapping is offered as a one-case
illustration: it does not claim to construct the general category of social
agents required for a full formal extension of the sketch.

- **S** = the Jewish-emigrant household-as-economic-agent under the Nazi
  jurisdictional regime (1933–1941): a unit of self-reproduction across
  property, employment, civic, and familial relations.
- **∂S** = the boundary conditions of legal-economic agency — the bundled
  rights of property, mobility, legal standing, and contractual capacity
  that demarcate the agent's operational membrane.
- **φ** = the capacity for self-maintenance and reproduction of
  socio-economic agency: the household's ability to continue earning,
  spending, contracting, and relocating its activities.
- **f** = the confiscatory fiscal-jurisdictional relation imposed by the
  state: the bundle of Reichsfluchtsteuer + Judenvermögensabgabe + emigration
  fee + currency-blocking measures.
- **e** = emigration as the candidate exit morphism — formally available
  until October 1941, materially destroyed earlier.

The diagnostic content of the framework is this: **e** remains formally
present in the legal code while ceasing to be admissible in the framework's
sense, because its exercise destroys **φ**. Bajohr (2002) and Ritschl (2019)
document the progression: 1934 threshold lowered to 50,000 ℛℳ; 1938
Reichsfluchtsteuer revenue reaching 342 million ℛℳ; cumulative 941 million ℛℳ
across the Nazi period, ~90% extracted from persecuted emigrants. The
formal exit door stayed open; its cost converted self-preserving exit into
economic annihilation. In the framework's vocabulary: **e** is non-admissible
under the predatory **f**, even though it is not legally suppressed.

The same primitives apply, in principle, to the hukou and balsero cases —
S = peasant household / would-be Cuban emigrant, ∂S = registration-bundled
entitlements / legal-economic agency, φ = capacity to relocate or to
reproduce socio-economic activity, f = administrative exclusion / asymmetric
emigration regime, e = rural-to-urban transition / sea crossing — but we
do not formalize those mappings here. They are analogous domain readings,
not full instantiations, and would require the rigorous category of social
agents identified in §6.2 as an open question.
```

### Response letter (snippet R&R)

> We thank Reviewer [N] for pointing out that the framework's primitives are stated abstractly without an explicit social instantiation. We have added a worked mapping (new boxed passage after §4.2, ~400 words) of the Reichsfluchtsteuer case in the framework's primitives: S = household-economic-agent, ∂S = boundary conditions of legal-economic agency, φ = capacity for socio-economic self-maintenance, f = confiscatory fiscal-jurisdictional relation, e = emigration. The diagnostic content is the formal exit door (e) remaining present while becoming non-admissible because its exercise destroys φ. The other cases (hukou, balsero) are presented as analogous domain readings, since formalizing them would require the rigorous category of social agents that §6.2 explicitly identifies as future work.

### Coût / risque

- **Coût édition** : moyen (~400 mots ajoutés)
- **Danger** : moyen-haut si surformalisation — restreindre à UN cas
- **Chance de satisfaire** : 65-80 %

---

## Module C — Renforcement de la neutralité normative

### Prédiction reviewer (~70-85 % de probabilité)

> "Even with the disclaimers, the paper privileges property and non-aggression. The Ostromian/Habermasian/Pettitian alternatives are sketched but not given parity treatment. Suspect of libertarian smuggling."

### Stratégie

Ne pas se battre sur l'étiquette libertarienne. Reformuler : "framework constrains, does not entail." Renforcer la parité des 4 completions (propriété/NAP, Ostrom, Habermas, Pettit). Déplacer une partie du langage propriété/non-agression du §5.3 vers §6.

### Patches précis

**C.1 — §5.4 (ligne 159, déjà intitulé "(one reading among several)")**
- **Avant** : "The three principles—non-heteronomization, admissible exit, and in situ dissociation—converge with one family of governance design principles: the first with non-aggression (do not destroy a sub-system's autonomy), the second with the right of exit (possibility of withdrawing from any coercive relation), the third with protected property (existence of a space outside capture where exit is exercised without displacement)."

- **Après** : "The three principles—non-heteronomization, admissible exit, and in situ dissociation—are compatible with several families of governance design principles. Under one reading, non-heteronomization aligns with non-aggression, admissible exit with the right of exit, and in situ dissociation with protected property. Under an Ostromian reading, the same three principles correspond to graduated sanctions, member-selected exit, and polycentric institutional pluralism. Under a Habermasian reading, they correspond to undistorted communication, deliberative withdrawal from illegitimate discourse, and protected discursive arenas. Under a Pettit-style republican reading, they correspond to non-domination, the structural impossibility of arbitrary power, and protected domains of non-arbitrary rule. The framework constrains the space of viable governance designs; it does not select among these readings as a political doctrine."

**C.2 — §7 Conclusion (ligne 203, item 5)**
- **Avant** : "(5) Exit, in its most accomplished form, is not a change of place but a change of relation—in situ dissociation—which opens a convergence with one family of governance design principles centred on protected space, boundary integrity, and non-aggression, under additional normative hypotheses that this paper makes explicit and does not claim to entail."

- **Après** : "(5) Exit, in its most accomplished form, is not a change of place but a change of relation — in situ dissociation — a structural condition compatible with several families of governance design principles (property/non-aggression, Ostromian polycentric commons, Habermasian discursive procedures, Pettit-style non-domination). The framework constrains the space of viable governance designs; it does not entail a specific political doctrine."

**C.3 — Méta-déclaration à insérer en fin de §1 (intro, après ligne 23)**

Insérer (nouvelle phrase de clôture du paragraphe d'intro) :

> The framework developed here is structural, not doctrinal. It constrains the space of viable governance designs without selecting among the political traditions (libertarian, Ostromian, Habermasian, republican) that can satisfy those constraints.

### Response letter (snippet R&R)

> We thank Reviewer [N] for pressing the question of normative neutrality. We have made three changes to reinforce the framework's distance from any specific political doctrine. (1) §1 now closes with an explicit statement that the framework "constrains the space of viable governance designs without selecting among the political traditions". (2) §5.4 has been rewritten to give parity treatment to four readings (property/non-aggression, Ostromian polycentric commons, Habermasian discursive procedures, Pettit-style non-domination), with each linked to the same three structural principles. (3) §7 conclusion item (5) now states explicitly that "the framework constrains the space of viable governance designs; it does not entail a specific political doctrine."

### Coût / risque

- **Coût édition** : moyen (3 patches, dont C.1 substantiel)
- **Danger** : moyen — perdre de la spécificité contemporaine du papier
- **Chance de satisfaire** : 70-85 %

---

## Module D — Reformulation du statut empirique : "hypothesis-generating, not confirmatory"

### Prédiction reviewer (~85-95 % de probabilité)

> "Three cases do not establish the empirical thesis. What is the epistemic status of these illustrations?"

### Stratégie

Accepter sans résistance. Le papier anticipe déjà ce point (caveat méthodologique §4.2, limite §6.2). Renforcer explicitement avec "plausibility probes / hypothesis-generating, not confirmatory."

### Patches précis

**D.1 — §1.4 méthodologie (ligne 29)** — déjà bien formulé, ajouter une phrase :

- **Avant** : "**Instantiated biologically:** cancer as a case of monopolistic predation in multicellular cooperation, supported by the major transitions literature (Aktipis et al., 2015; Trigos et al., 2017; Michod, 1999)."
- **Après** : "**Instantiated biologically:** cancer as a case of monopolistic predation in multicellular cooperation, supported by the major transitions literature (Aktipis et al., 2015; Trigos et al., 2017; Michod, 1999; Hanahan & Weinberg, 2011). **Empirical status note:** the historical and ecological cases in §4 are offered as plausibility probes for the framework's diagnostic content, not as a representative sample that would establish a quantified empirical claim — the latter would require the coded survivorship study described in §6.2."

**D.2 — §4 ouverture (ligne 71, déjà patché par Module A — concaténer)**

Ajouter à la fin du paragraphe d'ouverture de §4 :

> The cases are illustrative rather than confirmatory: they are hypothesis-generating structural plausibility probes, not a representative sample.

**D.3 — §6.2 (ligne 183, paragraphe historique)** — renforcer l'épistémologie :

- **Avant** : "would be required to elevate the historical pattern to a formal empirical claim with quantified survivorship correction."
- **Après** : "would be required to elevate the historical pattern from hypothesis-generating plausibility probe to a formal empirical claim with quantified survivorship correction."

### Response letter (snippet R&R)

> We thank Reviewer [N] for asking us to clarify the epistemic status of our illustrative cases. We have added explicit language in §1.4 and §4 opening identifying the cases as "plausibility probes for the framework's diagnostic content, not a representative sample that would establish a quantified empirical claim." §6.2 has also been adjusted to mark the distinction explicitly. The empirical thesis remains, in the framework's terms, hypothesis-generating rather than confirmatory.

### Coût / risque

- **Coût édition** : faible (3 micro-patches)
- **Danger** : faible
- **Chance de satisfaire** : 85-95 %

---

## Module E — Conditions aux frontières de l'exit in situ

### Prédiction reviewer (~80-90 % de probabilité)

> "In situ exit is presented as a strong design ideal, but how does it work against material constraints (land, infrastructure, externalities, rival goods)?"

### Stratégie

Le papier reconnaît déjà la limite (ligne 137 : "in any system with shared infrastructure... in situ exit cannot be absolute — rival goods and infrastructural dependencies generate residual coupling"). Renforcer avec une mini-section dédiée donnant un exemple positif (protocol fork, data portability, DAO ragequit) + un contre-exemple physique (land, biens publics fragiles).

### Patch précis — nouvelle micro-section §5.3.1 à insérer après la ligne 137

```markdown
### 5.3.1 Boundary conditions of in situ exit

The applicability of in situ exit is uneven across substrates. We can
distinguish two limit cases.

**Strong instantiations.** In substrates with low rivalrousness and high
substitutability of the protected space C, in situ exit can be approximated
closely. Examples include: open-source protocol forks (where a community
exiting a captured fork by joining a counter-fork enjoys near-zero
relocation cost); portable identity and data architectures (where the
relational tie to a captured platform is replaced by a tie to an alternative
provider without loss of accumulated relational capital); decentralised
autonomous organisations with explicit ragequit mechanisms (where a member's
proportional share of pooled assets is structurally guaranteed at exit).
In these substrates, "the third" can be guaranteed at protocol-design time,
and the design space for in situ exit is rich.

**Weak instantiations.** In substrates with high rivalrousness, infrastructural
lock-in, or non-substitutable site-specificity, in situ exit is bounded by
material constraints. A community exiting a captured land-based jurisdiction
cannot leave the land behind; a household exiting a captured municipal
water system cannot construct an alternative water table; ecosystems
fragmented by infrastructure cannot generate corridors at will. In these
substrates, in situ exit is a design *ideal worth approximating* — through
property delineation, exit-respecting easements, polycentric jurisdictional
overlays, or alternative-infrastructure provision — but it cannot fully
displace emergency or institutional exit as backup conditions.

The framework therefore does not claim that in situ exit is universally
achievable; it claims that, where structurally feasible, it is the form of
exit most consonant with the viability conditions, and that its absence
forces the system to rely on more costly forms of exit (institutional,
emergency) whose suppression is the typical mechanism of monopolistic capture.
```

### Response letter (snippet R&R)

> We thank Reviewer [N] for pressing the material-feasibility question. We have added §5.3.1 "Boundary conditions of in situ exit" distinguishing strong instantiations (low-rivalrousness substrates: protocol forks, data portability, DAO ragequit) from weak instantiations (high-rivalrousness substrates: land, water infrastructure, fragmented ecosystems). The framework's claim is reformulated: in situ exit is the form most consonant with the viability conditions *where structurally feasible*, not universally achievable.

### Coût / risque

- **Coût édition** : moyen (~200 mots ajoutés)
- **Danger** : faible
- **Chance de satisfaire** : 80-90 %

---

## Module F — "Diagnostic, not theorematic" remonté en amont

### Prédiction reviewer (~90 % de probabilité)

> "You acknowledge in §6.2 that P-compatibility is diagnostic rather than theorematic. Why is this hidden so late?"

### Stratégie

Faire remonter cette concession honnête vers §2 ou §3 pour qu'elle ne ressemble pas à un disclaimer de dernière minute.

### Patch précis — phrase à insérer en fin du §2 ouverture (après ligne 47)

> A methodological clarification before we proceed: the multi-level P-compatibility criterion developed below is diagnostic rather than theorematic. Its value lies in the shift of diagnostic level — from asking "is this object pathological?" to asking "is this inter-level inclusion admissible?" — not in a deep unexpected categorical result. We return to this status in §6.2.

### Response letter (snippet R&R)

> We thank Reviewer [N] for noting that our acknowledgment of the diagnostic-not-theorematic status of P-compatibility came late in the paper. We have moved this clarification to §2 (end of opening section), so the reader understands the framework's epistemic ambition from the outset rather than only at the limits section.

### Coût / risque

- **Coût édition** : très faible (une phrase déplacée)
- **Danger** : très faible
- **Chance de satisfaire** : 90 %

---

## Module G — Note Ashby/Set (probabilité très faible mais peu coûteuse)

### Patch précis — note de bas de page ou phrase incise en §3 (après ligne 59)

Ajouter après "This connects formally to Ashby's (1956) law of requisite variety" :

> (No claim is made for the cardinality argument under enriched, fibred, or large categories; the argument is restricted to the present Set-based formulation as developed in the companion paper.)

### Coût / risque

- **Coût** : très faible
- **Chance de satisfaire** : 95 %

---

## Scénarios de déploiement

| Pattern reviewer | Modules à déployer | Note |
|---|---|---|
| **Major revision constructive standard** (scénario principal Peter G) | A + B + C + D + F | 5 modules, ~2 semaines de R&R |
| **Reviewer formaliste agressif** (demande catégorie sociale complète) | A + B (limité à 1 cas) + F + réponse de bornage | Borner : "this paper provides a diagnostic framework, not the full category of social agents" |
| **Reviewer hostile idéologique** (libertarian smuggling) | C en priorité, accompagné de A et D | La cover letter R&R doit insister sur les 4 completions à parité |
| **Reviewer empiriste** (3 cas ≠ preuve) | D en priorité, + B (mapping concret) | Préfixer chaque cas par "plausibility probe" |
| **Reviewer méthodologique systems-friendly** | F + E + ajustements mineurs | Cas favorable, modules légers suffisent |

---

## Response letter — squelette générique

```
Date: [date of R&R submission]
Re: SRES-26-XXXX — "Relational Exit as a Structural Condition of Viability
    in Multi-Level Cooperative Systems"

Dear Editor,

We thank the editor and the reviewers for the careful and constructive
engagement with our manuscript. The reviewers' comments have led to
substantive improvements that we believe strengthen the paper without
altering its core thesis. We respond to each comment below, with revisions
indicated by section and line number against the resubmitted manuscript.

[Then, per reviewer, in order:]

== Reviewer 1 ==

R1.1 [Reviewer's comment paraphrased]
[Module-based response — copy from above]
[Specific revision location, e.g.: "Revised in §4 opening (line 71) and §4.4 (line 99); see Module A patches."]

R1.2 [...]
[...]

== Reviewer 2 ==
[...]

== Editor ==
[...]

We are grateful to the reviewers for their work and to the editor for the
opportunity to revise.

Sincerely,

Christopher Keo
TURFU — Centre Transdisciplinaire de Recherche
contact@turfu.org
ORCID: 0009-0000-8290-1416
```

---

## Conversion de probabilités (après déploiement de la stack complète Module A-G)

| Issue initiale | Conversion après R&R | P finale d'acceptation |
|---|---:|---:|
| Major revision constructive | 60-70 % | ~0,40 × 0,65 = **0,26** |
| Major revision hostile/détaillée | 35-50 % | ~0,05 × 0,42 = **0,02** |
| Reject → resubmit B2/Cosmos | — | papier recyclable |

Estimation totale d'acceptation SRBS finale, conditionnelle au passage du desk : **~25-35 %**, conforme à Peter G.

---

## Notes opérationnelles

- **Délai R&R typique SRBS** : 30-60 jours après réception des reviewer reports
- **Plus tu attends, plus le reviewer est froid** : viser une réponse en 2-3 semaines pour signaler un engagement constructif
- **Cover letter R&R** : 1 page max, lister les 3-5 changements majeurs en puces
- **Track changes** : Wiley exige une version avec changes visibles + une version clean

---

## Statut des modules

| Module | Statut | Dernière update |
|---|---|---|
| A — Adoucissement terminologique | ✅ Patches prêts | 2026-05-30 |
| B — Mapping Reichsfluchtsteuer | ✅ Bloc rédigé | 2026-05-30 |
| C — Neutralité normative | ✅ Patches prêts | 2026-05-30 |
| D — Statut empirique | ✅ Patches prêts | 2026-05-30 |
| E — Conditions aux frontières in situ | ✅ Section rédigée | 2026-05-30 |
| F — Diagnostic-not-theorematic | ✅ Phrase prête | 2026-05-30 |
| G — Note Ashby/Set | ✅ Note prête | 2026-05-30 |

**À déployer dès réception des reviewer reports**.
