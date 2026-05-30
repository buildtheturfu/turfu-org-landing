# Théorie des catégories, autopoïèse et viabilité — guide de lecture

*Comprendre les concepts derrière le sketch catégoriel ThP — TURFu, mars 2026*

---

## Pourquoi les mathématiques ?

Quand on dit qu'un organisme est « vivant », qu'un écosystème est « sain », ou qu'une société est « viable », on utilise des mots qui semblent clairs mais qui sont en réalité vagues. Qu'est-ce qui rend un système vivant, exactement ? Quelle propriété structurelle un système doit-il avoir pour se maintenir ?

La biologie théorique travaille sur ces questions depuis des décennies. Humberto Maturana et Francisco Varela ont proposé le concept d'**autopoïèse** (du grec auto = soi, poiesis = production) : un système est vivant s'il se produit lui-même à travers ses propres opérations. Robert Rosen a formalisé cette idée en termes de **clôture causale efficiente** : dans un organisme, la cause de chaque composant est un autre composant du même système.

Le problème : ces descriptions restent souvent verbales. Elles sont profondes mais difficiles à vérifier formellement. Comment savoir si un système donné est « autopoïétique » ou non ? Comment comparer la viabilité d'un organisme avec celle d'un écosystème ou d'une société, sans tomber dans la simple métaphore ?

C'est là qu'intervient la **théorie des catégories**.

---

## La théorie des catégories en 5 minutes

La théorie des catégories n'est pas une branche des mathématiques parmi d'autres. C'est une **langue** — un système de notation qui permet de décrire des structures indépendamment de leur contenu spécifique.

Ses concepts de base sont remarquablement simples :

**Objets** — les « choses » dont on parle (une cellule, un organisme, un État, un nœud de réseau).

**Morphismes** (flèches) — les « relations » entre ces choses (une inclusion, une interaction, une transformation). Un morphisme f : A → B dit « il existe une relation structurée de A vers B ».

**Composition** — si f : A → B et g : B → C, alors g ∘ f : A → C. Les relations se composent. C'est tout.

La puissance de ce langage est son **abstraction** : le même diagramme peut décrire une relation cellule → tissu, un citoyen → État, ou un nœud → réseau. On ne dit rien sur la « nature » des objets — on décrit la **structure** de leurs relations.

John Baez et Mike Stay ont montré en 2011 que la physique, la logique et l'informatique sont trois modèles d'une même structure catégorielle. Le sketch ThP (Keo, 2026) applique la même stratégie : définir une structure abstraite de viabilité, puis montrer que la biologie, l'écologie et le politique en sont des modèles indépendants.

---

## L'autopoïèse en langage catégoriel

Dans le sketch ThP, un **P-système** est défini par trois éléments :

