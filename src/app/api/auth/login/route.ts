import { NextRequest, NextResponse } from 'next/server';

// POST /api/auth/login — handle login (server-side)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // In a real app: validate against database, create session/JWT token
    // Mock response for demonstration
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: 'usr_' + Math.random().toString(36).substring(7),
          email,
          name: 'Traveler',
        },
        token: 'mock_jwt_token_' + Date.now(),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
