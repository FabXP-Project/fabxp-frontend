import { NextRequest, NextResponse } from 'next/server';

// POST /api/auth/signup — handle user registration (server-side)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // In a real app: create user in database, hash password, send verification email
    // Mock response for demonstration
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: 'usr_' + Math.random().toString(36).substring(7),
          name: name || 'Traveler',
          email,
        },
        message: 'Account created successfully!',
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
