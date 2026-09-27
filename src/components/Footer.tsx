import React from 'react';
import { Phone, MapPin, Mail, Compass, ShieldCheck } from 'lucide-react';
import { HOSTEL_INFO } from '../data/hostelData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenVisit: () => void;
  onOpenLookup: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenVisit,
  onOpenLookup,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white block">
                THE CLASSIC LIVING
              </span>
              <span className="text-xs text-stone-400 font-sans">
                थे क्लासिक लिविंग · Boys' Hostel & Student Living
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Dedicated student residence serving competitive exam aspirants and university scholars in Indore. Spacious, ventilated rooms with 4-time hygienic homestyle mess and strict study discipline.
            </p>
            <div className="pt-2 text-stone-400 font-mono text-[11px]">
              ★ 4.1 Rating across 106 Verified Google Maps Reviews
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Hostel Living
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('rooms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Room Inventory & Rates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('floorplan')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Interactive Bed Layouts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mess')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Weekly Mess Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tenant Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('location')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Coaching Institute Distances
                </button>
              </li>
            </ul>
          </div>

          {/* Resident Actions */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Admissions & Portal
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer"
                >
                  Book Bed Online
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLookup}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Allotment Voucher
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVisit}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Schedule Walkthrough
                </button>
              </li>
              <li>
                <a
                  href={`tel:${HOSTEL_INFO.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  Warden Emergency Line
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Campus Address
            </div>
            <div className="space-y-2 text-stone-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{HOSTEL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-stone-500 shrink-0" />
                <span className="font-mono">{HOSTEL_INFO.plusCode}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-white font-medium">{HOSTEL_INFO.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} The Classic Living Boys' Hostel, Indore. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Priti Nagar, Shri Ram Nagar</span>
            <span aria-hidden="true">·</span>
            <span>Pure Vegetarian In-House Mess</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-500 font-medium">Open 9:00 AM – 9:00 PM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
