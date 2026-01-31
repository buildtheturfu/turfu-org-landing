'use client';

import { useState, useEffect, useDeferredValue, memo } from 'react';
import { Save, Eye, EyeOff, X, FileText } from 'lucide-react';
import MarkdownRenderer from '@/components/content/MarkdownRenderer';
import SaveIndicator from './SaveIndicator';
import { useBeforeUnload } from '@/hooks/useBeforeUnload';
import { ComboboxInput } from './ComboboxInput';
import { TagInput } from './TagInput';

// Memoized preview component - must be outside ArticleEditor function
// WHY memo: Without memo, useDeferredValue has no effect - parent re-render forces child re-render regardless of props
const MemoizedMarkdownRenderer = memo(MarkdownRenderer);

interface ArticleEditorProps {
  initialContent?: string;
  initialLocale?: string;
  initialPublished?: boolean;
  articleId?: string;
  onSave: (data: { rawContent: string; locale: string; published: boolean }) => Promise<void>;
  onCancel: () => void;
}

const DEFAULT_TEMPLATE = `---
title: "Titre de l'article"
description: "Description courte"
category: "guide"
tags: ["tag1", "tag2"]
author: "Auteur"
---

# Introduction

Votre contenu ici...

## Section 1

Texte de la section...

## Section 2

Autre contenu...
`;

export default function ArticleEditor({
  initialContent = '',
  initialLocale = 'fr',
  initialPublished = false,
  articleId,
  onSave,
  onCancel,
}: ArticleEditorProps) {
  const [rawContent, setRawContent] = useState(initialContent);
  const [savedContent, setSavedContent] = useState(initialContent);
  const [locale, setLocale] = useState(initialLocale);
  const [published, setPublished] = useState(initialPublished);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // API data for metadata inputs
  const [categories, setCategories] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Deferred content for preview - enables instant-feel typing while preview updates adaptively
  const deferredContent = useDeferredValue(rawContent);
  const isPreviewStale = rawContent !== deferredContent;
  const isDirty = rawContent !== savedContent;

  // Warn user before closing tab with unsaved changes
  useBeforeUnload(isDirty);

  // Extract markdown body from deferred content (strip frontmatter)
  const markdownBody = deferredContent.replace(/^---[\s\S]*?---\n?/, '');

  useEffect(() => {
    if (!initialContent && !articleId) {
      setRawContent(DEFAULT_TEMPLATE);
      setSavedContent(DEFAULT_TEMPLATE);
    }
  }, [initialContent, articleId]);

  // Fetch metadata options on mount
  useEffect(() => {
    // Fetch categories
    fetch('/api/admin/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.data);
      });

    // Fetch tags
    fetch('/api/admin/tags')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAllTags(data.data);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ rawContent, locale, published });
      setSavedContent(rawContent);
    } finally {
      setSaving(false);
    }
  };

  // Parse category from frontmatter
  const currentCategory = (() => {
    const match = rawContent.match(/category:\s*["']?([^"'\n]+)["']?/);
    return match?.[1]?.trim() || '';
  })();

  // Parse tags from frontmatter
  const currentTags = (() => {
    const match = rawContent.match(/tags:\s*\[(.*?)\]/);
    if (!match) return [];
    return match[1]
      .split(',')
      .map((t) => t.trim().replace(/["']/g, ''))
      .filter(Boolean);
  })();

  // Update frontmatter with new value
  const updateFrontmatter = (key: string, value: string | string[]) => {
    const valueStr = Array.isArray(value)
      ? `[${value.map((v) => `"${v}"`).join(', ')}]`
      : `"${value}"`;

    const regex = new RegExp(`(${key}:)\\s*.*`, 'g');

    if (rawContent.match(regex)) {
      setRawContent(rawContent.replace(regex, `$1 ${valueStr}`));
    } else {
      // Add after first --- line if key doesn't exist
      setRawContent(rawContent.replace(/^(---\n)/, `$1${key}: ${valueStr}\n`));
    }
  };

  // Parse frontmatter for preview
  const parseFrontmatter = () => {
    const match = deferredContent.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;

    const lines = match[1].split('\n');
    const data: Record<string, string> = {};

    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
        // Remove quotes
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        data[key] = value;
      }
    }
    return data;
  };

  const frontmatter = parseFrontmatter();

  return (
    <div className="h-screen flex flex-col bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={onCancel}
            className="p-2 text-foreground-muted hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
          <SaveIndicator isDirty={isDirty} />
          <h2 className="text-lg font-semibold text-foreground">
            {articleId ? 'Modifier l\'article' : 'Nouvel article'}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Locale selector */}
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            className="bg-overlay border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-turfu-accent"
          >
            <option value="fr">Francais</option>
            <option value="en">English</option>
            <option value="tr">Turkce</option>
          </select>

          {/* Published toggle */}
          <button
            onClick={() => setPublished(!published)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              published
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-overlay text-foreground-muted border border-border'
            }`}
          >
            {published ? <Eye size={16} /> : <EyeOff size={16} />}
            {published ? 'Public' : 'Brouillon'}
          </button>

          {/* Preview toggle */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              showPreview
                ? 'bg-turfu-accent/20 text-turfu-accent border border-turfu-accent/30'
                : 'bg-overlay text-foreground-muted border border-border'
            }`}
          >
            <FileText size={16} />
            Apercu
          </button>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-turfu-accent text-black rounded-lg text-sm font-medium hover:bg-turfu-accent/90 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>

      {/* Metadata section */}
      <div className="border-b border-border p-4 flex gap-6">
        <div className="w-64">
          <ComboboxInput
            id="category"
            label="Category"
            value={currentCategory}
            options={categories}
            onChange={(value) => updateFrontmatter('category', value)}
            placeholder="Select or enter category"
          />
        </div>
        <div className="flex-1">
          <TagInput
            id="tags"
            label="Tags"
            value={currentTags}
            suggestions={allTags}
            onChange={(tags) => updateFrontmatter('tags', tags)}
            placeholder="Add tags..."
          />
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div className={`flex-1 flex flex-col ${showPreview ? 'w-1/2' : 'w-full'}`}>
          <textarea
            value={rawContent}
            onChange={(e) => setRawContent(e.target.value)}
            className="flex-1 w-full p-6 bg-transparent text-foreground font-mono text-sm resize-none focus:outline-none"
            placeholder="Collez votre markdown avec frontmatter ici..."
            spellCheck={false}
          />
        </div>

        {/* Preview */}
        {showPreview && (
          <div
            className="w-1/2 border-l border-border overflow-auto p-6"
            style={{ opacity: isPreviewStale ? 0.7 : 1, transition: 'opacity 0.15s' }}
          >
            {frontmatter && (
              <div className="mb-6 p-4 bg-overlay rounded-lg">
                <h3 className="text-xs font-medium text-foreground-muted uppercase mb-3">Frontmatter</h3>
                <div className="space-y-2">
                  {Object.entries(frontmatter).map(([key, value]) => (
                    <div key={key} className="flex gap-2 text-sm">
                      <span className="text-turfu-accent">{key}:</span>
                      <span className="text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="prose-turfu">
              <MemoizedMarkdownRenderer content={markdownBody} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
