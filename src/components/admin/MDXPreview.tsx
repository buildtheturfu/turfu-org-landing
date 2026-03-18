'use client';

import { useState, useEffect, useDeferredValue, useRef } from 'react';

interface MDXPreviewProps {
  source: string;
}

export default function MDXPreview({ source }: MDXPreviewProps) {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const deferredSource = useDeferredValue(source);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!deferredSource.trim()) {
      setHtml('');
      return;
    }

    // Cancel any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);

    fetch('/api/admin/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: deferredSource }),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setHtml(data.html || '');
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [deferredSource]);

  if (!source.trim()) {
    return (
      <div className="prose-turfu text-ink-secondary italic p-4">
        Apercu MDX...
      </div>
    );
  }

  return (
    <div
      className="prose-turfu"
      style={{ opacity: loading ? 0.7 : 1, transition: 'opacity 150ms' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
