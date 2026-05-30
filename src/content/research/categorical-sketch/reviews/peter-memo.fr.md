# Memo Peter G — Correction du typage de φ (§3.2/§3.3)

**Peter G · Memo technique — 13 sections · 23 mars 2026**

Memo technique complet de Peter G pour la correction du typage de l'endomorphisme dans le manuscrit BioSystems. 13 sections couvrant le diagnostic, les alternatives (coproduit vs produit), la formule définitive, les ajustements de preuve, et la recommandation finale.

---

## Sommaire

1. Où se situe le problème
2. Pourquoi le produit est préférable au coproduit
3. Le problème résiduel du patch initial (Opus)
4. Endomorphisme corrigé recommandé
5. Paragraphe prêt à insérer (§3.2)
6. Révisions locales §3.2
7. Révisions locales §3.3(i)
8. Pourquoi l'endogénéité tient toujours
9. Mise à jour Table 1
10. Softening abstract / conclusion
11. Alternative conceptuelle : S_org
12. Recommandation finale
13. Formulation en une phrase

---

## Executive Summary

> Le product-based repair est la bonne direction, mais l'endomorphisme doit être défini de sorte que le composite de Rosen apparaisse comme **composante de φ**, pas seulement dans la prose — sinon le typage est corrigé en affaiblissant le modèle plutôt qu'en instanciant correctement le claim original.
>
> — Peter G, one-sentence formulation

---

## 1. Où se situe le problème

Le manuscrit fait trois choses en séquence :

1. Il rappelle les maps de Rosen : `f : A → B`, `Φ : B → Hom(A,B)`, `β : Hom(A,B) → B`
2. Il définit en §3.2 : `F(φ) = β ∘ Φ ∘ f : S → S`
3. En §3.3(i), il prouve l'endogénéité en traitant cette composée comme `S → S`

**Le problème** : `β ∘ Φ ∘ f : A → B`, pas `S → S`. La map centrale utilisée pour instancier la Définition 1 n'est pas typée comme la structure le requiert.

---

## 2. Pourquoi le produit est préférable au coproduit

Le manuscrit ne présente pas S comme une somme « ou bien / ou bien » de composants. Il présente le système (M,R) comme un **tout organisé simultané** comprenant substrats, produits et structure de réparation. En **Set**, c'est plus naturellement représenté par un espace d'états de type tuple :

```
H := Hom(A,B),  S := A × B × H
```

Cela donne des projections canoniques `π_A : S → A`, `π_B : S → B`, `π_H : S → H`.

---

## 3. Le problème résiduel du patch initial (Opus)

La proposition produit initiale d'Opus définit :

```
φ(a,b,h) = (a, f(a), Φ(f(a)))
```

Bien typée comme `S → S`, mais **β ne figure nulle part dans l'endomorphisme**. Si β est absent de φ, le typage est réparé mais l'interprétation est affaiblie : φ ne modélise plus le cycle complet de Rosen (métabolisme + réparation + clôture), seulement les deux premiers.

> « Vous avez résolu le problème de typage, mais maintenant la map que vous appelez auto-production ne contient plus la clôture β qui était centrale dans la motivation rosénienne. »

---

## 4. Endomorphisme corrigé recommandé

```
φ(a,b,h) := (a, β(Φ(f(a))), Φ(f(a)))
```

**(a) Bien typé** : `f(a) ∈ B`, `Φ(f(a)) ∈ H`, `β(Φ(f(a))) ∈ B` → sortie dans `A × B × H`. Donc `φ : S → S` génuine.

**(b) Distinction P / Flux** : A-coordonnée inchangée : les substrats viennent de ρ (flux), pas de l'auto-production interne. Cohérent avec la séparation pattern structural / flux dynamique.

**(c) β dans le modèle** : Propriété de récupération : `π_B ∘ φ = β ∘ Φ ∘ f`. Le composite de Rosen est littéralement la B-composante.

**(d) Lisible pour BioSystems** : Assez simple pour un lectorat interdisciplinaire de biologie théorique. Évite la machinerie abstraite des maps induites sur les coproduits.

---

## 5. Paragraphe prêt à insérer (§3.2)

*Rédigé par Peter G — validé par Opus*

