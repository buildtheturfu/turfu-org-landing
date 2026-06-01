import type { MDXComponents } from 'mdx/types';

function QuoteBlock({ children, cite }: { children: React.ReactNode; cite?: string }) {
  return (
    <blockquote className="border-l-2 border-gold pl-6 my-10 font-display italic text-xl text-ink-secondary leading-snug">
      {children}
      {cite && (
        <footer className="mt-4 text-caption font-mono uppercase tracking-wider not-italic text-ink-tertiary">
          — {cite}
        </footer>
      )}
    </blockquote>
  );
}

function InfoBox({
  children,
  type = 'info',
}: {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'note';
}) {
  const styles = {
    info: 'border-accent bg-accent-light/30',
    warning: 'border-gold bg-gold-light/30',
    note: 'border-rule bg-paper-warm/50',
  };
  return (
    <div className={`border-l-2 ${styles[type]} px-5 py-4 my-8`}>{children}</div>
  );
}

function LayerBadge({ layer }: { layer: 0 | 1 | 2 }) {
  const labels: Record<0 | 1 | 2, string> = {
    0: 'Layer 0 — Fondations',
    1: 'Layer 1 — Coordination',
    2: 'Layer 2 — Interfaces',
  };
  return (
    <span className="inline-block px-3 py-1 border border-accent text-accent rounded-sm text-caption font-mono uppercase tracking-wider">
      {labels[layer]}
    </span>
  );
}

function Figure({ src, alt, caption }: { src: string; alt?: string; caption?: string }) {
  return (
    <figure className="my-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt || caption || ''} className="w-full border border-rule-soft" />
      {caption && (
        <figcaption className="mt-3 text-center text-caption font-mono italic text-ink-tertiary">
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
      className="font-display text-[2.25rem] md:text-[2.75rem] text-ink mt-16 mb-6 leading-[1.05] border-b border-rule pb-4"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      className="font-display text-[1.75rem] md:text-[2rem] text-ink mt-14 mb-4 leading-[1.1] pb-2 border-b border-rule-soft"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="font-display text-[1.375rem] md:text-[1.5rem] text-ink mt-10 mb-3 leading-[1.2]"
    />
  ),
  h4: (props) => (
    <h4
      {...props}
      className="font-mono text-caption uppercase tracking-[0.18em] text-accent mt-8 mb-2"
    />
  ),
  p: (props) => (
    <p
      {...props}
      className="text-body text-ink-secondary leading-[1.8] mb-5 break-words"
    />
  ),
  a: (props) => (
    <a
      {...props}
      className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-gold transition-colors break-words"
    />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-2 border-gold pl-6 my-10 font-display italic text-xl text-ink-secondary leading-snug not-italic"
    />
  ),
  code: (props) => (
    <code
      {...props}
      className="font-mono text-code bg-paper-warm border border-rule-soft px-1.5 py-0.5 rounded-sm text-ink break-words"
    />
  ),
  pre: (props) => (
    <pre
      {...props}
      className="font-mono text-code bg-paper-warm border border-rule-soft p-5 my-8 max-w-full overflow-x-auto"
    />
  ),
  ul: (props) => (
    <ul
      {...props}
      className="list-disc list-outside ml-6 mb-5 space-y-2 text-body text-ink-secondary leading-[1.7] marker:text-gold"
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className="list-decimal list-outside ml-6 mb-5 space-y-2 text-body text-ink-secondary leading-[1.7] marker:text-gold marker:font-mono"
    />
  ),
  li: (props) => <li {...props} className="text-body text-ink-secondary leading-[1.7] pl-1" />,
  hr: () => (
    <hr className="border-none my-14 flex justify-center before:content-['✦'] before:text-gold before:text-lg before:tracking-[0.5em]" />
  ),
  strong: (props) => <strong {...props} className="font-semibold text-ink" />,
  em: (props) => <em {...props} className="italic text-ink" />,
  table: (props) => (
    <div className="max-w-full overflow-x-auto my-8 border border-rule-soft -mx-4 sm:mx-0">
      <table {...props} className="w-full text-body-sm" />
    </div>
  ),
  thead: (props) => (
    <thead {...props} className="bg-paper-warm border-b border-rule-soft" />
  ),
  th: (props) => (
    <th
      {...props}
      className="text-left font-semibold text-ink text-caption uppercase tracking-[0.14em] px-4 py-3"
    />
  ),
  td: (props) => (
    <td
      {...props}
      className="text-ink-secondary border-t border-rule-soft px-4 py-3 leading-snug align-top"
    />
  ),
  tr: (props) => (
    <tr {...props} className="hover:bg-paper-warm/40 transition-colors" />
  ),
};
