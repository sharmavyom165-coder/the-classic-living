import React, { useState } from 'react';
import { X, Search, CheckCircle2, AlertCircle, Printer, Phone } from 'lucide-react';
import { BookingDetails } from '../types/hostel';
import { HOSTEL_INFO } from '../data/hostelData';

interface BookingLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingDetails[];
}

export const BookingLookupModal: React.FC<BookingLookupModalProps> = ({
  isOpen,
  onClose,
  bookings,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [matchedBooking, setMatchedBooking] = useState<BookingDetails | null>(
    bookings.length > 0 ? bookings[bookings.length - 1] : null
  );
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const query = searchTerm.trim().toLowerCase();
    const found = bookings.find(
      (b) =>
        b.bookingId.toLowerCase().includes(query) ||
        b.phone.includes(query) ||
        b.residentName.toLowerCase().includes(query)
    );
    setMatchedBooking(found || null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-stone-900 text-white p-4 flex items-center justify-between shrink-0">
          <div>
            <div className="text-xs text-amber-400 font-mono">RESIDENT ALLOTMENT DESK</div>
            <h3 className="text-base font-bold">Search Existing Booking & Receipt</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Booking ID (e.g. TCL-IND-2026-...) or Mobile"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </form>

          {/* Results Display */}
          {matchedBooking ? (
            <div className="border border-stone-300 rounded-xl p-5 bg-stone-50/50 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div>
                  <div className="text-stone-500 font-mono">ALLOTMENT STATUS</div>
                  <div className="font-bold text-base text-stone-900">
                    {matchedBooking.residentName}
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-100 text-emerald-800 font-mono font-bold px-2.5 py-1 rounded text-xs">
                    {matchedBooking.bookingId}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-stone-700">
                <div>
                  <span className="text-stone-400 block font-mono text-[10px]">ROOM & BED</span>
                  <strong>Room {matchedBooking.roomNumber} ({matchedBooking.bedNumber})</strong>
                </div>
                <div>
                  <span className="text-stone-400 block font-mono text-[10px]">CONTACT PHONE</span>
                  <span className="font-mono">{matchedBooking.phone}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-mono text-[10px]">CHECK-IN DATE</span>
                  <span>{matchedBooking.checkInDate}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-mono text-[10px]">COLLEGE / COACHING</span>
                  <span>{matchedBooking.institution}</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-stone-200 space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>Amount Paid Online ({matchedBooking.paymentMethod}):</span>
                  <span className="font-mono font-bold text-emerald-700">
                    ₹{matchedBooking.amountPaid.toLocaleString('en-IN')} (PAID)
                  </span>
                </div>
                {matchedBooking.balanceDue > 0 && (
                  <div className="flex justify-between text-amber-800 font-medium">
                    <span>Balance Due on Move-In:</span>
                    <span className="font-mono font-bold">
                      ₹{matchedBooking.balanceDue.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="text-[10px] text-stone-400 font-mono">
                  Txn Ref: {matchedBooking.transactionId} · {matchedBooking.timestamp}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt Slip</span>
                </button>

                <a
                  href={`tel:${HOSTEL_INFO.phone.replace(/\s+/g, '')}`}
                  className="py-2 px-3 border border-stone-300 hover:bg-stone-100 rounded-lg text-xs font-semibold text-stone-800 transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Warden</span>
                </a>
              </div>
            </div>
          ) : hasSearched ? (
            <div className="p-8 text-center bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <AlertCircle className="w-8 h-8 text-stone-400 mx-auto" />
              <div className="text-xs font-semibold text-stone-700">No allotment found for "{searchTerm}"</div>
              <div className="text-[11px] text-stone-500">
                Please verify your 10-digit mobile number or booking reference code.
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-stone-500">
              Enter your student phone number or booking reference code above to fetch your admission details and payment receipt.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
