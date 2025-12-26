import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Middleware to protect routes based on user role
 * Runs on Edge runtime for fast response times
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
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request,
                    });
                },
            },
        }
    );

    // Get user (authenticates with Auth server, not just cookies)
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Protected routes that require authentication
    const isProtectedRoute =
        pathname.startsWith('/restaurant') || pathname.startsWith('/food-court');

    // If accessing protected route without session, redirect to login
    if (isProtectedRoute && !user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // If user is authenticated and accessing a protected route, verify role
    if (isProtectedRoute && user) {
        // Fetch user profile to get role
        const { data: profile } = await supabase
            .from('user_profiles')
            .select('role')
            .eq('user_id', user.id)
            .single();

        // Restaurant route - require restaurant role
        if (pathname.startsWith('/restaurant') && profile?.role !== 'restaurant') {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }

        // Food court route - require food_court role
        if (pathname.startsWith('/food-court') && profile?.role !== 'food_court') {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
    }

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
