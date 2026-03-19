import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login", "/registro", "/trial-expired"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let supabaseResponse = NextResponse.next({ request });

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
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session token
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // --- Public routes: allow always ---
  if (PUBLIC_ROUTES.some((r) => pathname.startsWith(r)) || pathname === "/") {
    return supabaseResponse;
  }

  // --- Protected routes: require auth ---
  if (!user && pathname.startsWith("/dashboard")) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // --- Trial check for authenticated users ---
  if (user && pathname.startsWith("/dashboard")) {
    try {
      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("status, trial_ends_at")
        .eq("user_id", user.id)
        .single();

      if (subscription) {
        const isExpired =
          subscription.status === "expired" ||
          subscription.status === "suspended" ||
          (subscription.status === "trialing" &&
            new Date(subscription.trial_ends_at) < new Date());

        if (isExpired) {
          // Update status to expired if it was still trialing
          if (subscription.status === "trialing") {
            await supabase
              .from("subscriptions")
              .update({
                status: "expired",
                updated_at: new Date().toISOString(),
                delete_after_at: new Date(
                  Date.now() + 30 * 24 * 60 * 60 * 1000
                ).toISOString(),
              })
              .eq("user_id", user.id);
          }

          const expiredUrl = request.nextUrl.clone();
          expiredUrl.pathname = "/trial-expired";
          return NextResponse.redirect(expiredUrl);
        }
      }
      // If no subscription found, allow access (demo/mock mode)
    } catch {
      // If DB tables don't exist yet, allow access gracefully
    }
  }

  // --- Security: add headers ---
  supabaseResponse.headers.set("X-Frame-Options", "DENY");
  supabaseResponse.headers.set("X-Content-Type-Options", "nosniff");
  supabaseResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  supabaseResponse.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
