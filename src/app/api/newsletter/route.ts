import { NextRequest, NextResponse } from 'next/server';

// POST /api/newsletter — handle newsletter subscription (server-side)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // In a real app: save to newsletter service (Mailchimp, SendGrid, etc.)
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to the newsletter!',
      email,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
