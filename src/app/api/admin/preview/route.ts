import { NextResponse } from 'next/server';
import { renderToStaticMarkup } from 'react-dom/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { mdxComponents } from '@/components/publications/MDXComponents';
import { isAuthenticated } from '@/lib/auth';
import {
  withErrorHandler,
  errorResponse,
} from '@/lib/error-handler';

export const POST = withErrorHandler(async (request: Request) => {
  if (!isAuthenticated()) {
    return errorResponse('Non autorise', 'UNAUTHORIZED', 401);
  }

  const { source } = await request.json();

  if (!source || typeof source !== 'string' || source.trim() === '') {
    return NextResponse.json({ html: '' });
  }

  try {
    const { content } = await compileMDX({
      source,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        },
      },
      components: mdxComponents,
    });

    const html = renderToStaticMarkup(content);
    return NextResponse.json({ html });
  } catch {
    return NextResponse.json({
      html: '<p style="color: var(--color-ink-secondary);">Erreur de syntaxe MDX</p>',
    });
  }
});
