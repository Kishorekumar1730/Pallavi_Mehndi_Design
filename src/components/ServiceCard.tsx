'use client';

import React from 'react';
import { Clock, Check, Sparkles, MapPin, ArrowRight } from 'lucide-react';

export interface ServiceData {
  id: string;
  name: string;
  nameTa?: string | null;
  shortDescription: string;
  fullDescription: string;
  suitableFor: string;
  inclusions: string;
  durationMinutes?: number | null;
  startingPrice?: number | null;
  priceType: string;
  travelDetails?: string | null;
  availabilityNotes?: string | null;
  imageUrl?: string | null;
  category?: {
    name: string;
    nameTa?: string | null;
  };
}

export default function ServiceCard({ service }: { service: ServiceData }) {
  const inclusionsList = service.inclusions
    ? service.inclusions.split(/[,;\n]/).map((i) => i.trim()).filter(Boolean)
    : [];

  const formatPrice = () => {
    if (service.priceType === 'QUOTE_ONLY' || !service.startingPrice) {
      return 'Quote on Request';
    }
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(service.startingPrice);

    return service.priceType === 'STARTING_FROM' ? `Starting from ${formatted}` : formatted;
  };

  const formatDuration = (mins?: number | null) => {
    if (!mins) return null;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (hours > 0 && remainingMins > 0) return `${hours}h ${remainingMins}m approx`;
    if (hours > 0) return `${hours} hours approx`;
    return `${remainingMins} mins`;
  };

  return (
    <div className="card-floating group overflow-hidden flex flex-col justify-between">
      <div>
        {/* Service Image / Real Photo Slot */}
        {service.imageUrl && (
          <div className="relative h-44 sm:h-60 w-full overflow-hidden bg-[#F4EADD] border-b border-[#C6A15B]/25">
            <img
              src={service.imageUrl}
              alt={service.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B1F2A]/85 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
              {service.category && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2B1F2A]/90 backdrop-blur-xs border border-[#C6A15B]/40 text-[#F4EADD] shadow-xs">
                  {service.category.name}
                </span>
              )}
              {service.durationMinutes && (
                <span className="flex items-center gap-1.5 text-xs bg-[#2B1F2A]/80 backdrop-blur-xs px-2.5 py-1 rounded-full text-[#F4EADD] border border-white/10 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>{formatDuration(service.durationMinutes)}</span>
                </span>
              )}
            </div>
          </div>
        )}

        <div className="p-4 sm:p-7">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C6A15B]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#713E2E]">
              Studio Offering
            </span>
          </div>

          <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#2B1F2A] group-hover:text-[#8E3445] transition-colors leading-tight">
            {service.name}
          </h3>

          <p className="text-xs sm:text-sm text-[#2B2421]/80 mt-2 sm:mt-3 leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Suitable for badge */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-3.5 border-t border-[#F4EADD]">
            <span className="text-[10px] font-bold text-[#713E2E] uppercase tracking-wider block mb-1">
              Ideal Occasion
            </span>
            <p className="text-xs text-[#2B2421] bg-[#F4EADD]/60 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-[#C6A15B]/30 inline-block font-medium">
              {service.suitableFor}
            </p>
          </div>

          {/* Inclusions highlights */}
          {inclusionsList.length > 0 && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-3.5 border-t border-[#F4EADD]">
              <span className="text-[10px] font-bold text-[#713E2E] uppercase tracking-wider block mb-1.5 sm:mb-2">
                What&apos;s Included
              </span>
              <ul className="space-y-1.5 sm:space-y-2 text-xs text-[#2B2421]/85">
                {inclusionsList.slice(0, 3).map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 sm:gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Travel & Availability Notes */}
          {(service.travelDetails || service.availabilityNotes) && (
            <div className="mt-4 pt-3.5 border-t border-[#F4EADD] text-xs text-[#2B2421]/70 space-y-1.5">
              {service.travelDetails && (
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#713E2E] shrink-0" />
                  <span>{service.travelDetails}</span>
                </p>
              )}
              {service.availabilityNotes && (
                <p className="flex items-center gap-1.5 text-[#8E3445]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                  <span>{service.availabilityNotes}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Pricing & Elevated CTA */}
      <div className="p-4 sm:p-7 pt-0 mt-1 sm:mt-2">
        <div className="pt-3 sm:pt-4 border-t border-[#C6A15B]/25 flex items-center justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-[11px] text-[#2B2421]/60 block font-medium">Investment Guide</span>
            <span className="font-serif text-lg font-bold text-[#8E3445]">
              {formatPrice()}
            </span>
          </div>

          <a
            href={`/enquire?service=${service.id}`}
            className="btn-elevated-primary text-xs px-4 py-2.5 gap-1.5 group/btn"
          >
            <span>Enquire</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
