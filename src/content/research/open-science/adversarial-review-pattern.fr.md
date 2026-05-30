# Pattern de revue adversariale

> Template concret pour conduire une revue adversariale multi-agents d'un manuscrit académique avant soumission.

---

## Le pattern en un paragraphe

Avant de soumettre à une revue à comité de lecture, soumettez le manuscrit à **N reviews adversariales** par des agents IA agissant dans des rôles distincts. Comparez les verdicts. Résolvez les désaccords par arbitrage humain. Intégrez au manuscrit les critiques les plus fortes qui font consensus. Documentez l'ensemble du processus publiquement. Lorsque les rapports réels des reviewers arrivent, le manuscrit a déjà essuyé la critique qu'un véritable reviewer formulerait — la réponse est largement pré-construite.

---

## Pourquoi « adversarial » compte

Un agent IA unique relisant le manuscrit de son propre collaborateur confirme les biais. Plusieurs agents IA issus de familles de modèles différentes, chacun instruit d'adopter une posture de reviewer critique, produisent un **désaccord structuré**. C'est dans ce désaccord que s'opère le véritable travail épistémique.

Le pattern dépend de :
- L'utilisation d'au moins 2 familles de modèles distinctes (Claude, GPT, Gemini, Kimi — pas seulement plusieurs Claude)
- Un prompting explicite de reviewer hostile (on dit au modèle « trouve ce qui est faible », non « résume »)
- Des reviews indépendantes (chaque agent ne voit pas les sorties des autres agents avant de formuler son propre verdict)

---

## Protocole concret

### Étape 0 — Le manuscrit est en condition v3 stable

Le pattern s'applique à un manuscrit que l'auteur humain considère déjà comme prêt à la soumission. La passe adversariale est une *vérification pré-décollage*, non une boucle d'amélioration de brouillon.

### Étape 1 — Passe de reviewer hostile (rôle Peter G)

Un premier agent IA reçoit le manuscrit avec le template de prompt suivant :

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

Sortie : une note structurée. Exemples dans ce pack :
- `papers/01-categorical-sketch-biosystems/reviews/peter-memo.md`
- `papers/02-relational-exit-srbs/strategic-documents/SRBS_R&R_SHADOW_PACKAGE_v3_1_2.md` (sections 0-1)

### Étape 2 — Passe de vérificateur formel (rôle Opus)

Un deuxième agent IA (de préférence d'une famille de modèles différente) vérifie le contenu formel :

```
You are a mathematician / formal verifier. Read [manuscript] and verify:
1. Every definition: is the type explicit, are the variables introduced?
2. Every proposition: is the proof complete, are there silent assumptions?
3. Every diagram or equation: is the notation consistent across sections?
4. Every cross-reference (Def. X, Prop. Y): does the target exist?

Output a line-by-line annotation with verdict per item: correct / unclear / wrong / undefined.
```

Sortie : annotation ligne par ligne. Exemple : `papers/01-categorical-sketch-biosystems/reviews/opus-review.md`.

### Étape 3 — Revue secondaire indépendante (rôle Gemini / Kimi)

Un troisième agent lit le manuscrit à neuf, sans accès aux sorties des Étapes 1 et 2 :

```
You are a peer reviewer for [target journal]. Read this manuscript and provide
a structured review covering:
1. Main contribution as you see it (one paragraph)
2. Three strongest aspects of the paper
3. Three biggest concerns (specific, not generic)
4. Recommendation (accept / minor / major / reject)
5. What the author should clarify if R&R'd
```

Sortie : revue indépendante. Exemples : `papers/01-categorical-sketch-biosystems/reviews/{gemini,kimi}-review.md`.

### Étape 4 — Dialogue cross-IA (lorsque les reviewers divergent)

Si les Étapes 1-3 divergent sur un point spécifique (par exemple, « l'argument de cardinalité est-il valide ? »), instaurez un dialogue :

```
Agent A says: [quote]
Agent B says: [quote]
Both, please respond to each other's point. Do not concede unless you find
the other's argument decisive.
```

Sortie : transcription du dialogue. Exemple : `papers/01-categorical-sketch-biosystems/reviews/gpt-opus-discussion.md`.

### Étape 5 — Arbitrage humain

L'auteur humain lit toutes les reviews et :
- Identifie les points où TOUS les agents s'accordent → ils deviennent « must-fix » avant soumission
- Identifie les points où LA PLUPART s'accordent → « à considérer pour correction »
- Identifie les points où UN seul agent objecte → arbitrer manuellement ; l'objection isolée est souvent la prise la plus intéressante OU une hallucination
- Documente les décisions d'arbitrage

### Étape 6 — Intégration

Le manuscrit est révisé. La version suivante (par exemple v3.1.1) est le résultat de la passe adversariale.

### Étape 7 — Shadow package (optionnel mais recommandé)

Les points où les reviewers adversariaux ont prédit des demandes de reviewer réel mais que le manuscrit a choisi de NE PAS modifier préventivement → ils deviennent le **shadow R&R package** (voir `shadow-package-pattern.md`).

---

## Outillage

Chaque invocation d'agent peut se faire via :
- **Chat direct** dans les consoles Claude.ai / ChatGPT / Gemini / Kimi
- **Appels API** pour des invocations reproductibles (Anthropic, OpenAI, Google, Moonshot)
- **Orchestration multi-modèles** via des outils comme LangChain, OpenRouter ou le Claude Agent SDK

Pour ce programme, la plupart des reviews adversariales ont été conduites interactivement en console (Claude.ai, ChatGPT, Gemini), l'auteur humain copiant-collant le manuscrit dans la fenêtre de contexte de chaque modèle.

---

## Discipline de coût

La revue adversariale multi-agents coûte de 0 $ à environ 50 $ en frais d'API selon la longueur du manuscrit et le nombre d'itérations. Le pattern est **borné par le temps de travail**, non par le coût.

Coût de travail typique pour une passe adversariale complète :
- Étape 1 (reviewer hostile) : 30-60 min de temps auteur + 15 min d'invocation du modèle
- Étape 2 (vérificateur formel) : 30-60 min de temps auteur + 15 min d'invocation du modèle
- Étape 3 (reviewers indépendants, x2) : 30 min de temps auteur + 30 min d'invocation du modèle
- Étape 4 (dialogue, optionnel) : 15-30 min
- Étape 5 (arbitrage) : 1-3 heures (la phase la plus longue)
- Étape 6 (intégration) : 2-4 heures

Total : 5-10 heures par passe adversariale. Deux à trois passes par manuscrit avant soumission.

---

## Voir aussi

- [`ai-agents-as-research-collaborators.md`](ai-agents-as-research-collaborators.md) — contexte pattern plus large
- [`shadow-package-pattern.md`](shadow-package-pattern.md) — que faire des demandes prédites mais non corrigées préventivement
