export interface TrendingExperience {
  id: string;
  title: string;
  location: string;
  rating: number;
  price: number;
  image: string;
}

export interface TopDestination {
  id: string;
  city: string;
  country: string;
  image: string;
}

export const TRENDING_EXPERIENCES: TrendingExperience[] = [
  {
    id: 'kayaking-phuket',
    title: 'Kayaking in Crystal Waters',
    location: 'Phuket, Thailand',
    rating: 4.9,
    price: 89,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pasta-masterclass',
    title: 'Italian Pasta Masterclass',
    location: 'Florence, Italy',
    rating: 4.8,
    price: 65,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'temple-expedition',
    title: 'Ancient Temple Expedition',
    location: 'Siem Reap, Cambodia',
    rating: 4.7,
    price: 45,
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'overwater-villa',
    title: 'Luxury Overwater Villa',
    location: 'Maldives',
    rating: 5.0,
    price: 320,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
  },
];

export const TOP_DESTINATIONS_LANDING: TopDestination[] = [
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'provence',
    city: 'Provence',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bavaria',
    city: 'Bavaria',
    country: 'Germany',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cinque-terre',
    city: 'Cinque Terre',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
  },
];

export const NEW_TESTIMONIALS = [
  {
    id: '1',
    quote: 'Fabxp made planning my trip to Italy effortless. The AI search found exactly what I was looking for!',
    name: 'Sarah M.',
    location: 'New York, USA',
    initials: 'SM',
    stars: 5,
  },
  {
    id: '2',
    quote: 'An incredible platform! The curated experiences in Thailand were the highlight of my year.',
    name: 'Akira T.',
    location: 'Tokyo, Japan',
    initials: 'AT',
    stars: 5,
  },
  {
    id: '3',
    quote: 'I love how easy it is to combine flights, hotels, and experiences all in one place. Truly premium.',
    name: 'Elena R.',
    location: 'Berlin, Germany',
    initials: 'ER',
    stars: 5,
  },
];

export interface Experience {
  id: string;
  title: string;
  location: string;
  category: 'Guided Tours' | 'Wine Tasting' | 'Adventure' | 'Water Sports';
  rating: number;
  reviewsCount: string;
  duration: string;
  durationCategory: 'under_2h' | '2_5h' | 'full_day';
  price: number;
  image: string;
  isEditorsPick?: boolean;
  description?: string;
}

export interface Stay {
  id: string;
  name: string;
  distance: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  image: string;
  recommended?: boolean;
}

export interface Flight {
  id: string;
  airline: string;
  timeRange: string;
  duration: string;
  stops: string;
  price: number;
  type: string;
}

export interface InsurancePlan {
  id: string;
  name: string;
  pricePerPerson: number;
  medicalCover: string;
  baggageCover: string;
  cancellation: string;
  recommended?: boolean;
  features: string[];
}