> A typing clarification is required at this point. In Rosen's formulation, the composite β ∘ Φ ∘ f has type A → B, whereas Definition 1 of a P-system requires an endomorphism φ : S → S on the total system object. To make the construction explicit in Set, let H := Hom(A,B) and define the system state object by S := A × B × H. Thus a state (a,b,h) ∈ S records, respectively, the current substrate configuration, the produced components, and the repair/closure capacity. We then define the self-production endomorphism by φ(a,b,h) := (a, β(Φ(f(a))), Φ(f(a))). This map is well-typed as an endomorphism S → S. Its first coordinate is left unchanged because the substrate supply belongs to the flux action ρ, not to the internal self-production cycle. Its B-component recovers the Rosen composite, π_B ∘ φ = β ∘ Φ ∘ f, while its H-component records the corresponding repair state. In this way, the Rosenian productive circularity is represented not as a bare map A → B, but as a well-typed endomorphism on the total system object.

---

## 6. Révisions locales §3.2

Révision des 4 bullets de §3.2 :

- **F(S)** — L'objet d'état S := A × B × H, représentant la configuration substrat, les composants produits, et la structure de réparation/clôture.
- **F(∂S)** — La clôture opérationnelle au sens de Varela (1979) — la membrane cellulaire, formalisée comme le sous-objet de S médiateur des échanges avec E.
- **F(φ)** — L'endomorphisme φ(a,b,h) := (a, β(Φ(f(a))), Φ(f(a))), dont la B-composante récupère le composite de Rosen β ∘ Φ ∘ f.
- **F(ρ)** — Le flux métabolique. L'action ρ : R × S → S représente l'assimilation des substrats/ressources, médiée par la membrane.

---

## 7. Révisions locales §3.3(i)

La preuve d'endogénéité ne doit plus dire simplement `φ = β ∘ Φ ∘ f`. Elle doit dire que l'endomorphisme `φ : S → S` est défini comme ci-dessus, et que sa B-composante récupère le composite de Rosen.

> « Toute factorisation de φ à travers E forcerait en particulier la circularité productive encodée par β ∘ Φ ∘ f à être également médiatisée de l'extérieur. »

---

## 8. Pourquoi l'argument d'endogénéité tient toujours

L'argument existant n'est pas affecté. L'idée centrale de §3.3 reste : deux systèmes peuvent partager le même E et les mêmes ensembles moléculaires tout en différant dans leur **identité organisationnelle** (quel régime métabolisme/réparation est actif).

Sous la formule corrigée, l'organisation interne est toujours portée par les 2ème et 3ème coordonnées. L'environnement fournit ressources et conditions, mais pas le choix organisationnel du système. L'argument que la factorisation par E requerrait que E encode l'information organisationnelle qu'il ne contient pas reste intact.

---

## 9. Mise à jour Table 1

La table ne doit plus dire :

> « Causal closure: β ∘ Φ ∘ f does not factor through E »

Formulation corrigée :

> **P-a** — φ endogenous (Def. 2) : the induced endomorphism φ : S → S does not factor through E ; its B-component recovers the Rosen cycle β ∘ Φ ∘ f.

---

## 10. Softening abstract / conclusion

Si la correction est faite proprement, le manuscrit peut probablement encore dire que les (M,R)-systèmes « constitute a model of ThP in Set ». Mais pour réduire la friction reviewer, formulations plus prudentes :

- « Rosen's (M,R)-systems **admit a natural model** of ThP in Set. »
- « We construct a Set-valued **instantiation** of ThP induced by Rosen's (M,R)-systems. »

---

## 11. Alternative conceptuelle : S_org = B × H

Alternative conceptuellement plus propre : `S_org := B × H`, avec les substrats A gérés entièrement par le flux ρ. Respecterait mieux la distinction auto-production / flux.

**Non recommandé** pour cette version : nécessiterait une révision plus substantielle de §3.2–§3.3. Pour BioSystems, `S = A × B × H` est le meilleur équilibre rigueur / continuité.

---

## 12. Recommandation finale

**Réparation recommandée**

```
S := A × B × Hom(A,B),  φ(a,b,h) := (a, β(Φ(f(a))), Φ(f(a)))
```

- Typage corrigé proprement
- Plus naturel que le coproduit
- Séparation auto-production / flux
- β explicitement dans φ
- Endogénéité inchangée
- Lisible pour BioSystems

**Ne pas garder** la formule `φ(a,b,h) = (a, f(a), Φ(f(a)))` sauf si la prose est révisée pour ne plus dire que φ représente le cycle complet de Rosen. Sinon le typage est fixé en laissant tomber silencieusement β.

---

## 13. Formulation en une phrase

> Le product-based repair est la bonne direction, mais l'endomorphisme doit être défini de sorte que le composite de Rosen apparaisse comme composante de φ, pas seulement dans la prose ; sinon le problème de typage est corrigé en affaiblissant le modèle plutôt qu'en instanciant correctement le claim original.
>
> — Peter G
