'use client';

import React from 'react';
import { Droplets, ShieldCheck, Award, Sparkles } from 'lucide-react';
import Mobile3DCarousel from '@/components/Mobile3DCarousel';

interface StandardItem {
  id: string;
  title: string;
  tag: string;
  iconType: 'droplets' | 'shield' | 'award';
  description: string;
  highlight: string;
}

const STANDARDS_DATA: StandardItem[] = [
  {
    id: 'botanical',
    title: '100% Pure Botanical Blend',
    tag: 'Triple-Sifted Rajasthani Leaf',
    iconType: 'droplets',
    description:
      'Fresh Sojat Lawsonia inermis powder sifted five times, distilled water, pure therapeutic-grade eucalyptus and cajeput oils, and cane sugar.',
    highlight: 'Zero Synthetics',
  },
  {
    id: 'zero-chemicals',
    title: 'Zero Chemicals & No PPD',
    tag: 'Skin Safety Guaranteed',
    iconType: 'shield',
    description:
      'Strictly free from black henna, chemical dyes, kerosene, and synthetic boosters. Rich color develops naturally via lawsone oxidation.',
    highlight: 'Dye & Toxin Free',
  },
  {
    id: 'patch-test',
    title: 'Pre-Event Patch Testing',
    tag: 'Sensitive Skin Protocol',
    iconType: 'award',
    description:
      'For brides with sensitive skin or expectant mothers, we offer a complimentary mini patch test cone 3 weeks prior to verify skin comfort.',
    highlight: 'Complimentary',
  },
];

export default function AboutStandardsCarousel() {
  return (
    <div className="w-full">
      <Mobile3DCarousel
        items={STANDARDS_DATA}
        heightClass="h-[300px]"
        ariaLabel="Studio Hygiene and Safety Standards"
        renderItem={(item, isActive) => (
          <div className="w-full h-full bg-white rounded-3xl p-5 border border-[#C6A15B]/35 shadow-xl flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF4EB] flex items-center justify-center border border-[#C6A15B]/30 shadow-xs">
                  {item.iconType === 'droplets' && <Droplets className="w-5 h-5 text-[#8E3445]" />}
                  {item.iconType === 'shield' && <ShieldCheck className="w-5 h-5 text-[#C6A15B]" />}
                  {item.iconType === 'award' && <Award className="w-5 h-5 text-[#713E2E]" />}
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF4EB] text-[#8E3445] border border-[#C6A15B]/30">
                  {item.highlight}
                </span>
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#713E2E] block mb-0.5">
                {item.tag}
              </span>

              <h3 className="font-serif text-base font-bold text-[#2B1F2A] leading-snug">
                {item.title}
              </h3>

              <p className="text-[11px] text-[#2B2421]/75 leading-relaxed mt-2 font-light">
                {item.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[#F4EADD] flex items-center gap-1.5 text-[10px] text-[#2B2421]/60">
              <Sparkles className="w-3 h-3 text-[#C6A15B]" />
              <span>Certified pure Salem studio practice</span>
            </div>
          </div>
        )}
      />
    </div>
  );
}
