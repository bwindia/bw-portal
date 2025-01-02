export const SIGN_IN_PATH = "/sign-in";
export const VERIFY_OTP_PATH = "/verify-otp";
export const NEW_USER_PATH = "/hello-user";

// Public routes
export const HOME_PAGE_ROUTE = "/home";
export const PUBLIC_SCHEDULE_DONATION_PAGE_ROUTE = "/forms/schedule-donation";

// Protected routes

// Admin routes
export const ADMIN_PAGE_ROUTE = "/a";
export const USERS_PAGE_ROUTE = ADMIN_PAGE_ROUTE + "/users";
export const ADD_USER_PAGE_ROUTE = USERS_PAGE_ROUTE + "/add-user";
export const IMPORT_USERS_PAGE_ROUTE = USERS_PAGE_ROUTE + "/import";
export const EDIT_USER_PAGE_ROUTE = (id: string) =>
  USERS_PAGE_ROUTE + `/${id}/edit`;
export const BRIDGES_PAGE_ROUTE = ADMIN_PAGE_ROUTE + "/bridges";
export const ADD_BRIDGE_PAGE_ROUTE = BRIDGES_PAGE_ROUTE + "/add-bridge";
export const BRIDGE_DETAILS_PAGE_ROUTE = (slug: string) =>
  BRIDGES_PAGE_ROUTE + `/${slug}`;
export const EDIT_BRIDGE_PAGE_ROUTE = (slug: string) =>
  BRIDGES_PAGE_ROUTE + `/${slug}/edit`;

export const FORMS_ROUTE = ADMIN_PAGE_ROUTE + "/forms";
export const SCHEDULE_DONATION_PAGE_ROUTE = FORMS_ROUTE + "/schedule-donation";
export const TRACK_DONATION_PAGE_ROUTE = FORMS_ROUTE + "/track-donation";
export const TRACK_TRANSFUSION_PAGE_ROUTE = FORMS_ROUTE + "/track-transfusion";
export const TRACK_BLOOD_DONATION_CAMP_PAGE_ROUTE =
  FORMS_ROUTE + "/track-blood-donation-camp";

export const LANDING_PAGE_ROUTE = USERS_PAGE_ROUTE;
// Donor routes
export const DONOR_PAGE_ROUTE = "/d";

// Volunteer routes
export const VOLUNTEER_PAGE_ROUTE = "/v";

// Fighter routes
export const FIGHTER_PAGE_ROUTE = "/f";
