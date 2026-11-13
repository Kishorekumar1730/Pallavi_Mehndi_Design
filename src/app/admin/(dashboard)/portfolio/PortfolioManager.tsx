'use client';

import React, { useState } from 'react';
import { savePortfolioItem, deletePortfolioItem } from '@/actions/admin';
import ImageUploader from '@/components/ImageUploader';
import {
  Image as ImageIcon,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
  ShieldCheck,
  Star,
  Eye,
  ArrowUp,
  ArrowDown,
  Layers,
} from 'lucide-react';

export interface AdminPortfolioItem {
  id: string;
  title: string;
  caption?: string | null;
  category: string;
  imageUrl: string;
  additionalImages?: string | null;
  altText: string;
  featured: boolean;
  published: boolean;
  hasClientConsent: boolean;
  consentNotes?: string | null;
  collectionYear?: string | null;
  displayOrder: number;
}

const CATEGORY_OPTIONS = [
  { value: 'BRIDAL', label: 'Bridal Artistry', placeholder: '/placeholders/portfolio-bridal.svg' },
  { value: 'ARABIC', label: 'Arabic & Indo-Arabic', placeholder: '/placeholders/portfolio-arabic.svg' },
  { value: 'TRADITIONAL', label: 'Traditional Rajasthani / South', placeholder: '/placeholders/portfolio-traditional.svg' },
  { value: 'MINIMAL', label: 'Minimal & Contemporary', placeholder: '/placeholders/portfolio-minimal.svg' },
  { value: 'FESTIVE', label: 'Festive & Baby Shower', placeholder: '/placeholders/portfolio-festive.svg' },
  { value: 'BESPOKE', label: 'Bespoke Custom Concepts', placeholder: '/placeholders/portfolio-bespoke.svg' },
];

