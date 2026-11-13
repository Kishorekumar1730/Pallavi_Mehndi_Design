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
  nameTa?: string | null;
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
    nameTa: '',
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
      nameTa: '',
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
      nameTa: item.nameTa || '',
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
        alert(`Service ${editingItem ? 'updated' : 'created'} successfully!`);
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
    if (!confirm(`Are you sure you want to delete service "${name}"?`)) return;
    try {
      await deleteService(id);
      window.location.reload();
    } catch {
      alert('Delete failed.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EADBCE] shadow-xs">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#241416]">
            Services &amp; Pricing Catalog
          </h1>
          <p className="text-xs text-[#241416]/70 mt-1">
            Manage public package cards, rates, inclusions, and draft/published states.
          </p>
        </div>

        <button
          onClick={startCreate}
          className="inline-flex items-center gap-1.5 bg-[#B35D4D] hover:bg-[#8F3D30] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-center"
        >
          <Plus className="w-4 h-4 text-[#E6C875]" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((svc) => (
          <div
            key={svc.id}
            className="bg-white rounded-2xl border border-[#EADBCE] overflow-hidden shadow-xs p-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#8F3D30] bg-[#FAF5EE] px-2.5 py-0.5 rounded-full border border-[#EADBCE]">
                  {svc.categoryName}
                </span>
                <div className="flex items-center gap-1.5">
                  {svc.isFeatured && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Featured</span>
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      svc.isPublished
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {svc.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#241416]">
                {svc.name}
              </h3>
              {svc.nameTa && (
                <p className="text-xs text-[#8F3D30] font-medium">{svc.nameTa}</p>
              )}

              <p className="text-xs text-[#241416]/75 line-clamp-2 leading-relaxed">
                {svc.shortDescription}
              </p>

              <div className="pt-2 text-xs text-[#241416]/70 flex items-center justify-between border-t border-[#FAF5EE]">
                <span className="font-bold text-[#8F3D30]">
                  {svc.startingPrice
                    ? `₹${svc.startingPrice.toLocaleString('en-IN')}`
                    : 'Quote Only'}
                </span>
                {svc.durationMinutes && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C5A059]" />
                    <span>{Math.round(svc.durationMinutes / 60)} hrs</span>
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#FAF5EE]">
              <button
                onClick={() => startEdit(svc)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#8F3D30] hover:text-[#241416]"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Service</span>
              </button>

              <button
                onClick={() => handleDelete(svc.id, svc.name)}
                className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                aria-label="Delete service"
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
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#EADBCE] shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#FAF5EE] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#241416]">
                {editingItem ? `Edit Service: ${editingItem.name}` : 'Create New Service'}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingItem(null);
                }}
                className="text-[#241416]/60 hover:text-[#241416]"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Service Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Service Name (Tamil)</label>
                  <input
                    type="text"
                    value={form.nameTa}
                    onChange={(e) => setForm({ ...form, nameTa: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Category *</label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={form.startingPrice}
                    onChange={(e) => setForm({ ...form, startingPrice: Number(e.target.value) })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#241416] mb-1">Duration (mins)</label>
                  <input
                    type="number"
                    value={form.durationMinutes}
                    onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })}
                    className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Full Description *</label>
                <textarea
                  rows={3}
                  required
                  value={form.fullDescription}
                  onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Suitable For (Event types) *</label>
                <input
                  type="text"
                  required
                  value={form.suitableFor}
                  onChange={(e) => setForm({ ...form, suitableFor: e.target.value })}
                  placeholder="e.g. Grand Muhurtham, Sangeet Parties, Baby Showers"
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#241416] mb-1">Inclusions (Separated by comma or newline) *</label>
                <textarea
                  rows={2}
                  required
                  value={form.inclusions}
                  onChange={(e) => setForm({ ...form, inclusions: e.target.value })}
                  placeholder="Both hands up to elbow, Feet adornment, Aftercare balm..."
                  className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <ImageUploader
                  value={form.imageUrl || ''}
                  onChange={(url) => setForm({ ...form, imageUrl: url })}
                  folder="portfolio"
                  label="Package Feature Image"
                  helperText="Upload JPEG, PNG, or WebP photo of genuine henna artwork (Max 5 MB)"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                    className="rounded text-[#B35D4D]"
                  />
                  <span className="font-semibold text-[#241416]">Publish on Live Site</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    className="rounded text-[#B35D4D]"
                  />
                  <span className="font-semibold text-[#241416]">Feature on Homepage</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#FAF5EE]">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF5EE] text-[#241416]/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 rounded-xl text-xs font-semibold bg-[#B35D4D] text-white hover:bg-[#8F3D30] transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

