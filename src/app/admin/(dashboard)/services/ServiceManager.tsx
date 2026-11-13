'use client';

import React, { useState } from 'react';
import { saveService, deleteService } from '@/actions/admin';
import ImageUploader from '@/components/ImageUploader';
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
  Eye,
  EyeOff,
  Clock,
  Star,
} from 'lucide-react';

export interface AdminServiceItem {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  suitableFor: string;
  inclusions: string;
  durationMinutes?: number | null;
  startingPrice?: number | null;
  priceType: string;
  travelDetails?: string | null;
  availabilityNotes?: string | null;
  imageUrl?: string | null;
  displayOrder: number;
  isFeatured: boolean;
  isPublished: boolean;
}

export interface CategoryOption {
  id: string;
  name: string;
}

export default function ServiceManager({
  services,
  categories,
}: {
  services: AdminServiceItem[];
  categories: CategoryOption[];
}) {
  const [items, setItems] = useState<AdminServiceItem[]>(services);
  const [editingItem, setEditingItem] = useState<AdminServiceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [form, setForm] = useState({
    name: '',
    categoryId: categories.length > 0 ? categories[0].id : '',
    shortDescription: '',
    fullDescription: '',
    suitableFor: '',
    inclusions: '',
    durationMinutes: 180,
    startingPrice: 10000,
    priceType: 'STARTING_FROM',
    travelDetails: 'Salem city complimentary. Outstation travel reimbursed.',
    availabilityNotes: 'Booking in advance recommended.',
    imageUrl: '/placeholders/portfolio-bridal.svg',
    displayOrder: 0,
    isFeatured: false,
    isPublished: true,
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const startCreate = () => {
    setEditingItem(null);
    setForm({
      name: '',
      categoryId: categories.length > 0 ? categories[0].id : '',
      shortDescription: '',
      fullDescription: '',
      suitableFor: '',
      inclusions: '',
      durationMinutes: 180,
      startingPrice: 10000,
      priceType: 'STARTING_FROM',
      travelDetails: 'Salem city complimentary. Outstation travel reimbursed.',
      availabilityNotes: 'Booking in advance recommended.',
      imageUrl: '/placeholders/portfolio-bridal.svg',
      displayOrder: items.length + 1,
      isFeatured: false,
      isPublished: true,
    });
    setFormError(null);
    setIsCreating(true);
  };

  const startEdit = (item: AdminServiceItem) => {
    setIsCreating(false);
    setEditingItem(item);
    setForm({
      name: item.name,
      categoryId: item.categoryId,
      shortDescription: item.shortDescription,
      fullDescription: item.fullDescription,
      suitableFor: item.suitableFor,
      inclusions: item.inclusions,
      durationMinutes: item.durationMinutes || 180,
      startingPrice: item.startingPrice || 0,
      priceType: item.priceType,
      travelDetails: item.travelDetails || '',
      availabilityNotes: item.availabilityNotes || '',
      imageUrl: item.imageUrl || '',
      displayOrder: item.displayOrder,
      isFeatured: item.isFeatured,
      isPublished: item.isPublished,
    });
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFormError(null);

    try {
      const res = await saveService(form, editingItem ? editingItem.id : undefined);
      if (res.success) {
        setIsCreating(false);
        setEditingItem(null);
        window.location.reload();
      } else {
        setFormError(res.error || 'Failed to save service.');
      }
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Save error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(`Delete service "${name}"? This action cannot be undone.`);
    if (!confirmed) return;

    try {
      await deleteService(id);
      window.location.reload();
    } catch {
      alert('Delete failed.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-floating bg-white p-6 rounded-3xl border border-[#C6A15B]/30 shadow-xs">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1F2A]">
            Services &amp; Bridal Packages
          </h1>
          <p className="text-xs text-[#2B2421]/70 mt-1">
            Configure transparent starting pricing, package descriptions, inclusions, and coverage timelines.
          </p>
        </div>

        <button
          onClick={startCreate}
          className="btn-elevated-primary px-4 py-2.5 text-xs gap-1.5"
        >
          <Plus className="w-4 h-4 text-[#C6A15B]" />
          <span>Add New Service Package</span>
        </button>
      </div>

      {/* Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((svc) => (
          <div
            key={svc.id}
            className="card-floating bg-white rounded-2xl border border-[#C6A15B]/30 overflow-hidden shadow-xs p-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#8E3445] bg-[#FAF4EB] px-2.5 py-0.5 rounded-full border border-[#C6A15B]/30">
                  {svc.categoryName}
                </span>

                <div className="flex items-center gap-1.5">
                  {svc.isFeatured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C6A15B] text-[#2B1F2A] flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Featured</span>
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      svc.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {svc.isPublished ? 'Active' : 'Hidden'}
                  </span>
                </div>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#2B1F2A]">
                {svc.name}
              </h3>

              <p className="text-xs text-[#2B2421]/75 line-clamp-2 leading-relaxed">
                {svc.shortDescription}
              </p>

              <div className="pt-2 text-xs text-[#2B2421]/70 flex items-center justify-between border-t border-[#C6A15B]/15">
                <span className="font-bold text-[#8E3445]">
                  {svc.startingPrice
                    ? `From ₹${svc.startingPrice.toLocaleString('en-IN')}`
                    : 'Quote on Request'}
                </span>
                {svc.durationMinutes && (
                  <span className="flex items-center gap-1 text-[11px] text-[#2B2421]/60">
                    <Clock className="w-3 h-3 text-[#C6A15B]" />
                    <span>~{svc.durationMinutes} mins</span>
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#C6A15B]/15">
              <button
                onClick={() => startEdit(svc)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#8E3445] hover:text-[#2B1F2A]"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Package</span>
              </button>

              <button
                onClick={() => handleDelete(svc.id, svc.name)}
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                title="Delete service"
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
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#C6A15B]/30 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#C6A15B]/20 pb-3">
              <h3 className="font-serif text-xl font-bold text-[#2B1F2A]">
                {editingItem ? 'Edit Service Package' : 'Create New Service Package'}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingItem(null);
                }}
                className="text-[#2B2421]/60 hover:text-[#2B2421]"
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
                <label className="block font-semibold text-[#2B2421] mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Royal Bespoke Bridal Package"
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#2B2421] mb-1">Category *</label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs font-semibold text-[#2B2421]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#2B2421] mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={form.startingPrice}
                    onChange={(e) => setForm({ ...form, startingPrice: Number(e.target.value) })}
                    className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2B2421] mb-1">Duration (mins)</label>
                  <input
                    type="number"
                    value={form.durationMinutes}
                    onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })}
                    className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#2B2421] mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2B2421] mb-1">Full Description *</label>
                <textarea
                  rows={3}
                  required
                  value={form.fullDescription}
                  onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2B2421] mb-1">Suitable For (Event types) *</label>
                <input
                  type="text"
                  required
                  value={form.suitableFor}
                  onChange={(e) => setForm({ ...form, suitableFor: e.target.value })}
                  placeholder="e.g. Wedding Main, Muhurtham, Sangeet"
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2B2421] mb-1">Inclusions (Separated by comma or newline) *</label>
                <textarea
                  rows={2}
                  required
                  value={form.inclusions}
                  onChange={(e) => setForm({ ...form, inclusions: e.target.value })}
                  placeholder="Bridal both palms, Forearms elbow-length, Feet, Aftercare balm kit"
                  className="w-full bg-[#FAF4EB] border border-[#C6A15B]/30 rounded-xl px-3 py-2 text-xs text-[#2B2421]"
                />
              </div>

              <div>
                <ImageUploader
                  value={form.imageUrl || ''}
                  onChange={(url) => setForm({ ...form, imageUrl: url })}
                  folder="portfolio"
                  label="Featured Service Image"
                  helperText="Photo illustrating this service (Max 5 MB, authentic photography)"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                    className="rounded text-[#8E3445]"
                  />
                  <span className="font-semibold text-[#2B2421]">Publish on Live Site</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    className="rounded text-[#8E3445]"
                  />
                  <span className="font-semibold text-[#2B2421]">Feature on Homepage</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#C6A15B]/20">
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
                  {isSaving ? 'Saving...' : editingItem ? 'Save Service Changes' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
