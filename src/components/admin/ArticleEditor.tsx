'use client';

import { useState, useEffect } from 'react';
import { Save, Eye, EyeOff, X, FileText } from 'lucide-react';

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
  const [locale, setLocale] = useState(initialLocale);
  const [published, setPublished] = useState(initialPublished);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!initialContent && !articleId) {
      setRawContent(DEFAULT_TEMPLATE);
    }
  }, [initialContent, articleId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ rawContent, locale, published });
    } finally {
      setSaving(false);
    }
  };

  // Parse frontmatter for preview
  const parseFrontmatter = () => {
    const match = rawContent.match(/^---\n([\s\S]*?)\n---/);
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
    <div className="h-full flex flex-col bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={onCancel}
            className="p-2 text-foreground-muted hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
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
          <div className="w-1/2 border-l border-border overflow-auto p-6">
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
              <div className="text-foreground-muted text-sm">
                (Apercu du contenu markdown...)
              </div>
              <pre className="mt-4 text-xs text-foreground/70 whitespace-pre-wrap">
                {rawContent.replace(/^---[\s\S]*?---\n/, '')}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
