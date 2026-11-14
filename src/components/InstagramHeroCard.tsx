'use client';

import React from 'react';
import {
  ExternalLink,
  Sparkles,
  MapPin,
  ShieldCheck,
  Play,
  Award,
  Check,
  Heart,
} from 'lucide-react';
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
  const hasUploadedPhoto =
    artistImageUrl && !artistImageUrl.includes('/placeholders/');

  const storyHighlights = [
    { label: 'Bridal', icon: '💍', tag: 'Bespoke' },
    { label: 'Intricate', icon: '✨', tag: 'Fine Jaal' },
    { label: '48h Stain', icon: '🌿', tag: 'Mahogany' },
    { label: 'Salem HQ', icon: '📍', tag: 'Studio' },
    { label: 'Reels', icon: '🎥', tag: 'Watch' },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Modern Glassmorphic Container with Subtle Layered Shadows */}
      <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-[0_22px_60px_-15px_rgba(43,31,42,0.12),0_4px_16px_-2px_rgba(43,31,42,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_28px_70px_-12px_rgba(43,31,42,0.18)] hover:-translate-y-1">
        
        {/* Subtle Authentic Instagram Gradient Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]" />

        <div className="p-6 sm:p-7 space-y-5">
          {/* 1. Atelier Profile Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#C6A15B]/20">
            <div className="flex items-center gap-3.5">
              {/* Profile Avatar with Instagram Gradient Ring */}
              <div className="relative group/avatar cursor-pointer">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Pallavi's Instagram profile"
                  className="block p-0.5 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] shadow-sm transition-transform duration-300 group-hover/avatar:scale-105"
                >
                  <div className="w-13 h-13 rounded-full bg-[#FAF4EB] p-0.5 flex items-center justify-center overflow-hidden border-2 border-white">
                    {hasUploadedPhoto ? (
                      <img
                        src={artistImageUrl!}
                        alt="Pallavi"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FAF4EB] to-[#F4EADD] flex items-center justify-center">
                        <span className="font-serif text-xl font-bold text-[#8E3445]">
                          P
                        </span>
                      </div>
                    )}
                  </div>
                </a>
                {/* Active Studio Indicator */}
                <span
                  className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs"
                  title="Active Studio"
                />
              </div>

              {/* Creator Names & Handle */}
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-lg font-bold text-[#2B1F2A] tracking-tight">
                    Pallavi
                  </span>
                  <span
                    className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#C6A15B] text-white text-[10px] font-bold shadow-xs"
                    title="Verified Professional Artist"
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                </div>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#8E3445] hover:text-[#2B1F2A] transition-colors block"
                >
                  @salem_mehandi_artist_pallavi
                </a>
              </div>
            </div>

            {/* Official Studio Glass Pill */}
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FAF4EB] border border-[#C6A15B]/35 text-[10px] font-bold text-[#713E2E] tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#C6A15B]" />
              <span>Official Studio</span>
            </span>
          </div>

          {/* 2. Instagram Story Highlights Circles */}
          <div className="flex items-center justify-between px-1 py-1">
            {storyHighlights.map((story) => (
              <a
                key={story.label}
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/story flex flex-col items-center gap-1.5 focus:outline-none"
                title={`View ${story.label} stories on Instagram`}
              >
                <div className="p-[2px] rounded-full bg-gradient-to-tr from-[#C6A15B]/60 via-[#DD2A7B]/70 to-[#8134AF]/60 group-hover/story:from-[#F58529] group-hover/story:via-[#DD2A7B] group-hover/story:to-[#8134AF] transition-all duration-300 group-hover/story:scale-105">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FAF4EB] border-2 border-white flex items-center justify-center text-sm shadow-xs group-hover/story:bg-white transition-colors">
                    <span>{story.icon}</span>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-[#2B2421]/80 group-hover/story:text-[#8E3445] transition-colors">
                  {story.label}
                </span>
              </a>
            ))}
          </div>

          {/* 3. Visual Media Preview Frame (Replaces empty text-box look) */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch Pallavi's latest bridal Mehndi reel on Instagram"
            className="group/media relative block rounded-2xl overflow-hidden aspect-16/10 bg-[#2B1F2A] border border-[#C6A15B]/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#DD2A7B]"
          >
            {hasUploadedPhoto ? (
              <img
                src={artistImageUrl!}
                alt="Authentic Mehndi Work by Pallavi"
                className="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-500 ease-out"
              />
            ) : (
              /* High-End Editorial Presentation Card representing the Instagram Reel Showcase */
              <div className="w-full h-full relative flex flex-col justify-between p-4 bg-gradient-to-br from-[#2B1F2A] via-[#3B2636] to-[#713E2E] overflow-hidden">
                {/* Subtle Ceremonial Radial Accent */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(198,161,91,0.25),transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(142,52,69,0.3),transparent_60%)] pointer-events-none" />

                {/* Top Overlay Pill */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DD2A7B] animate-pulse" />
                    <span>Bridal Reel Showcase</span>
                  </span>
                  <span className="text-[10px] font-semibold text-[#C6A15B] tracking-wider uppercase bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-full">
                    Salem Bridal
                  </span>
                </div>

                {/* Center Reel Play Icon */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-[#DD2A7B] group-hover/media:scale-110 group-hover/media:bg-white transition-all duration-300">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                  <span className="mt-2 text-[11px] font-semibold text-white/90 tracking-wide drop-shadow-sm group-hover/media:text-[#C6A15B] transition-colors">
                    Watch on Instagram
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-[#F4EADD]/90 pt-2 border-t border-white/10">
                  <span className="font-serif italic">Pure Organic Henna</span>
                  <span className="font-semibold text-[#C6A15B]">Peak 48h Stain</span>
                </div>
              </div>
            )}

            {/* Hover sheen overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/media:opacity-100 transition-opacity pointer-events-none" />
          </a>

          {/* 4. Modern Attribute Micro-Pills (Replacing dense text bullets) */}
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-2.5 rounded-xl bg-[#FAF4EB]/80 border border-[#C6A15B]/25 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-[#2B1F2A] block leading-tight">
                  100% Organic Henna
                </span>
                <span className="text-[10px] text-[#2B2421]/70 leading-tight">
                  Triple-sifted Rajasthani leaves
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF4EB]/80 border border-[#C6A15B]/25 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#713E2E] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-[#2B1F2A] block leading-tight">
                  Salem HQ &amp; Travel
                </span>
                <span className="text-[10px] text-[#2B2421]/70 leading-tight">
                  Destination bridal service
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF4EB]/80 border border-[#C6A15B]/25 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8E3445] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-[#2B1F2A] block leading-tight">
                  Zero Chemicals
                </span>
                <span className="text-[10px] text-[#2B2421]/70 leading-tight">
                  Pure cajeput &amp; eucalyptus
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF4EB]/80 border border-[#C6A15B]/25 flex items-start gap-2">
              <Heart className="w-4 h-4 text-[#8E3445] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-[#2B1F2A] block leading-tight">
                  Bespoke Bridal
                </span>
                <span className="text-[10px] text-[#2B2421]/70 leading-tight">
                  Heirloom custom motifs
                </span>
              </div>
            </div>
          </div>

          {/* 5. Direct Action Link with Sleek Instagram Gradient Pill */}
          <div className="pt-2 space-y-2">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore Pallavi's real Mehndi designs on Instagram (opens in a new tab)"
              className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-5 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:from-[#f6913c] hover:via-[#e23b88] hover:to-[#8c3eb8] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#DD2A7B]/25 hover:shadow-lg hover:shadow-[#DD2A7B]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group/btn border border-white/20"
            >
              <InstagramLogo size={18} variant="glyph-only" className="text-white" />
              <span>Explore Real Designs on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>

            <p className="text-[10px] text-center text-[#2B2421]/60 font-medium">
              Salem, Tamil Nadu • Fresh Henna Stains • Verified Bridal Reels
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
