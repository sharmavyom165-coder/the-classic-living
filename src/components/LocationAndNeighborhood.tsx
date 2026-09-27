import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Calendar, Bus, Train, Compass, Check } from 'lucide-react';
import { HOSTEL_INFO } from '../data/hostelData';

interface LocationAndNeighborhoodProps {
  onOpenVisit: () => void;
}

export const LocationAndNeighborhood: React.FC<LocationAndNeighborhoodProps> = ({ onOpenVisit }) => {
  return (
    <section id="location" className="py-16 md:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
            Campus Location & Connectivity
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            Strategic Indore Location
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Located in peaceful residential Shri Ram Nagar, insulated from noisy highway traffic while keeping top coaching institutes within 5–12 minutes reach.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address, Plus code & schedule a visit */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-base text-stone-900">
                    Hostel Address & Directions
                  </h3>
                  <p className="text-sm text-stone-600 mt-1 leading-relaxed">
                    {HOSTEL_INFO.address}
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    {HOSTEL_INFO.landmark}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500">Google Plus Code:</span>
                <span className="font-mono font-semibold text-stone-800 bg-stone-100 px-2 py-1 rounded">
                  {HOSTEL_INFO.plusCode}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Contact / Warden Desk:</span>
                <a
                  href={`tel:${HOSTEL_INFO.phone.replace(/\s+/g, '')}`}
                  className="font-mono font-bold text-amber-700 hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{HOSTEL_INFO.phone}</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Hostel Hours:</span>
                <span className="text-stone-800 font-medium">9:00 AM – 9:00 PM (24/7 for Wardens)</span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    'The Classic Living Boys Hostel Priti Nagar Shri Ram Nagar Indore'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>

                <button
                  onClick={onOpenVisit}
                  className="py-2.5 px-4 border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 rounded-lg text-xs font-semibold text-stone-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>Book Visit Slot</span>
                </button>
              </div>
            </div>

            {/* Neighborhood Transit Card */}
            <div className="bg-stone-100/80 rounded-xl p-5 border border-stone-200 text-xs text-stone-700 space-y-2">
              <div className="font-bold text-stone-900 flex items-center gap-2">
                <Bus className="w-4 h-4 text-stone-600" />
                <span>Indore iBus & Auto Connectivity</span>
              </div>
              <p className="text-stone-600 leading-normal">
                Direct BRTS iBus stop located within 350 meters. Shared autos and Rapido/Ola bike cabs readily available right outside Shri Ram Nagar main gate 24 hours.
              </p>
            </div>
          </div>

          {/* Right Column: Proximity to Institutions Table */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center justify-between">
              <span>Distance to Coaching Centers & Colleges</span>
              <span className="text-xs font-normal text-stone-500">Transit estimates</span>
            </h3>

            <div className="divide-y divide-stone-100">
              {HOSTEL_INFO.nearbyInstitutes.map((inst, i) => (
                <div key={i} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span className="font-semibold text-stone-800">{inst.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-500 font-mono tabular-nums text-xs">
                    <span>{inst.distance}</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="text-emerald-700 font-medium">{inst.travelTime}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual map preview canvas */}
            <div className="mt-6 bg-stone-950 rounded-xl p-6 text-white text-center border border-stone-800 relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                <div className="text-xs font-mono text-amber-400">GEO COORDINATE PWC6+H5 INDORE</div>
                <div className="text-sm font-bold">24-B, Priti Nagar, Shri Ram Nagar, Indore 452016</div>
                <div className="text-xs text-stone-400">
                  Safe residential colony with zero bars, zero late-night industrial noise, and dedicated student walking paths.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
