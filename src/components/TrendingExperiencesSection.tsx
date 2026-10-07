import React from 'react';
import { getTrendingExperiences } from '@/lib/api';
import { ImageWithFallback } from './ImageWithFallback';
import { Star } from 'lucide-react';
import Link from 'next/link';

export const TrendingExperiencesSection = async () => {
  const experiences = await getTrendingExperiences();
  
  return (
    <section id="trending-experiences" className="py-16 bg-[#fcfdfe]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            Trending Experiences
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-light">
            Hand-picked adventures loved by travelers worldwide
          </p>
        </div>

        {/* 4 Cards Grid matching landing(1).png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden mb-3">
                  <ImageWithFallback
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    fallbackTitle={exp.title}
                  />

                  {/* Rating Badge */}
                  <div className="absolute top-2.5 right-2.5 bg-black/50 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{exp.rating}</span>
                  </div>
                </div>

                {/* Title & Location */}
                <h3 className="font-semibold text-base text-slate-900 group-hover:text-[#139c70] transition-colors leading-snug mb-1">
                  {exp.title}
                </h3>
                <p className="text-xs text-slate-500 font-light mb-4">
                  {exp.location}
                </p>
              </div>

              {/* Price & Book Now button */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <span className="text-base font-bold text-[#149d88]">
                    ${exp.price}
                  </span>
                  <span className="text-[11px] text-slate-400 font-light ml-1">
                    /person
                  </span>
                </div>

                <Link
                  href={`/booking?type=trending&expId=${exp.id}`}
                  className="px-4 py-1.5 bg-[#149d88] hover:bg-[#108c79] text-white text-xs font-semibold rounded-full shadow-sm transition-all active:scale-95 inline-block"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
