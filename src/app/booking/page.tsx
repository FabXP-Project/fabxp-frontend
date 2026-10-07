import { BookingFunnel } from '@/components/BookingFunnel';
import { EXPERIENCES, TRENDING_EXPERIENCES, TOP_DESTINATIONS_LANDING, Experience } from '@/data/travelData';

export default async function BookingRoute({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const type = resolvedParams.type as string;
  const expId = resolvedParams.expId as string;
  const destId = resolvedParams.destId as string;
  const cat = resolvedParams.cat as string;
  
  let experience: Experience | null = null;
  
  if (type === 'exp' && expId) {
    experience = EXPERIENCES.find(e => e.id === expId) || null;
  } else if (type === 'trending' && expId) {
    const trending = TRENDING_EXPERIENCES.find(t => t.id === expId);
    if (trending) {
      experience = {
        id: trending.id,
        title: trending.title,
        location: trending.location,
        category: 'Adventure',
        rating: trending.rating,
        reviewsCount: '1.2k',
        duration: '4 Hours',
        durationCategory: '2_5h',
        price: trending.price,
        image: trending.image,
      };
    }
  } else if (type === 'dest' && destId) {
    const dest = TOP_DESTINATIONS_LANDING.find(d => d.id === destId);
    if (dest) {
      experience = {
        id: `dest-${dest.id}`,
        title: `Best of ${dest.city} Guided Exploration`,
        location: `${dest.city}, ${dest.country}`,
        category: 'Guided Tours',
        rating: 4.9,
        reviewsCount: '1.8k',
        duration: '5 Hours',
        durationCategory: '2_5h',
        price: 110,
        image: dest.image,
      };
    }
  } else if (type === 'search') {
    const dest = resolvedParams.dest as string;
    const exp = resolvedParams.exp as string;
    experience = {
      id: 'search-custom',
      title: `${exp || 'Curated Tour'} in ${dest || 'Top Destination'}`,
      location: dest || 'Worldwide',
      category: 'Guided Tours',
      rating: 4.9,
      reviewsCount: '2.5k',
      duration: 'Full Day',
      durationCategory: 'full_day',
      price: 95,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    };
  } else if (type === 'category') {
      experience = {
        id: 'category-custom',
        title: `Premium ${cat || 'Travel'} Package`,
        location: 'Worldwide',
        category: 'Guided Tours',
        rating: 4.8,
        reviewsCount: '3.1k',
        duration: 'Multiple Days',
        durationCategory: 'full_day',
        price: 499,
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
      };
  }

  return (
    <div className="absolute inset-0 z-50 bg-[#f8fafc] overflow-y-auto">
      <BookingFunnel initialExperience={experience} />
    </div>
  );
}
