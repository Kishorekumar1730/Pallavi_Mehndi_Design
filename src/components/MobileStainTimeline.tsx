'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  Clock,
  Droplets,
  Sun,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Info,
} from 'lucide-react';

interface StainStage {
  id: string;
  step: number;
  timeRange: string;
  stageName: string;
  phaseLabel: string;
  colorName: string;
  color: string;
  highlightColor: string;
  shadowColor: string;
  glowColor: string;
  description: string;
  actionGuideline: string;
  scientificNote: string;
}

const STAGES: StainStage[] = [
  {
    id: 'stage-1',
    step: 1,
    timeRange: 'Hour 0 – 12',
    phaseLabel: 'Stage 1 • Application',
    stageName: 'Initial Dye Bonding',
    colorName: 'Bright Pumpkin Orange',
    color: '#E07A5F',
    highlightColor: '#F7A382',
    shadowColor: '#A84C32',
    glowColor: 'rgba(224, 122, 95, 0.45)',
    description:
      'Upon paste removal, the henna appears bright orange. Natural lawsone molecules have bonded with skin keratin and are ready to oxidize.',
    actionGuideline:
      'Keep skin completely dry for the first 24 hours. Gently scrape off paste; apply organic botanical balm to protect the fresh pores.',
    scientificNote:
      'Illustrative swatch example. Natural skin porosity and warmth guide initial shade vibrancy.',
  },
  {
    id: 'stage-2',
    step: 2,
    timeRange: 'Hour 24 – 36',
    phaseLabel: 'Stage 2 • Oxidation',
    stageName: 'Oxygen & Heat Reaction',
    colorName: 'Deepening Crimson Red',
    color: '#9E2A2B',
    highlightColor: '#C44547',
    shadowColor: '#5C1518',
    glowColor: 'rgba(158, 42, 43, 0.45)',
    description:
      'Body heat and atmospheric oxygen react with the organic lawsone compounds, steadily transitioning the orange into a rich, deep crimson.',
    actionGuideline:
      'Maintain comfortable warmth. Gentle exposure to mild clove steam helps lock in essential oils and deepens color saturation.',
    scientificNote:
      'Illustrative swatch example. Avoid synthetic soaps, alcohol rubs, or water immersion during this active oxidation phase.',
  },
  {
    id: 'stage-3',
    step: 3,
    timeRange: 'Hour 48+',
    phaseLabel: 'Stage 3 • Mature Stain',
    stageName: 'Ceremonial Peak Depth',
    colorName: 'Rich Mahogany / Burgundy',
    color: '#49111C',
    highlightColor: '#701E2E',
    shadowColor: '#26060C',
    glowColor: 'rgba(73, 17, 28, 0.55)',
    description:
      'At 48 hours, the oxidation cycle completes—revealing its signature deep mahogany and burgundy tones, ready for wedding ceremony photographs.',
    actionGuideline:
      'Peak stain lasts 1 to 2 weeks. Apply coconut or sweet almond oil before showers to seal and preserve delicate linework.',
    scientificNote:
      'Illustrative swatch example. Palms and soles achieve the deepest shade due to higher keratin concentration.',
  },
];

