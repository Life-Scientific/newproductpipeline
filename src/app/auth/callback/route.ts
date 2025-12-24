import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { WORKSPACE_BASE } from "@/lib/routes";

// Allowed email domains for SSO login
const ALLOWED_DOMAINS = ["lifescientific.com"];

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? WORKSPACE_BASE;

  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = WORKSPACE_BASE;
  }

  if (code) {
    const supabase = await createClient();
    const { data, error: supabaseError } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Verify the user's email domain is allowed
      const userEmail = data.user.email?.toLowerCase() || "";
      const emailDomain = userEmail.split("@")[1];

      if (!emailDomain || !ALLOWED_DOMAINS.includes(emailDomain)) {
        // Sign out the user - they're not from an allowed domain
        await supabase.auth.signOut();
        return NextResponse.redirect(
          `${origin}/login?error=unauthorized_domain`,
        );
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
