'use client';

import React, { useState } from 'react';
import { FAQS } from '../data/travelData';
import { Plus, Minus } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Title */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#00b5b8] mb-3">
            <span>✦</span>
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 leading-tight">
            Everything you need to know before you travel
          </h2>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-slate-200">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-6 first:pt-0 last:pb-0">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-base sm:text-lg font-medium text-slate-900 group-hover:text-[#00b5b8] transition-colors">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 group-hover:text-[#00b5b8] transition-colors shrink-0">
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-[#00b5b8]" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-3 pr-12 text-slate-600 text-sm sm:text-base font-light leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
