import { NextResponse } from 'next/server';

// GET /api/experiences — returns the full list of experiences
export async function GET() {
  // In a real app, this would fetch from a database or external API.
  // For now, we import from the data module (runs server-side only).
  const { EXPERIENCES } = await import('@/data/travelData');

  return NextResponse.json({
    success: true,
    count: EXPERIENCES.length,
    data: EXPERIENCES,
  });
}
