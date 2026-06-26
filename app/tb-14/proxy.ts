import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

// Define protected routes that require authentication
const protectedRoutes = [
  '/my',
  '/my/attendance',
  '/my/bets',
  '/my/deposit',
  '/my/message',
  '/my/money',
  '/my/point',
  '/my/withdrawal',
  '/casino',
  '/slot',
  '/sports',
  '/powerball',
  '/minigame',
  '/events'
]

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/account/login',
  '/account/register',
  '/customer',
  '/customer/connect',
  '/customer/faq',
  '/customer/grade',
  '/customer/guide',
  '/customer/notices',
  '/customer/qna',
  '/customer/rule'
]

// Define admin routes (if needed)
const adminRoutes = [
  '/admin'
]

/**
 * Check if user is authenticated by calling backend session endpoint
 */
async function checkAuthentication(request: NextRequest): Promise<boolean> {
  const sessionToken = request.cookies.get('session-token')?.value
  
  if (!sessionToken) {
    return false
  }

  try {
    const { jwtVerify } = await import('jose')
    const SESSION_SECRET = process.env.SESSION_SECRET || 'your-super-secret-key-change-in-production'
    const encodedKey = new TextEncoder().encode(SESSION_SECRET)
    
    const { payload } = await jwtVerify(sessionToken, encodedKey, { algorithms: ['HS256'] })
    
    return !!(payload && payload.userId)
  } catch (error) {
    // Invalid token or expired
    return false
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  )

  // Dynamically set CSP for development
  const isDevelopment = process.env.NODE_ENV === 'development'
  // Allow configuring which external frame sources are permitted (space-separated list)
  const allowedFrameSrc = process.env.NEXT_PUBLIC_ALLOWED_FRAME_SRC || 'https://dhpowerball.net'

  // Build a frame-src directive that includes localhost during development
  const frameSrcDirective = isDevelopment
    ? `frame-src 'self' ${allowedFrameSrc} localhost:*;`
    : `frame-src 'self' ${allowedFrameSrc};`

  const csp = isDevelopment
    ? "default-src 'self' localhost:*; script-src 'self' 'unsafe-inline' 'unsafe-eval' localhost:*; style-src 'self' 'unsafe-inline' localhost:*; img-src 'self' data: https: localhost:*; font-src 'self' data: localhost:*; connect-src 'self' https: localhost:*; media-src 'self'; object-src 'none'; " + frameSrcDirective + " frame-ancestors 'none';"
    : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self'; object-src 'none'; " + frameSrcDirective + " frame-ancestors 'none';"

  response.headers.set('Content-Security-Policy', csp)

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  // Check if the current path is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  )

  // Check if the current path is admin route
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Only check authentication for protected routes or when redirecting authenticated users
  // Skip auth check for public routes to avoid rate limiting and backend connection attempts
  let isAuthenticated = false
  
  // Only check auth for routes that actually need it
  // Skip auth check for public routes entirely to avoid unnecessary backend calls
  if (isProtectedRoute || isAdminRoute || pathname === '/account/login' || pathname === '/account/register') {
    // Only check auth for routes that need it
    // This will gracefully handle backend unavailability
    isAuthenticated = await checkAuthentication(request)
  }

  // Handle authentication logic
  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to login if trying to access protected route without authentication
    const loginUrl = new URL('/account/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAdminRoute && !isAuthenticated) {
    // Redirect to login for admin routes
    const loginUrl = new URL('/account/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && (pathname === '/account/login' || pathname === '/account/register')) {
    const redirectTo = request.nextUrl.searchParams.get('redirect') || '/my'
    return NextResponse.redirect(new URL(redirectTo, request.url))
  }

  // Rate limiting headers (basic implementation)
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  response.headers.set('X-RateLimit-Limit', '100')
  response.headers.set('X-RateLimit-Remaining', '99')
  response.headers.set('X-Client-IP', ip)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets|fonts|public).*)',
  ],
}

