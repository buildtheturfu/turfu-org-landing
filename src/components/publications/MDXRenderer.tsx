import { renderMDX } from '@/lib/mdx';

interface MDXRendererProps {
  body: string;
}

export async function MDXRenderer({ body }: MDXRendererProps) {
  if (!body || body.trim() === '') {
    return (
      <div className="text-ink-secondary italic text-body">
        Pas de contenu disponible.
      </div>
    );
  }

  try {
    const content = await renderMDX(body);
    return <div className="mdx-content">{content}</div>;
  } catch (error) {
    console.error('MDX compilation error:', error);
    return (
      <div className="text-layer-2 bg-layer-2-light border border-layer-2 rounded p-4 text-body">
        Erreur de compilation du contenu MDX.
      </div>
    );
  }
}
