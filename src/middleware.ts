import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login'

  const authToken = request.cookies.get('auth_token')?.value

  if (!isPublicPath && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isPublicPath && authToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login']
} 