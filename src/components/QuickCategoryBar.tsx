import React from 'react';
import { Plane, Package, Building2, Train, Car } from 'lucide-react';
import Link from 'next/link';

export const QuickCategoryBar: React.FC = () => {
  const categories = [
    {
      name: 'Flights',
      icon: Plane,
      color: 'bg-blue-500',
    },
    {
      name: 'Holiday Packages',
      icon: Package,
      color: 'bg-emerald-500',
    },
    {
      name: 'Hotels',
      icon: Building2,
      color: 'bg-amber-500',
    },
    {
      name: 'Trains',
      icon: Train,
      color: 'bg-purple-500',
    },
    {
      name: 'Cabs',
      icon: Car,
      color: 'bg-rose-500',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/booking?type=category&cat=${encodeURIComponent(cat.name)}`}
                className="bg-white border border-slate-100 hover:border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-3.5 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 group block text-center"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform mx-auto`}
                >
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#139c70] transition-colors mt-2">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
