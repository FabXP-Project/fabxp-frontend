import React from 'react';

interface FabxpLogoProps {
  className?: string;
  variant?: 'pill' | 'dark' | 'simple';
  size?: 'sm' | 'md' | 'lg';
}

export const FabxpLogo: React.FC<FabxpLogoProps> = ({
  className = '',
  variant = 'pill',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-base py-1 px-3',
    md: 'text-lg py-1.5 px-4',
    lg: 'text-2xl py-2 px-6',
  };

  if (variant === 'simple') {
    return (
      <div className={`inline-flex items-center gap-2 font-sans font-bold tracking-tight ${className}`}>
        <span className="text-[#00b5b8] text-xl font-serif">✦</span>
        <div className="flex flex-col leading-none">
          <span className="text-xl tracking-tight font-extrabold text-white">
            fab<span className="text-[#00b5b8]">xp</span>
          </span>
          <span className="text-[7px] tracking-[0.2em] font-semibold text-slate-400 uppercase mt-0.5">
            Live Your Experience
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex flex-col items-center justify-center bg-white rounded-full shadow-sm border border-slate-100 select-none ${sizeClasses[size]} ${className}`}
      aria-label="Fabxp - Live Your Experience"
    >
      <div className="flex items-center justify-center leading-none">
        <span className="text-slate-900 font-extrabold tracking-tight text-lg">
          fab
        </span>
        <span className="text-slate-900 font-extrabold tracking-tight text-lg relative">
          x
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          p
        </span>
      </div>
      <span className="text-[6.5px] uppercase font-bold tracking-[0.15em] text-slate-500 -mt-0.5">
        Live Your Experience
      </span>
    </div>
  );
};
