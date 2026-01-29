import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { createArticle, getAdminArticles, generateSlug, parseMarkdownWithFrontmatter } from '@/lib/articles';

export async function GET(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || undefined;

  try {
    const articles = await getAdminArticles(locale);
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { rawContent, locale, published } = await request.json();

    // Parse frontmatter
    const { frontmatter, content } = parseMarkdownWithFrontmatter(rawContent);

    // Validate required fields
    if (!frontmatter.title) {
      return NextResponse.json({ error: 'Title is required in frontmatter' }, { status: 400 });
    }

    // Generate slug from title
    const slug = generateSlug(frontmatter.title);

    // Create article
    const article = await createArticle({
      slug,
      locale,
      title: frontmatter.title,
      description: frontmatter.description || null,
      content,
      category: frontmatter.category || null,
      tags: frontmatter.tags || [],
      author: frontmatter.author || null,
      published: published ?? false,
    });

    return NextResponse.json(article);
  } catch (error: any) {
    console.error('Error creating article:', error);
    if (error.code === '23505') {
      return NextResponse.json({ error: 'An article with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
