import React, { useState } from 'react';
import { BedDouble, Check, Users, Wind, Shield, Sparkles, ArrowRight, Eye, ChevronRight } from 'lucide-react';
import { Room } from '../types/hostel';
import { RoomVisual } from './HostelVisuals';

interface RoomAvailabilityProps {
  rooms: Room[];
  onSelectRoomForBooking: (room: Room) => void;
  onInspectRoom: (room: Room) => void;
  activeFilterSharing: string;
  activeFilterAC: string;
  onFilterChange: (sharing: string, ac: string) => void;
}

export const RoomAvailability: React.FC<RoomAvailabilityProps> = ({
  rooms,
  onSelectRoomForBooking,
  onInspectRoom,
  activeFilterSharing,
  activeFilterAC,
  onFilterChange,
}) => {
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high'>('recommended');

  const filteredRooms = rooms
    .filter((room) => {
      if (activeFilterSharing !== 'all' && room.sharingType !== activeFilterSharing) {
        return false;
      }
      if (activeFilterAC !== 'all' && room.acType !== activeFilterAC) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price_low') return a.monthlyRent - b.monthlyRent;
      if (sortBy === 'price_high') return b.monthlyRent - a.monthlyRent;
      return 0;
    });

  const getVisualType = (room: Room): 'single' | 'double' | 'triple' | 'penthouse' => {
    if (room.roomNumber === '401') return 'penthouse';
    if (room.sharingType === 'single') return 'single';
    if (room.sharingType === 'double') return 'double';
    return 'triple';
  };

  return (
    <section id="rooms" className="py-16 md:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
              Accommodation Inventory
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
              Live Room Availability & Rates
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-2xl">
              Each unit is equipped with individual study workstations, attached sanitized washrooms, high-capacity geysers, and lockable wardrobes. No hidden utility surcharges.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-stone-200/80 p-1 rounded-lg">
              <button
                onClick={() => onFilterChange('all', activeFilterAC)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeFilterSharing === 'all'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Sharing
              </button>
              <button
                onClick={() => onFilterChange('single', activeFilterAC)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeFilterSharing === 'single'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Single Suite
              </button>
              <button
                onClick={() => onFilterChange('double', activeFilterAC)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeFilterSharing === 'double'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Double Sharing
              </button>
              <button
                onClick={() => onFilterChange('triple', activeFilterAC)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeFilterSharing === 'triple'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Triple Budget
              </button>
            </div>

            <div className="flex items-center bg-stone-200/80 p-1 rounded-lg">
              <button
                onClick={() => onFilterChange(activeFilterSharing, 'all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeFilterAC === 'all'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Climate
              </button>
              <button
                onClick={() => onFilterChange(activeFilterSharing, 'ac')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeFilterAC === 'ac'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                AC Only
              </button>
              <button
                onClick={() => onFilterChange(activeFilterSharing, 'non-ac')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeFilterAC === 'non-ac'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Ventilated Non-AC
              </button>
            </div>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredRooms.map((room) => {
            const isFullyBooked = room.availableBeds === 0;

            return (
              <div
                key={room.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
              >
                {/* Visual Header */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-950">
                  <RoomVisual
                    type={getVisualType(room)}
                    className="w-full h-full"
                    badgeText={room.badge}
                  />

                  {/* Room number tag */}
                  <div className="absolute top-3 left-3 bg-stone-900/90 text-white font-mono text-xs px-2.5 py-1 rounded backdrop-blur-sm border border-stone-700">
                    Room {room.roomNumber} · {room.floorName.split('-')[0]}
                  </div>

                  {/* Vacancy indicator */}
                  <div className="absolute bottom-3 right-3">
                    {isFullyBooked ? (
                      <span className="bg-rose-900/90 text-rose-200 text-xs px-2.5 py-1 rounded font-medium border border-rose-700">
                        Fully Booked
                      </span>
                    ) : (
                      <span className="bg-emerald-900/90 text-emerald-200 text-xs px-2.5 py-1 rounded font-medium border border-emerald-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        {room.availableBeds} of {room.totalBeds} Bed{room.availableBeds > 1 ? 's' : ''} Open
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                      <span className="capitalize">{room.sharingType} Occupancy</span>
                      <span aria-hidden="true">·</span>
                      <span>{room.acType.toUpperCase()} Cooling</span>
                      <span aria-hidden="true">·</span>
                      <span>{room.dimensions}</span>
                    </div>

                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                      {room.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Bed Slot Status Visual */}
                    <div className="mt-3 pt-3 border-t border-stone-100">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                        Bed Allotment Status
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {room.bedSlots.map((bed, idx) => (
                          <div
                            key={idx}
                            className={`p-2 rounded border text-xs flex flex-col justify-between ${
                              bed.isOccupied
                                ? 'bg-stone-50 border-stone-200 text-stone-400'
                                : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                            }`}
                          >
                            <div className="flex items-center justify-between font-medium">
                              <span>{bed.bedNumber}</span>
                              <span className="text-[10px]">
                                {bed.isOccupied ? 'Occupied' : 'Vacant'}
                              </span>
                            </div>
                            {bed.isOccupied && bed.occupantStream && (
                              <div className="text-[10px] text-stone-500 truncate mt-1">
                                {bed.occupantStream}
                              </div>
                            )}
                            {!bed.isOccupied && (
                              <div className="text-[10px] text-emerald-700 font-semibold mt-1">
                                Available for You
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Amenities */}
                    <div className="mt-3 space-y-1.5">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-stone-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action Baseline */}
                  <div className="pt-4 border-t border-stone-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-xs text-stone-500">Monthly Rent</div>
                        <div className="text-xl font-extrabold text-stone-900 font-mono tabular-nums">
                          ₹{room.monthlyRent.toLocaleString('en-IN')}
                          <span className="text-xs font-normal text-stone-500 font-sans">/month</span>
                        </div>
                      </div>

                      <div className="text-right text-[11px] text-stone-500">
                        <div>Deposit: ₹{room.securityDeposit.toLocaleString('en-IN')}</div>
                        <div className="text-emerald-700 font-medium">Refundable on checkout</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onInspectRoom(room)}
                        className="py-2.5 px-3 border border-stone-300 hover:border-stone-400 rounded-lg text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-stone-500" />
                        <span>Specs & Map</span>
                      </button>

                      <button
                        onClick={() => onSelectRoomForBooking(room)}
                        disabled={isFullyBooked}
                        className={`py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isFullyBooked
                            ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            : 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-xs'
                        }`}
                      >
                        <span>{isFullyBooked ? 'Waitlist' : 'Book Bed'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance note */}
        <div className="mt-12 bg-white border border-stone-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-semibold text-stone-800">
                Transparent Fee Guarantee:
              </span>{' '}
              Rent includes room electricity backup, daily housekeeping, and high-speed Wi-Fi. No hidden admission or broker commission charges.
            </div>
          </div>
          <div className="text-stone-500 shrink-0">
            Security deposit is 100% refunded within 48 hours of move-out.
          </div>
        </div>
      </div>
    </section>
  );
};
