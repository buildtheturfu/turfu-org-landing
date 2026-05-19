# TURFu OS · Doc Charter — pointer

Ce projet peut produire des notes PDF longues format en utilisant la **charte typo-graphique TURFu OS v1**.

## Localisation canonique

`/Users/ekitcho/Desktop/dev-claude-lab/turfu-lib/_meta/doc-charter/`

## Usage

```bash
# Copier la charte dans ce projet (one-shot)
cp -R /Users/ekitcho/Desktop/dev-claude-lab/turfu-lib/_meta/doc-charter ./_charter

# Démarrer une nouvelle note
cp ./_charter/template.html ./deliverables/ma-note/index.html
# (créer le dossier deliverables/ma-note si nécessaire)

# Adapter les placeholders {{...}} dans index.html
# (titre, auteur, destinataire, programme, mouvements, biblio, colophon)

# Générer le PDF
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer --no-margins \
  --print-to-pdf="ma-note.pdf" \
  --virtual-time-budget=10000 \
  "file://$(pwd)/deliverables/ma-note/index.html"
```

## Référence v1

Document fondateur : *« Orch OR & Interprétation Conceptualiste — Note pour Yan Eperon »* (Conceptuality, 19 mai 2026). Voir `_charter/example/` après copie.

## Composants disponibles

- Couverture brandée (auteur, destinataire, programme, format)
- Part-openers numérotés (Mouvement I, II, III…)
- Sections h2 avec barre or, h3, h4
- Lèdes avec drop cap navy
- Encarts `.insight` (constat, avertissement, renversement)
- Citations `.quote-block` (filet navy, attribution)
- Tableaux `.compare` (2–4 colonnes, lignes alternées)
- Ornements de fin de section, bibliographie `.refs`, colophon signé

## Personnalisation par projet

Trois éléments à ajuster dans `index.html` (ou en `<style>` overlay) :

```css
@page {
  @top-left { content: "TURFu · {NOM_DU_PROGRAMME}"; }
  @top-right { content: "{TITRE_COURT_DU_DOCUMENT}"; }
}
```

Et la `.cover-top .brand` + bloc Programme dans la couverture.

Le reste demeure uniforme — c'est ce qui donne la cohérence visuelle TURFU d'un programme à l'autre.

---

*Pointer généré le 19 mai 2026. Pour évolutions, voir `turfu-lib/_meta/doc-charter/README.md`.*
