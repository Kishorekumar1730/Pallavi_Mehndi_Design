'use client';

import React, { useState } from 'react';
import { Sparkles, Menu, X, CalendarCheck, ShieldCheck } from 'lucide-react';
import InstagramLogo from '@/components/InstagramLogo';

interface NavbarProps {
  businessName?: string;
  tagline?: string;
  phone?: string;
  whatsappNumber?: string;
  instagramUrl?: string;
}

export default function Navbar({
  businessName = 'Pallavi Mehndi Artistry',
  tagline = 'Bespoke Bridal & Contemporary Henna',
  phone = '+91 98765 43210',
  whatsappNumber = '+919876543210',
  instagramUrl = 'https://www.instagram.com/salem_mehandi_artist_pallavi/',
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/75 border-b border-[#C6A15B]/25 transition-all shadow-[0_4px_20px_rgba(43,31,42,0.04)]">
      {/* Top Banner Notice in Deep Midnight Plum */}
      <div className="bg-[#20141E] text-white text-[11px] sm:text-xs py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2 border-b border-[#C6A15B]/20 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
        <span>100% Hand-Blended Organic Rajasthani Henna • Certified Pure &amp; Chemical-Free</span>
        <span className="hidden sm:inline text-[#C6A15B]">•</span>
        <span className="hidden sm:inline text-white/80">Salem, Tamil Nadu &amp; Destination Travel</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a
            href="/"
            className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] rounded-xl p-1"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#C6A15B] bg-[#FAF5EE] p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#8E3445] border border-[#C6A15B]/30 shadow-inner">
                <Sparkles className="w-5 h-5 text-[#C6A15B]" />
              </div>
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#2B1F2A] group-hover:text-[#8E3445] transition-colors leading-tight">
                {businessName}
              </span>
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#713E2E] font-semibold">
                Bespoke Bridal &amp; Henna Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            <a
              href="/"
              className="text-sm font-semibold text-[#2B2421] hover:text-[#8E3445] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8E3445] hover:after:w-full after:transition-all"
            >
              Home
            </a>
            <a
              href="/services"
              className="text-sm font-semibold text-[#2B2421] hover:text-[#8E3445] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8E3445] hover:after:w-full after:transition-all"
            >
              Services
            </a>
            <a
              href="/portfolio"
              className="text-sm font-semibold text-[#2B2421] hover:text-[#8E3445] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8E3445] hover:after:w-full after:transition-all"
            >
              Portfolio
            </a>
            <a
              href="/about"
              className="text-sm font-semibold text-[#2B2421] hover:text-[#8E3445] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8E3445] hover:after:w-full after:transition-all"
            >
              About
            </a>
            <a
              href="/faqs"
              className="text-sm font-semibold text-[#2B2421] hover:text-[#8E3445] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8E3445] hover:after:w-full after:transition-all"
            >
              FAQs &amp; Care
            </a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Authentic Instagram Brand Link */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Pallavi on Instagram (opens in a new tab)"
              className="hidden sm:inline-flex items-center gap-2 btn-glossy-secondary text-xs px-3.5 py-2 group/ig"
              title="Follow @salem_mehandi_artist_pallavi on Instagram"
            >
              <InstagramLogo size={17} variant="gradient-badge" />
              <span className="font-semibold text-[#2B1F2A] group-hover/ig:text-[#8E3445]">Instagram</span>
            </a>

            {/* Book Your Date CTA (Glossy 3D Pomegranate Button) */}
            <a
              href="/enquire"
              className="btn-glossy-primary text-xs sm:text-sm px-4 sm:px-5 py-2.5 gap-2 group shadow-md"
            >
              <CalendarCheck className="w-4 h-4 text-[#F4EADD] group-hover:scale-110 transition-transform" />
              <span>Book Your Date</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#2B1F2A] hover:text-[#8E3445] focus:outline-none rounded-xl"
              aria-label="Toggle mobile navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#F4EADD] border-b border-[#C6A15B]/40 px-5 pt-4 pb-7 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-md">
          <a
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 text-base font-semibold text-[#2B2421] hover:bg-white/60 rounded-xl transition-colors"
          >
            Home
          </a>
          <a
            href="/services"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 text-base font-semibold text-[#2B2421] hover:bg-white/60 rounded-xl transition-colors"
          >
            Services &amp; Packages
          </a>
          <a
            href="/portfolio"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 text-base font-semibold text-[#2B2421] hover:bg-white/60 rounded-xl transition-colors"
          >
            Portfolio Showcase
          </a>
          <a
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 text-base font-semibold text-[#2B2421] hover:bg-white/60 rounded-xl transition-colors"
          >
            About Pallavi
          </a>
          <a
            href="/faqs"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 text-base font-semibold text-[#2B2421] hover:bg-white/60 rounded-xl transition-colors"
          >
            FAQs &amp; Stain Care
          </a>

          <div className="pt-3 border-t border-[#C6A15B]/30 flex flex-col gap-2.5">
            <a
              href="/enquire"
              onClick={() => setIsOpen(false)}
              className="w-full btn-elevated-primary py-3 gap-2 text-sm"
            >
              <CalendarCheck className="w-4 h-4 text-[#F4EADD]" />
              <span>Send Booking Enquiry</span>
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Pallavi on Instagram (opens in a new tab)"
              className="w-full btn-elevated-secondary py-2.5 gap-2 text-sm justify-center"
            >
              <InstagramLogo size={18} variant="gradient-badge" />
              <span>Follow @salem_mehandi_artist_pallavi</span>
            </a>

            <a
              href="/admin/login"
              className="text-center text-xs text-[#713E2E] hover:underline pt-1 flex items-center justify-center gap-1 font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Management Portal</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
