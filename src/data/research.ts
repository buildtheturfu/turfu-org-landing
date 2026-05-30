export interface ResearchVersion {
  version: string;
  date: string;
  status: string;
  scores?: Record<string, number>;
}

export interface ResearchAudit {
  reviewer: string;
  slug: string;
  label: string;
  verdict: string;
  scores?: Record<string, number>;
}

export interface ResearchPaper {
  slug: string;
  title: string;
  subtitle: string;
  authors: { name: string; role: 'author' | 'ai-collaborator' | 'reviewer' }[];
  status: 'draft' | 'working-paper' | 'submitted' | 'published';
  discipline: string;
  tags: string[];
  targetJournal?: string;
  externalUrl?: string;
  doiUrl?: string;
  shareLinkUrl?: string;
  shareLinkExpires?: string;
  submissionUuid?: string;
  submissionDate?: string;
  publishedDate?: string;
  citation?: string;
  versions: ResearchVersion[];
  audits: ResearchAudit[];
  hasVulgarisation: boolean;
  hasGenese: boolean;
  hasDocuments: boolean;
}

export const researchPapers: ResearchPaper[] = [
  {
    slug: 'categorical-sketch',
    title: 'A Categorical Sketch for Viability',
    subtitle: 'Formalising the structural invariants of self-organising systems',
    authors: [
      { name: 'Christopher Keo', role: 'author' },
      { name: 'Claude Opus 4', role: 'ai-collaborator' },
    ],
    status: 'published',
    discipline: 'Biologie théorique / théorie des catégories',
    tags: ['théorie des catégories', 'viabilité', 'systèmes (M,R)', 'autopoïèse', 'Rosen', 'sketch catégoriel', 'BioSystems', 'Elsevier'],
    targetJournal: 'BioSystems (Elsevier)',
    publishedDate: '2026-05-19',
    doiUrl: 'https://doi.org/10.1016/j.biosystems.2026.105811',
    shareLinkUrl: 'https://authors.elsevier.com/sd/article/S0303-2647(26)00121-8',
    shareLinkExpires: '2026-07-08',
    citation: 'Keo, C. (2026). A categorical sketch for viability: Formalising the structural invariants of self-organising systems. BioSystems, 265, 105811.',
    externalUrl: 'https://nlaw.vercel.app/recherche/categorical-sketch',
    versions: [
      { version: '1.0', date: '2026-01-15', status: 'Brouillon interne', scores: { architecture: 6, formalisation: 7 } },
      { version: '1.1', date: '2026-02-10', status: 'Brouillon interne', scores: { architecture: 8.5, formalisation: 8.5 } },
      { version: '2.0', date: '2026-03-15', status: 'Soumission initiale BioSystems', scores: { architecture: 8.5, formalisation: 8.5 } },
      { version: '3.0', date: '2026-03-21', status: 'BIOSYS-D-26-00374 soumis', scores: { architecture: 9, formalisation: 9 } },
      { version: '3.5', date: '2026-04-30', status: 'Révision majeure (R1) — v0.4.13', scores: { architecture: 9, formalisation: 9.5 } },
      { version: '0.4.13', date: '2026-05-06', status: 'Accepté (un round R&R)', scores: { architecture: 9, formalisation: 9.5 } },
      { version: 'final', date: '2026-05-19', status: 'Publié — Vol. 265, art. 105811', scores: { architecture: 9.5, formalisation: 9.5 } },
    ],
    audits: [
      {
        reviewer: 'Peter G',
        slug: 'peter-memo',
        label: 'Audit Peter G (hostile-reviewer)',
        verdict: 'Formalisation catégorielle authentique et non-triviale d\'un invariant de viabilité.',
        scores: { formalisme: 8.5, noyau_math: 7, instantiation_bio: 6.5 },
      },
      {
        reviewer: 'Claude Opus 4.6',
        slug: 'opus-review',
        label: 'Audit Opus (vérification formelle)',
        verdict: 'Typage cohérent après correction Φ ev-based. Définitions A.1–A.3 vérifiées.',
        scores: { formalisme: 9, cohérence_interne: 9.5, instantiation_bio: 8 },
      },
      {
        reviewer: 'BioSystems Reviewer 3',
        slug: 'r3-biosystems',
        label: 'Reviewer R3 (BioSystems, ajouté par éditeur)',
        verdict: 'New important insights into the foundations of theoretical biology.',
      },
    ],
    hasVulgarisation: true,
    hasGenese: true,
    hasDocuments: true,
  },
  {
    slug: 'antifascisme-ontologique',
    title: 'Relational Exit as a Structural Condition of Viability',
    subtitle: 'in Multi-Level Cooperative Systems (B1 — Systems Research and Behavioral Science)',
    authors: [
      { name: 'Christopher Keo', role: 'author' },
      { name: 'Claude Opus 4', role: 'ai-collaborator' },
    ],
    status: 'submitted',
    discipline: 'Sciences des systèmes / cybernétique organisationnelle',
    tags: ['ThP', 'autopoïèse', 'viabilité', 'exit relationnel', 'coopération multi-niveaux', 'théorie des catégories', 'SRBS', 'Wiley', 'CST'],
    targetJournal: 'Systems Research and Behavioral Science (Wiley)',
    submissionDate: '2026-05-29',
    submissionUuid: 'e1903d9e-3037-4974-980e-c06eab660067',
    citation: 'Keo, C. (2026, submitted). Relational exit as a structural condition of viability in multi-level cooperative systems. Systems Research and Behavioral Science.',
    externalUrl: 'https://nlaw.vercel.app/recherche/antifascisme-ontologique',
    versions: [
      { version: '0.1', date: '2026-03-01', status: 'Essai original "Antifascisme Ontologique"', scores: { architecture: 6, robustesse: 5 } },
      { version: '1.0', date: '2026-03-10', status: 'Working paper', scores: { architecture: 8.5, robustesse: 8 } },
      { version: '1.3', date: '2026-03-22', status: 'Publication-ready (essai final)', scores: { architecture: 9, robustesse: 9 } },
      { version: 'B1', date: '2026-03-22', status: 'Bifurcation académique B1 (SRBS)', scores: { architecture: 9, formalisation: 8.5 } },
      { version: 'v3.1', date: '2026-05-08', status: 'Corrections Peter G v3', scores: { architecture: 9, formalisation: 9 } },
      { version: 'v3.1.1', date: '2026-05-09', status: 'Validé submission-ready (Peter G)', scores: { architecture: 9, formalisation: 9.5 } },
      { version: 'v3.1.2', date: '2026-05-29', status: 'Soumis Wiley SRBS', scores: { architecture: 9.5, formalisation: 9.5 } },
    ],
    audits: [
      {
        reviewer: 'Peter G',
        slug: 'peter-g-srbs',
        label: 'Audit Peter G (post-soumission, 2026-05-30)',
        verdict: 'Trajectoire majoritaire = major revision constructive (35–50%). Conversion conditionnelle 55–70%.',
        scores: { probabilité_accept: 3, force_argument: 9, robustesse_R_and_R: 8.5 },
      },
      {
        reviewer: 'Claude Opus 4.7',
        slug: 'opus-review-b1',
        label: 'Audit adversarial v3.1.2 (1M context)',
        verdict: 'Ready-to-submit. Régression check sur 4 insertions Tier 1 : aucun blocker.',
        scores: { cohérence: 9.5, refs_SRBS_fit: 9, manuscrit_blind_clean: 10 },
      },
      {
        reviewer: 'Gemini 3',
        slug: 'gemini-review',
        label: 'Audit Gemini (essai v1.3)',
        verdict: 'Transforme le libertarianisme radical en exigence de santé cybernétique.',
        scores: { formalisme: 8, instantiation_bio: 7, extension_politique: 6 },
      },
    ],
    hasVulgarisation: true,
    hasGenese: true,
    hasDocuments: true,
  },
];

export function getResearchPaperBySlug(slug: string): ResearchPaper | undefined {
  return researchPapers.find((p) => p.slug === slug);
}
