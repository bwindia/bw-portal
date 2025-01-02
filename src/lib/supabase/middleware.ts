import {
  ADMIN_PAGE_ROUTE,
  DONOR_PAGE_ROUTE,
  FIGHTER_PAGE_ROUTE,
  SIGN_IN_PATH,
  VERIFY_OTP_PATH,
  VOLUNTEER_PAGE_ROUTE,
} from "@/utils/routes";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// Define role hierarchies and their corresponding routes
const roleHierarchy = {
  admin: ['super admin', 'admin', 'volunteer admin'],
  volunteer: ['volunteer'],
  fighter: ['patient'],
  donor: ['guest', 'emergency donor', 'bridge donor']
};

const roleRoutes = {
  admin: ADMIN_PAGE_ROUTE,
  volunteer: VOLUNTEER_PAGE_ROUTE,
  fighter: FIGHTER_PAGE_ROUTE,
  donor: DONOR_PAGE_ROUTE,
};

// Add this type at the top with the other type definitions
type AccessLevel = keyof typeof roleRoutes;

// Helper function to determine access level
const determineAccessLevel = (userRoles: string[]): AccessLevel | null => {
  const normalizedUserRoles = userRoles.map(role => role.toLowerCase());

  // Check roles in order of priority
  if (normalizedUserRoles.some(role => roleHierarchy.admin.includes(role))) {
    return 'admin';
  }
  if (normalizedUserRoles.some(role => roleHierarchy.volunteer.includes(role))) {
    return 'volunteer';
  }
  if (normalizedUserRoles.some(role => roleHierarchy.fighter.includes(role))) {
    return 'fighter';
  }
  if (normalizedUserRoles.some(role => roleHierarchy.donor.includes(role))) {
    return 'donor';
  }
  return 'donor';
};

const protectedRoutes = Object.values(roleRoutes);
const authRoutes = [SIGN_IN_PATH, VERIFY_OTP_PATH, "/"];

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

    const { data: { user } } = await supabase.auth.getUser();
    const path = request.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.some((route) =>
      path.startsWith(route + "/")
    );
    if (isProtectedRoute && !user) {
      return NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
    }
    const isAuthRoute = authRoutes.includes(path);
    if (isAuthRoute && user) {
      const { data: userData } = await supabase
        .from("user_data")
        .select("roles:mapping_user_role!fk_user_id(...master_user_role(role))")
        .eq("mapping_user_role.role_status", true)
        .eq("mobile", user.phone)
        .single();

      const userRoles = userData?.roles?.map((r: any) => r.role) || [];
      const accessLevel = determineAccessLevel(userRoles);
      
      if (accessLevel) {
        return NextResponse.redirect(new URL(roleRoutes[accessLevel], request.url));
      }
    }

    // Modify the protected route access check
    if (user && isProtectedRoute) {
      const { data: userData } = await supabase
        .from("user_data")
        .select("roles:mapping_user_role!fk_user_id(...master_user_role(role))")
        .eq("mapping_user_role.role_status", true)
        .eq("mobile", user.phone)
        .single();

      const userRoles = userData?.roles?.map((r: any) => r.role) || [];
      console.log(userRoles);
      const accessLevel = determineAccessLevel(userRoles);
      console.log(accessLevel);

      if (!accessLevel) {
        return NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
      }

      // Check if the current path is allowed for the user's access level
      const currentPath = path.toLowerCase();
      
      const hasAccess = currentPath.startsWith(roleRoutes[accessLevel].toLowerCase());

      if (!hasAccess) {
        return NextResponse.redirect(new URL(roleRoutes[accessLevel], request.url));
      }
    }

    return supabaseResponse;
  } catch (e) {
    console.error(e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
