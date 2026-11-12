import React from 'react';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortfolioGallery from '@/components/PortfolioGallery';
import { Sparkles, ShieldCheck, Heart, Camera } from 'lucide-react';


export default async function PortfolioPage() {
  const settings = await prisma.businessSettings.findUnique({
    where: { id: 'default-settings' },
  });

  const portfolioItems = await prisma.portfolioItem.findMany({
    where: { published: true },
    orderBy: { displayOrder: 'asc' },
  });

  const businessName = settings?.businessName || 'Pallavi Mehndi Artistry';
  const tagline = settings?.tagline || 'Bespoke Bridal & Contemporary Henna';
  const serviceArea = settings?.serviceArea || 'Salem, Tamil Nadu & Destination Travel';
  const phone = settings?.phone || '+91 98765 43210';
  const whatsappNumber = settings?.whatsappNumber || '+919876543210';

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar
        businessName={businessName}
        tagline={tagline}
        phone={phone}
        whatsappNumber={whatsappNumber}
      />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 sm:py-20 bg-[#FAF5EE] border-b border-[#EADBCE]/60 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F3D30]">
              Visual Design Showcase
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#241416]">
              Portfolio of Ephemeral Art
            </h1>
            <p className="text-base text-[#241416]/75 max-w-2xl mx-auto leading-relaxed font-light">
              Explore our collection of bridal storytelling palms, intricate traditional jaal work, flowing Arabic florals, and modern minimalist accents.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs text-[#8F3D30] bg-white border border-[#EADBCE]">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>All client images are displayed with explicit permission &amp; consent</span>
              </span>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioGallery items={portfolioItems} />
        </section>

        {/* Consultation Callout */}
        <section className="py-16 bg-[#FAF5EE] border-t border-[#EADBCE]/60 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto" />
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241416]">
              Have a Specific Motif or Vision in Mind?
            </h3>
            <p className="text-xs sm:text-sm text-[#241416]/75 max-w-xl mx-auto leading-relaxed">
              We frequently incorporate bespoke elements—from wedding logo monograms and sacred shlokas to pet illustrations and love story skylines.
            </p>
            <div className="pt-2">
              <a
                href="/enquire"
                className="inline-flex items-center gap-2 bg-[#B35D4D] hover:bg-[#8F3D30] text-white font-medium text-sm px-7 py-3.5 rounded-full shadow-md transition-all"
              >
                <span>Request a Custom Design Consultation</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer
        businessName={businessName}
        tagline={tagline}
        phone={phone}
        whatsappNumber={whatsappNumber}
        serviceArea={serviceArea}
      />
    </div>
  );
}
