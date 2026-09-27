import React from 'react';
import { X, Check, BedDouble, Wind, Sparkles, Shield, Wifi, Zap, Droplet } from 'lucide-react';
import { Room } from '../types/hostel';
import { RoomVisual } from './HostelVisuals';

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onBookRoom: (room: Room) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  onClose,
  onBookRoom,
}) => {
  if (!room) return null;

  const visualType =
    room.roomNumber === '401'
      ? 'penthouse'
      : room.sharingType === 'single'
      ? 'single'
      : room.sharingType === 'double'
      ? 'double'
      : 'triple';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-stone-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div>
            <div className="text-xs text-amber-400 font-mono">
              SPECIFICATION SHEET · ROOM {room.roomNumber}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
              {room.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Visual Schematic */}
          <div className="h-52 w-full rounded-xl overflow-hidden border border-stone-800">
            <RoomVisual type={visualType} className="w-full h-full" badgeText={room.badge} />
          </div>

          {/* Quick Specifications Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-center">
              <div className="text-[10px] text-stone-500 uppercase font-bold">Dimensions</div>
              <div className="text-xs font-bold text-stone-900 mt-0.5">{room.dimensions}</div>
            </div>
            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-center">
              <div className="text-[10px] text-stone-500 uppercase font-bold">Washroom</div>
              <div className="text-xs font-bold text-stone-900 mt-0.5">{room.features.washroomType} + Geyser</div>
            </div>
            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-center">
              <div className="text-[10px] text-stone-500 uppercase font-bold">Air Ventilation</div>
              <div className="text-xs font-bold text-stone-900 mt-0.5">{room.features.ventilation}</div>
            </div>
            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-center">
              <div className="text-[10px] text-stone-500 uppercase font-bold">Wi-Fi Connection</div>
              <div className="text-xs font-bold text-stone-900 mt-0.5">{room.features.wifiSpeed}</div>
            </div>
          </div>

          {/* Bed Allocation Status */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Bed Status in Room {room.roomNumber} ({room.availableBeds} of {room.totalBeds} Available)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {room.bedSlots.map((bed, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                    bed.isOccupied
                      ? 'bg-stone-50 border-stone-200 text-stone-400'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-4 h-4" />
                    <span>{bed.bedNumber}</span>
                  </div>
                  <div>
                    {bed.isOccupied ? (
                      <span className="text-[11px] text-stone-500">
                        Occupied {bed.occupantStream ? `(${bed.occupantStream})` : ''}
                      </span>
                    ) : (
                      <span className="text-[11px] text-emerald-700 font-bold">
                        OPEN FOR BOOKING
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory checklist provided at check-in */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Provided Room Inventory Checklist (Free of charge)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Heavy Wooden Cot with Storage Drawers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Orthopedic High-Density 4-inch Mattress</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Individual Study Desk with Soft Pinboard</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Ergonomic High-Back Study Chair</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>3-Door Steel/Wooden Almirah with Master Lock</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>25-Litre Automatic Cutoff Water Geyser</span>
              </div>
            </div>
          </div>

          {/* Pricing & Refund Policy */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-stone-500">Monthly Rent</div>
              <div className="text-xl font-bold text-stone-900 font-mono">
                ₹{room.monthlyRent.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-stone-500">/month</span>
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                Security Deposit: ₹{room.securityDeposit.toLocaleString('en-IN')} (Refundable)
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookRoom(room);
              }}
              disabled={room.availableBeds === 0}
              className={`py-2.5 px-5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                room.availableBeds === 0
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
              }`}
            >
              {room.availableBeds === 0 ? 'Waitlist Only' : 'Proceed to Book'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
