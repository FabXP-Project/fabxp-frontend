import React from 'react';
import { Camera, QrCode } from 'lucide-react';

interface BookingQrCodeProps {
  bookingId?: string;
  onOpenScanner?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showScanButton?: boolean;
}

export const BookingQrCode: React.FC<BookingQrCodeProps> = ({
  bookingId = 'FBX-2026-78429',
  onOpenScanner,
  size = 'md',
  showScanButton = true,
}) => {
  const sizeMap = {
    sm: 'w-24 h-24 p-2',
    md: 'w-32 h-32 p-2.5',
    lg: 'w-40 h-40 p-3',
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* QR Code Container */}
      <div
        onClick={onOpenScanner}
        className={`relative bg-white rounded-2xl border-2 border-slate-200/90 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:border-[#139c70] hover:shadow-md transition-all group ${sizeMap[size]}`}
        title="Click to scan or verify QR code"
      >
        {/* SVG QR Code Illustration matching travel boarding passes */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-slate-900 group-hover:text-[#139c70] transition-colors"
          fill="currentColor"
        >
          {/* Top-Left Corner Marker */}
          <rect x="5" y="5" width="28" height="28" rx="4" fill="currentColor" />
          <rect x="9" y="9" width="20" height="20" rx="2" fill="white" />
          <rect x="13" y="13" width="12" height="12" rx="1" fill="currentColor" />

          {/* Top-Right Corner Marker */}
          <rect x="67" y="5" width="28" height="28" rx="4" fill="currentColor" />
          <rect x="71" y="9" width="20" height="20" rx="2" fill="white" />
          <rect x="75" y="13" width="12" height="12" rx="1" fill="currentColor" />

          {/* Bottom-Left Corner Marker */}
          <rect x="5" y="67" width="28" height="28" rx="4" fill="currentColor" />
          <rect x="9" y="71" width="20" height="20" rx="2" fill="white" />
          <rect x="13" y="75" width="12" height="12" rx="1" fill="currentColor" />

          {/* Data Modules & Pattern */}
          <rect x="38" y="8" width="6" height="6" />
          <rect x="50" y="8" width="8" height="6" />
          <rect x="38" y="20" width="8" height="6" />
          <rect x="52" y="20" width="6" height="6" />
          <rect x="8" y="38" width="6" height="8" />
          <rect x="20" y="38" width="6" height="6" />
          <rect x="38" y="38" width="8" height="8" />
          <rect x="50" y="38" width="12" height="6" />
          <rect x="68" y="38" width="6" height="12" />
          <rect x="80" y="38" width="12" height="6" />
          <rect x="8" y="52" width="8" height="6" />
          <rect x="22" y="52" width="6" height="6" />
          <rect x="38" y="50" width="6" height="12" />
          <rect x="52" y="50" width="8" height="8" />
          <rect x="68" y="54" width="8" height="6" />
          <rect x="82" y="50" width="10" height="8" />
          <rect x="38" y="68" width="8" height="8" />
          <rect x="52" y="68" width="6" height="10" />
          <rect x="68" y="68" width="10" height="6" />
          <rect x="84" y="68" width="8" height="8" />
          <rect x="38" y="82" width="12" height="8" />
          <rect x="56" y="82" width="8" height="6" />
          <rect x="70" y="82" width="12" height="8" />
          <rect x="86" y="82" width="6" height="8" />

          {/* Center Brand Marker */}
          <circle cx="50" cy="50" r="5" fill="#139c70" />
        </svg>

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-[#139c70]/90 text-white rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-2 text-center">
          <Camera className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-bold tracking-tight uppercase leading-tight">
            Open Scanner
          </span>
        </div>
      </div>

      {/* Booking Identifier label below QR */}
      <span className="text-[9px] font-mono text-slate-400 mt-1.5 font-bold tracking-wider">
        {bookingId}
      </span>

      {/* Optional Scan QR trigger button */}
      {showScanButton && onOpenScanner && (
        <button
          onClick={onOpenScanner}
          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#f0f9f6] hover:bg-[#139c70] text-[#139c70] hover:text-white text-[11px] font-bold rounded-lg border border-[#139c70]/30 transition-all active:scale-95"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Scan QR</span>
        </button>
      )}
    </div>
  );
};
