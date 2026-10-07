import React from 'react';
import { Compass, UtensilsCrossed, ShieldCheck, Globe2 } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const features = [
    {
      title: 'Authentic Experiences',
      description: 'Trips tailored to your style and budget.',
      icon: Compass,
    },
    {
      title: 'Culinary Adventures',
      description: 'Savor local cuisines with guided food tours.',
      icon: UtensilsCrossed,
    },
    {
      title: 'Trusted Partnerships',
      description: 'Handpicked hotels, guides, and local experiences.',
      icon: ShieldCheck,
    },
    {
      title: 'Cultural Immersion',
      description: 'Engage with local traditions and communities.',
      icon: Globe2,
    },
  ];

  return (
    <section className="py-24 bg-[#081c24] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Headline */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#00b5b8] mb-3">
            <span>✦</span>
            <span>WHY TRAVEL WITH US</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white max-w-xl leading-tight">
            Book with confidence, travel with peace of mind
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#0e2732] border border-[#1b3b4a]/50 rounded-3xl p-7 hover:border-[#00b5b8]/50 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
              >
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-2xl bg-[#143a49] flex items-center justify-center text-[#00b5b8] mb-8">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>

                <div>
                  <h3 className="font-sans text-base font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
