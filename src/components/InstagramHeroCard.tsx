'use client';

import React from 'react';
import { ExternalLink, Sparkles, MapPin, ShieldCheck } from 'lucide-react';
import InstagramLogo from '@/components/InstagramLogo';

interface InstagramHeroCardProps {
  instagramUrl?: string;
  artistImageUrl?: string | null;
  serviceArea?: string;
}

export default function InstagramHeroCard({
  instagramUrl = 'https://www.instagram.com/salem_mehandi_artist_pallavi/',
  artistImageUrl,
  serviceArea = 'Salem, Tamil Nadu & Destination Travel',
}: InstagramHeroCardProps) {
  const hasUploadedPhoto = artistImageUrl && !artistImageUrl.includes('/placeholders/');

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card-floating-prominent relative p-7 sm:p-8 overflow-hidden group">
        {/* Ceremonial Accent Top Bar: Antique Gold, Pomegranate, Midnight Plum */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C6A15B] via-[#8E3445] to-[#2B1F2A]" />

        {/* Delicate Antique Gold Corner Flourish */}
        <div className="absolute top-3.5 right-4 text-[#C6A15B]/50 select-none pointer-events-none text-xs font-serif">
          ✦
        </div>

        {/* Header: Verified Profile Brand with Authentic Instagram Logo */}
        <div className="flex items-center justify-between pb-5 border-b border-[#C6A15B]/25">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] p-0.5 shadow-xs group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#FAF4EB] rounded-[14px] flex items-center justify-center">
                <InstagramLogo size={24} variant="glyph-only" className="text-[#DD2A7B]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg font-bold text-[#2B1F2A]">
                  Pallavi
                </span>
                <span
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#C6A15B] text-white text-[10px] font-bold shadow-xs"
                  title="Verified Professional Artist"
                >
                  ✓
                </span>
              </div>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Pallavi's Instagram profile @salem_mehandi_artist_pallavi (opens in a new tab)"
                className="text-xs font-semibold text-[#8E3445] hover:text-[#2B1F2A] transition-colors block"
              >
                @salem_mehandi_artist_pallavi
              </a>
            </div>
          </div>

          <span className="heritage-badge text-[10px]">
            Official Studio
          </span>
        </div>

        {/* Real photo showcase if uploaded by owner */}
        {hasUploadedPhoto && (
          <div className="my-5 rounded-2xl overflow-hidden border border-[#C6A15B]/40 aspect-4/3 bg-[#F4EADD] shadow-inner">
            <img
              src={artistImageUrl}
              alt="Authentic Mehndi Work by Pallavi"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Authentic Information & Highlights */}
        <div className="py-5 space-y-3.5 text-xs text-[#2B2421]/85">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#713E2E] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2B1F2A] block font-semibold">Verified Location</strong>
              <span>{serviceArea}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2B1F2A] block font-semibold">100% Organic Rajasthani Henna</strong>
              <span>Triple-sifted natural leaf powder, eucalyptus &amp; cajeput pure essential oils. Chemical-free, no black henna or synthetic PPD.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#8E3445] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2B1F2A] block font-semibold">Authentic Photography Notice</strong>
              <span>All genuine client designs, bridal reels, and stain progressions are showcased directly on Pallavi&apos;s official Instagram.</span>
            </div>
          </div>
        </div>

        {/* Direct Action Link to Instagram with Authentic Instagram Button */}
        <div className="pt-4 border-t border-[#C6A15B]/25 space-y-2.5">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore Pallavi's real Mehndi designs on Instagram (opens in a new tab)"
            className="w-full btn-elevated-instagram text-xs py-3 px-4 gap-2 group/btn"
          >
            <InstagramLogo size={18} variant="glyph-only" className="text-white" />
            <span>Explore Real Designs on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>

          <p className="text-[11px] text-center text-[#2B2421]/60">
            Real brides • Fresh henna stains • Verified client reels
          </p>
        </div>
      </div>
    </div>
  );
}
