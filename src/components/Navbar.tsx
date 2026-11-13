'use client';

import React, { useState } from 'react';
import { Sparkles, Menu, X, Phone, CalendarCheck, ShieldCheck } from 'lucide-react';
import { translations, Language } from '@/lib/language';

interface NavbarProps {
  businessName?: string;
  tagline?: string;
  phone?: string;
  whatsappNumber?: string;
}

export default function Navbar({
  businessName = 'Pallavi Mehndi Artistry',
  tagline = 'Bespoke Bridal & Contemporary Henna',
  phone = '+91 98765 43210',
  whatsappNumber = '+919876543210',
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');

  const t = translations[lang].nav;

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ta' : 'en';
    setLang(nextLang);
    // Dispatch an event so other client components can update language reactively
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('lang-change', { detail: nextLang }));
      localStorage.setItem('preferred_lang', nextLang);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FDFBF7]/90 border-b border-[#EADBCE]/80 transition-all">
      {/* Top Banner Notice */}
      <div className="bg-[#241416] text-[#EADBCE] text-xs py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>100% Hand-Blended Organic Rajasthani Henna • Certified Chemical-Free & Dark Stain</span>
        <span className="hidden md:inline">• Salem & Destination Travel</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#C5A059] via-[#B35D4D] to-[#241416] p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#FAF5EE] rounded-full flex items-center justify-center text-[#B35D4D]">
                <Sparkles className="w-5 h-5 text-[#C5A059]" style={{ width: 20, height: 20 }} />
              </div>
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#241416] group-hover:text-[#B35D4D] transition-colors">
                {businessName}
              </span>
              <span className="block text-[11px] uppercase tracking-wider text-[#B35D4D] font-medium">
                {lang === 'ta' ? 'பாரம்பரிய மருதாணி கலை' : 'Bespoke Bridal & Henna Studio'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="/"
              className="text-sm font-medium text-[#241416] hover:text-[#B35D4D] transition-colors py-1"
            >
              {t.home}
            </a>
            <a
              href="/services"
              className="text-sm font-medium text-[#241416] hover:text-[#B35D4D] transition-colors py-1"
            >
              {t.services}
            </a>
            <a
              href="/portfolio"
              className="text-sm font-medium text-[#241416] hover:text-[#B35D4D] transition-colors py-1"
            >
              {t.portfolio}
            </a>
            <a
              href="/about"
              className="text-sm font-medium text-[#241416] hover:text-[#B35D4D] transition-colors py-1"
            >
              {t.about}
            </a>
            <a
              href="/faqs"
              className="text-sm font-medium text-[#241416] hover:text-[#B35D4D] transition-colors py-1"
            >
              {t.faqs}
            </a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language between English and Tamil"
              className="px-2.5 py-1.5 text-xs font-semibold rounded-full border border-[#C5A059]/40 bg-[#FAF5EE] text-[#8F3D30] hover:bg-[#C5A059]/15 transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'தமிழ் (TA)' : 'English (EN)'}
            </button>

            {/* Book Your Date CTA */}
            <a
              href="/enquire"
              className="hidden sm:inline-flex items-center gap-2 bg-[#B35D4D] hover:bg-[#8F3D30] text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-sm hover:shadow transition-all group"
            >
              <CalendarCheck className="w-4 h-4 text-[#E6C875] group-hover:scale-110 transition-transform" />
              <span>{t.enquire}</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#241416] hover:text-[#B35D4D] focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#FAF5EE] border-b border-[#EADBCE] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <a
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#241416] hover:bg-[#EADBCE]/40 rounded-lg"
          >
            {t.home}
          </a>
          <a
            href="/services"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#241416] hover:bg-[#EADBCE]/40 rounded-lg"
          >
            {t.services}
          </a>
          <a
            href="/portfolio"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#241416] hover:bg-[#EADBCE]/40 rounded-lg"
          >
            {t.portfolio}
          </a>
          <a
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#241416] hover:bg-[#EADBCE]/40 rounded-lg"
          >
            {t.about}
          </a>
          <a
            href="/faqs"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#241416] hover:bg-[#EADBCE]/40 rounded-lg"
          >
            {t.faqs}
          </a>
          <div className="pt-2 border-t border-[#EADBCE]/60 flex flex-col gap-2">
            <a
              href="/enquire"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#B35D4D] text-white py-2.5 px-4 rounded-xl font-medium shadow-sm"
            >
              <CalendarCheck className="w-4 h-4 text-[#E6C875]" />
              <span>{t.enquire}</span>
            </a>
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-[#C5A059] text-[#241416] py-2 px-4 rounded-xl text-sm font-medium"
            >
              <Phone className="w-4 h-4 text-[#C5A059]" />
              <span>WhatsApp: {phone}</span>
            </a>
            <a
              href="/admin/login"
              className="text-center text-xs text-[#8F3D30] hover:underline pt-1 flex items-center justify-center gap-1"
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

