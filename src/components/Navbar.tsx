'use client';

import React, { useState } from 'react';
import { FabxpLogo } from './FabxpLogo';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Show, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (view: 'home' | 'experiences', sectionId?: string) => {
    setMobileMenuOpen(false);
    if (view === 'home' && sectionId) {
      if (pathname !== '/') {
        router.push(`/?section=${sectionId}`);
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (view === 'home') {
      router.push('/');
    } else {
      router.push('/experiences');
    }
  };

  const isExperiences = pathname === '/experiences';

  return (
    <>
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-5xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/5 rounded-full py-2.5 px-4 sm:px-7 flex items-center justify-between transition-all duration-300">
          {/* Brand Logo on the left */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="focus:outline-none hover:opacity-90 transition-opacity shrink-0"
            aria-label="Fabxp Home"
          >
            <FabxpLogo size="sm" />
          </Link>

          {/* Center Navigation Links matching landing(1).png */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
            <Link
              href="/experiences"
              className={`transition-colors hover:text-[#0f946e] ${
                isExperiences ? 'text-[#0f946e] font-semibold' : ''
              }`}
            >
              Top Activities
            </Link>
            <button
              onClick={() => handleNavClick('home', 'top-destinations')}
              className="transition-colors hover:text-[#0f946e]"
            >
              Top Landmarks
            </button>
            <button
              onClick={() => handleNavClick('home', 'trending-experiences')}
              className="transition-colors hover:text-[#0f946e]"
            >
              Explore Places
            </button>
          </nav>

          {/* Right side: Sign up & Login buttons */}
          <div className="hidden sm:flex items-center gap-5">
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <button className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
                  Sign up
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="px-6 py-2 bg-[#139c70] hover:bg-[#0f855e] text-white text-sm font-medium rounded-full shadow-sm hover:shadow transition-all active:scale-95">
                  Login
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="px-4 py-1.5 bg-[#139c70] text-white text-xs font-medium rounded-full">
                  Login
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl p-5 sm:hidden flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <Link
              href="/experiences"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Top Activities
            </Link>
            <button
              onClick={() => handleNavClick('home', 'top-destinations')}
              className="text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Top Landmarks
            </button>
            <button
              onClick={() => handleNavClick('home', 'trending-experiences')}
              className="text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Explore Places
            </button>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Show when="signed-out">
                <SignUpButton mode="modal">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl text-center"
                  >
                    Sign up
                  </button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2 bg-[#139c70] text-white text-sm font-semibold rounded-xl text-center"
                  >
                    Login
                  </button>
                </SignInButton>
              </Show>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

