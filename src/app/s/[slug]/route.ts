import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const supabase = await createClient();

  // Look up the short URL
  const { data: shortUrl, error } = await supabase
    .from("short_urls")
    .select("id, destination_url, is_public, created_by")
    .eq("slug", slug)
    .single();

  if (error || !shortUrl) {
    return new NextResponse("Short URL not found", { status: 404 });
  }

  // Check if URL is private and user is not authenticated
  if (!shortUrl.is_public) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return new NextResponse(
        "Unauthorized - this link requires authentication",
        {
          status: 401,
        },
      );
    }
  }

  // Log the click asynchronously (fire-and-forget to not delay redirect)
  // We use a separate try-catch to ensure logging errors don't break redirects
  try {
    const referrer = request.headers.get("referer") || null;
    const userAgent = request.headers.get("user-agent") || null;
    const country = request.headers.get("x-vercel-ip-country") || null;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Insert click record - fire and forget (wrapped in async IIFE)
    void (async () => {
      try {
        await supabase.from("short_url_clicks").insert({
          short_url_id: shortUrl.id,
          referrer,
          user_agent: userAgent,
          country,
          is_authenticated: !!session?.user,
        });
      } catch (err) {
        console.error("Failed to log click:", err);
      }
    })();
  } catch (logError) {
    // Don't let logging errors prevent the redirect
    console.error("Error preparing click log:", logError);
  }

  // Redirect to destination
  return NextResponse.redirect(shortUrl.destination_url, { status: 302 });
}
