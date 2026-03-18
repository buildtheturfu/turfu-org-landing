export interface Article {
  id: string;
  slug: string;
  locale: string;
  title: string;
  description: string | null;
  content: string;
  category: string | null;
  tags: string[];
  author: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ArticleMeta {
  id: string;
  slug: string;
  locale: string;
  title: string;
  description: string | null;
  category: string | null;
  tags: string[];
  author: string | null;
  created_at: string;
  reading_time: string;
}

export interface ParsedFrontmatter {
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  author?: string;
}

export interface Publication {
  id: string;
  slug: string;
  locale: string;
  title: string;
  abstract: string | null;
  body: string;
  author: string | null;
  discipline: string | null;
  type: string | null;
  layer: number | null;
  tags: string[];
  featured_image: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PublicationMeta {
  id: string;
  slug: string;
  locale: string;
  title: string;
  abstract: string | null;
  author: string | null;
  discipline: string | null;
  type: string | null;
  layer: number | null;
  tags: string[];
  featured_image: string | null;
  published_at: string | null;
}
