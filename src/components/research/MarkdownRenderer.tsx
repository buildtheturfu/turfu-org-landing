import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-stone max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-ink-secondary prose-strong:text-ink prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:bg-paper-warm prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-ink prose-pre:bg-paper-warm prose-pre:text-ink prose-blockquote:border-accent prose-blockquote:text-ink-secondary prose-blockquote:not-italic prose-table:text-body-sm prose-th:bg-paper-warm prose-th:text-ink prose-td:border-border prose-li:text-ink-secondary">
      <ReactMarkdown
        components={{
          a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith('http');
            const isAnchor = href?.startsWith('#');
            if (isExternal || isAnchor) {
              return (
                <a href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined} {...props}>
                  {children}
                </a>
              );
            }
            // Internal MD link → Next Link
            const cleanHref = href?.replace(/\.md$/, '').replace(/^\.\//, '') ?? '#';
            return (
              <Link href={cleanHref} {...props}>
                {children}
              </Link>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
