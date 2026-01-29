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
