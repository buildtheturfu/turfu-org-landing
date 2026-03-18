'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  RefreshCw,
  Home,
  BookOpen,
  ArrowUp,
  Archive,
  RotateCcw,
} from 'lucide-react';
import Link from 'next/link';
import type { Publication } from '@/lib/types';
import PublicationEditor from './PublicationEditor';

type StatusFilter = 'all' | 'draft' | 'published' | 'archived';

interface PublicationDashboardProps {
  locale: string;
}

const STATUS_BADGE: Record<Publication['status'], string> = {
  draft: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  archived: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
};

const STATUS_LABEL: Record<Publication['status'], string> = {
  draft: 'Brouillon',
  published: 'Publie',
  archived: 'Archive',
};

export default function PublicationDashboard({ locale }: PublicationDashboardProps) {
  const router = useRouter();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchPublications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/publications');
      if (!res.ok) {
        if (res.status === 401) {
          router.push(`/${locale}/admin/login`);
          return;
        }
        throw new Error('Failed to fetch publications');
      }
      const response = await res.json();
      setPublications(response.data || []);
    } catch {
      setError('Erreur lors du chargement des publications');
    } finally {
      setLoading(false);
    }
  }, [locale, router]);

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push(`/${locale}/admin/login`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette publication ?')) return;
    try {
      const res = await fetch(`/api/admin/publications/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchPublications();
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  const handleStatusToggle = async (pub: Publication) => {
    const nextStatus: Record<Publication['status'], Publication['status']> = {
      draft: 'published',
      published: 'archived',
      archived: 'published',
    };
    const newStatus = nextStatus[pub.status];
    try {
      const res = await fetch(`/api/admin/publications/${pub.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      fetchPublications();
    } catch {
      alert('Erreur lors du changement de statut');
    }
  };

  const filtered = publications.filter(
    (p) => statusFilter === 'all' || p.status === statusFilter
  );

  const countByStatus = (s: StatusFilter) =>
    s === 'all'
      ? publications.length
      : publications.filter((p) => p.status === s).length;

  // Render PublicationEditor for create/edit flows
  if (isCreating) {
    return (
      <PublicationEditor
        locale={locale}
        onSaved={() => { setIsCreating(false); fetchPublications(); }}
        onCancel={() => setIsCreating(false)}
      />
    );
  }

  if (editingId) {
    const editingPublication = publications.find((p) => p.id === editingId);
    if (editingPublication) {
      return (
        <PublicationEditor
          locale={locale}
          publication={editingPublication}
          onSaved={() => { setEditingId(null); fetchPublications(); }}
          onCancel={() => setEditingId(null)}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-paper px-4 py-6 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-ink">Admin - Publications</h1>
          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 px-3 py-2 text-ink-secondary hover:text-ink transition-colors"
              title="Retour au site"
            >
              <Home size={18} />
            </Link>
            <Link
              href={`/${locale}/publications`}
              className="flex items-center gap-2 px-3 py-2 text-ink-secondary hover:text-ink transition-colors"
              title="Voir les publications"
            >
              <BookOpen size={18} />
            </Link>
            <button
              onClick={fetchPublications}
              className="p-2 text-ink-secondary hover:text-ink transition-colors"
              title="Actualiser"
            >
              <RefreshCw size={20} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-ink-secondary hover:text-ink transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Status filter tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1 p-1 bg-paper-depth rounded-lg overflow-x-auto">
            {(['all', 'draft', 'published', 'archived'] as StatusFilter[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  statusFilter === s
                    ? 'bg-paper text-ink font-medium shadow-sm'
                    : 'text-ink-secondary hover:text-ink'
                }`}
              >
                {s === 'all'
                  ? 'Tous'
                  : s === 'draft'
                    ? 'Brouillons'
                    : s === 'published'
                      ? 'Publies'
                      : 'Archives'}{' '}
                ({countByStatus(s)})
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            <Plus size={18} />
            Nouvelle publication
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="text-center py-12 text-ink-secondary">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-ink-secondary">
            {publications.length === 0
              ? 'Aucune publication trouvee. Creez votre premiere publication !'
              : 'Aucune publication pour ce filtre.'}
          </div>
        ) : (
          <div className="bg-paper-depth rounded-lg overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-ink-secondary">
                    Titre
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-ink-secondary">
                    Discipline
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-ink-secondary">
                    Statut
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-ink-secondary">
                    Date
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-ink-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((pub) => (
                  <tr
                    key={pub.id}
                    className="border-b border-border hover:bg-paper-warm"
                  >
                    <td className="p-4">
                      <div>
                        <div className="text-ink font-medium">{pub.title}</div>
                        <div className="text-xs text-ink-secondary">{pub.slug}</div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-ink-secondary">
                      {pub.discipline || '-'}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${STATUS_BADGE[pub.status]}`}
                      >
                        {STATUS_LABEL[pub.status]}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-ink-secondary">
                      {new Date(pub.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingId(pub.id)}
                          className="p-2 text-ink-secondary hover:text-accent transition-colors"
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleStatusToggle(pub)}
                          className="p-2 text-ink-secondary hover:text-accent transition-colors"
                          title={
                            pub.status === 'draft'
                              ? 'Publier'
                              : pub.status === 'published'
                                ? 'Archiver'
                                : 'Republier'
                          }
                        >
                          {pub.status === 'draft' ? (
                            <ArrowUp size={16} />
                          ) : pub.status === 'published' ? (
                            <Archive size={16} />
                          ) : (
                            <RotateCcw size={16} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(pub.id)}
                          className="p-2 text-ink-secondary hover:text-red-400 transition-colors"
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
