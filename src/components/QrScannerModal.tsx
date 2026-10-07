'use client';

import React, { useState, useEffect } from 'react';
import { X, QrCode, Camera, CheckCircle2, RefreshCw, Zap } from 'lucide-react';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId?: string;
  guestName?: string;
  activityTitle?: string;
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  bookingId = 'FBX-2026-78429',
  guestName = 'John Doe',
  activityTitle = 'Sunrise Paragliding Over Manali Valley',
}) => {
  const [scanning, setScanning] = useState(true);
  const [scanResult, setScanResult] = useState<{
    verified: boolean;
    bookingId: string;
    guestName: string;
    timestamp: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setScanning(true);
      setScanResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScanning(false);
    setScanResult({
      verified: true,
      bookingId,
      guestName,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    });
  };

  const handleReset = () => {
    setScanning(true);
    setScanResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
          aria-label="Close scanner"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#139c70] mb-1">
            <Camera className="w-3.5 h-3.5" />
            <span>FABXP DIGITAL TICKET VERIFICATION</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            QR Code Voucher Scanner
          </h3>
          <p className="text-xs text-slate-400 font-light mt-1">
            Align the QR code within the frame to verify traveler ticket
          </p>
        </div>

        {/* Viewfinder Area */}
        <div className="relative aspect-square max-w-xs mx-auto rounded-2xl bg-black border-2 border-slate-700 overflow-hidden flex items-center justify-center mb-5 shadow-inner">
          {/* Animated Scanning Line */}
          {scanning && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#139c70] to-transparent shadow-[0_0_12px_#139c70] animate-bounce z-20" />
          )}

          {/* Corner Guides */}
          <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-[#139c70] z-10" />
          <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-[#139c70] z-10" />
          <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-[#139c70] z-10" />
          <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-[#139c70] z-10" />

          {/* Viewfinder Center Content */}
          {scanning ? (
            <div className="flex flex-col items-center justify-center text-center p-4">
              <QrCode className="w-24 h-24 text-slate-600/60 stroke-[1] mb-3 animate-pulse" />
              <span className="text-[11px] text-slate-400 font-mono tracking-wider">
                LOOKING FOR QR CODE...
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#139c70]/20 text-[#139c70] flex items-center justify-center mb-3 border border-[#139c70]/40">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-sm font-bold text-white tracking-wide">
                QR CODE DETECTED
              </span>
              <span className="text-xs text-[#139c70] font-mono mt-0.5">
                {scanResult?.bookingId}
              </span>
            </div>
          )}
        </div>

        {/* Scan Result Card */}
        {scanResult ? (
          <div className="bg-slate-800/90 rounded-2xl p-4 border border-[#139c70]/40 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700 text-xs">
              <span className="text-slate-400">Status</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-current" />
                Verified & Validated
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Booking ID:</span>
                <span className="font-mono font-bold text-white">{scanResult.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Passenger:</span>
                <span className="font-medium text-white">{scanResult.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Experience:</span>
                <span className="font-medium text-slate-300 truncate max-w-[200px]">{activityTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Scan Time:</span>
                <span className="font-mono text-slate-400">{scanResult.timestamp}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mb-4">
            <button
              onClick={handleSimulateScan}
              className="text-xs text-[#139c70] hover:text-emerald-300 font-semibold underline underline-offset-4 transition-colors"
            >
              Simulate Instant Camera Scan
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {scanResult ? (
            <button
              onClick={handleReset}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Scan Another Code</span>
            </button>
          ) : (
            <button
              onClick={handleSimulateScan}
              className="flex-1 py-3 bg-[#139c70] hover:bg-[#0f855e] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Camera className="w-4 h-4" />
              <span>Scan Voucher Code</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
