import type { MDXComponents } from 'mdx/types';

function QuoteBlock({ children, cite }: { children: React.ReactNode; cite?: string }) {
  return (
    <blockquote className="border-l-4 border-accent pl-6 my-8 italic text-ink-secondary">
      {children}
      {cite && <footer className="mt-2 text-caption not-italic">— {cite}</footer>}
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
  // Standard HTML overrides — editorial journal style
  h1: (props) => (
    <h1
      {...props}
      className="font-display text-[2rem] md:text-[2.5rem] text-ink mt-16 mb-6 leading-[1.15] tracking-tight border-b border-border pb-4"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      className="font-display text-[1.5rem] md:text-[1.75rem] text-ink mt-12 mb-4 leading-[1.2]"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="font-display text-[1.25rem] md:text-[1.375rem] text-ink mt-8 mb-3 leading-[1.3]"
    />
  ),
  h4: (props) => <h4 {...props} className="text-lg font-semibold text-ink mt-6 mb-2" />,
  p: (props) => (
    <p
      {...props}
      className="text-body text-ink leading-[1.8] mb-5 text-justify hyphens-auto"
    />
  ),
  a: (props) => (
    <a
      {...props}
      className="text-accent hover:text-accent-hover underline underline-offset-2 decoration-accent/30 hover:decoration-accent transition-colors"
    />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-4 border-accent/40 pl-6 pr-2 my-8 italic text-ink-secondary leading-[1.7] bg-paper-warm/50 py-4 rounded-r"
    />
  ),
  code: (props) => (
    <code
      {...props}
      className="font-mono text-body-sm bg-paper-warm px-1.5 py-0.5 rounded text-accent"
    />
  ),
  pre: (props) => (
    <pre
      {...props}
      className="font-mono text-body-sm bg-paper-depth p-4 rounded-lg my-6 overflow-x-auto"
    />
  ),
  ul: (props) => (
    <ul
      {...props}
      className="list-disc list-outside ml-6 mb-5 space-y-2 text-body text-ink leading-[1.7]"
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className="list-decimal list-outside ml-6 mb-5 space-y-2 text-body text-ink leading-[1.7]"
    />
  ),
  li: (props) => <li {...props} className="text-body text-ink leading-[1.7] pl-1" />,
  hr: () => (
    <hr className="border-none my-12 flex justify-center before:content-['✦'] before:text-ink-tertiary before:text-lg before:tracking-[0.5em]" />
  ),
  strong: (props) => <strong {...props} className="font-semibold text-ink" />,
  em: (props) => <em {...props} className="italic text-ink" />,
  table: (props) => (
    <div className="overflow-x-auto my-8 rounded-lg border border-border">
      <table {...props} className="w-full text-body-sm" />
    </div>
  ),
  thead: (props) => <thead {...props} className="bg-paper-warm" />,
  th: (props) => (
    <th
      {...props}
      className="text-left font-semibold text-ink text-caption uppercase tracking-wider border-b border-border px-4 py-3"
    />
  ),
  td: (props) => (
    <td
      {...props}
      className="text-ink border-b border-border/50 px-4 py-3 leading-snug"
    />
  ),
  tr: (props) => <tr {...props} className="hover:bg-paper-warm/50 transition-colors" />,
};
