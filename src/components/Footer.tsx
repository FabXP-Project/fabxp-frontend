'use client';

import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname?.startsWith('/booking')) {
    return null;
  }

  return (
    <footer className="bg-[#081620] text-white pt-20 pb-12 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          {/* Brand Info & Socials */}
          <div className="md:col-span-4 flex flex-col items-start">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 mb-4 group focus:outline-none"
            >
              <span className="font-sans font-extrabold text-2xl tracking-tight text-white group-hover:text-[#139c70] transition-colors">
                Fab<span className="text-[#139c70]">xp</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm font-light mb-6">
              Discover unique travel experiences around the world. Your next adventure starts here.
            </p>

            {/* Social Icons matching landing(1).png */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Youtube, label: 'YouTube' },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={`#${s.label.toLowerCase()}`}
                    aria-label={s.label}
                    className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#139c70] flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Columns matching landing(1).png */}
          <div className="md:col-span-8 grid grid-cols-3 gap-8">
            {/* ABOUT FABXP */}
            <div>
              <h4 className="text-[11px] uppercase tracking-wider font-bold text-slate-200 mb-5">
                ABOUT FABXP
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-400 font-light">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#careers" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#press" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#blog" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* SERVICES */}
            <div>
              <h4 className="text-[11px] uppercase tracking-wider font-bold text-slate-200 mb-5">
                SERVICES
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-400 font-light">
                <li>
                  <Link href="/experiences" className="hover:text-white transition-colors text-left block">
                    Flights
                  </Link>
                </li>
                <li>
                  <Link href="/experiences" className="hover:text-white transition-colors text-left block">
                    Hotels
                  </Link>
                </li>
                <li>
                  <Link href="/experiences" className="hover:text-white transition-colors text-left block">
                    Experiences
                  </Link>
                </li>
                <li>
                  <Link href="/experiences" className="hover:text-white transition-colors text-left block">
                    Packages
                  </Link>
                </li>
              </ul>
            </div>

            {/* SUPPORT */}
            <div>
              <h4 className="text-[11px] uppercase tracking-wider font-bold text-slate-200 mb-5">
                SUPPORT
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-400 font-light">
                <li>
                  <a href="#help" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-xs text-slate-500 font-light">
          © 2026 Fabxp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
