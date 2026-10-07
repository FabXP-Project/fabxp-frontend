'use client';

import React, { useState } from 'react';
import { MapPin, Search, Calendar, Users, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const NewHeroSection: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [experience, setExperience] = useState('Adventure');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const router = useRouter();

  const sampleAiPrompt = 'Best food experiences in Paris';

  const handleApplyAiPrompt = () => {
    setDestination('Paris, France');
    setExperience('Food & Wine');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination || experience) {
      const query = new URLSearchParams({
        type: 'search',
        dest: destination || 'Top Destination',
        exp: experience || 'Curated Tour',
        date,
        travelers: travelers.toString()
      }).toString();
      router.push(`/booking?${query}`);
    } else {
      router.push('/experiences');
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-28 pb-20 px-4 overflow-hidden">
      {/* Background Image: Panoramic mountain fjord / alpine lake */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
          alt="Panoramic alpine mountain lake"
          className="w-full h-full object-cover object-center"
        />
        {/* Measured dark gradient overlay to ensure WCAG AA contrast for text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center mt-6">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-sm font-sans">
          The world is wide.
        </h1>
        <p className="text-white/90 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 font-normal leading-relaxed drop-shadow-sm">
          Discover unforgettable adventures, hidden gems, and once-in-a-lifetime moments curated just for you.
        </p>

        {/* AI-Powered Search Card matching landing(1).png */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-2xl max-w-4xl mx-auto text-left border border-white/60">
          {/* AI Banner */}
          <div
            onClick={handleApplyAiPrompt}
            className="flex items-center gap-2 text-xs text-slate-500 mb-4 px-2 cursor-pointer hover:text-[#139c70] transition-colors select-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#139c70]" />
            <span className="font-light">
              AI-powered — try <span className="underline decoration-dotted font-medium">"{sampleAiPrompt}"</span>
            </span>
          </div>

          {/* Form Fields Row */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-2 items-center"
          >
            {/* 1. Destination */}
            <div className="lg:col-span-3 flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-slate-50 transition-colors">
              <MapPin className="w-5 h-5 text-[#139c70] shrink-0" />
              <div className="w-full">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Destination
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where to?"
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-slate-200" />

            {/* 2. Experience */}
            <div className="lg:col-span-3 flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-slate-50 transition-colors">
              <Search className="w-5 h-5 text-[#139c70] shrink-0" />
              <div className="w-full">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Experience
                </label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Adventure"
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-slate-200" />

            {/* 3. Date */}
            <div className="lg:col-span-2 flex items-center gap-2.5 px-3 py-2 rounded-2xl hover:bg-slate-50 transition-colors">
              <Calendar className="w-5 h-5 text-[#139c70] shrink-0" />
              <div className="w-full">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-700 font-medium focus:outline-none"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-slate-200" />

            {/* 4. Travelers */}
            <div className="lg:col-span-2 flex items-center gap-2.5 px-3 py-2 rounded-2xl hover:bg-slate-50 transition-colors">
              <Users className="w-5 h-5 text-[#139c70] shrink-0" />
              <div className="w-full">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Travelers
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value={1}>1 Traveler</option>
                  <option value={2}>2 Travelers</option>
                  <option value={3}>3 Travelers</option>
                  <option value={4}>4+ Travelers</option>
                </select>
              </div>
            </div>

            {/* 5. Submit Button */}
            <div className="lg:col-span-2 w-full mt-2 lg:mt-0">
              <button
                type="submit"
                className="w-full py-3.5 px-5 bg-[#149d88] hover:bg-[#108c79] text-white text-sm font-semibold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
