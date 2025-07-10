import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth_token');

    if (!authToken) {
      return NextResponse.json({ 
        authenticated: false,
        message: 'No authentication token found' 
      }, { status: 401 });
    }

    // In a real app, you would verify the token with your authentication service
    // For this example, we'll just check if it exists
    return NextResponse.json({ 
      authenticated: true,
      message: 'Authentication valid' 
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ 
      authenticated: false,
      message: 'Authentication check failed' 
    }, { status: 500 });
  }
} 