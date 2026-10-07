'use client';

import React, { useState, useMemo } from 'react';
import { Experience } from '../data/travelData';
import { ImageWithFallback } from './ImageWithFallback';
import { Search, MapPin, Star, Clock, Heart, SlidersHorizontal, Map, X } from 'lucide-react';

import { useRouter } from 'next/navigation';

interface ExperiencesPageProps {
  initialExperiences: Experience[];
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({ initialExperiences }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Guided Tours']);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedDuration, setSelectedDuration] = useState<'all' | 'under_2h' | '2_5h' | 'full_day'>('2_5h');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [showMapModal, setShowMapModal] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const router = useRouter();

  const categories = ['Guided Tours', 'Wine Tasting', 'Adventure', 'Water Sports'];

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(1000);
    setSelectedDuration('all');
    setSearchQuery('');
    setSortBy('popular');
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered & sorted list
  const filteredExperiences = useMemo(() => {
    return initialExperiences.filter((exp) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          exp.title.toLowerCase().includes(q) ||
          exp.location.toLowerCase().includes(q) ||
          exp.category.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Categories
      if (selectedCategories.length > 0 && !selectedCategories.includes(exp.category)) {
        return false;
      }

      // Max price
      if (exp.price > maxPrice) {
        return false;
      }

      // Duration
      if (selectedDuration !== 'all' && exp.durationCategory !== selectedDuration) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default popular
    });
  }, [searchQuery, selectedCategories, maxPrice, selectedDuration, sortBy]);

