'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, CalendarCheck, ArrowRight, Check } from 'lucide-react';
import { ServiceData } from '@/components/ServiceCard';

interface MobileServicesShowcaseProps {
  services: ServiceData[];
}

export default function MobileServicesShowcase({ services }: MobileServicesShowcaseProps) {
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
    return `${remainingMins} mins`;
  };

  return (
    <section className="py-10 px-4 bg-[#F4EADD] border-b border-[#C6A15B]/30">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <span className="heritage-badge text-[10px]">
              Studio Packages
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#2B1F2A]">
              Curated Services
            </h2>
            <p className="text-xs text-[#2B2421]/75">
              Transparent packages tailored for brides &amp; celebrations.
            </p>
          </div>

          <Link
            href="/services"
            className="text-xs font-bold text-[#8E3445] flex items-center gap-1 shrink-0 pb-1 hover:underline"
          >
            <span>All Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Vertical Touch-Friendly Cards */}
        <div className="space-y-3">
          {services.map((service) => {
            const inclusions = service.inclusions
              ? service.inclusions.split(/[,;\n]/).map((i) => i.trim()).filter(Boolean).slice(0, 3)
              : [];

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-[#C6A15B]/35 p-4 shadow-sm space-y-3"
              >
                {/* Title & Price Row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#713E2E] block">
                      {service.category?.name || 'Studio Offering'}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#2B1F2A] leading-snug">
                      {service.name}
                    </h3>
                  </div>

                  {/* Starting Price Pill */}
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#FAF5EE] border border-[#C6A15B]/40 text-xs font-bold text-[#8E3445] shadow-2xs whitespace-nowrap">
                    {formatPrice(service)}
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-xs text-[#2B2421]/75 leading-relaxed font-light">
                  {service.shortDescription}
                </p>

                {/* Key Inclusions & Duration */}
                <div className="pt-2 border-t border-[#F4EADD] space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-[#2B2421]/65">
                    <span className="font-medium text-[#713E2E]">Key Inclusions:</span>
                    {service.durationMinutes && (
                      <span className="flex items-center gap-1 text-[#8E3445] font-semibold">
                        <Clock className="w-3 h-3 text-[#C6A15B]" />
                        <span>{formatDuration(service.durationMinutes)}</span>
                      </span>
                    )}
                  </div>

                  <ul className="space-y-1">
                    {inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px] text-[#2B2421]/80">
                        <Check className="w-3 h-3 text-[#C6A15B] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Touch Action */}
                <div className="pt-1 flex items-center gap-2">
                  <Link
                    href={`/enquire?service=${service.id}`}
                    className="flex-1 btn-glossy-primary py-2 px-3 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-transform"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 text-[#F4EADD]" />
                    <span>Enquire for this Package</span>
                  </Link>

                  <Link
                    href="/services"
                    className="btn-glossy-secondary py-2 px-3 text-xs font-semibold shrink-0"
                  >
                    <span>Details</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
