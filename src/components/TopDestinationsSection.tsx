import React from 'react';
import { getTopDestinations } from '@/lib/api';
import { ImageWithFallback } from './ImageWithFallback';
import Link from 'next/link';

export const TopDestinationsSection = async () => {
  const destinations = await getTopDestinations();
  
  return (
    <section id="top-destinations" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            Explore Top Destinations
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-light">
            Wander through the world's most breathtaking places
          </p>
        </div>

        {/* 5 Vertical Cards Grid matching landing(1).png */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/booking?type=dest&destId=${dest.id}`}
              className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end p-5 bg-slate-900"
            >
              {/* Photo */}
              <div className="absolute inset-0 z-0">
                <ImageWithFallback
                  src={dest.image}
                  alt={`${dest.city}, ${dest.country}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  fallbackTitle={dest.city}
                />
              </div>

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />

              {/* Label at bottom */}
              <div className="relative z-20">
                <h3 className="text-lg font-bold text-white group-hover:text-[#149d88] transition-colors leading-tight">
                  {dest.city}
                </h3>
                <p className="text-xs text-white/80 font-light mt-0.5">
                  {dest.country}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
