import React from 'react';
import { BLOG_POSTS } from '../data/travelData';
import { ImageWithFallback } from './ImageWithFallback';

interface InspirationSectionProps {
  onViewAllStories: () => void;
}

export const InspirationSection: React.FC<InspirationSectionProps> = ({ onViewAllStories }) => {
  return (
    <section id="blogs" className="py-20 bg-[#00b4b6] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-12 max-w-xl leading-tight">
          Inspiration and tips for your next travel journey
        </h2>

        {/* 2 Wide Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {BLOG_POSTS.map((post, idx) => (
            <article
              key={idx}
              className="group relative h-[340px] sm:h-[380px] rounded-3xl overflow-hidden shadow-xl bg-slate-900 flex flex-col justify-end p-7 border border-white/10 cursor-pointer hover:-translate-y-1 transition-all duration-300"
              onClick={onViewAllStories}
            >
              {/* Image */}
              <div className="absolute inset-0 z-0">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  fallbackTitle={post.title}
                />
              </div>

              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

              {/* Content */}
              <div className="relative z-20">
                <div className="text-[11px] font-semibold tracking-wider uppercase text-white/80 mb-2">
                  {post.date}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-white leading-snug">
                  {post.title}
                </h3>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/20">
          <p className="text-white/90 text-sm font-normal">
            Explore stories that inspire travel
          </p>
          <button
            onClick={onViewAllStories}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-slate-900 hover:bg-slate-50 text-xs sm:text-sm font-semibold rounded-full shadow-md transition-all transform active:scale-95 whitespace-nowrap"
          >
            <span>View All</span>
            <span>↗</span>
          </button>
        </div>
      </div>
    </section>
  );
};
