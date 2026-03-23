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
  versions: ResearchVersion[];
  audits: ResearchAudit[];
  hasVulgarisation: boolean;
  hasGenese: boolean;
  hasDocuments: boolean;
}

export const researchPapers: ResearchPaper[] = [
  {
    slug: 'antifascisme-ontologique',
    title: "L'Antifascisme Ontologique",
    subtitle: 'Des conditions de viabilité de la coopération multi-niveaux à la nécessité structurelle du droit de sortie',
    authors: [
      { name: 'Christopher Keo', role: 'author' },
      { name: 'Claude Opus 4', role: 'ai-collaborator' },
    ],
    status: 'working-paper',
    discipline: 'Philosophie politique',
    tags: ['ThP', 'autopoïèse', 'viabilité', 'exit', 'coopération multi-niveaux', 'théorie des catégories'],
    targetJournal: 'Systems Research and Behavioral Science (Wiley)',
    externalUrl: 'https://nlaw.vercel.app/recherche/antifascisme-ontologique',
    versions: [
      { version: '0.1', date: '2026-03-01', status: 'Brouillon interne' },
      { version: '0.2', date: '2026-03-05', status: 'Brouillon interne', scores: { architecture: 7, robustesse: 4.5 } },
      { version: '1.0', date: '2026-03-10', status: 'Working paper', scores: { architecture: 8.5, robustesse: 8 } },
      { version: '1.1', date: '2026-03-13', status: 'Working paper', scores: { architecture: 8.5, robustesse: 8 } },
      { version: '1.2', date: '2026-03-17', status: 'Working paper', scores: { architecture: 8.5, robustesse: 8 } },
      { version: '1.3', date: '2026-03-22', status: 'Publication-ready', scores: { architecture: 9, robustesse: 9 } },
    ],
    audits: [
      {
        reviewer: 'Gemini 3',
        slug: 'gemini-review',
        label: 'Audit Gemini',
        verdict: 'Transforme le libertarianisme radical en exigence de santé cybernétique.',
        scores: { formalisme: 8, instantiation_bio: 7, extension_politique: 6 },
      },
      {
        reviewer: 'Claude Opus 4.6',
        slug: 'opus-review',
        label: 'Audit Opus v1.3',
        verdict: 'Contribution authentique — conjecture structurée de haute qualité.',
        scores: { formalisme: 8, instantiation_bio: 7, extension_politique: 6, conclusion_libertarienne: 5 },
      },
    ],
    hasVulgarisation: true,
    hasGenese: true,
    hasDocuments: true,
  },
  {
    slug: 'categorical-sketch',
    title: 'A Categorical Sketch for Viability',
    subtitle: 'Formalizing the Structural Invariants of Self-Organizing Systems',
    authors: [
      { name: 'Christopher Keo', role: 'author' },
      { name: 'Claude Opus 4', role: 'ai-collaborator' },
    ],
    status: 'submitted',
    discipline: 'Biologie théorique',
    tags: ['théorie des catégories', 'viabilité', 'systèmes (M,R)', 'autopoïèse', 'Rosen', 'sketch catégoriel'],
    targetJournal: 'BioSystems (Elsevier)',
    externalUrl: 'https://nlaw.vercel.app/recherche/categorical-sketch',
    versions: [
      { version: '1.0', date: '2026-01-15', status: 'Brouillon interne', scores: { architecture: 6, formalisation: 7 } },
      { version: '1.1', date: '2026-02-10', status: 'Brouillon interne', scores: { architecture: 8.5, formalisation: 8.5 } },
      { version: '2.0-bio', date: '2026-03-15', status: 'Soumis', scores: { architecture: 8.5, formalisation: 8.5 } },
      { version: '2.0-ready', date: '2026-03-20', status: 'Soumis (BIOSYS-D-26-00374)' },
    ],
    audits: [
      {
        reviewer: 'Peter G',
        slug: 'peter-g-review',
        label: 'Audit Peter G',
        verdict: 'Formalisation catégorielle authentique et non-triviale d\'un invariant de viabilité.',
        scores: { formalisme: 8.5, noyau_math: 7, instantiation_bio: 6.5 },
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
