import React from 'react';
import { DIVERSE_WORLDS } from '../data/travelData';
import { ImageWithFallback } from './ImageWithFallback';

interface DiverseWorldsSectionProps {
  onViewPackages: () => void;
}

export const DiverseWorldsSection: React.FC<DiverseWorldsSectionProps> = ({ onViewPackages }) => {
  return (
    <section className="py-20 bg-[#00b4b6] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-12 max-w-xl leading-tight">
          Experience diverse worlds on one planet
        </h2>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {DIVERSE_WORLDS.map((world, idx) => (
            <div
              key={idx}
              className="group relative h-[420px] rounded-3xl overflow-hidden shadow-xl bg-slate-900 flex flex-col justify-end p-6 border border-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <ImageWithFallback
                  src={world.image}
                  alt={world.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  fallbackTitle={world.title}
                />
              </div>

              {/* Scrim Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />

              {/* Card Content */}
              <div className="relative z-20">
                <h3 className="font-serif text-xl font-medium text-white mb-2 leading-snug">
                  {world.title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
                  {world.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/20">
          <p className="text-white/90 text-sm font-normal">
            Explore more journeys waiting for you
          </p>
          <button
            onClick={onViewPackages}
            className="px-6 py-2.5 bg-white text-slate-900 hover:bg-slate-50 text-xs sm:text-sm font-semibold rounded-full shadow-md transition-all transform active:scale-95 whitespace-nowrap"
          >
            View Packages
          </button>
        </div>
      </div>
    </section>
  );
};
