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
        {/* Service Image / Placeholder Frame */}
        {service.imageUrl && (
          <div className="relative h-60 w-full overflow-hidden bg-[#FAF5EE] border-b border-[#EADBCE]">
            <img
              src={service.imageUrl}
              alt={service.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#241416]/75 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
              {service.category && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2D4A3E]/90 backdrop-blur-xs border border-white/20 text-[#FAF5EE] shadow-xs">
                  {service.category.name}
                </span>
              )}
              {service.durationMinutes && (
                <span className="flex items-center gap-1.5 text-xs bg-[#241416]/75 backdrop-blur-xs px-2.5 py-1 rounded-full text-[#FAF5EE] border border-white/10 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-[#E6C875]" />
                  <span>{formatDuration(service.durationMinutes)}</span>
                </span>
              )}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F3D30]">
              Heritage Artistry
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241416] group-hover:text-[#8F3D30] transition-colors">
            {service.name}
          </h3>

          <p className="text-xs sm:text-sm text-[#241416]/75 mt-3 leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Suitable for badge */}
          <div className="mt-4 pt-3.5 border-t border-[#FAF5EE]">
            <span className="text-[10px] font-bold text-[#8F3D30] uppercase tracking-wider block mb-1">
              Ideal Occasion
            </span>
            <p className="text-xs text-[#241416]/85 bg-[#FAF5EE] px-3 py-1.5 rounded-xl border border-[#EADBCE]/80 inline-block font-medium">
              {service.suitableFor}
            </p>
          </div>

          {/* Inclusions highlights */}
          {inclusionsList.length > 0 && (
            <div className="mt-4 pt-3.5 border-t border-[#FAF5EE]">
              <span className="text-[10px] font-bold text-[#8F3D30] uppercase tracking-wider block mb-2">
                What&apos;s Included
              </span>
              <ul className="space-y-2 text-xs text-[#241416]/80">
                {inclusionsList.slice(0, 4).map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Travel & Availability Notes */}
          {(service.travelDetails || service.availabilityNotes) && (
            <div className="mt-4 pt-3.5 border-t border-[#FAF5EE] text-xs text-[#241416]/70 space-y-1.5">
              {service.travelDetails && (
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2D4A3E] shrink-0" />
                  <span>{service.travelDetails}</span>
                </p>
              )}
              {service.availabilityNotes && (
                <p className="flex items-center gap-1.5 text-[#8F3D30]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                  <span>{service.availabilityNotes}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Pricing & Elevated CTA */}
      <div className="p-6 sm:p-7 pt-0 mt-2">
        <div className="pt-4 border-t border-[#EADBCE] flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-[#241416]/60 block font-medium">Investment Guide</span>
            <span className="font-serif text-lg font-bold text-[#8F3D30]">
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