**S** — un objet (le système).
**M** — sa membrane (sa frontière avec l'environnement).
**φ** — sa fonction d'auto-production.

La condition de viabilité est que φ reste **endogène** : la fonction d'auto-production ne « factorise » pas à travers l'environnement E. En termes simples : le système se produit lui-même, il n'est pas produit par quelque chose d'extérieur.

Quand φ factorise à travers E — quand un agent externe prend le contrôle de la production du système — on dit que le système est devenu **hétéronome**. Il ne se produit plus lui-même. Il est capturé.

C'est la traduction formelle de ce que Varela appelait « l'autonomie » et de ce que Rosen appelait « la clôture causale efficiente ». Le sketch donne à ces concepts une forme mathématique précise, vérifiable, et portable d'un domaine à l'autre.

---

## Morphismes admissibles et non-admissibles

Toutes les interactions entre systèmes ne se valent pas. Le sketch distingue deux types :

Un **morphisme admissible** est une interaction qui préserve l'endogénéité de φ. Le système interagit avec l'autre, mais il continue à se produire lui-même. L'interaction peut être asymétrique (un petit système interagit avec un grand), mais elle ne détruit pas l'autonomie du participant.

Un **morphisme non-admissible** est une interaction qui détruit l'endogénéité. Le système interagit avec l'autre, et dans le processus, il perd sa capacité de se produire lui-même. Il devient hétéronome — capturé, contrôlé, asservi.

La distinction n'est pas entre « bon » et « mauvais ». C'est entre **viable** et **pathologique**. Un morphisme non-admissible peut être distribué (il existe de la compétition et des alternatives — le système peut y échapper) ou monopolistique (pas de compétition, pas de sortie — le système est piégé).

---

## Prédation distribuée vs monopolistique — le cœur du sketch

C'est la contribution la plus importante du sketch ThP.

**Prédation distribuée** (Définition 7) : une interaction non-admissible, mais pour laquelle existent à la fois un compétiteur (g : A' → B) et un morphisme de sortie (e : B → C). Le système est diminué mais pas piégé. Il peut changer de partenaire ou partir. Le stress est tolérable — hormétique, dirait Taleb.

**Prédation monopolistique** (Définition 8) : une interaction non-admissible sans compétiteur ET sans exit. Le système est piégé dans une relation qui détruit son autonomie, sans alternative et sans possibilité de fuite.

La thèse de viabilité : **un P-système est viable si et seulement si toute prédation qu'il subit est distribuée**. La vie n'est pas l'absence de prédation — la vie est la prédation distribuée.

Et la pathologie n'est pas l'existence du prédateur — c'est l'absence du **tiers** : le compétiteur, l'alternative, le morphisme de sortie. Structure ternaire, pas binaire. C'est le tiers inclus de Lupasco traduit en langage catégoriel.

---

## La compatibilité multi-niveaux (Proposition 2)

Les systèmes réels ne sont pas plats — ils sont **hiérarchiques**. Cellules dans des tissus, tissus dans des organes, individus dans des sociétés, nœuds dans des protocoles.

La Proposition 2 de ThP étend la condition de viabilité aux systèmes multi-niveaux : un système hiérarchique est viable si et seulement si les **inclusions entre niveaux** sont des morphismes admissibles.

En termes simples : quand un sous-système (une cellule, un citoyen, un nœud) est inclus dans un système de niveau supérieur (un tissu, un État, un réseau), cette inclusion doit préserver l'endogénéité du sous-système et maintenir l'existence d'un morphisme de sortie.

Quand l'inclusion cesse d'être admissible — quand le niveau supérieur détruit l'autonomie du niveau inférieur et supprime sa possibilité de sortie — le système entre en régime pathologique.

C'est ce que la littérature sur les **transitions majeures de l'évolution** (Maynard Smith & Szathmáry, 1995) décrit dans le langage de la biologie : chaque saut d'individualité (du gène à la cellule, de la cellule à l'organisme, de l'organisme au groupe) a nécessité l'invention de mécanismes de médiation du conflit — apoptose, différenciation, division du travail, police interne. ThP formalise ce que ces auteurs décrivent de manière spécifique à chaque domaine.

---

## La stratégie « Pierre de Rosette »

Le sketch ThP suit la stratégie de Baez & Stay (2011) : plutôt que de construire des ponts directs entre domaines hétérogènes (ce qui impliquerait des engagements ontologiques : « les cellules sont comme des citoyens »), on définit une **théorie abstraite** et on vérifie que chaque domaine l'instancie indépendamment.

Si la biologie satisfait les définitions du sketch, et que la politique satisfait les mêmes définitions de manière indépendante, alors le parallèle entre cancer et totalitarisme n'est pas une analogie — c'est la satisfaction commune d'un même invariant formel.

L'avantage : on peut objecter « les cellules ne sont pas des citoyens » — mais c'est sans importance, parce que les définitions sont **agnostiques au domaine**. Ce qui compte, c'est : est-ce que le système satisfait les conditions formelles ou non ?

C'est ce qui distingue le sketch d'une simple métaphore interdisciplinaire. La métaphore dit « le totalitarisme ressemble au cancer ». Le sketch dit : « voici des conditions formelles de non-viabilité ; voici une preuve que le cancer les satisfait ; voici une preuve indépendante que le totalitarisme les satisfait ».

---

## Ce que le sketch ne dit pas (encore)

Le sketch est honnête sur ses limites :

**Ce qui est démontré** : les définitions sont bien formées, les (M,R)-systèmes de Rosen sont un modèle du sketch dans la catégorie Set, la distinction distribué/monopolistique est formellement établie.

**Ce qui est instancié** : le cancer biologique comme cas de prédation monopolistique, appuyé par la littérature empirique (Aktipis, Trigos, Michod).

**Ce qui est proposé** : l'extension au politique et à l'écologie. Supportée par des régularités historiques et écologiques robustes, mais la construction rigoureuse d'une « catégorie des agents sociaux » reste un chantier ouvert.

**Ce qui est programmatique** : la convergence entre les principes de viabilité et une grammaire libertarienne du droit de sortie. Forte mais pas fermée — nécessite des hypothèses normatives supplémentaires non encore formalisées.

Cette transparence épistémique — savoir exactement ce qui est prouvé et ce qui ne l'est pas — est peut-être la contribution méthodologique la plus importante du sketch.

---

*Ce texte est une introduction accessible aux idées développées dans le manuscrit categorical-sketch (Keo, 2026). Pour une présentation formelle et ses limites méthodologiques, se référer aux versions complètes.*
