import { NextResponse } from 'next/server';

export default function proxy(request) {
  const token = request.cookies.get('auth_token')?.value;
  const path = request.nextUrl.pathname;

  // Protect all root public routes except the login, register, and api routes
  const isPublicFile = path.startsWith('/_next') || path.startsWith('/images') || path.startsWith('/api') || path.match(/\.(png|jpg|jpeg|svg|css|js|ico)$/);
  
  if (isPublicFile) {
    return NextResponse.next();
  }

  // Paths that DO NOT require authentication
  const isAuthPath = path === '/login' || path === '/register' || path === '/admin/login';
  
  if (!token && !isAuthPath) {
    // Force user to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isAuthPath) {
    // If logged in, don't show login/register page
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Admin protection
  if (path.startsWith('/admin') && path !== '/admin/login') {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    // We could decode JWT here to strictly verify 'role === Admin', 
    // but the API routes themselves already verify it.
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
