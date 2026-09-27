import React, { useState } from 'react';
import { Utensils, Clock, CheckCircle, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { MESS_WEEKLY_MENU } from '../data/hostelData';

export const MessMenu: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const activeDay = MESS_WEEKLY_MENU[selectedDayIndex];

  return (
    <section id="mess" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
            In-House Dining & Nutrition
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            Hygienic 4-Time Homestyle Mess
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Cooked fresh daily with pure desi ghee, fresh seasonal vegetables, and 100% RO purified water. Menus are refined monthly based on resident student votes.
          </p>
        </div>

        {/* Meal Timings bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-center">
            <div className="text-[11px] text-stone-500 font-semibold uppercase">Breakfast</div>
            <div className="text-sm font-bold text-stone-900 mt-0.5">07:30 AM – 09:30 AM</div>
            <div className="text-[11px] text-stone-500 mt-1">Hot Chai / Milk + Indore Poha</div>
          </div>
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-center">
            <div className="text-[11px] text-stone-500 font-semibold uppercase">Lunch</div>
            <div className="text-sm font-bold text-stone-900 mt-0.5">12:30 PM – 02:30 PM</div>
            <div className="text-[11px] text-stone-500 mt-1">Unlimited Phulkas, Dal, Sabzi & Rice</div>
          </div>
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-center">
            <div className="text-[11px] text-stone-500 font-semibold uppercase">High Tea & Snacks</div>
            <div className="text-sm font-bold text-stone-900 mt-0.5">05:00 PM – 06:15 PM</div>
            <div className="text-[11px] text-stone-500 mt-1">Fresh Snacks with Cutting Chai</div>
          </div>
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-center">
            <div className="text-[11px] text-stone-500 font-semibold uppercase">Dinner</div>
            <div className="text-sm font-bold text-stone-900 mt-0.5">08:00 PM – 10:15 PM</div>
            <div className="text-[11px] text-stone-500 mt-1">Special Veg Curry + Dessert Item</div>
          </div>
        </div>

        {/* Day Selector Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {MESS_WEEKLY_MENU.map((item, idx) => (
            <button
              key={item.day}
              onClick={() => setSelectedDayIndex(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedDayIndex === idx
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {item.day}
            </button>
          ))}
        </div>

        {/* Selected Day Menu Details Card */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between pb-6 border-b border-stone-200 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-800">
                Daily Schedule
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                {activeDay.day}'s Curated Menu
              </h3>
            </div>
            {activeDay.specialBadge && (
              <span className="bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold px-3 py-1 rounded-full">
                ★ {activeDay.specialBadge}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Breakfast */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Morning Breakfast
                </span>
                <Clock className="w-3.5 h-3.5 text-stone-400" />
              </div>
              <p className="text-sm font-semibold text-stone-900 leading-relaxed">
                {activeDay.breakfast}
              </p>
            </div>

            {/* Lunch */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Afternoon Thali (Lunch)
                </span>
                <Clock className="w-3.5 h-3.5 text-stone-400" />
              </div>
              <p className="text-sm font-semibold text-stone-900 leading-relaxed">
                {activeDay.lunch}
              </p>
            </div>

            {/* Snacks */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Evening Study Break (High Tea)
                </span>
                <Clock className="w-3.5 h-3.5 text-stone-400" />
              </div>
              <p className="text-sm font-semibold text-stone-900 leading-relaxed">
                {activeDay.snacks}
              </p>
            </div>

            {/* Dinner */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Night Dinner & Dessert
                </span>
                <Clock className="w-3.5 h-3.5 text-stone-400" />
              </div>
              <p className="text-sm font-semibold text-stone-900 leading-relaxed">
                {activeDay.dinner}
              </p>
            </div>
          </div>

          {/* Kitchen hygiene standards */}
          <div className="mt-8 pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Commercial grade dishwashing machine with high-temp steam sterilization.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Fresh dairy milk delivered daily from local Indore dairy cooperative.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Special tiffin packaging provided for students attending late coaching mock tests.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
