import { NextRequest, NextResponse } from 'next/server';

// POST /api/booking — handle booking submission (server-side)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { experienceId, guestDetails, paymentMethod } = body;

    // Server-side validation
    if (!experienceId || !guestDetails) {
      return NextResponse.json(
        { success: false, error: 'Missing required booking fields' },
        { status: 400 }
      );
    }

    if (!guestDetails.firstName || !guestDetails.lastName || !guestDetails.email) {
      return NextResponse.json(
        { success: false, error: 'Guest details incomplete' },
        { status: 400 }
      );
    }

    // In a real app: save to database, process payment, send confirmation email
    // This is a mock response for demonstration
    const bookingId = `FBX-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    return NextResponse.json({
      success: true,
      data: {
        bookingId,
        status: 'CONFIRMED',
        guest: `${guestDetails.firstName} ${guestDetails.lastName}`,
        email: guestDetails.email,
        experienceId,
        paymentMethod: paymentMethod || 'card',
        confirmedAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
