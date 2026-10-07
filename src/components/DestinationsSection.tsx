import React from 'react';
import { POPULAR_DESTINATIONS } from '../data/travelData';
import { ImageWithFallback } from './ImageWithFallback';

interface DestinationsSectionProps {
  onSelectDestination: (destName: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({ onSelectDestination }) => {
  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Title */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#00b5b8] mb-3">
            <span>✦</span>
            <span>MOST LOVED DESTINATIONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 leading-tight">
            Explore the world's most popular destinations
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_DESTINATIONS.map((dest, idx) => (
            <div
              key={idx}
              onClick={() => onSelectDestination(dest.name)}
              className="group relative h-[380px] rounded-3xl overflow-hidden shadow-md bg-slate-900 flex flex-col justify-end p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <ImageWithFallback
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  fallbackTitle={dest.name}
                />
              </div>

              {/* Scrim Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />

              {/* Card Content */}
              <div className="relative z-20">
                <h3 className="font-serif text-2xl font-normal text-white mb-1">
                  {dest.name}
                </h3>
                <span className="text-white/80 text-xs font-light tracking-wide group-hover:text-[#00b5b8] transition-colors flex items-center gap-1">
                  <span>{dest.subtitle}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
