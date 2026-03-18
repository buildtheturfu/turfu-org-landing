'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { publicationSchema, type PublicationFormData } from '@/lib/schemas/publication';
import type { Publication } from '@/lib/types';
import { ComboboxInput } from './ComboboxInput';
import { TagInput } from './TagInput';
import MDXPreview from './MDXPreview';

interface PublicationEditorProps {
  locale: string;
  publication?: Publication;
  onSaved: () => void;
  onCancel: () => void;
}

const DISCIPLINE_OPTIONS = ['urbanisme', 'economie', 'technologie', 'philosophie', 'design'];
const TYPE_OPTIONS = ['analyse', 'audit', 'specification', 'essai', 'note'];

export default function PublicationEditor({
  locale,
  publication,
  onSaved,
  onCancel,
}: PublicationEditorProps) {
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<PublicationFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(publicationSchema) as any,
    defaultValues: publication
      ? {
          title: publication.title,
          slug: publication.slug,
          abstract: publication.abstract || '',
          body: publication.body,
          author: publication.author || '',
          discipline: publication.discipline || '',
          type: (publication.type as PublicationFormData['type']) || undefined,
          layer: publication.layer ?? undefined,
          tags: publication.tags || [],
          featured_image: publication.featured_image || '',
          locale: publication.locale as PublicationFormData['locale'],
          status: publication.status,
        }
      : {
          title: '',
          abstract: '',
          body: '',
          author: '',
          discipline: '',
          tags: [],
          featured_image: '',
          locale: locale as PublicationFormData['locale'],
          status: 'draft',
        },
  });

  const bodyValue = watch('body');

  const onSubmit = async (data: PublicationFormData) => {
    setSaving(true);
    try {
      const url = publication
        ? `/api/admin/publications/${publication.id}`
        : '/api/admin/publications';
      const method = publication ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erreur lors de la sauvegarde');
      }
      onSaved();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-ink">
            {publication ? `Modifier: ${publication.title}` : 'Nouvelle publication'}
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-ink-secondary hover:text-ink transition-colors"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={saving || !isDirty}
              className="px-5 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left column: Main content (2/3) */}
            <div className="lg:w-2/3 space-y-4">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-ink mb-1">
                  Titre
                </label>
                <input
                  id="title"
                  type="text"
                  {...register('title')}
                  className="w-full px-3 py-2 bg-paper-depth border border-border rounded-lg text-ink focus:outline-none focus:border-accent"
                  placeholder="Titre de la publication"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Abstract */}
              <div>
                <label htmlFor="abstract" className="block text-sm font-medium text-ink mb-1">
                  Resume
                </label>
                <textarea
                  id="abstract"
                  rows={3}
                  {...register('abstract')}
                  className="w-full px-3 py-2 bg-paper-depth border border-border rounded-lg text-ink focus:outline-none focus:border-accent resize-y"
                  placeholder="Resume court de la publication"
                />
              </div>

              {/* MDX Body */}
              <div>
                <label htmlFor="body" className="block text-sm font-medium text-ink mb-1">
                  Contenu MDX
                </label>
                <textarea
                  id="body"
                  rows={20}
                  {...register('body')}
                  className="w-full px-3 py-2 bg-paper-depth border border-border rounded-lg text-ink font-mono text-sm focus:outline-none focus:border-accent resize-y"
                  placeholder="Ecrivez votre contenu en MDX..."
                />
                {errors.body && (
                  <p className="text-red-400 text-sm mt-1">{errors.body.message}</p>
                )}
              </div>

              {/* MDX Preview */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-ink">Apercu</span>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-sm text-ink-secondary hover:text-ink transition-colors"
                  >
                    {showPreview ? 'Masquer' : 'Afficher'}
                  </button>
                </div>
                {showPreview && (
                  <div className="border border-border rounded-lg p-4 bg-paper-depth min-h-[100px]">
                    <MDXPreview source={bodyValue || ''} />
                  </div>
                )}
              </div>
            </div>

            {/* Right column: Metadata (1/3) */}
            <div className="lg:w-1/3 space-y-4">
              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold text-ink mb-2">Metadonnees</legend>

                {/* Discipline */}
                <Controller
                  name="discipline"
                  control={control}
                  render={({ field }) => (
                    <ComboboxInput
                      id="discipline"
                      label="Discipline"
                      value={field.value || ''}
                      options={DISCIPLINE_OPTIONS}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="Choisir..."
                    />
                  )}
                />

                {/* Type */}
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <ComboboxInput
                      id="type"
                      label="Type"
                      value={field.value || ''}
                      options={TYPE_OPTIONS}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="Choisir..."
                      allowCustom={false}
                    />
                  )}
                />

                {/* Layer */}
                <Controller
                  name="layer"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label htmlFor="layer" className="block text-sm font-medium text-ink mb-1">
                        Layer
                      </label>
                      <select
                        id="layer"
                        value={field.value !== undefined && field.value !== null ? String(field.value) : ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === '' ? undefined : parseInt(val, 10));
                        }}
                        onBlur={field.onBlur}
                        className="w-full px-3 py-2 bg-paper-depth border border-border rounded-lg text-ink focus:outline-none focus:border-accent"
                      >
                        <option value="">Aucun</option>
                        <option value="0">Layer 0 — Fondation</option>
                        <option value="1">Layer 1 — Infrastructure</option>
                        <option value="2">Layer 2 — Interface</option>
                      </select>
                    </div>
                  )}
                />

                {/* Tags */}
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <TagInput
                      id="tags"
                      label="Tags"
                      value={field.value || []}
                      suggestions={[]}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="Ajouter un tag..."
                    />
                  )}
                />

                {/* Locale */}
                <div>
                  <label htmlFor="locale" className="block text-sm font-medium text-ink mb-1">
                    Langue
                  </label>
                  <select
                    id="locale"
                    {...register('locale')}
                    className="w-full px-3 py-2 bg-paper-depth border border-border rounded-lg text-ink focus:outline-none focus:border-accent"
                  >
                    <option value="fr">Francais</option>
                    <option value="en">English</option>
                    <option value="tr">Turkce</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-ink mb-1">
                    Statut
                  </label>
                  <select
                    id="status"
                    {...register('status')}
                    className="w-full px-3 py-2 bg-paper-depth border border-border rounded-lg text-ink focus:outline-none focus:border-accent"
                  >
                    <option value="draft">Brouillon</option>
                    <option value="published">Publie</option>
                    <option value="archived">Archive</option>
                  </select>
                </div>

                {/* Featured image */}
                <div>
                  <label htmlFor="featured_image" className="block text-sm font-medium text-ink mb-1">
                    Image mise en avant
                  </label>
                  <input
                    id="featured_image"
                    type="text"
                    {...register('featured_image')}
                    className="w-full px-3 py-2 bg-paper-depth border border-border rounded-lg text-ink focus:outline-none focus:border-accent"
                    placeholder="https://..."
                  />
                  {errors.featured_image && (
                    <p className="text-red-400 text-sm mt-1">{errors.featured_image.message}</p>
                  )}
                </div>

                {/* Author */}
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-ink mb-1">
                    Auteur
                  </label>
                  <input
                    id="author"
                    type="text"
                    {...register('author')}
                    className="w-full px-3 py-2 bg-paper-depth border border-border rounded-lg text-ink focus:outline-none focus:border-accent"
                    placeholder="Nom de l'auteur"
                  />
                </div>
              </fieldset>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