export default function MobileStainTimeline() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);

  const total = STAGES.length;
  const currentStage = STAGES[activeStageIndex];

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // IntersectionObserver to pause when offscreen
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

  // Visibility change to pause when tab is hidden
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const goToNext = useCallback(() => {
    setActiveStageIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setActiveStageIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToStage = (index: number) => {
    setActiveStageIndex(index);
  };

  // Autoplay timer: calm 4.5s advance with smooth loop
  useEffect(() => {
    if (
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
    isPausedByUser,
    isInteracting,
    isIntersecting,
    isTabVisible,
    prefersReducedMotion,
    goToNext,
  ]);

  // Touch swipe handling
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

  // Calculate timeline track progress percentage
  const progressPercent = (activeStageIndex / (total - 1)) * 100;

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      aria-label="Natural Henna Stain Maturation Interactive Timeline"
      role="region"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocus={() => setIsInteracting(true)}
      onBlur={() => setIsInteracting(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Connected Three-Stage Milestone Track */}
      <div className="relative mb-5 px-3">
        {/* Background track line */}
        <div className="absolute top-4 left-6 right-6 h-1 bg-[#2B1F2A]/10 rounded-full -translate-y-1/2 z-0" />

        {/* Animated active gold progress line */}
        <div
          className="absolute top-4 left-6 h-1 bg-gradient-to-r from-[#DFBF7D] via-[#C6A15B] to-[#8E3445] rounded-full -translate-y-1/2 z-0 transition-all duration-500 ease-out"
          style={{ width: `calc(${progressPercent}% * (100% - 48px) / 100)` }}
        />

        {/* Three Interactive Stage Markers */}
        <div className="relative z-10 flex items-center justify-between" role="tablist">
          {STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            const isPassed = idx < activeStageIndex;

            return (
              <button
                key={stage.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to Stage ${stage.step}: ${stage.timeRange}`}
                onClick={() => goToStage(idx)}
                className="flex flex-col items-center group focus:outline-none focus:ring-1 focus:ring-[#C6A15B] rounded-xl p-1"
              >
                {/* Milestone Node */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-serif text-xs font-bold transition-all duration-300 shadow-sm ${
                    isActive
                      ? 'bg-[#8E3445] text-white ring-3 ring-[#C6A15B] ring-offset-2 scale-110'
                      : isPassed
                      ? 'bg-[#C6A15B] text-[#2B1F2A]'
                      : 'bg-[#FAF4EB] text-[#2B2421]/60 border border-[#C6A15B]/30'
                  }`}
                >
                  {stage.step}
                </div>

                {/* Subdued Stage Marker Label */}
                <span
                  className={`text-[10px] mt-1.5 font-medium tracking-tight transition-colors duration-200 ${
                    isActive
                      ? 'text-[#8E3445] font-bold'
                      : 'text-[#2B2421]/60 group-hover:text-[#2B2421]'
                  }`}
                >
                  {idx === 0 ? 'Application' : idx === 1 ? 'Oxidation' : 'Mature'}
                </span>
                <span className="text-[9px] text-[#2B2421]/45 font-mono">
                  {stage.timeRange.replace('Hour ', 'H')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Floating 3D Glossy Stage Presentation Stage */}
      <div
        className="relative w-full min-h-[350px] flex items-center justify-center"
        style={{ perspective: prefersReducedMotion ? 'none' : '1000px' }}
      >
        {/* Subdued Layering Underneath (Visual timeline depth) */}
        <div
          className="absolute inset-x-3 -bottom-2 h-full rounded-3xl bg-[#FAF4EB]/60 border border-[#C6A15B]/20 pointer-events-none transform scale-[0.96] opacity-60 z-0"
          aria-hidden="true"
        />

        {/* Active Stage Panel */}
        <div
          key={currentStage.id}
          className={`relative z-10 w-full rounded-3xl bg-white/95 backdrop-blur-md border border-[#C6A15B]/35 shadow-xl p-5 overflow-hidden transition-all duration-500 ease-out ${
            prefersReducedMotion ? '' : 'animate-in fade-in zoom-in-95'
          }`}
          style={{
            transform: prefersReducedMotion ? 'none' : 'translate3d(0, 0, 0)',
            boxShadow: `0 12px 30px -10px ${currentStage.glowColor}, 0 4px 12px rgba(43, 31, 42, 0.08)`,
          }}
        >
          {/* Subtle Top Gloss Reflection Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C6A15B]/40 to-transparent pointer-events-none" />

          {/* Header Row: Phase Tag & Time Pill */}
          <div className="flex items-center justify-between pb-3 border-b border-[#C6A15B]/20">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#FAF4EB] text-[#8E3445] border border-[#C6A15B]/30">
              <Clock className="w-2.5 h-2.5 text-[#C6A15B]" />
              <span>{currentStage.phaseLabel}</span>
            </span>

            <span className="font-mono text-xs font-bold text-[#2B1F2A] bg-[#F4EADD]/60 px-2.5 py-0.5 rounded-full border border-[#C6A15B]/20">
              {currentStage.timeRange}
            </span>
          </div>

          {/* Central Glossy 3D Color Swatch & Title */}
          <div className="py-4 text-center">
            {/* Realistic Glossy 3D Medallion Swatch */}
            <div className="relative w-18 h-18 mx-auto mb-2.5 rounded-full p-1 bg-gradient-to-b from-[#DFBF7D] via-[#C6A15B] to-[#713E2E] shadow-md">
              <div className="w-full h-full rounded-full p-0.5 bg-[#2B1F2A]/20">
                <div
                  className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center transition-all duration-500"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, ${currentStage.highlightColor}, ${currentStage.color} 70%, ${currentStage.shadowColor} 100%)`,
                    boxShadow: `0 4px 14px ${currentStage.glowColor}, inset 0 2px 4px rgba(255,255,255,0.45), inset 0 -3px 6px rgba(0,0,0,0.5)`,
                  }}
                >
                  {/* Specular Curved Gloss Arc Reflection */}
                  <div className="absolute top-0.5 left-2 right-2 h-3.5 rounded-full bg-gradient-to-b from-white/75 to-transparent pointer-events-none transform -rotate-12 opacity-85" />
                  {/* Subtle Secondary Rim Highlight */}
                  <div className="absolute bottom-1 left-3 right-3 h-1.5 rounded-full bg-gradient-to-t from-white/30 to-transparent pointer-events-none opacity-50" />
                </div>
              </div>
            </div>

            {/* Stage Color Title */}
            <h3 className="font-serif text-lg font-bold text-[#2B1F2A] leading-snug">
              {currentStage.colorName}
            </h3>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#713E2E] block mt-0.5">
              {currentStage.stageName}
            </span>
          </div>

          {/* Supporting Explanatory Content */}
          <div className="space-y-2.5 pt-1 text-left">
            <p className="text-xs text-[#2B2421]/85 leading-relaxed font-light">
              {currentStage.description}
            </p>

            {/* Care guideline chip */}
            <div className="p-2.5 rounded-xl bg-[#FAF4EB] border border-[#C6A15B]/25 text-[11px] text-[#2B2421]/80 flex items-start gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8E3445] shrink-0 mt-0.5" />
              <span className="leading-snug">{currentStage.actionGuideline}</span>
            </div>

            {/* Illustrative guide note */}
            <p className="text-[9px] text-[#2B2421]/55 italic leading-tight flex items-start gap-1">
              <Info className="w-3 h-3 text-[#C6A15B] shrink-0 mt-0.5" />
              <span>{currentStage.scientificNote}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. Bottom Controls, Accessibility Play/Pause & Slide Counter */}
      <div className="flex items-center justify-between px-2 mt-3 pt-1">
        {/* Left: Previous Stage Button + Autoplay Toggle */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous timeline stage"
            className="w-8 h-8 rounded-full bg-white text-[#2B1F2A] border border-[#C6A15B]/35 flex items-center justify-center active:scale-90 transition-transform shadow-xs focus:ring-1 focus:ring-[#C6A15B]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsPausedByUser((prev) => !prev)}
            aria-label={
              isPausedByUser
                ? 'Resume timeline autoplay'
                : 'Pause timeline autoplay'
            }
            className="inline-flex items-center gap-1 text-[10px] text-[#2B2421]/75 bg-white border border-[#C6A15B]/30 px-2 py-1 rounded-full hover:bg-[#FAF4EB] transition-colors focus:ring-1 focus:ring-[#C6A15B]"
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

        {/* Center: Stage Indicator Dots */}
        <div className="flex items-center gap-1.5" role="tablist">
          {STAGES.map((s, dotIdx) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={dotIdx === activeStageIndex}
              aria-label={`Go to stage ${dotIdx + 1}`}
              onClick={() => goToStage(dotIdx)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C6A15B] ${
                dotIdx === activeStageIndex
                  ? 'w-6 bg-gradient-to-r from-[#DFBF7D] via-[#C6A15B] to-[#8E3445]'
                  : 'w-2 bg-[#2B1F2A]/25 hover:bg-[#2B1F2A]/45'
              }`}
            />
          ))}
        </div>

        {/* Right: Slide Counter + Next Stage Button */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-[#2B2421]/70 bg-white px-2 py-0.5 rounded-full border border-[#C6A15B]/25">
            Stage {activeStageIndex + 1} of {total}
          </span>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next timeline stage"
            className="w-8 h-8 rounded-full bg-white text-[#2B1F2A] border border-[#C6A15B]/35 flex items-center justify-center active:scale-90 transition-transform shadow-xs focus:ring-1 focus:ring-[#C6A15B]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
