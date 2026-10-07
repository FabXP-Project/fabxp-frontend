'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { FabxpLogo } from './FabxpLogo';
import { STAYS, FLIGHTS, INSURANCE_PLANS, Stay, Flight, InsurancePlan, Experience } from '../data/travelData';
import { ImageWithFallback } from './ImageWithFallback';
import { BillQrScanner } from './BillQrScanner';
import {
  X,
  Star,
  MapPin,
  Plane,
  Shield,
  Check,
  Tag,
  Pencil,
  Lock,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  Download,
  Copy,
  ArrowRight,
  Receipt,
  QrCode,
  Sparkles,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

interface BookingFunnelProps {
  initialExperience?: Experience | null;
}

export const BookingFunnel: React.FC<BookingFunnelProps> = ({
  initialExperience,
}) => {
  const router = useRouter();
  // Current funnel step: 1 = Stays, 2 = Flights, 3 = Insurance, 4 = Review/Guest/Payment/Booked
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [step4Substep, setStep4Substep] = useState<'summary' | 'guest' | 'payment' | 'confirmed'>('summary');

  // Selected items in the trip
  const [selectedStay, setSelectedStay] = useState<Stay | null>(STAYS[0]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(FLIGHTS[0]);
  const [selectedInsurance, setSelectedInsurance] = useState<InsurancePlan | null>(INSURANCE_PLANS[1]);
  const [numGuests] = useState(2);
  const [numNights] = useState(2);

  // Experience title
  const activityTitle = initialExperience?.title || 'Sunrise Paragliding Over Manali Valley';
  const activityPrice = initialExperience?.price || 89;

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  // Guest details form state
  const [guestForm, setGuestForm] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@email.com',
    phone: '+91 98765 43210',
    coFirstName: 'Jane',
    coLastName: 'Doe',
    emergencyName: 'Emergency contact name',
    emergencyPhone: '+91 98765 43210',
    specialRequests: '',
    agreedTerms: true,
  });

  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'wallets'>('card');
  const [cardForm, setCardForm] = useState({
    cardNumber: '1234 5678 9012 3456',
    expiry: '08/28',
    cvv: '•••',
    nameOnCard: 'John Doe',
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [copiedBookingId, setCopiedBookingId] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [voucherQrUrl, setVoucherQrUrl] = useState<string>('');

  // Calculations
  const activityTotal = activityPrice * numGuests;
  const stayTotal = selectedStay ? selectedStay.pricePerNight * numNights : 0;
  const flightTotal = selectedFlight ? selectedFlight.price * numGuests : 0;
  const insuranceTotal = selectedInsurance ? selectedInsurance.pricePerPerson * numGuests : 0;

  const subtotal = activityTotal + stayTotal + flightTotal + insuranceTotal;
  const taxesAndFees = Math.round(subtotal * 0.12);
  const platformFee = 25;
  const grandTotal = Math.max(0, subtotal + taxesAndFees + platformFee - appliedDiscount);

  useEffect(() => {
    QRCode.toDataURL(
      JSON.stringify({
        ref: 'FBX-2026-78429',
        guest: `${guestForm.firstName} ${guestForm.lastName}`,
        activity: activityTitle,
        total: `$${grandTotal}`,
        status: 'PAID',
      }),
      { width: 220, margin: 1 }
    )
      .then((url) => setVoucherQrUrl(url))
      .catch(() => {});
  }, [guestForm.firstName, guestForm.lastName, activityTitle, grandTotal]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    if (couponCode.toUpperCase() === 'FABXP' || couponCode.toUpperCase() === 'SUMMER' || couponCode.toUpperCase() === 'WELCOME') {
      const discount = 50;
      setAppliedDiscount(discount);
      setCouponFeedback('Coupon applied: $50 OFF!');
    } else {
      setCouponFeedback('Invalid promo code. Try "FABXP"');
    }
  };

  const handlePayNow = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setStep4Substep('confirmed');
    }, 1200);
  };

  const copyBookingId = () => {
    navigator.clipboard?.writeText('FBX-2026-78429');
    setCopiedBookingId(true);
    setTimeout(() => setCopiedBookingId(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      {/* Top Solid Emerald/Teal Bar with Brand Logo on left and Close on right */}
      <header className="bg-[#139c70] text-white py-3.5 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="focus:outline-none hover:opacity-95 transition-opacity flex items-center"
            aria-label="Fabxp Home"
          >
            <FabxpLogo size="sm" />
          </button>
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors focus:outline-none"
            aria-label="Close trip planning"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Stepper Status Bar */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-6 pb-4">
        <div className="flex items-center justify-between text-xs font-bold tracking-widest text-[#139c70] mb-2 uppercase">
          <div className="flex items-center gap-2">
            <span>TRIP PLANNING</span>
          </div>
          <span className="text-slate-400 font-semibold">
            STEP {currentStep} OF 4
          </span>
        </div>

        {/* Progress Line */}
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#139c70] transition-all duration-500 rounded-full"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Form Content Container */}
      <main
        className={`mx-auto w-full px-4 sm:px-6 py-6 pb-20 flex-1 transition-all duration-300 ${
          currentStep === 4 ? 'max-w-6xl' : 'max-w-4xl'
        }`}
      >
        {/* ======================================================== */}
        {/* STEP 1: WOULD YOU LIKE TO ADD A STAY FOR YOUR TRIP?       */}
        {/* ======================================================== */}
        {currentStep === 1 && (
          <div className="animate-in fade-in duration-300">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight mb-2">
              Would you like to add a stay for your trip?
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mb-6 font-light">
              Enhance your experience by booking a highly-rated stay nearby. This step is optional.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 bg-[#149d88] hover:bg-[#108c79] text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm transition-all"
              >
                Add a Stay
              </button>
              <button
                onClick={() => {
                  setSelectedStay(null);
                  setCurrentStep(2);
                }}
                className="px-6 py-2.5 bg-white border border-[#139c70] text-[#139c70] hover:bg-[#139c70]/5 text-xs sm:text-sm font-semibold rounded-full transition-all"
              >
                Skip for Now
              </button>
            </div>

            {/* Stay Cards List */}
            <div className="space-y-4">
              {STAYS.map((stay) => {
                const isSelected = selectedStay?.id === stay.id;
                return (
                  <div
                    key={stay.id}
                    className={`bg-white rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all duration-200 border ${
                      isSelected ? 'border-[#139c70] shadow-md ring-2 ring-[#139c70]/20' : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                      {/* Image */}
                      <div className="relative w-full sm:w-44 h-32 rounded-2xl overflow-hidden shadow-sm shrink-0">
                        <ImageWithFallback
                          src={stay.image}
                          alt={stay.name}
                          className="w-full h-full object-cover"
                          fallbackTitle={stay.name}
                        />
                        {stay.recommended && (
                          <div className="absolute top-2 left-2 bg-[#139c70] text-white text-[9px] font-bold tracking-wider px-2 py-0.5 rounded shadow-sm">
                            RECOMMENDED
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                          {stay.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{stay.distance}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-[#149d88]">
                            ${stay.pricePerNight}
                          </span>
                          <span className="text-xs text-slate-500 font-light">per night</span>
                        </div>
                      </div>
                    </div>

                    {/* Right action and rating */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                      <div className="flex items-center gap-1 text-xs text-slate-600 font-medium">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-800">{stay.rating}</span>
                        <span className="text-slate-400">({stay.reviewsCount})</span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedStay(stay);
                          setCurrentStep(2);
                        }}
                        className={`px-6 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                          isSelected
                            ? 'bg-[#0f855e] text-white'
                            : 'bg-[#149d88] hover:bg-[#108c79] text-white shadow-sm'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 2: WOULD YOU LIKE US TO ARRANGE YOUR FLIGHTS?       */}
        {/* ======================================================== */}
        {currentStep === 2 && (
          <div className="animate-in fade-in duration-300">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight mb-2">
              Would you like us to arrange your flights?
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mb-8 font-light">
              Choose from our curated flight options or skip this step to book your own travel later.
            </p>

            {/* Flight Cards List */}
            <div className="space-y-4 mb-8">
              {FLIGHTS.map((flight) => {
                const isSelected = selectedFlight?.id === flight.id;
                return (
                  <div
                    key={flight.id}
                    onClick={() => setSelectedFlight(isSelected ? null : flight)}
                    className={`bg-white rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer transition-all duration-200 border ${
                      isSelected ? 'border-[#139c70] ring-2 ring-[#139c70]/20 shadow-md' : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Plane icon badge */}
                      <div className="w-12 h-12 rounded-2xl bg-[#f0f9f6] flex items-center justify-center text-[#139c70] shrink-0">
                        <Plane className="w-5 h-5 transform -rotate-45" />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {flight.airline}
                        </h3>
                        <div className="text-xs text-slate-500 font-light mb-2">
                          {flight.timeRange}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#f0f9f6] text-[#139c70]">
                            {flight.stops}
                          </span>
                          <span className="text-[10px] uppercase font-semibold text-slate-400">
                            {flight.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price and toggle switch */}
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-none border-slate-100">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">
                          STARTING AT
                        </span>
                        <span className="text-2xl font-bold text-[#149d88]">
                          ${flight.price}
                        </span>
                      </div>

                      {/* Custom toggle switch */}
                      <div
                        className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ${
                          isSelected ? 'bg-[#139c70]' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
                            isSelected ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <button
                onClick={() => setCurrentStep(3)}
                className="w-full sm:w-auto px-8 py-3 bg-[#149d88] hover:bg-[#108c79] text-white text-sm font-semibold rounded-full shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Plane className="w-4 h-4 transform -rotate-45" />
                <span>Add Flights</span>
              </button>
              <button
                onClick={() => {
                  setSelectedFlight(null);
                  setCurrentStep(3);
                }}
                className="w-full sm:w-auto px-8 py-3 bg-white border border-[#139c70] text-[#139c70] hover:bg-[#139c70]/5 text-sm font-semibold rounded-full transition-all"
              >
                Skip this step
              </button>
            </div>

            {/* Note box */}
            <div className="bg-white rounded-2xl p-4 flex items-start gap-3 border border-slate-100 shadow-sm">
              <Shield className="w-5 h-5 text-[#139c70] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Flight prices are estimated based on current market data and availability. Final pricing will be confirmed during checkout. All bookings include standard luggage allowance.
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 3: PROTECT YOUR TRIP                                */}
        {/* ======================================================== */}
        {currentStep === 3 && (
          <div className="animate-in fade-in duration-300">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight mb-2">
              Protect your trip
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mb-8 font-light">
              Choose a plan that suits your travel style
            </p>

            {/* 3 Insurance Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {INSURANCE_PLANS.map((plan) => {
                const isSelected = selectedInsurance?.id === plan.id;
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 bg-white border ${
                      isSelected
                        ? 'border-[#139c70] ring-2 ring-[#139c70]/20 shadow-lg'
                        : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {/* Recommended Tag */}
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#139c70] text-white text-[9px] font-bold tracking-wider px-3 py-0.5 rounded-full uppercase shadow-sm">
                        RECOMMENDED
                      </div>
                    )}

                    <div>
                      {/* Shield icon */}
                      <div className="flex justify-center mb-3">
                        <Shield className="w-8 h-8 text-[#139c70] stroke-[1.5]" />
                      </div>

                      {/* Plan title */}
                      <h3 className="text-xl font-bold text-slate-900 text-center mb-1">
                        {plan.name}
                      </h3>

                      {/* Price */}
                      <div className="text-center mb-6">
                        <span className="text-3xl font-bold text-[#149d88]">
                          ${plan.pricePerPerson}
                        </span>
                        <span className="text-xs text-slate-500 font-light">/person</span>
                      </div>

                      {/* Table Limits */}
                      <div className="space-y-2 text-xs pb-5 mb-5 border-b border-slate-100 font-medium">
                        <div className="flex justify-between text-slate-500 font-light">
                          <span>Medical Cover</span>
                          <span className="font-semibold text-slate-700">{plan.medicalCover}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 font-light">
                          <span>Baggage Cover</span>
                          <span className="font-semibold text-slate-700">{plan.baggageCover}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 font-light">
                          <span>Cancellation</span>
                          <span className="font-semibold text-slate-700">{plan.cancellation}</span>
                        </div>
                      </div>

                      {/* Features list */}
                      <div className="space-y-2 mb-8">
                        {plan.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-light">
                            <Check className="w-3.5 h-3.5 text-[#139c70] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add to Trip Button */}
                    <button
                      onClick={() => {
                        setSelectedInsurance(plan);
                        setCurrentStep(4);
                        setStep4Substep('summary');
                      }}
                      className={`w-full py-2.5 rounded-full text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#0f855e] text-white shadow-sm'
                          : 'bg-slate-50 hover:bg-[#139c70] text-slate-800 hover:text-white border border-slate-200'
                      }`}
                    >
                      {isSelected ? 'Plan Added ✓' : 'Add to Trip'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Bottom buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => {
                  setCurrentStep(4);
                  setStep4Substep('summary');
                }}
                className="w-full sm:w-auto px-8 py-3 bg-[#149d88] hover:bg-[#108c79] text-white text-sm font-semibold rounded-full shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Plane className="w-4 h-4 transform -rotate-45" />
                <span>Add to Trip</span>
              </button>
              <button
                onClick={() => {
                  setSelectedInsurance(null);
                  setCurrentStep(4);
                  setStep4Substep('summary');
                }}
                className="w-full sm:w-auto px-8 py-3 bg-white border border-[#139c70] text-[#139c70] hover:bg-[#139c70]/5 text-sm font-semibold rounded-full transition-all"
              >
                Skip this step
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 4A: ORDER SUMMARY & BILL                            */}
        {/* ======================================================== */}
        {currentStep === 4 && step4Substep === 'summary' && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center mb-8">
              <span className="text-[11px] font-bold tracking-widest text-[#139c70] uppercase block mb-1">
                REVIEW YOUR TRIP
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Order Summary
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Selected items and Promo Code */}
              <div className="lg:col-span-7 space-y-4">
                {/* Summary List Card */}
                <div className="bg-white rounded-3xl p-6 space-y-4 border border-slate-100 shadow-sm">
                  {/* Activity Item */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#f0f9f6] text-[#139c70] flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                          {activityTitle}
                        </h4>
                        <span className="text-xs text-slate-500 font-light">
                          {numGuests} people × ${activityPrice}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900 text-base">
                        ${activityTotal}
                      </span>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-slate-400 hover:text-slate-600"
                        aria-label="Edit activity"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Stay Item */}
                  {selectedStay && (
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#f0f9f6] text-[#139c70] flex items-center justify-center shrink-0">
                          <Building className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                            {selectedStay.name} — {numNights} nights
                          </h4>
                          <span className="text-xs text-slate-500 font-light">
                            {numNights} nights × ${selectedStay.pricePerNight}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900 text-base">
                          ${stayTotal}
                        </span>
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="text-slate-400 hover:text-slate-600"
                          aria-label="Edit stay"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Flight Item */}
                  {selectedFlight && (
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#f0f9f6] text-[#139c70] flex items-center justify-center shrink-0">
                          <Plane className="w-5 h-5 transform -rotate-45" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                            {selectedFlight.airline} — Round Trip
                          </h4>
                          <span className="text-xs text-slate-500 font-light">
                            {numGuests} passengers × ${selectedFlight.price}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900 text-base">
                          ${flightTotal}
                        </span>
                        <button
                          onClick={() => setCurrentStep(2)}
                          className="text-slate-400 hover:text-slate-600"
                          aria-label="Edit flight"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Insurance Item */}
                  {selectedInsurance && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#f0f9f6] text-[#139c70] flex items-center justify-center shrink-0">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                            {selectedInsurance.name}
                          </h4>
                          <span className="text-xs text-slate-500 font-light">
                            {numGuests} people × ${selectedInsurance.pricePerPerson}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900 text-base">
                          ${insuranceTotal}
                        </span>
                        <button
                          onClick={() => setCurrentStep(3)}
                          className="text-slate-400 hover:text-slate-600"
                          aria-label="Edit insurance"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Promo Code Input Bar */}
                <form onSubmit={handleApplyCoupon} className="bg-white rounded-2xl p-2.5 px-4 flex items-center justify-between gap-3 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 flex-1">
                    <Tag className="w-4 h-4 text-[#139c70]" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code (try: FABXP)"
                      className="bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none w-full font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-xs font-bold tracking-wider text-[#139c70] hover:text-[#0f855e] uppercase transition-colors"
                  >
                    APPLY
                  </button>
                </form>
                {couponFeedback && (
                  <p className="text-xs text-[#139c70] font-bold px-2">
                    {couponFeedback}
                  </p>
                )}
              </div>

              {/* Right Column: Pricing Breakdown Card (Bill) & Action */}
              <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
                {/* Pricing Breakdown Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-4">
                    BILLING BREAKDOWN
                  </span>

                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 pb-4 mb-4 border-b border-slate-100 font-light">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-800">${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & fees</span>
                      <span className="font-semibold text-slate-800">${taxesAndFees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform fee</span>
                      <span className="font-semibold text-slate-800">${platformFee}</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Promo Discount</span>
                        <span>-${appliedDiscount}</span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-xl font-bold text-slate-900">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-[#149d88]">
                      ${grandTotal}
                    </span>
                  </div>

                  {/* Proceed Button */}
                  <button
                    onClick={() => setStep4Substep('guest')}
                    className="w-full py-3.5 bg-[#149d88] hover:bg-[#108c79] text-white text-sm font-semibold rounded-2xl shadow-md transition-all active:scale-95"
                  >
                    Proceed to Guest Details
                  </button>
                </div>

                {/* Digital Pass & QR Note */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#139c70] shrink-0 shadow-xs">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-left">
                    <h5 className="font-semibold text-slate-800">QR Code Bill & Pass Ready</h5>
                    <p className="text-slate-500 text-[11px] font-light mt-0.5">
                      Your encrypted QR pass & scanner will be available on the confirmed bill.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 4B: GUEST DETAILS                                   */}
        {/* ======================================================== */}
        {currentStep === 4 && step4Substep === 'guest' && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center mb-8">
              <span className="text-[11px] font-bold tracking-widest text-[#139c70] uppercase block mb-1">
                ALMOST THERE
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Guest Details
              </h1>
            </div>

            <div className="space-y-6 mb-8">
              {/* Primary Traveller Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h4 className="text-[11px] uppercase tracking-wider font-bold text-[#139c70] mb-4">
                  PRIMARY TRAVELLER
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      FIRST NAME
                    </label>
                    <input
                      type="text"
                      value={guestForm.firstName}
                      onChange={(e) => setGuestForm({ ...guestForm, firstName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#139c70]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      value={guestForm.lastName}
                      onChange={(e) => setGuestForm({ ...guestForm, lastName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#139c70]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      value={guestForm.email}
                      onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#139c70]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      PHONE
                    </label>
                    <input
                      type="tel"
                      value={guestForm.phone}
                      onChange={(e) => setGuestForm({ ...guestForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#139c70]"
                    />
                  </div>
                </div>
              </div>

              {/* Co-Traveller Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h4 className="text-[11px] uppercase tracking-wider font-bold text-[#139c70] mb-4">
                  CO-TRAVELLER
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      FIRST NAME
                    </label>
                    <input
                      type="text"
                      value={guestForm.coFirstName}
                      onChange={(e) => setGuestForm({ ...guestForm, coFirstName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#139c70]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      value={guestForm.coLastName}
                      onChange={(e) => setGuestForm({ ...guestForm, coLastName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#139c70]"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h4 className="text-[11px] uppercase tracking-wider font-bold text-[#139c70] mb-4">
                  EMERGENCY CONTACT
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      NAME
                    </label>
                    <input
                      type="text"
                      value={guestForm.emergencyName}
                      onChange={(e) => setGuestForm({ ...guestForm, emergencyName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#139c70]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      PHONE
                    </label>
                    <input
                      type="tel"
                      value={guestForm.emergencyPhone}
                      onChange={(e) => setGuestForm({ ...guestForm, emergencyPhone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#139c70]"
                    />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h4 className="text-[11px] uppercase tracking-wider font-bold text-[#139c70] mb-3">
                  SPECIAL REQUESTS
                </h4>
                <textarea
                  rows={3}
                  value={guestForm.specialRequests}
                  onChange={(e) => setGuestForm({ ...guestForm, specialRequests: e.target.value })}
                  placeholder="Any dietary requirements, accessibility needs, or special requests..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#139c70]"
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-3 mb-8 cursor-pointer text-xs text-slate-600 leading-relaxed font-normal">
              <input
                type="checkbox"
                checked={guestForm.agreedTerms}
                onChange={(e) => setGuestForm({ ...guestForm, agreedTerms: e.target.checked })}
                className="mt-0.5 accent-[#139c70]"
              />
              <span>
                I accept the{' '}
                <a href="#terms" className="text-[#139c70] font-semibold underline">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="#cancel" className="text-[#139c70] font-semibold underline">
                  Cancellation Policy
                </a>
                . I understand that my booking is subject to availability and provider confirmation.
              </span>
            </label>

            {/* Continue to Payment button */}
            <button
              onClick={() => setStep4Substep('payment')}
              disabled={!guestForm.agreedTerms}
              className="w-full py-4 bg-[#149d88] hover:bg-[#108c79] disabled:bg-slate-300 text-white text-base font-semibold rounded-2xl shadow-lg transition-all active:scale-95"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 4C: PAYMENT                                         */}
        {/* ======================================================== */}
        {currentStep === 4 && step4Substep === 'payment' && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center mb-8">
              <span className="text-[11px] font-bold tracking-widest text-[#139c70] uppercase block mb-1">
                FINAL STEP
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Payment
              </h1>
            </div>

            {/* Payment Summary Box */}
            <div className="bg-white rounded-3xl p-6 mb-6 flex items-center justify-between border border-slate-100 shadow-sm">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                  PAYMENT SUMMARY
                </span>
                <span className="text-xl font-bold text-slate-900">
                  Total Amount
                </span>
              </div>
              <span className="text-3xl font-bold text-[#149d88]">
                ${grandTotal}
              </span>
            </div>

            {/* Payment Method Selector & Inputs */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 mb-6 border border-slate-100 shadow-sm">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-4">
                PAYMENT METHOD
              </span>

              {/* Methods Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold transition-all text-left ${
                    paymentMethod === 'card'
                      ? 'bg-[#f0f9f6] text-[#139c70] border-2 border-[#139c70] shadow-sm'
                      : 'bg-slate-50 hover:bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#139c70]" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold transition-all text-left ${
                    paymentMethod === 'upi'
                      ? 'bg-[#f0f9f6] text-[#139c70] border-2 border-[#139c70] shadow-sm'
                      : 'bg-slate-50 hover:bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-slate-500" />
                  <span>UPI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3.5 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold transition-all text-left ${
                    paymentMethod === 'netbanking'
                      ? 'bg-[#f0f9f6] text-[#139c70] border-2 border-[#139c70] shadow-sm'
                      : 'bg-slate-50 hover:bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  <Building className="w-4 h-4 text-slate-500" />
                  <span>Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallets')}
                  className={`p-3.5 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold transition-all text-left ${
                    paymentMethod === 'wallets'
                      ? 'bg-[#f0f9f6] text-[#139c70] border-2 border-[#139c70] shadow-sm'
                      : 'bg-slate-50 hover:bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  <Wallet className="w-4 h-4 text-slate-500" />
                  <span>Wallets</span>
                </button>
              </div>

              {/* Card Inputs Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    CARD NUMBER
                  </label>
                  <input
                    type="text"
                    value={cardForm.cardNumber}
                    onChange={(e) => setCardForm({ ...cardForm, cardNumber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-800 font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-[#139c70]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      EXPIRY
                    </label>
                    <input
                      type="text"
                      value={cardForm.expiry}
                      onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#139c70]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardForm.cvv}
                      onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                      placeholder="•••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#139c70]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    NAME ON CARD
                  </label>
                  <input
                    type="text"
                    value={cardForm.nameOnCard}
                    onChange={(e) => setCardForm({ ...cardForm, nameOnCard: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#139c70]"
                  />
                </div>
              </div>
            </div>

            {/* SSL Note */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-6 font-light">
              <Lock className="w-3.5 h-3.5" />
              <span>256-bit SSL encrypted payment • PCI DSS compliant</span>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayNow}
              disabled={isProcessingPayment}
              className="w-full py-4 bg-[#149d88] hover:bg-[#108c79] disabled:bg-slate-300 text-white text-base font-semibold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              {isProcessingPayment ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Securing Your Booking...</span>
                </>
              ) : (
                <span>Pay ${grandTotal} Now</span>
              )}
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 4D: CONFIRMATION - YOUR TRIP IS BOOKED & BILL       */}
        {/* ======================================================== */}
        {currentStep === 4 && step4Substep === 'confirmed' && (
          <div className="animate-in fade-in zoom-in-95 duration-400">
            {/* Top Success Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f0f9f6] text-[#139c70] flex items-center justify-center mx-auto mb-4 shadow-sm border border-[#139c70]/20">
                <Check className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-2">
                Your Trip is Booked
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm font-light">
                Official booking bill & confirmation sent to{' '}
                <span className="font-semibold text-slate-800">{guestForm.email}</span>
              </p>
            </div>

            {/* 2-Column Responsive Layout: Generated Bill on Left, QR Code Scanner on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Booking ID, Generated Bill, Itinerary, Provider Contact, Actions */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Booking ID Box */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-0.5">
                      BOOKING REFERENCE ID
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-wider font-mono">
                      FBX-2026-78429
                    </span>
                  </div>
                  <button
                    onClick={copyBookingId}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shadow-sm flex items-center gap-1.5 text-xs font-semibold"
                    title="Copy booking ID"
                    aria-label="Copy booking ID"
                  >
                    <Copy className="w-4 h-4 text-[#139c70]" />
                    <span className="hidden sm:inline">Copy</span>
                  </button>
                  {copiedBookingId && (
                    <span className="text-[11px] text-[#139c70] font-bold absolute -bottom-5 left-5">
                      Copied to clipboard!
                    </span>
                  )}
                </div>

                {/* Generated Bill & Tax Invoice Receipt */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#f0f9f6] text-[#139c70] flex items-center justify-center shrink-0">
                        <Receipt className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#139c70] block">
                          GENERATED BILL & TAX INVOICE
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Invoice #INV-2026-78429</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                      Paid in Full
                    </span>
                  </div>

                  {/* Line items breakdown */}
                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 mb-4 font-light pb-4 border-b border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-800 font-medium">{activityTitle} ({numGuests} guests)</span>
                      <span className="font-semibold text-slate-900">${activityTotal}</span>
                    </div>

                    {selectedStay && (
                      <div className="flex justify-between">
                        <span>{selectedStay.name} ({numNights} nights)</span>
                        <span className="font-semibold text-slate-800">${stayTotal}</span>
                      </div>
                    )}

                    {selectedFlight && (
                      <div className="flex justify-between">
                        <span>{selectedFlight.airline} — Round Trip</span>
                        <span className="font-semibold text-slate-800">${flightTotal}</span>
                      </div>
                    )}

                    {selectedInsurance && (
                      <div className="flex justify-between">
                        <span>{selectedInsurance.name}</span>
                        <span className="font-semibold text-slate-800">${insuranceTotal}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-500 pt-2 border-t border-dashed border-slate-100">
                      <span>Taxes & platform regulatory fees</span>
                      <span className="font-medium text-slate-700">${taxesAndFees + platformFee}</span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Promo Code Discount (FABXP)</span>
                        <span>-${appliedDiscount}</span>
                      </div>
                    )}
                  </div>

                  {/* Billed Total */}
                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                        TOTAL AMOUNT BILLED
                      </span>
                      <span className="text-xs text-slate-500">
                        Paid via {paymentMethod === 'card' ? 'Credit / Debit Card' : paymentMethod.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-3xl font-extrabold text-[#149d88]">
                      ${grandTotal}
                    </span>
                  </div>
                </div>

                {/* Confirmed Trip Itinerary Summary */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#139c70] block mb-4">
                    CONFIRMED TRIP ITINERARY
                  </span>

                  <div className="space-y-4">
                    {/* Activity */}
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#f0f9f6] text-[#139c70] flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {activityTitle}
                        </h4>
                        <p className="text-xs text-slate-500 font-light">
                          Himalayan Wings Co. • 12 May, 6:00 AM
                        </p>
                        <p className="text-xs text-slate-400 font-light">
                          Solang Valley Paragliding Base, Manali
                        </p>
                      </div>
                    </div>

                    {/* Stay */}
                    {selectedStay && (
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#f0f9f6] text-[#139c70] flex items-center justify-center shrink-0 mt-0.5">
                          <Building className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {selectedStay.name}
                          </h4>
                          <p className="text-xs text-slate-500 font-light">
                            12–14 May • {numNights} nights
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Flight */}
                    {selectedFlight && (
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#f0f9f6] text-[#139c70] flex items-center justify-center shrink-0 mt-0.5">
                          <Plane className="w-4 h-4 transform -rotate-45" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {selectedFlight.airline} — Round Trip
                          </h4>
                          <p className="text-xs text-slate-500 font-light">
                            12 May • Departure 06:15 • {numGuests} passengers
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Insurance */}
                    {selectedInsurance && (
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#f0f9f6] text-[#139c70] flex items-center justify-center shrink-0 mt-0.5">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {selectedInsurance.name}
                          </h4>
                          <p className="text-xs text-slate-500 font-light">
                            Medical, cancellation & baggage coverage
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Provider Contact Box */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f0f9f6] text-[#139c70] font-bold text-sm flex items-center justify-center shrink-0">
                    HW
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#139c70] block">
                      LOCAL PROVIDER CONTACT
                    </span>
                    <h5 className="font-bold text-slate-900 text-sm">
                      Himalayan Wings Co.
                    </h5>
                    <p className="text-xs text-slate-500 font-light">
                      +91 98765 43210 • info@himalayanwings.com
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    onClick={() => setShowDownloadModal(true)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white border border-[#139c70] text-[#139c70] hover:bg-[#139c70]/5 text-sm font-semibold rounded-full shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Itinerary & Voucher</span>
                  </button>

                  <button
                    onClick={() => router.push('/experiences')}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#149d88] hover:bg-[#108c79] text-white text-sm font-semibold rounded-full shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Explore More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: QR Code Scanner at the Generated Bill */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
                <BillQrScanner
                  bookingId="FBX-2026-78429"
                  guestName={`${guestForm.firstName} ${guestForm.lastName}`}
                  email={guestForm.email}
                  activityTitle={activityTitle}
                  grandTotal={grandTotal}
                  selectedStay={selectedStay?.name}
                  selectedFlight={selectedFlight?.airline}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Itinerary Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <FabxpLogo size="sm" className="mb-2" />
              <h3 className="text-xl font-bold text-slate-900 mt-3">
                Booking Voucher & Itinerary
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Booking Reference: <span className="font-bold text-slate-800 font-mono">FBX-2026-78429</span>
              </p>
            </div>

            {/* Embedded QR Pass Code in Voucher */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 rounded-2xl p-4 mb-5 border border-slate-100">
              {voucherQrUrl ? (
                <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200 shrink-0">
                  <img src={voucherQrUrl} alt="Voucher QR Code" className="w-24 h-24 object-contain" />
                </div>
              ) : null}
              <div className="text-left text-xs">
                <div className="flex items-center gap-1.5 text-[#139c70] font-bold text-[11px] uppercase tracking-wider mb-1">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Scan to Verify Pass</span>
                </div>
                <p className="font-semibold text-slate-800 text-sm">Official Digital E-Ticket</p>
                <p className="text-slate-500 text-[11px] font-light mt-0.5">
                  Present this QR code at Himalayan Wings Co. or hotel front desk for instant contactless check-in.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 text-xs space-y-2 mb-6 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Guest:</span>
                <span className="font-semibold">{guestForm.firstName} {guestForm.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact:</span>
                <span className="font-semibold">{guestForm.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Experience:</span>
                <span className="font-semibold">{activityTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Status:</span>
                <span className="font-bold text-[#139c70]">Confirmed & Paid (${grandTotal})</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 bg-[#149d88] hover:bg-[#108c79] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Print or Save PDF</span>
              </button>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
