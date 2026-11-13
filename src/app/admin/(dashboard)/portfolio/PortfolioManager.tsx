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
  titleTa?: string | null;
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
    titleTa: '',
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
      titleTa: '',
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
      titleTa: item.titleTa || '',
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EADBCE] shadow-xs">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#241416]">
            Portfolio &amp; Media Gallery
          </h1>
          <p className="text-xs text-[#241416]/70 mt-1">
            Upload and manage design showcase pieces with safe image storage, alt text, and client consent tracking.
          </p>
        </div>

        <button
          onClick={startCreate}
          className="btn-elevated-primary px-4 py-2.5 text-xs gap-1.5 self-start sm:self-center"
        >
          <Plus className="w-4 h-4 text-[#E6C875]" />
          <span>Add Portfolio Item</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveCategoryFilter('ALL')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeCategoryFilter === 'ALL'
              ? 'bg-[#B35D4D] text-white shadow-xs'
              : 'bg-white text-[#241416]/70 hover:bg-[#FAF5EE] border border-[#EADBCE]'
          }`}
        >
          All Items ({portfolio.length})
        </button>
        {CATEGORY_OPTIONS.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategoryFilter(cat.value)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeCategoryFilter === cat.value
                ? 'bg-[#B35D4D] text-white shadow-xs'
                : 'bg-white text-[#241416]/70 hover:bg-[#FAF5EE] border border-[#EADBCE]'
            }`}
          >
            {cat.label} ({portfolio.filter((i) => i.category === cat.value).length})
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[#EADBCE] overflow-hidden shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-4/3 overflow-hidden bg-[#FAF5EE]">
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-[#8F3D30]">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1">
                    {item.featured && (
                      <span className="text-[10px] font-bold bg-amber-400 text-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-xs">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Featured</span>
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        item.published ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {item.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#241416]">
                      {item.title}
                    </h3>
                    {item.titleTa && (
                      <p className="text-xs text-[#8F3D30]">{item.titleTa}</p>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-[#241416]/50 bg-[#FAF5EE] px-1.5 py-0.5 rounded">
                    Order #{item.displayOrder}
                  </span>
                </div>

                {item.caption && (
                  <p className="text-xs text-[#241416]/70 line-clamp-2">{item.caption}</p>
                )}

                <div className="pt-2 text-[11px] text-[#241416]/60 space-y-1 border-t border-[#FAF5EE]">
                  <p className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Client Consent: {item.hasClientConsent ? 'Confirmed' : 'Pending'}</span>
                  </p>
                  {item.consentNotes && (
                    <p className="italic text-[10px] text-[#241416]/50">Note: {item.consentNotes}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-between border-t border-[#FAF5EE] mt-2">
              <button
                onClick={() => startEdit(item)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#8F3D30] hover:text-[#241416] transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Details &amp; Image</span>
              </button>

              <button
                onClick={() => handleDelete(item.id, item.title)}
                className="p-1 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                aria-label="Delete item"
                title="Delete item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT MODAL */}
      {(isCreating || editingItem) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in zoom-in-95"
          onClick={() => {
            setIsCreating(false);
            setEditingItem(null);
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 border border-[#EADBCE] shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#FAF5EE] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#241416]">
                {editingItem ? `Edit: ${editingItem.title}` : 'Add New Portfolio Work'}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingItem(null);
                }}
                className="text-[#241416]/60 hover:text-[#241416] cursor-pointer"
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
                <label className="block font-semibold text-[#241416] mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Symmetrical Heirloom Bridal Palms"
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#C5A059]"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Collection / Year</label>
                  <input
                    type="text"
                    value={form.collectionYear}
                    onChange={(e) => setForm({ ...form, collectionYear: e.target.value })}
                    placeholder="e.g. 2026 Collection"
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Dedicated Image Uploader with Drag & Drop and Preview */}
              <div className="space-y-2">
                <ImageUploader
                  value={form.imageUrl}
                  onChange={(url) => setForm({ ...form, imageUrl: url })}
                  folder="portfolio"
                  label="Featured Work Image"
                  helperText="Upload JPEG, PNG, or WebP photo of genuine henna artwork (Max 5 MB)"
                  required
                />

                {/* Quick placeholder shortcut */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px] text-[#241416]/70">
                  <span className="text-[#8F3D30] font-semibold">Or select verified placeholder:</span>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setForm({ ...form, imageUrl: cat.placeholder, category: cat.value as any })}
                      className="px-2 py-0.5 rounded-md bg-[#FAF5EE] hover:bg-[#EADBCE] border border-[#EADBCE] text-[10px] transition-colors"
                    >
                      {cat.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Accessibility Alt Text *</label>
                <input
                  type="text"
                  required
                  value={form.altText}
                  onChange={(e) => setForm({ ...form, altText: e.target.value })}
                  placeholder="Detailed description of henna motif, elements, and placement for screen readers"
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Caption / Storyline</label>
                <textarea
                  rows={2}
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  placeholder="Story behind the motifs, client requirements, or special elements"
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Multi-image detail shots */}
              <div>
                <label className="block font-semibold text-[#241416] mb-1">
                  Additional Detail Shots (Optional Image URLs or Paths)
                </label>
                <input
                  type="text"
                  value={form.additionalImages}
                  onChange={(e) => setForm({ ...form, additionalImages: e.target.value })}
                  placeholder="Comma-separated image URLs for close-up shots or feet matching work"
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Display Order</label>
                  <input
                    type="number"
                    min="0"
                    value={form.displayOrder}
                    onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="rounded text-[#B35D4D] focus:ring-[#C5A059]"
                    />
                    <span className="font-semibold text-[#241416]">Featured Piece</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) => setForm({ ...form, published: e.target.checked })}
                      className="rounded text-[#B35D4D] focus:ring-[#C5A059]"
                    />
                    <span className="font-semibold text-[#241416]">Published (Live)</span>
                  </label>
                </div>
              </div>

              {/* Client Consent Tracking */}
              <div className="bg-[#FAF5EE] p-3.5 rounded-xl border border-[#EADBCE] space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.hasClientConsent}
                    onChange={(e) => setForm({ ...form, hasClientConsent: e.target.checked })}
                    className="rounded text-[#B35D4D] focus:ring-[#C5A059]"
                  />
                  <span className="font-semibold text-[#241416]">
                    Client has provided explicit consent to publish this photograph
                  </span>
                </label>

                <div>
                  <input
                    type="text"
                    value={form.consentNotes}
                    onChange={(e) => setForm({ ...form, consentNotes: e.target.value })}
                    placeholder="Internal permission notes (e.g. Wedding photoshoot release, client Instagram handle)"
                    className="w-full bg-white border border-[#EADBCE] rounded-lg px-2.5 py-1.5 text-[11px] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#FAF5EE]">
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
