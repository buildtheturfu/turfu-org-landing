# Pattern de shadow package

> Pré-construire la réponse aux commentaires des reviewers AVANT que ces commentaires n'arrivent. Déployer en jours, non en semaines, lorsque la véritable R&R atterrit.

---

## Le pattern en un paragraphe

Après soumission à une revue à comité de lecture, le manuscrit entre dans une période d'attente de 60 à 90 jours. La plupart des auteurs ne font rien pendant ce laps de temps. **Le pattern de shadow package utilise cette période pour bâtir une réponse R&R préemptive**, anticipant les demandes les plus probables des reviewers sur la base de la revue adversariale (voir `adversarial-review-pattern.md`). Lorsque les rapports réels arrivent, l'auteur déploie un sous-ensemble de modules pré-construits en quelques jours, avec le texte de la lettre de réponse déjà rédigé.

---

## Pourquoi cela fonctionne

Trois observations issues de l'édition académique :

1. **La plupart des demandes de R&R sont prévisibles.** Un reviewer adversarial compétent (humain ou IA) peut anticiper ~70-80 % des demandes que formulera un véritable reviewer. Les 20-30 % imprévisibles sont des objections inédites, mais la part prévisible peut être pré-construite.

2. **Le délai de retour de R&R signale l'engagement.** Une réponse soumise en 2 semaines signale « l'auteur s'est soucié de la chose et a travaillé dur ». Une réponse soumise en 8 semaines signale « l'auteur a couru après ». Les éditeurs et reviewers le remarquent.

3. **L'écriture à froid est plus tranchante que l'écriture à chaud.** Rédiger des réponses R&R trois mois après soumission est mentalement frais et stratégique. Les rédiger trois semaines après soumission (alors que la revue adversariale est encore fraîche) est contextuellement tranchant et structurellement serré.

---

## Protocole concret

### Étape 0 — La revue adversariale a été conduite (voir `adversarial-review-pattern.md`)

Le shadow package présuppose que la revue adversariale a identifié les demandes de révision les plus probables, classées par probabilité.

### Étape 1 — Identification des modules

Pour chaque demande adversarialement prédite avec une probabilité ≥ 60 %, construire un « module » dans le shadow package. Chaque module traite UNE demande de révision.

Exemples de modules tirés de `papers/02-relational-exit-srbs/strategic-documents/SRBS_R&R_SHADOW_PACKAGE_v3_1_2.md` :

| Module | Demande prédite | Probabilité |
|---|---|---:|
| A | « structural realization » → « candidate » hors biologie | 80-90 % |
| B | Cartographie travaillée de la Reichsfluchtsteuer dans les primitives du framework | 65-80 % |
| C | Neutralité normative + parité 4-completion | 70-85 % |
| D | Statut empirique en tant que « hypothesis-generating, not confirmatory » | 85-95 % |
| E | Conditions aux limites de l'exit in situ | 80-90 % |
| F | « Diagnostic, not theorematic » remonté plus tôt dans l'article | 90 % |

### Étape 2 — Structure d'un module

Chaque module contient :

1. **Préoccupation prédite du reviewer** (dans la voix du reviewer adversarial — « le reviewer dira X »)
2. **Stratégie** (que concéder, que défendre)
3. **Patchs** (fichier:ligne + verbatim avant/après pour chaque édition du manuscrit)
4. **Extrait de lettre de réponse** (texte prêt à coller pour la portion cover letter de la R&R)
5. **Estimations de coût / risque / chance de satisfaction**

### Étape 3 — Scénarios de déploiement

Une section « scénarios » associe des profils de reviewer aux modules à déployer :

| Profil de reviewer | Modules déployés | Note |
|---|---|---|
| Systems-friendly constructif | A + B + C + D + F | 5 modules, ~2 semaines de travail R&R |
| Formaliste hostile | A + B (1 cas seulement) + F | Borner les revendications formelles |
| Objecteur idéologique | C en priorité, avec A + D | La cover letter doit insister sur la parité 4-completion |
| Empiriste | D en priorité, + B | Recadrer les cas comme des sondes de plausibilité |
| Systems-friendly méthodologique | F + E | Des modules mineurs suffisent |

### Étape 4 — Squelette générique de lettre de réponse

Le package inclut un template prêt à coller de lettre de réponse :

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

### Étape 5 — À la réception des rapports de reviewers

Lorsque la R&R réelle atterrit :
1. Associer chaque demande de reviewer à un module pré-construit
2. Pour les demandes non associées, rédiger rapidement un nouveau module (typiquement 1-3 non associées par tour)
3. Déployer les modules associés verbatim ou avec ajustement mineur
4. Composer la cover letter à partir du squelette + extraits de modules
5. Soumettre sous 2-3 semaines

---

## Pourquoi la plupart des auteurs NE font PAS cela

1. **Optimisme de coût irrécupérable** : après soumission, l'auteur veut se désengager du manuscrit (« j'ai terminé, laissez-moi attendre »)
2. **Revue adversariale non faite** : sans prédiction structurée des demandes probables, il n'y a pas d'intrant pour le shadow package
3. **Inertie culturelle** : « on répond à ce que le reviewer dit réellement, pas à ce qu'on prédit »

Le troisième point a son mérite. Le pattern de shadow package n'a PAS pour objet de s'engager d'avance sur des changements qui n'ont pas été demandés. Il s'agit d'**avoir des brouillons prêts** pour que le déploiement soit rapide SI la prédiction se vérifie.

---

## Que se passe-t-il si la prédiction se trompe ?

Les 20-30 % de demandes imprévues sont traitées par rédaction R&R classique en temps réel. Les 70-80 % pré-construits accélèrent la livraison de la réponse, ce qui donne à l'auteur la bande passante nécessaire pour se concentrer sur les demandes inédites imprévues.

Dans le pire cas (aucune des demandes prédites n'apparaît, toutes les demandes sont inédites), le shadow package représente un travail perdu d'environ 10-20 heures. Dans le meilleur cas (la plupart des demandes prédites apparaissent), le temps de déploiement chute de 6-8 semaines à 2-3 semaines.

L'espérance est nettement positive compte tenu de l'asymétrie.

---

## Exemple : SRBS Shadow Package v3.1.2

Le shadow package pré-construit complet du Paper 2 (relational exit, soumission SRBS 2026-05-29) est disponible à :

`papers/02-relational-exit-srbs/strategic-documents/SRBS_R&R_SHADOW_PACKAGE_v3_1_2.md`

Il contient 7 modules (A-G), 5 scénarios de déploiement, un squelette générique de lettre de réponse et une estimation de la conversion de probabilité d'acceptation post-R&R.

Le shadow package a été construit le 2026-05-30 (lendemain de la soumission) sur la base de l'audit reviewer-hostile Peter G. Les rapports réels de reviewers sont attendus environ 60-90 jours plus tard. Le résultat post-déploiement sera consigné sur `turfu.org/recherche/relational-exit/srbs-journey` une fois connu.

---

## Voir aussi

- [`adversarial-review-pattern.md`](adversarial-review-pattern.md) — intrant du shadow package
- [`ai-agents-as-research-collaborators.md`](ai-agents-as-research-collaborators.md) — méthodologie plus large
