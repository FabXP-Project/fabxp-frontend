import React from 'react';
import { ImageWithFallback } from './ImageWithFallback';

interface AboutSectionProps {
  onLearnMore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore }) => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Paragraph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#00b5b8] mb-3">
              <span>✦</span>
              <span>ABOUT US</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 leading-[1.15] text-balance">
              Meaningful travel experiences, thoughtfully crafted
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pt-8 flex flex-col items-start gap-6">
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We are passionate travel experts creating unforgettable journeys beyond sightseeing.
              Every itinerary combines comfort, discovery, and meaningful experiences.
            </p>
            <button
              onClick={onLearnMore}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00b5b8] hover:bg-[#009ea0] text-white text-sm font-semibold rounded-full shadow-md transition-all transform active:scale-95 group"
            >
              <span>Know More</span>
              <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </button>
          </div>
        </div>

        {/* 2 Featured Landscape Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 h-[340px] sm:h-[400px] rounded-3xl overflow-hidden shadow-lg group">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="Adventurer on ocean cliffs"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              fallbackTitle="Ocean Cliff Edge"
              fallbackSubtitle="Expedition"
            />
          </div>

          <div className="md:col-span-7 h-[340px] sm:h-[400px] rounded-3xl overflow-hidden shadow-lg group">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
              alt="Alpine valley and turquoise fjord lake"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              fallbackTitle="High Alpine Lakes"
              fallbackSubtitle="Sanctuary"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
