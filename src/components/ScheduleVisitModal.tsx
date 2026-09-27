import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { HOSTEL_INFO } from '../data/hostelData';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({ isOpen, onClose }) => {
  const [visitorName, setVisitorName] = useState('');
  const [phone, setPhone] = useState('');
  const [visitDate, setVisitDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState('Morning (10:00 AM – 12:30 PM)');
  const [roomType, setRoomType] = useState('Double Sharing AC');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl overflow-hidden">
        <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-amber-400 font-mono">PHYSICAL WALKTHROUGH</div>
            <h3 className="text-base font-bold">Schedule a Hostel Visit</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="p-6 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-stone-900">Visit Scheduled!</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              We look forward to hosting you on <strong>{visitDate}</strong> during{' '}
              <strong>{timeSlot}</strong>. Our warden has been notified.
            </p>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-700 text-left space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>{HOSTEL_INFO.address}</span>
              </div>
              <div className="text-stone-500">Warden Desk: {HOSTEL_INFO.phone}</div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Student / Parent Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rajesh & Aryan Sharma"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Mobile Number for SMS / WhatsApp Pass *
              </label>
              <input
                type="tel"
                required
                placeholder="10-digit phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Visit Date *
                </label>
                <input
                  type="date"
                  required
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600 cursor-pointer"
                >
                  <option value="Morning (10:00 AM – 12:30 PM)">Morning (10 AM – 12:30 PM)</option>
                  <option value="Afternoon Mess (01:00 PM – 02:30 PM)">Afternoon Mess (1 PM – 2:30 PM)</option>
                  <option value="Evening (05:00 PM – 07:30 PM)">Evening (5 PM – 7:30 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Room Type of Primary Interest
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600 cursor-pointer"
              >
                <option value="Single Executive AC">Single Executive AC</option>
                <option value="Double Sharing Deluxe AC">Double Sharing Deluxe AC</option>
                <option value="Double Sharing Non-AC">Double Sharing Non-AC</option>
                <option value="Triple Sharing Budget">Triple Sharing Budget</option>
                <option value="Presidential Penthouse Suite">Presidential Penthouse Suite</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Confirm Visit Slot
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
