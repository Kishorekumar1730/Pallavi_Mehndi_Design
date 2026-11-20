'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export interface Mobile3DCarouselProps<T> {
  items: T[];
  renderItem: (item: T, isActive: boolean, index: number) => React.ReactNode;
  autoplayIntervalMs?: number;
  ariaLabel?: string;
  onItemClick?: (item: T, index: number) => void;
  className?: string;
  heightClass?: string;
}

export default function Mobile3DCarousel<T>({
  items,
  renderItem,
  autoplayIntervalMs = 4500,
  ariaLabel = 'Interactive 3D Carousel',
  onItemClick,
  className = '',
  heightClass = 'h-[380px]',
}: Mobile3DCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);

  const total = items.length;

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // IntersectionObserver to pause autoplay when carousel is not visible in viewport
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

  // Document visibility listener to pause when user switches browser tabs
  const [isTabVisible, setIsTabVisible] = useState(true);
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

  // Autoplay loop
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
    }, autoplayIntervalMs);

    return () => clearInterval(timer);
  }, [
    total,
    isPausedByUser,
    isInteracting,
    isIntersecting,
    isTabVisible,
    prefersReducedMotion,
    autoplayIntervalMs,
    goToNext,
  ]);

  // Touch Swipe Handlers (allows smooth natural scrolling vertically while capturing horizontal swipe)
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
      if (diff > 40) {
        goToPrev();
      } else if (diff < -40) {
        goToNext();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    isHorizontalSwipeRef.current = null;
    setIsInteracting(false);
  };

  if (total === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none ${className}`}
      aria-label={ariaLabel}
      role="region"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocus={() => setIsInteracting(true)}
      onBlur={() => setIsInteracting(false)}
    >
      {/* 3D Stage Container */}
      <div
        className={`relative w-full ${heightClass} overflow-hidden flex items-center justify-center`}
        style={{ perspective: prefersReducedMotion ? 'none' : '1000px' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => {
          // Calculate circular difference relative to current index
          let diff = (index - currentIndex) % total;
          if (diff < -Math.floor(total / 2)) diff += total;
          if (diff > Math.floor(total / 2)) diff -= total;

          const isActive = diff === 0;
          const isAdjacentPrev = diff === -1 || (total === 2 && diff === 1 && currentIndex === 1);
          const isAdjacentNext = diff === 1;
          const isVisible = Math.abs(diff) <= 1;

          // 3D positioning styles
          let transformStyle = '';
          let opacityStyle = 0;
          let zIndex = 0;

          if (prefersReducedMotion) {
            // Flat fallback without 3D rotations or animations
            if (isActive) {
              transformStyle = 'translateX(0) scale(1)';
              opacityStyle = 1;
              zIndex = 20;
            } else if (isAdjacentNext) {
              transformStyle = 'translateX(65%) scale(0.9)';
              opacityStyle = 0.5;
              zIndex = 10;
            } else if (isAdjacentPrev) {
              transformStyle = 'translateX(-65%) scale(0.9)';
              opacityStyle = 0.5;
              zIndex = 10;
            } else {
              transformStyle = `translateX(${diff > 0 ? 120 : -120}%) scale(0.8)`;
              opacityStyle = 0;
              zIndex = 0;
            }
          } else {
            // Restrained 3D perspective transforms
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

          return (
            <div
              key={index}
              onClick={() => {
                if (!isActive) {
                  goToIndex(index);
                } else if (onItemClick) {
                  onItemClick(item, index);
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
              className={`absolute top-0 bottom-0 w-[84%] max-w-[310px] my-auto flex flex-col justify-center cursor-pointer will-change-transform ${
                isActive ? 'shadow-2xl' : 'shadow-md brightness-95'
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${total}`}
              aria-hidden={!isActive}
            >
              {renderItem(item, isActive, index)}
            </div>
          );
        })}

        {/* Previous Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            aria-label="Previous slide"
            className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-[#2B1F2A]/75 text-[#F4EADD] backdrop-blur-xs border border-[#C6A15B]/40 flex items-center justify-center active:scale-90 transition-transform shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Next Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next slide"
            className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-[#2B1F2A]/75 text-[#F4EADD] backdrop-blur-xs border border-[#C6A15B]/40 flex items-center justify-center active:scale-90 transition-transform shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Pagination Dots & Accessibility Pause / Resume Control */}
      {total > 1 && (
        <div className="flex items-center justify-between px-2 mt-3 pt-1">
          {/* Pause / Play Autoplay Toggle (WCAG 2.2.2 compliance) */}
          <button
            type="button"
            onClick={() => setIsPausedByUser((prev) => !prev)}
            aria-label={isPausedByUser ? 'Resume carousel autoplay' : 'Pause carousel autoplay'}
            className="inline-flex items-center gap-1 text-[10px] text-[#2B2421]/70 bg-[#FAF4EB] border border-[#C6A15B]/30 px-2 py-0.5 rounded-full hover:bg-white transition-colors"
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

          {/* Centered Dots */}
          <div className="flex items-center justify-center gap-1.5" role="tablist">
            {items.map((_, dotIdx) => {
              const isSelected = dotIdx === currentIndex;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  onClick={() => goToIndex(dotIdx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'w-6 bg-gradient-to-r from-[#C6A15B] to-[#8E3445]'
                      : 'w-2 bg-[#2B1F2A]/25 hover:bg-[#2B1F2A]/50'
                  }`}
                />
              );
            })}
          </div>

          {/* Slide counter */}
          <span className="text-[10px] font-mono text-[#2B2421]/60 bg-white/70 px-2 py-0.5 rounded-full border border-[#C6A15B]/20">
            {currentIndex + 1}/{total}
          </span>
        </div>
      )}
    </div>
  );
}
