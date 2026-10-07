'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <section className="py-20 bg-[#fbfdfe] text-center border-t border-slate-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
          Subscribe Fabxp & get latest travel inspiration
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed mb-8">
          Exclusive deals, hidden gems, and curated experiences — delivered to your inbox.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 text-sm font-medium text-[#139c70] bg-[#139c70]/10 px-5 py-3 rounded-full">
            <CheckCircle2 className="w-5 h-5" />
            <span>Thank you for subscribing! Check your inbox soon.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-white border border-slate-200 rounded-full py-3.5 px-6 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#139c70] shadow-sm"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#149d88] hover:bg-[#108c79] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Subscribe</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
