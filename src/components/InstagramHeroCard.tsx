'use client';

import React from 'react';
import { Camera, ExternalLink, Sparkles, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

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
        {/* Traditional Antique Gold & Terracotta Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C5A059] via-[#8F3D30] to-[#2D4A3E]" />

        {/* Delicate Traditional Corner Flourish / Subtle Inner Accent */}
        <div className="absolute top-3 right-3 text-[#C5A059]/40 select-none pointer-events-none text-xs font-serif">
          ✦
        </div>

        {/* Header: Verified Profile Brand */}
        <div className="flex items-center justify-between pb-5 border-b border-[#EADBCE]">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#FAF5EE] rounded-[14px] flex items-center justify-center text-[#8F3D30]">
                <Camera className="w-6 h-6 text-[#DD2A7B]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg font-bold text-[#241416]">
                  Pallavi
                </span>
                <span
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#C5A059] text-white text-[10px] font-bold shadow-xs"
                  title="Verified Professional Artist"
                >
                  ✓
                </span>
              </div>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#8F3D30] hover:text-[#241416] transition-colors block"
              >
                @salem_mehandi_artist_pallavi
              </a>
            </div>
          </div>

          <span className="heritage-pill text-[10px]">
            Official Studio
          </span>
        </div>

        {/* Real photo showcase if uploaded by owner */}
        {hasUploadedPhoto && (
          <div className="my-5 rounded-2xl overflow-hidden border border-[#EADBCE] aspect-4/3 bg-[#FAF5EE] shadow-inner">
            <img
              src={artistImageUrl}
              alt="Authentic Mehndi Work by Pallavi"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Authentic Information & Instagram Highlights */}
        <div className="py-5 space-y-3.5 text-xs text-[#241416]/80">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#2D4A3E] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#241416] block font-semibold">Verified Location</strong>
              <span>{serviceArea}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#241416] block font-semibold">100% Organic Rajasthani Henna</strong>
              <span>Triple-sifted natural leaf powder, eucalyptus &amp; cajeput pure essential oils. Chemical-free, no black henna or PPD.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#8F3D30] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#241416] block font-semibold">Authentic Photography Notice</strong>
              <span>Genuine client designs, bridal reels, and stain progressions are showcased directly on Pallavi&apos;s official Instagram.</span>
            </div>
          </div>
        </div>

        {/* Direct Action Link to Instagram (Raised elevated button) */}
        <div className="pt-4 border-t border-[#EADBCE] space-y-2.5">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#DD2A7B] via-[#C13584] to-[#8134AF] hover:from-[#C13584] hover:to-[#5851DB] text-white font-semibold text-xs py-3 px-4 rounded-full shadow-[0_4px_14px_rgba(221,42,123,0.32)] hover:shadow-[0_6px_20px_rgba(221,42,123,0.45)] hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] transition-all group/btn"
          >
            <Camera className="w-4 h-4 text-white" />
            <span>Explore Real Designs on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>

          <p className="text-[11px] text-center text-[#241416]/60">
            Real brides • Fresh henna stains • Verified client reviews
          </p>
        </div>
      </div>
    </div>
  );
}
