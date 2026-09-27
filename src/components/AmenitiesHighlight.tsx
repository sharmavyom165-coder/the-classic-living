import React from 'react';
import { ShieldCheck, Utensils, Wifi, Zap, Sparkles, BookOpen, Droplet, CheckCircle2 } from 'lucide-react';
import { AMENITIES_LIST } from '../data/hostelData';

export const AmenitiesHighlight: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-amber-600" />,
    Utensils: <Utensils className="w-6 h-6 text-amber-600" />,
    Wifi: <Wifi className="w-6 h-6 text-amber-600" />,
    Zap: <Zap className="w-6 h-6 text-amber-600" />,
    Sparkles: <Sparkles className="w-6 h-6 text-amber-600" />,
    BookOpen: <BookOpen className="w-6 h-6 text-amber-600" />,
    Droplet: <Droplet className="w-6 h-6 text-amber-600" />,
    CheckCircle2: <CheckCircle2 className="w-6 h-6 text-amber-600" />,
  };

  return (
    <section className="py-16 md:py-20 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
            Standard Campus Inclusions
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            Designed for Academic Focus & Comfort
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Every facility is configured to minimize daily friction so students can dedicate uninterrupted hours to studies, revision, and peaceful rest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMENITIES_LIST.map((item, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-2xs hover:shadow-xs transition-shadow space-y-3"
            >
              <div className="p-2.5 bg-stone-50 rounded-lg inline-block border border-stone-100">
                {iconMap[item.icon] || <CheckCircle2 className="w-6 h-6 text-amber-600" />}
              </div>
              <h3 className="font-bold text-sm text-stone-900">{item.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
