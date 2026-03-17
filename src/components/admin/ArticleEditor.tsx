'use client';

import { useState, useEffect, useDeferredValue, memo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Eye, EyeOff, X, FileText, Loader2 } from 'lucide-react';
import MarkdownRenderer from '@/components/content/MarkdownRenderer';
import SaveIndicator from './SaveIndicator';
import { useBeforeUnload } from '@/hooks/useBeforeUnload';
import { useSaveShortcut } from '@/hooks/useSaveShortcut';
import { ComboboxInput } from './ComboboxInput';
import { TagInput } from './TagInput';
import { articleSchema, type ArticleFormData } from '@/lib/schemas/article';

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

// Helper functions to parse frontmatter values
function parseTitleFromContent(content: string): string {
  const match = content.match(/title:\s*["']?([^"'\n]+)["']?/);
  return match?.[1]?.trim() || '';
}

function parseDescriptionFromContent(content: string): string {
  const match = content.match(/description:\s*["']?([^"'\n]+)["']?/);
  return match?.[1]?.trim() || '';
}

function parseCategoryFromContent(content: string): string {
  const match = content.match(/category:\s*["']?([^"'\n]+)["']?/);
  return match?.[1]?.trim() || '';
}

function parseTagsFromContent(content: string): string[] {
  const match = content.match(/tags:\s*\[(.*?)\]/);
  if (!match) return [];
  return match[1]
    .split(',')
    .map((t) => t.trim().replace(/["']/g, ''))
    .filter(Boolean);
}

function parseAuthorFromContent(content: string): string {
  const match = content.match(/author:\s*["']?([^"'\n]+)["']?/);
  return match?.[1]?.trim() || '';
}

export default function ArticleEditor({
  initialContent = '',
  initialLocale = 'fr',
  initialPublished = false,
  articleId,
  onSave,
  onCancel,
}: ArticleEditorProps) {
  // Determine actual initial content
  const effectiveInitialContent = initialContent || (!articleId ? DEFAULT_TEMPLATE : '');

  const [rawContent, setRawContent] = useState(effectiveInitialContent);
  const [savedContent, setSavedContent] = useState(effectiveInitialContent);
  const [locale, setLocale] = useState(initialLocale);
  const [published, setPublished] = useState(initialPublished);
  const [showPreview, setShowPreview] = useState(false);

  // API data for metadata inputs
  const [categories, setCategories] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  // React Hook Form with Zod validation
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    mode: 'onBlur', // Validate on blur (FORM-01)
    defaultValues: {
      title: parseTitleFromContent(effectiveInitialContent),
      description: parseDescriptionFromContent(effectiveInitialContent),
      category: parseCategoryFromContent(effectiveInitialContent),
      tags: parseTagsFromContent(effectiveInitialContent),
      author: parseAuthorFromContent(effectiveInitialContent),
      content: effectiveInitialContent.replace(/^---[\s\S]*?---\n?/, '') || ' ', // Markdown body
    },
  });

  // Deferred content for preview - enables instant-feel typing while preview updates adaptively
  const deferredContent = useDeferredValue(rawContent);
  const isPreviewStale = rawContent !== deferredContent;
  const isDirty = rawContent !== savedContent;

  // Warn user before closing tab with unsaved changes
  useBeforeUnload(isDirty);

  // Extract markdown body from deferred content (strip frontmatter)
  const markdownBody = deferredContent.replace(/^---[\s\S]*?---\n?/, '');

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

  // Update frontmatter with new value - now returns updated content
  const updateFrontmatter = useCallback((content: string, key: string, value: string | string[]): string => {
    const valueStr = Array.isArray(value)
      ? `[${value.map((v) => `"${v}"`).join(', ')}]`
      : `"${value}"`;

    const regex = new RegExp(`(${key}:)\\s*.*`, 'g');

    if (content.match(regex)) {
      return content.replace(regex, `$1 ${valueStr}`);
    } else {
      // Add after first --- line if key doesn't exist
      return content.replace(/^(---\n)/, `$1${key}: ${valueStr}\n`);
    }
  }, []);

  // Handle form submission - must be async for isSubmitting to work (Pitfall 1)
  const onFormSubmit = async () => {
    // We use rawContent for actual save, form is for validation and metadata management
    await onSave({ rawContent, locale, published });
    setSavedContent(rawContent);
  };

  // Trigger save on Cmd+S (FORM-05)
  useSaveShortcut(() => handleSubmit(onFormSubmit)());

  // Handle title change - sync to rawContent frontmatter
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setRawContent((prev) => updateFrontmatter(prev, 'title', newTitle));
  }, [updateFrontmatter]);

  // Handle category change - sync to rawContent frontmatter
  const handleCategoryChange = useCallback((value: string) => {
    setValue('category', value);
    setRawContent((prev) => updateFrontmatter(prev, 'category', value));
  }, [setValue, updateFrontmatter]);

  // Handle tags change - sync to rawContent frontmatter
  const handleTagsChange = useCallback((tags: string[]) => {
    setValue('tags', tags);
    setRawContent((prev) => updateFrontmatter(prev, 'tags', tags));
  }, [setValue, updateFrontmatter]);

  // Parse current values from rawContent for display
  const currentCategory = parseCategoryFromContent(rawContent);
  const currentTags = parseTagsFromContent(rawContent);
  const currentTitle = parseTitleFromContent(rawContent);

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
    <div className="h-screen flex flex-col bg-paper">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={onCancel}
            className="p-2 text-ink-secondary hover:text-ink transition-colors"
          >
            <X size={20} />
          </button>
          <SaveIndicator isDirty={isDirty} />
          <h2 className="text-lg font-semibold text-ink">
            {articleId ? 'Modifier l\'article' : 'Nouvel article'}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Locale selector */}
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            className="bg-paper-depth border border-border rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-accent"
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
                : 'bg-paper-depth text-ink-secondary border border-border'
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
                ? 'bg-accent-light text-accent border border-accent/30'
                : 'bg-paper-depth text-ink-secondary border border-border'
            }`}
          >
            <FileText size={16} />
            Apercu
          </button>

          {/* Save button (FORM-04) */}
          <button
            type="button"
            onClick={() => handleSubmit(onFormSubmit)()}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>

      {/* Metadata section (FORM-03 fieldset) */}
      <fieldset className="border-b border-border p-4">
        <legend className="text-sm font-medium text-ink-secondary px-2 -ml-2 mb-3">
          Metadata
        </legend>
        <div className="flex gap-6">
          {/* Title input with validation (FORM-01, FORM-02) */}
          <div className="w-64">
            <label htmlFor="title" className="block text-sm font-medium text-ink mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register('title', {
                onChange: handleTitleChange,
              })}
              value={currentTitle}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
              className={`w-full px-3 py-2 bg-paper-depth border rounded-lg text-ink focus:outline-none ${
                errors.title ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'
              }`}
              placeholder="Article title"
            />
            {errors.title && (
              <p id="title-error" role="alert" className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          {/* Category with Controller */}
          <div className="w-64">
            <Controller
              control={control}
              name="category"
              render={({ field: { onBlur } }) => (
                <ComboboxInput
                  id="category"
                  label="Category"
                  value={currentCategory}
                  options={categories}
                  onChange={handleCategoryChange}
                  onBlur={onBlur}
                  placeholder="Select or enter category"
                />
              )}
            />
          </div>
          {/* Tags with Controller */}
          <div className="flex-1">
            <Controller
              control={control}
              name="tags"
              render={({ field: { onBlur } }) => (
                <TagInput
                  id="tags"
                  label="Tags"
                  value={currentTags}
                  suggestions={allTags}
                  onChange={handleTagsChange}
                  onBlur={onBlur}
                  placeholder="Add tags..."
                />
              )}
            />
          </div>
        </div>
      </fieldset>

      {/* Content area (FORM-03 fieldset) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <fieldset className={`flex-1 flex flex-col ${showPreview ? 'w-1/2' : 'w-full'}`}>
          <legend className="sr-only">Content</legend>
          <textarea
            value={rawContent}
            onChange={(e) => setRawContent(e.target.value)}
            className="flex-1 w-full p-6 bg-transparent text-ink font-mono text-sm resize-none focus:outline-none"
            placeholder="Collez votre markdown avec frontmatter ici..."
            spellCheck={false}
          />
        </fieldset>

        {/* Preview */}
        {showPreview && (
          <div
            className="w-1/2 border-l border-border overflow-auto p-6"
            style={{ opacity: isPreviewStale ? 0.7 : 1, transition: 'opacity 0.15s' }}
          >
            {frontmatter && (
              <div className="mb-6 p-4 bg-paper-depth rounded-lg">
                <h3 className="text-xs font-medium text-ink-secondary uppercase mb-3">Frontmatter</h3>
                <div className="space-y-2">
                  {Object.entries(frontmatter).map(([key, value]) => (
                    <div key={key} className="flex gap-2 text-sm">
                      <span className="text-accent">{key}:</span>
                      <span className="text-ink">{value}</span>
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
