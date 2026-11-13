'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Eye, ExternalLink } from 'lucide-react';
import InstagramLogo from '@/components/InstagramLogo';

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
  consentNotes?: string | null;
}

const CATEGORIES = [
  { key: 'ALL', label: 'All Collections' },
  { key: 'BRIDAL', label: 'Bridal Artistry' },
  { key: 'ARABIC', label: 'Arabic & Floral' },
  { key: 'TRADITIONAL', label: 'Traditional Rajasthani' },
  { key: 'MINIMAL', label: 'Minimal Contemporary' },
  { key: 'FESTIVE', label: 'Festive & Occasions' },
  { key: 'BESPOKE', label: 'Bespoke Concepts' },
];

export default function PortfolioGallery({ items }: { items: PortfolioItemData[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'ALL') return true;
    return item.category === activeCategory;
  });

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => ((prev! + 1) % filteredItems.length));
  }, [lightboxIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for accessible lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <div className="w-full">
      {/* Official Instagram Live Archive Banner */}
      <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-white border border-[#C6A15B]/35 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left card-floating">
        <div className="flex items-center gap-3.5">
          <InstagramLogo size={42} variant="gradient-badge" />
          <div>
            <h4 className="font-serif text-sm sm:text-base font-bold text-[#2B1F2A]">
              Authentic Instagram Mehndi Feed
            </h4>
            <p className="text-xs text-[#2B2421]/75">
              Only genuine client work is shown. Explore Pallavi&apos;s full live feed, bridal reels, and stain progressions on Instagram.
            </p>
          </div>
        </div>

        <a
          href="https://www.instagram.com/salem_mehandi_artist_pallavi/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow @salem_mehandi_artist_pallavi on Instagram (opens in a new tab)"
          className="btn-elevated-secondary text-xs px-4 py-2 gap-2 shrink-0 group/ig"
        >
          <InstagramLogo size={16} variant="gradient-badge" />
          <span className="group-hover/ig:text-[#8E3445]">@salem_mehandi_artist_pallavi</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#8E3445]" />
        </a>
      </div>

      {/* Category Filter Pills (Elevated) */}
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
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'btn-elevated-primary'
                  : 'btn-elevated-secondary'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Portfolio Grid (Lightly Floating Cards) */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[#F4EADD]/50 rounded-2xl border border-dashed border-[#C6A15B]/50">
          <Sparkles className="w-8 h-8 text-[#C6A15B] mx-auto mb-2 opacity-60" />
          <p className="text-[#2B2421]/70 font-medium">No items in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="card-floating group overflow-hidden cursor-pointer flex flex-col focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none"
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
              <div className="relative aspect-4/5 overflow-hidden bg-[#F4EADD] border-b border-[#C6A15B]/30">
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1F2A]/85 via-[#2B1F2A]/20 to-transparent opacity-65 group-hover:opacity-90 transition-opacity" />

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#F4EADD]/95 backdrop-blur-xs text-[#8E3445] border border-[#C6A15B]/40 shadow-xs">
                    {item.category}
                  </span>
                  {item.collectionYear && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#2B1F2A]/80 text-[#C6A15B] backdrop-blur-xs border border-white/10 shadow-xs">
                      {item.collectionYear}
                    </span>
                  )}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="btn-elevated-secondary text-xs px-4 py-2 gap-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5 text-[#8E3445]" />
                    <span>View In Lightbox</span>
                  </span>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <h4 className="font-serif text-lg font-bold leading-tight drop-shadow-sm text-[#F4EADD]">
                    {item.title}
                  </h4>
                </div>
              </div>

              {/* Caption excerpt */}
              {item.caption && (
                <div className="p-5 bg-white flex-1 flex flex-col justify-between">
                  <p className="text-xs text-[#2B2421]/75 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-[#F4EADD] flex items-center justify-between text-[11px] text-[#2B2421]/55">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>Consented Work</span>
                    </span>
                    <span className="text-[#8E3445] font-semibold group-hover:underline">Click to expand</span>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E151E]/90 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] bg-[#F4EADD] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#C6A15B]/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              aria-label="Close Lightbox"
              className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-[#2B1F2A]/80 hover:bg-[#2B1F2A] text-white flex items-center justify-center transition-colors cursor-pointer border border-[#C6A15B]/40"
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
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#8E3445] text-white">
                    {currentItem.category}
                  </span>
                  {currentItem.collectionYear && (
                    <span className="text-xs text-[#713E2E] font-medium bg-[#FAF4EB] border border-[#C6A15B]/40 px-2 py-0.5 rounded-full">
                      {currentItem.collectionYear}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#2B1F2A]">
                  {currentItem.title}
                </h3>

                {currentItem.caption && (
                  <p className="text-sm text-[#2B2421]/80 leading-relaxed pt-2 border-t border-[#C6A15B]/30">
                    {currentItem.caption}
                  </p>
                )}

                <div className="bg-white p-3.5 rounded-xl border border-[#C6A15B]/30 text-xs text-[#2B2421]/75 space-y-1">
                  <span className="font-semibold text-[#8E3445] block">Design Notes &amp; Alt:</span>
                  <p className="italic">{currentItem.altText}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#2B2421]/65 pt-2">
                  <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                  <span>Verified Client Consented Work</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#C6A15B]/30 space-y-2.5">
                <a
                  href={`/enquire?style=${encodeURIComponent(currentItem.title)}`}
                  className="w-full btn-elevated-primary py-3 px-4 text-xs gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#F4EADD]" />
                  <span>Enquire for a Similar Style</span>
                </a>

                <a
                  href="https://www.instagram.com/salem_mehandi_artist_pallavi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View authentic work on Instagram (opens in a new tab)"
                  className="w-full btn-elevated-secondary py-2.5 px-4 text-xs gap-2 justify-center"
                >
                  <InstagramLogo size={16} variant="gradient-badge" />
                  <span>View Authentic Work on Instagram</span>
                </a>

                <p className="text-[11px] text-center text-[#2B2421]/55">
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
