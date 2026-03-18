import type { MDXComponents } from 'mdx/types';

function QuoteBlock({ children, cite }: { children: React.ReactNode; cite?: string }) {
  return (
    <blockquote className="border-l-4 border-accent pl-6 my-8 italic text-ink-secondary">
      {children}
      {cite && <footer className="mt-2 text-caption not-italic">-- {cite}</footer>}
    </blockquote>
  );
}

function InfoBox({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'note' }) {
  const styles = {
    info: 'bg-layer-1-light border-layer-1',
    warning: 'bg-layer-2-light border-layer-2',
    note: 'bg-paper-warm border-border',
  };
  return (
    <div className={`border-l-4 ${styles[type]} p-4 my-6 rounded-r`}>
      {children}
    </div>
  );
}

function LayerBadge({ layer }: { layer: 0 | 1 | 2 }) {
  const config = {
    0: { label: 'Layer 0 - Fondations', className: 'bg-layer-0-light text-layer-0' },
    1: { label: 'Layer 1 - Coordination', className: 'bg-layer-1-light text-layer-1' },
    2: { label: 'Layer 2 - Interfaces', className: 'bg-layer-2-light text-layer-2' },
  };
  const { label, className } = config[layer];
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-caption font-medium ${className}`}>
      {label}
    </span>
  );
}

function Figure({ src, alt, caption }: { src: string; alt?: string; caption?: string }) {
  return (
    <figure className="my-8">
      <img src={src} alt={alt || caption || ''} className="rounded-lg w-full" />
      {caption && (
        <figcaption className="mt-2 text-center text-caption text-ink-secondary">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export const mdxComponents: MDXComponents = {
  // Custom components
  QuoteBlock,
  InfoBox,
  LayerBadge,
  Figure,
  // Standard HTML overrides
  h1: (props) => <h1 {...props} className="font-display text-4xl text-ink mt-12 mb-4" />,
  h2: (props) => <h2 {...props} className="font-display text-3xl text-ink mt-10 mb-3" />,
  h3: (props) => <h3 {...props} className="font-display text-2xl text-ink mt-8 mb-2" />,
  h4: (props) => <h4 {...props} className="text-lg font-semibold text-ink mt-6 mb-2" />,
  p: (props) => <p {...props} className="text-body text-ink leading-relaxed mb-4" />,
  a: (props) => <a {...props} className="text-accent hover:text-accent-hover underline underline-offset-2" />,
  blockquote: (props) => <blockquote {...props} className="border-l-4 border-border pl-6 my-6 italic text-ink-secondary" />,
  code: (props) => <code {...props} className="font-mono text-body-sm bg-paper-warm px-1.5 py-0.5 rounded" />,
  pre: (props) => <pre {...props} className="font-mono text-body-sm bg-paper-depth p-4 rounded-lg my-6 overflow-x-auto" />,
  ul: (props) => <ul {...props} className="list-disc list-outside ml-6 mb-4 space-y-1 text-body text-ink" />,
  ol: (props) => <ol {...props} className="list-decimal list-outside ml-6 mb-4 space-y-1 text-body text-ink" />,
  li: (props) => <li {...props} className="text-body text-ink leading-relaxed" />,
  hr: () => <hr className="border-border my-10" />,
  table: (props) => <div className="overflow-x-auto my-6"><table {...props} className="w-full text-body" /></div>,
  th: (props) => <th {...props} className="text-left font-semibold text-ink border-b border-border pb-2 pr-4" />,
  td: (props) => <td {...props} className="text-ink border-b border-border py-2 pr-4" />,
};
