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
    <div className="group bg-[#FFFFFF] rounded-2xl border border-[#EADBCE] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C5A059] transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Service Image */}
        {service.imageUrl && (
          <div className="relative h-56 w-full overflow-hidden bg-[#FAF5EE]">
            <img
              src={service.imageUrl}
              alt={service.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              {service.category && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#B35D4D]/90 backdrop-blur-sm border border-white/20">
                  {service.category.name}
                </span>
              )}
              {service.durationMinutes && (
                <span className="flex items-center gap-1 text-xs bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                  <Clock className="w-3 h-3 text-[#E6C875]" />
                  {formatDuration(service.durationMinutes)}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="p-6">
          <h3 className="font-serif text-xl font-bold text-[#241416] group-hover:text-[#B35D4D] transition-colors">
            {service.name}
          </h3>
          {service.nameTa && (
            <p className="text-xs text-[#8F3D30] font-medium mt-0.5">
              {service.nameTa}
            </p>
          )}

          <p className="text-sm text-[#241416]/75 mt-3 leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Suitable for badge */}
          <div className="mt-4 pt-3 border-t border-[#FAF5EE]">
            <span className="text-[11px] font-semibold text-[#8F3D30] uppercase tracking-wider block mb-1">
              Suitable For
            </span>
            <p className="text-xs text-[#241416]/80 bg-[#FAF5EE] px-2.5 py-1.5 rounded-md inline-block">
              {service.suitableFor}
            </p>
          </div>

          {/* Inclusions highlights */}
          {inclusionsList.length > 0 && (
            <div className="mt-4">
              <span className="text-[11px] font-semibold text-[#8F3D30] uppercase tracking-wider block mb-2">
                What's Included
              </span>
              <ul className="space-y-1.5 text-xs text-[#241416]/80">
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
            <div className="mt-4 pt-3 border-t border-[#FAF5EE] text-xs text-[#241416]/70 space-y-1">
              {service.travelDetails && (
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#C5A059] shrink-0" />
                  <span>{service.travelDetails}</span>
                </p>
              )}
              {service.availabilityNotes && (
                <p className="flex items-center gap-1.5 text-[#8F3D30]">
                  <Sparkles className="w-3 h-3 shrink-0" />
                  <span>{service.availabilityNotes}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Pricing & CTA */}
      <div className="p-6 pt-0 mt-2">
        <div className="pt-4 border-t border-[#EADBCE] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#241416]/60 block">Price Guide</span>
            <span className="font-serif text-lg font-bold text-[#8F3D30]">
              {formatPrice()}
            </span>
          </div>

          <a
            href={`/enquire?service=${service.id}`}
            className="inline-flex items-center gap-1.5 bg-[#FAF5EE] hover:bg-[#B35D4D] text-[#8F3D30] hover:text-white border border-[#C5A059]/40 hover:border-[#B35D4D] px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors group/btn"
          >
            <span>Enquire</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}