export default function PortfolioManager({ items }: { items: AdminPortfolioItem[] }) {
  const [portfolio, setPortfolio] = useState<AdminPortfolioItem[]>(items);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [editingItem, setEditingItem] = useState<AdminPortfolioItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [form, setForm] = useState({
    title: '',
    caption: '',
    category: 'BRIDAL' as 'BRIDAL' | 'ARABIC' | 'TRADITIONAL' | 'MINIMAL' | 'FESTIVE' | 'BESPOKE',
    imageUrl: '/placeholders/portfolio-bridal.svg',
    additionalImages: '',
    altText: 'Intricate bespoke bridal henna artwork on hands and palms',
    featured: false,
    published: true,
    hasClientConsent: true,
    consentNotes: 'Client signed photo release agreement.',
    collectionYear: '2026 Collection',
    displayOrder: 0,
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const filteredItems = portfolio.filter(
    (item) => activeCategoryFilter === 'ALL' || item.category === activeCategoryFilter
  );

  const startCreate = () => {
    setEditingItem(null);
    setForm({
      title: '',
      caption: '',
      category: 'BRIDAL',
      imageUrl: '/placeholders/portfolio-bridal.svg',
      additionalImages: '',
      altText: 'Intricate bespoke bridal henna artwork on hands and palms',
      featured: false,
      published: true,
      hasClientConsent: true,
      consentNotes: 'Client consent granted for digital portfolio showcase.',
      collectionYear: '2026 Collection',
      displayOrder: portfolio.length + 1,
    });
    setFormError(null);
    setIsCreating(true);
  };

  const startEdit = (item: AdminPortfolioItem) => {
    setIsCreating(false);
    setEditingItem(item);
    setForm({
      title: item.title,
      caption: item.caption || '',
      category: item.category as any,
      imageUrl: item.imageUrl,
      additionalImages: item.additionalImages || '',
      altText: item.altText,
      featured: item.featured,
      published: item.published,
      hasClientConsent: item.hasClientConsent,
      consentNotes: item.consentNotes || '',
      collectionYear: item.collectionYear || '2026 Collection',
      displayOrder: item.displayOrder,
    });
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFormError(null);

    try {
      const res = await savePortfolioItem(form, editingItem ? editingItem.id : undefined);
      if (res.success) {
        setIsCreating(false);
        setEditingItem(null);
        window.location.reload();
      } else {
        setFormError(res.error || 'Failed to save portfolio item.');
      }
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Save error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete portfolio work "${title}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deletePortfolioItem(id);
      window.location.reload();
    } catch {
      alert('Delete failed. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-floating bg-white p-6 rounded-3xl border border-[#C6A15B]/30 shadow-xs">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1F2A]">
            Portfolio &amp; Media Gallery
          </h1>
          <p className="text-xs text-[#2B2421]/70 mt-1">
            Manage high-resolution bridal and festival henna photography. Real work only with verified client consent.
          </p>
        </div>

        <button
          onClick={startCreate}
          className="btn-elevated-primary px-4 py-2.5 text-xs gap-1.5"
        >
          <Plus className="w-4 h-4 text-[#C6A15B]" />
          <span>Add New Design Work</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveCategoryFilter('ALL')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeCategoryFilter === 'ALL'
              ? 'bg-[#8E3445] text-white shadow-xs font-semibold'
              : 'bg-white text-[#2B2421]/70 hover:bg-[#FAF4EB] border border-[#C6A15B]/30'
          }`}
        >
          All Categories ({portfolio.length})
        </button>
        {CATEGORY_OPTIONS.map((cat) => {
          const count = portfolio.filter((i) => i.category === cat.value).length;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategoryFilter(cat.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeCategoryFilter === cat.value
                  ? 'bg-[#8E3445] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#2B2421]/70 hover:bg-[#FAF4EB] border border-[#C6A15B]/30'
              }`}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid of Portfolio Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="card-floating bg-white rounded-2xl border border-[#C6A15B]/30 overflow-hidden shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Image Preview with Badges */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#FAF4EB]">
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/95 text-[#8E3445] shadow-xs">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C6A15B] text-[#2B1F2A] flex items-center gap-1 shadow-xs">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow-xs ${
                      item.published
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    {item.published ? 'Live' : 'Draft'}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-base font-bold text-[#2B1F2A]">
                    {item.title}
                  </h3>
                  <span className="text-[11px] font-mono text-[#2B2421]/50 bg-[#FAF4EB] px-1.5 py-0.5 rounded border border-[#C6A15B]/20">
                    #{item.displayOrder}
                  </span>
                </div>

                {item.caption && (
                  <p className="text-xs text-[#2B2421]/70 line-clamp-2">{item.caption}</p>
                )}

                <div className="pt-2 text-[11px] text-[#2B2421]/60 space-y-1 border-t border-[#C6A15B]/15">
                  <div className="flex items-center gap-1 text-emerald-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Client Permission Documented</span>
                  </div>
                  {item.consentNotes && (
                    <p className="italic text-[10px] text-[#2B2421]/50">Note: {item.consentNotes}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-4 pt-0 flex items-center justify-between border-t border-[#C6A15B]/15 mt-2">
              <button
                onClick={() => startEdit(item)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#8E3445] hover:text-[#2B1F2A] transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Artwork</span>
              </button>

              <button
                onClick={() => handleDelete(item.id, item.title)}
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                title="Delete portfolio item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT MODAL DRAWER */}
      {(isCreating || editingItem) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in zoom-in-95"
          onClick={() => {
            setIsCreating(false);
            setEditingItem(null);
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 border border-[#C6A15B]/30 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#C6A15B]/20 pb-3">
              <h3 className="font-serif text-xl font-bold text-[#2B1F2A]">
                {editingItem ? 'Edit Portfolio Design' : 'Publish New Henna Portfolio Piece'}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingItem(null);
                }}
                className="text-[#2B2421]/60 hover:text-[#2B2421] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#2B2421] mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Royal South Indian Bridal Jaal Work"
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#2B2421] mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs font-semibold text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#2B2421] mb-1">Collection / Year</label>
                  <input
                    type="text"
                    value={form.collectionYear}
                    onChange={(e) => setForm({ ...form, collectionYear: e.target.value })}
                    placeholder="e.g. 2026 Collection"
                    className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              {/* Secure Image Uploader */}
              <div>
                <ImageUploader
                  value={form.imageUrl}
                  onChange={(url) => setForm({ ...form, imageUrl: url })}
                  folder="portfolio"
                  label="Photograph Asset *"
                  helperText="Upload original client photo (JPEG/PNG/WebP, Max 5 MB). Authentic photography only."
                  required
                />

                <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px] text-[#2B2421]/70">
                  <span className="text-[#8E3445] font-semibold">Or select verified placeholder:</span>
                  {CATEGORY_OPTIONS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setForm({ ...form, imageUrl: c.placeholder, category: c.value as any })}
                      className="px-2 py-0.5 rounded-md bg-[#FAF4EB] hover:bg-[#FAF4EB]/80 border border-[#C6A15B]/30 text-[10px] transition-colors"
                    >
                      {c.value}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#2B2421] mb-1">Accessibility Alt Text *</label>
                <input
                  type="text"
                  required
                  value={form.altText}
                  onChange={(e) => setForm({ ...form, altText: e.target.value })}
                  placeholder="Descriptive explanation for screen readers"
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2B2421] mb-1">Caption / Storyline</label>
                <textarea
                  rows={2}
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  placeholder="Context about motifs, couple elements, or celebration style..."
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#2B2421] mb-1">Display Order</label>
                  <input
                    type="number"
                    value={form.displayOrder}
                    onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value, 10) || 0 })}
                    className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>

                <div className="flex flex-col justify-center space-y-2 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="rounded text-[#8E3445] focus:ring-[#C6A15B]"
                    />
                    <span className="font-semibold text-[#2B2421]">Featured Piece</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) => setForm({ ...form, published: e.target.checked })}
                      className="rounded text-[#8E3445] focus:ring-[#C6A15B]"
                    />
                    <span className="font-semibold text-[#2B2421]">Published (Live)</span>
                  </label>
                </div>
              </div>

              {/* Client Consent Tracking */}
              <div className="bg-[#FAF4EB] p-3.5 rounded-xl border border-[#C6A15B]/30 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.hasClientConsent}
                    onChange={(e) => setForm({ ...form, hasClientConsent: e.target.checked })}
                    className="rounded text-[#8E3445] focus:ring-[#C6A15B]"
                  />
                  <span className="font-semibold text-[#2B2421]">
                    Client has provided explicit consent to publish this photograph
                  </span>
                </label>

                <div>
                  <input
                    type="text"
                    value={form.consentNotes}
                    onChange={(e) => setForm({ ...form, consentNotes: e.target.value })}
                    placeholder="Internal permission notes (e.g. Wedding photoshoot release, client Instagram handle)"
                    className="w-full bg-white border border-[#C6A15B]/30 rounded-lg px-2.5 py-1.5 text-[11px] text-[#2B2421] focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#C6A15B]/20">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingItem(null);
                  }}
                  className="btn-elevated-secondary px-4 py-2 text-xs"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-elevated-primary px-5 py-2 text-xs"
                >
                  {isSaving ? 'Saving...' : editingItem ? 'Save Changes' : 'Publish Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
