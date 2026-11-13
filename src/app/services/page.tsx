import React from 'react';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { CalendarCheck } from 'lucide-react';

export const revalidate = 60;

export default async function ServicesPage() {
  const settings = await prisma.businessSettings.findUnique({
    where: { id: 'default-settings' },
  });

  const categories = await prisma.serviceCategory.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
    include: {
      services: {
        where: { isPublished: true },
        orderBy: { displayOrder: 'asc' },
      },
    },
  });

  const businessName = settings?.businessName || 'Pallavi Mehndi Artistry';
  const tagline = settings?.tagline || 'Bespoke Bridal & Contemporary Henna';
  const serviceArea = settings?.serviceArea || 'Salem, Tamil Nadu & Destination Travel';
  const phone = settings?.phone || '+91 98765 43210';
  const whatsappNumber = settings?.whatsappNumber || '+919876543210';
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/salem_mehandi_artist_pallavi/';
  const backgroundThemeUrl = settings?.backgroundThemeUrl || settings?.heroImageUrl;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EADD]">
      <Navbar
        businessName={businessName}
        tagline={tagline}
        phone={phone}
        whatsappNumber={whatsappNumber}
        instagramUrl={instagramUrl}
      />

      <main className="flex-1">
        {/* Page Header */}
        <section className="py-16 sm:py-20 bg-[#FAF4EB] border-b border-[#C6A15B]/30 text-center relative overflow-hidden">
          {backgroundThemeUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.05] mix-blend-multiply pointer-events-none"
              style={{ backgroundImage: `url(${backgroundThemeUrl})` }}
            />
          ) : null}

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
            <span className="heritage-badge text-xs">
              Studio Catalog &amp; Investment Guide
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2B1F2A]">
              Curated Services &amp; Packages
            </h1>
            <p className="text-base text-[#2B2421]/75 max-w-2xl mx-auto leading-relaxed font-light">
              Each session includes freshly prepared, 100% natural Rajasthani henna cones, customized layout planning, and dedicated aftercare guidance.
            </p>
          </div>
        </section>

        {/* Services Grouped by Category */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {categories.map((cat) => (
            <div key={cat.id} className="space-y-6">
              <div className="border-b border-[#C6A15B]/35 pb-3">
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1F2A]">
                    {cat.name}
                  </h2>
                </div>
                {cat.description && (
                  <p className="text-xs sm:text-sm text-[#2B2421]/70 mt-1 max-w-3xl">
                    {cat.description}
                  </p>
                )}
              </div>

              {cat.services.length === 0 ? (
                <p className="text-xs text-[#2B2421]/50 italic">No services listed under this category yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={{
                        ...service,
                        category: { name: cat.name },
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* What Information We Need for a Bespoke Quote */}
        <section className="py-16 bg-[#FAF4EB] border-t border-[#C6A15B]/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="heritage-badge text-xs">
                Planning Your Booking
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#2B1F2A]">
                What We Need to Prepare Your Quote
              </h2>
              <p className="text-xs sm:text-sm text-[#2B2421]/75">
                Every wedding and celebration is unique. When reaching out, having these four details ready helps us provide an accurate quote and confirm date availability:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card-floating p-6 space-y-2.5 text-center sm:text-left">
                <span className="w-8 h-8 rounded-full bg-[#F4EADD] text-[#8E3445] font-bold text-xs flex items-center justify-center border border-[#C6A15B]/40 shadow-xs mx-auto sm:mx-0">
                  1
                </span>
                <h4 className="font-serif text-base font-bold text-[#2B1F2A]">Exact Event Date</h4>
                <p className="text-xs text-[#2B2421]/70 leading-relaxed">
                  Date of your main ceremony or Mehendi party, and preferred start time.
                </p>
              </div>

              <div className="card-floating p-6 space-y-2.5 text-center sm:text-left">
                <span className="w-8 h-8 rounded-full bg-[#F4EADD] text-[#8E3445] font-bold text-xs flex items-center justify-center border border-[#C6A15B]/40 shadow-xs mx-auto sm:mx-0">
                  2
                </span>
                <h4 className="font-serif text-base font-bold text-[#2B1F2A]">Venue Location</h4>
                <p className="text-xs text-[#2B2421]/70 leading-relaxed">
                  City, banquet hall, mandapam, or home residence address (in Salem or outstation).
                </p>
              </div>

              <div className="card-floating p-6 space-y-2.5 text-center sm:text-left">
                <span className="w-8 h-8 rounded-full bg-[#F4EADD] text-[#8E3445] font-bold text-xs flex items-center justify-center border border-[#C6A15B]/40 shadow-xs mx-auto sm:mx-0">
                  3
                </span>
                <h4 className="font-serif text-base font-bold text-[#2B1F2A]">Coverage Scope</h4>
                <p className="text-xs text-[#2B2421]/70 leading-relaxed">
                  Bridal hand length (wrist, forearm, elbow), feet coverage, and number of guests.
                </p>
              </div>

              <div className="card-floating p-6 space-y-2.5 text-center sm:text-left">
                <span className="w-8 h-8 rounded-full bg-[#F4EADD] text-[#8E3445] font-bold text-xs flex items-center justify-center border border-[#C6A15B]/40 shadow-xs mx-auto sm:mx-0">
                  4
                </span>
                <h4 className="font-serif text-base font-bold text-[#2B1F2A]">Style Vision</h4>
                <p className="text-xs text-[#2B2421]/70 leading-relaxed">
                  Traditional South Indian, Rajasthani jaal, Gulf Arabic, or custom storytelling initials.
                </p>
              </div>
            </div>

            <div className="text-center pt-10">
              <a
                href="/enquire"
                className="btn-elevated-primary text-sm px-8 py-3.5 gap-2"
              >
                <CalendarCheck className="w-4 h-4 text-[#F4EADD]" />
                <span>Submit Your Date Enquiry</span>
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
        instagramUrl={instagramUrl}
      />
    </div>
  );
}
