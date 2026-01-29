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
          <h1 id={id as string} className="text-3xl font-bold mt-8 mb-4 text-white">
            {children}
          </h1>
        ),
        h2: ({ children, id }) => (
          <h2 id={id as string} className="text-2xl font-bold mt-8 mb-4 text-white scroll-mt-20">
            {children}
          </h2>
        ),
        h3: ({ children, id }) => (
          <h3 id={id as string} className="text-xl font-semibold mt-6 mb-3 text-white scroll-mt-20">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-semibold mt-4 mb-2 text-white">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="text-white/80 leading-relaxed mb-4">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-outside ml-6 mb-4 text-white/80 space-y-1">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-outside ml-6 mb-4 text-white/80 space-y-1">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-turfu-accent pl-4 my-4 text-white/70 italic">
            {children}
          </blockquote>
        ),
        code: ({ className, children }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-white/10 text-turfu-accent px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          }
          return (
            <code className={`${className} font-mono text-sm`}>{children}</code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-turfu-darker border border-white/10 rounded-lg p-4 overflow-x-auto mb-4 text-sm">
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
                className="text-turfu-accent hover:text-turfu-accent2 underline underline-offset-2 transition-colors"
              >
                {children}
              </a>
            );
          }
          return (
            <Link
              href={href || '#'}
              className="text-turfu-accent hover:text-turfu-accent2 underline underline-offset-2 transition-colors"
            >
              {children}
            </Link>
          );
        },
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-white/10 rounded-lg overflow-hidden">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-white/5">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left font-semibold text-white border-b border-white/10">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-white/80 border-b border-white/5">
            {children}
          </td>
        ),
        hr: () => <hr className="border-white/10 my-8" />,
        strong: ({ children }) => (
          <strong className="font-semibold text-white">{children}</strong>
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
