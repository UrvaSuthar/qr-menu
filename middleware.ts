import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Middleware to protect routes - authentication only
 * Role checking is done client-side to avoid cookie race conditions
 */
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Create a response that we can modify
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // Create Supabase client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Refresh session if needed
    const { data: { user } } = await supabase.auth.getUser();

    // Protected routes that require authentication
    const isProtectedRoute =
        pathname.startsWith('/restaurant') || pathname.startsWith('/food-court');

    // If accessing protected route without auth, redirect to login
    if (isProtectedRoute && !user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Allow access - role checking is done in the page itself
    return response;
}

/**
 * Configure which routes this middleware runs on
 */
export const config = {
    matcher: [
        '/restaurant/:path*',
        '/food-court/:path*',
    ],
};

