import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { updateArticle, deleteArticle, parseMarkdownWithFrontmatter, generateSlug } from '@/lib/articles';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { rawContent, locale, published } = await request.json();
    const { frontmatter, content } = parseMarkdownWithFrontmatter(rawContent);

    const updates: Record<string, any> = {
      content,
      locale,
      published,
    };

    if (frontmatter.title) {
      updates.title = frontmatter.title;
      updates.slug = generateSlug(frontmatter.title);
    }
    if (frontmatter.description !== undefined) updates.description = frontmatter.description;
    if (frontmatter.category !== undefined) updates.category = frontmatter.category;
    if (frontmatter.tags !== undefined) updates.tags = frontmatter.tags;
    if (frontmatter.author !== undefined) updates.author = frontmatter.author;

    const article = await updateArticle(params.id, updates);
    return NextResponse.json(article);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await deleteArticle(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
