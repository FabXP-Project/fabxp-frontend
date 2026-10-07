import { NextResponse } from 'next/server';

// GET /api/destinations — returns the top destinations
export async function GET() {
  const { TOP_DESTINATIONS_LANDING } = await import('@/data/travelData');

  return NextResponse.json({
    success: true,
    count: TOP_DESTINATIONS_LANDING.length,
    data: TOP_DESTINATIONS_LANDING,
  });
}
