import React, { useState } from 'react';
import { Phone, Calendar, Search, Menu, X, BedDouble, ShieldCheck } from 'lucide-react';
import { HOSTEL_INFO } from '../data/hostelData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenLookup: () => void;
  onOpenVisit: () => void;
  onNavigate: (sectionId: string) => void;
  availableBedsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenLookup,
  onOpenVisit,
  onNavigate,
  availableBedsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top micro-bar with address, trust rating, and warden phone */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-stone-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Admissions Open 2026–27
            </span>
            <span className="hidden sm:inline text-stone-500">|</span>
            <span className="hidden sm:inline text-stone-400">
              {HOSTEL_INFO.address.split(',').slice(0, 3).join(',')}
            </span>
            <span className="hidden md:inline text-stone-500">|</span>
            <span className="hidden md:inline text-amber-400 font-medium">
              ★ {HOSTEL_INFO.rating} ({HOSTEL_INFO.totalReviews} Google Reviews)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenLookup}
              className="text-stone-300 hover:text-white transition-colors cursor-pointer text-xs"
            >
              My Allotment
            </button>
            <a
              href={`tel:${HOSTEL_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-stone-200 hover:text-amber-400 transition-colors font-mono font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{HOSTEL_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('hero')}
            className="text-left group cursor-pointer"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors">
                THE CLASSIC LIVING
              </span>
              <span className="text-xs font-medium text-stone-400 font-sans hidden sm:inline">
                थे क्लासिक लिविंग
              </span>
            </div>
            <div className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">
              Boys' Hostel · Shri Ram Nagar, Indore
            </div>
          </button>
        </div>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => handleNavClick('rooms')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Room Availability
          </button>
          <button
            onClick={() => handleNavClick('floorplan')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Floorplan & Beds
          </button>
          <button
            onClick={() => handleNavClick('mess')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Mess Menu
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Tenant Reviews ({HOSTEL_INFO.totalReviews})
          </button>
          <button
            onClick={() => handleNavClick('location')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Location & Map
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenVisit}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Visit</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
          >
            <BedDouble className="w-3.5 h-3.5" />
            <span>Book Bed Online</span>
            <span className="hidden xl:inline text-amber-200 text-[11px] font-normal">
              ({availableBedsCount} open)
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-stone-700">
            <button
              onClick={() => handleNavClick('rooms')}
              className="text-left py-2 px-3 rounded hover:bg-stone-50 cursor-pointer"
            >
              Room Availability & Pricing
            </button>
            <button
              onClick={() => handleNavClick('floorplan')}
              className="text-left py-2 px-3 rounded hover:bg-stone-50 cursor-pointer"
            >
              Interactive Floorplan & Bed Slots
            </button>
            <button
              onClick={() => handleNavClick('mess')}
              className="text-left py-2 px-3 rounded hover:bg-stone-50 cursor-pointer"
            >
              Weekly 4-Time Mess Menu
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="text-left py-2 px-3 rounded hover:bg-stone-50 cursor-pointer"
            >
              Tenant Reviews (4.1 ★ · 106 Reviews)
            </button>
            <button
              onClick={() => handleNavClick('location')}
              className="text-left py-2 px-3 rounded hover:bg-stone-50 cursor-pointer"
            >
              Address & Near Coaching Hubs
            </button>
          </div>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVisit();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-center border border-stone-300 rounded-lg text-stone-800 hover:bg-stone-50 cursor-pointer"
            >
              Schedule Physical Hostel Visit
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLookup();
              }}
              className="w-full py-2.5 px-4 text-xs font-medium text-center text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Look up Existing Allotment / Receipt
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
