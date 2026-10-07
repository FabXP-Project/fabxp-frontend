import { NewHeroSection } from '@/components/NewHeroSection';
import { QuickCategoryBar } from '@/components/QuickCategoryBar';
import { TrendingExperiencesSection } from '@/components/TrendingExperiencesSection';
import { TopDestinationsSection } from '@/components/TopDestinationsSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { NewTestimonialsSection } from '@/components/NewTestimonialsSection';
import { NewsletterSection } from '@/components/NewsletterSection';

export default function Home() {
  return (
    <>
      <NewHeroSection />
      <QuickCategoryBar />
      <TrendingExperiencesSection />
      <TopDestinationsSection />
      <HowItWorksSection />
      <NewTestimonialsSection />
      <NewsletterSection />
    </>
  );
}
