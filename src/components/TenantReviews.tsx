import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, CheckCircle2, Shield, Plus, Sparkles, Filter } from 'lucide-react';
import { Review } from '../types/hostel';
import { HOSTEL_INFO } from '../data/hostelData';

interface TenantReviewsProps {
  reviews: Review[];
  onOpenWriteReview: () => void;
  onLikeReview: (reviewId: string) => void;
}

export const TenantReviews: React.FC<TenantReviewsProps> = ({
  reviews,
  onOpenWriteReview,
  onLikeReview,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const filteredReviews = reviews.filter((rev) => {
    if (selectedTag === 'all') return true;
    return rev.tag === selectedTag;
  });

  const ratingCounts = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  const tagFilters = [
    { id: 'all', label: 'All Reviews', count: reviews.length },
    { id: 'safe atmosphere', label: 'Safe Atmosphere', count: 21 },
    { id: 'approachable warden', label: 'Approachable Warden', count: 4 },
    { id: 'ventilated rooms', label: 'Ventilated Rooms', count: 4 },
    { id: 'spotless washrooms', label: 'Spotless Washrooms', count: 2 },
    { id: 'hygienic mess food', label: 'Hygienic Mess Food', count: 16 },
  ];

  return (
    <section id="reviews" className="py-16 md:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
              Verified Student & Parent Feedback
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
              Tenant & Alumni Experiences
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-2xl">
              Authentic reviews submitted by residents studying for JEE, NEET, CA, and college degrees at SGSITS, DAVV, and nearby institutes.
            </p>
          </div>

          <button
            onClick={onOpenWriteReview}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Resident Review</span>
          </button>
        </div>

        {/* Rating Overview & Google Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Rating Score & Distribution */}
          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-black text-stone-900 font-mono tracking-tight">
                  {HOSTEL_INFO.rating}
                </span>
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-500" />
                    ))}
                    <Star className="w-5 h-5 fill-stone-200 text-stone-300" />
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    Based on <strong>{HOSTEL_INFO.totalReviews} verified reviews</strong>
                  </div>
                </div>
              </div>

              {/* Progress bars */}
              <div className="space-y-2 mt-6">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const percentage =
                    stars === 5 ? 78 : stars === 4 ? 15 : stars === 3 ? 5 : stars === 2 ? 1 : 1;
                  return (
                    <div key={stars} className="flex items-center gap-3 text-xs text-stone-600">
                      <span className="w-8 font-mono">{stars} star</span>
                      <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="w-8 text-right font-mono text-stone-400">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 mt-6 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Google Maps Verified
              </span>
              <span>Indore, Madhya Pradesh</span>
            </div>
          </div>

          {/* AI / Google Maps Executive Summary Box */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Google Maps Review Summary
                </span>
                <span className="text-xs text-stone-500">Updated weekly</span>
              </div>

              <blockquote className="text-sm sm:text-base text-stone-800 font-serif italic leading-relaxed border-l-2 border-amber-500 pl-4 py-1">
                "Guests mention this hostel offers spacious, clean, and well-maintained rooms, along with hygienic and tasty food with varied menus. They also highlight the supportive management, respectful staff, and a safe, peaceful atmosphere ideal for studying."
              </blockquote>

              <div className="text-xs text-stone-500">
                Key mentions across 106 resident testimonials:
              </div>

              {/* Tag filters as interactive button controls */}
              <div className="flex flex-wrap gap-2 pt-1">
                {tagFilters.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTag(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedTag === t.id
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    <span>{t.label}</span>
                    <span className="text-[10px] opacity-75 font-mono">({t.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Author row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${review.avatarColor}`}
                    >
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-stone-900 flex items-center gap-2">
                        <span>{review.author}</span>
                        {review.isVerifiedResident && (
                          <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                            Verified Resident
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-stone-500">
                        {review.residentType} · {review.stayDuration}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-stone-700 mt-4 leading-relaxed">
                  "{review.content}"
                </p>

                {/* Owner Reply if present */}
                {review.ownerReply && (
                  <div className="mt-4 bg-stone-50 border-l-2 border-stone-400 rounded-r-lg p-3 text-xs text-stone-700 space-y-1">
                    <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                      <span>Response from the Owner</span>
                      <span className="text-[10px] text-stone-400 font-normal">
                        ({review.ownerReply.date})
                      </span>
                    </div>
                    <p className="text-stone-600 leading-normal">
                      {review.ownerReply.content}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom bar with unboxed date, tag and helpful button */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <span>{review.date}</span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize text-stone-700 font-medium">{review.tag}</span>
                </div>

                <button
                  onClick={() => onLikeReview(review.id)}
                  className="flex items-center gap-1.5 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer py-1 px-2 rounded hover:bg-stone-50"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="font-mono">{review.helpfulCount}</span>
                  <span className="hidden sm:inline">Helpful</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
