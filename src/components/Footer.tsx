import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import InstagramLogo from '@/components/InstagramLogo';

interface FooterProps {
  businessName?: string;
  tagline?: string;
  phone?: string;
  whatsappNumber?: string;
  email?: string;
  serviceArea?: string;
  instagramUrl?: string;
}

export default function Footer({
  businessName = 'Pallavi Mehndi Artistry',
  tagline = 'Bespoke Bridal & Contemporary Henna Artistry',
  phone = '+91 98765 43210',
  whatsappNumber = '+919876543210',
  email = 'enquiries@pallavimehndi.com',
  serviceArea = 'Salem, Tamil Nadu & Destination Travel',
  instagramUrl = 'https://www.instagram.com/salem_mehandi_artist_pallavi/',
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2B1F2A] text-[#F4EADD] border-t border-[#C6A15B]/35 py-6 sm:py-8 md:pt-16 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            MOBILE COMPACT MODERN FOOTER (< 768px: md:hidden)
           ======================================================== */}
        <div className="block md:hidden space-y-4 pb-2">
          {/* Artist / Studio Brand Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F4EADD]/10">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#C6A15B] shrink-0 shadow-sm bg-[#1E151E]">
                <img
                  src="/images/artist-avatar.jpg"
                  alt="Pallavi Devi - Lead Artist"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#F4EADD] leading-tight">
                  {businessName}
                </h3>
                <p className="text-[11px] text-[#C6A15B] flex items-center gap-1 font-medium">
                  <MapPin className="w-3 h-3 text-[#C6A15B]" />
                  <span>Salem &amp; Destination Travel</span>
                </p>
              </div>
            </div>
          </div>

          {/* Direct Quick Actions Pills (WhatsApp & Instagram) */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#F4EADD] text-xs font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Chat</span>
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Pallavi on Instagram"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#8E3445]/20 hover:bg-[#8E3445]/30 border border-[#C6A15B]/35 text-[#F4EADD] text-xs font-medium transition-colors"
            >
              <InstagramLogo size={16} variant="gradient-badge" />
              <span className="truncate">Instagram</span>
              <ExternalLink className="w-3 h-3 text-[#C6A15B] shrink-0" />
            </a>
          </div>

          {/* Compact 2-Column Links Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-1 text-xs">
            <div>
              <h4 className="font-serif text-xs font-semibold text-[#C6A15B] uppercase tracking-wider mb-2">
                Studio &amp; Art
              </h4>
              <ul className="space-y-1.5 text-[#F4EADD]/80">
                <li>
                  <a href="/services" className="hover:text-[#C6A15B] transition-colors block py-0.5">
                    Services &amp; Packages
                  </a>
                </li>
                <li>
                  <a href="/portfolio" className="hover:text-[#C6A15B] transition-colors block py-0.5">
                    Design Portfolio
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-[#C6A15B] transition-colors block py-0.5">
                    About Pallavi
                  </a>
                </li>
                <li>
                  <a href="/enquire" className="hover:text-[#C6A15B] transition-colors block py-0.5 text-[#C6A15B] font-medium">
                    Book Availability →
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xs font-semibold text-[#C6A15B] uppercase tracking-wider mb-2">
                Client Care
              </h4>
              <ul className="space-y-1.5 text-[#F4EADD]/80">
                <li>
                  <a href="/faqs" className="hover:text-[#C6A15B] transition-colors block py-0.5">
                    Stain Care &amp; FAQs
                  </a>
                </li>
                <li>
                  <a href="/faqs#booking-terms" className="hover:text-[#C6A15B] transition-colors block py-0.5">
                    Booking Terms
                  </a>
                </li>
                <li>
                  <a href="/faqs#deposit-policy" className="hover:text-[#C6A15B] transition-colors block py-0.5">
                    Deposit Policy
                  </a>
                </li>
                <li>
                  <a href="/admin/login" className="hover:text-[#C6A15B] transition-colors inline-flex items-center gap-1 py-0.5 text-[#F4EADD]/60">
                    <ShieldCheck className="w-3 h-3 text-[#C6A15B]" />
                    <span>Staff Portal</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Compact Modern Notice Strip */}
          <div className="p-2.5 rounded-lg bg-[#1E151E] border border-[#C6A15B]/25 text-[11px] leading-snug text-[#F4EADD]/75">
            <span className="text-[#C6A15B] font-semibold">Booking Notice:</span> Enquiries verify availability only. Dates are confirmed upon advance booking deposit.
          </div>

          {/* Mobile Copyright & Bottom info */}
          <div className="pt-2 text-[11px] text-[#F4EADD]/60 text-center space-y-1 border-t border-[#F4EADD]/10">
            <p>© {currentYear} {businessName}. All rights reserved.</p>
            <p className="text-[#C6A15B]/90 font-light">Handcrafted with pure organic Rajasthani henna</p>
          </div>
        </div>

        {/* ========================================================
            DESKTOP & TABLET FOOTER (>= 768px: hidden md:block)
            100% Unchanged original layout
           ======================================================== */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 pb-8 sm:pb-12 border-b border-[#F4EADD]/10">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C6A15B] to-[#8E3445] p-0.5 shadow-sm">
                  <div className="w-full h-full bg-[#2B1F2A] rounded-full flex items-center justify-center text-[#C6A15B]">
                    <Sparkles className="w-5 h-5 fill-current" />
                  </div>
                </div>
                <span className="font-serif text-xl font-bold tracking-tight text-[#F4EADD]">
                  {businessName}
                </span>
              </div>
              <p className="text-sm text-[#F4EADD]/80 leading-relaxed font-light">
                {tagline}. Handcrafted with 100% natural, triple-sifted Rajasthani henna cones and organic essential oils.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F4EADD]/10 text-[#C6A15B] border border-[#C6A15B]/40">
                  <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>{serviceArea}</span>
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-base font-semibold text-[#C6A15B] tracking-wide mb-4">
                Explore Studio
              </h4>
              <ul className="space-y-2.5 text-sm text-[#F4EADD]/80">
                <li>
                  <a href="/services" className="hover:text-[#C6A15B] transition-colors">
                    Curated Services &amp; Packages
                  </a>
                </li>
                <li>
                  <a href="/portfolio" className="hover:text-[#C6A15B] transition-colors">
                    Design Portfolio Showcase
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-[#C6A15B] transition-colors">
                    Artist Story &amp; Philosophy
                  </a>
                </li>
                <li>
                  <a href="/enquire" className="hover:text-[#C6A15B] transition-colors">
                    Check Date Availability
                  </a>
                </li>
                <li>
                  <a href="/faqs" className="hover:text-[#C6A15B] transition-colors">
                    Stain Care Guide &amp; FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Policies & Terms */}
            <div>
              <h4 className="font-serif text-base font-semibold text-[#C6A15B] tracking-wide mb-4">
                Studio Policies &amp; Terms
              </h4>
              <ul className="space-y-2.5 text-sm text-[#F4EADD]/80">
                <li>
                  <a href="/faqs#booking-terms" className="hover:text-[#C6A15B] transition-colors">
                    Booking Confirmation Rules
                  </a>
                </li>
                <li>
                  <a href="/faqs#deposit-policy" className="hover:text-[#C6A15B] transition-colors">
                    Deposit &amp; Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href="/faqs#aftercare" className="hover:text-[#C6A15B] transition-colors">
                    Henna Stain Care Guide
                  </a>
                </li>
                <li>
                  <a href="/faqs#privacy-policy" className="hover:text-[#C6A15B] transition-colors">
                    Client Privacy &amp; Consent
                  </a>
                </li>
                <li>
                  <a href="/faqs#travel-terms" className="hover:text-[#C6A15B] transition-colors">
                    Destination Travel Terms
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Social Links with Authentic Instagram Logo */}
            <div className="space-y-3">
              <h4 className="font-serif text-base font-semibold text-[#C6A15B] tracking-wide mb-4">
                Connect with Pallavi
              </h4>
              <div className="space-y-2.5 text-sm text-[#F4EADD]/85">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Pallavi on Instagram at @salem_mehandi_artist_pallavi (opens in a new tab)"
                  className="flex items-center gap-2.5 hover:text-[#C6A15B] transition-colors group/ig py-1"
                >
                  <InstagramLogo size={20} variant="gradient-badge" />
                  <span className="font-medium">@salem_mehandi_artist_pallavi</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C6A15B] opacity-75 group-hover/ig:opacity-100 transition-opacity" />
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#C6A15B] transition-colors py-1"
                >
                  <Phone className="w-4 h-4 text-[#C6A15B] shrink-0" />
                  <span>WhatsApp: {phone}</span>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 hover:text-[#C6A15B] transition-colors py-1"
                >
                  <Mail className="w-4 h-4 text-[#C6A15B] shrink-0" />
                  <span>{email}</span>
                </a>
              </div>

              <div className="pt-3">
                <a
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 text-xs text-[#F4EADD]/60 hover:text-[#C6A15B] transition-colors border border-[#F4EADD]/20 px-3 py-1.5 rounded-xl"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Staff &amp; Artist Portal</span>
                </a>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer & Confirmation Notice */}
          <div className="pt-8 text-xs text-[#F4EADD]/65 space-y-3">
            <div className="bg-[#1E151E] p-4 rounded-xl border border-[#C6A15B]/30 leading-relaxed text-[#F4EADD]/80">
              <span className="font-semibold text-[#C6A15B]">Important Booking Notice:</span> Submitting an enquiry or date request through this website does not automatically lock or reserve an event date. Every event date is verified and confirmed individually with a formal written quote and an advance booking deposit.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p>
                © {currentYear} {businessName}. All rights reserved. Salem, Tamil Nadu, India.
              </p>
              <p className="flex items-center gap-1 text-[#C6A15B]">
                Handcrafted with pure Rajasthani botanical henna &amp; bespoke care.
              </p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
