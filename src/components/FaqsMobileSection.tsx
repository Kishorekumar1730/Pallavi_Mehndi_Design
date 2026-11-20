'use client';

import React, { useState } from 'react';
import { ChevronDown, Sparkles, Droplets, Sun, ShieldAlert, HeartHandshake } from 'lucide-react';
import Mobile3DCarousel from '@/components/Mobile3DCarousel';

export interface FaqItemData {
  id: string;
  question: string;
  questionTa?: string | null;
  answer: string;
  answerTa?: string | null;
  category?: string | null;
}

interface FaqsMobileSectionProps {
  faqs: FaqItemData[];
}

interface AftercareStep {
  step: number;
  timeframe: string;
  title: string;
  action: string;
  tip: string;
  icon: 'droplets' | 'sun' | 'shield';
}

const AFTERCARE_STEPS: AftercareStep[] = [
  {
    step: 1,
    timeframe: 'Hours 0 – 8',
    title: 'Keep Henna Paste Intact',
    action: 'Allow the paste to dry naturally for 6 to 8 hours (or sleep overnight with natural wrapping).',
    tip: 'Avoid fans or AC blowing directly on drying henna; apply lemon-sugar sealant once dry.',
    icon: 'droplets',
  },
  {
    step: 2,
    timeframe: 'First 24 Hours',
    title: 'Strict Water Avoidance',
    action: 'Gently scrape or flake paste off with a butter knife or card. Strictly avoid washing with water or soap.',
    tip: 'Water halts lawsone oxidation prematurely. Wear gloves during quick showers.',
    icon: 'shield',
  },
  {
    step: 3,
    timeframe: 'Hours 24 – 48',
    title: 'Natural Warmth & Pure Balm',
    action: 'Apply warm coconut oil or natural eucalyptus balm. Expose hands to gentle clove steam for rich mahogany tones.',
    tip: 'Stain peaks to its deepest burgundy/chestnut tone exactly 48 hours after application.',
    icon: 'sun',
  },
];

export default function FaqsMobileSection({ faqs }: FaqsMobileSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          MOBILE VIEW (< 768px):
          1. Interactive Accordion with smooth transitions
          ========================================================================= */}
      <div className="block md:hidden space-y-3">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className={`rounded-2xl bg-white border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-[#C6A15B] shadow-md'
                  : 'border-[#C6A15B]/30 shadow-xs'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-4 flex items-center justify-between text-left text-sm font-semibold text-[#2B1F2A] active:bg-[#FAF4EB]/60 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="pr-3 leading-snug">{faq.question}</span>
                <span
                  className={`w-7 h-7 rounded-full bg-[#FAF4EB] border border-[#C6A15B]/30 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#8E3445] text-white border-transparent' : 'text-[#8E3445]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-[#2B2421]/80 leading-relaxed border-t border-[#C6A15B]/20 animate-in fade-in duration-200">
                  <p className="font-light">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          DESKTOP & TABLET VIEW (Frozen for >= 768px):
          Exact original details tag implementation
          ========================================================================= */}
      <div className="hidden md:block space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.id}
            className="card-floating bg-white p-6 rounded-2xl border border-[#C6A15B]/30 [&_summary::-webkit-details-marker]:none cursor-pointer open:border-[#C6A15B] transition-all"
          >
            <summary className="flex items-center justify-between text-base font-semibold text-[#2B1F2A] group-open:text-[#8E3445] list-none">
              <div className="pr-4">
                <span>{faq.question}</span>
              </div>
              <span className="text-xl font-light text-[#C6A15B] transition-transform shrink-0">
                +
              </span>
            </summary>
            <div className="mt-4 pt-4 border-t border-[#C6A15B]/20 text-xs sm:text-sm text-[#2B2421]/80 leading-relaxed">
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export function MobileAftercareCarousel() {
  return (
    <div className="w-full">
      <Mobile3DCarousel
        items={AFTERCARE_STEPS}
        heightClass="h-[300px]"
        ariaLabel="48-Hour Bridal Stain Care Progression"
        renderItem={(step, isActive) => (
          <div className="w-full h-full bg-white rounded-3xl p-5 border border-[#C6A15B]/35 shadow-xl flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-full bg-[#8E3445] text-white font-serif font-bold text-xs flex items-center justify-center shadow-xs">
                  {step.step}
                </span>

                <span className="text-[10px] font-bold text-[#8E3445] bg-[#FAF4EB] border border-[#C6A15B]/30 px-2.5 py-0.5 rounded-full">
                  {step.timeframe}
                </span>
              </div>

              <h4 className="font-serif text-base font-bold text-[#2B1F2A] leading-snug">
                {step.title}
              </h4>

              <p className="text-[11px] text-[#2B2421]/85 leading-relaxed mt-2 font-light">
                {step.action}
              </p>
            </div>

            <div className="pt-2 border-t border-[#F4EADD] bg-[#FAF4EB]/60 -mx-5 -mb-5 p-3 rounded-b-3xl border-t border-[#C6A15B]/20">
              <p className="text-[10px] text-[#713E2E] flex items-start gap-1.5 leading-normal">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 mt-0.5" />
                <span><strong>Pro Tip:</strong> {step.tip}</span>
              </p>
            </div>
          </div>
        )}
      />
    </div>
  );
}
