import React from 'react';
import { TESTIMONIALS } from '../data/travelData';
import { Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Title */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#00b5b8] mb-3">
            <span>✦</span>
            <span>TESTIMONIALS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 max-w-xl leading-tight">
            Words from those who traveled with us
          </h2>
        </div>

        {/* 3 Dark Slate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#081c24] text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl min-h-[300px] border border-[#1b3b4a]/40"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-6 text-[#00b5b8]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light mb-8">
                  "{t.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-slate-700/60">
                <div className="font-semibold text-white text-sm">
                  {t.author}
                </div>
                <div className="text-xs text-slate-400 font-light mt-0.5">
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
