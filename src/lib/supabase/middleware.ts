import {
  ADMIN_PAGE_ROUTE,
  DONOR_PAGE_ROUTE,
  FIGHTER_PAGE_ROUTE,
  FORGOT_PASSWORD_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  VOLUNTEER_PAGE_ROUTE,
} from "@/utils/routes";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  ADMIN_PAGE_ROUTE,
  FIGHTER_PAGE_ROUTE,
  VOLUNTEER_PAGE_ROUTE,
  DONOR_PAGE_ROUTE,
];
const authRoutes = [SIGN_IN_PATH, SIGN_UP_PATH, FORGOT_PASSWORD_PATH, "/"];

export const createClient = async (request: NextRequest) => {
  try {
    let supabaseResponse = NextResponse.next({
      request: {
        headers: request.headers,
      },
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
            cookiesToSet.forEach(({ name, value }) =>
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

    const user = await supabase.auth.getUser();
    console.log("mid user", user);
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) =>
      path.startsWith(route)
    );
    const isAuthRoute = authRoutes.includes(path);

    if (isProtectedRoute && user.error) {
      return NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
    }

    if (isAuthRoute && !user.error) {
      // Write logic to redirect based on role here
      return NextResponse.redirect(new URL(ADMIN_PAGE_ROUTE, request.url));
    }
    return supabaseResponse;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    console.error(e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