export interface JourneyPackage {
  id: string;
  title: string;
  duration: string;
  price: number;
  image: string;
  tag: string;
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'eiffel-tower',
    title: 'Eiffel Tower Skip-the-Line Guided Tour',
    location: 'Paris, France',
    category: 'Guided Tours',
    rating: 4.9,
    reviewsCount: '2.4k',
    duration: '2.5 Hours',
    durationCategory: '2_5h',
    price: 65,
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80',
    isEditorsPick: true,
    description: 'Bypass long visitor lines and explore the Eiffel Tower summits with an expert local historian.',
  },
  {
    id: 'chianti-wine',
    title: 'Luxury Wine Tasting & Dinner in Chianti',
    location: 'Tuscany, Italy',
    category: 'Wine Tasting',
    rating: 4.8,
    reviewsCount: '1.8k',
    duration: '5 Hours',
    durationCategory: '2_5h',
    price: 120,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80',
    description: 'Stroll private Tuscan vineyards, sample award-winning vintages, and savor a four-course farmhouse feast.',
  },
  {
    id: 'desert-safari',
    title: 'Premium Desert Safari with BBQ Dinner',
    location: 'Dubai, UAE',
    category: 'Adventure',
    rating: 5.0,
    reviewsCount: '3.1k',
    duration: '7 Hours',
    durationCategory: 'full_day',
    price: 89,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    description: 'Dune bashing in high-spec 4x4s, falconry displays, camel trekking, and starlight barbecue.',
  },
  {
    id: 'santorini-cruise',
    title: 'Catamaran Sunset Cruise with Buffet',
    location: 'Santorini, Greece',
    category: 'Water Sports',
    rating: 4.7,
    reviewsCount: '920',
    duration: '4 Hours',
    durationCategory: '2_5h',
    price: 145,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    description: 'Sail the volcanic caldera, swim in warm thermal springs, and view world-famous Oia sunsets with Greek delicacies.',
  },
  {
    id: 'manali-paragliding',
    title: 'Sunrise Paragliding Over Manali Valley',
    location: 'Solang Valley, India',
    category: 'Adventure',
    rating: 4.9,
    reviewsCount: '1.4k',
    duration: '3 Hours',
    durationCategory: '2_5h',
    price: 89,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    isEditorsPick: true,
    description: 'Take flight over snow-capped Himalayan peaks and pine forests with certified master tandem pilots.',
  },
  {
    id: 'kyoto-tea',
    title: 'Traditional Bamboo Forest & Tea Ceremony',
    location: 'Kyoto, Japan',
    category: 'Guided Tours',
    rating: 4.9,
    reviewsCount: '880',
    duration: '3.5 Hours',
    durationCategory: '2_5h',
    price: 95,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    description: 'Early morning quiet path through Arashiyama bamboo grove followed by authentic Uji matcha ceremony.',
  },
  {
    id: 'swiss-alps-heli',
    title: 'Glacier Helicopter Tour & Alpine Landing',
    location: 'Interlaken, Switzerland',
    category: 'Adventure',
    rating: 5.0,
    reviewsCount: '540',
    duration: '1.5 Hours',
    durationCategory: 'under_2h',
    price: 290,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    description: 'Panoramic mountain flight directly over the Eiger, Mönch, and Jungfrau with landing on perpetual ice.',
  },
  {
    id: 'bali-diving',
    title: 'Coral Reef Snorkeling & Manta Ray Safari',
    location: 'Nusa Penida, Indonesia',
    category: 'Water Sports',
    rating: 4.8,
    reviewsCount: '1.1k',
    duration: '6 Hours',
    durationCategory: 'full_day',
    price: 75,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    description: 'Guided marine safari encountering giant manta rays and swimming through pristine coral reef gardens.',
  }
];

export const STAYS: Stay[] = [
  {
    id: 'riverside-boutique',
    name: 'The Riverside Boutique',
    distance: '0.5 miles from experience',
    pricePerNight: 240,
    rating: 4.8,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    recommended: true,
  },
  {
    id: 'sunset-heritage',
    name: 'Sunset Heritage Inn',
    distance: '1.2 miles from experience',
    pricePerNight: 185,
    rating: 4.5,
    reviewsCount: 85,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'vista-valley',
    name: 'Vista Valley Resort',
    distance: '2.1 miles from experience',
    pricePerNight: 320,
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'urban-loft',
    name: 'Urban Loft Suites',
    distance: '0.2 miles from experience',
    pricePerNight: 155,
    rating: 4.3,
    reviewsCount: 56,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
  },
];

export const FLIGHTS: Flight[] = [
  {
    id: 'emirates',
    airline: 'Emirates',
    timeRange: '10:00 AM - 6:30 PM (8h 30m)',
    duration: '8h 30m',
    stops: 'NON-STOP',
    type: 'ROUND TRIP',
    price: 450,
  },
  {
    id: 'qatar-airways',
    airline: 'Qatar Airways',
    timeRange: '09:15 AM - 8:45 PM (11h 30m)',
    duration: '11h 30m',
    stops: '1 STOP (DOH)',
    type: 'ROUND TRIP',
    price: 380,
  },
  {
    id: 'british-airways',
    airline: 'British Airways',
    timeRange: '11:30 AM - 9:00 PM (9h 30m)',
    duration: '9h 30m',
    stops: 'NON-STOP',
    type: 'ROUND TRIP',
    price: 510,
  },
];

export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    id: 'basic',
    name: 'Basic Cover',
    pricePerPerson: 15,
    medicalCover: 'Up to $10,000',
    baggageCover: 'Up to $500',
    cancellation: 'Not covered',
    features: [
      'Emergency medical',
      '24/7 helpline',
      'Baggage delay cover',
    ],
  },
  {
    id: 'standard',
    name: 'Standard Cover',
    pricePerPerson: 35,
    medicalCover: 'Up to $50,000',
    baggageCover: 'Up to $1,500',
    cancellation: 'Up to $2,000',
    recommended: true,
    features: [
      'Emergency medical',
      'Trip cancellation',
      'Baggage loss',
      'Flight delay',
      '24/7 helpline',
    ],
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive Cover',
    pricePerPerson: 65,
    medicalCover: 'Up to $200,000',
    baggageCover: 'Up to $3,000',
    cancellation: 'Up to $5,000',
    features: [
      'Full medical cover',
      'Trip cancellation',
      'Baggage loss & delay',
      'Flight delay',
      'Adventure sports',
      '24/7 concierge',
      'Legal assistance',
    ],
  },
];

