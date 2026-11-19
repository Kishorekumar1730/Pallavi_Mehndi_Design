'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Sparkles, Eye, ArrowRight, X, ShieldCheck } from 'lucide-react';
import { PortfolioItemData } from '@/components/PortfolioGallery';

interface MobileFeaturedDesignsProps {
  items: PortfolioItemData[];
}

export default function MobileFeaturedDesigns({ items }: MobileFeaturedDesignsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const cardWidth = 260; // Approximate card width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, items.length - 1));
  };

  return (
    <section className="py-10 px-4 bg-[#FAF4EB] border-b border-[#C6A15B]/30 relative overflow-hidden">
      <div className="max-w-md mx-auto space-y-4">
        {/* Section Header */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <span className="heritage-badge text-[10px]">
              Authentic Archive
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#2B1F2A]">
              Featured Designs
            </h2>
            <p className="text-xs text-[#2B2421]/75">
              Swipe across Pallavi&apos;s genuine bridal &amp; celebration work.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="text-xs font-bold text-[#8E3445] flex items-center gap-1 shrink-0 pb-1 hover:underline"
          >
            <span>All ({items.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Swipeable Horizontal Snap Carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4 py-2"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className="snap-start shrink-0 w-[240px] rounded-2xl overflow-hidden bg-white border border-[#C6A15B]/35 shadow-md flex flex-col active:scale-98 transition-transform cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative aspect-4/5 w-full overflow-hidden bg-[#FAF5EE]">
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1F2A]/85 via-transparent to-transparent opacity-75" />

                {/* Category Pill */}
                <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 text-[#8E3445] border border-[#C6A15B]/40 shadow-2xs">
                  {item.category}
                </span>

                {/* Tap to Zoom Hint */}
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[#2B1F2A]/70 text-white flex items-center justify-center backdrop-blur-xs shadow-xs">
                  <Eye className="w-3.5 h-3.5" />
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <h4 className="font-serif text-sm font-bold text-[#F4EADD] leading-snug line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>

              {/* Caption Footer */}
              <div className="p-3 bg-white text-xs space-y-1">
                <p className="text-[11px] text-[#2B2421]/70 line-clamp-2 leading-tight font-light">
                  {item.caption || item.altText}
                </p>
                <span className="text-[10px] text-[#8E3445] font-semibold block pt-0.5">
                  Tap to view full detail →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-5 bg-[#8E3445]'
                  : 'w-1.5 bg-[#C6A15B]/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Accessible Full-Screen Touch Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-[#1E151E]/95 backdrop-blur-md p-4 flex flex-col justify-between animate-in fade-in duration-200"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Top Bar with Close Button */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold text-[#DFBF7D] bg-white/10 px-3 py-1 rounded-full border border-white/20">
              {selectedItem.category}
            </span>

            <button
              onClick={() => setSelectedIndex(null)}
              className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Close image preview"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Centered Image (No awkward cropping) */}
          <div
            className="flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.altText}
              className="max-h-[60vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/20"
            />
          </div>

          {/* Bottom Card Details */}
          <div
            className="bg-[#2B1F2A] border border-[#C6A15B]/40 rounded-2xl p-4 text-white space-y-2.5 pb-[max(1rem,env(safe-area-inset-bottom))]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#F4EADD]">
                {selectedItem.title}
              </h3>
              <span className="text-[10px] text-[#C6A15B] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Client Work</span>
              </span>
            </div>

            {selectedItem.caption && (
              <p className="text-xs text-[#F4EADD]/80 leading-relaxed font-light">
                {selectedItem.caption}
              </p>
            )}

            <Link
              href={`/enquire?style=${encodeURIComponent(selectedItem.title)}`}
              onClick={() => setSelectedIndex(null)}
              className="w-full btn-glossy-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F4EADD]" />
              <span>Enquire for a Similar Style</span>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
