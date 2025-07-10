import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Clear the auth token cookie
    const cookieStore = cookies();
    cookieStore.delete('auth_token');

    return NextResponse.json({ 
      success: true,
      message: 'Logout successful' 
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Logout failed' 
    }, { status: 500 });
  }
} 