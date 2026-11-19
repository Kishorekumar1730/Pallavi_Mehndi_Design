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

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 50) {
      showPrev(); // Swiped right -> show previous
    } else if (diff < -50) {
      showNext(); // Swiped left -> show next
    }
    setTouchStartX(null);
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

      {/* =========================================================================
          CATEGORY FILTER PILLS:
          Mobile: Horizontal swipeable chip bar (Strictly < 768px / max-md)
          Desktop/Tablet: Frozen flex-wrap (>= 768px / md:)
          ========================================================================= */}
      {/* Mobile Horizontal Scrollable Chips */}
      <div className="flex md:hidden overflow-x-auto flex-nowrap scrollbar-none gap-2 pb-2 mb-6 -mx-4 px-4">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setLightboxIndex(null);
              }}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
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

      {/* Desktop & Tablet Category Pills (Frozen for >= 768px) */}
      <div className="hidden md:flex flex-wrap items-center justify-center gap-2 mb-10">
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

      {/* =========================================================================
          PORTFOLIO PRESENTATION:
          Mobile: 2-Column Curated Touch Grid (< 768px / max-md)
          Desktop/Tablet: Frozen 1-to-3 Column Cards (>= 768px / md:)
          ========================================================================= */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[#F4EADD]/50 rounded-2xl border border-dashed border-[#C6A15B]/50">
          <Sparkles className="w-8 h-8 text-[#C6A15B] mx-auto mb-2 opacity-60" />
          <p className="text-[#2B2421]/70 font-medium">No items in this category yet.</p>
        </div>
      ) : (
        <>
          {/* Mobile 2-Column Touch Grid (< 768px) */}
          <div className="grid md:hidden grid-cols-2 gap-3">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="relative aspect-4/5 rounded-2xl overflow-hidden bg-white border border-[#C6A15B]/35 shadow-xs flex flex-col active:scale-98 transition-transform cursor-pointer"
              >
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1F2A]/90 via-[#2B1F2A]/20 to-transparent pointer-events-none" />

                {/* Category Badge */}
                <span className="absolute top-2 left-2 text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 text-[#8E3445] border border-[#C6A15B]/40 shadow-2xs">
                  {item.category}
                </span>

                {/* Title */}
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h4 className="font-serif text-xs font-bold leading-tight text-[#F4EADD] line-clamp-2">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop & Tablet Grid (Frozen for >= 768px) */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
        </>
      )}

      {/* =========================================================================
          ACCESSIBLE LIGHTBOX:
          Mobile: Full-screen touch modal with swipe gestures (< 768px / max-md)
          Desktop/Tablet: Frozen split-card modal (>= 768px / md:)
          ========================================================================= */}
      {currentItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E151E]/95 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* MOBILE FULL-SCREEN LIGHTBOX (< 768px) */}
          <div
            className="md:hidden w-full h-full flex flex-col justify-between pb-[max(1rem,env(safe-area-inset-bottom))]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Close Button */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-[#DFBF7D] bg-white/10 px-3 py-1 rounded-full border border-white/20">
                {lightboxIndex + 1} of {filteredItems.length} • {currentItem.category}
              </span>

              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image with Swipe Support */}
            <div className="relative flex-1 flex items-center justify-center my-3 overflow-hidden">
              <img
                src={currentItem.imageUrl}
                alt={currentItem.altText}
                className="max-h-[58vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/20"
              />

              {/* Prev / Next Touch Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous Image"
                className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center active:scale-90 transition-transform"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next Image"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center active:scale-90 transition-transform"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Drawer Details */}
            <div className="bg-[#2B1F2A] border border-[#C6A15B]/40 rounded-2xl p-4 text-white space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-[#F4EADD]">
                  {currentItem.title}
                </h3>
                <span className="text-[10px] text-[#C6A15B] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Consented Work</span>
                </span>
              </div>

              {currentItem.caption && (
                <p className="text-xs text-[#F4EADD]/80 leading-relaxed font-light line-clamp-2">
                  {currentItem.caption}
                </p>
              )}

              <div className="pt-1 flex items-center gap-2">
                <a
                  href={`/enquire?style=${encodeURIComponent(currentItem.title)}`}
                  className="flex-1 btn-glossy-primary py-2.5 px-3 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-transform"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F4EADD]" />
                  <span>Enquire for this Style</span>
                </a>

                <a
                  href="https://www.instagram.com/salem_mehandi_artist_pallavi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glossy-secondary py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1 shrink-0"
                >
                  <InstagramLogo size={14} variant="gradient-badge" />
                  <span>Feed</span>
                </a>
              </div>
            </div>
          </div>

          {/* DESKTOP & TABLET LIGHTBOX (Frozen for >= 768px) */}
          <div
            className="hidden md:flex relative max-w-4xl w-full max-h-[92vh] bg-[#F4EADD] rounded-3xl overflow-hidden shadow-2xl flex-row border border-[#C6A15B]/50"
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
            <div className="relative w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[500px]">
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
            <div className="w-2/5 p-8 flex flex-col justify-between overflow-y-auto">
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
