import React from 'react';
import { NEW_TESTIMONIALS } from '../data/travelData';
import { Star } from 'lucide-react';

export const NewTestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            What Travelers Say
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-light">
            Real stories from real explorers
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEW_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#139c70] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-light">
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
