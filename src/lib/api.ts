import { 
  EXPERIENCES, 
  TRENDING_EXPERIENCES, 
  TOP_DESTINATIONS_LANDING,
  Experience,
  TrendingExperience,
  TopDestination
} from '@/data/travelData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getExperiences(): Promise<Experience[]> {
  // await delay(100);
  return EXPERIENCES;
}

export async function getTrendingExperiences(): Promise<TrendingExperience[]> {
  // await delay(100);
  return TRENDING_EXPERIENCES;
}

export async function getTopDestinations(): Promise<TopDestination[]> {
  // await delay(100);
  return TOP_DESTINATIONS_LANDING;
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  // await delay(100);
  return EXPERIENCES.find(e => e.id === id) || null;
}
