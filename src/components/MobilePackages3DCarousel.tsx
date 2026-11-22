'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Check,
  Sparkles,
  ArrowRight,
  Pause,
  Play,
  Camera,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  X,
} from 'lucide-react';

export interface PackageServiceData {
  id: string;
  name: string;
  nameTa?: string | null;
  slug: string;
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
  category?: {
    name: string;
  } | null;
}

interface MobilePackages3DCarouselProps {
  services: PackageServiceData[];
}

export default function MobilePackages3DCarousel({ services }: MobilePackages3DCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [expandedDetailsId, setExpandedDetailsId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);

  const total = services.length;

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // IntersectionObserver to pause autoplay when leaving viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Visibility change to pause autoplay when switching browser tabs
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay loop with strict pause conditions
  useEffect(() => {
    if (
      total <= 1 ||
      isPausedByUser ||
      isInteracting ||
      !isIntersecting ||
      !isTabVisible ||
      prefersReducedMotion ||
      lightboxIndex !== null
    ) {
      return;
    }

    const timer = setInterval(() => {
      goToNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [
    total,
    isPausedByUser,
    isInteracting,
    isIntersecting,
    isTabVisible,
    prefersReducedMotion,
    lightboxIndex,
    goToNext,
  ]);

  // Touch Swipe Handling for Carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    isHorizontalSwipeRef.current = null;
    setIsInteracting(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = Math.abs(e.touches[0].clientX - touchStartXRef.current);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartYRef.current);

    if (isHorizontalSwipeRef.current === null && (deltaX > 8 || deltaY > 8)) {
      isHorizontalSwipeRef.current = deltaX > deltaY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null && isHorizontalSwipeRef.current === true) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - touchStartXRef.current;
      if (diff > 35) {
        goToPrev();
      } else if (diff < -35) {
        goToNext();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    isHorizontalSwipeRef.current = null;
    setIsInteracting(false);
  };

  // Keyboard navigation for Lightbox
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showLightboxNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % total);
  }, [lightboxIndex, total]);
  const showLightboxPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + total) % total);
  }, [lightboxIndex, total]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showLightboxNext();
      if (e.key === 'ArrowLeft') showLightboxPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, showLightboxNext, showLightboxPrev]);

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

  if (total === 0) return null;

  const currentLightboxService = lightboxIndex !== null ? services[lightboxIndex] : null;

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      aria-label="Curated Henna Packages 3D Carousel"
      role="region"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocus={() => setIsInteracting(true)}
      onBlur={() => setIsInteracting(false)}
    >
      {/* 3D Stage Container: Generous responsive height to accommodate prominent artwork */}
      <div
        className="relative w-full h-[620px] sm:h-[660px] overflow-hidden flex items-center justify-center touch-pan-y"
        style={{ perspective: prefersReducedMotion ? 'none' : '1000px' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {services.map((service, index) => {
          // Circular offset relative to currentIndex for smooth continuous looping
          let diff = (index - currentIndex) % total;
          if (diff < -Math.floor(total / 2)) diff += total;
          if (diff > Math.floor(total / 2)) diff -= total;

          const isActive = diff === 0;
          const isAdjacentPrev = diff === -1 || (total === 2 && diff === 1 && currentIndex === 1);
          const isAdjacentNext = diff === 1;
          const isVisible = Math.abs(diff) <= 1;

          // Inclusions parsed as list
          const inclusionsList = service.inclusions
            ? service.inclusions
                .split(/[,;\n]/)
                .map((i) => i.trim())
                .filter(Boolean)
            : [];

          const isExpanded = expandedDetailsId === service.id;

          // 3D positioning transform
          let transformStyle = '';
          let opacityStyle = 0;
          let zIndex = 0;

          if (prefersReducedMotion) {
            // Flat transitions without rotation or perspective
            if (isActive) {
              transformStyle = 'translateX(0) scale(1)';
              opacityStyle = 1;
              zIndex = 20;
            } else if (isAdjacentNext) {
              transformStyle = 'translateX(68%) scale(0.86)';
              opacityStyle = 0.55;
              zIndex = 10;
            } else if (isAdjacentPrev) {
              transformStyle = 'translateX(-68%) scale(0.86)';
              opacityStyle = 0.55;
              zIndex = 10;
            } else {
              transformStyle = `translateX(${diff > 0 ? 120 : -120}%) scale(0.75)`;
              opacityStyle = 0;
              zIndex = 0;
            }
          } else {
            // Refined physical 3D depth with gentle rotation
            if (isActive) {
              transformStyle = 'translate3d(0, 0, 0) scale(1) rotateY(0deg)';
              opacityStyle = 1;
              zIndex = 20;
            } else if (isAdjacentNext) {
              transformStyle = 'translate3d(66%, 0, -45px) scale(0.85) rotateY(-8deg)';
              opacityStyle = 0.55;
              zIndex = 10;
            } else if (isAdjacentPrev) {
              transformStyle = 'translate3d(-66%, 0, -45px) scale(0.85) rotateY(8deg)';
              opacityStyle = 0.55;
              zIndex = 10;
            } else {
              transformStyle = `translate3d(${diff > 0 ? 120 : -120}%, 0, -100px) scale(0.7) rotateY(${
                diff > 0 ? -12 : 12
              }deg)`;
              opacityStyle = 0;
              zIndex = 0;
            }
          }

          // Check if valid real photo is present
          const hasRealPhoto =
            service.imageUrl &&
            !service.imageUrl.includes('/placeholders/') &&
            !service.imageUrl.endsWith('.svg');

          return (
            <div
              key={service.id}
              onClick={() => {
                if (!isActive) {
                  goToIndex(index);
                }
              }}
              style={{
                transform: transformStyle,
                opacity: opacityStyle,
                zIndex,
                transition: prefersReducedMotion
                  ? 'none'
                  : 'transform 550ms cubic-bezier(0.25, 1, 0.5, 1), opacity 550ms ease, box-shadow 550ms ease',
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
              className={`absolute top-0 bottom-0 w-[88%] max-w-[340px] my-auto flex flex-col justify-between rounded-3xl bg-white border border-[#C6A15B]/35 overflow-hidden will-change-transform ${
                isActive
                  ? 'shadow-2xl ring-1 ring-[#C6A15B]/40'
                  : 'shadow-md brightness-95 cursor-pointer'
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Package ${index + 1} of ${total}: ${service.name}`}
              aria-hidden={!isActive}
            >
              {/* 1. Header Bar: Category and Duration kept completely off the photo canvas */}
              <div className="px-3.5 py-2.5 bg-white border-b border-[#C6A15B]/20 flex items-center justify-between shrink-0">
                {service.category ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#FAF4EB] text-[#8E3445] border border-[#C6A15B]/30 shadow-2xs">
                    {service.category.name}
                  </span>
                ) : (
                  <span />
                )}

                {service.durationMinutes ? (
                  <span className="flex items-center gap-1 text-[9px] font-semibold text-[#713E2E] bg-[#FAF4EB] px-2 py-0.5 rounded-full border border-[#C6A15B]/25">
                    <Clock className="w-3 h-3 text-[#C6A15B]" />
                    <span>{formatDuration(service.durationMinutes)}</span>
                  </span>
                ) : null}
              </div>

              {/* 2. Full-Width Artwork Canvas: Spans the card width with contained, complete proportions */}
              <div
                onClick={(e) => {
                  if (isActive && hasRealPhoto) {
                    e.stopPropagation();
                    setLightboxIndex(index);
                  }
                }}
                className={`relative w-full h-[280px] sm:h-[310px] bg-[radial-gradient(ellipse_at_center,#FAF4EB_0%,#F5EBDD_100%)] border-b border-[#C6A15B]/25 overflow-hidden flex items-center justify-center shrink-0 ${
                  isActive && hasRealPhoto ? 'cursor-zoom-in group/img' : ''
                }`}
                title={hasRealPhoto ? 'Tap to inspect original photo in full view' : undefined}
              >
                {hasRealPhoto ? (
                  <>
                    <img
                      src={service.imageUrl!}
                      alt={`${service.name} authentic bridal mehndi work by Pallavi`}
                      className="w-full h-full object-contain p-1.5 drop-shadow-sm transition-transform duration-500 ease-out group-hover/img:scale-102"
                      loading="lazy"
                    />

                    {/* Non-intrusive "Tap to inspect" prompt pill at bottom edge */}
                    <div className="absolute bottom-2 right-2 pointer-events-none">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2B1F2A]/80 text-[#F4EADD] text-[9px] font-medium backdrop-blur-xs border border-white/10 shadow-xs">
                        <ZoomIn className="w-3 h-3 text-[#DFBF7D]" />
                        <span>Tap to inspect</span>
                      </span>
                    </div>
                  </>
                ) : (
                  // Clean, clearly labeled empty state for packages without uploaded photography
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="w-11 h-11 rounded-2xl bg-white/90 border border-[#C6A15B]/30 flex items-center justify-center text-[#8E3445] shadow-xs mb-2">
                      <Camera className="w-5 h-5 text-[#8E3445]" />
                    </div>
                    <span className="text-xs font-bold text-[#2B1F2A]">
                      Photography in Preparation
                    </span>
                    <span className="text-[10px] text-[#2B2421]/65 max-w-[210px] leading-tight mt-1 font-light">
                      Custom motifs &amp; party layouts sketched individually. Contact studio to preview design catalogue.
                    </span>
                  </div>
                )}
              </div>

              {/* 3. Service Copy & Typography: Stable, readable text area directly below photo */}
              <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto scrollbar-none">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#713E2E]">
                      Studio Offering
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#2B1F2A] leading-snug">
                    {service.name}
                  </h3>

                  <p className="text-[11px] text-[#2B2421]/80 mt-1 line-clamp-2 leading-relaxed font-light">
                    {service.shortDescription}
                  </p>

                  {/* Confirmed Ideal Occasion */}
                  {service.suitableFor && (
                    <div className="mt-2 pt-2 border-t border-[#F4EADD]">
                      <span className="text-[9px] font-bold text-[#713E2E] uppercase tracking-wider block">
                        Ideal Occasion
                      </span>
                      <p className="text-[10px] text-[#2B2421] bg-[#F4EADD]/60 px-2 py-0.5 rounded-lg border border-[#C6A15B]/25 inline-block font-medium mt-0.5 line-clamp-1">
                        {service.suitableFor}
                      </p>
                    </div>
                  )}

                  {/* Summary Inclusions (Top 2 items) */}
                  {inclusionsList.length > 0 && !isExpanded && (
                    <div className="mt-2 pt-2 border-t border-[#F4EADD]">
                      <ul className="space-y-1 text-[10px] text-[#2B2421]/80">
                        {inclusionsList.slice(0, 2).map((inc, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <Check className="w-3 h-3 text-[#C6A15B] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Accessible Full Inclusions & Details Expander */}
                  {isExpanded && (
                    <div className="mt-2 pt-2 border-t border-[#F4EADD] space-y-2 animate-in fade-in duration-200">
                      <span className="text-[9px] font-bold text-[#713E2E] uppercase tracking-wider block">
                        Full Inclusions &amp; Logistics
                      </span>
                      <ul className="space-y-1 text-[10px] text-[#2B2421]/85">
                        {inclusionsList.map((inc, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <Check className="w-3 h-3 text-[#C6A15B] shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                      {service.travelDetails && (
                        <p className="text-[9px] text-[#2B2421]/70 pt-1 border-t border-[#F4EADD]/80">
                          <strong>Travel:</strong> {service.travelDetails}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Accessible View Details Toggle */}
                  {inclusionsList.length > 2 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedDetailsId(isExpanded ? null : service.id);
                      }}
                      className="mt-2 text-[10px] font-semibold text-[#8E3445] hover:text-[#713E2E] flex items-center gap-1 active:scale-95 transition-transform"
                      aria-expanded={isExpanded}
                      aria-label={
                        isExpanded
                          ? `Hide full inclusions for ${service.name}`
                          : `View full inclusions for ${service.name}`
                      }
                    >
                      <span>{isExpanded ? 'Hide details' : 'View full inclusions'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>

                {/* Footer Pricing & Enquire CTA Button */}
                <div className="pt-2 mt-2 border-t border-[#C6A15B]/25 flex items-center justify-between gap-2 shrink-0">
                  <div>
                    <span className="text-[9px] text-[#2B2421]/60 block font-medium">Investment</span>
                    <span className="font-serif text-sm font-bold text-[#8E3445]">
                      {formatPrice(service)}
                    </span>
                  </div>

                  <Link
                    href={`/enquire?service=${service.id}`}
                    className="btn-elevated-primary text-[11px] px-3.5 py-1.5 gap-1 shadow-sm"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Bottom Navigation & Accessibility Controls: Positioned below cards so they NEVER cover active artwork */}
      {total > 1 && (
        <div className="flex items-center justify-between px-3 mt-3 pt-1">
          {/* Left: Previous Button + Pause/Play Control */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous package"
              className="w-8 h-8 rounded-full bg-white text-[#2B1F2A] border border-[#C6A15B]/40 flex items-center justify-center active:scale-90 transition-transform shadow-xs focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsPausedByUser((prev) => !prev)}
              aria-label={
                isPausedByUser
                  ? 'Resume package carousel autoplay'
                  : 'Pause package carousel autoplay'
              }
              className="inline-flex items-center gap-1 text-[10px] text-[#2B2421]/75 bg-white border border-[#C6A15B]/30 px-2.5 py-1 rounded-full hover:bg-[#FAF4EB] transition-colors focus:ring-1 focus:ring-[#C6A15B]"
            >
              {isPausedByUser ? (
                <>
                  <Play className="w-2.5 h-2.5 text-[#C6A15B] fill-current" />
                  <span>Play</span>
                </>
              ) : (
                <>
                  <Pause className="w-2.5 h-2.5 text-[#8E3445] fill-current" />
                  <span>Pause</span>
                </>
              )}
            </button>
          </div>

          {/* Center: Direct-Tap Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5" role="tablist">
            {services.map((svc, dotIdx) => {
              const isSelected = dotIdx === currentIndex;
              return (
                <button
                  key={svc.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Go to package ${dotIdx + 1}: ${svc.name}`}
                  onClick={() => goToIndex(dotIdx)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C6A15B] ${
                    isSelected
                      ? 'w-6 bg-gradient-to-r from-[#C6A15B] to-[#8E3445]'
                      : 'w-2 bg-[#2B1F2A]/25 hover:bg-[#2B1F2A]/50'
                  }`}
                />
              );
            })}
          </div>

          {/* Right: Slide Counter + Next Button */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#2B2421]/70 bg-white px-2 py-0.5 rounded-full border border-[#C6A15B]/25">
              {currentIndex + 1} of {total}
            </span>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next package"
              className="w-8 h-8 rounded-full bg-white text-[#2B1F2A] border border-[#C6A15B]/40 flex items-center justify-center active:scale-90 transition-transform shadow-xs focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 5. Full-Screen Accessible Artwork Lightbox Modal */}
      {currentLightboxService && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A121A]/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={`Full Artwork Inspection: ${currentLightboxService.name}`}
          onClick={closeLightbox}
        >
          <div
            className="w-full h-full max-w-lg flex flex-col justify-between py-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Top Bar */}
            <div className="flex items-center justify-between pb-2">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#DFBF7D] tracking-wider uppercase block">
                  {currentLightboxService.category?.name || 'Studio Offering'}
                </span>
                <h4 className="font-serif text-sm font-bold text-white">
                  {currentLightboxService.name}
                </h4>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Photo Display */}
            <div className="relative flex-1 flex items-center justify-center my-2 overflow-hidden">
              <img
                src={currentLightboxService.imageUrl!}
                alt={currentLightboxService.name}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/20"
              />

              {/* Prev / Next Touch Arrows inside Lightbox */}
              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showLightboxPrev}
                    aria-label="Previous image"
                    className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={showLightboxNext}
                    aria-label="Next image"
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Bottom Drawer Details & Direct Action */}
            <div className="bg-[#2B1F2A] border border-[#C6A15B]/40 rounded-2xl p-4 text-white space-y-2.5">
              <p className="text-xs text-[#F4EADD]/85 leading-relaxed font-light">
                {currentLightboxService.shortDescription}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[10px] text-white/60 block">Confirmed Price</span>
                  <span className="font-serif font-bold text-[#DFBF7D]">
                    {formatPrice(currentLightboxService)}
                  </span>
                </div>

                <Link
                  href={`/enquire?service=${currentLightboxService.id}`}
                  onClick={closeLightbox}
                  className="btn-elevated-primary text-xs px-4 py-2 gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F4EADD]" />
                  <span>Enquire for Date</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
