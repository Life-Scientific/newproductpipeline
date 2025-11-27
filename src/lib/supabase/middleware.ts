import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { WORKSPACE_BASE, isLegacyRoute, toLegacyRedirect } from "@/lib/routes";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

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
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getSession(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  //
  // NOTE: We use getSession() instead of getUser() here because:
  // - getSession() reads from the local JWT cookie (no network request)
  // - getUser() ALWAYS makes a network request to verify the token
  // - Middleware runs on EVERY request - using getUser() causes 3x+ auth requests
  // - The session refresh is handled by the @supabase/ssr package automatically
  //
  // For actual user verification in sensitive operations, use getUser() in those
  // specific server actions, not in middleware that runs on every request.

  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  const user = session?.user ?? null;

  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isAcceptInvite = pathname.startsWith("/accept-invite");
  const isAuthCallback = pathname.startsWith("/auth/callback");
  const isLandingPage = pathname === "/";
  const isApiRoute = pathname.startsWith("/api");
  const isWorkspaceRoute = pathname.startsWith(WORKSPACE_BASE);
  const isPublicPath = isAuthPage || isAcceptInvite || isAuthCallback || isLandingPage || isApiRoute;

  // Check if this is a legacy route that needs redirecting
  const legacyRoute = isLegacyRoute(pathname);
  
  // Redirect legacy routes to workspace (preserving the rest of the path)
  if (legacyRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = toLegacyRedirect(pathname);
    return NextResponse.redirect(url);
  }

  // If no user and trying to access protected workspace route, redirect to login
  if (!user && (isWorkspaceRoute || legacyRoute)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If user is logged in and on auth pages or landing page, redirect to workspace home
  if (user && (isAuthPage || isLandingPage)) {
    const url = request.nextUrl.clone();
    url.pathname = WORKSPACE_BASE;
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely.

  return supabaseResponse;
}

