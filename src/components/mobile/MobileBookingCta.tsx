'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarCheck, MapPin, ExternalLink, MessageCircle, Phone } from 'lucide-react';

interface MobileBookingCtaProps {
  studioAddress?: string;
  mapEmbedUrl?: string;
  mapDirectionsUrl?: string;
  whatsappNumber?: string;
  phone?: string;
}

export default function MobileBookingCta({
  studioAddress = 'Salem, Tamil Nadu, India',
  mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125026.04415444658!2d78.07765365476532!3d11.664325016259835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1ccf52cba0b%3A0xee9989007068ca47!2sSalem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  mapDirectionsUrl = 'https://maps.google.com/?q=Salem,+Tamil+Nadu,+India',
  whatsappNumber = '+919876543210',
  phone = '+91 98765 43210',
}: MobileBookingCtaProps) {
  const cleanWhatsAppNumber = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section className="py-10 px-4 bg-[#2B1F2A] text-[#F4EADD] border-t border-[#C6A15B]/35 relative overflow-hidden">
      {/* Soft Ambient Glows */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#8E3445]/20 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#C6A15B]/15 blur-2xl pointer-events-none" />

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        {/* Callout Header */}
        <div className="text-center space-y-2">
          <span className="heritage-badge-plum text-[10px]">
            Planning Your Wedding or Celebration?
          </span>
          <h2 className="font-serif text-2xl font-bold leading-tight text-white">
            Let&apos;s Create Timeless Ephemeral Art for Your Special Date
          </h2>
          <p className="text-xs text-[#F4EADD]/80 leading-relaxed font-light">
            We recommend reserving 3 to 6 months in advance for auspicious muhurtham dates.
          </p>
        </div>

        {/* Primary Booking & WhatsApp Actions */}
        <div className="space-y-2.5">
          <Link
            href="/enquire"
            className="w-full btn-glossy-primary py-3.5 px-5 text-xs font-bold flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-transform"
          >
            <CalendarCheck className="w-4 h-4 text-[#F4EADD]" />
            <span>Check Date Availability</span>
          </Link>

          <a
            href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello Pallavi! I would like to check availability for my celebration date.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-elevated-green py-3 px-5 text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-transform shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Fast-Track on WhatsApp: {phone}</span>
          </a>

          <p className="text-[10px] text-center text-[#F4EADD]/60 pt-0.5">
            All bookings are verified personally by the artist before confirmation.
          </p>
        </div>

        {/* Studio Location & Interactive Map Card */}
        <div className="bg-[#1E151E]/90 border border-[#C6A15B]/35 rounded-2xl p-4 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B]/40 flex items-center justify-center text-[#DFBF7D] shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="font-serif text-sm font-bold text-white block leading-tight truncate">
                  Salem Henna Studio
                </span>
                <span className="text-[10px] text-[#DFBF7D] block truncate">
                  {studioAddress}
                </span>
              </div>
            </div>

            <span className="shrink-0 px-2 py-0.5 rounded-full bg-white/10 text-[9px] uppercase font-bold text-[#DFBF7D] border border-white/10">
              Verified
            </span>
          </div>

          {/* Interactive Map Frame with No Horizontal Overflow */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-[#C6A15B]/30 bg-[#140D14]">
            <iframe
              src={mapEmbedUrl}
              title="Studio Location Map"
              className="w-full h-full border-0 filter saturate-[0.9]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Pulsing Verified Pin Badge */}
            <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#2B1F2A]/90 backdrop-blur-md border border-[#C6A15B]/40 text-[9px] text-white flex items-center gap-1.5 shadow-sm pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate">{studioAddress}</span>
            </div>
          </div>

          {/* Directions Link */}
          <div className="pt-1 flex items-center justify-between text-xs">
            <span className="text-[11px] text-[#F4EADD]/70">
              Tamil Nadu &amp; Destination Travel
            </span>

            <a
              href={mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#C6A15B]/25 hover:bg-[#C6A15B]/35 border border-[#C6A15B]/50 text-[#DFBF7D] text-[11px] font-semibold transition-colors shrink-0"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
