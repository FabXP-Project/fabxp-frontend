import { ExperiencesPage } from '@/components/ExperiencesPage';
import { getExperiences } from '@/lib/api';

export default async function ExperiencesRoute() {
  const experiences = await getExperiences();
  return <ExperiencesPage initialExperiences={experiences} />;
}
