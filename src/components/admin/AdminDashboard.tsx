'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, RefreshCw, Home, BookOpen } from 'lucide-react';
import Link from 'next/link';
import ArticleEditor from './ArticleEditor';

interface Article {
  id: string;
  slug: string;
  locale: string;
  title: string;
  description: string | null;
  category: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface AdminDashboardProps {
  locale: string;
}

export default function AdminDashboard({ locale }: AdminDashboardProps) {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterLocale, setFilterLocale] = useState<string>('all');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingContent, setEditingContent] = useState<string>('');

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = filterLocale === 'all'
        ? '/api/admin/articles'
        : `/api/admin/articles?locale=${filterLocale}`;
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 401) {
          router.push(`/${locale}/admin/login`);
          return;
        }
        throw new Error('Failed to fetch articles');
      }
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      setError('Erreur lors du chargement des articles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filterLocale, locale, router]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push(`/${locale}/admin/login`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet article ?')) return;

    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchArticles();
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  const handleEdit = async (article: Article) => {
    // Fetch full article content
    try {
      const res = await fetch(`/api/admin/articles?locale=${article.locale}`);
      const articles = await res.json();
      const fullArticle = articles.find((a: Article) => a.id === article.id);

      // Reconstruct raw content with frontmatter
      const frontmatter = [
        '---',
        `title: "${fullArticle.title}"`,
        fullArticle.description ? `description: "${fullArticle.description}"` : null,
        fullArticle.category ? `category: "${fullArticle.category}"` : null,
        fullArticle.tags?.length ? `tags: [${fullArticle.tags.map((t: string) => `"${t}"`).join(', ')}]` : null,
        fullArticle.author ? `author: "${fullArticle.author}"` : null,
        '---',
        '',
        fullArticle.content || '',
      ].filter(Boolean).join('\n');

      setEditingContent(frontmatter);
      setEditingArticle(fullArticle);
    } catch (err) {
      alert('Erreur lors du chargement de l\'article');
    }
  };

  const handleSave = async (data: { rawContent: string; locale: string; published: boolean }) => {
    try {
      const url = editingArticle
        ? `/api/admin/articles/${editingArticle.id}`
        : '/api/admin/articles';
      const method = editingArticle ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save');
      }

      setEditingArticle(null);
      setIsCreating(false);
      setEditingContent('');
      fetchArticles();
    } catch (err: any) {
      alert(err.message || 'Erreur lors de l\'enregistrement');
    }
  };

  const handleCancel = () => {
    setEditingArticle(null);
    setIsCreating(false);
    setEditingContent('');
  };

  // Show editor if creating or editing
  if (isCreating || editingArticle) {
    return (
      <ArticleEditor
        initialContent={editingContent}
        initialLocale={editingArticle?.locale || locale}
        initialPublished={editingArticle?.published || false}
        articleId={editingArticle?.id}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="min-h-screen bg-turfu-dark p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-white">Admin - Articles</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 px-3 py-2 text-turfu-muted hover:text-white transition-colors"
              title="Retour au site"
            >
              <Home size={18} />
            </Link>
            <Link
              href={`/${locale}/content`}
              className="flex items-center gap-2 px-3 py-2 text-turfu-muted hover:text-white transition-colors"
              title="Voir le contenu"
            >
              <BookOpen size={18} />
            </Link>
            <button
              onClick={fetchArticles}
              className="p-2 text-turfu-muted hover:text-white transition-colors"
              title="Actualiser"
            >
              <RefreshCw size={20} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-turfu-muted hover:text-white transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 p-4 bg-white/5 rounded-lg">
          <div className="flex items-center gap-4">
            <label className="text-sm text-turfu-muted">Filtrer par langue:</label>
            <select
              value={filterLocale}
              onChange={(e) => setFilterLocale(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-turfu-accent"
            >
              <option value="all">Toutes</option>
              <option value="fr">Francais</option>
              <option value="en">English</option>
              <option value="tr">Turkce</option>
            </select>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-turfu-accent text-black rounded-lg text-sm font-medium hover:bg-turfu-accent/90 transition-colors"
          >
            <Plus size={18} />
            Nouvel article
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-12 text-turfu-muted">
            Chargement...
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 text-turfu-muted">
            Aucun article trouve. Creez votre premier article !
          </div>
        ) : (
          /* Articles table */
          <div className="bg-white/5 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-sm font-medium text-turfu-muted">Titre</th>
                  <th className="text-left p-4 text-sm font-medium text-turfu-muted">Langue</th>
                  <th className="text-left p-4 text-sm font-medium text-turfu-muted">Categorie</th>
                  <th className="text-left p-4 text-sm font-medium text-turfu-muted">Statut</th>
                  <th className="text-left p-4 text-sm font-medium text-turfu-muted">Date</th>
                  <th className="text-right p-4 text-sm font-medium text-turfu-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <div>
                        <div className="text-white font-medium">{article.title}</div>
                        <div className="text-xs text-turfu-muted">{article.slug}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs bg-white/10 rounded">
                        {article.locale.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-turfu-muted">
                      {article.category || '-'}
                    </td>
                    <td className="p-4">
                      {article.published ? (
                        <span className="flex items-center gap-1 text-green-400 text-sm">
                          <Eye size={14} /> Public
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-turfu-muted text-sm">
                          <EyeOff size={14} /> Brouillon
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-turfu-muted">
                      {new Date(article.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(article)}
                          className="p-2 text-turfu-muted hover:text-turfu-accent transition-colors"
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-2 text-turfu-muted hover:text-red-400 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
