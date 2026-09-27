import React, { useState } from 'react';
import { X, Star, CheckCircle2 } from 'lucide-react';
import { Review } from '../types/hostel';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [residentType, setResidentType] = useState('JEE Aspirant (Allen)');
  const [stayDuration, setStayDuration] = useState('Stayed 6 months');
  const [tag, setTag] = useState<Review['tag']>('safe atmosphere');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const colors = ['bg-blue-600', 'bg-emerald-600', 'bg-purple-600', 'bg-amber-600', 'bg-teal-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      avatarColor: randomColor,
      rating,
      date: 'Just now',
      stayDuration,
      residentType,
      tag,
      content: content.trim(),
      helpfulCount: 1,
      isVerifiedResident: true,
    };

    onSubmitReview(newReview);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden">
        <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-amber-400 font-mono">RESIDENT FEEDBACK</div>
            <h3 className="text-base font-bold">Write a Tenant Review</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-stone-900">Review Published!</h4>
            <p className="text-xs text-stone-600">
              Thank you for sharing your experience at The Classic Living Indore. Your review helps future students make informed choices.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Star Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-500'
                          : 'fill-stone-100 text-stone-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-stone-700 ml-2">
                  {rating === 5
                    ? 'Exceptional 5/5'
                    : rating === 4
                    ? 'Very Good 4/5'
                    : rating === 3
                    ? 'Average 3/5'
                    : 'Below Average'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pranav Parmar"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Student Stream / College
                </label>
                <input
                  type="text"
                  placeholder="e.g. SGSITS / Allen Indore"
                  value={residentType}
                  onChange={(e) => setResidentType(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Stay Duration
                </label>
                <select
                  value={stayDuration}
                  onChange={(e) => setStayDuration(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600 cursor-pointer"
                >
                  <option value="Current Resident (3 months)">Current Resident (3 months)</option>
                  <option value="Stayed 6 months">Stayed 6 months</option>
                  <option value="Stayed 1 academic year">Stayed 1 academic year</option>
                  <option value="Stayed 2 years">Stayed 2 years</option>
                  <option value="Parent of Resident">Parent of Resident</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Top Highlight Tag
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value as any)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600 cursor-pointer"
                >
                  <option value="safe atmosphere">Safe Atmosphere</option>
                  <option value="approachable warden">Approachable Warden</option>
                  <option value="hygienic mess food">Hygienic Mess Food</option>
                  <option value="ventilated rooms">Ventilated Rooms</option>
                  <option value="spotless washrooms">Spotless Washrooms</option>
                  <option value="peaceful study">Peaceful Study</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Review & Honest Experience *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Mention room cleanliness, food quality, warden approachability, study environment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-xs text-stone-900 focus:outline-none focus:border-amber-600 leading-relaxed"
              ></textarea>
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
                Publish Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