export const JOURNEY_PACKAGES: JourneyPackage[] = [
  {
    id: 'morocco-desert',
    title: 'Morocco Desert Journey',
    duration: '8 DAYS / 7 NIGHTS',
    price: 1600,
    tag: 'Desert Expedition',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'italy-classic',
    title: 'Italy Classic',
    duration: '7 DAYS / 6 NIGHTS',
    price: 1400,
    tag: 'Cultural Heritage',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'africa-experience',
    title: 'Africa Experience',
    duration: '8 DAYS / 7 NIGHTS',
    price: 2200,
    tag: 'Wildlife Safari',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'japan-spring',
    title: 'Japan Spring',
    duration: '7 DAYS / 6 NIGHTS',
    price: 1200,
    tag: 'Cherry Blossom Season',
    image: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80',
  },
];

export const DIVERSE_WORLDS = [
  {
    title: 'Travel to the Future',
    description: 'A city of luxury and innovation, where tomorrow comes alive.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Travel Into Nature',
    description: 'Stunning landscapes and pure alpine beauty of nature.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Travel Through Culture',
    description: 'A blend of traditions, colors, heritage and spices.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Travel Back in Time',
    description: 'Explore ancient wonders, monuments & stories in stone.',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80',
  },
];

export const POPULAR_DESTINATIONS = [
  {
    name: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    subtitle: 'Discover more',
  },
  {
    name: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    subtitle: 'Discover more',
  },
  {
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    subtitle: 'Discover more',
  },
  {
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    subtitle: 'Discover more',
  },
];

export const WHY_US_FEATURES = [
  {
    title: 'Authentic Experiences',
    description: 'Trips tailored to your style and budget.',
    icon: 'compass',
  },
  {
    title: 'Culinary Adventures',
    description: 'Savor local cuisines with guided food tours.',
    icon: 'utensils',
  },
  {
    title: 'Trusted Partnerships',
    description: 'Handpicked hotels, guides, and local experiences.',
    icon: 'shield',
  },
  {
    title: 'Cultural Immersion',
    description: 'Engage with local traditions and communities.',
    icon: 'globe',
  },
];

export const TESTIMONIALS = [
  {
    quote: 'Traveling with this team completely changed how I see group travel. Everything was thoughtfully planned.',
    author: 'Emily Carter',
    role: 'Solo Traveler',
  },
  {
    quote: 'An incredible platform. The curated experiences in Thailand were the highlight of my year.',
    author: 'Akira T.',
    role: 'Tokyo, Japan',
  },
  {
    quote: 'I love how easy it is to combine flights, hotels, and experiences all in one place. Truly premium.',
    author: 'Elena R.',
    role: 'Berlin, Germany',
  },
];

export const BLOG_POSTS = [
  {
    title: 'Discovering Island Life Beyond Luxury',
    date: '25 FEB 2026',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Experiencing Europe Beyond Tourist Routes',
    date: '10 MAR 2026',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
  },
];

export const FAQS = [
  {
    question: 'What type of trips do you offer?',
    answer: 'From curated cultural escapes to adventurous expeditions, we craft journeys for every style with boutique stays, private local guides, and seamless transport.',
  },
  {
    question: 'Do you handle flights and visas?',
    answer: 'Yes! During trip planning you can opt for curated flights with leading airlines, and our support team provides complete visa documentation guidelines for your destinations.',
  },
  {
    question: 'How do I book a trip?',
    answer: 'Simply choose an experience or curated package, customize your preferred stay and flights in our step-by-step trip planner, enter guest details, and secure your booking with instant confirmation.',
  },
  {
    question: 'What payment options are available?',
    answer: 'We support all major Credit/Debit cards, UPI, Net Banking, digital wallets, and flexible split-payment options with 256-bit PCI DSS bank-grade encryption.',
  },
  {
    question: 'Are your trips suitable for solo travelers?',
    answer: 'Absolutely! More than 40% of our travelers join solo. We provide private room options, certified local guides, and vetted companion itineraries for peace of mind.',
  },
  {
    question: 'Is travel insurance mandatory?',
    answer: 'While not strictly mandatory in all jurisdictions, we strongly recommend our comprehensive trip protection which covers emergency medical, flight delays, and unexpected cancellation.',
  },
];

export const VIBE_GALLERY = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
];
