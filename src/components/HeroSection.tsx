import React from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { Star, Users, Instagram } from 'lucide-react';

interface HeroSectionProps {
  onBookTrip: () => void;
  onExploreTours: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookTrip, onExploreTours }) => {
  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#f5f9fa] via-white to-white">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00b5b8]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Travel Cards (Desktop placement) */}
      <div className="hidden lg:block absolute inset-0 max-w-7xl mx-auto pointer-events-none z-10">
        {/* Top Left Card: Coastal Hiker */}
        <div className="absolute top-36 left-8 xl:left-12 w-48 h-32 rounded-2xl overflow-hidden shadow-xl border-2 border-white transform -rotate-3 hover:rotate-0 transition-transform duration-300 pointer-events-auto cursor-pointer"
             onClick={onExploreTours}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            alt="Coastal cliff hike"
            className="w-full h-full object-cover"
            fallbackTitle="Coastline Wander"
          />
        </div>

        {/* Top Right Card: Japanese Pagoda */}
        <div className="absolute top-32 right-8 xl:right-14 w-52 h-36 rounded-2xl overflow-hidden shadow-xl border-2 border-white transform rotate-3 hover:rotate-0 transition-transform duration-300 pointer-events-auto cursor-pointer"
             onClick={onExploreTours}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80"
            alt="Japan Pagoda & Spring"
            className="w-full h-full object-cover"
            fallbackTitle="Kyoto Shrine"
          />
        </div>

        {/* Bottom Left Card: Burj Al Arab */}
        <div className="absolute bottom-28 left-12 xl:left-16 w-52 h-36 rounded-2xl overflow-hidden shadow-xl border-2 border-white transform rotate-2 hover:rotate-0 transition-transform duration-300 pointer-events-auto cursor-pointer"
             onClick={onExploreTours}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80"
            alt="Burj Al Arab Dubai"
            className="w-full h-full object-cover"
            fallbackTitle="Dubai Marina"
          />
        </div>

        {/* Bottom Right Card: Taj Mahal */}
        <div className="absolute bottom-24 right-10 xl:right-16 w-56 h-36 rounded-2xl overflow-hidden shadow-xl border-2 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-300 pointer-events-auto cursor-pointer"
             onClick={onExploreTours}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80"
            alt="Taj Mahal reflection"
            className="w-full h-full object-cover"
            fallbackTitle="Taj Mahal"
          />
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
        {/* Mobile preview collage */}
        <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
          <div className="w-20 h-16 rounded-xl overflow-hidden shadow-md">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80"
              alt="Nature"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-24 h-20 rounded-xl overflow-hidden shadow-lg border border-[#00b5b8]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=200&q=80"
              alt="Japan"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-20 h-16 rounded-xl overflow-hidden shadow-md">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=200&q=80"
              alt="Dubai"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-slate-900 leading-[1.1] mb-6 text-balance">
          Experience the World, <br />
          <span className="italic font-serif">Not Just the Map</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg md:text-xl font-normal max-w-xl mx-auto mb-9 leading-relaxed">
          Curated journeys designed to be felt, not rushed.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onBookTrip}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#00b5b8] hover:bg-[#009ea0] text-white text-base font-semibold rounded-full shadow-lg shadow-[#00b5b8]/25 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
          >
            <span>Book a trip</span>
            <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </button>
        </div>

        {/* Social Proof Stats */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-600 bg-white/80 backdrop-blur-sm px-6 py-2.5 rounded-full border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-1.5 font-medium text-slate-800">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>4.9 stars</span>
            <span className="text-slate-400 font-normal">(541k Reviews)</span>
          </div>

          <span className="text-slate-300 hidden sm:inline" aria-hidden="true">•</span>

          <div className="flex items-center gap-1.5 font-medium text-slate-800">
            <Users className="w-4 h-4 text-[#00b5b8]" />
            <span>50k travellers</span>
          </div>

          <span className="text-slate-300 hidden sm:inline" aria-hidden="true">•</span>

          <div className="flex items-center gap-1.5 font-medium text-slate-800">
            <Instagram className="w-4 h-4 text-slate-600" />
            <span>1+ million followers</span>
          </div>
        </div>
      </div>
    </section>
  );
};
