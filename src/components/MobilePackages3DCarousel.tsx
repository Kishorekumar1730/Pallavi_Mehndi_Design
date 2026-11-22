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
      prefersReducedMotion
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
    goToNext,
  ]);

  // Touch Swipe Handling (pan-y friendly, no hijacking of vertical page scroll)
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
      {/* 3D Stage Container */}
      <div
        className="relative w-full h-[540px] sm:h-[580px] overflow-hidden flex items-center justify-center touch-pan-y"
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
              transformStyle = 'translateX(62%) scale(0.88)';
              opacityStyle = 0.5;
              zIndex = 10;
            } else if (isAdjacentPrev) {
              transformStyle = 'translateX(-62%) scale(0.88)';
              opacityStyle = 0.5;
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
              transformStyle = 'translate3d(58%, 0, -45px) scale(0.86) rotateY(-10deg)';
              opacityStyle = 0.65;
              zIndex = 10;
            } else if (isAdjacentPrev) {
              transformStyle = 'translate3d(-58%, 0, -45px) scale(0.86) rotateY(10deg)';
              opacityStyle = 0.65;
              zIndex = 10;
            } else {
              transformStyle = `translate3d(${diff > 0 ? 120 : -120}%, 0, -100px) scale(0.7) rotateY(${
                diff > 0 ? -15 : 15
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
              className={`absolute top-0 bottom-0 w-[86%] max-w-[320px] my-auto flex flex-col justify-between rounded-3xl bg-white border border-[#C6A15B]/35 overflow-hidden will-change-transform ${
                isActive
                  ? 'shadow-2xl ring-1 ring-[#C6A15B]/30'
                  : 'shadow-md brightness-95 cursor-pointer'
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Package ${index + 1} of ${total}: ${service.name}`}
              aria-hidden={!isActive}
            >
              {/* Top Photo Frame (Full artwork view with contained proportions) */}
              <div className="relative h-48 sm:h-52 w-full bg-[#FAF4EB] border-b border-[#C6A15B]/25 overflow-hidden flex items-center justify-center p-2">
                {hasRealPhoto ? (
                  <img
                    src={service.imageUrl!}
                    alt={`${service.name} by Pallavi Salem Mehndi Artist`}
                    className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                ) : (
                  // Clean, clearly labeled empty state (NOT the fake awaiting upload SVG)
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-[radial-gradient(ellipse_at_center,#FFFDF9_0%,#F5EBDD_100%)]">
                    <div className="w-10 h-10 rounded-2xl bg-white/80 border border-[#C6A15B]/30 flex items-center justify-center text-[#8E3445] shadow-xs mb-2">
                      <Camera className="w-5 h-5 text-[#8E3445]" />
                    </div>
                    <span className="text-[11px] font-bold text-[#2B1F2A]">
                      Photo Gallery In Preparation
                    </span>
                    <span className="text-[10px] text-[#2B2421]/65 max-w-[200px] leading-tight mt-1 font-light">
                      Custom bespoke bridal sketches and motifs tailored individually.
                    </span>
                  </div>
                )}

                {/* Floating Top Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                  {service.category && (
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#2B1F2A]/90 text-[#F4EADD] backdrop-blur-xs border border-[#C6A15B]/40 shadow-xs">
                      {service.category.name}
                    </span>
                  )}

                  {service.durationMinutes && (
                    <span className="flex items-center gap-1 text-[9px] font-semibold bg-[#2B1F2A]/85 backdrop-blur-xs px-2 py-0.5 rounded-full text-[#F4EADD] border border-white/10 shadow-xs">
                      <Clock className="w-3 h-3 text-[#C6A15B]" />
                      <span>{formatDuration(service.durationMinutes)}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Package Content & Typography Area */}
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

                  {/* Ideal Occasion */}
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

                  {/* Inclusions summary (top 2) */}
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

                  {/* View Details Toggle Button */}
                  {inclusionsList.length > 2 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedDetailsId(isExpanded ? null : service.id);
                      }}
                      className="mt-2 text-[10px] font-semibold text-[#8E3445] hover:text-[#713E2E] flex items-center gap-1 active:scale-95 transition-transform"
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? `Hide full inclusions for ${service.name}` : `View full inclusions for ${service.name}`}
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

                {/* Footer Pricing & Enquire CTA */}
                <div className="pt-2 mt-2 border-t border-[#C6A15B]/25 flex items-center justify-between gap-2">
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

        {/* Previous Button (< 768px touch control) */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            aria-label="Previous package"
            className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-[#2B1F2A]/80 text-[#F4EADD] backdrop-blur-xs border border-[#C6A15B]/40 flex items-center justify-center active:scale-90 transition-transform shadow-md focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Next Button (< 768px touch control) */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next package"
            className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-[#2B1F2A]/80 text-[#F4EADD] backdrop-blur-xs border border-[#C6A15B]/40 flex items-center justify-center active:scale-90 transition-transform shadow-md focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Pagination Controls, Accessibility Toggle & Slide Counter */}
      {total > 1 && (
        <div className="flex items-center justify-between px-3 mt-2 pt-1">
          {/* Pause / Play Autoplay Toggle (WCAG 2.2.2 compliance) */}
          <button
            type="button"
            onClick={() => setIsPausedByUser((prev) => !prev)}
            aria-label={isPausedByUser ? 'Resume package carousel autoplay' : 'Pause package carousel autoplay'}
            className="inline-flex items-center gap-1 text-[10px] text-[#2B2421]/70 bg-[#FAF4EB] border border-[#C6A15B]/30 px-2 py-0.5 rounded-full hover:bg-white transition-colors focus:ring-1 focus:ring-[#C6A15B]"
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

          {/* Centered Dots with direct tap navigation */}
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

          {/* Slide counter */}
          <span className="text-[10px] font-mono text-[#2B2421]/60 bg-white/80 px-2 py-0.5 rounded-full border border-[#C6A15B]/25">
            {currentIndex + 1} of {total}
          </span>
        </div>
      )}
    </div>
  );
}
