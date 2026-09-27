import React, { useState } from 'react';
import { Layers, BedDouble, Check, Users, Sparkles, ArrowRight, Info } from 'lucide-react';
import { Room } from '../types/hostel';

interface FloorplanVisualizerProps {
  rooms: Room[];
  onSelectRoomForBooking: (room: Room) => void;
  onInspectRoom: (room: Room) => void;
}

export const FloorplanVisualizer: React.FC<FloorplanVisualizerProps> = ({
  rooms,
  onSelectRoomForBooking,
  onInspectRoom,
}) => {
  const [activeFloor, setActiveFloor] = useState<number>(2);

  // Filter rooms on current active floor
  const floorRooms = rooms.filter((r) => r.floor === activeFloor);

  return (
    <section id="floorplan" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
            Architectural Overview
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            Interactive Floor & Bed Layout
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Explore wing plans floor-by-floor. Check spatial layout relative to the study hall, central ventilation shafts, and RO water stations.
          </p>
        </div>

        {/* Floor Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-stone-200 pb-4">
          {[1, 2, 3, 4].map((floorNum) => {
            const countOnFloor = rooms.filter((r) => r.floor === floorNum).length;
            const floorTitle =
              floorNum === 1
                ? 'Floor 1 (Quiet Study Wing)'
                : floorNum === 2
                ? 'Floor 2 (East Garden Wing)'
                : floorNum === 3
                ? 'Floor 3 (Aspirant Wing)'
                : 'Floor 4 (Skyline Terrace Suite)';

            return (
              <button
                key={floorNum}
                onClick={() => setActiveFloor(floorNum)}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeFloor === floorNum
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{floorTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Floor Layout Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Schematic Architectural Canvas */}
          <div className="lg:col-span-8 bg-stone-900 rounded-2xl p-6 border border-stone-800 text-white overflow-hidden shadow-md">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>SCHEMATIC BLUEPRINT · LEVEL 0{activeFloor}</span>
              </div>
              <div className="text-xs text-stone-400 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span> Vacant Bed
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-stone-600"></span> Occupied
                </span>
              </div>
            </div>

            {/* Graphical Floor Blueprint */}
            <div className="space-y-4">
              {/* North Balcony / Ventilation Corridor */}
              <div className="bg-stone-800/60 border border-dashed border-stone-700 rounded-lg p-2.5 text-center text-xs text-stone-400 font-mono">
                ↑ WIDE NORTH-FACING AIRFLOW BALCONY & CLOTHES DRYING AREA ↑
              </div>

              {/* Room Blocks on this floor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {floorRooms.map((room) => {
                  return (
                    <div
                      key={room.id}
                      onClick={() => onInspectRoom(room)}
                      className="bg-stone-800 hover:bg-stone-750 border border-stone-700 hover:border-amber-500/50 rounded-xl p-4 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-amber-400">
                            RM {room.roomNumber}
                          </span>
                          <span className="text-[11px] text-stone-400 capitalize">
                            ({room.sharingType} · {room.acType.toUpperCase()})
                          </span>
                        </div>
                        <span className="text-xs font-mono font-medium text-stone-300">
                          ₹{room.monthlyRent.toLocaleString('en-IN')}/m
                        </span>
                      </div>

                      {/* Bed Slots Grid */}
                      <div className="grid grid-cols-3 gap-1.5 my-3">
                        {room.bedSlots.map((bed, idx) => (
                          <div
                            key={idx}
                            className={`py-2 px-1 text-center rounded text-[11px] font-mono border ${
                              bed.isOccupied
                                ? 'bg-stone-900 border-stone-700 text-stone-500'
                                : 'bg-emerald-950/70 border-emerald-600/70 text-emerald-300 font-bold'
                            }`}
                          >
                            <div>{bed.bedNumber}</div>
                            <div className="text-[9px] font-sans font-normal opacity-80 mt-0.5">
                              {bed.isOccupied ? 'Occupied' : 'VACANT'}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-700/60">
                        <span>{room.dimensions}</span>
                        <span className="text-amber-300 group-hover:underline flex items-center gap-1">
                          View Specs <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Central Hallway & Common Services */}
              <div className="bg-stone-850 border border-stone-700/80 rounded-lg p-3 grid grid-cols-3 gap-2 text-center text-xs font-mono text-stone-300">
                <div className="p-2 bg-stone-900/80 rounded border border-stone-800">
                  <div className="text-[10px] text-stone-400">COMMON SERVICE</div>
                  <div className="font-semibold text-sky-400">RO Water Station</div>
                </div>
                <div className="p-2 bg-stone-900/80 rounded border border-stone-800">
                  <div className="text-[10px] text-stone-400">CONNECTIVITY</div>
                  <div className="font-semibold text-emerald-400">Mesh Wi-Fi AP</div>
                </div>
                <div className="p-2 bg-stone-900/80 rounded border border-stone-800">
                  <div className="text-[10px] text-stone-400">ACCESS</div>
                  <div className="font-semibold text-stone-300">Staircase & Lift</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info & Reserve sidebar */}
          <div className="lg:col-span-4 bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-6">
            <div>
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Floor Amenities
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Living Standards on Level {activeFloor}
              </h3>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>24/7 Filtered Cold Water:</strong> Commercial RO + UV purification system installed next to corridor.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Biometric Access:</strong> Only residents registered on Level {activeFloor} have access after 10:30 PM.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Housekeeping Schedule:</strong> Sweeping and floor mopping every morning between 10:00 AM – 12:30 PM.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Sound Insulation:</strong> Heavy wooden doors to maintain silent exam study environment.
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 mb-4">
                <span className="font-bold">Need a specific bed?</span> You can select your preferred bed (Bed A, Bed B, or Window side) during online checkout!
              </div>

              {floorRooms.length > 0 && (
                <button
                  onClick={() => onSelectRoomForBooking(floorRooms[0])}
                  className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <BedDouble className="w-4 h-4" />
                  <span>Reserve Room on Floor {activeFloor}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
