import React from 'react';
import { VIBE_GALLERY } from '../data/travelData';
import { ImageWithFallback } from './ImageWithFallback';

export const VibeSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#f8fafc] text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Title */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#00b5b8] mb-3">
            <span>✦</span>
            <span>VIBE WITH US</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 leading-tight">
            Real travel stories from around the world
          </h2>
        </div>

        {/* 6 Vertical Photo Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {VIBE_GALLERY.map((imgUrl, idx) => (
            <div
              key={idx}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <ImageWithFallback
                src={imgUrl}
                alt={`Fabxp Traveler Story ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                fallbackTitle="Travel Story"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-[11px] text-white font-medium">@traveler_{idx + 10}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Tag */}
        <div className="text-center text-xs sm:text-sm text-slate-500 font-medium">
          Tag <span className="text-[#00b5b8] font-semibold">#VibeWithFabxp</span> to get featured.
        </div>
      </div>
    </section>
  );
};
