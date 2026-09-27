import React, { useState } from 'react';
import { ShieldCheck, Utensils, Wifi, MapPin, Star, BedDouble, Calendar, ArrowRight, Phone } from 'lucide-react';
import { HOSTEL_INFO } from '../data/hostelData';
import { BuildingFacadeVisual } from './HostelVisuals';

interface HeroProps {
  onCheckAvailability: (filters: { sharingType: string; acType: string }) => void;
  onOpenBooking: () => void;
  onOpenVisit: () => void;
  totalAvailableBeds: number;
}

export const Hero: React.FC<HeroProps> = ({
  onCheckAvailability,
  onOpenBooking,
  onOpenVisit,
  totalAvailableBeds,
}) => {
  const [selectedSharing, setSelectedSharing] = useState('all');
  const [selectedAC, setSelectedAC] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      sharingType: selectedSharing,
      acType: selectedAC,
    });
  };

  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 border-b border-stone-200 bg-gradient-to-b from-stone-100/70 via-stone-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Editorial Subheading & Trust Line */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600 mb-4 font-medium">
          <span className="text-amber-800 font-semibold tracking-wide uppercase">
            Indore's Premier Boys' Residence
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="flex items-center gap-1 text-stone-800">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span className="font-bold">4.1</span>
            <span>(106 Verified Google Reviews)</span>
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Shri Ram Nagar, Near Vijay Nagar</span>
        </div>

        {/* Main Grid: Headline & Narrative on left, Visual Facade on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-[1.15] text-balance">
              Disciplined, safe, and homestyle student living in Indore.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Purpose-built boys' hostel offering spacious ventilated rooms, hygienic 4-time homestyle meals, silent study atmospheres, and 24/7 approachable management. Ideal for coaching and college students.
            </p>

            {/* Quick trust metrics - unboxed with clean separators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-200">
              <div>
                <div className="text-2xl font-bold text-stone-900 font-mono tabular-nums">
                  {totalAvailableBeds} Beds
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Available for 2026 Session
                </div>
              </div>

              <div>
                <div className="text-2xl font-bold text-stone-900 font-mono tabular-nums">
                  4 Times
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Fresh Cooked Mess Meals Daily
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <div className="text-2xl font-bold text-stone-900 font-mono tabular-nums">
                  200 Mbps
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Redundant Optical Wi-Fi
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
              >
                <BedDouble className="w-4 h-4" />
                <span>Book Bed with Online Advance</span>
              </button>

              <button
                onClick={onOpenVisit}
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-stone-600" />
                <span>Schedule a Physical Visit</span>
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Visual & Address Box */}
          <div className="lg:col-span-5 space-y-4">
            <BuildingFacadeVisual className="h-72 sm:h-80 w-full" />

            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm text-xs text-stone-600 space-y-2">
              <div className="flex items-start gap-2 text-stone-900 font-medium">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{HOSTEL_INFO.address}</span>
              </div>
              <div className="flex items-center justify-between text-stone-500 pt-1 border-t border-stone-100">
                <span>Plus Code: <strong className="text-stone-700">{HOSTEL_INFO.plusCode}</strong></span>
                <span className="text-emerald-700 font-medium">Open 9:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Quick Availability Filter Card */}
        <div className="mt-10 bg-white border border-stone-200 rounded-xl p-4 sm:p-5 shadow-sm">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">
                Room Sharing Type
              </label>
              <select
                value={selectedSharing}
                onChange={(e) => setSelectedSharing(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 cursor-pointer"
              >
                <option value="all">All Room Types</option>
                <option value="single">Single Occupancy (Private)</option>
                <option value="double">Double Sharing (2 Beds)</option>
                <option value="triple">Triple Sharing (Budget 3 Beds)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">
                Air Conditioning
              </label>
              <select
                value={selectedAC}
                onChange={(e) => setSelectedAC(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 cursor-pointer"
              >
                <option value="all">Both AC & Non-AC</option>
                <option value="ac">Air Conditioned (AC)</option>
                <option value="non-ac">Naturally Ventilated (Non-AC)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">
                Target Move-In Month
              </label>
              <select
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 cursor-pointer"
                defaultValue="immediate"
              >
                <option value="immediate">Immediate / This Week</option>
                <option value="next_month">Next Month (Coaching Batch)</option>
                <option value="semester">Upcoming Academic Term</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                <span>Filter Rooms</span>
                <ArrowRight className="w-4 h-4 text-stone-300" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
