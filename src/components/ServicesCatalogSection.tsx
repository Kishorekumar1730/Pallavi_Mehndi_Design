'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Check, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import Mobile3DCarousel from '@/components/Mobile3DCarousel';
import ServiceCard, { ServiceData } from '@/components/ServiceCard';

export interface SerializedCategory {
  id: string;
  name: string;
  nameTa?: string | null;
  description?: string | null;
  services: ServiceData[];
}

interface ServicesCatalogSectionProps {
  categories: SerializedCategory[];
}

export default function ServicesCatalogSection({ categories }: ServicesCatalogSectionProps) {
  const formatPrice = (service: ServiceData) => {
    if (service.priceType === 'QUOTE_ONLY' || !service.startingPrice) {
      return 'Quote on Request';
    }
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(service.startingPrice);

    return service.priceType === 'STARTING_FROM' ? `From ${formatted}` : formatted;
  };

  const formatDuration = (mins?: number | null) => {
    if (!mins) return null;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (hours > 0 && remainingMins > 0) return `${hours}h ${remainingMins}m`;
    if (hours > 0) return `${hours} hrs`;
    return `${remainingMins}m`;
  };

  return (
    <div className="space-y-10 md:space-y-16">
      {categories.map((cat) => {
        const publishedServices = cat.services;

        return (
          <div key={cat.id} className="space-y-4 md:space-y-6">
            {/* Category Header */}
            <div className="border-b border-[#C6A15B]/35 pb-2.5 sm:pb-3">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#2B1F2A]">
                  {cat.name}
                </h2>
                {/* Mobile item count badge */}
                <span className="block md:hidden text-[10px] font-semibold text-[#8E3445] bg-[#FAF4EB] border border-[#C6A15B]/30 px-2.5 py-0.5 rounded-full">
                  {publishedServices.length} {publishedServices.length === 1 ? 'Package' : 'Packages'}
                </span>
              </div>
              {cat.description && (
                <p className="text-xs sm:text-sm text-[#2B2421]/75 mt-1 max-w-3xl font-light">
                  {cat.description}
                </p>
              )}
            </div>

            {publishedServices.length === 0 ? (
              <p className="text-xs text-[#2B2421]/50 italic">No services listed under this category yet.</p>
            ) : (
              <>
                {/* =========================================================================
                    MOBILE VIEW (< 768px):
                    If multiple services: Auto-advancing 3D Card Carousel
                    If single service: Compact single card
                    ========================================================================= */}
                <div className="block md:hidden">
                  {publishedServices.length > 1 ? (
                    <Mobile3DCarousel
                      items={publishedServices}
                      heightClass="h-[470px]"
                      ariaLabel={`${cat.name} Packages`}
                      renderItem={(service, isActive) => {
                        const inclusionsList = service.inclusions
                          ? service.inclusions
                              .split(/[,;\n]/)
                              .map((i) => i.trim())
                              .filter(Boolean)
                          : [];

                        return (
                          <div className="w-full h-full bg-white rounded-3xl overflow-hidden border border-[#C6A15B]/35 shadow-xl flex flex-col justify-between">
                            <div>
                              {/* Photo Header */}
                              {service.imageUrl && (
                                <div className="relative h-40 w-full overflow-hidden bg-[#F4EADD] border-b border-[#C6A15B]/25">
                                  <img
                                    src={service.imageUrl}
                                    alt={service.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B1F2A]/90 via-[#2B1F2A]/20 to-transparent pointer-events-none" />
                                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2B1F2A]/90 text-[#F4EADD] border border-[#C6A15B]/40">
                                      {cat.name}
                                    </span>
                                    {service.durationMinutes && (
                                      <span className="flex items-center gap-1 text-[10px] bg-[#2B1F2A]/85 px-2 py-0.5 rounded-full text-[#F4EADD] border border-white/10">
                                        <Clock className="w-3 h-3 text-[#C6A15B]" />
                                        <span>{formatDuration(service.durationMinutes)}</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Card Content */}
                              <div className="p-4">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#713E2E]">
                                    Studio Offering
                                  </span>
                                </div>

                                <h3 className="font-serif text-base font-bold text-[#2B1F2A] leading-snug line-clamp-1">
                                  {service.name}
                                </h3>

                                <p className="text-[11px] text-[#2B2421]/80 mt-1 line-clamp-2 leading-relaxed font-light">
                                  {service.shortDescription}
                                </p>

                                {/* Suitable For */}
                                {service.suitableFor && (
                                  <div className="mt-2 pt-2 border-t border-[#F4EADD]">
                                    <span className="text-[9px] font-bold text-[#713E2E] uppercase tracking-wider block">
                                      Ideal Occasion
                                    </span>
                                    <p className="text-[10px] text-[#2B2421] bg-[#F4EADD]/60 px-2 py-0.5 rounded-lg border border-[#C6A15B]/25 inline-block font-medium mt-0.5 line-clamp-1">
                                      {service.suitableFor}
                                    </p>
                                  </div>
                                )}

                                {/* Top 2 Inclusions */}
                                {inclusionsList.length > 0 && (
                                  <div className="mt-2 pt-2 border-t border-[#F4EADD]">
                                    <ul className="space-y-1 text-[10px] text-[#2B2421]/80">
                                      {inclusionsList.slice(0, 2).map((inc, idx) => (
                                        <li key={idx} className="flex items-start gap-1.5">
                                          <Check className="w-3 h-3 text-[#C6A15B] shrink-0 mt-0.5" />
                                          <span className="line-clamp-1">{inc}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Footer Pricing & CTA */}
                            <div className="p-3.5 pt-0">
                              <div className="pt-2 border-t border-[#C6A15B]/20 flex items-center justify-between gap-2">
                                <div>
                                  <span className="text-[9px] text-[#2B2421]/60 block font-medium">Investment</span>
                                  <span className="font-serif text-sm font-bold text-[#8E3445]">
                                    {formatPrice(service)}
                                  </span>
                                </div>

                                <Link
                                  href={`/enquire?service=${service.id}`}
                                  className="btn-elevated-primary text-[11px] px-3 py-1.5 gap-1"
                                >
                                  <span>Enquire</span>
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    />
                  ) : (
                    // Single service in category - compact elegant card
                    <div className="max-w-md mx-auto">
                      <ServiceCard
                        service={{
                          ...publishedServices[0],
                          category: { name: cat.name },
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* =========================================================================
                    DESKTOP & TABLET VIEW (Frozen for >= 768px):
                    Exact 100% frozen grid
                    ========================================================================= */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {publishedServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={{
                        ...service,
                        category: { name: cat.name },
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
