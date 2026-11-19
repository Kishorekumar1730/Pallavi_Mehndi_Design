'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Check, ExternalLink, Award } from 'lucide-react';
import InstagramLogo from '@/components/InstagramLogo';

interface MobileArtistIntroProps {
  instagramUrl?: string;
  serviceArea?: string;
}

export default function MobileArtistIntro({
  instagramUrl = 'https://www.instagram.com/salem_mehandi_artist_pallavi/',
  serviceArea = 'Salem, Tamil Nadu & Destination Travel',
}: MobileArtistIntroProps) {
  const avatarPhoto = '/images/pallavi-avatar-crisp.jpg';

  return (
    <section className="py-10 px-4 bg-[#FAF4EB] border-b border-[#C6A15B]/30">
      <div className="max-w-md mx-auto space-y-4">
        {/* Card Container */}
        <div className="card-floating-3d-glossy p-5 space-y-4">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#EBDDC8]/70">
            <div className="flex items-center gap-3 min-w-0">
              {/* Concentric Golden Avatar */}
              <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#DFBF7D] via-[#C6A15B] to-[#9C7A35] shrink-0 shadow-xs flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden border border-white bg-[#FAF5EE]">
                  <img
                    src={avatarPhoto}
                    alt="Pallavi - Lead Bridal Mehndi Artist"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1 leading-none">
                  <span className="font-serif text-base font-bold text-[#2B1F2A] truncate">
                    Pallavi
                  </span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#B88746] text-white flex items-center justify-center text-[8px] font-bold">
                    <Check className="w-2 h-2 stroke-[3]" />
                  </span>
                </div>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8E3445] mt-1"
                >
                  <InstagramLogo size={11} variant="glyph-only" className="text-[#8E3445]" />
                  <span>@salem_mehandi__</span>
                </a>
              </div>
            </div>

            <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#FAF5EE] border border-[#C6A15B]/40 text-[9px] font-bold uppercase tracking-wider text-[#713E2E]">
              Studio Artist
            </span>
          </div>

          {/* Philosophy & Hygiene Notes */}
          <div className="space-y-2 text-xs text-[#2B2421]/80">
            <p className="leading-relaxed font-light">
              Crafting bespoke bridal storytelling compositions rooted in South Indian temple heritage, intricate jaal work, and modern floral mandalas.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="p-2.5 rounded-xl bg-white/80 border border-[#C6A15B]/25 flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2B1F2A] block font-semibold text-[11px]">100% Organic Henna</strong>
                  <span className="text-[10px] text-[#2B2421]/70">Pure Rajasthani leaves, no synthetic PPD.</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/80 border border-[#C6A15B]/25 flex items-start gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#8E3445] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2B1F2A] block font-semibold text-[11px]">48h Stain Guarantee</strong>
                  <span className="text-[10px] text-[#2B2421]/70">Rich deep mahogany for auspicious dates.</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Glossy Instagram Button */}
          <div className="pt-2">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore real mehndi designs on Pallavi's Instagram"
              className="w-full btn-glossy-instagram-3d py-2.5 px-3 group/ig"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-white/20 border border-white/60 flex items-center justify-center shrink-0">
                  <InstagramLogo size={14} variant="glyph-only" className="text-white" />
                </div>
                <div className="text-left leading-tight min-w-0">
                  <span className="block text-[10px] font-semibold text-white/95">Explore Real Work on</span>
                  <span className="block text-xs font-bold text-white tracking-wide">Instagram</span>
                </div>
              </div>

              <div className="w-6 h-6 rounded-lg bg-white/20 border border-white/40 flex items-center justify-center shrink-0">
                <ExternalLink className="w-3 h-3 text-white" />
              </div>
            </a>

            <p className="text-[10px] text-center text-[#5C504A]/70 font-medium pt-1.5">
              Real brides • Fresh stains • Verified client reels
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
