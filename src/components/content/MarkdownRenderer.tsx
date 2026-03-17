'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import Link from 'next/link';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={{
        h1: ({ children, id }) => (
          <h1 id={id as string} className="text-display-1 font-display font-bold mt-8 mb-4 text-ink">
            {children}
          </h1>
        ),
        h2: ({ children, id }) => (
          <h2 id={id as string} className="text-display-2 font-display font-bold mt-8 mb-4 text-ink scroll-mt-20">
            {children}
          </h2>
        ),
        h3: ({ children, id }) => (
          <h3 id={id as string} className="text-heading-3 font-medium mt-6 mb-3 text-ink scroll-mt-20">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-heading-4 font-medium mt-4 mb-2 text-ink">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="text-ink-secondary leading-relaxed mb-4">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-outside ml-6 mb-4 text-ink-secondary space-y-1">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-outside ml-6 mb-4 text-ink-secondary space-y-1">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-accent pl-4 my-4 text-ink-secondary italic">
            {children}
          </blockquote>
        ),
        code: ({ className, children }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-paper-depth text-accent px-1.5 py-0.5 rounded text-code font-mono">
                {children}
              </code>
            );
          }
          return (
            <code className={`${className} font-mono text-code`}>{children}</code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-paper-depth border border-border rounded-lg p-4 overflow-x-auto mb-4 text-sm font-mono">
            {children}
          </pre>
        ),
        a: ({ href, children }) => {
          const isExternal = href?.startsWith('http');
          if (isExternal) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
              >
                {children}
              </a>
            );
          }
          return (
            <Link
              href={href || '#'}
              className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
            >
              {children}
            </Link>
          );
        },
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-border rounded-lg overflow-hidden">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-paper-depth">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left font-semibold text-ink border-b border-border">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-ink-secondary border-b border-border">
            {children}
          </td>
        ),
        hr: () => <hr className="border-border my-8" />,
        strong: ({ children }) => (
          <strong className="font-semibold text-ink">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        img: ({ src, alt }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || ''}
            className="rounded-lg max-w-full h-auto my-4"
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