  return (
    <div className="pt-28 pb-24 bg-[#f8fafc] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#139c70] mb-2">
              <span>CURATED LIBRARY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Top Experiences
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-1 font-light">
              Discover 124 curated activities worldwide
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experiences or destinations..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#139c70]/40 shadow-sm transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-6 flex justify-between items-center">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#139c70]" />
            <span>Filters ({selectedCategories.length + (selectedDuration !== 'all' ? 1 : 0)})</span>
          </button>
          <span className="text-xs text-slate-500 font-light">
            Showing {filteredExperiences.length} activities
          </span>
        </div>

        {/* Main Layout: Filters Sidebar + Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filters */}
          <aside
            className={`lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Filters
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs text-[#139c70] hover:text-[#0f855e] font-semibold transition-colors"
              >
                Reset All
              </button>
            </div>

            {/* CATEGORY */}
            <div className="mb-8">
              <h4 className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-4">
                CATEGORY
              </h4>
              <div className="space-y-3">
                {categories.map((cat) => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <label
                      key={cat}
                      className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer select-none group"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCategory(cat)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-[#139c70] text-white'
                            : 'border border-slate-300 group-hover:border-slate-400'
                        }`}
                      >
                        {isChecked && (
                          <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs sm:text-sm group-hover:text-slate-900 transition-colors font-medium">
                        {cat}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* PRICE RANGE */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-3">
                <span>PRICE RANGE</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 mb-2 font-medium">
                <span>$50</span>
                <span className="font-bold text-slate-800">${maxPrice}+</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#139c70] cursor-pointer"
              />
            </div>

            {/* DURATION */}
            <div className="mb-8">
              <h4 className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-3">
                DURATION
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDuration(selectedDuration === 'under_2h' ? 'all' : 'under_2h')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedDuration === 'under_2h'
                      ? 'border border-[#139c70] text-[#139c70] bg-[#139c70]/10 shadow-sm'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  Under 2h
                </button>
                <button
                  onClick={() => setSelectedDuration(selectedDuration === '2_5h' ? 'all' : '2_5h')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedDuration === '2_5h'
                      ? 'border border-[#139c70] text-[#139c70] bg-[#139c70]/10 shadow-sm'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  2-5h
                </button>
                <button
                  onClick={() => setSelectedDuration(selectedDuration === 'full_day' ? 'all' : 'full_day')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedDuration === 'full_day'
                      ? 'border border-[#139c70] text-[#139c70] bg-[#139c70]/10 shadow-sm'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  Full Day
                </button>
              </div>
            </div>

            {/* SORT BY */}
            <div>
              <h4 className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-3">
                SORT BY
              </h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#139c70]/40 cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </aside>

          {/* Cards Grid & Content */}
          <main className="lg:col-span-9">
            {filteredExperiences.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                <p className="text-slate-800 font-bold text-xl mb-2">No experiences found</p>
                <p className="text-slate-400 text-sm mb-6 font-light">
                  Try adjusting your filters or search keywords to explore more activities.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#139c70] text-white text-xs font-semibold rounded-full hover:bg-[#0f855e] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {filteredExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => router.push(`/booking?type=exp&expId=${exp.id}`)}
                    className="bg-white rounded-3xl p-4 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      {/* Image container */}
                      <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-4 shadow-sm">
                        <ImageWithFallback
                          src={exp.image}
                          alt={exp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          fallbackTitle={exp.title}
                        />

                        {/* Top Left Editor's Pick Badge */}
                        {exp.isEditorsPick && (
                          <div className="absolute top-3 left-3 bg-[#139c70] text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-md uppercase shadow-sm">
                            EDITOR'S PICK
                          </div>
                        )}

                        {/* Top Right Heart Wishlist Button */}
                        <button
                          onClick={(e) => toggleFavorite(exp.id, e)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:text-rose-500 hover:bg-white transition-colors shadow-sm focus:outline-none"
                          aria-label="Save to favorites"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favorites[exp.id] ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#139c70]" />
                        <span>{exp.location}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#139c70] transition-colors leading-snug mb-2">
                        {exp.title}
                      </h3>

                      {/* Rating & Duration */}
                      <div className="flex items-center gap-4 text-xs text-slate-600 mb-4 font-medium">
                        <div className="flex items-center gap-1 text-slate-800">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold">{exp.rating}</span>
                          <span className="text-slate-400 font-normal">({exp.reviewsCount})</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and View CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">From</span>
                        <span className="text-2xl font-bold text-[#149d88]">
                          ${exp.price}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/booking?type=exp&expId=${exp.id}`);
                        }}
                        className="px-5 py-2 bg-[#f0f9f6] hover:bg-[#139c70] text-[#0f855e] hover:text-white text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5"
                      >
                        <span>View</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mb-16 select-none">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center text-xs hover:border-[#139c70] hover:text-[#139c70] transition-colors"
                aria-label="Previous page"
              >
                ‹
              </button>
              <button
                onClick={() => setCurrentPage(1)}
                className={`w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                  currentPage === 1 ? 'bg-[#139c70] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                1
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                  currentPage === 2 ? 'bg-[#139c70] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                  currentPage === 3 ? 'bg-[#139c70] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                3
              </button>
              <span className="text-slate-400 px-1 text-xs">...</span>
              <button
                onClick={() => setCurrentPage(12)}
                className={`w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                  currentPage === 12 ? 'bg-[#139c70] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                12
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(12, currentPage + 1))}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center text-xs hover:border-[#139c70] hover:text-[#139c70] transition-colors"
                aria-label="Next page"
              >
                ›
              </button>
            </div>

            {/* "Can't decide where to go?" Map Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 p-8 sm:p-12 text-center text-white shadow-lg">
              <div className="relative z-10 max-w-xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                  Can't decide where to go?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  Explore our world map of experiences and find your next unforgettable journey based on your interests.
                </p>

                <button
                  onClick={() => setShowMapModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#139c70] hover:bg-[#0f855e] text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-md transition-all active:scale-95"
                >
                  <Map className="w-4 h-4" />
                  <span>Explore World Map</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* World Map Explorer Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowMapModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#139c70] mb-2">
              <span>INTERACTIVE EXPLORER</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              World Map of Experiences
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-6 font-light">
              Select any continent or travel hub below to jump directly into handpicked activities:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { name: 'Europe', count: '48 Tours', tag: 'Paris, Rome, Alps' },
                { name: 'Asia', count: '36 Tours', tag: 'Kyoto, Bali, Manali' },
                { name: 'Middle East', count: '18 Tours', tag: 'Dubai, Oman, Petra' },
                { name: 'Americas', count: '22 Tours', tag: 'Canyon, NYC, Costa Rica' },
              ].map((region) => (
                <button
                  key={region.name}
                  onClick={() => setShowMapModal(false)}
                  className="bg-[#f8fafc] hover:bg-[#139c70] hover:text-white text-left p-4 rounded-2xl transition-all duration-200 group border border-slate-200"
                >
                  <div className="text-base font-bold text-slate-900 group-hover:text-white mb-1">
                    {region.name}
                  </div>
                  <div className="text-xs text-[#139c70] group-hover:text-white/90 font-bold mb-1">
                    {region.count}
                  </div>
                  <div className="text-[11px] text-slate-400 group-hover:text-white/80 font-light truncate">
                    {region.tag}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowMapModal(false)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-full"
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
