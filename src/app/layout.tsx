import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fabxp — Live Your Experience',
  description:
    'Curated travel experiences, boutique stays, flights, and customized journeys designed to be felt, not rushed.',
  openGraph: {
    title: 'Fabxp — Live Your Experience',
    description:
      'Curated travel experiences, boutique stays, flights, and customized journeys designed to be felt, not rushed.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#139c70',
          colorText: '#0f172a',
          fontFamily: 'inherit',
        },
        elements: {
          card: "shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100",
          headerTitle: "text-2xl font-bold text-slate-900 font-sans tracking-tight",
          headerSubtitle: "text-slate-500 text-sm",
          formButtonPrimary: "bg-[#139c70] hover:bg-[#0f855e] text-white shadow-sm rounded-xl py-2.5 transition-all active:scale-[0.98]",
          footerActionLink: "text-[#139c70] hover:text-[#0f855e] font-medium transition-colors",
          identityPreviewEditButtonIcon: "text-[#139c70]",
          formFieldInput: "rounded-xl border-slate-200 focus:border-[#139c70] focus:ring-[#139c70]/20 py-2.5",
          formFieldLabel: "text-slate-700 font-medium",
          dividerLine: "bg-slate-200",
          dividerText: "text-slate-400 font-medium",
          socialButtonsBlockButton: "rounded-xl border-slate-200 hover:bg-slate-50 transition-colors",
        }
      }}
    >
      <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`}>
        <body className="bg-white text-slate-900 antialiased selection:bg-[#00b5b8]/20 selection:text-[#008c90]">
          <div className="min-h-screen flex flex-col font-sans selection:bg-[#139c70]/20 selection:text-[#108c79]">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
