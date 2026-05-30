import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

// Strip "node" from props (react-markdown leaks internal AST node)
function clean<T extends { node?: unknown }>(props: T): Omit<T, 'node'> {
  const { node, ...rest } = props;
  void node;
  return rest;
}

const components: Components = {
  h1: ({ children, ...props }) => (
    <h1
      {...clean(props)}
      className="font-display text-3xl md:text-4xl text-ink leading-tight mt-12 mb-4 first:mt-0"
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      {...clean(props)}
      className="font-display text-2xl md:text-3xl text-ink leading-tight mt-12 mb-4 pb-2 border-b border-border"
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...clean(props)} className="font-display text-xl text-ink leading-snug mt-8 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      {...clean(props)}
      className="font-semibold text-body text-ink mt-6 mb-2 uppercase tracking-wider"
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p {...clean(props)} className="text-body text-ink-secondary leading-relaxed my-4">
      {children}
    </p>
  ),
  strong: ({ children, ...props }) => (
    <strong {...clean(props)} className="font-semibold text-ink">
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em {...clean(props)} className="italic text-ink">
      {children}
    </em>
  ),
  a: ({ href, children, ...props }) => {
    const cleaned = clean(props);
    const isExternal = href?.startsWith('http');
    const isAnchor = href?.startsWith('#');
    const classes =
      'text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent transition-colors';
    if (isExternal) {
      return (
        <a {...cleaned} href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    if (isAnchor) {
      return (
        <a {...cleaned} href={href} className={classes}>
          {children}
        </a>
      );
    }
    const cleanHref = (href ?? '#').replace(/\.md$/, '').replace(/^\.\//, '');
    return (
      <Link href={cleanHref} className={classes}>
        {children}
      </Link>
    );
  },
  ul: ({ children, ...props }) => (
    <ul
      {...clean(props)}
      className="list-disc list-outside ml-6 my-4 space-y-2 text-ink-secondary marker:text-accent"
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      {...clean(props)}
      className="list-decimal list-outside ml-6 my-4 space-y-2 text-ink-secondary marker:text-accent marker:font-mono"
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li {...clean(props)} className="text-body leading-relaxed pl-1">
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      {...clean(props)}
      className="border-l-4 border-accent pl-5 my-6 text-ink-secondary not-italic bg-accent-light/20 py-3 rounded-r-md"
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }) => {
    const cleaned = clean(props);
    const isInline = !className;
    if (isInline) {
      return (
        <code
          {...cleaned}
          className="px-1.5 py-0.5 bg-paper-warm text-ink rounded text-code font-mono border border-border"
        >
          {children}
        </code>
      );
    }
    return (
      <code {...cleaned} className={`font-mono text-code text-ink ${className}`}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      {...clean(props)}
      className="bg-paper-warm border border-border rounded-lg p-4 my-6 overflow-x-auto text-code leading-relaxed"
    >
      {children}
    </pre>
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table {...clean(props)} className="w-full text-body-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead {...clean(props)} className="bg-paper-warm border-b border-border">
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => <tbody {...clean(props)}>{children}</tbody>,
  th: ({ children, ...props }) => (
    <th
      {...clean(props)}
      className="px-4 py-2.5 text-left font-semibold text-ink text-caption uppercase tracking-wider"
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      {...clean(props)}
      className="px-4 py-2.5 text-ink-secondary border-t border-border align-top"
    >
      {children}
    </td>
  ),
  tr: ({ children, ...props }) => (
    <tr {...clean(props)} className="hover:bg-paper-warm/50 transition-colors">
      {children}
    </tr>
  ),
  hr: ({ ...props }) => <hr {...clean(props)} className="my-10 border-border" />,
  img: ({ src, alt, ...props }) => (
    // Local images in MD content — Next/Image not needed since they're static
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...clean(props)}
      src={src}
      alt={alt ?? ''}
      className="my-6 rounded-lg border border-border max-w-full h-auto"
    />
  ),
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="max-w-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
