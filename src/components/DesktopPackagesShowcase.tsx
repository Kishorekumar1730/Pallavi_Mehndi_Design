'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Clock,
  Check,
  Sparkles,
  MapPin,
  ArrowRight,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
} from 'lucide-react';
import { PackageServiceData } from '@/components/MobilePackages3DCarousel';

interface DesktopPackagesShowcaseProps {
  services: PackageServiceData[];
}

export default function DesktopPackagesShowcase({ services }: DesktopPackagesShowcaseProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for Lightbox
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % services.length);
  }, [lightboxIndex, services.length]);
  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + services.length) % services.length);
  }, [lightboxIndex, services.length]);

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

  const formatPrice = (service: PackageServiceData) => {
    if (service.priceType === 'QUOTE_ONLY' || !service.startingPrice) {
      return 'Quote on Request';
    }
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(service.startingPrice);

    return service.priceType === 'STARTING_FROM' ? `Starting from ${formatted}` : formatted;
  };

  const formatDuration = (mins?: number | null) => {
    if (!mins) return null;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (hours > 0 && remainingMins > 0) return `${hours}h ${remainingMins}m approx`;
    if (hours > 0) return `${hours} hours approx`;
    return `${remainingMins} mins`;
  };

  const currentLightboxService = lightboxIndex !== null ? services[lightboxIndex] : null;

  return (
    <div className="w-full">
      {/* 3-Column Balanced Desktop Grid (1024px and wider) */}
      <div className="grid grid-cols-3 gap-6 xl:gap-8 items-stretch">
        {services.map((service, index) => {
          const hasRealPhoto =
            service.imageUrl &&
            !service.imageUrl.includes('/placeholders/') &&
            !service.imageUrl.endsWith('.svg');

          const inclusionsList = service.inclusions
            ? service.inclusions
                .split(/[,;\n]/)
                .map((i) => i.trim())
                .filter(Boolean)
            : [];

          return (
            <div
              key={service.id}
              className="card-floating group overflow-hidden flex flex-col justify-between bg-white rounded-3xl border border-[#C6A15B]/35 shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <div>
                {/* 1. Top Badges Bar: Outside the artwork canvas so zero design details are obscured */}
                <div className="px-5 py-3 bg-white border-b border-[#C6A15B]/20 flex items-center justify-between">
                  {service.category ? (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#FAF4EB] text-[#8E3445] border border-[#C6A15B]/35 shadow-2xs">
                      {service.category.name}
                    </span>
                  ) : (
                    <span />
                  )}

                  {service.durationMinutes ? (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-[#713E2E] bg-[#FAF4EB] px-3 py-1 rounded-full border border-[#C6A15B]/25">
                      <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>{formatDuration(service.durationMinutes)}</span>
                    </span>
                  ) : null}
                </div>

                {/* 2. Prominent Half-Height Artwork Area (Aligned at h-[340px] xl:h-[380px] across all cards) */}
                <div
                  onClick={() => {
                    if (hasRealPhoto) {
                      setLightboxIndex(index);
                    }
                  }}
                  className={`relative w-full h-[340px] xl:h-[380px] bg-[radial-gradient(ellipse_at_center,#FFFDF9_0%,#F5EBDD_100%)] border-b border-[#C6A15B]/25 overflow-hidden flex items-center justify-center ${
                    hasRealPhoto ? 'cursor-pointer group/art' : ''
                  }`}
                  title={hasRealPhoto ? 'Click to inspect high-resolution artwork' : undefined}
                >
                  {hasRealPhoto ? (
                    <>
                      {/* Real artwork photo with contained proportions preserving wrists, palms, and motifs */}
                      <img
                        src={service.imageUrl!}
                        alt={`${service.name} authentic bridal mehndi work by Pallavi Salem`}
                        className="w-full h-full object-contain p-2 drop-shadow-sm transition-transform duration-500 ease-out group-hover/art:scale-103"
                        loading="lazy"
                      />

                      {/* Subtle hover overlay hint */}
                      <div className="absolute inset-0 bg-[#2B1F2A]/10 opacity-0 group-hover/art:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="btn-elevated-secondary text-xs px-3.5 py-1.5 gap-1.5 shadow-md">
                          <ZoomIn className="w-3.5 h-3.5 text-[#8E3445]" />
                          <span>Inspect Artwork</span>
                        </span>
                      </div>

                      {/* Discreet bottom-right inspection badge */}
                      <div className="absolute bottom-3 right-3 pointer-events-none">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2B1F2A]/85 text-[#F4EADD] text-[10px] font-medium backdrop-blur-xs border border-white/10 shadow-xs">
                          <ZoomIn className="w-3 h-3 text-[#DFBF7D]" />
                          <span>Tap to enlarge</span>
                        </span>
                      </div>
                    </>
                  ) : (
                    // Polished empty state for services in preparation (giving exact matching height & visual balance)
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-[radial-gradient(ellipse_at_center,#FAF4EB_0%,#F5EBDD_100%)]">
                      <div className="w-14 h-14 rounded-3xl bg-white/90 border border-[#C6A15B]/40 flex items-center justify-center text-[#8E3445] shadow-xs mb-3 group-hover:scale-105 transition-transform">
                        <Camera className="w-7 h-7 text-[#8E3445]" />
                      </div>
                      <span className="font-serif text-base font-bold text-[#2B1F2A]">
                        Studio Photography In Preparation
                      </span>
                      <p className="text-xs text-[#2B2421]/70 max-w-[260px] leading-relaxed mt-1.5 font-light">
                        Bespoke party layouts, guest mandalas, and Arabic florals sketched individually for each celebration.
                      </p>
                      <span className="mt-3 text-[10px] text-[#713E2E] font-medium bg-white/80 px-3 py-1 rounded-full border border-[#C6A15B]/30">
                        Preview catalogue during consultation
                      </span>
                    </div>
                  )}
                </div>

                {/* 3. Service Copy & Information Area */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C6A15B]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#713E2E]">
                      Studio Offering
                    </span>
                  </div>

                  <h3 className="font-serif text-xl xl:text-2xl font-bold text-[#2B1F2A] group-hover:text-[#8E3445] transition-colors leading-tight">
                    {service.name}
                  </h3>

                  <p className="text-xs xl:text-sm text-[#2B2421]/80 mt-2.5 leading-relaxed font-light">
                    {service.shortDescription}
                  </p>

                  {/* Confirmed Ideal Occasion */}
                  {service.suitableFor && (
                    <div className="mt-4 pt-3.5 border-t border-[#F4EADD]">
                      <span className="text-[10px] font-bold text-[#713E2E] uppercase tracking-wider block mb-1">
                        Ideal Occasion
                      </span>
                      <p className="text-xs text-[#2B2421] bg-[#F4EADD]/60 px-3 py-1.5 rounded-xl border border-[#C6A15B]/30 inline-block font-medium">
                        {service.suitableFor}
                      </p>
                    </div>
                  )}

                  {/* Key Inclusions Highlights */}
                  {inclusionsList.length > 0 && (
                    <div className="mt-4 pt-3.5 border-t border-[#F4EADD]">
                      <span className="text-[10px] font-bold text-[#713E2E] uppercase tracking-wider block mb-2">
                        What&apos;s Included
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#2B2421]/85">
                        {inclusionsList.slice(0, 3).map((inc, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Travel & Availability Notes */}
                  {(service.travelDetails || service.availabilityNotes) && (
                    <div className="mt-4 pt-3 border-t border-[#F4EADD] text-xs text-[#2B2421]/70 space-y-1">
                      {service.travelDetails && (
                        <p className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#713E2E] shrink-0" />
                          <span>{service.travelDetails}</span>
                        </p>
                      )}
                      {service.availabilityNotes && (
                        <p className="flex items-center gap-1.5 text-[#8E3445]">
                          <Sparkles className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                          <span>{service.availabilityNotes}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 4. Footer Pricing & Elevated Enquiry Button */}
              <div className="p-6 pt-0 mt-2">
                <div className="pt-4 border-t border-[#C6A15B]/25 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-[#2B2421]/60 block font-medium">Investment Guide</span>
                    <span className="font-serif text-lg xl:text-xl font-bold text-[#8E3445]">
                      {formatPrice(service)}
                    </span>
                  </div>

                  <Link
                    href={`/enquire?service=${service.id}`}
                    className="btn-elevated-primary text-xs px-4 py-2.5 gap-1.5 group/btn"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Full-Screen Accessible Artwork Inspection Lightbox Modal */}
      {currentLightboxService && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A121A]/95 backdrop-blur-md p-8 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={`Artwork inspection: ${currentLightboxService.name}`}
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] bg-[#F4EADD] rounded-3xl overflow-hidden shadow-2xl flex flex-row border border-[#C6A15B]/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close Lightbox"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#2B1F2A]/85 hover:bg-[#2B1F2A] text-white flex items-center justify-center transition-colors cursor-pointer border border-[#C6A15B]/40"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: High-Res Photo Stage */}
            <div className="relative w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[520px]">
              <img
                src={currentLightboxService.imageUrl!}
                alt={currentLightboxService.name}
                className="max-h-[85vh] w-full object-contain"
              />

              {/* Prev / Next Controls */}
              {services.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showPrev();
                    }}
                    aria-label="Previous artwork"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showNext();
                    }}
                    aria-label="Next artwork"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-full text-white text-xs backdrop-blur-xs font-mono">
                {lightboxIndex + 1} of {services.length}
              </div>
            </div>

            {/* Right: Details & Direct Enquiry Action */}
            <div className="w-2/5 p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {currentLightboxService.category && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#8E3445] text-white">
                      {currentLightboxService.category.name}
                    </span>
                  )}
                  {currentLightboxService.durationMinutes && (
                    <span className="text-xs text-[#713E2E] font-medium bg-[#FAF4EB] border border-[#C6A15B]/40 px-2.5 py-0.5 rounded-full">
                      {formatDuration(currentLightboxService.durationMinutes)}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#2B1F2A]">
                  {currentLightboxService.name}
                </h3>

                <p className="text-sm text-[#2B2421]/80 leading-relaxed pt-2 border-t border-[#C6A15B]/30 font-light">
                  {currentLightboxService.fullDescription || currentLightboxService.shortDescription}
                </p>

                {currentLightboxService.suitableFor && (
                  <div className="bg-white p-3.5 rounded-xl border border-[#C6A15B]/30 text-xs text-[#2B2421]/75">
                    <span className="font-semibold text-[#8E3445] block mb-1">Ideal Celebration:</span>
                    <p>{currentLightboxService.suitableFor}</p>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-[#C6A15B]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#2B2421]/60">Investment Guide</span>
                  <span className="font-serif text-xl font-bold text-[#8E3445]">
                    {formatPrice(currentLightboxService)}
                  </span>
                </div>

                <Link
                  href={`/enquire?service=${currentLightboxService.id}`}
                  onClick={closeLightbox}
                  className="w-full btn-elevated-primary py-3 px-4 text-xs gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#F4EADD]" />
                  <span>Enquire for Your Wedding Date</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
