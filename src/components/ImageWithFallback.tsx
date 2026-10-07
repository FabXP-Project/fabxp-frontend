'use client';

import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  aspectRatio?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Travel experience',
  className = '',
  fallbackTitle,
  fallbackSubtitle,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex flex-col justify-end p-4 text-white ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00b5b8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10">
          <div className="text-xs uppercase tracking-widest text-[#00b5b8] font-semibold mb-1">
            {fallbackSubtitle || 'Fabxp Destination'}
          </div>
          <div className="font-serif text-base font-medium text-white line-clamp-1">
            {fallbackTitle || alt}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
