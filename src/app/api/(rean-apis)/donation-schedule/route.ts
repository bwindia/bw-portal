import { createClient } from "@/lib/supabase/client";
import { authenticateUser } from "@/lib/rean-api/auth";
import { NextErrorResponse, NextSuccessResponse } from "@/utils/api/response";

export const POST = async (request: Request) => {
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  const body = await request.json();
  const {
    user_id,
    donation_type,
    bridge_id,
    date_of_donation,
    time_of_donation,
    blood_center_id,
    org_id,
  } = body;

  // Validate required fields
  if (
    !user_id ||
    !donation_type ||
    !bridge_id ||
    !date_of_donation ||
    !time_of_donation ||
    !blood_center_id ||
    !org_id
  ) {
    return NextErrorResponse("Bad Request. Missing required fields.", 400);
  }

  // Create Supabase client
  const supabase = createClient();

  // Insert donation schedule into the tracker_donation_schedule table
  const { error } = await supabase.from("tracker_donation_schedule").insert([
    {
      user_id: user_id,
      donation_type: donation_type, // Mapped from master_donation_type
      bridge_id: bridge_id, // Mapped from bridge_patient_info
      date_of_donation: date_of_donation,
      time_of_donation: time_of_donation,
      blood_center_id: blood_center_id, // Mapped from master_blood_center
      org_id: org_id, // Mapped from master_organization
    },
  ]);

  // Handle any errors during insertion
  if (error) {
    return NextErrorResponse(
      "Internal Server Error. Unable to schedule donation.",
      500
    );
  }

  // Success response
  return NextSuccessResponse("Donation schedule created successfully.");
};
