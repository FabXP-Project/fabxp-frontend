import React from 'react';
import { MapPin, Compass, Briefcase } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: 'STEP 1',
      title: 'Find Your Destination',
      description: 'Search from thousands of destinations worldwide using our AI-powered engine.',
      icon: MapPin,
    },
    {
      num: 'STEP 2',
      title: 'Choose Your Experience',
      description: 'Browse curated adventures, food tours, cultural trips, and luxury getaways.',
      icon: Compass,
    },
    {
      num: 'STEP 3',
      title: 'Build Your Trip',
      description: 'Add stays, flights, and activities to create your perfect itinerary.',
      icon: Briefcase,
    },
  ];

  return (
    <section className="py-20 bg-[#fbfdfe]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            How It Works
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-light">
            Three simple steps to your dream adventure
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-[#139c70] flex items-center justify-center text-white mb-6 shadow-md shadow-[#139c70]/20 transform transition-transform hover:scale-105">
                  <Icon className="w-7 h-7 stroke-[1.75]" />
                </div>

                <span className="text-[11px] font-bold tracking-widest text-[#139c70] uppercase mb-2">
                  {step.num}
                </span>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
