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
      <div className="relative bg-[#FFFFFF] rounded-3xl border-2 border-[#EADBCE] p-7 sm:p-8 shadow-xl overflow-hidden transition-all hover:border-[#C5A059]">
        {/* Subtle top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C5A059] via-[#B35D4D] to-[#8F3D30]" />

        {/* Header: Verified Profile Brand */}
        <div className="flex items-center justify-between pb-6 border-b border-[#FAF5EE]">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] p-0.5 shadow-sm">
              <div className="w-full h-full bg-[#FAF5EE] rounded-[14px] flex items-center justify-center text-[#B35D4D]">
                <Camera className="w-6 h-6 text-[#DD2A7B]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg font-bold text-[#241416]">
                  Pallavi
                </span>
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#C5A059] text-white text-[10px] font-bold" title="Verified Artist">
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

          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#FAF5EE] text-[#8F3D30] border border-[#EADBCE]">
            Official Profile
          </span>
        </div>

        {/* Real photo showcase if uploaded by owner */}
        {hasUploadedPhoto && (
          <div className="my-5 rounded-2xl overflow-hidden border border-[#EADBCE] aspect-4/3 bg-[#FAF5EE]">
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
            <MapPin className="w-4 h-4 text-[#B35D4D] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#241416] block font-semibold">Verified Location</strong>
              <span>{serviceArea}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#241416] block font-semibold">100% Organic Rajasthani Henna</strong>
              <span>Triple-sifted natural leaf powder, pure eucalyptus &amp; cajeput essential oils. No chemicals or synthetic PPD.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#8F3D30] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#241416] block font-semibold">Authentic Photography Notice</strong>
              <span>All genuine client designs, bridal reels, and stain maturating results are showcased on Pallavi's official Instagram.</span>
            </div>
          </div>
        </div>

        {/* Direct Action Link to Instagram */}
        <div className="pt-4 border-t border-[#FAF5EE] space-y-2.5">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#DD2A7B] to-[#8134AF] hover:from-[#C13584] hover:to-[#5851DB] text-white font-medium text-xs py-3 px-4 rounded-xl shadow-sm hover:shadow transition-all group"
          >
            <Camera className="w-4 h-4 text-white" />
            <span>Explore Real Designs on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <p className="text-[11px] text-center text-[#241416]/50">
            Real brides • Fresh henna stains • Verified client reviews
          </p>
        </div>
      </div>
    </div>
  );
}
