'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Eye } from 'lucide-react';

export interface PortfolioItemData {
  id: string;
  title: string;
  titleTa?: string | null;
  caption?: string | null;
  category: string;
  imageUrl: string;
  altText: string;
  featured: boolean;
  collectionYear?: string | null;
  hasClientConsent: boolean;
}

const CATEGORIES = [
  { key: 'ALL', label: 'All Designs' },
  { key: 'BRIDAL', label: 'Bridal Artistry' },
  { key: 'ARABIC', label: 'Arabic & Indo-Arabic' },
  { key: 'TRADITIONAL', label: 'Traditional Rajasthani / South' },
  { key: 'MINIMAL', label: 'Minimal & Contemporary' },
  { key: 'FESTIVE', label: 'Festive & Baby Shower' },
  { key: 'BESPOKE', label: 'Bespoke Custom' },
];

export default function PortfolioGallery({ items }: { items: PortfolioItemData[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = items.filter(
    (item) => activeCategory === 'ALL' || item.category === activeCategory
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
  }, [lightboxIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, showNext, showPrev]);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setLightboxIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#B35D4D] text-white shadow-sm'
                  : 'bg-[#FAF5EE] text-[#241416]/80 hover:bg-[#EADBCE] border border-[#EADBCE]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Portfolio Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[#FAF5EE] rounded-2xl border border-dashed border-[#EADBCE]">
          <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto mb-2 opacity-60" />
          <p className="text-[#241416]/70 font-medium">No items in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative bg-[#FFFFFF] rounded-2xl border border-[#EADBCE] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#C5A059] transition-all duration-300 cursor-pointer flex flex-col"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
              aria-label={`View full details of ${item.title}`}
            >
              <div className="relative aspect-4/5 overflow-hidden bg-[#FAF5EE]">
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#FAF5EE]/90 backdrop-blur-xs text-[#8F3D30]">
                    {item.category}
                  </span>
                  {item.collectionYear && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-black/50 text-[#E6C875] backdrop-blur-xs">
                      {item.collectionYear}
                    </span>
                  )}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1.5 bg-[#FAF5EE]/90 text-[#241416] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-md">
                    <Eye className="w-3.5 h-3.5 text-[#B35D4D]" />
                    <span>View In Lightbox</span>
                  </span>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-serif text-lg font-bold leading-tight drop-shadow-sm">
                    {item.title}
                  </h4>
                  {item.titleTa && (
                    <p className="text-xs text-[#E6C875] mt-0.5 drop-shadow-sm">
                      {item.titleTa}
                    </p>
                  )}
                </div>
              </div>

              {/* Caption excerpt */}
              {item.caption && (
                <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                  <p className="text-xs text-[#241416]/75 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                  <div className="mt-2 pt-2 border-t border-[#FAF5EE] flex items-center justify-between text-[11px] text-[#241416]/50">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#C5A059]" />
                      <span>Consented Portfolio</span>
                    </span>
                    <span className="text-[#8F3D30] font-medium">Click to expand</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Accessible Lightbox Modal */}
      {currentItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] bg-[#FAF5EE] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              aria-label="Close Lightbox"
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Lightbox Image */}
            <div className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[500px]">
              <img
                src={currentItem.imageUrl}
                alt={currentItem.altText}
                className="max-h-[85vh] w-full object-contain"
              />

              {/* Prev / Next Controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous Image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next Image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-full text-white text-xs backdrop-blur-xs">
                {lightboxIndex + 1} of {filteredItems.length}
              </div>
            </div>

            {/* Detail Drawer */}
            <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#B35D4D] text-white">
                    {currentItem.category}
                  </span>
                  {currentItem.collectionYear && (
                    <span className="text-xs text-[#8F3D30] font-medium bg-[#FAF5EE] border border-[#EADBCE] px-2 py-0.5 rounded-full">
                      {currentItem.collectionYear}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#241416]">
                  {currentItem.title}
                </h3>
                {currentItem.titleTa && (
                  <p className="text-sm text-[#8F3D30] font-medium">
                    {currentItem.titleTa}
                  </p>
                )}

                {currentItem.caption && (
                  <p className="text-sm text-[#241416]/80 leading-relaxed pt-2 border-t border-[#EADBCE]">
                    {currentItem.caption}
                  </p>
                )}

                <div className="bg-white p-3 rounded-xl border border-[#EADBCE] text-xs text-[#241416]/75 space-y-1">
                  <span className="font-semibold text-[#8F3D30] block">Image Description / Alt:</span>
                  <p className="italic">{currentItem.altText}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#241416]/60 pt-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Verified Client Consented Work</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#EADBCE] space-y-2">
                <a
                  href={`/enquire?style=${encodeURIComponent(currentItem.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#B35D4D] hover:bg-[#8F3D30] text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-colors shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#E6C875]" />
                  <span>Enquire for a Similar Style</span>
                </a>
                <p className="text-[11px] text-center text-[#241416]/50">
                  Customized bespoke motifs are sketched uniquely for each bride.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

