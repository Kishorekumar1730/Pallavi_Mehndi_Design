import React from 'react';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnquiryForm from '@/components/EnquiryForm';
import { ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function EnquirePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; style?: string }>;
}) {
  const params = await searchParams;
  const preselectedService = params?.service || '';
  const preselectedStyle = params?.style || '';

  const settings = await prisma.businessSettings.findUnique({
    where: { id: 'default-settings' },
  });

  const services = await prisma.service.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      name: true,
      startingPrice: true,
      priceType: true,
    },
    orderBy: { displayOrder: 'asc' },
  });

  const businessName = settings?.businessName || 'Pallavi Mehndi Artistry';
  const tagline = settings?.tagline || 'Bespoke Bridal & Contemporary Henna';
  const serviceArea = settings?.serviceArea || 'Salem, Tamil Nadu & Destination Travel';
  const phone = settings?.phone || '+91 98765 43210';
  const whatsappNumber = settings?.whatsappNumber || '+919876543210';
  const backgroundThemeUrl = settings?.backgroundThemeUrl;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EADD]">
      <Navbar
        businessName={businessName}
        tagline={tagline}
        phone={phone}
        whatsappNumber={whatsappNumber}
      />

      <main className="flex-1 py-8 md:py-16 relative overflow-hidden">
        {backgroundThemeUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.05] mix-blend-multiply pointer-events-none"
            style={{ backgroundImage: `url(${backgroundThemeUrl})` }}
          />
        ) : null}

        <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center space-y-2.5 md:space-y-3 mb-6 md:mb-10">
            <span className="heritage-badge text-xs">
              Availability Check &amp; Bespoke Consultation
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#2B1F2A]">
              Request a Booking Enquiry
            </h1>
            <p className="text-xs sm:text-base text-[#2B2421]/80 max-w-xl mx-auto leading-relaxed font-light">
              Submit your event details below. We verify calendar availability and respond within 24 hours with a comprehensive quote.
            </p>

            <div className="pt-1 md:pt-2">
              <span className="inline-flex items-center gap-1.5 md:gap-2 text-[11px] md:text-xs text-[#8E3445] bg-[#FAF4EB] border border-[#C6A15B]/30 px-3 py-1 md:px-4 md:py-1.5 rounded-full shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#C6A15B]" />
                <span>Non-binding enquiry • No immediate charge</span>
              </span>
            </div>
          </div>

          {/* Multi-step Form */}
          <EnquiryForm
            services={services}
            preselectedServiceId={preselectedService}
            preselectedStyle={preselectedStyle}
            whatsappNumber={whatsappNumber}
            phone={phone}
          />
        </div>
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
