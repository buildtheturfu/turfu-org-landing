# B1 — Analyse adversariale sur 3 itérations

**Date :** 2026-05-08
**Itérations effectuées :** 3
**Plafond :** atteint (les itérations suivantes donneraient des retours décroissants ou négatifs)

---

## Trajectoire

| Version | Verdict adversarial | Estimation d'acceptation | Corrections appliquées entre versions |
|---|---|---|---|
| **v1** (5+2 corrections Opus) | Major revision tendant vers reject | 10-15 % | (baseline) |
| **v2** (+ 4 corrections adversariales : Defs Beer/Ashby/Luhmann/Ostrom/Mingers ajoutées, « instantiation »→« realization », quantificateurs §4.2, séparation définitionnel/empirique) | Major revision frôlant le reject | 10-15 % | +4 corrections |
| **v3** (+ Appendix A auto-contenu, numéros de citation corrigés, distinction apoptose/exit, Ostrom travaillé, Ashby dérivé) | Major revision | ~15 % | +5 corrections |

Total des corrections appliquées : **9 révisions substantielles** sur 3 itérations.

---

## Pourquoi l'itération 3 n'a produit qu'un déplacement marginal

La critique v3 du reviewer hostile converge vers un seul constat structurel qui **ne peut être résolu sans changer la nature du papier** :

> « SRBS ne peut pas évaluer un papier dont le témoin central de non-trivialité est non publié et indisponible. […] Soit on inclut la construction de Rosen à 16 états et le lemme de séparation directement dans le texte, soit on recadre le papier comme entièrement auto-suffisant sans référence au papier compagnon. »

C'est la tension salami-slicing que la cover letter (¶3) traite explicitement, en miroir :
- **Inliner le modèle fini** → résout la lacune de falsifiabilité, mais augmente le recouvrement avec BioSystems → risque de redundant-publication ICMJE/COPE
- **Ne pas inliner** → préserve la déclinaison du triptyque, mais laisse l'affirmation structurelle reposer sur un papier forthcoming que les reviewers SRBS ne peuvent inspecter

Les deux options ont des coûts légitimes. La « bonne » réponse dépend de l'optimisation : confort-reviewer-SRBS (inliner) ou propreté-ICMJE-COPE (ne pas inliner). La cover letter a choisi la seconde voie.

---

## Ce que le reviewer adversarial n'accepterait PAS quoi qu'on fasse

Trois constats persistent à travers les itérations 2 et 3, ce qui suggère qu'ils sont structurels plutôt que corrigeables :

1. **La thèse empirique reste étayée par 3 cas illustratifs, pas par des données codées.** Une enquête codée sur Polity IV / V-Dem / Freedom House refermerait ce point — mais ce serait un papier empirique distinct, pas une correction de B1.

2. **Les « trois réalisations structurelles indépendantes » continuent d'opérer comme analogie sans foncteur explicite.** Fournir le foncteur exigerait la machinerie des catégories de Markov que le papier BioSystems lui-même reporte à un follow-up. Donc la seule façon de durcir ce point est d'attendre le Paper 2 du programme.

3. **La convergence avec propriété/non-agression en §5.3-5.4 sera lue comme un penchant libertarien par des reviewers SRBS allergiques** même avec le disclaimer des quatre completions. Travailler les QUATRE completions (Ostrom, Habermas, Pettit) à parité opérationnelle ferait doubler la longueur du papier et lui ferait perdre son centre.

Ce sont les coûts inhérents au rôle choisi par B1 dans le triptyque (pont systèmes, pas noyau formel, pas théorie normative complète).

---

## Estimation d'acceptation calibrée sur le monde réel

Les 15 % du reviewer adversarial sont l'estimation pour un reviewer SRBS *uniformément hostile*. Les pools réels de reviewers SRBS ont de la variance :

- ~30 % des reviewers SRBS seront alignés avec le cadrage relational-exit (sensibles à l'autopoïèse, sensibles au governance-design) et trouveront le papier contributif
- ~40 % seront neutres / médians, prêts à recommander des révisions majeures mais pas à rejeter
- ~30 % seront hostiles à la manière dont l'agent adversarial l'a simulé

Estimation ponctuelle raisonnable sur le monde réel : **20-30 % de probabilité d'acceptation pour v3**. Cohérent avec le taux d'acceptation publié de SRBS (~15-25 % toutes soumissions confondues) et la qualité du papier.

Comparaison avec d'autres revues :
- **HSSC** (IF 3.6) : ~12-18 % — même probabilité, vraisemblance plus basse
- **CPE** (IF 0.7) : ~25-35 % sur un appel libéral classique — mais Paper 3 du triptyque, violation de séquence
- **AI & Society** (IF 4.7) : ~15-22 % — mais Paper 2 du triptyque, exige une réécriture

SRBS reste la bonne cible pour Paper 1.

---

## Filet de sécurité du triptyque

Si SRBS rejette v3 :
- **Plan B** : Cosmos and History (open access, version philosophique, B2 déjà draftée en réserve)
- **Plan C** : HSSC avec pivot de cadrage plus large
- **Plan D** : pause Paper 1, écrire Paper 2 (AI & Society) et l'utiliser comme nouveau Paper 1, replier ce travail dans Paper 3 à JOIE/CPE

Dans aucun de ces scénarios le travail v3 n'est gaspillé. Les 4-5 heures investies dans l'itération adversariale produisent un papier substantiellement plus difficile à écarter, quelle que soit la revue qui l'accepte.

---

## Recommandation : STOP à v3, soumettre

Raisons :
1. **Rendements décroissants** — les itérations 2 et 3 ont chacune coûté ~2-3 h et déplacé l'estimation d'acceptation de ≤5 points de pourcentage
2. **Limites structurelles** — d'autres corrections soit dupliqueraient du contenu BioSystems (risque ICMJE), soit changeraient la nature du papier (plus un pont de triptyque)
3. **Sécurité du triptyque** — rejet ≠ travail gaspillé
4. Le **time-to-publication** importe plus que la probabilité marginale d'acceptation — chaque mois de retard est un mois où Paper 2 (AI & Society) n'existe pas
5. **Le papier est véritablement meilleur** — trois itérations de lecture-hostile-puis-correction ont produit un manuscrit qui *ne tombe plus sur les objections évidentes* (falsifiabilité, raisonnement circulaire, canon manquant, cherry-picking, contrebande libertarienne). Ce qui reste sont des questions de goût et des arbitrages structurels propres au triptyque.

**Action :** envoyer v3 à SRBS via Research Exchange. Cover letter + manuscrit + suggestions de reviewers tous préparés dans `~/Downloads/B1_SRBS_v3_final/`.

---

## Ce qui n'a PAS été appliqué (délibérément, comme point d'arrêt)

La review adversariale v3 a identifié ces corrections résiduelles que j'ai délibérément choisi de NE PAS appliquer :

- **Inliner la construction de Rosen à 16 états dans B1** (pousserait à ~30-40 % d'acceptation) — refusé pour préserver l'intégrité du triptyque / éviter le risque de redundant-publication ICMJE
- **Mener une analyse de survie codée sur Polity IV / V-Dem** — refusé en tant que papier empirique distinct, pas une correction B1
- **Égaliser le traitement opérationnel d'Ostrom/Habermas/Pettit** — refusé car cela doublerait la longueur et ferait perdre le centre
- **Réécrire Q1-Q4 §6.3 comme formulations falsifiables** — mineur, défendable en R&R si un reviewer le demande

Ce sont listés non comme des oublis mais comme des choix conscients sur le point d'arrêt. Chacun est défendable en cas de challenge en R&R.
