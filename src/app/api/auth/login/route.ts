import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (email === 'admin@onclickdrive.com' && password === 'admin123') {
      const cookieStore = cookies();
      
      const expiresIn = 24 * 60 * 60 * 1000; 
      const expiry = new Date(Date.now() + expiresIn);
      
      cookieStore.set({
        name: 'auth_token',
        value: 'authenticated_user_token',
        expires: expiry,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      return NextResponse.json({ 
        success: true,
        message: 'Login successful' 
      });
    } else {
      return NextResponse.json({ 
        success: false,
        message: 'Invalid email or password' 
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Login failed' 
    }, { status: 500 });
  }
} 